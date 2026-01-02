import React from 'react';
import { EXPERIENCE } from '../constants';
import { SectionDivider } from './SectionDivider';

export const ExperienceLog: React.FC = () => {
  return (
    <section id="experience" className="w-full pt-12 pb-20 bg-white border-b-3 border-black">
      <SectionDivider title="[ EXECUTION_HISTORY ]" />
      <div className="max-w-[1920px] mx-auto px-6 md:px-12 mt-16">
        
        <div className="max-w-4xl mx-auto pl-4 md:pl-8">
          {/* The Timeline Backbone */}
          <div className="relative border-l-3 border-black space-y-12 pb-4">
            
            {EXPERIENCE.map((exp) => (
              <div key={exp.id} className="relative pl-12 group">
                
                {/* The Node (Black Square) */}
                <div className="absolute top-8 -left-[11px] w-[19px] h-[19px] bg-black border-3 border-black transition-all duration-300 group-hover:scale-125 group-hover:bg-power group-hover:border-power z-10"></div>
                
                {/* The Connector Line (Horizontal) */}
                <div className="absolute top-[41px] left-0 w-12 h-[3px] bg-black"></div>

                {/* The Card */}
                <div className="w-full bg-white border-3 border-black shadow-hard p-6 md:p-8 transition-all duration-300 group-hover:bg-black group-hover:text-white group-hover:shadow-none group-hover:translate-x-1 group-hover:translate-y-1 relative overflow-hidden">
                  
                  {/* Top Row: Metadata */}
                  <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6 pb-4 border-b-2 border-dashed border-gray-300 group-hover:border-gray-700">
                    <span className="font-mono font-bold text-lg">{exp.year}</span>
                    <span className="font-mono text-xs font-bold border-2 border-black px-2 py-1 uppercase bg-gray-100 text-black group-hover:bg-white group-hover:border-white group-hover:text-black transition-colors">
                      LOCATION: {exp.location}
                    </span>
                  </div>

                  {/* Middle Row: Role */}
                  <div className="mb-8">
                    <h3 className="text-3xl md:text-4xl font-black uppercase leading-none mb-2">
                      {exp.role}
                    </h3>
                    <p className="text-lg md:text-xl italic font-serif text-gray-600 group-hover:text-gray-400">
                      @ {exp.company}
                    </p>
                  </div>

                  {/* Bottom Row: Output/Impact */}
                  <div className="bg-gray-100 border-l-4 border-power p-4 font-mono text-sm group-hover:bg-gray-900 group-hover:text-green-400 transition-colors">
                    <span className="font-bold mr-2 text-power group-hover:text-green-500">{'>'}</span>
                    {exp.metric}
                  </div>

                </div>
              </div>
            ))}

            {/* End of Timeline Indicator */}
            <div className="absolute -bottom-2 -left-[9px] w-[15px] h-[15px] rounded-full bg-black"></div>
          </div>
        </div>
      </div>
    </section>
  );
};