import React from 'react';
import { Cpu, User, Database, FileText, MessageSquare, HelpCircle, Mic } from 'lucide-react';

export type ActiveNode = 'IDLE' | 'USER_INPUT' | 'ROUTER' | 'RAG' | 'JD_MATCHER' | 'CONTACT' | 'SPEAKING';

interface LiveArchitectureDiagramProps {
  activeNode: ActiveNode;
}

export const LiveArchitectureDiagram: React.FC<LiveArchitectureDiagramProps> = ({ activeNode }) => {
  const isRouterActive = ['ROUTER', 'RAG', 'JD_MATCHER', 'CONTACT', 'SPEAKING'].includes(activeNode);
  const isToolActive = ['RAG', 'JD_MATCHER', 'CONTACT'].includes(activeNode);
  const isSpeaking = activeNode === 'SPEAKING';

  return (
    <div className="w-full h-full flex flex-col font-mono select-none">
      
      {/* Terminal Header */}
      <div className="flex justify-between items-start mb-6 shrink-0">
         <div className="text-terminal-green text-sm font-bold">
            {'>_'} DEBUG_CONSOLE_V1.0
         </div>
         <div className="flex gap-1.5">
            <div className="w-2.5 h-2.5 rounded-full bg-red-500"></div>
            <div className="w-2.5 h-2.5 rounded-full bg-yellow-500"></div>
            <div className="w-2.5 h-2.5 rounded-full bg-green-500"></div>
         </div>
      </div>

      {/* System Logs */}
      <div className="flex flex-col gap-1 mb-8 text-xs text-gray-500">
          <p>{'>'} SYSTEM.INIT() ... OK</p>
          <p>{'>'} LISTENING_FOR_EVENTS ... <span className="animate-pulse text-terminal-green">_</span></p>
      </div>

      {/* Main Schematic Area */}
      <div className="flex-grow flex items-center justify-center px-4 relative">
          
          <div className="flex items-center justify-between w-full max-w-2xl gap-2 md:gap-4">
              
              {/* NODE 1: USER */}
              <div className="flex flex-col items-center gap-2 group">
                 <div className={`w-12 h-12 md:w-16 md:h-16 border border-gray-700 flex items-center justify-center transition-all duration-200 ${activeNode !== 'IDLE' ? 'border-white text-white' : 'text-gray-600'}`}>
                    <User size={20} />
                 </div>
                 <span className="text-[10px] font-bold text-gray-600">USER</span>
              </div>

              {/* LINE 1 */}
              <div className="flex-1 h-[1px] bg-gray-800 relative">
                  <div className={`absolute inset-0 bg-terminal-green transition-transform duration-300 origin-left ${activeNode !== 'IDLE' ? 'scale-x-100' : 'scale-x-0'}`}></div>
              </div>

              {/* NODE 2: ROUTER */}
              <div className="flex flex-col items-center gap-2">
                 <div className={`w-12 h-12 md:w-16 md:h-16 border border-gray-700 flex items-center justify-center transition-all duration-200 ${isRouterActive ? 'border-terminal-green text-terminal-green shadow-[0_0_10px_rgba(34,197,94,0.3)]' : 'text-gray-600'}`}>
                    <Cpu size={20} />
                 </div>
                 <span className="text-[10px] font-bold text-gray-600">ROUTER</span>
              </div>

              {/* LINE 2 */}
              <div className="flex-1 h-[1px] bg-gray-800 relative">
                  <div className={`absolute inset-0 bg-terminal-green transition-transform duration-300 origin-left ${isToolActive || isSpeaking ? 'scale-x-100' : 'scale-x-0'}`}></div>
              </div>

              {/* NODE 3: RESULT / AUDIO */}
              <div className="flex flex-col items-center gap-2">
                 <div className={`w-12 h-12 md:w-16 md:h-16 border border-gray-700 flex items-center justify-center transition-all duration-200 overflow-hidden ${isToolActive || isSpeaking ? 'border-white text-white shadow-[0_0_10px_rgba(255,255,255,0.3)]' : 'text-gray-600'}`}>
                    {activeNode === 'RAG' && <Database size={20} />}
                    {activeNode === 'JD_MATCHER' && <FileText size={20} />}
                    {activeNode === 'CONTACT' && <MessageSquare size={20} />}
                    {['IDLE', 'USER_INPUT', 'ROUTER'].includes(activeNode) && <HelpCircle size={20} />}
                    
                    {/* Audio Waveform Visualization */}
                    {isSpeaking && (
                        <div className="flex items-center justify-center gap-[2px] h-full w-full bg-black">
                            <div className="w-[3px] bg-power animate-[pulse_0.5s_ease-in-out_infinite] h-[40%]"></div>
                            <div className="w-[3px] bg-power animate-[pulse_0.7s_ease-in-out_infinite] h-[70%]"></div>
                            <div className="w-[3px] bg-power animate-[pulse_0.4s_ease-in-out_infinite] h-[50%]"></div>
                            <div className="w-[3px] bg-power animate-[pulse_0.6s_ease-in-out_infinite] h-[80%]"></div>
                            <div className="w-[3px] bg-power animate-[pulse_0.5s_ease-in-out_infinite] h-[40%]"></div>
                        </div>
                    )}
                 </div>
                 <span className="text-[10px] font-bold text-gray-600">
                    {isSpeaking ? 'AUDIO_OUT' : (isToolActive ? activeNode : 'WAITING')}
                 </span>
              </div>

          </div>

      </div>

    </div>
  );
};
