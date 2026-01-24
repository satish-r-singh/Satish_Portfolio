import React, { useState, useMemo, useEffect } from 'react';
import { Filter, Terminal, ArrowUpRight, Layers } from 'lucide-react';
import { SectionDivider } from './SectionDivider';
import { ProjectModal } from './ProjectModal';
import { Project } from '../types'; // Importing Type from shared file
import { PROJECTS } from '../constants'; // <--- THE SINGLE SOURCE OF TRUTH

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

  // Categories for the filter buttons
  const categories = ['RAG', 'AGENTS', 'LLMOPS', 'XGBOOST', 'SQL', 'PYTHON', 'PANDAS', 'GAME THEORY', 'ARIMA', 'LANGCHAIN', 'YOLO'];

  // --- FILTERING LOGIC ---
  const { gridProjects, listProjects } = useMemo(() => {
    const lowerTerm = searchTerm ? searchTerm.toLowerCase() : '';

    // NOW FILTERING FROM THE IMPORTED 'PROJECTS' CONSTANT
    const filtered = PROJECTS.filter(p => {
      if (!lowerTerm) return true;

      // Safety check: ensure arrays exist before calling .some()
      const hasTech = p.techStack?.some(tag => tag.toLowerCase().includes(lowerTerm)) || false;

      return (
        hasTech ||
        (p.summary && p.summary.toLowerCase().includes(lowerTerm)) ||
        (p.title && p.title.toLowerCase().includes(lowerTerm)) ||
        (p.category && p.category.toLowerCase().includes(lowerTerm))
      );
    });

    return {
      gridProjects: filtered.slice(0, 6), // Top 6 are Cards
      listProjects: filtered.slice(6)     // Rest are List items
    };
  }, [searchTerm]);

  // --- HANDLERS ---
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

      {/* --- CONTROL PANEL --- */}
      <div className="w-full border-b-3 border-black bg-power p-6 flex flex-col xl:flex-row gap-6 items-start xl:items-center justify-between sticky top-0 z-30 shadow-md">

        {/* Filter Buttons */}
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

        {/* Search Bar */}
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
              className="w-full bg-black text-power font-mono font-bold text-sm p-3 pl-10 border-3 border-black placeholder:text-gray-500 focus:outline-none focus:ring-2 focus:ring-white/50"
            />
          </div>
        </div>
      </div>

      {/* --- MAIN CONTENT --- */}
      <div className="flex-grow p-6 md:p-12 bg-gray-50 flex flex-col">

        {/* --- SECTION 1: DEPLOYED UNITS (Grid) --- */}
        <div className="flex items-end justify-between mb-8 border-b-3 border-black pb-4">
          <h2 className="text-3xl md:text-5xl font-black uppercase tracking-tighter">
            DEPLOYED_UNITS
          </h2>
        </div>

        {/* Grid Render */}
        {gridProjects.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-16">
            {gridProjects.map((project) => (
              <div
                key={project.id}
                className="group relative flex flex-col border-3 border-black bg-white transition-all duration-200 hover:shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] hover:-translate-y-1 cursor-pointer"
                onClick={() => setSelectedProject(project)}
              >
                {/* Image */}
                <div className="w-full h-48 border-b-3 border-black overflow-hidden bg-gray-200 relative">
                  {project.image ? (
                    <img src={project.image} alt={project.title} className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-500" />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center bg-gray-100 group-hover:bg-gray-200 transition-colors">
                      <Layers size={48} className="text-gray-300 group-hover:text-gray-400" />
                    </div>
                  )}
                  <div className="absolute top-2 right-2 bg-black text-white px-2 py-1 font-mono text-[10px] font-bold">
                    {project.year}
                  </div>
                </div>

                {/* Content */}
                <div className="p-5 flex flex-col flex-grow">
                  <h3 className="text-xl font-black mb-3 leading-tight uppercase font-mono truncate group-hover:text-power transition-colors" title={project.title}>
                    {project.title}
                  </h3>
                  <div className="flex flex-wrap gap-2 mb-4">
                    {project.techStack.slice(0, 3).map((tag) => (
                      <span key={tag} className="px-1.5 py-0.5 text-[10px] font-mono font-bold border border-black bg-gray-100 uppercase">
                        {tag}
                      </span>
                    ))}
                  </div>
                  <p className="font-mono text-xs text-gray-600 mb-6 flex-grow leading-relaxed line-clamp-3">
                    {project.summary}
                  </p>
                  <div className="w-full border-2 border-black py-2 flex items-center justify-center gap-2 font-mono text-xs font-bold uppercase group-hover:bg-black group-hover:text-white transition-all">
                    <span>VIEW CASE STUDY</span>
                    <ArrowUpRight size={14} />
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="w-full p-12 border-3 border-black border-dashed bg-white text-center font-mono text-gray-400 mb-12">
            NO_DEPLOYED_UNITS_FOUND_FOR_QUERY "{searchTerm}"
          </div>
        )}

        {/* --- SECTION 2: OLDER REPOS (List) --- */}
        {listProjects.length > 0 && (
          <div className="w-full">
            <div className="flex items-center gap-3 mb-4">
              <p className="font-mono text-xs font-bold text-gray-400 hidden md:block">
                {'>'} SELECT * FROM OLDER_REPOS WHERE STATUS='ARCHIVED'
              </p>
            </div>

            <div className="w-full border-3 border-black bg-white">
              <div className="hidden md:grid grid-cols-12 gap-4 py-3 border-b-3 border-black bg-gray-100 font-mono text-xs font-bold text-gray-500 px-6 uppercase">
                <div className="col-span-2">DATE</div>
                <div className="col-span-4">PROJECT_ID</div>
                <div className="col-span-5">TECH_STACK</div>
                <div className="col-span-1 text-right">ACTION</div>
              </div>
              <div className="flex flex-col divide-y-2 divide-gray-100">
                {listProjects.map((project) => (
                  <div
                    key={project.id}
                    onClick={() => setSelectedProject(project)}
                    className="group relative grid grid-cols-1 md:grid-cols-12 gap-2 md:gap-4 py-4 px-6 hover:bg-yellow-50 transition-colors items-start md:items-center cursor-pointer"
                  >
                    {/* DATE */}
                    <div className="col-span-2 font-mono text-xs font-bold text-gray-400 md:text-gray-500 mb-1 md:mb-0">
                      {project.year}
                    </div>

                    {/* TITLE */}
                    <div className="col-span-4 font-black text-sm uppercase text-black group-hover:text-power transition-colors truncate pr-8 md:pr-0">
                      {project.title}
                    </div>

                    {/* TECH STACK */}
                    <div className="col-span-5 flex flex-wrap gap-2 mt-2 md:mt-0">
                      {project.techStack.slice(0, 4).map((tag: string) => (
                        <span key={tag} className="text-[10px] font-mono border border-gray-200 bg-gray-50 px-1.5 py-0.5 text-gray-600 group-hover:border-black group-hover:bg-white transition-colors uppercase">
                          {tag}
                        </span>
                      ))}
                    </div>

                    {/* ARROW */}
                    <div className="absolute top-4 right-4 md:static md:col-span-1 md:flex md:justify-end">
                      <div className="p-1 border border-transparent group-hover:border-black group-hover:bg-white rounded-none transition-all">
                        <ArrowUpRight size={18} className="text-gray-300 group-hover:text-black md:w-5 md:h-5" />
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}
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