import React from 'react';
import { X, Code, Cpu, Palette, Box, Zap, Globe, Database } from 'lucide-react';

interface TechStackModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const TechStackModal: React.FC<TechStackModalProps> = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  const stack = [
    { 
      category: "CORE_FRAMEWORK",
      items: [
        { name: 'React 19', icon: Code, detail: 'Component Architecture' },
        { name: 'TypeScript', icon: Box, detail: 'Strict Type Safety' },
        { name: 'Vite', icon: Zap, detail: 'Build Tooling' }
      ]
    },
    { 
      category: "AI_NEURAL_NET",
      items: [
        { name: 'Gemini 2.5 Flash', icon: Cpu, detail: 'Reasoning Engine' },
        { name: 'Gemini TTS', icon: Box, detail: 'Voice Synthesis' },
        { name: 'Google GenAI SDK', icon: Globe, detail: 'API Integration' }
      ]
    },
    { 
      category: "UI_SYSTEM",
      items: [
        { name: 'Tailwind CSS', icon: Palette, detail: 'Utility-First Styling' },
        { name: 'Lucide React', icon: Box, detail: 'Vector Iconography' },
        { name: 'Space Grotesk', icon: TypeIcon, detail: 'Primary Typeface' }
      ]
    }
  ];

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="w-full max-w-4xl bg-white border-3 border-black shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] max-h-[90vh] overflow-y-auto relative flex flex-col">
        
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b-3 border-black bg-black text-white sticky top-0 z-10">
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

        {/* Content Body */}
        <div className="p-6 md:p-10 bg-gray-50">
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                {stack.map((group, idx) => (
                    <div key={idx} className="flex flex-col gap-4">
                        <h3 className="font-mono font-bold text-sm bg-black text-white px-2 py-1 inline-block w-fit">
                           [{group.category}]
                        </h3>
                        <div className="flex flex-col gap-3">
                            {group.items.map((item, i) => (
                                <div key={i} className="flex items-center gap-3 p-3 border-2 border-black bg-white hover:translate-x-1 hover:shadow-[4px_4px_0px_0px_rgba(0,0,0,0.1)] transition-all">
                                    <div className="p-2 bg-gray-100 border border-black text-black">
                                        <item.icon size={18} />
                                    </div>
                                    <div>
                                        <div className="font-bold font-mono text-sm uppercase">{item.name}</div>
                                        <div className="text-[10px] font-mono text-gray-500">{item.detail}</div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                ))}
            </div>

            <div className="mt-10 pt-6 border-t-3 border-dashed border-gray-300">
                <div className="flex flex-col md:flex-row items-center justify-between gap-4">
                    <p className="font-mono text-xs text-gray-500 max-w-md">
                        This system uses a <strong>RAG-Lite</strong> architecture. The frontend maintains a local context of projects (JSON), which is injected into the Gemini system prompt for grounded answers without a dedicated backend vector DB.
                    </p>
                    <div className="flex items-center gap-2 px-4 py-2 border-2 border-gray-300 bg-gray-100">
                        <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                        <span className="font-mono text-xs font-bold text-gray-600">SYSTEM_STATUS: OPTIMAL</span>
                    </div>
                </div>
            </div>

        </div>
      </div>
    </div>
  );
};

// Helper icon
const TypeIcon = ({ size, className }: { size?: number, className?: string }) => (
    <svg 
      width={size} 
      height={size} 
      viewBox="0 0 24 24" 
      fill="none" 
      stroke="currentColor" 
      strokeWidth="2" 
      strokeLinecap="round" 
      strokeLinejoin="round" 
      className={className}
    >
      <polyline points="4 7 4 4 20 4 20 7" />
      <line x1="9" y1="20" x2="15" y2="20" />
      <line x1="12" y1="4" x2="12" y2="20" />
    </svg>
);
