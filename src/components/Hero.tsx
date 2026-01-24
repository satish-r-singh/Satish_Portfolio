import React, { useState, useRef } from 'react';
import { Activity, Terminal, FileText, Briefcase, Code, Download, Mic, MicOff, Volume2, VolumeX, Layers, Trash2, Heart } from 'lucide-react';
import { TechStackModal } from './TechStackModal';
import { MotivationModal } from './MotivationModal';
import { TrustMarquee } from './TrustMarquee';
import ReactMarkdown from 'react-markdown';
import { useAudioPlayback, useSpeechRecognition, useChat } from '../hooks';

type SystemState = 'IDLE' | 'PROCESSING' | 'SPEAKING' | 'LISTENING';

interface HeroProps {
    onNavigateToProjects: (filter: string | null) => void;
    isAudioEnabled: boolean;
}

export const Hero: React.FC<HeroProps> = ({ onNavigateToProjects, isAudioEnabled: initialAudioState }) => {
    // --- MODALS ---
    const [isTechStackOpen, setIsTechStackOpen] = useState(false);
    const [isMotivationOpen, setIsMotivationOpen] = useState(false);

    // --- FILE INPUT REF ---
    const fileInputRef = useRef<HTMLInputElement>(null);

    // --- CUSTOM HOOKS ---
    const {
        input,
        setInput,
        response,
        setResponse,
        consoleLogs,
        isLoading,
        systemState,
        setSystemState,
        addLog,
        processQuery,
        handleFileUpload: processFileUpload,
        handleClear: clearChat,
        consoleContainerRef
    } = useChat({
        onAudioResponse: (text) => playAudioResponse(text)
    });

    const {
        isAudioOn,
        isPlaying,
        toggleAudio,
        stopAudio,
        playAudioResponse,
        systemState: audioSystemState
    } = useAudioPlayback({
        initialEnabled: initialAudioState,
        onLog: addLog
    });

    const {
        isListening,
        toggleListening
    } = useSpeechRecognition({
        onResult: (transcript) => {
            setInput(transcript);
            processQuery(transcript);
        },
        onLog: addLog,
        onStart: () => {
            setSystemState('LISTENING');
            setResponse(null);
            setInput('');
        }
    });

    // Combine system states for UI display
    const displayState: SystemState = isListening ? 'LISTENING' :
        audioSystemState === 'SPEAKING' ? 'SPEAKING' :
            systemState;

    // --- HANDLERS ---
    const handleClear = () => {
        clearChat();
        stopAudio();
    };

    const handleFileUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files?.[0];
        if (!file) return;
        await processFileUpload(file);
        if (fileInputRef.current) fileInputRef.current.value = '';
    };

    return (
        <>
            <section className="relative w-full border-b-3 border-black flex flex-col lg:flex-row">

                {/* --- LEFT COLUMN: TERMINAL & CONTROLS --- */}
                <div className="w-full lg:w-[75%] flex flex-col justify-start px-6 py-6 lg:px-14 lg:py-8 bg-white border-b-3 lg:border-b-0 lg:border-r-3 border-black z-10">
                    <input type="file" ref={fileInputRef} onChange={handleFileUpload} accept=".pdf" style={{ display: 'none' }} />

                    {/* HERO HEADER */}
                    <div className="mb-6">
                        <h1 className="text-6xl md:text-7xl lg:text-8xl font-black tracking-tighter leading-[0.9] mb-3">
                            I AM SATISH'S
                        </h1>
                        <div className="flex items-baseline gap-4 flex-wrap">
                            <span className="text-6xl md:text-7xl lg:text-8xl font-black tracking-tighter leading-[0.9] text-transparent bg-clip-text bg-gradient-to-r from-black to-gray-400">AI AGENT.</span>
                            <p className="text-sm md:text-base font-mono font-bold text-gray-500">
                                Upload a JD to check fit, or ask me anything about his professional experience.
                            </p>
                        </div>
                    </div>

                    <div className="w-full flex flex-col gap-4 pr-0 lg:pr-8">

                        {/* 1. INPUT ROW */}
                        <div className="flex relative z-30 shadow-hard w-full h-12">
                            <form onSubmit={(e) => { e.preventDefault(); processQuery(input); }} className="flex-grow flex h-full">
                                <div className="flex-grow bg-white border-3 border-black border-r-0 relative flex items-center group h-full">
                                    <div className="pl-4 pr-3 text-black group-focus-within:text-power transition-colors">
                                        <Terminal size={20} strokeWidth={3} />
                                    </div>
                                    <input
                                        type="text"
                                        value={input}
                                        onChange={(e) => setInput(e.target.value)}
                                        placeholder={isListening ? "Listening..." : "Ask me about my experience..."}
                                        className="w-full h-full bg-transparent font-mono text-lg font-bold placeholder:text-gray-300 focus:outline-none border-none outline-none ring-0 pr-12"
                                    />
                                </div>
                            </form>
                            <button onClick={toggleListening} className={`w-14 md:w-16 border-t-3 border-b-3 border-black border-l-3 lg:border-l-0 flex flex-col items-center justify-center gap-0.5 cursor-pointer ${isListening ? 'bg-power text-white animate-pulse' : 'bg-black text-white hover:bg-gray-900'}`}>
                                {isListening ? <MicOff size={18} /> : <Mic size={18} strokeWidth={2.5} />}
                                <span className="font-mono text-[9px] font-bold">VOICE</span>
                            </button>
                            <button onClick={() => processQuery(input)} className="h-full px-6 bg-black text-white font-black text-lg border-3 border-l-0 border-black hover:bg-power transition-colors uppercase flex items-center gap-2">
                                {isLoading ? <Activity className="animate-spin" size={18} /> : "RUN ->"}
                            </button>
                        </div>

                        {/* 2. TOOLS ROW */}
                        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 relative z-20">
                            <ToolButton icon={FileText} label="UPLOAD JD" onClick={() => fileInputRef.current?.click()} />
                            <ToolButton icon={Briefcase} label="CASE STUDIES" onClick={() => onNavigateToProjects(null)} />
                            <ToolButton icon={Code} label="TECH STACK" onClick={() => {
                                const visualMsg = `**// GENAI & AGENT SYSTEMS**
Agentic Workflows (LangChain/LangGraph, CrewAI), Multi-Modal Models (Audio/Video/Image), RAG Pipelines, Fine-Tuning.

**// Computer Vision & NLP**
YOLO, CNN, Mask R-CNN, OpenCV, BERT, Image Segmentation, HuggingFace

**// DATA SCIENCE & ML**
Predictive Modeling, Model Interpretability (SHAP/LIME), Time Series Forecasting (ARIMA/Prophet), Clustering, Scikit-Learn, TensorFlow, PyTorch, XGBoost, CatBoost, LightGBM.

**// FULL STACK**
React, FastAPI, Node.js, TailwindCSS

**// MLOPS, LLMOPS & CLOUD**
AWS, Azure, LangSmith, Docker, Kubernetes, CI/CD, Git, Model Observability (MLflow/W&B)`;
                                const audioMsg = "Accessing Technical Inventory. My core stack is built on Python and Gemini for AI, supported by React for frontend, and deployed via Docker and Kubernetes on Cloud infrastructure.";
                                setResponse(visualMsg);
                                playAudioResponse(audioMsg);
                            }} />
                            <ToolButton icon={Download} label="RESUME" onClick={() => window.open('/Satish_R_Singh_Group_Lead_Data_Scientist.pdf', '_blank')} className="text-power border-power" />
                        </div>

                        {/* 3. THE CONSOLE WINDOW */}
                        <div className="flex flex-col mt-4 shadow-hard border-3 border-black bg-black h-[220px] md:h-[300px] relative">

                            {/* TERMINAL HEADER */}
                            <div className="flex items-center justify-between px-3 py-2 bg-gray-900 border-b border-gray-800 shrink-0">
                                <div className="flex items-center gap-2">
                                    <div className={`w-2 h-2 rounded-full ${displayState === 'IDLE' ? 'bg-green-500' : 'bg-yellow-500 animate-pulse'}`}></div>
                                    <span className="font-mono text-[10px] md:text-xs text-gray-400 font-bold uppercase">
                                        <span className="hidden md:inline">SYSTEM_STATUS: </span>
                                        {displayState}
                                    </span>
                                </div>

                                <div className="flex items-center gap-3">
                                    <button
                                        onClick={toggleAudio}
                                        className={`flex items-center gap-1.5 transition-colors ${isAudioOn ? 'text-power' : 'text-gray-500 hover:text-white'}`}
                                        title="Toggle Sound"
                                    >
                                        {isAudioOn ? <Volume2 size={14} /> : <VolumeX size={14} />}
                                        <span className="hidden md:inline font-mono text-[10px] font-bold">
                                            {isAudioOn ? 'AUDIO_ON' : 'MUTED'}
                                        </span>
                                    </button>

                                    <button
                                        onClick={handleClear}
                                        className="text-gray-500 hover:text-red-500 transition-colors flex items-center gap-1.5"
                                        title="Clear Terminal"
                                    >
                                        <Trash2 size={14} />
                                        <span className="hidden md:inline font-mono text-[10px] font-bold">
                                            [ CLEAR ]
                                        </span>
                                    </button>

                                    <div className="flex gap-1.5 ml-1 border-l border-gray-700 pl-3">
                                        <div className="w-2 h-2 rounded-full bg-red-500/50"></div>
                                        <div className="w-2 h-2 rounded-full bg-yellow-500/50"></div>
                                        <div className="w-2 h-2 rounded-full bg-green-500/50"></div>
                                    </div>
                                </div>
                            </div>

                            {/* SCROLL AREA */}
                            <div
                                ref={consoleContainerRef}
                                className="flex-grow overflow-y-auto custom-scrollbar font-mono text-xs md:text-sm leading-relaxed space-y-2 p-4"
                            >
                                {consoleLogs.map((log, i) => (
                                    <div key={i} className="text-gray-500 break-words font-medium">{log}</div>
                                ))}

                                {response && (
                                    <div className="mt-6 pt-4 border-t border-gray-800 animate-in fade-in slide-in-from-bottom-2 duration-500">
                                        <div className="text-power mb-3 font-bold uppercase tracking-widest text-[10px]">
                                            &gt; FINAL_OUTPUT_STREAM:
                                        </div>
                                        <div className="text-gray-200">
                                            <ReactMarkdown components={{
                                                p: (props) => <p className="mb-3" {...props} />,
                                                strong: (props) => <strong className="text-white font-bold" {...props} />,
                                                ul: (props) => <ul className="list-disc pl-4 mb-3 text-gray-400" {...props} />,
                                                li: (props) => <li className="mb-1" {...props} />,
                                                code: (props) => <code className="bg-gray-800 px-1 rounded text-power" {...props} />
                                            }}>{response}</ReactMarkdown>
                                        </div>
                                    </div>
                                )}

                                {isLoading && (
                                    <div className="flex items-center gap-2 text-power mt-4">
                                        <span className="animate-pulse">_</span>
                                        <span>PROCESSING_REQUEST...</span>
                                    </div>
                                )}
                            </div>
                        </div>

                    </div>
                </div>

                {/* --- RIGHT COLUMN: PROFILE --- */}
                <div className="w-full lg:w-[25%] bg-white flex flex-col justify-start p-6 lg:p-10 border-b-3 md:border-b-0 border-black">
                    <div className="w-full mb-4">
                        <div className="inline-block bg-power text-white font-mono font-bold text-[10px] px-2 py-0.5 mb-2 border-2 border-black shadow-[2px_2px_0px_0px_#000000]">
                            [ ROLE_DEFINITION ]
                        </div>
                        <h2 className="text-4xl lg:text-5xl font-black uppercase tracking-tighter leading-[0.85]">
                            GROUP-LEAD<br />AI & DATA<br />SCIENCE
                        </h2>
                    </div>
                    <div className="relative group w-full aspect-square max-w-[350px] mx-auto lg:mx-0">
                        <div className="relative w-full h-full border-3 border-black bg-white grayscale contrast-125 hover:grayscale-0 transition-all duration-500 overflow-hidden shadow-hard">
                            <img src="/images/satish_profile.png" alt="Satish Rohit Singh" className="w-full h-full object-cover" />
                        </div>
                    </div>
                    <button onClick={() => setIsTechStackOpen(true)} className="w-full max-w-[350px] mx-auto lg:mx-0 mt-4 py-2 border-2 border-black font-mono font-bold text-xs uppercase bg-white hover:bg-black hover:text-white transition-all flex items-center justify-center gap-2 group shadow-hard-sm hover:shadow-none hover:translate-x-1 hover:translate-y-1">
                        <Layers size={14} />
                        <span className="group-hover:underline decoration-power decoration-2">Explore tech stack behind this page</span>
                    </button>
                    <button onClick={() => setIsMotivationOpen(true)} className="w-full max-w-[350px] mx-auto lg:mx-0 mt-4 py-2 border-2 border-black font-mono font-bold text-xs uppercase bg-black text-white hover:bg-white hover:text-black transition-all flex items-center justify-center gap-2 group shadow-hard-sm hover:shadow-none hover:translate-x-1 hover:translate-y-1">
                        <Heart size={14} />
                        <span className="group-hover:underline decoration-power decoration-2">The motivation behind this page</span>
                    </button>
                    <TechStackModal isOpen={isTechStackOpen} onClose={() => setIsTechStackOpen(false)} />
                    <MotivationModal isOpen={isMotivationOpen} onClose={() => setIsMotivationOpen(false)} />
                </div>
            </section>

            {/* FULL WIDTH MARQUEE */}
            <div className="w-full border-b-3 border-black">
                <TrustMarquee />
            </div>
        </>
    );
};

// ToolButton component
const ToolButton: React.FC<{ icon: any; label: string; onClick: () => void; className?: string }> = ({ icon: Icon, label, onClick, className = '' }) => (
    <button
        onClick={onClick}
        className={`h-12 flex items-center justify-center gap-2 font-bold font-mono text-xs uppercase tracking-tight bg-white hover:bg-black hover:text-white transition-all border-3 border-black shadow-hard hover:shadow-none hover:translate-x-[2px] hover:translate-y-[2px] active:translate-x-[4px] active:translate-y-[4px] ${className}`}
    >
        <Icon size={14} strokeWidth={2.5} />
        <span className="whitespace-nowrap overflow-hidden text-ellipsis px-1">{label}</span>
    </button>
);