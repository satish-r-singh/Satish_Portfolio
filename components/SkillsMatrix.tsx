import React from 'react';
import { SectionDivider } from './SectionDivider';
import { Cpu, LineChart, GitBranch, Users, Brain, Activity } from 'lucide-react';

export const SkillsMatrix: React.FC = () => {
  const skills = [
    {
      title: "GENERATIVE AI MODULE",
      description: "Architecting retrieval pipelines and agentic workflows for high-accuracy constraints.",
      tags: ["RAG", "LangGraph", "Vector DBs", "Prompt Eng", "Evaluation", "Gemini API"],
      stats: { exp: "4Y", proj: "12", status: "ACTIVE" },
      isHighlight: true,
      icon: Brain
    },
    {
      title: "DATA STRATEGY UNIT",
      description: "Translating technical capabilities into roadmap execution and quantifiable business value.",
      tags: ["Leadership", "Hiring", "Roadmapping", "Stakeholder Mgmt", "Cost Opt"],
      stats: { exp: "6Y", teams: "03", roi: "HIGH" },
      isHighlight: false,
      icon: Activity
    },
    {
      title: "ENGINEERING CORE",
      description: "Full-stack development of data platforms and scalable production systems.",
      tags: ["Python", "AWS", "Docker", "FastAPI", "Terraform", "Postgres"],
      stats: { exp: "7Y", commits: "500K+", uptime: "99.9%" },
      isHighlight: false,
      icon: Cpu
    },
    {
      title: "ML OPS PIPELINE",
      description: "End-to-end lifecycle management, model monitoring, and automated deployment.",
      tags: ["CI/CD", "MLflow", "Kubernetes", "Airflow", "Prometheus", "Grafana"],
      stats: { exp: "5Y", pipes: "20+", drift: "MONITORED" },
      isHighlight: false,
      icon: GitBranch
    },
    {
      title: "ANALYTICS ENGINE",
      description: "Advanced statistical modeling and visualization for tactical decision support.",
      tags: ["SQL", "Tableau", "A/B Testing", "Looker", "Pandas", "dbt"],
      stats: { exp: "8Y", dashboards: "50+", views: "1M+" },
      isHighlight: false,
      icon: LineChart
    },
    {
      title: "HUMAN PROTOCOLS",
      description: "Essential soft skills for technical leadership and effective knowledge transfer.",
      tags: ["Public Speaking", "Mentoring", "Agile", "Tech Writing", "Negotiation"],
      stats: { mentored: "15+", talks: "05", rating: "A+" },
      isHighlight: false,
      icon: Users
    }
  ];

  return (
    <section id="skills" className="w-full pt-12 pb-24 bg-white border-b-3 border-black">
      <SectionDivider title="[ TECHNICAL_INVENTORY ]" />
      <div className="max-w-[1920px] mx-auto px-6 md:px-12 mt-16">
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {skills.map((skill, i) => (
            <div 
              key={i} 
              className={`
                relative flex flex-col border-3 border-black bg-white
                shadow-hard hover:shadow-none hover:translate-x-1 hover:translate-y-1 transition-all duration-200
                bg-[linear-gradient(to_right,#f0f0f0_1px,transparent_1px),linear-gradient(to_bottom,#f0f0f0_1px,transparent_1px)] bg-[size:20px_20px]
              `}
            >
              {/* Header */}
              <div className={`
                w-full px-5 py-3 border-b-3 border-black flex items-center justify-between
                ${skill.isHighlight ? 'bg-power text-black' : 'bg-black text-white'}
              `}>
                <h3 className="font-black text-lg uppercase tracking-wider flex items-center gap-2">
                   {skill.title}
                </h3>
                <skill.icon size={20} strokeWidth={2.5} />
              </div>

              {/* Body */}
              <div className="p-5 flex flex-col flex-grow backdrop-blur-[2px]">
                <p className="font-mono text-xs md:text-sm font-bold text-gray-600 mb-6 leading-relaxed border-l-2 border-gray-300 pl-3">
                   {skill.description}
                </p>

                <div className="flex flex-wrap content-start gap-2 mb-4">
                  {skill.tags.map(tag => (
                    <span key={tag} className="font-mono text-[10px] md:text-xs font-bold border-2 border-black bg-white px-2 py-1 uppercase hover:bg-black hover:text-white transition-colors cursor-default">
                      {tag}
                    </span>
                  ))}
                </div>
              </div>

              {/* Footer / Metadata */}
              <div className="border-t-3 border-black bg-gray-50 p-3 flex flex-wrap gap-y-2 font-mono text-[10px] md:text-xs font-bold uppercase tracking-tight">
                  {Object.entries(skill.stats).map(([key, value], idx, arr) => (
                      <React.Fragment key={key}>
                          <span className="text-gray-500 whitespace-nowrap">
                            [{key}: <span className="text-black">{value}</span>]
                          </span>
                          {idx < arr.length - 1 && <span className="mx-2 text-gray-300">|</span>}
                      </React.Fragment>
                  ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
