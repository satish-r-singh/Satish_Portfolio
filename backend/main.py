# import os
# import base64
# import io

# from fastapi import FastAPI, HTTPException, Request, UploadFile, File
# from fastapi.middleware.cors import CORSMiddleware
# from fastapi.responses import StreamingResponse
# from pydantic import BaseModel
# import uvicorn
# from dotenv import load_dotenv
# from prompts import get_chat_prompt, get_jd_analysis_prompt

# # New imports for PDF reading
# from pypdf import PdfReader

# # Import the NEW V2 SDK
# from google import genai

# # --- AI & DATABASE LIBRARIES ---
# from langchain_google_genai import ChatGoogleGenerativeAI, GoogleGenerativeAIEmbeddings
# from langchain_core.messages import HumanMessage, SystemMessage
# from pinecone import Pinecone

# # 1. Load Environment Variables
# load_dotenv()
# GOOGLE_API_KEY = os.getenv("GOOGLE_API_KEY")
# PINECONE_API_KEY = os.getenv("PINECONE_API_KEY")

# if not GOOGLE_API_KEY or not PINECONE_API_KEY:
#     print("⚠️ WARNING: API Keys missing. Check .env file.")

# # 2. Initialize The Components

# # A. The Embedding Model (Must match what we used for Ingestion)
# # We used 'models/text-embedding-004' in ingest.py
# embeddings = GoogleGenerativeAIEmbeddings(
#     model="models/text-embedding-004", 
#     google_api_key=GOOGLE_API_KEY
# )

# # B. The Vector Database Connection
# pc = Pinecone(api_key=PINECONE_API_KEY)
# index_name = "portfolio-agent"
# index = pc.Index(index_name)

# # C. The Thinking Brain (LLM)
# llm = ChatGoogleGenerativeAI(
#     model="gemini-2.5-flash", # Or "gemini-pro"
#     temperature=0.3, # Low temperature = More factual, less creative
#     google_api_key=GOOGLE_API_KEY
# )

# # Load Resume Context for JD Analysis
# try:
#     with open("resume.txt", "r", encoding="utf-8") as f:
#         RESUME_CONTEXT = f.read()
# except FileNotFoundError:
#     print("⚠️ WARNING: resume.txt not found. JD Analysis will lack context.")
#     RESUME_CONTEXT = "Profile: Satish Rohit Singh (Lead Data Scientist)."



# # 3. The Application
# app = FastAPI(title="Rohit Portfolio API - RAG Enabled")

# app.add_middleware(
#     CORSMiddleware,
#     allow_origins=["*"],
#     allow_credentials=True,
#     allow_methods=["*"],
#     allow_headers=["*"],
# )

# class ChatRequest(BaseModel):
#     message: str
#     session_id: str = "guest"

# def get_context(query: str):
#     """Retrieves relevant chunks from Pinecone"""
#     try:
#         # 1. Convert query to vector
#         vector = embeddings.embed_query(query)
        
#         # 2. Search Pinecone
#         results = index.query(
#             vector=vector,
#             top_k=3, # Get top 3 most relevant matches
#             include_metadata=True
#         )
        
#         # 3. Extract text
#         context_text = ""
#         for match in results['matches']:
#             text = match['metadata'].get('text', '')
#             context_text += f"\n---\n{text}"
            
#         return context_text
#     except Exception as e:
#         print(f"Error retrieving context: {e}")
#         return ""

# # ---------------------------------------------------------
# # ENDPOINT 1: THE CHATBOT (RAG)
# # ---------------------------------------------------------
# @app.post("/chat")
# async def chat_endpoint(request: ChatRequest):
#     try:
#         user_msg = request.message
#         print(f"User: {user_msg}")

#         # --- STEP 1: RETRIEVAL ---
#         context = get_context(user_msg)
        
#         # --- STEP 2: AUGMENTATION (Use the function from prompts.py) ---
#         # The prompt logic is now hidden inside this function call
#         system_instruction = get_chat_prompt(context) 

