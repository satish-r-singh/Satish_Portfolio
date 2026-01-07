// import React from 'react';
// import { SectionDivider } from './SectionDivider';
// import { Cpu, LineChart, GitBranch, Users, Brain, Activity } from 'lucide-react';

// export const SkillsMatrix: React.FC = () => {
//   const skills = [
//     {
//       title: "GENERATIVE AI MODULE",
//       description: "Architecting retrieval pipelines and agentic workflows for high-accuracy constraints.",
//       tags: ["RAG", "LangGraph", "Vector DBs", "Prompt Eng", "Evaluation", "Gemini API", "Explainable AI / XAI"],
//       stats: { exp: "4Y", proj: "12", status: "ACTIVE" },
//       isHighlight: true,
//       icon: Brain
//     },
//     {
//       title: "DATA STRATEGY UNIT",
//       description: "Translating technical capabilities into roadmap execution and quantifiable business value.",
//       tags: ["Leadership", "Hiring", "Roadmapping", "Stakeholder Mgmt", "Cost Opt"],
//       stats: { exp: "6Y", teams: "03", roi: "HIGH" },
//       isHighlight: false,
//       icon: Activity
//     },
//     {
//       title: "ENGINEERING CORE",
//       description: "Full-stack development of data platforms and scalable production systems.",
//       tags: ["Python", "AWS", "Docker", "FastAPI", "Terraform", "Postgres"],
//       stats: { exp: "7Y", commits: "500K+", uptime: "99.9%" },
//       isHighlight: false,
//       icon: Cpu
//     },
//     {
//       title: "ML OPS PIPELINE",
//       description: "End-to-end lifecycle management, model monitoring, and automated deployment.",
//       tags: ["CI/CD", "MLflow", "Kubernetes", "Airflow", "Prometheus", "Grafana"],
//       stats: { exp: "5Y", pipes: "20+", drift: "MONITORED" },
//       isHighlight: false,
//       icon: GitBranch
//     },
//     {
//       title: "ANALYTICS ENGINE",
//       description: "Advanced statistical modeling and visualization for tactical decision support.",
//       tags: ["SQL", "Tableau", "A/B Testing", "Looker", "Pandas", "dbt"],
//       stats: { exp: "8Y", dashboards: "50+", views: "1M+" },
//       isHighlight: false,
//       icon: LineChart
//     },
//     {
//       title: "HUMAN PROTOCOLS",
//       description: "Essential soft skills for technical leadership and effective knowledge transfer.",
//       tags: ["Public Speaking", "Mentoring", "Agile", "Tech Writing", "Negotiation"],
//       stats: { mentored: "15+", talks: "05", rating: "A+" },
//       isHighlight: false,
//       icon: Users
//     }
//   ];

//   return (
//     <section id="skills" className="w-full pt-12 pb-24 bg-white border-b-3 border-black">
//       <SectionDivider title="[ TECHNICAL_INVENTORY ]" />
//       <div className="max-w-[1920px] mx-auto px-6 md:px-12 mt-16">

//         <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
//           {skills.map((skill, i) => (
//             <div 
//               key={i} 
//               className={`
//                 relative flex flex-col border-3 border-black bg-white
//                 shadow-hard hover:shadow-none hover:translate-x-1 hover:translate-y-1 transition-all duration-200
//                 bg-[linear-gradient(to_right,#f0f0f0_1px,transparent_1px),linear-gradient(to_bottom,#f0f0f0_1px,transparent_1px)] bg-[size:20px_20px]
//               `}
//             >
//               {/* Header */}
//               <div className={`
//                 w-full px-5 py-3 border-b-3 border-black flex items-center justify-between
//                 ${skill.isHighlight ? 'bg-power text-black' : 'bg-black text-white'}
//               `}>
//                 <h3 className="font-black text-lg uppercase tracking-wider flex items-center gap-2">
//                    {skill.title}
//                 </h3>
//                 <skill.icon size={20} strokeWidth={2.5} />
//               </div>

