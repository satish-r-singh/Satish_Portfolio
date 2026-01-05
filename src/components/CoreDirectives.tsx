import React from 'react';
import { SectionDivider } from './SectionDivider';


// const directives = [
//   {
//     header: "ENGINEERING ROOTS",
//     content: "15+ Years of IT discipline. I don't just write scripts; I build [Production-Grade Systems]. From legacy migrations to modern MLOps, my code scales."
//   },
//   {
//     header: "GEN-AI NATIVE",
//     content: "Moving beyond chatbots to [Agentic Workflows]. Expert in RAG pipelines, Multi-Modal systems, and fine-tuning LLMs for enterprise use cases."
//   },
//   {
//     header: "CLASSICAL ML & VISION",
//     content: "Deep expertise in [Predictive Modeling & Computer Vision]. I know when to use a simple regression and when to deploy a neural net."
//   },
//   {
//     header: "STRATEGIC LEADERSHIP",
//     content: "Group Data Strategy Lead. I build data teams from scratch, drive [Buy vs. Build] evaluations, and align technical roadmaps with corporate vision."
//   },
//   {
//     header: "ROI OBSESSED",
//     content: "Bridging [Tech & Revenue]. My models have saved $1M+ in fraud and boosted sales by 27%. If it doesn't add business value, I don't build it."
//   },
//   {
//     header: "THOUGHT LEADERSHIP",
//     content: "Corporate Trainer & Mentor. I upskill the next generation of data scientists at institutes like [Emirates Institute of Finance], translating theory into practice."
//   }
// ];

const directives = [
  {
    header: "THE ARTIST & ENGINEER",
    content: "I bring a [Unique Creative Background] to data science. I don't just solve equations; I craft narratives and visualizations that make complex data intuitive for humans."
  },
  {
    header: "THE 15-YEAR VETERAN",
    content: "I've survived the evolution from Mainframes to Cloud to GenAI. I bring [Stability & Perspective]. I know the difference between a passing trend and a permanent shift."
  },
  {
    header: "THE EDUCATOR",
    content: "As a corporate trainer for [Emirates Institute of Finance], I break down barriers. I don't gatekeep knowledge; I democratize it, upskilling entire teams to be AI-ready."
  },
  {
    header: "THE PRAGMATIST",
    content: "I drive the [Buy vs. Build] decision. I'm not afraid to tell a client that a simple SQL query is better than a complex LLM if it solves the problem faster and cheaper."
  }
];

const Highlight: React.FC<{ text: string }> = ({ text }) => {
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
      <SectionDivider title="[ OPERATOR_PROFILE ]" className="pt-12" />
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
