import React, { useState } from 'react';
import { X, Code, Cpu, MessageSquare, FileText, ExternalLink, Shield } from 'lucide-react';

// Define the interface here (or import it if you have a types file)
export interface Project {
    id: string;
    title: string;
    category: string;
    image: string;
    techStack: string[];
    summary: string;
    // Extended fields for the Modal
    challenge?: string;
    solution?: string;
    impact?: string;
}

interface ProjectModalProps {
    project: Project | null;
    isOpen: boolean;
    onClose: () => void;
}

export const ProjectModal: React.FC<ProjectModalProps> = ({ project, isOpen, onClose }) => {
    const [activeTab, setActiveTab] = useState<'brief' | 'architecture' | 'code'>('brief');

    if (!isOpen || !project) return null;

    return (
        <div className="fixed inset-0 z-[60] flex items-center justify-center p-4">
            {/* Backdrop */}
            <div
                className="absolute inset-0 bg-black/80 backdrop-blur-sm"
                onClick={onClose}
            />

            {/* The Dossier Card */}
            <div className="relative w-full max-w-4xl bg-white border-3 border-black shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] flex flex-col max-h-[90vh] animate-in fade-in zoom-in duration-300">

                {/* Header: "Classified" Style */}
                <div className="flex items-center justify-between p-4 border-b-3 border-black bg-gray-100">
                    <div className="flex items-center gap-3">
                        <div className="bg-power text-white font-mono text-xs font-bold px-2 py-1 uppercase tracking-widest">
                            CONFIDENTIAL
                        </div>
                        <h2 className="font-black text-xl uppercase tracking-tighter">
                            CASE_FILE: {project.title}
                        </h2>
                    </div>
                    <button
                        onClick={onClose}
                        className="p-2 hover:bg-black hover:text-white transition-colors border-2 border-transparent hover:border-black"
                    >
                        <X size={24} strokeWidth={3} />
                    </button>
                </div>

                {/* The Content Layout */}
                <div className="flex flex-col md:flex-row flex-grow overflow-hidden">

                    {/* Sidebar: Metadata */}
                    <div className="w-full md:w-1/3 bg-gray-50 border-b-3 md:border-b-0 md:border-r-3 border-black p-6 flex flex-col gap-6 overflow-y-auto">
                        <div className="aspect-video w-full border-3 border-black grayscale">
                            <img src={project.image} alt={project.title} className="w-full h-full object-cover" />
                        </div>

                        <div>
                            <h3 className="font-mono text-xs font-bold text-gray-500 uppercase mb-2">[ TECH_STACK ]</h3>
                            <div className="flex flex-wrap gap-2">
                                {project.techStack.map(tech => (
                                    <span key={tech} className="px-2 py-1 bg-white border-2 border-black font-mono text-xs font-bold">
                                        {tech}
                                    </span>
                                ))}
                            </div>
                        </div>

                        <div>
                            <h3 className="font-mono text-xs font-bold text-gray-500 uppercase mb-2">[ DOMAIN ]</h3>
                            <span className="font-bold text-lg">{project.category}</span>
                        </div>
                    </div>

                    {/* Main Content Area */}
                    <div className="w-full md:w-2/3 flex flex-col bg-white">

                        {/* Tabs */}
                        <div className="flex border-b-3 border-black">
                            <TabButton
                                active={activeTab === 'brief'}
                                onClick={() => setActiveTab('brief')}
                                icon={FileText}
                                label="MISSION BRIEF"
                            />
                            <TabButton
                                active={activeTab === 'architecture'}
                                onClick={() => setActiveTab('architecture')}
                                icon={Cpu}
                                label="SYSTEM ARCH"
                            />
                            <TabButton
                                active={activeTab === 'code'}
                                onClick={() => setActiveTab('code')}
                                icon={Code}
                                label="CODE"
                            />
                        </div>

                        {/* Tab Content */}
                        <div className="p-8 overflow-y-auto custom-scrollbar flex-grow">
                            {activeTab === 'brief' && (
                                <div className="space-y-6 animate-in fade-in slide-in-from-bottom-2 duration-300">
                                    <Section title="THE CHALLENGE" icon={Shield}>
                                        <p className="text-gray-700 leading-relaxed font-medium">
                                            {project.challenge || "Detailed problem statement loading... This section will describe the specific business pain points addressed by this solution."}
                                        </p>
                                    </Section>
                                    <Section title="THE SOLUTION" icon={Cpu}>
                                        <p className="text-gray-700 leading-relaxed font-medium">
                                            {project.solution || "Solution architecture loading... This section explains the AI implementation strategy."}
                                        </p>
                                    </Section>
                                    <Section title="IMPACT & ROI" icon={ExternalLink}>
                                        <p className="text-gray-700 leading-relaxed font-medium">
                                            {project.impact || "Result metrics loading... This section highlights the quantifiable efficiency gains."}
                                        </p>
                                    </Section>
                                </div>
                            )}

                            {activeTab === 'architecture' && (
                                <div className="h-full flex flex-col items-center justify-center text-center opacity-50">
                                    <Cpu size={48} className="mb-4" />
                                    <h3 className="font-black text-xl uppercase">Architecture Diagram</h3>
                                    <p className="font-mono text-sm mt-2">Interact with the "Live Architecture" on the home page to see this in action.</p>
                                </div>
                            )}

                            {activeTab === 'code' && (
                                <div className="bg-gray-900 p-4 rounded-lg border-2 border-black text-green-400 font-mono text-sm overflow-x-auto">
                                    <pre>{`# Example Implementation Logic
def retrieve_context(query):
    vector = embeddings.embed(query)
    matches = pinecone.query(vector, top_k=3)
    return format_context(matches)

# Note: Full source code available upon request.`}</pre>
                                </div>
                            )}
                        </div>

                        {/* Footer Action */}
                        <div className="p-4 border-t-3 border-black bg-gray-50 flex justify-end">
                            <button className="flex items-center gap-2 font-black uppercase hover:text-power transition-colors">
                                <MessageSquare size={18} />
                                <span>Ask AI Agent about this project_</span>
                            </button>
                        </div>

                    </div>
                </div>
            </div>
        </div>
    );
};

const TabButton = ({ active, onClick, icon: Icon, label }: any) => (
    <button
        onClick={onClick}
        className={`flex-1 py-4 flex items-center justify-center gap-2 font-black text-sm uppercase tracking-tight transition-all
        ${active ? 'bg-power text-white' : 'bg-white text-black hover:bg-gray-100'}
        ${active ? '' : 'border-r-3 border-black last:border-r-0'}
        `}
    >
        <Icon size={16} />
        {label}
    </button>
);

const Section = ({ title, icon: Icon, children }: any) => (
    <div>
        <div className="flex items-center gap-2 mb-2 text-power">
            <Icon size={18} />
            <h3 className="font-black text-sm uppercase tracking-widest">{title}</h3>
        </div>
        {children}
    </div>
);