//               {/* Body */}
//               <div className="p-5 flex flex-col flex-grow backdrop-blur-[2px]">
//                 <p className="font-mono text-xs md:text-sm font-bold text-gray-600 mb-6 leading-relaxed border-l-2 border-gray-300 pl-3">
//                    {skill.description}
//                 </p>

//                 <div className="flex flex-wrap content-start gap-2 mb-4">
//                   {skill.tags.map(tag => (
//                     <span key={tag} className="font-mono text-[10px] md:text-xs font-bold border-2 border-black bg-white px-2 py-1 uppercase hover:bg-black hover:text-white transition-colors cursor-default">
//                       {tag}
//                     </span>
//                   ))}
//                 </div>
//               </div>

//               {/* Footer / Metadata */}
//               <div className="border-t-3 border-black bg-gray-50 p-3 flex flex-wrap gap-y-2 font-mono text-[10px] md:text-xs font-bold uppercase tracking-tight">
//                   {Object.entries(skill.stats).map(([key, value], idx, arr) => (
//                       <React.Fragment key={key}>
//                           <span className="text-gray-500 whitespace-nowrap">
//                             [{key}: <span className="text-black">{value}</span>]
//                           </span>
//                           {idx < arr.length - 1 && <span className="mx-2 text-gray-300">|</span>}
//                       </React.Fragment>
//                   ))}
//               </div>
//             </div>
//           ))}
//         </div>
//       </div>
//     </section>
//   );
// };


// import React from 'react';
// import { SectionDivider } from './SectionDivider';
// import { Cpu, LineChart, GitBranch, Users, Brain, Eye, Activity } from 'lucide-react';

// export const SkillsMatrix: React.FC = () => {
//   const skills = [
//     {
//       title: "GENERATIVE AI MODULE",
//       description: "Architecting autonomous agents and RAG pipelines. Moving beyond chatbots to reasoning systems.",
//       tags: ["RAG", "LangChain", "Vector DBs", "Gemini API", "Prompt Eng", "Fine-Tuning"],
//       stats: { exp: "4Y", level: "LEAD", status: "ACTIVE" },
//       isHighlight: true,
//       icon: Brain
//     },
//     {
//       title: "COMPUTER VISION & NLP",
//       description: "Processing unstructured data (Images/Text). Built damage detection systems & verified by Springer research.",
//       tags: ["YOLO", "CNN", "Mask R-CNN", "OpenCV", "BERT", "HuggingFace"],
//       stats: { models: "DEPLOYED", paper: "PUBLISHED", acc: "92%" },
//       isHighlight: false,
//       icon: Eye
//     },
//     {
//       title: "PREDICTIVE MODELING",
//       description: "The math that drives revenue. Specialized in pricing engines, fraud detection, and forecasting.",
//       tags: ["XGBoost", "Scikit-Learn", "Time-Series", "SHAP/LIME", "Pandas", "Statistical Analysis"],
//       stats: { impact: "$1M+ SAVED", r_sq: "96%", type: "SUPERVISED" },
//       isHighlight: false,
//       icon: LineChart
//     },
//     {
//       title: "ENGINEERING & MLOPS",
//       description: "15 years of IT discipline. I build scalable production systems, not just notebooks.",
//       tags: ["Python", "Azure", "Docker", "Kubernetes", "FastAPI", "CI/CD"],
//       stats: { total_exp: "15Y", uptime: "99.9%", cloud: "NATIVE" },
//       isHighlight: false,
//       icon: Cpu
//     },
//     {
//       title: "DATA STRATEGY UNIT",
//       description: "Translating technical capabilities into roadmap execution and quantifiable business value.",
//       tags: ["Buy vs Build", "Team Building", "Roadmapping", "Stakeholder Mgmt", "Cost Opt"],
//       stats: { teams: "BUILT", ventures: "04", roi: "OPTIMIZED" },
//       isHighlight: false,
//       icon: Activity
//     },
//     {
//       title: "KNOWLEDGE TRANSFER",
//       description: "Corporate Trainer & Mentor. Bridging the gap between complex theory and industry application.",
//       tags: ["Public Speaking", "Mentoring", "Tech Writing", "Training", "Curriculum Design"],
//       stats: { students: "100+", rating: "A+", institutes: "MULTIPLE" },
//       isHighlight: false,
//       icon: Users
//     }
//   ];

