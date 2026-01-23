import React, { useState } from 'react';
import { X, Code, Cpu, Palette, Box, Globe, Database, Server, Share2, Layers, Map } from 'lucide-react';

interface TechStackModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const TechStackModal: React.FC<TechStackModalProps> = ({ isOpen, onClose }) => {
  // State to toggle views
  const [activeTab, setActiveTab] = useState<'stack' | 'diagram'>('stack');

  if (!isOpen) return null;

  const stack = [
    {
      category: "FRONTEND_UI",
      items: [
        { name: 'React 18 + Vite', icon: Code, detail: 'Component Architecture' },
        { name: 'TypeScript', icon: Box, detail: 'Strict Type Safety' },
        { name: 'Tailwind CSS', icon: Palette, detail: 'Utility-First Styling' }
      ]
    },
    {
      category: "BACKEND_RAG",
      items: [
        { name: 'FastAPI (Python)', icon: Server, detail: 'Asynchronous REST API' },
        { name: 'Pinecone', icon: Database, detail: 'Vector Database (Long Term Memory)' },
        { name: 'LangChain', icon: Share2, detail: 'RAG Orchestration' }
      ]
    },
    {
      category: "AI_FOUNDATION",
      items: [
        { name: 'Gemini 2.5 Flash', icon: Cpu, detail: 'Reasoning Engine (Text)' },
        { name: 'Gemini 2.5 Flash TTS', icon: Globe, detail: 'Frontier Multimodal TTS' },
        { name: 'Google GenAI SDK', icon: Layers, detail: 'V2 Native Integration' }
      ]
    }
  ];

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="w-full max-w-5xl bg-white border-3 border-black shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] max-h-[90vh] overflow-hidden relative flex flex-col">

        {/* HEADER */}
        <div className="flex items-center justify-between p-6 border-b-3 border-black bg-black text-white shrink-0">
          <div>
            <h2 className="font-black text-2xl md:text-3xl uppercase tracking-tighter flex items-center gap-3">
              <Database className="text-power" />
              SYSTEM_ARCHITECTURE
            </h2>
            <p className="font-mono text-xs text-gray-400 mt-1">
              // REVEALING UNDERLYING TECH STACK
            </p>
          </div>
          <button
            onClick={onClose}
            className="p-2 border-2 border-white bg-black text-white hover:bg-white hover:text-black hover:scale-110 transition-all duration-200"
          >
            <X size={24} strokeWidth={3} />
          </button>
        </div>

        {/* --- TAB NAVIGATION --- */}
        <div className="flex border-b-3 border-black shrink-0">
          <button
            onClick={() => setActiveTab('stack')}
            className={`flex-1 py-4 flex items-center justify-center gap-2 font-mono font-bold text-sm uppercase tracking-wider transition-all
                ${activeTab === 'stack' ? 'bg-power text-white' : 'bg-white text-black hover:bg-gray-100 border-r-3 border-black'}`}
          >
            <Layers size={18} />
            <span className="hidden md:inline">TECH_STACK_INVENTORY</span><span className="md:hidden">TECH_STACK</span>
          </button>
          <button
            onClick={() => setActiveTab('diagram')}
            className={`flex-1 py-4 flex items-center justify-center gap-2 font-mono font-bold text-sm uppercase tracking-wider transition-all
                ${activeTab === 'diagram' ? 'bg-power text-white' : 'bg-white text-black hover:bg-gray-100'}`}
          >
            <Map size={18} />
            <span className="hidden md:inline">VISUAL_BLUEPRINT</span><span className="md:hidden">BLUEPRINT</span>
          </button>
        </div>

        {/* CONTENT BODY (Scrollable) */}
        <div className="overflow-y-auto custom-scrollbar bg-gray-50 flex-grow">

          {/* TAB 1: TECH STACK GRID */}
          {activeTab === 'stack' && (
            <div className="p-6 md:p-10 animate-in fade-in slide-in-from-left-4 duration-300">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                {stack.map((group, idx) => (
                  <div key={idx} className="flex flex-col gap-4">
                    <h3 className="font-mono font-bold text-sm bg-black text-white px-2 py-1 inline-block w-fit shadow-[2px_2px_0px_0px_rgba(0,0,0,0.3)]">
                      [{group.category}]
                    </h3>
                    <div className="flex flex-col gap-3">
                      {group.items.map((item, i) => (
                        <div key={i} className="flex items-center gap-3 p-3 border-2 border-black bg-white hover:translate-x-1 hover:shadow-[4px_4px_0px_0px_rgba(0,0,0,0.1)] transition-all group">
                          <div className="p-2 bg-gray-100 border border-black text-black group-hover:bg-power group-hover:text-white transition-colors">
                            <item.icon size={18} />
                          </div>
                          <div>
                            <div className="font-bold font-mono text-sm uppercase leading-tight">{item.name}</div>
                            <div className="text-[10px] font-mono text-gray-500">{item.detail}</div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                ))}
              </div>

              <div className="mt-10 pt-6 border-t-3 border-dashed border-gray-300">
                <div className="flex flex-col md:flex-row items-center justify-between gap-6">
                  <p className="font-mono text-xs text-gray-500 max-w-2xl leading-relaxed">
                    This system operates on a <strong>Production-Grade RAG Architecture</strong>. A <strong>FastAPI</strong> backend orchestrates semantic retrieval via <strong>Pinecone Vector DB</strong>, injecting grounded context into <strong>Gemini 2.5</strong> for high-fidelity reasoning. The audio interface is powered by the <strong>Gemini 2.5 Frontier TTS Model</strong>. Much of the <strong>Frontend</strong> was conceptualized and built using <strong>Google's AI Studio and Antigravity</strong>.
                  </p>
                  <div className="flex items-center gap-2 px-4 py-2 border-2 border-gray-300 bg-gray-100 shrink-0">
                    <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                    <span className="font-mono text-xs font-bold text-gray-600">SYSTEM_STATUS: OPTIMAL</span>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* TAB 2: VISUAL DIAGRAM (IMAGE) */}
          {activeTab === 'diagram' && (
            <div className="h-full flex flex-col animate-in fade-in slide-in-from-right-4 duration-300">

              {/* Image Container */}
              <div className="w-full bg-gray-950 flex items-center justify-center border-b-3 border-black relative overflow-hidden">
                {/* Grid Pattern Overlay */}
                <div className="absolute inset-0 opacity-10 pointer-events-none"
                  style={{ backgroundImage: 'linear-gradient(#333 1px, transparent 1px), linear-gradient(90deg, #333 1px, transparent 1px)', backgroundSize: '30px 30px' }}>
                </div>

                {/* THE DIAGRAM IMAGE */}
                <img
                  src="/images/architecture_diagram.png"
                  alt="System Architecture Diagram"
                  className="w-full h-auto object-contain relative z-10"
                />
              </div>

              {/* Architectural Logic Text */}
              <div className="p-6 bg-white">
                <div className="border-l-4 border-power pl-6 py-2">
                  <h3 className="font-black text-xl uppercase mb-2">Architectural Logic</h3>
                  <p className="font-mono text-sm text-gray-600 leading-relaxed max-w-4xl">
                    The system utilizes a <strong>Split-Stream Architecture</strong>. User input is routed via a FastAPI Gateway. Text queries trigger a <strong>Semantic Search</strong> against a Pinecone Vector Store to retrieve context, which is then fed into Gemini 2.5 Flash for reasoning. The audio output is powered by the Gemini 2.5 TTS Model.
                  </p>
                </div>
              </div>
            </div>
          )}

        </div>
      </div>
    </div>
  );
};