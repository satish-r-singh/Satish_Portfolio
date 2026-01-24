import { Project, Experience, ArchiveProject } from './types';

// =============================================================================
//  PROJECTS: THE CASE FILES
// =============================================================================
export const PROJECTS = [
  {
    id: 'portfolio-agent',
    title: 'AI_PORTFOLIO_AGENT',
    year: '2026',
    category: 'GENAI AGENTS // RAG // FULL-STACK ARCHITECTURE',
    image: '/images/Project_1.png',
    techStack: ['REACT', 'FASTAPI', 'GEMINI 2.5 PRO', 'PINECONE', 'WEBSOCKETS'],
    summary: 'A self-aware Digital Twin that transforms a static resume into a live, interactive technical interview using RAG and Voice AI.',
    challenge: 'Traditional portfolios are static "Dead Documents." They fail to capture the nuance of a candidate\'s personality or the depth of their technical decision-making. Recruiters spend <10 seconds scanning a PDF, often missing key high-value details due to keyword fatigue.',
    solution: 'Engineered a **Full-Stack Conversational Agent** using **FastAPI** to orchestrate real-time interactions between the **Gemini 2.5 Pro** reasoning engine and the frontend. I implemented a **Pinecone Vector Database (RAG)** to semantically index my career history for factual grounding, while designing a robust "System Prompt" that enforces a professional "Lead Scientist" persona to handle recruiter inquiries with high EQ.',
    impact: 'Redefined the candidate vetting process. The agent serves as a **Live Proof-of-Competence**, demonstrating mastery in GenAI, System Design, and Frontend Engineering in real-time. It effectively increases "Recruiter Dwell Time" from seconds to minutes.'
  },
  {
    id: 'genai-content-hub',
    title: 'MULTIMODAL_TRAINING_CORE',
    year: '2026',
    category: 'NATIVE MULTIMODAL // SALES ENABLEMENT // AUTOMATION',
    image: '/images/Project_2.jpg',
    techStack: ['GEMINI 3 MULTIMODAL', 'PYTHON', 'REACT', 'PINECONE', 'FASTAPI'],
    summary: 'Architected a native multimodal engine that auto-generates sales training modules from raw OEM technical assets.',
    challenge: 'The sales team faced a "Knowledge Gap"—new product features were shipping faster than the training department could produce curriculum. Previous pipelines were brittle, requiring complex OCR for PDFs and separate processing for video, resulting in a 4-week lag time.',
    solution: 'Engineered a **Native Multimodal Pipeline** using **Gemini 3**. By leveraging its native video and document understanding, I **eliminated the OCR and Parser layers entirely**. The model directly ingests raw OEM PDFs (preserving table/chart context) and technical videos in a single pass, synthesizing them into interactive sales training scripts and quizzes.',
    impact: 'Reduced the training material production cycle from **4 weeks to <2 hours**, enabling "Zero-Day" readiness for sales agents. Removing the parsing infrastructure reduced cloud compute costs by **40%** while significantly improving accuracy on complex technical diagrams.'
  },
  {
    id: 'knowledge-bot',
    title: 'ENTERPRISE_AGENTIC_KNOWLEDGE_BOT',
    year: '2025',
    category: 'AGENTIC RAG // COGNITIVE SEARCH // NLP',
    image: '/images/Project_3.avif',
    techStack: ["PYTHON", "LANGCHAIN AGENTS", "PINECONE", "OPENAI", "STREAMLIT"],
    summary: 'Deployed an autonomous support agent capable of multi-step reasoning to answer complex internal policy queries.',
    challenge: 'Customer support agents were struggling with "Composite Queries"—questions that required synthesizing information from multiple disconnected PDF manuals and SharePoint sites. Simple keyword search failed to capture the necessary context, leading to long hold times.',
    solution: 'Architected an **Agentic RAG System** using LangChain. Unlike standard retrieval, this system utilizes a **ReAct (Reason + Act) Loop** to decompose complex user questions into sub-tasks. It autonomously decides when to query the **Pinecone Vector Database**, how to filter the results, and synthesizes answers from multiple documents in a single reasoning step.',

    impact: 'Reduced Mean Time to Resolution (MTTR) by **20%** by augmenting human agents with AI reasoning capabilities. The system successfully handles **500+ multi-turn conversations** daily, effectively serving as an autonomous "Tier 0.5" support layer.'
  },
  {
    id: 'sales-forecasting-oem',
    title: 'MULTI_HORIZON_FORECAST_GRID',
    year: '2025',
    category: 'DEEP LEARNING // TIME SERIES // SUPPLY CHAIN',
    image: '/images/Project_4.png',
    techStack: ['FACEBOOK PROPHET', 'AMAZON DEEPAR', 'PYTORCH', 'PYTHON', 'AWS'],
    summary: 'Developed a hierarchical deep learning model to forecast OEM sales across multiple time horizons and granularities.',
    challenge: 'OEMs struggled with inventory planning due to complex, multi-level demand volatility. A global forecast was too broad to be useful, while branch-level forecasts were too noisy. They needed a system that could predict demand simultaneously at the Provider, Region, and Branch levels.',
    solution: 'Architected a **Hierarchical Time-Series System** utilizing **Prophet** for trend detection and **Amazon DeepAR** for probabilistic forecasting. The model generates synchronized predictions across three granularities (Telco Provider → Region → Branch) and three critical time horizons (Weekly, 30-Day, 90-Day).',
    impact: 'Solved the "Inventory Mismatch" problem. The multi-horizon output allowed logistics teams to optimize immediate branch-level stock (Weekly) while simultaneously guiding long-term manufacturing schedules (90-Day), aligning supply with demand across the entire network.'
  },

  {
    id: 'gamification-core',
    title: 'SALES_GAMIFICATION_ENGINE',
    year: '2024',
    category: 'BEHAVIORAL ANALYTICS // INCENTIVE OPTIMIZATION',
    image: '/images/Project_5.jpg',
    techStack: ['PYTHON', 'SQL', 'GAME THEORY', 'REAL-TIME ANALYTICS', 'PANDAS'],
    summary: 'Architected a dynamic scoring engine to gamify sales performance, driving revenue through behavioral modification.',
    challenge: 'Storefront sales representatives suffered from "Metric Fatigue"—motivation was low due to opaque performance benchmarks and delayed feedback loops. This lack of clear, immediate incentives led to high variance in daily sales productivity and inconsistent revenue.',
    solution: 'Developed a dynamic **Peer-to-Peer Scoring Engine** rooted in Game Theory. The system ingests daily sales data to calculate weighted performance scores, real-time leaderboards, and "Status Tiers." It transforms abstract KPIs into tangible, competitive targets with direct monetary correlation.',
    impact: 'Successfully drove **Behavioral Modification** across the sales force. The transparent scoring mechanism fostered healthy competition, directly leading to a measurable increase in **Sales Productivity** and a significantly more engaged, high-velocity workforce.'
  },

  {
    id: 'credit-scoring',
    title: 'ALTERNATIVE_CREDIT_SCORING',
    year: '2023',
    category: 'FINTECH // ALTERNATIVE DATA // RISK MODELLING',
    image: '/images/Project_6.jpg',
    techStack: ['PYTHON', 'SCIKIT-LEARN', 'XGBOOST', 'PANDAS', 'SQL'],
    summary: 'Engineered a hybrid vetting system for Beam/Mission Mobile to assess "thin-file" customers using alternative data signals.',
    challenge: 'Traditional credit models failed to score unbanked or "thin-file" customers, limiting the lender\'s addressable market. Relying solely on bureau data resulted in high rejection rates for potentially creditworthy individuals.',
    solution: 'Built a **Hybrid Risk Engine** that ingests non-traditional data points—specifically **Telco usage logs, Deeds Office records, and Bank Statement analysis**. I engineered a composite scoring model that correlates these behavioral signals with repayment probability, creating a robust proxy for creditworthiness where no bureau history existed.',
    impact: 'Significantly expanded the addressable lending market by accurately identifying low-risk borrowers within the "unscorable" population, simultaneously minimizing default rates through better risk stratification.'
  },
  {
    id: 'retail-clusters',
    title: 'RETAIL_PERFORMANCE_CLUSTERS',
    year: '2023',
    category: 'UNSUPERVISED LEARNING // SALES OPS // GEOSPATIAL',
    image: '/images/Project_7.jpg',
    techStack: ['K-MEANS', 'DBSCAN', 'PYTHON', 'SCIKIT-LEARN', 'GEOSPATIAL ANALYTICS'],
    summary: 'Solved unfair sales evaluations by developing a geospatial clustering model to segment retail outlets into comparable peer groups.',
    challenge: 'Sales representatives were being evaluated on a flat baseline, regardless of store potential. A rep in a low-traffic rural store was held to the same targets as one in a high-traffic mega-mall. This "One-Size-Fits-All" KPI structure caused massive dissatisfaction, data noise, and churn among high-potential staff in tough locations.',
    solution: 'Engineered a **Geospatial Clustering Engine** utilizing **K-Means** and **DBSCAN**. Instead of arbitrary geographic boundaries, the model segments retail stores into "Peer Groups" based on 15+ latent features, including **floor size, catchment area household income, and foot traffic density**. This ensured reps were only compared against peers in mathematically similar environments.',
    impact: 'Revolutionized the performance evaluation framework. The new model enabled **Fair, Context-Aware KPIs**, significantly boosting sales force morale. It allowed management to accurately distinguish between "Poor Performance" and "Poor Location," optimizing resource allocation.'
  },

  {
    id: 'price-oracle',
    title: 'USED_CAR_PRICING_ENGINE',
    year: '2022',
    category: 'PREDICTIVE ANALYTICS // RETAIL // ALGORITHMIC PRICING',
    image: '/images/Project_8.avif',
    techStack: ['PYTHON', 'RANDOM FOREST', 'XGBOOST', 'SCIKIT-LEARN', 'FLASK'],
    summary: 'Engineered a high-precision valuation engine to eliminate pricing bias in the automotive resale market.',
    challenge: 'Legacy pricing models relied on manual appraisals, introducing significant human bias and inconsistency. This "gut-feeling" approach caused revenue leakage on sales and overpayment on acquisitions, directly eroding profit margins.',
    solution: 'Architected a **Multi-Model Regression Engine** using Random Forest and XGBoost to predict asset value with high precision. The system analyzes historical auction data and vehicle condition reports to generate instant, bias-free buy/sell price recommendations for the sales team.',
    impact: 'Achieved a **96% R² Score**, virtually eliminating human error in pricing. The model directly increased average revenue per unit by **10%** and reduced transaction negotiation time by **15%**, streamlining the entire inventory lifecycle.'
  },
  {
    id: 'residual-value-oracle',
    title: 'RESIDUAL_VALUE_FORECAST',
    year: '2021',
    category: 'FINTECH // RISK MODELLING // ASSET VALUATION',
    image: '/images/Project_9.jpg',
    techStack: ['PYTHON', 'ELASTIC NET', 'RIDGE/LASSO', 'SCIKIT-LEARN', 'PANDAS'],
    summary: 'Developed a core financial model for **Avis** to predict future asset depreciation, directly securing lease profitability.',
    challenge: 'Setting monthly lease premiums requires a perfect prediction of what a car will be worth years in the future. Inaccurate "Residual Values" exposed the company to massive financial risk—either under-pricing premiums (losing margin) or over-pricing (losing customers).',
    solution: 'Engineered a robust **Supervised Learning Framework** using Elastic Net and Regularized Regression (Lasso/Ridge). This model analyzes historical depreciation curves and market volatility to generate precise future-value estimates, allowing the finance team to structure leases with mathematical confidence.',
    impact: 'Directly reduced financial losses from estimation errors by **12%**, saving significant capital on asset disposal. The improved accuracy allowed for more competitive premium pricing, driving a **7% increase** in customer satisfaction scores.'
  },

  {
    id: 'vision-damage',
    title: 'VISION_DAMAGE_ESTIMATOR',
    year: '2021',
    category: 'COMPUTER VISION // MLOPS // SAAS',
    image: '/images/Project_10.avif',
    techStack: ['AZURE', 'MASK R-CNN', 'YOLO', 'PYTHON', 'DOCKER'],
    summary: 'Architected a production-grade SaaS on Azure using an ensemble of CNN models to automate insurance claims processing.',
    challenge: 'The insurance claims lifecycle was bottlenecked by manual third-party assessments. The process was slow, highly subjective, and expensive, leading to "claims leakage" and poor customer retention.',
    solution: 'Developed a state-of-the-art SaaS offering hosted on Microsoft Azure. I engineered an ensemble pipeline combining **Mask R-CNN** (segmentation) and **YOLO** (detection) to automatically identify, classify, and quantify vehicle damage severity from user-uploaded images.',
    impact: 'Eliminated reliance on third-party assessors, achieving annual OPEX savings of **~$200,000 (ZAR 3.5M)**. Reduced the claim settlement lifecycle by 4 full days, significantly boosting operational throughput.'
  },

  {
    id: 'fraud-shield',
    title: 'INSURANCE_FRAUD_DETECTION',
    year: '2020',
    category: 'PREDICTIVE AI // FINTECH // RISK INTELLIGENCE',
    image: '/images/Project_11.jpg',
    techStack: ['PYTHON', 'SCIKIT-LEARN', 'XGBOOST', 'PANDAS', 'SQL'],
    summary: 'Partnered with AIG Insurance to deploy a high-precision fraud detection engine that saved $1M+ annually.',
    challenge: 'The insurer was facing significant financial leakage due to sophisticated fraudulent claims. Manual review processes were reactive, slow, and failed to catch complex patterns, threatening the integrity of the insurance portfolio.',
    solution: 'Collaborated directly with **AIG Insurance** to architect a Machine Learning-based Fraud Detection System. I implemented advanced regression and classification algorithms to score claims in real-time, creating a "Prioritized Review Queue" that flagged high-risk anomalies for immediate investigation.',
    impact: 'Achieved a **92% Model Accuracy** rate, directly leading to a **25% reduction** in successful fraudulent claims. The system generated verified savings of over **$1 Million (ZAR 15M)** in its first year of operation.'
  },

  {
    id: 'fleet-forecast',
    title: 'FLEET_DEMAND_FORECAST',
    year: '2019',
    category: 'PREDICTIVE LOGISTICS // TIME SERIES // SUPPLY CHAIN',
    image: '/images/Project_12.jpg',
    techStack: ['PYTHON', 'ARIMA', 'STATSMODELS', 'SQL', 'PANDAS'],
    summary: 'Built a time-series forecasting engine for **Avis/Budget Group** to optimize fleet distribution across 3 subsidiaries.',
    challenge: 'Managing vehicle inventory across **Avis/Budget Group** was inefficient due to demand volatility. The lack of accurate demand sensing led to "stock-outs" in high-demand locations and idle inventory elsewhere, directly hurting fleet utilization and revenue.',
    solution: 'Developed an enterprise-grade **Time Series Forecasting Engine** using ARIMA and Seasonal Decomposition (STL). This system predicted demand variance across **Avis Fleet, Rental, and Used Car Sales**, enabling proactive inventory balancing rather than reactive shuffling.',
    impact: 'Directly improved **Fleet Utilization by 15%**, significantly reducing operational overhead. The model allowed the organization to achieve **"Optimum Inventory Levels"**, preventing both over-stocking capital risks and under-stocking revenue loss.'
  },
  {
    id: 'fuel-fraud-sentinel',
    title: 'FUEL_CARD_FRAUD_DETECTION',
    year: '2018',
    category: 'FINTECH // FORENSIC ANALYTICS // SECURITY',
    image: '/images/Project_13.png',
    techStack: ['PYTHON', 'ISOLATION FOREST', 'ONE-CLASS SVM', 'PANDAS', 'SCIKIT-LEARN'],
    summary: 'Deployed an unsupervised anomaly detection system to secure corporate fuel expenditures against sophisticated fraud.',
    challenge: 'Corporate fuel cards were a major vector for financial leakage. Traditional "rules-based" checks failed to catch subtle abuse patterns (e.g., fuel siphoning, location mismatch), resulting in unchecked operational losses.',
    solution: 'Implemented an **Unsupervised Anomaly Detection Core** using Isolation Forest and One-Class SVM. Unlike standard classifiers, this system requires no labeled fraud data—it automatically learns "normal" behavior and flags statistical outliers (zero-day anomalies) for forensic review.',
    impact: 'Achieved an **88% Detection Accuracy** on previously unseen fraud vectors. The system proactively flagged misuse, significantly mitigating financial risk and tightening the security posture of the fleet operations.'
  },
  {
    id: 'service-plan-pricing',
    title: 'ACTUARIAL_RATE_ENGINE',
    year: '2018',
    category: 'PREDICTIVE MODELING // ACTUARIAL SCIENCE // PRICING',
    image: '/images/Project_14.jpg',
    techStack: ['PYTHON', 'LASSO REGRESSION', 'RIDGE REGRESSION', 'STATSMODELS', 'NUMPY'],
    summary: 'Engineered a regularized regression framework to optimize service plan pricing and protect profit margins.',
    challenge: 'The existing pricing model for service plans was static and reactive. It failed to account for complex cost drivers, leading to a "Pricing Gap", either under-charging (losing margin) or over-charging (losing customers).',
    solution: 'Built a **Regularized Regression Framework** (Lasso & Ridge) to mathematically isolate high-impact cost features while suppressing noise. This "Data-Driven Actuary" approach allows for dynamic rate setting based on historical risk profiles rather than gut instinct.',
    impact: 'Increased **Pricing Accuracy by 20%**, directly optimizing the Risk-to-Revenue ratio. The model enabled the sales team to offer competitive, yet profitable, rates—simultaneously boosting customer satisfaction and protecting the bottom line.'
  },


  {
    id: 'predictive-maintenance-spark',
    title: 'FLEET_PREDICTIVE_MAINTENANCE',
    year: '2018',
    category: 'BIG DATA // IOT TELEMETRY // CLOUD COMPUTING',
    image: '/images/Project_15.jpg',
    techStack: ['APACHE SPARK', 'AZURE DATABRICKS', 'PYSPARK', 'IOT HUBS', 'PYTHON'],
    summary: 'Architected a Big Data Proof-of-Concept on Azure Spark to transition fleet operations from reactive to predictive maintenance.',
    challenge: 'Avis operated on a "Reactive Maintenance" model—fixing cars only after they broke. This resulted in costly unscheduled downtime and logistics bottlenecks. The sheer volume of vehicle sensor data (telemetry) was too massive for traditional SQL databases to process effectively.',
    solution: 'Engineered a scalable **Distributed Computing Pipeline** using **Apache Spark on Microsoft Azure**. I utilized PySpark to ingest, clean, and analyze terabytes of high-frequency sensor data, building the foundation for a model that identifies pre-failure signatures in engine performance.',
    impact: 'Successfully validated the **Strategic Feasibility** of Big Data analytics for the fleet. The POC demonstrated a clear roadmap to reduce vehicle downtime by proactively scheduling repairs, securing executive buy-in for a full-scale enterprise rollout.'
  }
];

