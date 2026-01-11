import React from 'react';
import { User, Cpu, Database, FileText, Activity, Mic, Volume2 } from 'lucide-react';

export type ActiveNode = 'IDLE' | 'LISTENING' | 'USER_INPUT' | 'ROUTER' | 'RAG' | 'JD_MATCHER' | 'SPEAKING';

interface Props {
   activeNode: ActiveNode;
}

export const LiveArchitectureDiagram: React.FC<Props> = ({ activeNode }) => {

   // Helper for Node Styling
   const getNodeState = (nodeName: string) => {
      const isActive = activeNode === nodeName;
      return {
         container: isActive
            ? 'border-power bg-black text-power shadow-[0_0_20px_rgba(255,69,0,0.6)] scale-110 z-20'
            : 'border-gray-700 bg-black/40 text-gray-600 z-10',
         text: isActive
            ? 'text-white bg-power px-1 font-bold'
            : 'text-gray-600 bg-black border border-gray-800 px-1',
      };
   };

   return (
      <div className="w-full h-full bg-black relative overflow-hidden flex flex-col border-b border-gray-800">

         {/* Background Grid */}
         <div className="absolute inset-0 opacity-20 pointer-events-none"
            style={{ backgroundImage: 'linear-gradient(#222 1px, transparent 1px), linear-gradient(90deg, #222 1px, transparent 1px)', backgroundSize: '40px 40px' }}>
         </div>

         {/* --- HEADER BAR --- */}
         <div className="flex justify-between items-center px-4 py-2 bg-gray-900/50 border-b border-gray-800 text-[10px] font-mono text-gray-400 z-30 backdrop-blur-sm">
            <div className="flex items-center gap-2">
               <Activity size={12} className={activeNode !== 'IDLE' ? 'animate-pulse text-power' : ''} />
               <span className="tracking-widest font-bold uppercase">Live_Architecture_Map_v2.0</span>
            </div>
            <span className="opacity-70">STATUS: {activeNode === 'IDLE' ? 'STANDBY' : 'PROCESSING'}</span>
         </div>

         {/* --- MAIN DIAGRAM AREA --- */}
         <div className="flex-grow relative w-full h-full">

            {/* --- SVG LAYER (Data Flow Lines) --- */}
            <svg className="absolute inset-0 w-full h-full pointer-events-none z-0" viewBox="0 0 100 100" preserveAspectRatio="none">
               <defs>
                  <marker id="arrow-active" markerWidth="4" markerHeight="4" refX="2" refY="2" orient="auto">
                     <path d="M0,0 L0,4 L4,2 z" fill="#FF4500" />
                  </marker>
               </defs>

               {/* PATH 1: User -> Router (Text) */}
               <path d="M 10 50 L 50 50"
                  stroke={activeNode === 'USER_INPUT' || activeNode === 'ROUTER' ? '#FF4500' : '#333'}
                  strokeWidth="0.5" strokeDasharray={activeNode === 'USER_INPUT' ? "2 1" : "0"}
                  className="transition-all duration-300"
               />

               {/* PATH 2: User -> STT -> Router (Voice) */}
               <path d="M 10 50 C 25 50, 25 20, 50 20" fill="none"
                  stroke={activeNode === 'LISTENING' ? '#FF4500' : '#333'} strokeWidth="0.5"
               />
               <path d="M 50 20 L 50 45"
                  stroke={activeNode === 'LISTENING' ? '#FF4500' : '#333'} strokeWidth="0.5" markerEnd={activeNode === 'LISTENING' ? "url(#arrow-active)" : ""}
               />

               {/* PATH 3: Router -> RAG */}
               <path d="M 50 50 L 90 20"
                  stroke={activeNode === 'RAG' ? '#FF4500' : '#333'} strokeWidth="0.5"
               />

               {/* PATH 4: Router -> JD Matcher */}
               <path d="M 50 50 L 90 50"
                  stroke={activeNode === 'JD_MATCHER' ? '#FF4500' : '#333'} strokeWidth="0.5"
               />

               {/* PATH 5: Router -> TTS */}
               <path d="M 50 50 L 90 80"
                  stroke={activeNode === 'SPEAKING' ? '#FF4500' : '#333'} strokeWidth="0.5"
               />
            </svg>

            {/* --- HTML NODES --- */}

            {/* 1. USER */}
            <div className="absolute top-1/2 left-[10%] -translate-x-1/2 -translate-y-1/2 flex flex-col items-center gap-2 transition-all duration-300">
               <div className={`w-10 h-10 border-2 flex items-center justify-center ${getNodeState('USER_INPUT').container}`}>
                  <User size={18} />
               </div>
               <span className={`text-[9px] tracking-widest uppercase ${getNodeState('USER_INPUT').text}`}>USER</span>
            </div>

            {/* 2. STT ENGINE */}
            <div className="absolute top-[20%] left-[50%] -translate-x-1/2 -translate-y-1/2 flex flex-col items-center gap-2 transition-all duration-300">
               <div className={`w-8 h-8 border-2 flex items-center justify-center ${getNodeState('LISTENING').container}`}>
                  <Mic size={14} />
               </div>
               <span className={`text-[8px] tracking-widest uppercase ${getNodeState('LISTENING').text}`}>WHISPER_AI</span>
            </div>

            {/* 3. ROUTER */}
            <div className="absolute top-1/2 left-[50%] -translate-x-1/2 -translate-y-1/2 flex flex-col items-center gap-2 transition-all duration-300">
               <div className={`w-12 h-12 border-2 flex items-center justify-center ${getNodeState('ROUTER').container}`}>
                  <Cpu size={24} />
               </div>
               <span className={`text-[9px] tracking-widest uppercase ${getNodeState('ROUTER').text}`}>ROUTER</span>
            </div>

            {/* 4. RAG ENGINE */}
            <div className="absolute top-[20%] left-[90%] -translate-x-1/2 -translate-y-1/2 flex flex-col items-center gap-2 transition-all duration-300">
               <div className={`w-8 h-8 border-2 flex items-center justify-center ${getNodeState('RAG').container}`}>
                  <Database size={14} />
               </div>
               <span className={`text-[8px] tracking-widest uppercase ${getNodeState('RAG').text}`}>VECTOR_DB</span>
            </div>

            {/* 5. JD ANALYZER */}
            <div className="absolute top-1/2 left-[90%] -translate-x-1/2 -translate-y-1/2 flex flex-col items-center gap-2 transition-all duration-300">
               <div className={`w-8 h-8 border-2 flex items-center justify-center ${getNodeState('JD_MATCHER').container}`}>
                  <FileText size={14} />
               </div>
               <span className={`text-[8px] tracking-widest uppercase ${getNodeState('JD_MATCHER').text}`}>JD_PARSER</span>
            </div>

            {/* 6. TTS OUTPUT */}
            <div className="absolute top-[80%] left-[90%] -translate-x-1/2 -translate-y-1/2 flex flex-col items-center gap-2 transition-all duration-300">
               <div className={`w-8 h-8 border-2 flex items-center justify-center ${getNodeState('SPEAKING').container}`}>
                  <Volume2 size={14} />
               </div>
               <span className={`text-[8px] tracking-widest uppercase ${getNodeState('SPEAKING').text}`}>TTS_AUDIO</span>
            </div>

         </div>
      </div>
   );
};