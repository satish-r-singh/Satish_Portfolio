import { Project, Experience, ArchiveProject } from './types';

export const PROJECTS: Project[] = [
  {
    id: '1',
    title: 'ENTERPRISE RAG ENGINE',
    description: 'Scalable Retrieval Augmented Generation system processing 1M+ documents with sub-second latency.',
    tags: ['Python', 'LangChain', 'Pinecone', 'FastAPI'],
    imageUrl: 'https://picsum.photos/800/450?random=1',
    link: '#',
  },
  {
    id: '2',
    title: 'AUTONOMOUS FINANCE AGENT',
    description: 'Multi-agent system capable of analyzing market trends and executing mock trades autonomously.',
    tags: ['AutoGPT', 'OpenAI', 'React', 'Redis'],
    imageUrl: 'https://picsum.photos/800/450?random=2',
    link: '#',
  },
  {
    id: '3',
    title: 'PREDICTIVE MAINTENANCE SUITE',
    description: 'IoT data pipeline and ML models predicting machinery failure 48 hours in advance.',
    tags: ['TensorFlow', 'Kubernetes', 'Kafka'],
    imageUrl: 'https://picsum.photos/800/450?random=3',
    link: '#',
  },
];

export const ARCHIVE_PROJECTS: ArchiveProject[] = [
  { date: 'OCT 2023', id: 'HEALTHCARE_FRAUD_DETECTION_V1', stack: ['Python', 'Azure', 'XGBoost'], link: '#' },
  { date: 'AUG 2023', id: 'ECOMMERCE_RECSYS_ENGINE', stack: ['Torch', 'Redis', 'AWS'], link: '#' },
  { date: 'MAY 2023', id: 'CRYPTO_SENTIMENT_ANALYZER', stack: ['BERT', 'Twitter API', 'FastAPI'], link: '#' },
  { date: 'FEB 2023', id: 'TRAFFIC_FLOW_OPTIMIZATION', stack: ['OpenCV', 'YOLOv8', 'Edge'], link: '#' },
  { date: 'NOV 2022', id: 'SUPPLY_CHAIN_DIGITAL_TWIN', stack: ['SimPy', 'React', 'MongoDB'], link: '#' },
];

export const EXPERIENCE: Experience[] = [
  {
    id: 'e1',
    year: '2023-PRES',
    role: 'Lead Data Scientist',
    company: 'TECH_CORP_GLOBAL',
    location: 'ABU DHABI',
    metric: 'Reduced inference cost by 40% via quantization.',
  },
  {
    id: 'e2',
    year: '2021-2023',
    role: 'Senior ML Engineer',
    company: 'STARTUP_XYZ',
    location: 'SAN FRANCISCO',
    metric: 'Deployed 15+ microservices handling 500 RPS.',
  },
  {
    id: 'e3',
    year: '2019-2021',
    role: 'Data Analyst',
    company: 'FINANCE_INC',
    location: 'NEW YORK',
    metric: 'Automated 200h/month of manual reporting.',
  },
];

export const SYSTEM_INSTRUCTION = `You are the AI Agent for Rohit Singh's portfolio. 
You are a Lead Data Scientist based in Abu Dhabi.
Your persona is technical, direct, and efficient. 
You specialize in RAG systems, AI Agents, and Scalable Data Architectures.
You are currently "Open to Work".
If asked about projects, mention the Enterprise RAG Engine or Autonomous Finance Agent.
Keep answers concise and structured. Use Markdown for formatting.`;