//   return (
//     <section id="skills" className="w-full pt-12 pb-24 bg-white border-b-3 border-black">
//       <SectionDivider title="[ TECHNICAL_INVENTORY ]" />
//       <div className="max-w-[1920px] mx-auto px-6 md:px-12 mt-16">

//         <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
//           {skills.map((skill, i) => (
//             <div
//               key={i}
//               className={`
//                 relative flex flex-col border-3 border-black bg-white
//                 shadow-hard hover:shadow-none hover:translate-x-1 hover:translate-y-1 transition-all duration-200
//                 bg-[linear-gradient(to_right,#f0f0f0_1px,transparent_1px),linear-gradient(to_bottom,#f0f0f0_1px,transparent_1px)] bg-[size:20px_20px]
//               `}
//             >
//               {/* Header */}
//               <div className={`
//                 w-full px-5 py-3 border-b-3 border-black flex items-center justify-between
//                 ${skill.isHighlight ? 'bg-power text-black' : 'bg-black text-white'}
//               `}>
//                 <h3 className="font-black text-lg uppercase tracking-wider flex items-center gap-2">
//                   {skill.title}
//                 </h3>
//                 <skill.icon size={20} strokeWidth={2.5} />
//               </div>

//               {/* Body */}
//               <div className="p-5 flex flex-col flex-grow backdrop-blur-[2px]">
//                 <p className="font-mono text-xs md:text-sm font-bold text-gray-600 mb-6 leading-relaxed border-l-2 border-gray-300 pl-3">
//                   {skill.description}
//                 </p>

//                 <div className="flex flex-wrap content-start gap-2 mb-4">
//                   {skill.tags.map(tag => (
//                     <span key={tag} className="font-mono text-[10px] md:text-xs font-bold border-2 border-black bg-white px-2 py-1 uppercase hover:bg-black hover:text-white transition-colors cursor-default">
//                       {tag}
//                     </span>
//                   ))}
//                 </div>
//               </div>

//               {/* Footer / Metadata */}
//               <div className="border-t-3 border-black bg-gray-50 p-3 flex flex-wrap gap-y-2 font-mono text-[10px] md:text-xs font-bold uppercase tracking-tight">
//                 {Object.entries(skill.stats).map(([key, value], idx, arr) => (
//                   <React.Fragment key={key}>
//                     <span className="text-gray-500 whitespace-nowrap">
//                       [{key}: <span className="text-black">{value}</span>]
//                     </span>
//                     {idx < arr.length - 1 && <span className="mx-2 text-gray-300">|</span>}
//                   </React.Fragment>
//                 ))}
//               </div>
//             </div>
//           ))}
//         </div>
//       </div>
//     </section>
//   );
// };

import React, { useState } from 'react';
import { SectionDivider } from './SectionDivider';
import { Terminal, Cpu, Database, Cloud, Layout, Users, Radar, Share2, Info } from 'lucide-react';

// --- TYPES & DATA ---
interface Spec {
  category: string;
  icon: any;
  status: string;
  score: number;
  tools: string[];
  details: string;
}

