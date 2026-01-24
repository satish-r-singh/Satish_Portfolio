import React from 'react';
import { EXPERIENCE, ARTIFACTS } from '../constants';
import { SectionDivider } from './SectionDivider';

export const ExperienceLog: React.FC = () => {
  return (
    <section id="experience" className="w-full pt-12 pb-20 bg-white border-b-3 border-black">
      <SectionDivider title="[ EXECUTION_HISTORY ]" />
      <div className="max-w-[1920px] mx-auto px-6 md:px-12 mt-16">

        <div className="max-w-4xl mx-auto pl-4 md:pl-8">
          {/* The Timeline Backbone */}
          <div className="relative border-l-3 border-black space-y-12 pb-4">

            {/* ARTIFACTS: Research & Mentorship - Now data-driven */}
            {ARTIFACTS.map((artifact) => (
              <div key={artifact.id} className="relative pl-12 group">
                {/* Node */}
                <div className="absolute top-8 -left-[11px] w-[19px] h-[19px] bg-white border-3 border-black transition-all duration-300 group-hover:scale-125 z-10"></div>
                {/* Connector */}
                <div className="absolute top-[41px] left-0 w-12 h-[3px] bg-black"></div>

                {/* Card */}
                <div className="w-full bg-white border-3 border-black shadow-hard transition-all duration-300 group-hover:shadow-none group-hover:translate-x-1 group-hover:translate-y-1 relative">
                  <div className="p-[4px] bg-white">
                    <div className="border border-black bg-[#F3F4F6] p-6 md:p-8 flex flex-col gap-5">

                      {/* Header */}
                      <div className="flex flex-wrap items-center gap-2 font-mono text-xs font-bold text-gray-500 uppercase tracking-widest border-b border-gray-300 pb-3">
                        <span className="text-black whitespace-nowrap">{artifact.icon} {artifact.label}</span>
                        <span className="text-gray-400">//</span>
                        <span className={`${artifact.type === 'research' ? 'bg-power' : 'bg-black'} text-white px-1 whitespace-nowrap`}>
                          {artifact.publisher}
                        </span>
                      </div>

                      {/* Content */}
                      <div>
                        <h3 className="text-2xl md:text-3xl font-black uppercase leading-[0.9] mb-3">
                          {artifact.title}
                        </h3>
                        <p className="font-serif italic text-lg text-gray-600 leading-tight">
                          {artifact.subtitle}
                        </p>
                      </div>

                      {/* Impact */}
                      <div className="bg-white border-l-4 border-black p-4 font-mono text-sm leading-relaxed text-gray-800">
                        <span className={`font-bold ${artifact.type === 'research' ? 'bg-black' : 'bg-power'} text-white px-1 mr-2`}>
                          {artifact.impactLabel}
                        </span>
                        {artifact.impactText}
                      </div>

                      {/* Footer */}
                      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 pt-2 border-t border-gray-300 mt-2">
                        <div className="flex flex-wrap gap-2">
                          {artifact.tags.map(tag => (
                            <span key={tag} className="border border-black bg-white px-2 py-1 text-[10px] font-bold font-mono uppercase hover:bg-black hover:text-white transition-colors cursor-default">
                              {tag}
                            </span>
                          ))}
                        </div>
                        {artifact.link ? (
                          <a
                            href={artifact.link}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="font-bold font-mono text-xs uppercase bg-black text-white px-4 py-2 hover:bg-power transition-colors flex items-center gap-2"
                          >
                            {artifact.linkLabel}
                          </a>
                        ) : (
                          <div className="font-bold font-mono text-xs text-gray-400 uppercase">
                            [ IMPACT: GLOBAL_REACH ]
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}

            {/* STANDARD EXPERIENCE LOG */}
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