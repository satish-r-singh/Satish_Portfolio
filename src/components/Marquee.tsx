import React from 'react';

export const Marquee: React.FC = () => {
  const items = [
    "SYSTEM_STATUS: OPERATIONAL",
    "LOCATION: DUBAI-ABU DHABI/UAE",
    "ROLE: GROUP LEAD-DATA SCIENCE & AI",
    "SPECIALTY: GEN_AI / RAG / EVALS / LLM_OPS / ML / CV / NLP",
    "LATEST_PUBLICATION: SPRINGER NATURE (2025)",
    "OPEN_TO_WORK: YES",
    "CURRENT_TIME: " + new Date().toLocaleTimeString('en-US', { hour12: false, hour: '2-digit', minute: '2-digit' }) + " UTC+4"
  ];

  return (
    <div className="w-full bg-black text-white h-8 flex items-center overflow-hidden border-b-2 border-black relative z-40">

      {/* The "Label" */}
      <div className="bg-power text-white h-full px-3 flex items-center justify-center font-mono text-[10px] font-bold z-10 shadow-[4px_0px_10px_rgba(0,0,0,0.5)]">
        LIVE_FEED
      </div>

      {/* The Moving Stream */}
      <div className="flex whitespace-nowrap overflow-hidden w-full group">
        <div
          className="flex gap-8 py-1 group-hover-paused"
          // FORCE THE STYLES HERE (Bypasses CSS Cache)
          style={{
            animationName: 'marquee',
            animationDuration: '60s',      /* Force Slow Speed */
            animationTimingFunction: 'linear',
            animationIterationCount: 'infinite',
            willChange: 'transform',       /* GPU Acceleration */
            transform: 'translate3d(0,0,0)', /* Force Hardware Layer */
            backfaceVisibility: 'hidden',  /* Fixes Font Blur */
            WebkitFontSmoothing: 'antialiased'
          }}
        >
          {/* Triple the items for seamless loop */}
          {[...items, ...items, ...items].map((item, index) => (
            <div key={index} className="flex items-center gap-2">
              <span className="w-1.5 h-1.5 bg-green-500 rounded-full animate-pulse"></span>
              <span className="font-mono text-[10px] md:text-xs font-bold uppercase tracking-widest text-gray-300">
                {item}
              </span>
              <span className="text-gray-600 select-none">///</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};