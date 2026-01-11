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
        <div className="fixed inset-0 z-[60] flex items-center justify-center p-4">
            {/* Backdrop */}
            <div
                className="absolute inset-0 bg-black/80 backdrop-blur-sm"
                onClick={onClose}
            />

            {/* The Modal Card */}
            <div className="relative w-full max-w-4xl bg-white border-3 border-black shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] flex flex-col max-h-[90vh] animate-in fade-in zoom-in duration-300">

                {/* Header: Cleaned up, removed Confidential tag */}
                <div className="flex items-center justify-between p-4 border-b-3 border-black bg-gray-100">
                    <div className="flex items-center gap-3">
                        <h2 className="font-black text-xl uppercase tracking-tighter truncate max-w-[250px] md:max-w-md">
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

                    {/* Left Sidebar: Image & Domain Only */}
                    <div className="w-full md:w-1/3 bg-gray-50 border-b-3 md:border-b-0 md:border-r-3 border-black p-6 flex flex-col gap-6 overflow-y-auto">

                        {/* Image */}
                        <div className="aspect-video w-full border-3 border-black grayscale bg-white flex items-center justify-center overflow-hidden relative">
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
                            <span className="font-bold text-lg bg-black text-white px-2 py-1">
                                {project.category}
                            </span>
                        </div>
                    </div>

                    {/* Main Content Area */}
                    <div className="w-full md:w-2/3 flex flex-col bg-white">

                        {/* Tabs */}
                        <div className="flex border-b-3 border-black overflow-x-auto">
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

                        {/* Tab Content */}
                        <div className="p-8 overflow-y-auto custom-scrollbar flex-grow">

                            {/* TAB 1: MISSION BRIEF */}
                            {activeTab === 'brief' && (
                                <div className="space-y-8 animate-in fade-in slide-in-from-bottom-2 duration-300">
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
                                <div className="animate-in fade-in slide-in-from-bottom-2 duration-300">
                                    <div className="mb-6">
                                        <p className="font-mono text-sm text-gray-500 mb-4">
                                            // TECHNOLOGIES DEPLOYED IN THIS UNIT
                                        </p>
                                        <div className="flex flex-wrap gap-3">
                                            {project.techStack.map(tech => (
                                                <div key={tech} className="flex items-center gap-2 px-3 py-2 bg-white border-2 border-black shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] hover:translate-x-1 hover:shadow-none transition-all">
                                                    <div className="w-2 h-2 bg-power rounded-full"></div>
                                                    <span className="font-mono text-sm font-bold uppercase">{tech}</span>
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
        className={`flex-1 py-4 flex items-center justify-center gap-2 font-black text-xs md:text-sm uppercase tracking-tight transition-all min-w-[120px]
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
        <div className="flex items-center gap-2 mb-3 text-power">
            <Icon size={18} />
            <h3 className="font-black text-sm uppercase tracking-widest">{title}</h3>
        </div>
        {children}
    </div>
);