export const SkillsMatrix: React.FC = () => {
  const [activeView, setActiveView] = useState<'list' | 'radar' | 'network'>('list');

  const specs: Spec[] = [
    {
      category: "A.I. & GENERATIVE CORE",
      icon: Terminal,
      status: "PRIMARY FOCUS",
      score: 98,
      tools: ["RAG Pipelines", "LangChain", "Vector DBs", "Gemini API", "Agents"],
      details: "Architecting autonomous reasoning systems and high-accuracy retrieval engines."
    },
    {
      category: "DATA SCIENCE",
      icon: Database,
      status: "15 YEARS EXP",
      score: 90,
      tools: ["Python", "XGBoost", "Pandas", "Scikit-Learn", "Computer Vision", "SQL"],
      details: "Building predictive models for pricing, fraud detection, and demand forecasting."
    },
    {
      category: "CLOUD ENGINEERING",
      icon: Cloud,
      status: "PRODUCTION READY",
      score: 85,
      tools: ["Azure", "Docker", "Kubernetes", "FastAPI", "Postgres", "CI/CD"],
      details: "Full-cycle MLOps: From local notebooks to scalable cloud deployments."
    },
    {
      category: "FULL STACK WEB",
      icon: Layout,
      status: "INTERFACE",
      score: 75,
      tools: ["React", "TypeScript", "Tailwind", "Streamlit", "Node.js"],
      details: "Building interactive front-ends to make AI accessible to non-technical users."
    },
    {
      category: "LEADERSHIP",
      icon: Users,
      status: "MANAGEMENT",
      score: 80,
      tools: ["Team Building", "Strategy", "Roadmapping", "Mentoring", "Agile"],
      details: "Leading data teams and aligning technical execution with business revenue goals."
    }
  ];

  return (
    <section id="skills" className="w-full pt-12 pb-24 bg-white border-b-3 border-black">
      <SectionDivider title="[ SYSTEM_SPECIFICATIONS ]" />

      {/* VIEW TOGGLE CONTROLS */}
      <div className="max-w-6xl mx-auto px-6 mt-8 flex flex-wrap justify-end gap-2">
        <button
          onClick={() => setActiveView('list')}
          className={`px-4 py-2 font-mono text-xs font-bold border-2 border-black flex items-center gap-2 transition-all ${activeView === 'list' ? 'bg-black text-white' : 'bg-white hover:bg-gray-100'}`}
        >
          <Info size={14} /> LIST_VIEW
        </button>
        <button
          onClick={() => setActiveView('radar')}
          className={`px-4 py-2 font-mono text-xs font-bold border-2 border-black flex items-center gap-2 transition-all ${activeView === 'radar' ? 'bg-black text-white' : 'bg-white hover:bg-gray-100'}`}
        >
          <Radar size={14} /> RADAR_HUD
        </button>
        <button
          onClick={() => setActiveView('network')}
          className={`px-4 py-2 font-mono text-xs font-bold border-2 border-black flex items-center gap-2 transition-all ${activeView === 'network' ? 'bg-black text-white' : 'bg-white hover:bg-gray-100'}`}
        >
          <Share2 size={14} /> TOPOLOGY
        </button>
      </div>

      <div className="max-w-6xl mx-auto px-6 md:px-12 mt-8">

        {/* --- VIEW 1: THE LIST (Original) --- */}
        {activeView === 'list' && (
          <div className="border-3 border-black bg-white shadow-hard animate-in fade-in slide-in-from-bottom-4 duration-500">
            <div className="bg-black text-white p-4 flex justify-between items-center border-b-3 border-black">
              <h3 className="font-mono text-xl font-bold uppercase tracking-widest">
                // TECHNICAL_INVENTORY
              </h3>
              <div className="flex gap-2">
                <span className="w-3 h-3 rounded-full bg-red-500 border border-white"></span>
                <span className="w-3 h-3 rounded-full bg-yellow-500 border border-white"></span>
                <span className="w-3 h-3 rounded-full bg-green-500 border border-white"></span>
              </div>
            </div>

            <div className="divide-y-3 divide-black">
              {specs.map((spec, i) => (
                <div key={i} className="group flex flex-col md:flex-row hover:bg-power/20 transition-colors">
                  <div className="w-full md:w-64 p-6 bg-gray-50 md:border-r-3 md:border-black flex flex-col justify-between shrink-0">
                    <div>
                      <div className="flex items-center gap-2 mb-2 text-black">
                        <spec.icon size={20} strokeWidth={2.5} />
                        <h4 className="font-black text-sm uppercase tracking-wider">{spec.category}</h4>
                      </div>
                      <div className="inline-block border border-black bg-white px-2 py-0.5 text-[10px] font-mono font-bold uppercase mb-2">
                        {spec.status}
                      </div>
                    </div>
                  </div>

                  <div className="p-6 flex-grow flex flex-col justify-center">
                    <div className="flex flex-wrap gap-2 mb-4">
                      {spec.tools.map((tool) => (
                        <span key={tool} className="font-mono text-xs font-bold border-2 border-black bg-white px-2 py-1 uppercase shadow-sm group-hover:translate-x-0.5 group-hover:translate-y-0.5 transition-transform">
                          {tool}
                        </span>
                      ))}
                    </div>
                    <p className="font-mono text-xs md:text-sm text-gray-600 border-l-2 border-gray-300 pl-3 leading-relaxed">
                      {spec.details}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* --- VIEW 2: RADAR CHART (Enhanced HUD) --- */}
        {activeView === 'radar' && (
          <div className="w-full h-[600px] border-3 border-black bg-white shadow-hard flex items-center justify-center relative overflow-hidden animate-in zoom-in duration-300">
            <div className="absolute top-4 left-4 bg-power px-2 py-1 font-mono text-xs font-bold uppercase border-2 border-black z-10">
              SKILL_BALANCE_ANALYSIS
            </div>
            <div className="absolute bottom-4 right-4 text-right z-10">
              <div className="font-mono text-[10px] text-gray-400">AXIS_SCALE: 0-100</div>
              <div className="font-mono text-[10px] text-gray-400">DATA_SOURCE: LIVE</div>
            </div>
            <RadarChart data={specs} />
          </div>
        )}

        {/* --- VIEW 3: FORCE GRAPH (Detailed Planetary System) --- */}
        {activeView === 'network' && (
          <div className="w-full h-[600px] border-3 border-black bg-gray-50 shadow-hard flex items-center justify-center relative overflow-hidden animate-in zoom-in duration-300">
            <div className="absolute top-4 left-4 bg-black text-white px-2 py-1 font-mono text-xs font-bold uppercase z-10">
              KNOWLEDGE_GRAPH_TOPOLOGY
            </div>
            <NetworkGraph specs={specs} />
          </div>
        )}

      </div>
    </section>
  );
};

// --- COMPONENT: DETAILED RADAR ---
const RadarChart = ({ data }: { data: Spec[] }) => {
  const size = 500; // Increased size
  const center = size / 2;
  const radius = 160; // Increased radius
  const angleStep = (Math.PI * 2) / data.length;

  const getPoint = (score: number, index: number) => {
    const angle = index * angleStep - Math.PI / 2;
    const r = (score / 100) * radius;
    return {
      x: center + r * Math.cos(angle),
      y: center + r * Math.sin(angle)
    };
  };

  const pathPoints = data.map((d, i) => {
    const p = getPoint(d.score, i);
    return `${p.x},${p.y}`;
  }).join(' ');

  return (
    <svg width="100%" height="100%" viewBox={`0 0 ${size} ${size}`} className="overflow-visible">
      {/* Background Grid Circles */}
      {[0.25, 0.5, 0.75, 1].map((scale, i) => (
        <circle
          key={i}
          cx={center} cy={center} r={radius * scale}
          fill="none" stroke="#e5e7eb" strokeWidth="1" strokeDasharray="4 4"
        />
      ))}

      {/* Axes Lines */}
      {data.map((_, i) => {
        const p = getPoint(110, i); // Extend slightly past 100%
        return <line key={i} x1={center} y1={center} x2={p.x} y2={p.y} stroke="#d1d5db" strokeWidth="1" />;
      })}

      {/* Data Area */}
      <polygon points={pathPoints} fill="rgba(255, 69, 0, 0.1)" stroke="#FF4500" strokeWidth="3" />

      {/* Data Points & Rich Labels */}
      {data.map((d, i) => {
        const p = getPoint(100, i);
        const pointP = getPoint(d.score, i);

        // Alignment Logic
        const isLeft = p.x < center;
        const isTop = p.y < center;
        const textAnchor = isLeft ? "end" : "start";
        const xOffset = isLeft ? -15 : 15;
        const yOffset = isTop ? -15 : 15;

        return (
          <g key={i} className="group cursor-pointer">
            {/* The Value Dot */}
            <circle cx={pointP.x} cy={pointP.y} r="5" fill="black" stroke="white" strokeWidth="2" className="group-hover:fill-power transition-colors" />

            {/* Category Label (Big) */}
            <text
              x={p.x + xOffset}
              y={p.y + yOffset}
              textAnchor={textAnchor}
              className="text-[12px] font-black uppercase fill-black"
            >
              {d.category}
            </text>

            {/* Tools List (Small, Detailed) */}
            {d.tools.slice(0, 3).map((tool, idx) => (
              <text
                key={idx}
                x={p.x + xOffset}
                y={p.y + yOffset + 14 + (idx * 10)}
                textAnchor={textAnchor}
                className="text-[9px] font-mono font-medium fill-gray-500 uppercase"
              >
                + {tool}
              </text>
            ))}
          </g>
        );
      })}
    </svg>
  );
};

// --- COMPONENT: DETAILED PLANETARY SYSTEM ---
const NetworkGraph = ({ specs }: { specs: Spec[] }) => {
  // We calculate a static "Solar System" layout
  const width = 600;
  const height = 600;
  const center = { x: width / 2, y: height / 2 };

  // Config
  const orbitRadiusCategory = 140;
  const orbitRadiusTools = 60; // Distance from category

  return (
    <svg width="100%" height="100%" viewBox={`0 0 ${width} ${height}`}>
      {/* Center Sun: YOU */}
      <circle cx={center.x} cy={center.y} r="40" fill="black" />
      <text x={center.x} y={center.y} dy="5" textAnchor="middle" fill="white" className="font-black text-sm tracking-widest">SATISH</text>

      {/* Orbital Rings (Visual Guide) */}
      <circle cx={center.x} cy={center.y} r={orbitRadiusCategory} fill="none" stroke="#e5e7eb" strokeWidth="1" strokeDasharray="5 5" />

      {/* Categories */}
      {specs.map((cat, i) => {
        const angle = (i / specs.length) * 2 * Math.PI - Math.PI / 2;
        const catX = center.x + orbitRadiusCategory * Math.cos(angle);
        const catY = center.y + orbitRadiusCategory * Math.sin(angle);

        return (
          <g key={i}>
            {/* Link to Center */}
            <line x1={center.x} y1={center.y} x2={catX} y2={catY} stroke="#e5e7eb" strokeWidth="2" />

            {/* Category Planet */}
            <circle cx={catX} cy={catY} r="25" fill="#FF4500" stroke="white" strokeWidth="3" className="shadow-lg" />
            <text x={catX} y={catY} dy="35" textAnchor="middle" className="font-bold text-[10px] uppercase fill-black bg-white">{cat.category.split(' ')[0]}</text>

            {/* Tool Moons */}
            {cat.tools.map((tool, j) => {
              // Spread tools in a semi-circle around the category, facing away from center
              const toolAngle = angle + ((j - cat.tools.length / 2 + 0.5) * 0.5);
              const toolDist = 70 + (j % 2) * 20; // Stagger distance slightly

              const toolX = catX + toolDist * Math.cos(toolAngle);
              const toolY = catY + toolDist * Math.sin(toolAngle);

              return (
                <g key={tool}>
                  <line x1={catX} y1={catY} x2={toolX} y2={toolY} stroke="#cbd5e1" strokeWidth="1" />

                  {/* Tool Node */}
                  <circle cx={toolX} cy={toolY} r="4" fill="white" stroke="black" strokeWidth="2" />

                  {/* Tool Label */}
                  <text
                    x={toolX}
                    y={toolY}
                    dx={toolX > center.x ? 8 : -8}
                    dy="3"
                    textAnchor={toolX > center.x ? "start" : "end"}
                    className="font-mono text-[9px] font-bold uppercase fill-gray-600 hover:fill-black cursor-default transition-colors"
                  >
                    {tool}
                  </text>
                </g>
              );
            })}
          </g>
        );
      })}
    </svg>
  );
};