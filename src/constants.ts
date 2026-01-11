import { Project, Experience, ArchiveProject } from './types';

export const PROJECTS = [
  {
    id: 1,
    title: "AI_PORTFOLIO_AGENT",
    description: "A self-aware digital twin built with RAG. It parses my real resume, interacts with recruiters via voice/chat, and performs gap analysis on uploaded Job Descriptions.",
    tags: ["Agents", "RAG", "React", "FastAPI", "Gemini"],
    imageUrl: "https://images.unsplash.com/photo-1531746790731-6c087fecd65a?q=80&w=2006&auto=format&fit=crop", // Tech/AI Abstract
    link: "#"
  },
  {
    id: 2,
    title: "ENTERPRISE_KNOWLEDGE_BOT",
    description: "Reduced support TTR by 20% by enabling 40+ agents to instantly query internal documents. Built on a scalable RAG pipeline processing thousands of PDFs.",
    tags: ["RAG", "Data Eng", "LangChain", "Pinecone"],
    imageUrl: "https://images.unsplash.com/photo-1620712943543-bcc4688e7485?q=80&w=765&auto=format&fit=crop", // Data/Server
    link: "#"
  },
  {
    id: 3,
    title: "VISION_DAMAGE_ESTIMATOR",
    description: "Automated vehicle damage assessment using CNNs and YOLO. Deployed on Azure, processing claims 4 days faster and saving $200k/year in manual labor.",
    tags: ["ML Ops", "Computer Vision", "Azure", "Docker"],
    imageUrl: "https://images.unsplash.com/photo-1494976388531-d1058494cdd8?q=80&w=2070&auto=format&fit=crop", // Car/Vision
    link: "#"
  },
  {
    id: 4,
    title: "PREDICTIVE_PRICING_CORE",
    description: "Real-time valuation engine for fleet remarketing. Achieved 96% R-Squared accuracy using XGBoost and boosted revenue per unit by 10%.",
    tags: ["Data Eng", "Scikit-Learn", "XGBoost", "Pandas"],
    imageUrl: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?q=80&w=2070&auto=format&fit=crop", // Analytics/Chart
    link: "#"
  }
];

export const ARCHIVE_PROJECTS = [
  {
    date: "2024",
    id: "GENAI_CONTENT_HUB",
    stack: ["GenAI", "Multi-Modal", "Python"],
    link: "#"
  },
  {
    date: "2023",
    id: "RETAIL_SEGMENTATION_CLUSTERS",
    stack: ["K-Means", "DBSCAN", "Sklearn"],
    link: "#"
  },
  {
    date: "2023",
    id: "CREDIT_RISK_HYBRID_SCORING",
    stack: ["Alternative Data", "Risk Modeling"],
    link: "#"
  },
  {
    date: "2021",
    id: "FRAUD_DETECTION_SHIELD",
    stack: ["Anomaly Detection", "ML Ops"],
    link: "#"
  },
  {
    date: "2021",
    id: "DEMAND_FORECAST_ENGINE",
    stack: ["ARIMA", "Time-Series", "Prophet"],
    link: "#"
  }
];


export const EXPERIENCE = [
  {
    id: 1,
    year: "2022 - PRESENT",
    role: "GROUP LEAD DATA SCIENTIST",
    company: "E-CENTIVE & IGNITE",
    location: "ABU DHABI",
    metric: "Built the Data Science division from scratch. Deployed GenAI Voice Agents & RAG Knowledge Assistants, reducing Call Center TTR by 20%."
  },
  {
    id: 2,
    year: "2021 - 2022",
    role: "SENIOR DATA SCIENTIST",
    company: "ZENSAR TECHNOLOGIES",
    location: "SOUTH AFRICA",
    metric: "Developed Used Car Pricing Engines (XGBoost) for Avis Fleet. Increased revenue per unit by 10% and reduced financial forecasting errors by 12%."
  },
  {
    id: 3,
    year: "2019 - 2021",
    role: "TECH PRODUCT OWNER (DS)",
    company: "AVIS FLEET",
    location: "SOUTH AFRICA",
    metric: "Launched AI Vehicle Damage Detection (Computer Vision/Azure). Automated claims processing, reducing settlement time by 4 days and saving $200k/year."
  },
  {
    id: 4,
    year: "2011 - 2014",
    role: "SENIOR SOFTWARE ENGINEER",
    company: "GALAXE SOLUTIONS",
    location: "BANGALORE",
    metric: "Led the enterprise migration of Pharmacy Claims (Aetna to CVS). Managed offshore delivery for mission-critical AS/400 systems with zero defects."
  }
];


export const API_URL = import.meta.env.VITE_API_URL || "http://localhost:8000";