import React from 'react';

interface SectionDividerProps {
  title: string;
  className?: string;
}

export const SectionDivider: React.FC<SectionDividerProps> = ({ title, className = '' }) => {
  return (
    <div className={`w-full flex flex-col items-start ${className}`}>
      <div className="bg-black text-white px-4 py-1 font-mono font-bold text-xs md:text-sm tracking-widest uppercase inline-block ml-6 md:ml-12 mb-0">
        {title}
      </div>
      <div className="w-full h-[3px] bg-black"></div>
    </div>
  );
};