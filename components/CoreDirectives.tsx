import React from 'react';
import { SectionDivider } from './SectionDivider';

const directives = [
  {
    header: "THE ARCHITECT",
    content: "I don't just train models; I build [Production-Grade Systems]. Specializing in scalable RAG pipelines and Agentic workflows that survive the real world."
  },
  {
    header: "GEN-AI NATIVE",
    content: "Deep expertise in [LLMs, Vector DBs, and LangChain]. Moving beyond simple chatbots to complex, multi-agent systems that solve reasoning tasks."
  },
  {
    header: "BUSINESS FIRST",
    content: "Bridging the gap between [Tech & Revenue]. I translate complex data science capabilities into clear business value and tangible ROI."
  },
  {
    header: "LEADERSHIP",
    content: "Mentoring data teams and establishing [Engineering Best Practices]. Turning individual contributors into a cohesive delivery unit."
  }
];

const Highlight: React.FC<{text: string}> = ({ text }) => {
  const parts = text.split(/(\[.*?\])/);
  return (
    <>
      {parts.map((part, i) => {
        if (part.startsWith('[') && part.endsWith(']')) {
          return (
            <span key={i} className="bg-power text-white px-1">
              {part.slice(1, -1)}
            </span>
          );
        }
        return <span key={i}>{part}</span>;
      })}
    </>
  );
};

export const CoreDirectives: React.FC = () => {
  return (
    <section id="about" className="w-full bg-white border-b-3 border-black">
      <SectionDivider title="[ SYSTEM_LOG // DIRECTIVES ]" className="pt-12" />
      <div className="max-w-[1920px] mx-auto px-6 md:px-12 py-16 md:py-24">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {directives.map((item, idx) => (
             <div key={idx} className="bg-white border-3 border-black shadow-hard p-8 md:p-12 flex flex-col justify-start h-full hover:translate-x-1 hover:translate-y-1 hover:shadow-hard-sm transition-all duration-200">
               <h3 className="font-sans font-black text-3xl md:text-4xl uppercase mb-6 tracking-tight">
                 {item.header}
               </h3>
               <p className="font-mono text-base md:text-lg leading-relaxed text-slate-body">
                 <Highlight text={item.content} />
               </p>
             </div>
          ))}
        </div>
      </div>
    </section>
  );
};
