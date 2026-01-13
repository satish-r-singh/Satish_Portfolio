import os
import uvicorn
import logging
from dotenv import load_dotenv

# --- FASTAPI IMPORTS ---
from fastapi import FastAPI, HTTPException, Request, UploadFile, File, Response
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel

# --- PDF READING ---
from pypdf import PdfReader

# --- LANGCHAIN & RAG ---
from langchain_google_genai import ChatGoogleGenerativeAI, GoogleGenerativeAIEmbeddings
from langchain_core.messages import HumanMessage, SystemMessage
from pinecone import Pinecone

# --- GOOGLE GENAI V2 SDK (Official) ---
from google import genai
from google.genai import types

# --- LOCAL PROMPTS ---
from prompts import get_chat_prompt, get_jd_analysis_prompt

# SETUP LOGGING
logging.basicConfig(level=logging.INFO)
logger = logging.getLogger(__name__)

# 1. Load Environment Variables
load_dotenv()
GOOGLE_API_KEY = os.getenv("GOOGLE_API_KEY")
PINECONE_API_KEY = os.getenv("PINECONE_API_KEY")

if not GOOGLE_API_KEY or not PINECONE_API_KEY:
    print("⚠️ WARNING: API Keys missing. Check .env file.")

# ---------------------------------------------------------
# INITIALIZE COMPONENTS
# ---------------------------------------------------------

# A. Embedding Model
embeddings = GoogleGenerativeAIEmbeddings(
    model="models/text-embedding-004", 
    google_api_key=GOOGLE_API_KEY
)

# B. Vector Database
pc = Pinecone(api_key=PINECONE_API_KEY)
index_name = "portfolio-agent"
index = pc.Index(index_name)

# C. The Thinking Brain
llm = ChatGoogleGenerativeAI(
    model="gemini-2.5-flash", 
    temperature=0.3,
    google_api_key=GOOGLE_API_KEY
)

# D. The Speaking Brain (Cookbook Style)
client = genai.Client(api_key=GOOGLE_API_KEY)

# E. Context
try:
    with open("resume.txt", "r", encoding="utf-8") as f:
        RESUME_CONTEXT = f.read()
except FileNotFoundError:
    RESUME_CONTEXT = "Profile: Satish Rohit Singh (Lead Data Scientist)."

# ---------------------------------------------------------
# FASTAPI APP
# ---------------------------------------------------------
app = FastAPI(title="Rohit Portfolio API")

# 1. FIX CORS
origins = [
    "http://localhost:3000",           # Vite Localhost
    "https://your-project.pages.dev",  # Your Cloudflare Domain (Add this later)
    "https://satish-portfolio-1at.pages.dev", # Example - Remove this later
    "https://www.satishrohitsingh.com",
    "https://satishrohitsingh.com",
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

class ChatRequest(BaseModel):
    message: str
    session_id: str = "guest"

class TTSRequest(BaseModel):
    text: str

# Helper: Wave File Generator (From Cookbook)
import wave
import io

def generate_wav_bytes(pcm_data, channels=1, rate=24000, sample_width=2):
    """
    Helper function adapted from the Cookbook to return bytes instead of writing to disk.
    """
    with io.BytesIO() as wav_buffer:
        with wave.open(wav_buffer, "wb") as wf:
            wf.setnchannels(channels)
            wf.setsampwidth(sample_width)
            wf.setframerate(rate)
            wf.writeframes(pcm_data)
        return wav_buffer.getvalue()

# ---------------------------------------------------------
# ENDPOINTS
# ---------------------------------------------------------

@app.post("/chat")
async def chat_endpoint(request: ChatRequest):
    try:
        user_msg = request.message
        # Simple RAG Logic
        vector = embeddings.embed_query(user_msg)
        results = index.query(vector=vector, top_k=3, include_metadata=True)
        context = "\n".join([m['metadata'].get('text', '') for m in results['matches']])
        
        system_instruction = get_chat_prompt(context) 
        messages = [SystemMessage(content=system_instruction), HumanMessage(content=user_msg)]
        ai_response = llm.invoke(messages)
        
        return {"response": ai_response.content, "action": "reply"}

    except Exception as e:
        return {"response": "⚠️ System Error.", "error": str(e)}

@app.post("/analyze_jd")
async def analyze_jd(file: UploadFile = File(...)):
    # FILE SIZE CHECK (Limit to 5MB)
    MAX_FILE_SIZE = 5 * 1024 * 1024

    # Check content-length header first (fast)
    if file.size > MAX_FILE_SIZE:
        return {"response": "⚠️ File too large. Max 5MB allowed."}
    try:
        content = await file.read()
        
        # Double check actual size after reading
        if len(content) > MAX_FILE_SIZE:
             return {"response": "⚠️ File too large. Max 5MB allowed."}
        
        # RUN BLOCKING PDF PARSING IN THREAD POOL
        def parse_pdf(file_bytes):
            reader = PdfReader(io.BytesIO(file_bytes))
            # Extract text safely
            return "".join([page.extract_text() or "" for page in reader.pages])[:30000]

        # This prevents the server from freezing while reading PDF
        jd_text = await run_in_executor(None, parse_pdf, content)
        
        prompt = get_jd_analysis_prompt(jd_text, RESUME_CONTEXT)
        response = await llm.ainvoke(prompt) # Use async invoke if available, otherwise standard invoke is okay in thread
        return {"response": response.content}
    except Exception as e:
        return {"response": "Error reading PDF. Ensure it is a valid text-based PDF."}

# ---------------------------------------------------------
# TTS ENDPOINT (Gemini 2.5 Flash Preview)
# ---------------------------------------------------------
@app.post("/tts")
async def text_to_speech(request: TTSRequest):
    logger.info(f"🎤 TTS Request (Gemini 2.5): {request.text[:30]}...")
    
    try:
        # 1. Generate Content (Following Cookbook pattern)
        response = client.models.generate_content(
            model='gemini-2.5-flash-preview-tts',
            contents=request.text,
            config=types.GenerateContentConfig(
                response_modalities=['AUDIO'],
                speech_config=types.SpeechConfig(
                    voice_config=types.VoiceConfig(
                        prebuilt_voice_config=types.PrebuiltVoiceConfig(
                            voice_name='Kore'
                        )
                    )
                )
            )
        )

        # 2. Extract Data
        # In the Python SDK, .inline_data.data returns the raw bytes (decoded).
        # We do NOT need to base64 decode it manually if using the V2 'types' objects correctly.
        if not response.candidates:
             raise HTTPException(status_code=500, detail="No audio candidates.")

        blob = response.candidates[0].content.parts[0].inline_data
        
        # 3. Create WAV container
        # Note: 'blob.data' contains the raw PCM bytes
        wav_audio = generate_wav_bytes(blob.data, rate=24000)

        logger.info(f"💿 Audio Generated. Size: {len(wav_audio)} bytes.")
        
        return Response(content=wav_audio, media_type="audio/wav")

    except Exception as e:
        logger.error(f"🔥 TTS CRASH: {str(e)}")
        return Response(content=f"Error: {str(e)}", status_code=500, media_type="text/plain")


if __name__ == "__main__":
    uvicorn.run("main:app", host="0.0.0.0", port=8000, reload=True)



