import React, { useState, useRef, useEffect } from 'react';
import { Activity, Terminal, FileText, Briefcase, Code, Download, Mic, Layers } from 'lucide-react';
import { generateSpeech } from '../services/geminiService';
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
        // Strict Guardrail: Only navigate if explicit action verb is used
        const hasAction = t.includes('show') || t.includes('view') || t.includes('go') || t.includes('list') || t.includes('navigate');
        const hasTarget = t.includes('project') || t.includes('work') || t.includes('case study');

        if (hasAction && hasTarget) {
            if (t.includes('rag')) onNavigateToProjects('RAG');
            else if (t.includes('finance') || t.includes('agent')) onNavigateToProjects('Agents');
            else if (t.includes('iot') || t.includes('data')) onNavigateToProjects('Data Eng');
            else onNavigateToProjects(null); // Show all
            return true;
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
            const audioContext = new (window.AudioContext || (window as any).webkitAudioContext)({ sampleRate: 24000 });
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

        // Intent Check
        const navigated = processIntent(queryText);
        if (navigated) {
            setIsLoading(false);
            setResponse("Command Acknowledged. Navigating to Projects Database...");
            setTimeout(() => setActiveNode('IDLE'), 3000);
            return;
        }

        // RAG Connection
        try {
            const apiResponse = await fetch("http://localhost:8000/chat", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ message: queryText, session_id: "guest_browser" }),
            });

            if (!apiResponse.ok) throw new Error(`Server Error: ${apiResponse.status}`);
            const data = await apiResponse.json();
            setResponse(data.response);

            if (isAudioEnabled) {
                const audioData = await generateSpeech(data.response);
                if (audioData) playAudio(audioData);
            }
        } catch (error) {
            console.error("Brain Connection Failed:", error);
            setResponse("⚠️ ERROR: Neural Link Offline. Please check backend connection.");
        } finally {
            setIsLoading(false);
            if (!isAudioEnabled) setTimeout(() => setActiveNode('IDLE'), 5000);
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
            alert("Speech Recognition not supported.");
        }
    };

    const handleMouseUp = () => {
        if (recognitionRef.current) recognitionRef.current.stop();
    };

    return (
        <section className="relative w-full border-b-3 border-black flex flex-col lg:flex-row">

            {/* LEFT COLUMN (75%): The Command Stack */}
            {/* <div className="w-full lg:w-[75%] flex flex-col justify-start p-6 lg:p-20 bg-white border-b-3 lg:border-b-0 lg:border-r-3 border-black z-10"> */}
            <div className="w-full lg:w-[75%] flex flex-col justify-start px-6 py-6 lg:px-14 lg:py-6 bg-white border-b-3 lg:border-b-0 lg:border-r-3 border-black z-10">


                {/* Typography - COMPACTED */}
                <div className="mb-6">
                    <h1 className="text-6xl md:text-7xl lg:text-8xl font-black tracking-tighter leading-[0.9] mb-3">
                        I AM SATISH'S<br />
                        <span className="text-transparent bg-clip-text bg-gradient-to-r from-black to-gray-400">AI AGENT.</span>
                    </h1>
                    <p className="text-sm md:text-base font-mono font-bold text-gray-500 max-w-4xl">
                        Upload a JD to check fit, ask me anything about his professional experience.
                    </p>
                </div>

                {/* THE UNIFIED COMMAND STACK */}
                <div className="w-full max-w-5xl flex flex-col gap-4">

                    {/* BLOCK 1: CHAT INPUT - COMPACTED */}
                    <div className="flex relative z-30 shadow-hard w-full h-14 md:h-16">
                        <form onSubmit={handleSubmit} className="flex-grow flex h-full">
                            <div className="flex-grow bg-white border-3 border-black border-r-0 relative flex items-center group h-full">
                                <div className="pl-4 pr-3 text-black group-focus-within:text-power transition-colors">
                                    <Terminal size={20} strokeWidth={3} />
                                </div>
                                <input
                                    type="text"
                                    value={input}
                                    onChange={(e) => setInput(e.target.value)}
                                    placeholder="Ask me about my experience..."
                                    // REMOVED 'uppercase', reduced font size
                                    className="w-full h-full bg-transparent font-mono text-lg font-bold placeholder:text-gray-300 focus:outline-none border-none outline-none ring-0"
                                />
                            </div>
                        </form>

                        {/* Voice Module Button */}
                        <button
                            onMouseDown={handleMouseDown}
                            onMouseUp={handleMouseUp}
                            className={`w-16 md:w-20 border-t-3 border-b-3 border-black border-l-3 lg:border-l-0 flex flex-col items-center justify-center gap-0.5 transition-all duration-100 cursor-pointer ${isRecording ? 'bg-power text-white animate-pulse' : 'bg-black text-white hover:bg-gray-900'}`}
                        >
                            <Mic size={20} strokeWidth={2.5} />
                            <span className="font-mono text-[9px] font-bold">VOICE</span>
                        </button>

                        {/* Submit Button */}
                        <button
                            onClick={handleSubmit}
                            className="h-full px-6 bg-black text-white font-black text-lg border-3 border-l-0 border-black hover:bg-power transition-colors uppercase flex items-center gap-2 tracking-tight"
                        >
                            {isLoading ? <Activity className="animate-spin" size={20} /> : "RUN ->"}
                        </button>
                    </div>

                    {/* BLOCK 2: TOOL ARRAY - COMPACTED */}
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-3 relative z-20">
                        <ToolButton icon={FileText} label="UPLOAD JD" onClick={() => alert('Auth Required')} />
                        <ToolButton icon={Briefcase} label="CASE STUDIES" onClick={() => onNavigateToProjects(null)} />
                        <ToolButton icon={Code} label="TECH STACK" onClick={() => {
                            setResponse("My Stack: Python, TensorFlow, React, Gemini API, Pinecone, FastAPI, Docker, Kubernetes.");
                        }} />
                        <ToolButton icon={Download} label="RESUME" onClick={() => window.open('#')} className="text-power border-power" />
                    </div>

                    {/* BLOCK 3: LOGIC CONSOLE - COMPACTED */}
                    <div className="flex flex-col mt-2">
                        {/* The Terminal */}
                        <div className="w-full h-[250px] bg-black p-4 overflow-hidden relative flex flex-col shadow-hard border-3 border-black">
                            {response ? (
                                <div className="h-full flex flex-col animate-in fade-in duration-300">
                                    <div className="flex justify-between items-center mb-2 border-b border-gray-800 pb-1">
                                        <div className="flex items-center gap-2">
                                            <div className="w-1.5 h-1.5 bg-power animate-pulse" />
                                            <span className="text-power font-mono text-[10px] uppercase tracking-widest">INCOMING_TRANSMISSION</span>
                                        </div>
                                        <button onClick={() => setResponse(null)} className="text-[10px] font-mono font-bold text-gray-500 hover:text-white uppercase">[ CLEAR ]</button>
                                    </div>
                                    <div className="flex-grow overflow-y-auto custom-scrollbar pr-2">
                                        <div className="font-mono text-sm leading-relaxed max-w-none text-gray-300">
                                            <ReactMarkdown
                                                components={{
                                                    p: ({ node, ...props }) => <p className="mb-3 text-gray-300" {...props} />,
                                                    strong: ({ node, ...props }) => <strong className="text-white font-bold" {...props} />,
                                                    ul: ({ node, ...props }) => <ul className="list-disc pl-4 mb-3 text-gray-300" {...props} />,
                                                    li: ({ node, ...props }) => <li className="mb-1" {...props} />,
                                                    h1: ({ node, ...props }) => <h1 className="text-lg font-bold text-white mb-2 uppercase" {...props} />,
                                                    h2: ({ node, ...props }) => <h2 className="text-base font-bold text-white mb-2 uppercase" {...props} />,
                                                    code: ({ node, ...props }) => <code className="bg-gray-800 px-1 rounded text-power" {...props} />
                                                }}
                                            >
                                                {response}
                                            </ReactMarkdown>
                                        </div>
                                    </div>
                                </div>
                            ) : (
                                <LiveArchitectureDiagram activeNode={activeNode} />
                            )}
                        </div>
                        <TrustMarquee />
                    </div>
                </div>
            </div>

            {/* RIGHT COLUMN (30%): The Profile - COMPACTED */}
            <div className="w-full lg:w-[30%] bg-white flex flex-col justify-start p-6 lg:p-10 border-b-3 md:border-b-0 border-black">
                <div className="w-full mb-4">
                    <div className="inline-block bg-power text-white font-mono font-bold text-[10px] px-2 py-0.5 mb-2 border-2 border-black shadow-[2px_2px_0px_0px_#000000]">
                        [ ROLE_DEFINITION ]
                    </div>
                    <h2 className="text-4xl lg:text-5xl font-black uppercase tracking-tighter leading-[0.85]">
                        GROUP<br />LEAD<br />DATA<br />SCIENTIST
                    </h2>
                </div>

                <div className="relative group w-full aspect-square max-w-[350px] mx-auto lg:mx-0">
                    <div className="relative w-full h-full border-3 border-black bg-white grayscale contrast-125 hover:grayscale-0 transition-all duration-500 overflow-hidden shadow-hard">
                        <img src="/images/satish_profile.png" alt="Satish Rohit Singh" className="w-full h-full object-cover" />
                    </div>
                </div>

                <button
                    onClick={() => setIsTechStackOpen(true)}
                    className="w-full max-w-[350px] mt-4 py-2 border-2 border-black font-mono font-bold text-xs uppercase bg-white hover:bg-black hover:text-white transition-all flex items-center justify-center gap-2 group shadow-hard-sm hover:shadow-none hover:translate-x-1 hover:translate-y-1"
                >
                    <Layers size={14} />
                    <span className="group-hover:underline decoration-power decoration-2">Explore tech stack behind this page</span>
                </button>
                <TechStackModal isOpen={isTechStackOpen} onClose={() => setIsTechStackOpen(false)} />
            </div>
        </section>
    );
};

// Compact ToolButton
const ToolButton: React.FC<{ icon: any; label: string; onClick: () => void; className?: string }> = ({ icon: Icon, label, onClick, className = '' }) => (
    <button
        onClick={onClick}
        className={`h-12 flex items-center justify-center gap-2 font-bold font-mono text-xs uppercase tracking-tight bg-white hover:bg-black hover:text-white transition-all border-3 border-black shadow-hard hover:shadow-none hover:translate-x-[2px] hover:translate-y-[2px] active:translate-x-[4px] active:translate-y-[4px] ${className}`}
    >
        <Icon size={14} strokeWidth={2.5} />
        <span className="whitespace-nowrap overflow-hidden text-ellipsis px-1">{label}</span>
    </button>
);