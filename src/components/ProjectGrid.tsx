import React, { useState, useMemo, useEffect } from 'react';
import { Button } from './Button';
import { Filter, Search, Terminal, ArrowUpRight, Layers } from 'lucide-react';
import { SectionDivider } from './SectionDivider';
import { ProjectModal, Project } from './ProjectModal';

// --- RESUME DATA SOURCE (SINGLE SOURCE OF TRUTH) ---
// Extracted directly from Satish_Singh_resume.pdf and Satish Rohit Singh CV_Lead_Data_Scientist.pdf
const RESUME_DATA: Project[] = [
  // --- CARD 1: PORTFOLIO ---
  {
    id: 'portfolio-agent',
    title: 'AI_PORTFOLIO_AGENT',
    category: 'Agents',
    image: '/images/Project_1.avif',
    techStack: ['AGENTS', 'RAG', 'REACT', 'GEMINI 2.5'],
    summary: 'A self-aware digital twin built with RAG. It parses my real resume, interacts with recruiters via voice/chat, and performs gap analysis on uploaded Job Descriptions.',
    challenge: 'Recruiters spend <10s on portfolios. Static sites fail to demonstrate actual AI engineering capabilities.',
    solution: 'Built a full-stack RAG agent using Gemini 2.5 Flash. It ingests my resume/projects into Pinecone and answers questions contextually.',
    impact: 'Reduced "time-to-understanding" for recruiters. Demonstrates full-stack AI capability live in the browser.'
  },
  // --- CARD 2: RAG BOT ---
  {
    id: 'knowledge-bot',
    title: 'ENTERPRISE_KNOWLEDGE_BOT',
    category: 'RAG',
    image: '/images/Project_2.avif',
    techStack: ['RAG', 'DATA_ENG', 'LANGCHAIN', 'PINEONE'],
    summary: 'Developed a GenAI search tool allowing call center agents to instantly query thousands of internal documents.',
    challenge: 'Call center agents struggled with slow manual document searches, leading to high Time-to-Resolution (TTR).',
    solution: 'Architected a scalable RAG pipeline enabling 40+ agents to query policies instantly using LangChain and Vector DBs.',
    impact: 'Reduced Time-to-Resolution (TTR) by 20% and accelerated new agent onboarding.'
  },
  // --- CARD 3: VISION DAMAGE ---
  {
    id: 'vision-damage',
    title: 'VISION_DAMAGE_ESTIMATOR',
    category: 'ML Ops',
    image: '/images/Project_3.avif',
    techStack: ['COMPUTER VISION', 'YOLO', 'AZURE', 'CNN'],
    summary: 'Launched a SaaS offering on Azure using CNN, Mask R-CNN, and YOLO to automate damage assessment from images.',
    challenge: 'Manual vehicle damage assessment was slow, subjective, and prone to human error.',
    solution: 'Deployed a Computer Vision pipeline on Azure using Mask R-CNN and YOLO for automated defect recognition.',
    impact: 'Reduced claim settlement lifecycle by 4 days and achieved annual savings of ~$200,000.'
  },
  // --- CARD 4: PRICING ENGINE ---
  {
    id: 'predictive-pricing',
    title: 'PREDICTIVE_PRICING_CORE',
    category: 'Data Eng',
    image: '/images/Project_4.avif',
    techStack: ['XGBOOST', 'SCIKIT-LEARN', 'PYTHON'],
    summary: 'Built a multi-model valuation engine using Random Forest & XGBoost to estimate buy/sell prices with 96% R-square accuracy.',
    challenge: 'Inaccurate manual pricing for fleet remarketing led to revenue leakage and slow transaction cycles.',
    solution: 'Engineered a valuation core using Ensemble Methods (Random Forest + XGBoost) trained on historical auction data.',
    impact: 'Increased average revenue per car by 10% and reduced transaction cycle times by 15%.'
  },
  // --- CARD 5: GENAI CONTENT HUB ---
  {
    id: 'genai-content',
    title: 'GENAI_LEARNING_ECOSYSTEM',
    category: 'RAG',
    image: '/images/Project_5.jpg',
    techStack: ['GENAI', 'MULTI-MODAL', 'FFMPEG', 'OPENAI'],
    summary: 'Architected a multi-modal content engine that ingests raw OEM assets (Images, PDFs, Videos) to automatically generate training modules.',
    challenge: 'Reliance on external field training teams was costly and slow to update.',
    solution: 'Created a pipeline to ingest raw PDFs/Videos and synthesize interactive training content using Multi-modal LLMs.',
    impact: 'Replaced external field training teams with a one-stop integrated learning platform.'
  },
  // --- CARD 6: FRAUD SHIELD ---
  {
    id: 'fraud-shield',
    title: 'INSURANCE_FRAUD_SHIELD',
    category: 'ML Ops',
    image: '/images/Project_6.jpg',
    techStack: ['ANOMALY DETECTION', 'AWS', 'SKLEARN'],
    summary: 'Led the implementation of an ML fraud detection system (92% accuracy) in collaboration with AIG.',
    challenge: 'Rising fraudulent claims were causing significant financial leakage.',
    solution: 'Implemented an automated flagging system using anomaly detection algorithms on claim metadata.',
    impact: 'Reduced fraudulent claims by 25%, saving ~$1 Million (ZAR 15M).'
  },
  // --- LIST ITEMS (The rest of the Resume) ---
  // DETAILS ENRICHED FROM 'Satish Rohit Singh CV_Lead_Data_Scientist.pdf'
  {
    id: 'retail-clusters',
    title: 'RETAIL_SEGMENTATION_CLUSTERS',
    category: 'Data Eng',
    image: '/images/Project_7.jpg',
    techStack: ['K-MEANS', 'DBSCAN', 'CLUSTERING'],
    summary: 'Solved unfair sales evaluations by developing clustering models to segment retail outlets.',
    challenge: 'Assessing sales rep performance was unfair due to varying characteristics of retail stores (mall size, income levels). [cite: 151]',
    solution: 'Developed clustering models (K-Means, DBSCAN) to segment retail stores based on floor size, household income, and catchment population. [cite: 153]',
    impact: 'Facilitated accurate performance evaluations and enabled targeted marketing strategies for specific store types. [cite: 154]'
  },
  {
    id: 'credit-scoring',
    title: 'ALTERNATIVE_CREDIT_SCORING',
    category: 'Data Eng',
    image: '/images/Project_8.jpg',
    techStack: ['RISK MODELING', 'HYBRID SCORING', 'PANDAS'],
    summary: 'Engineered a hybrid vetting system that moves beyond traditional bureau scores by ingesting alternative data.',
    challenge: 'Traditional bureau scores excluded "thin-file" customers from lending opportunities, limiting market reach.',
    solution: 'Ingested alternative data sources (Telco logs, bank statements) to build a hybrid risk score for unbanked customers.',
    impact: 'Improved lending accuracy and expanded the addressable market while minimizing default risk.'
  },
  {
    id: 'demand-forecast',
    title: 'FLEET_DEMAND_FORECAST',
    category: 'Data Eng',
    image: '/images/Project_9.jpg',
    techStack: ['ARIMA', 'TIME-SERIES', 'STL'],
    summary: 'Built Time Series models (ARIMA, STL) to predict fleet demand across locations.',
    challenge: 'Accurately forecasting car rental demand was critical to optimize fleet utilization and reduce operational costs. [cite: 229]',
    solution: 'Developed a Time Series model using ARIMA and STL (Seasonal Decomposition) to predict demand across various locations. [cite: 230]',
    impact: 'Improved fleet utilization by 15%, allowing the organization to avoid over/under stocking. [cite: 232]'
  }
];

