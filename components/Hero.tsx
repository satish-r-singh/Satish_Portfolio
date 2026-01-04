import React, { useState, useRef, useEffect } from 'react';
import { Activity, Terminal, FileText, Briefcase, Code, Download, Mic, Layers } from 'lucide-react';
import { generateAgentResponse, generateSpeech } from '../services/geminiService';
import { LiveArchitectureDiagram, ActiveNode } from './LiveArchitectureDiagram';
import { TechStackModal } from './TechStackModal';
import { TrustMarquee } from './TrustMarquee';
import ReactMarkdown from 'react-markdown';

interface HeroProps {
    onNavigateToProjects: (filter: string | null) => void;
    isAudioEnabled: boolean;
}

export const Hero: React.FC<HeroProps> = ({ onNavigateToProjects, isAudioEnabled }) => {
  const [input, setInput] = useState('');
  const [response, setResponse] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [isRecording, setIsRecording] = useState(false);
  const [isTechStackOpen, setIsTechStackOpen] = useState(false);
  const [activeNode, setActiveNode] = useState<ActiveNode>('IDLE');
  const resultRef = useRef<HTMLDivElement>(null);
  const recognitionRef = useRef<any>(null);

  const determineTool = (text: string): ActiveNode => {
    const t = text.toLowerCase();
    if (t.includes('resume') || t.includes('job') || t.includes('hire') || t.includes('jd') || t.includes('upload')) return 'JD_MATCHER';
    if (t.includes('contact') || t.includes('email') || t.includes('reach') || t.includes('hello')) return 'CONTACT';
    return 'RAG';
  };

  const processIntent = (text: string) => {
      const t = text.toLowerCase();
      if (t.includes('project') || t.includes('work') || t.includes('case study')) {
          if (t.includes('rag')) onNavigateToProjects('RAG');
          else if (t.includes('finance') || t.includes('agent')) onNavigateToProjects('Agents');
          else if (t.includes('iot') || t.includes('data')) onNavigateToProjects('Data Eng');
          else onNavigateToProjects(null); // Show all
          return true; // Intent handled
      }
      return false;
  };

  const decodeAudioData = (base64String: string) => {
    const binaryString = atob(base64String);
    const bytes = new Uint8Array(binaryString.length);
    for (let i = 0; i < binaryString.length; i++) {
        bytes[i] = binaryString.charCodeAt(i);
    }
    return bytes.buffer;
  };

  const playAudio = async (base64Audio: string) => {
      try {
          const audioContext = new (window.AudioContext || (window as any).webkitAudioContext)({sampleRate: 24000});
          const audioBuffer = await audioContext.decodeAudioData(decodeAudioData(base64Audio));
          const source = audioContext.createBufferSource();
          source.buffer = audioBuffer;
          source.connect(audioContext.destination);
          
          setActiveNode('SPEAKING');
          source.start(0);
          
          source.onended = () => {
              setActiveNode('IDLE');
          };
      } catch (e) {
          console.error("Audio Playback Error", e);
          setActiveNode('IDLE');
      }
  };

  const processQuery = async (queryText: string) => {
    if (!queryText.trim()) return;

    const tool = determineTool(queryText);
    setActiveNode('USER_INPUT');
    setTimeout(() => setActiveNode('ROUTER'), 400);
    setTimeout(() => setActiveNode(tool), 1000);

    setIsLoading(true);
    setResponse(null);
    
    // Simulate thinking
    await new Promise(r => setTimeout(r, 1200));

    // Check for navigation intent before calling AI
    const navigated = processIntent(queryText);
    
    if (navigated) {
        setIsLoading(false);
        const navText = "Command Acknowledged. Navigating to Filtered Projects Database...";
        setResponse(navText);
        if (isAudioEnabled) {
            const audioData = await generateSpeech(navText);
            if (audioData) playAudio(audioData);
            else setTimeout(() => setActiveNode('IDLE'), 3000);
        } else {
            setTimeout(() => setActiveNode('IDLE'), 3000);
        }
        return;
    }

    const result = await generateAgentResponse(queryText);
    setResponse(result);
    setIsLoading(false);

    if (isAudioEnabled) {
        // Generate and play audio
        const audioData = await generateSpeech(result);
        if (audioData) {
            playAudio(audioData);
            // activeNode reset is handled in onended
        } else {
             setTimeout(() => setActiveNode('IDLE'), 5000);
        }
    } else {
        setTimeout(() => setActiveNode('IDLE'), 5000);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    processQuery(input);
  };

  const handleMouseDown = () => {
    if ('webkitSpeechRecognition' in window || 'SpeechRecognition' in window) {
        const SpeechRecognition = (window as any).webkitSpeechRecognition || (window as any).SpeechRecognition;
        const recognition = new SpeechRecognition();
        recognition.continuous = false;
        recognition.interimResults = false;
        recognition.lang = 'en-US';
        
        recognition.onstart = () => setIsRecording(true);
        recognition.onend = () => setIsRecording(false);
        recognition.onresult = (event: any) => {
            const transcript = event.results[0][0].transcript;
            setInput(transcript);
            processQuery(transcript);
        };
        
        recognition.start();
        recognitionRef.current = recognition;
    } else {
        alert("Speech Recognition not supported in this browser.");
    }
  };

  const handleMouseUp = () => {
      if (recognitionRef.current) {
          recognitionRef.current.stop();
      }
  };

  useEffect(() => {
    if (response && resultRef.current) {
      resultRef.current.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
    }
  }, [response]);

  return (
    <section className="relative w-full border-b-3 border-black flex flex-col lg:flex-row min-h-[90vh]">
      
      {/* LEFT COLUMN (70%): The Command Stack */}
      <div className="w-full lg:w-[70%] flex flex-col justify-center p-6 md:p-12 lg:p-20 bg-white border-b-3 lg:border-b-0 lg:border-r-3 border-black z-10">
        
        {/* Typography */}
        <div className="mb-12">
            <h1 className="text-6xl md:text-7xl lg:text-8xl font-black tracking-tighter uppercase leading-[0.85] mb-6">
              I AM SATISH'S<br/>
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-black to-gray-600">AI AGENT.</span>
            </h1>
            <p className="text-xl md:text-2xl font-mono font-bold text-gray-500 max-w-3xl leading-relaxed">
              Upload a JD to check fit, or search my project database. <br className="hidden xl:block" />
              I am built on Gemini 2.5 Flash.
            </p>
        </div>

        {/* THE UNIFIED COMMAND STACK */}
        <div className="w-full max-w-5xl flex flex-col gap-8">
            
            {/* BLOCK 1: CHAT INPUT */}
            <div className="flex relative z-30 shadow-hard w-full h-20 md:h-24">
                <form onSubmit={handleSubmit} className="flex-grow flex h-full">
                    <div className="flex-grow bg-white border-3 border-black border-r-0 relative flex items-center group h-full">
                        <div className="pl-6 pr-4 text-black group-focus-within:text-power transition-colors">
                            <Terminal size={28} strokeWidth={3} />
                        </div>
                        <input 
                            type="text" 
                            value={input}
                            onChange={(e) => setInput(e.target.value)}
                            placeholder="Ask me anything..."
                            className="w-full h-full bg-transparent font-mono text-xl md:text-2xl font-bold uppercase placeholder:text-gray-300 focus:outline-none border-none outline-none ring-0"
                        />
                    </div>
                </form>
                
                {/* Voice Module Button */}
                <button
                    onMouseDown={handleMouseDown}
                    onMouseUp={handleMouseUp}
                    onTouchStart={handleMouseDown} // Mobile support
                    onTouchEnd={handleMouseUp}     // Mobile support
                    className={`
                        w-24 border-t-3 border-b-3 border-black border-l-3 lg:border-l-0
                        flex flex-col items-center justify-center gap-1
                        transition-all duration-100 select-none cursor-pointer relative
                        ${isRecording 
                            ? 'bg-power text-white border-r-3 border-r-black animate-pulse' 
                            : 'bg-black text-white hover:bg-gray-900 border-r-2 border-r-white/30'}
                    `}
                >
                    <Mic size={24} strokeWidth={2.5} />
                    <span className="font-mono text-[10px] font-bold">
                        {isRecording ? 'REC' : 'VOICE'}
                    </span>
                </button>

                {/* Submit Button */}
                <button 
                    onClick={handleSubmit}
                    className="h-full px-8 md:px-12 bg-black text-white font-black text-xl md:text-2xl border-3 border-l-0 border-black hover:bg-power transition-colors uppercase flex items-center gap-2 tracking-tighter whitespace-nowrap"
                >
                    {isLoading ? <Activity className="animate-spin" /> : "RUN_QUERY ->"}
                </button>
            </div>

            {/* BLOCK 2: TOOL ARRAY (SEPARATED) */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 relative z-20">
                <ToolButton 
                    icon={FileText} 
                    label="UPLOAD JD" 
                    onClick={() => alert('Auth Required')} 
                />
                <ToolButton 
                    icon={Briefcase} 
                    label="CASE STUDIES" 
                    onClick={() => onNavigateToProjects(null)} 
                />
                <ToolButton 
                    icon={Code} 
                    label="TECH STACK" 
                    onClick={() => {
                        const text = "My Stack: Python, TensorFlow, React, Gemini API, Pinecone, FastAPI, Docker, Kubernetes.";
                        setResponse(text);
                    }} 
                />
                <ToolButton 
                    icon={Download} 
                    label="EXPORT_RESUME" 
                    onClick={() => window.open('#')} 
                    className="text-power border-power"
                />
            </div>

            {/* BLOCK 3: LOGIC CONSOLE & TRUST MARQUEE */}
            <div className="flex flex-col gap-0">
                {/* LOGIC CONSOLE */}
                <div className="w-full bg-gray-50 border-3 border-black relative z-10 flex flex-col shadow-hard mt-4">
                    
                    {/* Header Strip */}
                    <div className="flex items-center justify-between px-4 py-3 border-b-3 border-black bg-white">
                        <span className="font-mono text-xs font-bold uppercase tracking-widest">REAL-TIME SYSTEM LOGIC</span>
                        <div className="flex items-center gap-2">
                            <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></div>
                            <span className="font-mono text-xs font-bold text-green-600 uppercase">LIVE</span>
                        </div>
                    </div>

                    {/* The Terminal */}
                    <div className="w-full h-[300px] bg-black p-4 md:p-6 overflow-hidden">
                        <LiveArchitectureDiagram activeNode={activeNode} />
                    </div>
                </div>

                {/* TRUST PROTOCOL (MARQUEE) */}
                <TrustMarquee />
            </div>

        </div>

        {/* OUTPUT LOG */}
        {response && (
             <div ref={resultRef} className="mt-8 border-l-4 border-power pl-6 py-2 animate-in slide-in-from-top-4">
                 <h3 className="font-bold font-mono text-xs uppercase text-gray-400 mb-2 tracking-widest">AGENT_RESPONSE_LOG:</h3>
                 <div className="prose font-mono text-sm md:text-base max-w-3xl leading-relaxed">
                    <ReactMarkdown>{response}</ReactMarkdown>
                 </div>
             </div>
        )}

      </div>

      {/* RIGHT COLUMN (30%): The Profile */}
      <div className="w-full lg:w-[30%] bg-white flex flex-col justify-center p-8 md:p-12 border-b-3 md:border-b-0 border-black">
           
           <div className="w-full mb-8">
                <div className="inline-block bg-power text-white font-mono font-bold text-xs px-2 py-1 mb-2 border-2 border-black shadow-[2px_2px_0px_0px_#000000]">
                    [ ROLE_DEFINITION ]
                </div>
                <h2 className="text-5xl lg:text-6xl font-black uppercase tracking-tighter leading-[0.85]">
                    LEAD<br/>DATA<br/>SCIENTIST
                </h2>
           </div>

           <div className="relative group w-full aspect-square">
                {/* Image Box */}
                <div className="relative w-full h-full border-3 border-black bg-white grayscale contrast-125 hover:grayscale-0 transition-all duration-500 overflow-hidden shadow-hard">
                    <img src="https://picsum.photos/800/800?grayscale" alt="Profile" className="w-full h-full object-cover" />
                </div>
           </div>
           
           {/* Tech Stack Explorer Button */}
           <button 
                onClick={() => setIsTechStackOpen(true)}
                className="w-full mt-6 py-3 border-2 border-black font-mono font-bold text-xs md:text-sm uppercase bg-white hover:bg-black hover:text-white transition-all flex items-center justify-center gap-2 group shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:shadow-none hover:translate-x-1 hover:translate-y-1"
           >
                <Layers size={16} />
                <span className="group-hover:underline decoration-power decoration-2 underline-offset-4">Explore the tech stack behind this page</span>
           </button>

           <TechStackModal isOpen={isTechStackOpen} onClose={() => setIsTechStackOpen(false)} />
      </div>

    </section>
  );
};

// Helper Component for Tools
interface ToolButtonProps {
    icon: any;
    label: string;
    onClick: () => void;
    className?: string;
}

const ToolButton: React.FC<ToolButtonProps> = ({ icon: Icon, label, onClick, className = '' }) => {
    return (
        <button 
            onClick={onClick}
            type="button"
            className={`
                h-16 flex items-center justify-center gap-2 
                font-bold font-mono text-sm uppercase tracking-tight
                bg-white hover:bg-black hover:text-white transition-all
                border-3 border-black shadow-hard
                hover:shadow-none hover:translate-x-[2px] hover:translate-y-[2px]
                active:translate-x-[4px] active:translate-y-[4px]
                ${className}
            `}
        >
            <Icon size={16} strokeWidth={2.5} />
            <span className="whitespace-nowrap overflow-hidden text-ellipsis px-1">{label}</span>
        </button>
    );
};