#         messages = [
#             SystemMessage(content=system_instruction),
#             HumanMessage(content=user_msg)
#         ]

#         # --- STEP 3: GENERATION ---
#         ai_response = llm.invoke(messages)
        
#         return {"response": ai_response.content, "action": "reply"}

#     except Exception as e:
#         print(f"ERROR: {str(e)}")
#         return {"response": "⚠️ Error accessing memory banks.", "error": str(e)}

# @app.post("/analyze_jd")
# async def analyze_jd(file: UploadFile = File(...)):
#     try:
#         # 1. Read PDF
#         content = await file.read()
#         pdf_reader = PdfReader(io.BytesIO(content))
#         jd_text = ""
#         for page in pdf_reader.pages:
#             jd_text += page.extract_text()
        
#         jd_text = jd_text[:10000]

#         # 2. Get Prompt (Using the function from prompts.py)
#         prompt = get_jd_analysis_prompt(jd_text, RESUME_CONTEXT)

#         # 3. Invoke LLM
#         response = llm.invoke(prompt)
        
#         return {"response": response.content}

#     except Exception as e:
#         print(f"Error: {e}")
#         return {"response": "I had trouble reading that PDF. Please try a standard text-based PDF."}

# if __name__ == "__main__":
#     uvicorn.run(app, host="0.0.0.0", port=8000)


import os
import io
import base64
import uvicorn
from dotenv import load_dotenv
import wave
import logging

# --- FASTAPI IMPORTS ---
from fastapi import FastAPI, HTTPException, Request, UploadFile, File, Response
from fastapi.middleware.cors import CORSMiddleware
from fastapi.responses import StreamingResponse
from pydantic import BaseModel

# --- PDF READING ---
from pypdf import PdfReader

# --- LANGCHAIN & RAG (The "Thinking" Brain) ---
from langchain_google_genai import ChatGoogleGenerativeAI, GoogleGenerativeAIEmbeddings
from langchain_core.messages import HumanMessage, SystemMessage
from pinecone import Pinecone

# --- GOOGLE GENAI V2 SDK (The "Speaking" Brain) ---
from google import genai

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

# A. Embedding Model (For RAG Retrieval)
embeddings = GoogleGenerativeAIEmbeddings(
    model="models/text-embedding-004", 
    google_api_key=GOOGLE_API_KEY
)

# B. Vector Database Connection (Pinecone)
pc = Pinecone(api_key=PINECONE_API_KEY)
index_name = "portfolio-agent"
index = pc.Index(index_name)

# C. The Thinking Brain (LangChain for Logic)
llm = ChatGoogleGenerativeAI(
    model="gemini-2.5-flash", 
    temperature=0.3,
    google_api_key=GOOGLE_API_KEY
)

# D. The Speaking Brain (Native V2 SDK for TTS)
# We use this directly because LangChain doesn't support audio streams well yet.
tts_client = genai.Client(api_key=GOOGLE_API_KEY)

# E. Load Resume Context (For JD Analysis)
try:
    with open("resume.txt", "r", encoding="utf-8") as f:
        RESUME_CONTEXT = f.read()
except FileNotFoundError:
    print("⚠️ WARNING: resume.txt not found. JD Analysis will lack context.")
    RESUME_CONTEXT = "Profile: Satish Rohit Singh (Lead Data Scientist)."


# ---------------------------------------------------------
# FASTAPI APP SETUP
# ---------------------------------------------------------
app = FastAPI(title="Rohit Portfolio API - RAG & Speech Enabled")

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Request Models
class ChatRequest(BaseModel):
    message: str
    session_id: str = "guest"

class TTSRequest(BaseModel):
    text: str

# Helper: RAG Context Retrieval
def get_context(query: str):
    """Retrieves relevant chunks from Pinecone"""
    try:
        vector = embeddings.embed_query(query)
        results = index.query(
            vector=vector,
            top_k=3,
            include_metadata=True
        )
        context_text = ""
        for match in results['matches']:
            text = match['metadata'].get('text', '')
            context_text += f"\n---\n{text}"
        return context_text
    except Exception as e:
        print(f"Error retrieving context: {e}")
        return ""