interface ProjectGridProps {
  filter: string | null;
  setFilter: (filter: string | null) => void;
}

export const ProjectGrid: React.FC<ProjectGridProps> = ({ filter, setFilter }) => {
  const [searchTerm, setSearchTerm] = useState(filter || '');
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);

  useEffect(() => {
    setSearchTerm(filter || '');
  }, [filter]);

  const categories = ['RAG', 'Agents', 'Data Eng', 'ML Ops'];

  // --- FILTERING LOGIC ---
  const { gridProjects, listProjects, totalCount } = useMemo(() => {
    const lowerTerm = searchTerm ? searchTerm.toLowerCase() : '';

    const filtered = RESUME_DATA.filter(p => {
      if (!lowerTerm) return true;
      return (
        p.techStack.some(tag => tag.toLowerCase().includes(lowerTerm)) ||
        p.summary.toLowerCase().includes(lowerTerm) ||
        p.title.toLowerCase().includes(lowerTerm) ||
        p.category.toLowerCase().includes(lowerTerm)
      );
    });

    return {
      gridProjects: filtered.slice(0, 6), // Top 6 always cards
      listProjects: filtered.slice(6),    // Rest are list
      totalCount: filtered.length
    };
  }, [searchTerm]);

  // --- HANDLERS ---
  const handlePresetClick = (category: string) => {
    const newVal = searchTerm === category ? '' : category;
    setSearchTerm(newVal);
    setFilter(newVal || null);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = e.target.value;
    setSearchTerm(val);
    setFilter(val === '' ? null : val);
  };

  return (
    <section id="projects" className="w-full border-b-3 border-black bg-white flex flex-col pt-12">
      <SectionDivider title="[ PROJECT_DATABASE ]" />

      {/* --- CONTROL PANEL --- */}
      <div className="w-full border-b-3 border-black bg-power p-6 flex flex-col xl:flex-row gap-6 items-start xl:items-center justify-between sticky top-0 z-30 shadow-md">

        {/* Filter Buttons */}
        <div className="flex flex-col md:flex-row gap-4 items-start md:items-center w-full xl:w-auto">
          <div className="flex items-center gap-2 border-b-2 border-black pb-1 md:border-none md:pb-0">
            <Filter size={20} className="text-black" />
            <h3 className="font-black text-lg uppercase tracking-tighter whitespace-nowrap">PROTOCOLS:</h3>
          </div>
          <div className="flex flex-wrap gap-2 w-full">
            <button
              onClick={() => { setSearchTerm(''); setFilter(null); }}
              className={`px-4 py-2 font-mono font-bold text-xs uppercase border-3 border-black transition-all ${!searchTerm ? 'bg-black text-white' : 'bg-white text-black hover:bg-black hover:text-white'}`}
            >
              [ALL]
            </button>
            {categories.map(cat => (
              <button
                key={cat}
                onClick={() => handlePresetClick(cat)}
                className={`px-4 py-2 font-mono font-bold text-xs uppercase border-3 border-black transition-all ${searchTerm === cat ? 'bg-black text-white' : 'bg-white text-black hover:bg-black hover:text-white'}`}
              >
                [{cat}]
              </button>
            ))}
          </div>
        </div>

        {/* Search Bar */}
        <div className="w-full xl:w-96">
          <div className="relative group">
            <div className="absolute top-3 left-3 text-power pointer-events-none z-10">
              <Terminal size={16} />
            </div>
            <input
              type="text"
              value={searchTerm}
              onChange={handleInputChange}
              placeholder="> SEARCH DATABASE..."
              className="w-full bg-black text-power font-mono font-bold text-sm p-3 pl-10 border-3 border-black placeholder:text-gray-500 focus:outline-none focus:ring-2 focus:ring-white/50"
            />
          </div>
        </div>
      </div>

      {/* --- MAIN CONTENT --- */}
      <div className="flex-grow p-6 md:p-12 bg-gray-50 flex flex-col">

        {/* --- SECTION 1: DEPLOYED UNITS (Grid) --- */}
        <div className="flex items-end justify-between mb-8 border-b-3 border-black pb-4">
          <h2 className="text-3xl md:text-5xl font-black uppercase tracking-tighter">
            DEPLOYED_UNITS
          </h2>
        </div>

        {/* Grid Render */}
        {gridProjects.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-16">
            {gridProjects.map((project) => (
              <div
                key={project.id}
                className="group relative flex flex-col border-3 border-black bg-white transition-all duration-200 hover:shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] hover:-translate-y-1 cursor-pointer"
                onClick={() => setSelectedProject(project)}
              >
                {/* Image */}
                <div className="w-full h-48 border-b-3 border-black overflow-hidden bg-gray-200 relative">
                  {project.image ? (
                    <img src={project.image} alt={project.title} className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-500" />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center bg-gray-100 group-hover:bg-gray-200 transition-colors">
                      <Layers size={48} className="text-gray-300 group-hover:text-gray-400" />
                    </div>
                  )}
                  <div className="absolute top-2 right-2 bg-black text-white px-2 py-1 font-mono text-[10px] font-bold">
                    2024
                  </div>
                </div>

                {/* Content */}
                <div className="p-5 flex flex-col flex-grow">
                  <h3 className="text-xl font-black mb-3 leading-tight uppercase font-mono truncate group-hover:text-power transition-colors" title={project.title}>
                    {project.title}
                  </h3>
                  <div className="flex flex-wrap gap-2 mb-4">
                    {project.techStack.slice(0, 3).map((tag) => (
                      <span key={tag} className="px-1.5 py-0.5 text-[10px] font-mono font-bold border border-black bg-gray-100 uppercase">
                        {tag}
                      </span>
                    ))}
                  </div>
                  <p className="font-mono text-xs text-gray-600 mb-6 flex-grow leading-relaxed line-clamp-3">
                    {project.summary}
                  </p>
                  <div className="w-full border-2 border-black py-2 flex items-center justify-center gap-2 font-mono text-xs font-bold uppercase group-hover:bg-black group-hover:text-white transition-all">
                    <span>VIEW CASE STUDY</span>
                    <ArrowUpRight size={14} />
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="w-full p-12 border-3 border-black border-dashed bg-white text-center font-mono text-gray-400 mb-12">
            NO_DEPLOYED_UNITS_FOUND_FOR_QUERY "{searchTerm}"
          </div>
        )}

        {/* --- SECTION 2: OLDER REPOS (List) --- */}
        {listProjects.length > 0 && (
          <div className="w-full">
            <div className="flex items-center gap-3 mb-4">
              <p className="font-mono text-xs font-bold text-gray-400 hidden md:block">
                {'>'} SELECT * FROM OLDER_REPOS WHERE STATUS='ARCHIVED'
              </p>
            </div>

            <div className="w-full border-3 border-black bg-white">
              <div className="hidden md:grid grid-cols-12 gap-4 py-3 border-b-3 border-black bg-gray-100 font-mono text-xs font-bold text-gray-500 px-6 uppercase">
                <div className="col-span-2">DATE</div>
                <div className="col-span-4">PROJECT_ID</div>
                <div className="col-span-5">TECH_STACK</div>
                <div className="col-span-1 text-right">ACTION</div>
              </div>

              {/* <div className="flex flex-col divide-y-2 divide-gray-100">
                {listProjects.map((project) => (
                  <div
                    key={project.id}
                    onClick={() => setSelectedProject(project)}
                    className="group grid grid-cols-1 md:grid-cols-12 gap-2 md:gap-4 py-4 px-6 hover:bg-yellow-50 transition-colors items-center cursor-pointer"
                  >
                    <div className="col-span-2 font-mono text-xs font-bold text-gray-500">
                      2023
                    </div>
                    <div className="col-span-4 font-black text-sm uppercase text-black group-hover:text-power transition-colors truncate pr-4">
                      {project.title}
                    </div>
                    <div className="col-span-5 flex flex-wrap gap-2">
                      {project.techStack.slice(0, 4).map((tag: string) => (
                        <span key={tag} className="text-[10px] font-mono border border-gray-200 bg-gray-50 px-1.5 py-0.5 text-gray-600 group-hover:border-black group-hover:bg-white transition-colors uppercase">
                          {tag}
                        </span>
                      ))}
                    </div>
                    <div className="col-span-1 flex justify-end">
                      <div className="p-1 border border-transparent group-hover:border-black group-hover:bg-white rounded-none transition-all">
                        <ArrowUpRight size={16} className="text-gray-300 group-hover:text-black" />
                      </div>
                    </div>
                  </div>
                ))}
              </div> */}

              <div className="flex flex-col divide-y-2 divide-gray-100">
                {listProjects.map((project) => (
                  <div
                    key={project.id}
                    onClick={() => setSelectedProject(project)}
                    className="group relative grid grid-cols-1 md:grid-cols-12 gap-2 md:gap-4 py-4 px-6 hover:bg-yellow-50 transition-colors items-start md:items-center cursor-pointer"
                  >
                    {/* DATE */}
                    <div className="col-span-2 font-mono text-xs font-bold text-gray-400 md:text-gray-500 mb-1 md:mb-0">
                      2023
                    </div>

                    {/* TITLE (Added padding-right on mobile so text doesn't hit the arrow) */}
                    <div className="col-span-4 font-black text-sm uppercase text-black group-hover:text-power transition-colors truncate pr-8 md:pr-0">
                      {project.title}
                    </div>

                    {/* TECH STACK */}
                    <div className="col-span-5 flex flex-wrap gap-2 mt-2 md:mt-0">
                      {project.techStack.slice(0, 4).map((tag: string) => (
                        <span key={tag} className="text-[10px] font-mono border border-gray-200 bg-gray-50 px-1.5 py-0.5 text-gray-600 group-hover:border-black group-hover:bg-white transition-colors uppercase">
                          {tag}
                        </span>
                      ))}
                    </div>

                    {/* ARROW: Absolute Top-Right on Mobile, Grid Column on Desktop */}
                    <div className="absolute top-4 right-4 md:static md:col-span-1 md:flex md:justify-end">
                      <div className="p-1 border border-transparent group-hover:border-black group-hover:bg-white rounded-none transition-all">
                        <ArrowUpRight size={18} className="text-gray-300 group-hover:text-black md:w-5 md:h-5" />
                      </div>
                    </div>

                  </div>
                ))}
              </div>
            </div>
          </div>
        )}
      </div>

      {/* --- MODAL --- */}
      <ProjectModal
        isOpen={!!selectedProject}
        project={selectedProject}
        onClose={() => setSelectedProject(null)}
      />
    </section>
  );
};