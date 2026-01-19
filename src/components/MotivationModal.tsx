import React from 'react';
import { X, Heart, Target, Lightbulb, Rocket, MessageSquare, Sparkles } from 'lucide-react';

interface MotivationModalProps {
    isOpen: boolean;
    onClose: () => void;
}

export const MotivationModal: React.FC<MotivationModalProps> = ({ isOpen, onClose }) => {
    if (!isOpen) return null;

    const motivations = [
        {
            icon: Target,
            title: "BEYOND_THE_RESUME",
            content: "Traditional resumes and portfolios feel static—just bullet points and project lists. I wanted to create something that actually demonstrates my capabilities in real-time, not just describes them."
        },
        {
            icon: MessageSquare,
            title: "SHOW_DONT_TELL",
            content: "Instead of saying 'I build AI systems,' I built an AI system that you can interact with right now. This page IS the proof of concept—a living, breathing demonstration of RAG architecture, multimodal AI, and modern web development."
        },
        {
            icon: Lightbulb,
            title: "BRIDGING_THE_GAP",
            content: "There's often a disconnect between what candidates claim and what they can actually deliver. This interactive experience bridges that gap by letting you experience my work firsthand—ask questions, upload a JD, hear the AI speak."
        },
        {
            icon: Rocket,
            title: "TECHNICAL_SHOWCASE",
            content: "Every component here reflects production-grade thinking: FastAPI backend with proper error handling, Pinecone vector database for semantic search, Gemini 2.5 for reasoning, and a carefully crafted neobrutalist UI. It's not just a demo—it's architecture I'd deploy at scale."
        },
        {
            icon: Sparkles,
            title: "STANDING_OUT",
            content: "In a sea of PDF resumes and LinkedIn profiles, I wanted to create something memorable. Something that makes you think, 'This person doesn't just talk about AI—they build with it.'"
        },
        {
            icon: Heart,
            title: "PASSION_PROJECT",
            content: "Ultimately, this page exists because I genuinely love what I do. Building AI systems that feel magical, crafting interfaces that delight users, solving complex technical challenges—this portfolio is an expression of that passion."
        }
    ];

    return (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-in fade-in duration-200">
            <div className="w-full max-w-4xl bg-white border-3 border-black shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] max-h-[90vh] overflow-hidden relative flex flex-col">

                {/* HEADER - Reversed styling (white on black instead of black on white) */}
                <div className="flex items-center justify-between p-6 border-b-3 border-black bg-white text-black shrink-0">
                    <div>
                        <h2 className="font-black text-2xl md:text-3xl uppercase tracking-tighter flex items-center gap-3">
                            <Heart className="text-power" />
                            THE_MOTIVATION
                        </h2>
                        <p className="font-mono text-xs text-gray-500 mt-1">
              // WHY THIS PAGE EXISTS
                        </p>
                    </div>
                    <button
                        onClick={onClose}
                        className="p-2 border-2 border-black bg-white text-black hover:bg-black hover:text-white hover:scale-110 transition-all duration-200"
                    >
                        <X size={24} strokeWidth={3} />
                    </button>
                </div>

                {/* CONTENT BODY (Scrollable) */}
                <div className="overflow-y-auto custom-scrollbar bg-black flex-grow p-6 md:p-10">

                    {/* Intro Section */}
                    <div className="mb-8 border-l-4 border-power pl-6">
                        <p className="font-mono text-lg md:text-xl text-white leading-relaxed">
                            This isn't just a portfolio. It's a <span className="text-power font-bold">statement</span>.
                        </p>
                        <p className="font-mono text-sm text-gray-400 mt-2">
                            Here's why I built it this way.
                        </p>
                    </div>

                    {/* Motivation Cards */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
                        {motivations.map((item, idx) => (
                            <div
                                key={idx}
                                className="p-5 border-2 border-gray-700 bg-gray-900 hover:border-power hover:translate-x-1 hover:shadow-[4px_4px_0px_0px_rgba(255,107,107,0.3)] transition-all group"
                            >
                                <div className="flex items-center gap-3 mb-3">
                                    <div className="p-2 bg-black border border-gray-600 text-gray-400 group-hover:bg-power group-hover:text-white group-hover:border-power transition-colors">
                                        <item.icon size={18} />
                                    </div>
                                    <h3 className="font-mono font-bold text-sm text-power uppercase tracking-wider">
                                        [{item.title}]
                                    </h3>
                                </div>
                                <p className="font-mono text-sm text-gray-300 leading-relaxed">
                                    {item.content}
                                </p>
                            </div>
                        ))}
                    </div>

                    {/* Footer Quote */}
                    <div className="mt-10 pt-6 border-t-2 border-dashed border-gray-700">
                        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
                            <p className="font-mono text-xs text-gray-500 max-w-2xl leading-relaxed italic">
                                "The best way to predict the future is to invent it." — Alan Kay
                            </p>
                            <div className="flex items-center gap-2 px-4 py-2 border-2 border-power bg-power/10 shrink-0">
                                <div className="w-2 h-2 bg-power rounded-full animate-pulse"></div>
                                <span className="font-mono text-xs font-bold text-power">BUILT_WITH_INTENTION</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};
