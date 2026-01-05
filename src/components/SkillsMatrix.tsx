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

import React from 'react';
import { SectionDivider } from './SectionDivider';
import { Terminal, Cpu, Database, Cloud, Layout, Users } from 'lucide-react';

export const SkillsMatrix: React.FC = () => {
  const specs = [
    {
      category: "A.I. & GENERATIVE CORE",
      icon: Terminal,
      status: "PRIMARY FOCUS",
      tools: ["RAG Pipelines", "LangChain", "Vector DBs (Pinecone)", "Gemini/OpenAI APIs", "Prompt Engineering", "Agents (LangGraph)"],
      details: "Architecting autonomous reasoning systems and high-accuracy retrieval engines."
    },
    {
      category: "DATA SCIENCE & ANALYTICS",
      icon: Database,
      status: "15 YEARS EXP",
      tools: ["Python (Pandas/NumPy)", "XGBoost", "Scikit-Learn", "Computer Vision (YOLO)", "Time-Series", "SQL"],
      details: "Building predictive models for pricing, fraud detection, and demand forecasting."
    },
    {
      category: "ENGINEERING & CLOUD",
      icon: Cloud,
      status: "PRODUCTION READY",
      tools: ["Azure", "Docker", "Kubernetes", "FastAPI", "Postgres", "CI/CD (GitHub Actions)"],
      details: "Full-cycle MLOps: From local notebooks to scalable cloud deployments."
    },
    {
      category: "WEB & INTERFACE",
      icon: Layout,
      status: "FULL STACK",
      tools: ["React", "TypeScript", "Tailwind CSS", "Streamlit", "Node.js", "Next.js"],
      details: "Building interactive front-ends to make AI accessible to non-technical users."
    },
    {
      category: "LEADERSHIP & STRATEGY",
      icon: Users,
      status: "MANAGEMENT",
      tools: ["Team Building", "Buy vs. Build", "Tech Roadmapping", "Mentoring", "Agile/Scrum"],
      details: "Leading data teams and aligning technical execution with business revenue goals."
    }
  ];

  return (
    <section id="skills" className="w-full pt-12 pb-24 bg-white border-b-3 border-black">
      <SectionDivider title="[ SYSTEM_SPECIFICATIONS ]" />

      <div className="max-w-5xl mx-auto px-6 md:px-12 mt-16">

        {/* The Spec Sheet Container */}
        <div className="border-3 border-black bg-white shadow-hard">

          {/* Header Row */}
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

          {/* Specs List */}
          <div className="divide-y-3 divide-black">
            {specs.map((spec, i) => (
              <div key={i} className="group flex flex-col md:flex-row hover:bg-power/20 transition-colors">

                {/* Left Column: Category Header */}
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

                {/* Right Column: The Details */}
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

          {/* Footer Row */}
          <div className="bg-gray-100 p-3 border-t-3 border-black font-mono text-[10px] uppercase text-gray-500 flex justify-between">
            <span>LAST_UPDATED: JAN_2026</span>
            <span>TOTAL_MODULES: {specs.length}</span>
          </div>

        </div>
      </div>
    </section>
  );
};