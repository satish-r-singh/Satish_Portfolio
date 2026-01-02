import React from 'react';

export const Marquee: React.FC = () => {
  const items = [
    "LEAD DATA SCIENTIST",
    "RAG EXPERT",
    "AI AGENTS",
    "PYTHON",
    "STRATEGY",
    "SCALABLE ARCHITECTURE",
    "LLM OPS"
  ];

  return (
    <div className="w-full bg-black text-white border-b-3 border-black overflow-hidden py-3 select-none">
      <div className="whitespace-nowrap animate-marquee inline-block">
        {/* Repeat enough times to fill screen + overflow for loop */}
        {[...Array(4)].map((_, i) => (
          <React.Fragment key={i}>
            {items.map((item, index) => (
              <span key={`${i}-${index}`} className="mx-6 font-mono font-bold text-lg tracking-widest">
                ★ {item}
              </span>
            ))}
          </React.Fragment>
        ))}
      </div>
    </div>
  );
};