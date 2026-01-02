import React from 'react';
import { Cpu, Globe, Database, Mail } from 'lucide-react';

export const ArchitectureSchematic: React.FC = () => {
  return (
    <section className="w-full bg-black text-white border-b-2 border-white py-16 overflow-hidden relative">
      <div className="absolute inset-0 opacity-10 bg-[linear-gradient(45deg,#222_25%,transparent_25%,transparent_75%,#222_75%,#222),linear-gradient(45deg,#222_25%,transparent_25%,transparent_75%,#222_75%,#222)] bg-[length:20px_20px] bg-[position:0_0,10px_10px]" />
      
      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <h2 className="font-mono text-xl md:text-2xl font-bold mb-12 flex items-center">
          <span className="w-4 h-4 bg-white mr-4 animate-pulse"></span>
          SYSTEM ARCHITECTURE (HOW THIS SITE WORKS)
        </h2>

        {/* Schematic Flow */}
        <div className="flex flex-col md:flex-row items-center justify-between gap-8 md:gap-4 overflow-x-auto pb-8">
          
          {/* Node 1 */}
          <div className="flex-shrink-0 flex flex-col items-center group">
            <div className="w-40 h-24 border-2 border-white bg-transparent flex items-center justify-center relative hover:bg-white hover:text-black transition-colors duration-300">
              <span className="font-mono font-bold text-sm text-center px-2">[USER INPUT]<br/>(Natural Language)</span>
              <div className="absolute -bottom-2 -right-2 w-full h-full border-2 border-gray-600 -z-10"></div>
            </div>
            <div className="h-8 w-0.5 bg-white md:hidden"></div>
          </div>

          {/* Arrow */}
          <div className="hidden md:flex flex-1 h-0.5 bg-white items-center relative">
            <div className="absolute right-0 w-2 h-2 bg-white rotate-45 transform origin-center translate-x-1"></div>
          </div>

          {/* Node 2 */}
          <div className="flex-shrink-0 flex flex-col items-center">
            <div className="w-48 h-32 border-2 border-white bg-gray-900 flex flex-col items-center justify-center relative p-4 hover:border-system-blue transition-colors">
               <Cpu className="mb-2 w-6 h-6 animate-pulse" />
               <span className="font-mono font-bold text-center text-sm">ROUTER AGENT<br/>(Gemini Flash)</span>
               <div className="absolute top-0 left-0 w-2 h-2 bg-white"></div>
               <div className="absolute top-0 right-0 w-2 h-2 bg-white"></div>
               <div className="absolute bottom-0 left-0 w-2 h-2 bg-white"></div>
               <div className="absolute bottom-0 right-0 w-2 h-2 bg-white"></div>
            </div>
            <div className="h-8 w-0.5 bg-white md:hidden"></div>
          </div>

          {/* Fork Arrow */}
          <div className="hidden md:flex flex-1 items-center relative">
             <div className="w-full h-0.5 bg-white"></div>
             <div className="absolute right-0 top-1/2 -translate-y-1/2 w-4 h-24 border-r-2 border-white border-t-2 border-b-2 rounded-r-lg"></div>
          </div>

          {/* Node Group */}
          <div className="flex flex-col gap-4">
             {/* Sub Node A */}
             <div className="flex items-center gap-4">
                <div className="hidden md:block w-8 h-0.5 bg-white"></div>
                <div className="w-40 h-16 border-2 border-white bg-black flex items-center justify-center gap-2 hover:bg-white hover:text-black transition-colors">
                   <Database size={16} />
                   <span className="font-mono text-xs font-bold">RAG ENGINE</span>
                </div>
             </div>
             
             {/* Sub Node B */}
             <div className="flex items-center gap-4">
                <div className="hidden md:block w-8 h-0.5 bg-white"></div>
                <div className="w-40 h-16 border-2 border-white bg-black flex items-center justify-center gap-2 hover:bg-white hover:text-black transition-colors">
                   <Globe size={16} />
                   <span className="font-mono text-xs font-bold">JD MATCHER</span>
                </div>
             </div>

             {/* Sub Node C */}
             <div className="flex items-center gap-4">
                <div className="hidden md:block w-8 h-0.5 bg-white"></div>
                <div className="w-40 h-16 border-2 border-white bg-black flex items-center justify-center gap-2 hover:bg-white hover:text-black transition-colors">
                   <Mail size={16} />
                   <span className="font-mono text-xs font-bold">CONTACT TOOL</span>
                </div>
             </div>
          </div>

        </div>
      </div>
    </section>
  );
};
