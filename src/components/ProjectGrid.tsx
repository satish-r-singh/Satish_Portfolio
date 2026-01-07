import React, { useState, useEffect } from 'react';
import { PROJECTS, ARCHIVE_PROJECTS } from '../constants';
import { Button } from './Button';
import { Filter, Search, Terminal, ArrowUpRight } from 'lucide-react';
import { SectionDivider } from './SectionDivider';
import { ProjectModal, Project } from './ProjectModal';

interface ProjectGridProps {
  filter: string | null;
  setFilter: (filter: string | null) => void;
}

export const ProjectGrid: React.FC<ProjectGridProps> = ({ filter, setFilter }) => {
  const [searchTerm, setSearchTerm] = useState(filter || '');
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);

  useEffect(() => {
    setSearchTerm(filter || '');
  }, [filter]);

  const categories = ['RAG', 'Agents', 'Data Eng', 'ML Ops'];

  // Map Data safely
  const mappedProjects: Project[] = PROJECTS.map((p: any) => ({
    id: p.id ? p.id.toString() : Math.random().toString(36).substr(2, 9),
    title: p.title || "Untitled Project",
    category: (p.tags && p.tags.length > 0) ? p.tags[0] : 'General',
    image: p.imageUrl || "",
    techStack: p.tags || [],
    summary: p.description || "",
    challenge: p.challenge || "Recruiters spend <10s on portfolios. Static sites fail to demonstrate actual AI engineering capabilities.",
    solution: p.solution || "Built a full-stack RAG agent using Gemini 2.5 Flash. It ingests my resume/projects into Pinecone and answers questions contextually.",
    impact: p.impact || "Reduced 'time-to-understanding' for recruiters. Demonstrates full-stack AI capability live in the browser."
  }));

  const filteredProjects = searchTerm
    ? mappedProjects.filter(p =>
      p.techStack.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase())) ||
      p.summary.toLowerCase().includes(searchTerm.toLowerCase()) ||
      p.title.toLowerCase().includes(searchTerm.toLowerCase())
    )
    : mappedProjects;

  const handlePresetClick = (category: string) => {
    const newVal = searchTerm === category ? '' : category;
    setSearchTerm(newVal);
    setFilter(newVal || null);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = e.target.value;
    setSearchTerm(val);
    setFilter(val === '' ? null : val);
  };

  return (
    <section id="projects" className="w-full border-b-3 border-black bg-white flex flex-col pt-12">
      <SectionDivider title="[ PROJECT_DATABASE ]" />

      {/* --- TOP CONTROL PANEL (Horizontal Layout) --- */}
      <div className="w-full border-b-3 border-black bg-power p-6 flex flex-col xl:flex-row gap-6 items-start xl:items-center justify-between">

        {/* Left: Filter Buttons */}
        <div className="flex flex-col md:flex-row gap-4 items-start md:items-center w-full xl:w-auto">
          <div className="flex items-center gap-2 border-b-2 border-black pb-1 md:border-none md:pb-0">
            <Filter size={20} className="text-black" />
            <h3 className="font-black text-lg uppercase tracking-tighter whitespace-nowrap">PROTOCOLS:</h3>
          </div>

          <div className="flex flex-wrap gap-2 w-full">
            <button
              onClick={() => { setSearchTerm(''); setFilter(null); }}
              className={`px-4 py-2 font-mono font-bold text-xs uppercase border-3 border-black transition-all ${!searchTerm ? 'bg-black text-white' : 'bg-white text-black hover:bg-black hover:text-white'}`}
            >
              [ALL]
            </button>
            {categories.map(cat => (
              <button
                key={cat}
                onClick={() => handlePresetClick(cat)}
                className={`px-4 py-2 font-mono font-bold text-xs uppercase border-3 border-black transition-all ${searchTerm === cat ? 'bg-black text-white' : 'bg-white text-black hover:bg-black hover:text-white'}`}
              >
                [{cat}]
              </button>
            ))}
          </div>
        </div>

        {/* Right: Search Bar */}
        <div className="w-full xl:w-96">
          <div className="relative group">
            <div className="absolute top-3 left-3 text-power pointer-events-none z-10">
              <Terminal size={16} />
            </div>
            <input
              type="text"
              value={searchTerm}
              onChange={handleInputChange}
              placeholder="> SEARCH DATABASE..."
              className="w-full bg-black text-power font-mono font-bold text-sm p-3 pl-10 border-3 border-black placeholder:text-gray-500 focus:outline-none focus:ring-2 focus:ring-white/50 shadow-hard-sm"
            />
          </div>
        </div>
      </div>

      {/* --- MAIN CONTENT --- */}
      <div className="flex-grow p-6 md:p-12 bg-gray-50 flex flex-col">

        {/* Header */}
        <div className="flex items-end justify-between mb-8 border-b-3 border-black pb-4">
          <h2 className="text-4xl font-black uppercase tracking-tighter">
            DEPLOYED_UNITS
          </h2>
          <span className="font-mono font-bold text-lg">[COUNT: {filteredProjects.length}]</span>
        </div>

        {/* --- 3-COLUMN GRID --- */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-24">
          {filteredProjects.map((project) => (
            <div key={project.id} className="group relative flex flex-col border-3 border-black bg-white transition-all duration-200 hover:bg-black hover:text-white shadow-hard hover:shadow-none hover:translate-x-1 hover:translate-y-1">

              {/* Image Header (Banner Aspect) */}
              <div className="w-full h-40 border-b-3 border-black overflow-hidden bg-gray-200">
                <img
                  src={project.image}
                  alt={project.title}
                  className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-500 transform group-hover:scale-105"
                />
              </div>

              {/* Card Content */}
              <div className="p-5 flex flex-col flex-grow">
                <h3 className="text-xl font-black mb-3 leading-tight uppercase font-mono truncate" title={project.title}>
                  {project.title}
                </h3>

                <div className="flex flex-wrap gap-1 mb-4">
                  {project.techStack.slice(0, 3).map((tag) => (
                    <span key={tag} className="px-1.5 py-0.5 text-[10px] font-mono font-bold border-2 border-black bg-white text-black group-hover:border-white group-hover:bg-black group-hover:text-white">
                      {tag}
                    </span>
                  ))}
                </div>

                <p className="font-mono text-xs text-slate-body group-hover:text-gray-300 mb-6 flex-grow leading-relaxed line-clamp-3">
                  {project.summary}
                </p>

                <Button
                  onClick={() => setSelectedProject(project)}
                  className="w-full text-xs py-3 group-hover:bg-white group-hover:text-black group-hover:border-white"
                  icon
                >
                  VIEW CASE STUDY
                </Button>
              </div>
            </div>
          ))}
        </div>

        {/* Empty State */}
        {filteredProjects.length === 0 && (
          <div className="col-span-full border-3 border-black bg-white p-12 text-center font-mono">
            <div className="inline-block p-4 border-3 border-black bg-gray-100 mb-4">
              <Search size={32} />
            </div>
            <p className="text-xl font-bold uppercase mb-2">NO_MATCHES_FOUND</p>
            <p className="text-gray-500 font-mono text-sm">Query "{searchTerm}" returned 0 results.</p>
          </div>
        )}

        {/* --- ARCHIVE SECTION --- */}
        <div className="w-full">
          <div className="font-mono text-xs md:text-sm font-bold text-gray-500 mb-4 border-b border-black pb-2">
            {'>'} SELECT * FROM OLDER_REPOS WHERE STATUS='PUBLIC'
          </div>

          <div className="w-full border-t-2 border-black bg-white">
            <div className="hidden md:grid grid-cols-12 gap-4 py-3 border-b border-gray-300 font-mono text-xs font-bold text-gray-500 px-4">
              <div className="col-span-2">DATE</div>
              <div className="col-span-4">PROJECT_ID</div>
              <div className="col-span-5">TECH_STACK</div>
              <div className="col-span-1 text-right">ACTION</div>
            </div>

            <div className="flex flex-col">
              {ARCHIVE_PROJECTS.map((repo, idx) => (
                <a
                  key={idx}
                  href={repo.link}
                  className="group grid grid-cols-1 md:grid-cols-12 gap-2 md:gap-4 py-4 border-b border-gray-200 hover:bg-power transition-colors items-center px-4"
                >
                  <div className="col-span-2 font-mono text-xs font-bold text-gray-500 group-hover:text-black">{repo.date}</div>
                  <div className="col-span-4 font-black text-sm uppercase text-black">{repo.id}</div>
                  <div className="col-span-5 flex flex-wrap gap-2">
                    {repo.stack.map(tag => (
                      <span key={tag} className="text-[10px] font-mono border border-gray-300 bg-gray-50 px-1.5 py-0.5 text-gray-600 group-hover:border-black group-hover:bg-black group-hover:text-white transition-colors uppercase">
                        {tag}
                      </span>
                    ))}
                  </div>
                  <div className="col-span-1 flex justify-end">
                    <ArrowUpRight size={18} className="text-gray-400 group-hover:text-black" />
                  </div>
                </a>
              ))}
            </div>
          </div>
        </div>

      </div>

      {/* --- MODAL --- */}
      <ProjectModal
        isOpen={!!selectedProject}
        project={selectedProject}
        onClose={() => setSelectedProject(null)}
      />
    </section>
  );
};