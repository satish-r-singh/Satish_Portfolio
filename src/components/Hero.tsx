import React, { useState, useRef, useEffect } from 'react';
import { Activity, Terminal, FileText, Briefcase, Code, Download, Mic, MicOff, Volume2, VolumeX, Layers } from 'lucide-react';
import { LiveArchitectureDiagram, ActiveNode } from './LiveArchitectureDiagram';
import { TechStackModal } from './TechStackModal';
import { TrustMarquee } from './TrustMarquee';
import ReactMarkdown from 'react-markdown';

interface HeroProps {
    onNavigateToProjects: (filter: string | null) => void;
    isAudioEnabled: boolean;
}

export const Hero: React.FC<HeroProps> = ({ onNavigateToProjects, isAudioEnabled: initialAudioState }) => {
    // --- STATE ---
    const [input, setInput] = useState('');
    const [response, setResponse] = useState<string | null>(null);
    const [isLoading, setIsLoading] = useState(false);
    const [isListening, setIsListening] = useState(false);
    const [isTechStackOpen, setIsTechStackOpen] = useState(false); // FIXED: Added this back!

    // AUDIO STATE
    // We initialize with the prop, but allow local toggling
    const [isAudioOn, setIsAudioOn] = useState(initialAudioState);

    const [isPlaying, setIsPlaying] = useState(false);
    const currentAudioRef = useRef<HTMLAudioElement | null>(null);

    // --- REFS (Crucial for fixing the "Stale State" bug) ---
    const isAudioOnRef = useRef(isAudioOn);
    const silenceTimer = useRef<any>(null);
    const recognitionRef = useRef<any>(null);
    const fileInputRef = useRef<HTMLInputElement>(null);

    // Sync Ref with State immediately whenever it changes
    useEffect(() => {
        isAudioOnRef.current = isAudioOn;
    }, [isAudioOn]);


    // --- LOGIC: AUDIO CONTROL ---
    const toggleAudio = () => {
        const newState = !isAudioOn;
        setIsAudioOn(newState);

        if (newState && response) {
            // Turning ON: Read existing text immediately
            playAudioResponse(response);
        } else if (!newState) {
            // Turning OFF: Stop audio immediately
            if (currentAudioRef.current) {
                currentAudioRef.current.pause();
                currentAudioRef.current.currentTime = 0;
            }
            setIsPlaying(false);
            setActiveNode('IDLE');
        }
    };

    // --- LOGIC: TOOL DETERMINATION ---
    const determineTool = (text: string): ActiveNode => {
        const t = text.toLowerCase();
        if (t.includes('resume') || t.includes('job') || t.includes('hire') || t.includes('jd') || t.includes('upload')) return 'JD_MATCHER';
        if (t.includes('contact') || t.includes('email') || t.includes('reach') || t.includes('hello')) return 'CONTACT';
        return 'RAG';
    };

    // --- LOGIC: INTENT PROCESSING ---
    const processIntent = (text: string) => {
        const t = text.toLowerCase();
        const hasAction = t.includes('show') || t.includes('view') || t.includes('go') || t.includes('list') || t.includes('navigate');
        const hasTarget = t.includes('project') || t.includes('work') || t.includes('case study');

        if (hasAction && hasTarget) {
            if (t.includes('rag')) onNavigateToProjects('RAG');
            else if (t.includes('finance') || t.includes('agent')) onNavigateToProjects('Agents');
            else if (t.includes('iot') || t.includes('data')) onNavigateToProjects('Data Eng');
            else onNavigateToProjects(null);
            return true;
        }
        return false;
    };



    // --- LOGIC: AUDIO OUTPUT (TTS) ---
    const playAudioResponse = async (text: string) => {
        if (!isAudioOnRef.current) return;

        try {
            // Stop previous audio if playing
            if (currentAudioRef.current) {
                currentAudioRef.current.pause();
            }
            console.log("🔊 Requesting Audio...");
            const API_URL = import.meta.env.VITE_API_URL || "http://localhost:8000";

            const res = await fetch(`${API_URL}/tts`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ text: text }),
            });

            if (!res.ok) {
                const err = await res.text();
                throw new Error(`Server returned ${res.status}: ${err}`);
            }

            const blob = await res.blob();

            // --- DEBUG: CHECK FILE SIZE ---
            console.log(`💿 Received Blob size: ${blob.size} bytes`);
            console.log(`💿 Blob Type: ${blob.type}`);

            if (blob.size < 500) {
                // If it's tiny, it's likely a text error message disguised as a blob
                const textError = await blob.text();
                console.error("❌ Audio file is too small. Likely an error:", textError);
                return;
            }

            // Create URL
            const audioUrl = URL.createObjectURL(blob);
            const audio = new Audio(audioUrl);

            //Store ref so we can stop it later
            currentAudioRef.current = audio;

            setActiveNode('SPEAKING');

            const playPromise = audio.play();
            if (playPromise !== undefined) {
                playPromise.catch(error => {
                    console.error("❌ Playback failed:", error);
                    // This is usually 'NotAllowedError' (user didn't click) or 'NotSupportedError' (bad format)
                });
            }

            audio.onended = () => {
                setIsPlaying(false); // Reset playing state
                setActiveNode('IDLE');
                URL.revokeObjectURL(audioUrl);
            };

        } catch (error) {
            console.error("Audio Pipeline Error:", error);
        }
    };
    // --- LOGIC: VOICE INPUT (SMART LISTENING) ---
    const handleMicClick = () => {
        if (isListening) {
            stopListening();
            return;
        }

        const SpeechRecognition = (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;

        if (!SpeechRecognition) {
            alert("Voice input is not supported in this browser. Please use Chrome or Edge.");
            return;
        }

        const recognition = new SpeechRecognition();
        recognition.lang = 'en-US';
        recognition.continuous = true;
        recognition.interimResults = true;

        recognition.onstart = () => {
            setIsListening(true);
            setResponse("Listening... (Speak naturally, I will wait for a pause)");
            setInput('');
        };

        recognition.onresult = (event: any) => {
            let finalTranscript = '';
            // Build the final transcript
            for (let i = event.resultIndex; i < event.results.length; ++i) {
                if (event.results[i].isFinal) {
                    finalTranscript += event.results[i][0].transcript;
                }
            }

            // Get the live interim result for the input box
            const interimObj = event.results[event.results.length - 1];
            const currentText = interimObj[0].transcript;

            // Prefer final transcript if available, otherwise show interim
            const displayText = finalTranscript || currentText;
            setInput(displayText);

            // SILENCE TIMER LOGIC
            if (silenceTimer.current) clearTimeout(silenceTimer.current);

            // Wait 2.5 seconds of silence before submitting
            silenceTimer.current = setTimeout(() => {
                recognition.stop();
                if (displayText.trim().length > 0) {
                    processQuery(displayText);
                }
            }, 2500);
        };

        recognition.onend = () => {
            setIsListening(false);
            if (silenceTimer.current) clearTimeout(silenceTimer.current);
        };

        recognition.onerror = (event: any) => {
            console.error("Speech Error:", event.error);
            setIsListening(false);
        };

        recognitionRef.current = recognition;
        recognition.start();
    };

    const stopListening = () => {
        if (recognitionRef.current) recognitionRef.current.stop();
        if (silenceTimer.current) clearTimeout(silenceTimer.current);
        setIsListening(false);
    };


    // --- LOGIC: MAIN QUERY PROCESSOR ---
    const [activeNode, setActiveNode] = useState<ActiveNode>('IDLE');

    const processQuery = async (queryText: string) => {
        if (!queryText || !queryText.trim()) return;

        const tool = determineTool(queryText);
        setActiveNode('USER_INPUT');
        setTimeout(() => setActiveNode('ROUTER'), 400);
        setTimeout(() => setActiveNode(tool), 1000);

        setIsLoading(true);
        setResponse(null);

        // 1. Intent Check
        const navigated = processIntent(queryText);
        if (navigated) {
            setIsLoading(false);
            const navMsg = "Command Acknowledged. Navigating to Projects Database.";
            setResponse(navMsg);
            playAudioResponse(navMsg);
            setTimeout(() => setActiveNode('IDLE'), 3000);
            return;
        }

        // 2. Backend Call
        const API_URL = import.meta.env.VITE_API_URL || "http://localhost:8000";

        try {
            const apiResponse = await fetch(`${API_URL}/chat`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ message: queryText, session_id: "guest_browser" }),
            });

            if (!apiResponse.ok) throw new Error(`Server Error: ${apiResponse.status}`);

            const data = await apiResponse.json();
            setResponse(data.response);

            // Play Audio (Ref check handles the mute state)
            playAudioResponse(data.response);

        } catch (error) {
            console.error("Brain Connection Failed:", error);
            setResponse("⚠️ ERROR: Neural Link Offline. Please check backend connection.");
        } finally {
            setIsLoading(false);
            if (!isAudioOnRef.current) setTimeout(() => setActiveNode('IDLE'), 5000);
        }
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        processQuery(input);
    };

    // --- LOGIC: FILE UPLOAD (JD) ---
    const handleFileUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files?.[0];
        if (!file) return;

        setResponse("Analyzing Job Description... Reading file...");
        setIsLoading(true);

        const formData = new FormData();
        formData.append("file", file);

        const API_URL = import.meta.env.VITE_API_URL || "http://localhost:8000";

        try {
            const res = await fetch(`${API_URL}/analyze_jd`, {
                method: "POST",
                body: formData,
            });

            const data = await res.json();
            setResponse(data.response);
            playAudioResponse(data.response);

        } catch (error) {
            console.error(error);
            setResponse("⚠️ Error reading file. Please ensure the Backend is running.");
        } finally {
            setIsLoading(false);
            if (fileInputRef.current) fileInputRef.current.value = '';
        }
    };

    return (
        <section className="relative w-full border-b-3 border-black flex flex-col lg:flex-row">

            {/* LEFT COLUMN (75%) */}
            <div className="w-full lg:w-[75%] flex flex-col justify-start px-6 py-6 lg:px-14 lg:py-6 bg-white border-b-3 lg:border-b-0 lg:border-r-3 border-black z-10">
                <input type="file" ref={fileInputRef} onChange={handleFileUpload} accept=".pdf" style={{ display: 'none' }} />

                <div className="mb-6">
                    <h1 className="text-6xl md:text-7xl lg:text-8xl font-black tracking-tighter leading-[0.9] mb-3">
                        I AM SATISH'S<br />
                        <span className="text-transparent bg-clip-text bg-gradient-to-r from-black to-gray-400">AI AGENT.</span>
                    </h1>
                    <p className="text-sm md:text-base font-mono font-bold text-gray-500 max-w-4xl">
                        Upload a JD to check fit, ask me anything about his professional experience.
                    </p>
                </div>

                <div className="w-full max-w-5xl flex flex-col gap-4">

                    {/* BLOCK 1: CHAT INPUT */}
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
                                    placeholder={isListening ? "Listening... (Pause to submit)" : "Ask me about my experience..."}
                                    className="w-full h-full bg-transparent font-mono text-lg font-bold placeholder:text-gray-300 focus:outline-none border-none outline-none ring-0 pr-12"
                                />
                            </div>
                        </form>

                        {/* Voice Input Button */}
                        <button
                            onClick={handleMicClick}
                            className={`w-16 md:w-20 border-t-3 border-b-3 border-black border-l-3 lg:border-l-0 flex flex-col items-center justify-center gap-0.5 transition-all duration-100 cursor-pointer ${isListening ? 'bg-power text-white animate-pulse' : 'bg-black text-white hover:bg-gray-900'}`}
                            title="Speak to Satish"
                        >
                            {isListening ? <MicOff size={20} /> : <Mic size={20} strokeWidth={2.5} />}
                            <span className="font-mono text-[9px] font-bold">VOICE</span>
                        </button>

                        <button
                            onClick={handleSubmit}
                            className="h-full px-6 bg-black text-white font-black text-lg border-3 border-l-0 border-black hover:bg-power transition-colors uppercase flex items-center gap-2 tracking-tight"
                        >
                            {isLoading ? <Activity className="animate-spin" size={20} /> : "RUN ->"}
                        </button>
                    </div>

                    {/* BLOCK 2: TOOLS */}
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-3 relative z-20">
                        <ToolButton icon={FileText} label="UPLOAD JD" onClick={() => fileInputRef.current?.click()} />
                        <ToolButton icon={Briefcase} label="CASE STUDIES" onClick={() => onNavigateToProjects(null)} />
                        <ToolButton icon={Code} label="TECH STACK" onClick={() => {
                            const msg = "My Stack: Python, TensorFlow, React, Gemini API, Pinecone, FastAPI, Docker, Kubernetes.";
                            setResponse(msg);
                            playAudioResponse(msg);
                        }} />
                        <ToolButton icon={Download} label="RESUME" onClick={() => window.open('/Satish_R_Singh_Group_Lead_Data_Scientist.pdf', '_blank')} className="text-power border-power" />
                    </div>

                    {/* BLOCK 3: CONSOLE */}
                    <div className="flex flex-col mt-2">
                        <div className="w-full h-[250px] bg-black p-4 overflow-hidden relative flex flex-col shadow-hard border-3 border-black">
                            {response ? (
                                <div className="h-full flex flex-col animate-in fade-in duration-300">
                                    <div className="flex justify-between items-center mb-2 border-b border-gray-800 pb-1">
                                        <div className="flex items-center gap-2">
                                            <div className="w-1.5 h-1.5 bg-power animate-pulse" />
                                            <span className="text-power font-mono text-[10px] uppercase tracking-widest">INCOMING_TRANSMISSION</span>
                                        </div>
                                        <div className="flex items-center gap-4">
                                            {/* NEW SPEAKER BUTTON */}
                                            <button
                                                onClick={toggleAudio}
                                                className={`flex items-center gap-1 text-[10px] font-mono font-bold uppercase transition-colors ${isAudioOn ? 'text-power animate-pulse' : 'text-gray-500 hover:text-white'}`}
                                                title={isAudioOn ? "Mute Audio" : "Read Response"}
                                            >
                                                {isAudioOn ? <Volume2 size={14} /> : <VolumeX size={14} />}
                                                <span>{isAudioOn ? 'READING...' : 'READ'}</span>
                                            </button>
                                            <button onClick={() => setResponse(null)} className="text-[10px] font-mono font-bold text-gray-500 hover:text-white uppercase">[ CLEAR ]</button>
                                        </div>
                                    </div>
                                    <div className="flex-grow overflow-y-auto custom-scrollbar pr-2">
                                        <div className="font-mono text-sm leading-relaxed max-w-none text-gray-300">
                                            <ReactMarkdown components={{
                                                p: ({ node, ...props }) => <p className="mb-3 text-gray-300" {...props} />,
                                                strong: ({ node, ...props }) => <strong className="text-white font-bold" {...props} />,
                                                ul: ({ node, ...props }) => <ul className="list-disc pl-4 mb-3 text-gray-300" {...props} />,
                                                li: ({ node, ...props }) => <li className="mb-1" {...props} />,
                                                h1: ({ node, ...props }) => <h1 className="text-lg font-bold text-white mb-2 uppercase" {...props} />,
                                                h2: ({ node, ...props }) => <h2 className="text-base font-bold text-white mb-2 uppercase" {...props} />,
                                                code: ({ node, ...props }) => <code className="bg-gray-800 px-1 rounded text-power" {...props} />
                                            }}>{response}</ReactMarkdown>
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

            {/* RIGHT COLUMN (30%) */}
            <div className="w-full lg:w-[30%] bg-white flex flex-col justify-start p-6 lg:p-10 border-b-3 md:border-b-0 border-black">
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

const ToolButton: React.FC<{ icon: any; label: string; onClick: () => void; className?: string }> = ({ icon: Icon, label, onClick, className = '' }) => (
    <button
        onClick={onClick}
        className={`h-12 flex items-center justify-center gap-2 font-bold font-mono text-xs uppercase tracking-tight bg-white hover:bg-black hover:text-white transition-all border-3 border-black shadow-hard hover:shadow-none hover:translate-x-[2px] hover:translate-y-[2px] active:translate-x-[4px] active:translate-y-[4px] ${className}`}
    >
        <Icon size={14} strokeWidth={2.5} />
        <span className="whitespace-nowrap overflow-hidden text-ellipsis px-1">{label}</span>
    </button>
);