// =============================================================================
//  EXPERIENCE LOG
// =============================================================================
export const EXPERIENCE = [
  {
    id: 1,
    year: "2022 - PRESENT",
    role: "GROUP LEAD DATA SCIENTIST",
    company: "E-CENTIVE & IGNITE",
    location: "ABU DHABI/DUBAI",
    metric: "Built the Data Science division from scratch. Deployed GenAI Voice Agents & RAG Knowledge Assistants, reducing Call Center TTR by 20%."
  },
  {
    id: 2,
    year: "2021 - 2022",
    role: "SENIOR DATA SCIENTIST",
    company: "ZENSAR TECHNOLOGIES",
    location: "JOHANNESBURG",
    metric: "Developed Used Car Pricing Engines (XGBoost) for Avis Fleet. Increased revenue per unit by 10% and reduced financial forecasting errors by 12%."
  },
  {
    id: 3,
    year: "2019 - 2021",
    role: "TECH PRODUCT OWNER (DS)",
    company: "AVIS FLEET",
    location: "JOHANNESBURG",
    metric: "Launched AI Vehicle Damage Detection (Computer Vision/Azure). Automated claims processing, reducing settlement time by 4 days and saving $200k/year."
  },
  // --- NEW ROLE 1 ---
  {
    id: 'data-engineer-avis',
    year: 'JAN 2018 - JUN 2018',
    role: 'DATA ENGINEER',
    company: 'AVIS FLEET',
    location: 'JOHANNESBURG',
    metric: 'Engineered Big Data pipelines on Azure Spark. Delivered a Predictive Maintenance POC that validated the feasibility of fleet telemetry analytics.'
  },
  // --- NEW ROLE 2 ---
  {
    id: 'tech-specialist-avis',
    year: 'JUL 2016 - DEC 2017',
    role: 'TECHNICAL SPECIALIST',
    company: 'AVIS FLEET',
    location: 'JOHANNESBURG',
    metric: 'Co-led the AS/400 to Azure modernization. Managed a team of 60+ consultants to rewrite legacy leasing systems into a modern SaaS platform.'
  },
  {
    id: 4,
    year: "2010 - 2014",
    role: "SENIOR SOFTWARE ENGINEER",
    company: "GALAXE SOLUTIONS & IBM INDIA",
    location: "BANGALORE",
    metric: "Led the enterprise migration of Pharmacy Claims (Aetna to CVS). Managed offshore delivery for mission-critical AS/400 systems with zero defects."
  }
];



export const API_URL = import.meta.env.VITE_API_URL || "http://localhost:8000";