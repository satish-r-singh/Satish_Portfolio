import os
from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from dotenv import load_dotenv

# --- AI & DATABASE LIBRARIES ---
from langchain_google_genai import ChatGoogleGenerativeAI, GoogleGenerativeAIEmbeddings
from langchain_core.messages import HumanMessage, SystemMessage
from pinecone import Pinecone

# 1. Load Environment Variables
load_dotenv()
GOOGLE_API_KEY = os.getenv("GOOGLE_API_KEY")
PINECONE_API_KEY = os.getenv("PINECONE_API_KEY")

if not GOOGLE_API_KEY or not PINECONE_API_KEY:
    print("⚠️ WARNING: API Keys missing. Check .env file.")

# 2. Initialize The Components

# A. The Embedding Model (Must match what we used for Ingestion)
# We used 'models/text-embedding-004' in ingest.py
embeddings = GoogleGenerativeAIEmbeddings(
    model="models/text-embedding-004", 
    google_api_key=GOOGLE_API_KEY
)

# B. The Vector Database Connection
pc = Pinecone(api_key=PINECONE_API_KEY)
index_name = "portfolio-agent"
index = pc.Index(index_name)

# C. The Thinking Brain (LLM)
llm = ChatGoogleGenerativeAI(
    model="gemini-2.5-flash", # Or "gemini-pro"
    temperature=0.3, # Low temperature = More factual, less creative
    google_api_key=GOOGLE_API_KEY
)

# 3. The Application
app = FastAPI(title="Rohit Portfolio API - RAG Enabled")

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

class ChatRequest(BaseModel):
    message: str
    session_id: str = "guest"

def get_context(query: str):
    """Retrieves relevant chunks from Pinecone"""
    try:
        # 1. Convert query to vector
        vector = embeddings.embed_query(query)
        
        # 2. Search Pinecone
        results = index.query(
            vector=vector,
            top_k=3, # Get top 3 most relevant matches
            include_metadata=True
        )
        
        # 3. Extract text
        context_text = ""
        for match in results['matches']:
            text = match['metadata'].get('text', '')
            context_text += f"\n---\n{text}"
            
        return context_text
    except Exception as e:
        print(f"Error retrieving context: {e}")
        return ""

@app.post("/chat")
async def chat_endpoint(request: ChatRequest):
    try:
        user_msg = request.message
        print(f"User: {user_msg}")

        # --- STEP 1: RETRIEVAL ---
        print("🔍 Searching memory...")
        context = get_context(user_msg)
        print(f"   Found context length: {len(context)} chars")

        # --- STEP 2: AUGMENTATION (The Prompt) ---
        system_instruction = f"""
        You are the AI Assistant for Rohit Singh, a Lead Data Scientist.
        Use the following CONTEXT from his Resume/Projects to answer the user.
        
        CONTEXT:
        {context}
        
        RULES:
        1. If the answer is in the Context, be specific (quote technologies, dates).
        2. If the Context is empty or irrelevant, politely say you don't have that specific detail about Rohit, but answer general AI questions normally.
        3. Keep tone: Professional, Confident, "Neo-Brutalist" (concise).
        4. Do NOT mention "According to the documents". Just answer naturally.
        """

        messages = [
            SystemMessage(content=system_instruction),
            HumanMessage(content=user_msg)
        ]

        # --- STEP 3: GENERATION ---
        ai_response = llm.invoke(messages)
        
        print(f"Agent: {ai_response.content}")
        
        return {
            "response": ai_response.content,
            "action": "reply"
        }

    except Exception as e:
        print(f"ERROR: {str(e)}")
        return {
            "response": "⚠️ SYSTEM ERROR: I am having trouble accessing my memory banks.",
            "error": str(e)
        }

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8000)