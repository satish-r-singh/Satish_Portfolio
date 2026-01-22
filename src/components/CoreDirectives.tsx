import React from 'react';
import { SectionDivider } from './SectionDivider';

// --- DATA STRUCTURE ---
const directives = [
  {
    id: "artist",
    header: "VISUAL INTELLIGENCE",
    tag: "[ COGNITIVE_MODEL ]",
    intro: "Data Scientist by trade.",
    highlight: "Artist by nature.",
    details: "My toolbox includes both PyTorch and a paintbrush. I bring a fine-arts background to engineering, allowing me to see patterns in noise that algorithms might miss. Whether I am sketching a portrait or architecting a RAG pipeline, my goal is the same: to turn abstract chaos into clear, meaningful narratives.",
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M12 19l7-7 3 3-7 7-3-3z"></path>
        <path d="M18 13l-1.5-7.5L2 2l3.5 14.5L13 18l5-5z"></path>
        <path d="M2 2l7.586 7.586"></path>
        <circle cx="11" cy="11" r="2"></circle>
      </svg>
    )
  },
  {
    id: "architect",
    header: "THE SYSTEMS ARCHITECT",
    tag: "[ SYSTEM_CORE ]",
    intro: "Evolution is constant.",
    highlight: "Stability is engineered.",
    details: "I have navigated the shift from Mainframes to Cloud to GenAI. I distinguish between ephemeral hype and the permanent shifts that redefine industries. I bring structural wisdom to chaos, ensuring that cutting-edge AI is built on foundations that won't break when the trends change.",
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
        <rect x="2" y="2" width="20" height="8" rx="2" ry="2"></rect>
        <rect x="2" y="14" width="20" height="8" rx="2" ry="2"></rect>
        <line x1="6" y1="6" x2="6.01" y2="6"></line>
        <line x1="6" y1="18" x2="6.01" y2="18"></line>
      </svg>
    )
  },
  {
    id: "educator",
    header: "THE EDUCATOR",
    tag: "[ KNOWLEDGE_BASE ]",
    intro: "I don't gatekeep knowledge.",
    highlight: "I democratize it.",
    details: "I partner with prestigious organizations globally to deliver training, mentorship, and research publications. Not because it's my job, but because I believe in democratizing knowledge. From publishing papers to upskilling enterprise teams, I bridge the gap between academic theory and industry reality.",
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z"></path>
        <path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z"></path>
      </svg>
    )
  },
  {
    id: "pragmatist",
    header: "THE PRAGMATIST",
    tag: "[ OPTIMIZATION ]",
    intro: "Efficiency always trumps",
    highlight: "Complexity.",
    details: "I drive the [Buy vs. Build] decision with ruthless logic. I am not afraid to tell a client that a simple SQL query is better than a complex LLM if it solves the problem faster and cheaper. I deliver results, not just research papers.",
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M14.7 6.3a1 1 0 0 0 0 1.4l1.6 1.6a1 1 0 0 0 1.4 0l3.77-3.77a6 6 0 0 1-7.94 7.94l-6.91 6.91a2.12 2.12 0 0 1-3-3l6.91-6.91a6 6 0 0 1 7.94-7.94l-3.76 3.76z"></path>
      </svg>
    )
  }
];

export const CoreDirectives: React.FC = () => {
  return (
    <section id="about" className="w-full bg-white border-b-3 border-black">
      <SectionDivider title="[ OPERATOR_PROFILE ]" className="pt-12" />
      <div className="max-w-[1920px] mx-auto px-6 md:px-12 py-16 md:py-24">

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {directives.map((item) => (
            <div
              key={item.id}
              className="bg-white border-3 border-black shadow-hard p-8 md:p-12 flex flex-col justify-start h-full relative overflow-hidden group hover:-translate-y-1 hover:shadow-hard-sm transition-all duration-200"
            >
              {/* DECORATIVE TAG (Top Right) */}
              <div className="absolute top-0 right-0 bg-black text-white px-2 py-1 font-mono text-[10px] font-bold uppercase transition-colors group-hover:bg-power">
                {item.tag}
              </div>

              {/* ICON */}
              <div className="mb-4 text-power">
                {item.icon}
              </div>

              {/* HEADER */}
              <h3 className="font-sans font-black text-3xl md:text-4xl uppercase mb-3 leading-none tracking-tighter">
                {item.header}
              </h3>

              {/* CONTENT WRAPPER */}
              <div className="font-mono text-base md:text-lg leading-relaxed text-slate-body flex flex-col gap-4">

                {/* Intro & Highlight Line */}
                <p className="font-bold text-black">
                  {item.intro} <span className="bg-power text-white px-1">{item.highlight}</span>
                </p>

                {/* Detailed Body */}
                <p className="text-sm md:text-base text-gray-600 leading-relaxed text-justify">
                  {item.details}
                </p>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
};