# Use an official lightweight Python image
FROM python:3.11-slim

# Set the working directory
WORKDIR /app

# Install system tools (Crucial for AI libraries like Pinecone/LangChain)
RUN apt-get update && apt-get install -y \
    build-essential \
    gcc \
    && rm -rf /var/lib/apt/lists/*

# Copy requirements first (Better caching)
COPY requirements.txt .

# Install dependencies
RUN pip install --no-cache-dir -r requirements.txt

# Copy the rest of the code
COPY . .

# EXPOSE is just documentation, but good practice
EXPOSE 8000

# THE CRITICAL FIX:
# We use 'sh -c' so we can read the $PORT variable from Railway
CMD sh -c "uvicorn main:app --host 0.0.0.0 --port ${PORT:-8000}"
