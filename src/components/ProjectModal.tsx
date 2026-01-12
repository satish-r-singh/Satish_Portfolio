import React, { useState } from 'react';
import { X, FileText, Layers, Shield, Cpu, ExternalLink, Image as ImageIcon } from 'lucide-react';

export interface Project {
    id: string;
    title: string;
    category: string;
    image: string;
    techStack: string[];
    summary: string;
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
    // New Tab State: 'brief' or 'stack'
    const [activeTab, setActiveTab] = useState<'brief' | 'stack'>('brief');

    if (!isOpen || !project) return null;

    return (
        <div className="fixed inset-0 z-[99999] flex items-center justify-center p-2 md:p-4">
            {/* Backdrop */}
            <div
                className="absolute inset-0 bg-black/80 backdrop-blur-sm"
                onClick={onClose}
            />

            {/* The Modal Card */}
            <div className="relative w-full max-w-5xl bg-white border-3 border-black shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] flex flex-col max-h-[90vh] md:h-[80vh] animate-in fade-in zoom-in duration-300">

                {/* HEADER: Responsive Text Size */}
                <div className="flex items-center justify-between p-3 md:p-4 border-b-3 border-black bg-gray-100 shrink-0">
                    <div className="flex items-center gap-3 overflow-hidden">
                        <h2 className="font-black text-sm md:text-xl uppercase tracking-tighter truncate">
                            CASE_FILE: {project.title}
                        </h2>
                    </div>
                    <button
                        onClick={onClose}
                        className="p-1 md:p-2 hover:bg-black hover:text-white transition-colors border-2 border-transparent hover:border-black shrink-0"
                    >
                        <X size={20} strokeWidth={3} className="md:w-6 md:h-6" />
                    </button>
                </div>

                {/* CONTENT LAYOUT: Scrollable Body on Mobile, Split Pane on Desktop */}
                <div className="flex flex-col md:flex-row flex-grow overflow-y-auto md:overflow-hidden">

                    {/* LEFT SIDEBAR: Image & Domain (Fixed Height on Mobile) */}
                    <div className="w-full md:w-1/3 bg-gray-50 border-b-3 md:border-b-0 md:border-r-3 border-black p-4 md:p-6 flex flex-col gap-4 md:gap-6 shrink-0 md:overflow-y-auto">

                        {/* Image - Forced Height on Mobile to prevent squashing */}
                        <div className="h-48 md:h-auto md:aspect-video w-full border-3 border-black grayscale bg-white flex items-center justify-center overflow-hidden relative shrink-0">
                            {project.image ? (
                                <img src={project.image} alt={project.title} className="w-full h-full object-cover" />
                            ) : (
                                <div className="flex flex-col items-center justify-center text-gray-300">
                                    <ImageIcon size={48} />
                                    <span className="font-mono text-xs mt-2">NO_IMG_DATA</span>
                                </div>
                            )}
                        </div>

                        {/* Domain Category */}
                        <div>
                            <h3 className="font-mono text-xs font-bold text-gray-500 uppercase mb-2">[ DOMAIN ]</h3>
                            <span className="font-bold text-sm md:text-lg bg-black text-white px-2 py-1 inline-block">
                                {project.category}
                            </span>
                        </div>
                    </div>

                    {/* RIGHT CONTENT: Tabs & Text */}
                    <div className="w-full md:w-2/3 flex flex-col bg-white h-full">

                        {/* Tabs (Sticky on Mobile so they don't scroll away immediately) */}
                        <div className="flex border-b-3 border-black sticky top-0 bg-white z-10 shrink-0">
                            <TabButton
                                active={activeTab === 'brief'}
                                onClick={() => setActiveTab('brief')}
                                icon={FileText}
                                label="MISSION BRIEF"
                            />
                            <TabButton
                                active={activeTab === 'stack'}
                                onClick={() => setActiveTab('stack')}
                                icon={Layers}
                                label="TECH STACK"
                            />
                        </div>

                        {/* Tab Content Area */}
                        <div className="p-6 md:p-8 md:overflow-y-auto custom-scrollbar flex-grow">

                            {/* TAB 1: MISSION BRIEF */}
                            {activeTab === 'brief' && (
                                <div className="space-y-8 animate-in fade-in slide-in-from-bottom-2 duration-300 pb-10">
                                    <Section title="THE CHALLENGE" icon={Shield}>
                                        <p className="text-gray-700 leading-relaxed font-medium text-sm md:text-base border-l-2 border-gray-200 pl-4">
                                            {project.challenge || "Standard implementation challenge involving data scale and processing latency."}
                                        </p>
                                    </Section>
                                    <Section title="THE SOLUTION" icon={Cpu}>
                                        <p className="text-gray-700 leading-relaxed font-medium text-sm md:text-base border-l-2 border-gray-200 pl-4">
                                            {project.solution || "Solution architecture deployed using the defined tech stack."}
                                        </p>
                                    </Section>
                                    <Section title="IMPACT & ROI" icon={ExternalLink}>
                                        <p className="text-gray-700 leading-relaxed font-medium text-sm md:text-base border-l-2 border-gray-200 pl-4">
                                            {project.impact || "Operational efficiency improvements and process automation."}
                                        </p>
                                    </Section>
                                </div>
                            )}

                            {/* TAB 2: TECH STACK */}
                            {activeTab === 'stack' && (
                                <div className="animate-in fade-in slide-in-from-bottom-2 duration-300 pb-10">
                                    <div className="mb-6">
                                        <p className="font-mono text-sm text-gray-500 mb-4">
                                            // TECHNOLOGIES DEPLOYED IN THIS UNIT
                                        </p>
                                        <div className="flex flex-wrap gap-3">
                                            {project.techStack.map(tech => (
                                                <div key={tech} className="flex items-center gap-2 px-3 py-2 bg-white border-2 border-black shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] hover:translate-x-1 hover:shadow-none transition-all">
                                                    <div className="w-2 h-2 bg-power rounded-full"></div>
                                                    <span className="font-mono text-xs md:text-sm font-bold uppercase">{tech}</span>
                                                </div>
                                            ))}
                                        </div>
                                    </div>

                                    <div className="p-4 bg-gray-50 border-2 border-dashed border-gray-300 font-mono text-xs text-gray-500">
                                        <p>dependency_check: passed</p>
                                        <p>build_status: stable</p>
                                        <p>integration: production_ready</p>
                                    </div>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

// Helper Components
const TabButton = ({ active, onClick, icon: Icon, label }: any) => (
    <button
        onClick={onClick}
        className={`flex-1 py-3 md:py-4 flex items-center justify-center gap-2 font-black text-[10px] md:text-sm uppercase tracking-tight transition-all min-w-[100px]
        ${active ? 'bg-power text-white' : 'bg-white text-black hover:bg-gray-100'}
        ${active ? '' : 'border-r-3 border-black last:border-r-0'}
        `}
    >
        <Icon size={14} className="md:w-4 md:h-4" />
        {label}
    </button>
);

const Section = ({ title, icon: Icon, children }: any) => (
    <div>
        <div className="flex items-center gap-2 mb-2 md:mb-3 text-power">
            <Icon size={16} className="md:w-[18px] md:h-[18px]" />
            <h3 className="font-black text-xs md:text-sm uppercase tracking-widest">{title}</h3>
        </div>
        {children}
    </div>
);