import React from 'react';

const LOGOS = [
  "EMIRATES INSTITUTE OF FINANCE",
  "MINDWORX",
  "SIMPLILEARN",
  "VINSYS",
  "THE KNOWLEDGE ACADEMY",
  "SPRINGER NATURE"
];

export const TrustMarquee: React.FC = () => {
  return (
    <div className="w-full bg-white border-3 border-black mt-4 flex flex-col md:flex-row shadow-hard relative overflow-hidden h-16 md:h-14">
      {/* Label Badge */}
      <div className="bg-black text-white px-4 flex items-center justify-center md:justify-start font-mono text-[10px] md:text-xs font-bold uppercase shrink-0 z-20 h-6 md:h-full w-full md:w-auto">
        {'>'} KNOWLEDGE_TRANSFER_NODES:
      </div>
      
      {/* Marquee Container */}
      <div className="flex-grow overflow-hidden flex items-center bg-white relative h-full w-full">
         <div className="animate-marquee whitespace-nowrap flex items-center h-full">
            {/* Repeat content enough times to ensure smooth loop */}
            {[...Array(4)].map((_, i) => (
                <div key={i} className="flex items-center">
                    {LOGOS.map((logo, idx) => (
                        <div key={`${i}-${idx}`} className="mx-8 font-black text-xl md:text-2xl text-gray-400 uppercase tracking-tighter hover:text-black transition-colors cursor-default select-none whitespace-nowrap">
                            {logo}
                        </div>
                    ))}
                </div>
            ))}
         </div>
      </div>
    </div>
  );
};
