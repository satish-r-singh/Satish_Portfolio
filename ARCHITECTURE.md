# System Architecture

> A modern AI-powered portfolio demonstrating production-grade engineering practices

---

## Overview

This portfolio is not just a static website—it's a **live demonstration of full-stack AI engineering**. At its core is an intelligent agent capable of natural conversation, voice interaction, and document analysis, all running on a secure, scalable cloud infrastructure.

```
┌─────────────────────────────────────────────────────────────────────┐
│                        USER INTERACTION LAYER                       │
│  ┌──────────┐  ┌──────────┐  ┌──────────┐  ┌──────────────────────┐ │
│  │  Voice   │  │   Chat   │  │  Upload  │  │   Project Gallery    │ │
│  │  Input   │  │  Query   │  │  Resume  │  │                      │ │
│  └────┬─────┘  └────┬─────┘  └────┬─────┘  └──────────────────────┘ │
└───────┼─────────────┼─────────────┼─────────────────────────────────┘
        │             │             │
        ▼             ▼             ▼
┌─────────────────────────────────────────────────────────────────────┐
│                         REACT FRONTEND                              │
│  Modern SPA with real-time state management                         │
│  • Speech Recognition API  • Audio Playback  • Markdown Rendering   │
└───────────────────────────────────────────────────────────────────┬─┘
                                                                    │
                              HTTPS / REST API                      │
                                                                    ▼
┌─────────────────────────────────────────────────────────────────────┐
│                        FASTAPI BACKEND                              │
│  ┌─────────────┐  ┌─────────────┐  ┌─────────────────────────────┐  │
│  │ /chat       │  │ /analyze_jd │  │ /tts                        │  │
│  │ RAG Pipeline│  │ Resume Match│  │ Voice Synthesis             │  │
│  └──────┬──────┘  └──────┬──────┘  └──────────────┬──────────────┘  │
│         │                │                        │                 │
│  ┌──────▼────────────────▼────────────────────────▼──────────────┐  │
│  │               SECURITY & MIDDLEWARE LAYER                     │  │
│  │  • Rate Limiting  • Input Validation  • CORS  • Auth Headers  │  │
│  └───────────────────────────────────────────────────────────────┘  │
└───────────────────────────────────────────────────────────────────┬─┘
                                                                    │
                    ┌───────────────────────────────────────────────┘
                    │
        ┌───────────┼───────────┬─────────────────────┐
        ▼           ▼           ▼                     ▼
┌─────────────┐ ┌─────────┐ ┌─────────────┐   ┌─────────────┐
│  Pinecone   │ │ Gemini  │ │ Gemini TTS  │   │  LangChain  │
│  Vector DB  │ │   LLM   │ │    Model    │   │ Orchestrator│
└─────────────┘ └─────────┘ └─────────────┘   └─────────────┘
```

---

## How It Works

### The Conversation Engine

When a visitor asks a question, the system doesn't simply pattern-match keywords—it **understands context**.

1. **Query Processing** — The user's question is converted into a mathematical representation (embedding)
2. **Knowledge Retrieval** — A vector database searches for the most relevant information from my resume and projects
3. **Response Generation** — An LLM synthesizes a natural, contextual answer grounded in real data
4. **Voice Output** — Optionally, the response is converted to natural speech in real-time

This approach, called **Retrieval-Augmented Generation (RAG)**, ensures responses are accurate, specific, and never hallucinated.

### The Resume Analyzer

Recruiters can upload a job description to receive an instant compatibility analysis:

- **Skill Mapping** — Automatically matches JD requirements to my actual experience
- **Gap Analysis** — Honestly identifies areas for growth with transferable skill suggestions  
- **Fit Score** — Provides a data-driven compatibility percentage

---

## Technology Stack

| Layer | Technologies | Purpose |
|-------|-------------|---------|
| **Frontend** | React 19, TypeScript, Tailwind CSS | Responsive, accessible UI with real-time updates |
| **Backend** | FastAPI, Python 3.11, Uvicorn | High-performance async API server |
| **AI/ML** | Gemini 2.5, LangChain, RAG | Intelligent conversation and document analysis |
| **Vector DB** | Pinecone | Semantic search across resume and projects |
| **Voice** | Web Speech API, Gemini TTS | Bidirectional voice interaction |
| **DevOps** | Docker, Railway | Containerized deployment with auto-scaling |

---

## Security Considerations

This isn't a demo—it's production-grade software:

- ✅ **Rate Limiting** — Prevents API abuse (15-20 req/min per endpoint)
- ✅ **Input Validation** — Sanitizes all user input before processing
- ✅ **Secure Headers** — X-Frame-Options, X-Content-Type-Options, XSS Protection
- ✅ **CORS Restrictions** — Only allows requests from authorized domains
- ✅ **Non-Root Containers** — Docker runs with minimal privileges
- ✅ **Secret Management** — All API keys stored securely, never exposed to frontend

---

## What This Demonstrates

| Skill Area | Evidence |
|------------|----------|
| **AI Engineering** | RAG pipeline, LLM integration, embedding models, prompt engineering |
| **Full-Stack Development** | React frontend ↔ FastAPI backend with RESTful design |
| **Cloud Architecture** | Containerized deployment, managed vector databases |
| **Security Mindset** | Rate limiting, input validation, secure headers, least privilege |
| **Developer Experience** | Clean code, type safety, documentation, proper error handling |

---

## Architecture Decisions

**Why RAG over Fine-Tuning?**  
RAG allows the system to stay current with my latest projects without retraining. New experience is simply added to the vector database.

**Why FastAPI?**  
Async-first design handles concurrent requests efficiently—critical for real-time voice synthesis. Built-in OpenAPI documentation speeds up development.

**Why Pinecone?**  
Managed vector search eliminates infrastructure overhead. Sub-50ms query times ensure responsive conversations.

---

*Built with care by Satish Rohit Singh — [View the code](https://github.com/satish-r-singh/Satish_Portfolio)*