# ---------------------------------------------------------
# ENDPOINT 1: THE CHATBOT (RAG)
# ---------------------------------------------------------
@app.post("/chat")
async def chat_endpoint(request: ChatRequest):
    try:
        user_msg = request.message
        print(f"User: {user_msg}")

        # 1. Retrieval
        context = get_context(user_msg)
        
        # 2. Prompt Engineering
        system_instruction = get_chat_prompt(context) 

        messages = [
            SystemMessage(content=system_instruction),
            HumanMessage(content=user_msg)
        ]

        # 3. Generation
        ai_response = llm.invoke(messages)
        
        return {"response": ai_response.content, "action": "reply"}

    except Exception as e:
        print(f"ERROR: {str(e)}")
        return {"response": "⚠️ Error accessing memory banks.", "error": str(e)}


# ---------------------------------------------------------
# ENDPOINT 2: JD ANALYZER (FILE UPLOAD)
# ---------------------------------------------------------
@app.post("/analyze_jd")
async def analyze_jd(file: UploadFile = File(...)):
    try:
        # 1. Read PDF
        content = await file.read()
        pdf_reader = PdfReader(io.BytesIO(content))
        jd_text = ""
        for page in pdf_reader.pages:
            jd_text += page.extract_text()
        
        # Truncate to avoid context limit (rare with Gemini 1.5/2.0, but good practice)
        jd_text = jd_text[:30000] 

        # 2. Get Prompt
        prompt = get_jd_analysis_prompt(jd_text, RESUME_CONTEXT)

        # 3. Invoke LLM
        response = llm.invoke(prompt)
        
        return {"response": response.content}

    except Exception as e:
        print(f"Error: {e}")
        return {"response": "I had trouble reading that PDF. Please try a standard text-based PDF."}


# ---------------------------------------------------------
# ENDPOINT 3: TEXT-TO-SPEECH (TTS)
# ---------------------------------------------------------
@app.post("/tts")
async def text_to_speech(request: TTSRequest):
    logger.info(f"🎤 TTS Request: {request.text[:30]}...")
    
    try:
        # 1. Generate (Explicitly ask for RAW audio)
        response = tts_client.models.generate_content(
            model='gemini-2.5-flash-preview-tts',
            contents=request.text,
            config={
                'response_modalities': ['AUDIO'],
                'speech_config': {
                    'voice_config': {
                        'prebuilt_voice_config': {
                            'voice_name': 'Kore'
                        }
                    }
                }
            }
        )

        if not response.candidates:
            raise HTTPException(status_code=500, detail="No audio candidates returned.")

        # 2. Decode Raw Bytes
        b64_audio = response.candidates[0].content.parts[0].inline_data.data
        audio_bytes = base64.b64decode(b64_audio)
        
        # 3. CHECK & FIX HEADER
        # WAV files must start with "RIFF"
        header_hex = audio_bytes[:4].hex()
        
        if header_hex != "52494646": # If NOT 'RIFF'
            logger.warning(f"⚠️ Raw PCM detected (Header: {header_hex}). Wrapping in WAV container...")
            
            # Wrap Raw PCM in WAV Container
            with io.BytesIO() as wav_buffer:
                with wave.open(wav_buffer, 'wb') as wav_file:
                    wav_file.setnchannels(1)      # Mono
                    wav_file.setsampwidth(2)      # 16-bit
                    wav_file.setframerate(24000)  # Gemini standard
                    wav_file.writeframes(audio_bytes)
                audio_bytes = wav_buffer.getvalue()

        logger.info(f"💿 Audio Ready. Size: {len(audio_bytes)} bytes.")
        return Response(content=audio_bytes, media_type="audio/wav")

    except Exception as e:
        logger.error(f"🔥 TTS CRASH: {str(e)}")
        return Response(content=f"Error: {str(e)}", status_code=500, media_type="text/plain")


if __name__ == "__main__":
    uvicorn.run(app, host="0.0.0.0", port=8000)