import os
import time # <--- NEW
from dotenv import load_dotenv
from langchain_community.document_loaders import PyPDFLoader, TextLoader, DirectoryLoader
from langchain_text_splitters import RecursiveCharacterTextSplitter
from langchain_google_genai import GoogleGenerativeAIEmbeddings
from pinecone import Pinecone, ServerlessSpec

# 1. Load Environment
load_dotenv()
PINECONE_KEY = os.getenv("PINECONE_API_KEY")
GOOGLE_KEY = os.getenv("GOOGLE_API_KEY")
INDEX_NAME = "portfolio-agent"

if not PINECONE_KEY or not GOOGLE_KEY:
    raise ValueError("Missing API Keys in .env")

def ingest_data():
    print("🚀 STARTING INGESTION PROCESS (THROTTLED MODE)...")

    # 2. Load Data
    print("📂 Loading documents from backend/data/...")
    loader = DirectoryLoader('./data', glob="**/*.pdf", loader_cls=PyPDFLoader)
    raw_docs = loader.load()
    
    txt_loader = DirectoryLoader('./data', glob="**/*.txt", loader_cls=TextLoader)
    raw_docs.extend(txt_loader.load())

    print(f"   Found {len(raw_docs)} document pages.")

    # 3. Split Text
    text_splitter = RecursiveCharacterTextSplitter(
        chunk_size=1000,
        chunk_overlap=200
    )
    docs = text_splitter.split_documents(raw_docs)
    print(f"   Split into {len(docs)} vector chunks.")

    # 4. Initialize Embeddings (Switched to newer model)
    embeddings = GoogleGenerativeAIEmbeddings(
        model="models/text-embedding-004", # <--- NEWER MODEL
        google_api_key=GOOGLE_KEY
    )

    # 5. Connect to Pinecone
    pc = Pinecone(api_key=PINECONE_KEY)
    
    existing_indexes = [i.name for i in pc.list_indexes()]
    if INDEX_NAME not in existing_indexes:
        print(f"   Creating Index {INDEX_NAME}...")
        pc.create_index(
            name=INDEX_NAME,
            dimension=768, 
            metric="cosine",
            spec=ServerlessSpec(cloud="aws", region="us-east-1")
        )
        time.sleep(5) 

    index = pc.Index(INDEX_NAME)

    # 6. Upsert with Throttling
    print("📤 Uploading vectors to Pinecone...")
    
    # Process one by one to respect rate limits
    vectors = []
    for i, doc in enumerate(docs):
        
        # Create unique ID
        doc_id = f"chunk_{i}"
        
        # Embed with delay
        try:
            print(f"   Processing chunk {i+1}/{len(docs)}...", end="", flush=True)
            vec = embeddings.embed_query(doc.page_content)
            print(" Done.")
            
            # THE FIX: Sleep for 2 seconds between requests
            time.sleep(2) 

            metadata = {"text": doc.page_content, "source": doc.metadata.get("source", "unknown")}
            vectors.append({
                "id": doc_id,
                "values": vec,
                "metadata": metadata
            })
            
        except Exception as e:
            print(f"\n   ⚠️ Error on chunk {i}: {e}")
            time.sleep(10) # Wait longer if we hit an error

    # Batch upload to Pinecone (Pinecone handles large batches fine, it's Google that needs slow down)
    if vectors:
        # Upload in batches of 50
        batch_size = 50
        for i in range(0, len(vectors), batch_size):
            batch = vectors[i:i+batch_size]
            index.upsert(vectors=batch)
            print(f"   ✅ Uploaded batch {i // batch_size + 1} to Pinecone.")

    print("✅ INGESTION COMPLETE. The Brain now has your memories.")

if __name__ == "__main__":
    ingest_data()