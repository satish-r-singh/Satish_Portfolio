import React, { useState, useEffect } from 'react';
import { PROJECTS, ARCHIVE_PROJECTS } from '../constants';
import { Button } from './Button';
import { Filter, Search, Terminal, ArrowUpRight } from 'lucide-react';
import { SectionDivider } from './SectionDivider';

interface ProjectGridProps {
  filter: string | null;
  setFilter: (filter: string | null) => void;
}

export const ProjectGrid: React.FC<ProjectGridProps> = ({ filter, setFilter }) => {
  const [searchTerm, setSearchTerm] = useState(filter || '');

  // Sync internal state if the parent filter changes (e.g. from Hero AI)
  useEffect(() => {
    setSearchTerm(filter || '');
  }, [filter]);

  const categories = ['RAG', 'Agents', 'Data Eng', 'ML Ops'];

  const filteredProjects = searchTerm
    ? PROJECTS.filter(p => 
        p.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase())) || 
        p.description.toLowerCase().includes(searchTerm.toLowerCase()) || 
        p.title.toLowerCase().includes(searchTerm.toLowerCase())
      )
    : PROJECTS;

  const handlePresetClick = (category: string) => {
    if (searchTerm === category) {
      setSearchTerm('');
      setFilter(null);
    } else {
      setSearchTerm(category);
      setFilter(category);
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = e.target.value;
    setSearchTerm(val);
    setFilter(val === '' ? null : val);
  };

  return (
    <section id="projects" className="w-full border-b-3 border-black bg-white flex flex-col pt-12">
      <SectionDivider title="[ PROJECT_DATABASE ]" />
      
      <div className="flex flex-col md:flex-row flex-grow">
          {/* Left Sidebar: The Orange Control Panel */}
          <div className="w-full md:w-72 border-b-3 md:border-b-0 md:border-r-3 border-black bg-power p-6 flex-shrink-0 flex flex-col gap-8">
             
             {/* Sidebar Header */}
             <div className="flex items-center gap-2 border-b-3 border-black pb-2">
                <Filter size={20} className="text-black" />
                <h3 className="font-black text-xl uppercase tracking-tighter">CONTROL_PANEL</h3>
             </div>
             
             {/* A. Preset Protocols */}
             <div>
                <h4 className="font-bold text-xs uppercase mb-3 tracking-widest">PRIMARY_PROTOCOLS</h4>
                <div className="flex flex-col gap-3">
                    <button 
                        onClick={() => { setSearchTerm(''); setFilter(null); }}
                        className={`w-full text-left font-mono font-bold text-sm uppercase p-3 border-3 border-black transition-all ${!searchTerm ? 'bg-black text-white' : 'bg-white text-black hover:bg-black hover:text-white'}`}
                    >
                        [VIEW_ALL]
                    </button>
                    {categories.map(cat => (
                        <button 
                            key={cat}
                            onClick={() => handlePresetClick(cat)}
                            className={`w-full text-left font-mono font-bold text-sm uppercase p-3 border-3 border-black transition-all ${searchTerm === cat ? 'bg-black text-white' : 'bg-white text-black hover:bg-black hover:text-white'}`}
                        >
                            [{cat.toUpperCase()}]
                        </button>
                    ))}
                </div>
             </div>

             {/* B. Command Line Filter */}
             <div>
                <h4 className="font-bold text-xs uppercase mb-3 tracking-widest">CUSTOM_QUERY</h4>
                <div className="relative group">
                    <div className="absolute top-3 left-3 text-power pointer-events-none z-10">
                        <Terminal size={16} />
                    </div>
                    <input 
                        type="text" 
                        value={searchTerm}
                        onChange={handleInputChange}
                        placeholder="> TYPE KEYWORD..."
                        className="w-full bg-black text-power font-mono font-bold text-sm p-3 pl-10 border-3 border-black placeholder:text-gray-600 focus:outline-none focus:ring-2 focus:ring-white/20 shadow-hard-sm"
                    />
                </div>
             </div>
             
             {/* C. System Notice */}
             <div className="mt-auto p-4 border-3 border-black bg-white shadow-hard-sm">
                <p className="font-mono text-xs font-bold leading-tight">
                    ⚠️ SYSTEM NOTICE:<br/>
                    Database contains 3 active enterprise-grade deployments. Access is restricted to authorized personnel.
                </p>
             </div>
          </div>

          {/* Right Content: Grid & Archive */}
          <div className="flex-grow p-6 md:p-12 lg:p-16 bg-gray-50 flex flex-col">
            
            {/* 1. HERO PROJECTS GRID */}
            <div className="flex items-end justify-between mb-12 border-b-3 border-black pb-4">
              <h2 className="text-4xl md:text-5xl font-black uppercase tracking-tighter">
                DEPLOYED_UNITS
              </h2>
              <span className="hidden md:block font-mono font-bold text-xl">[COUNT: {filteredProjects.length}]</span>
            </div>

            <div className="grid grid-cols-1 xl:grid-cols-2 gap-8 mb-24">
              {filteredProjects.map((project) => (
                <div key={project.id} className="group relative flex flex-col border-3 border-black bg-white transition-all duration-200 hover:bg-black hover:text-white shadow-hard hover:shadow-none hover:translate-x-1 hover:translate-y-1">
                  {/* Image Header */}
                  <div className="w-full aspect-[16/9] border-b-3 border-black overflow-hidden bg-gray-200">
                    <img 
                      src={project.imageUrl} 
                      alt={project.title}
                      className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-500"
                    />
                  </div>

                  {/* Content */}
                  <div className="p-6 flex flex-col flex-grow">
                    <h3 className="text-2xl font-black mb-4 leading-tight uppercase font-mono">{project.title}</h3>
                    
                    <div className="flex flex-wrap gap-2 mb-6">
                      {project.tags.map((tag) => (
                        <span key={tag} className="px-2 py-1 text-xs font-mono font-bold border-2 border-black bg-white text-black group-hover:border-white group-hover:bg-black group-hover:text-white">
                          {tag}
                        </span>
                      ))}
                    </div>

                    <p className="font-mono text-sm text-slate-body group-hover:text-gray-300 mb-8 flex-grow leading-relaxed">
                      {project.description}
                    </p>

                    <Button className="w-full group-hover:bg-white group-hover:text-black group-hover:border-white" icon>
                      VIEW CASE STUDY
                    </Button>
                  </div>
                </div>
              ))}

              {filteredProjects.length === 0 && (
                  <div className="col-span-full border-3 border-black bg-white p-12 text-center font-mono">
                      <div className="inline-block p-4 border-3 border-black bg-gray-100 mb-4">
                        <Search size={32} />
                      </div>
                      <p className="text-xl font-bold uppercase mb-2">NO_MATCHES_FOUND</p>
                      <p className="text-gray-500 font-mono text-sm">Query "{searchTerm}" returned 0 results.<br/>Try broadening your search parameters.</p>
                  </div>
              )}
            </div>

            {/* 2. THE PROJECT ARCHIVE (Tier 2 Display) */}
            <div className="w-full">
                <div className="font-mono text-xs md:text-sm font-bold text-gray-500 mb-4 border-b border-black pb-2">
                    {'>'} SELECT * FROM OLDER_REPOS WHERE STATUS='PUBLIC'
                </div>
                
                <div className="w-full border-t-2 border-black bg-white">
                    {/* Table Header */}
                    <div className="hidden md:grid grid-cols-12 gap-4 py-3 border-b border-gray-300 font-mono text-xs font-bold text-gray-500 px-4">
                        <div className="col-span-2">DATE</div>
                        <div className="col-span-4">PROJECT_ID</div>
                        <div className="col-span-5">TECH_STACK</div>
                        <div className="col-span-1 text-right">ACTION</div>
                    </div>

                    {/* Rows */}
                    <div className="flex flex-col">
                        {ARCHIVE_PROJECTS.map((repo, idx) => (
                            <a 
                                key={idx} 
                                href={repo.link}
                                className="group grid grid-cols-1 md:grid-cols-12 gap-2 md:gap-4 py-4 border-b border-gray-200 hover:bg-power transition-colors items-center px-4 relative"
                            >
                                {/* Date */}
                                <div className="col-span-2 font-mono text-xs font-bold text-gray-500 group-hover:text-black">
                                    {repo.date}
                                </div>
                                
                                {/* Project ID */}
                                <div className="col-span-4 font-black text-sm md:text-lg uppercase tracking-tight text-black group-hover:text-black">
                                    {repo.id}
                                </div>
                                
                                {/* Tech Stack */}
                                <div className="col-span-5 flex flex-wrap gap-2">
                                    {repo.stack.map(tag => (
                                        <span key={tag} className="text-[10px] font-mono border border-gray-300 bg-gray-50 px-1.5 py-0.5 text-gray-600 group-hover:border-black group-hover:bg-black group-hover:text-white transition-colors uppercase">
                                            {tag}
                                        </span>
                                    ))}
                                </div>
                                
                                {/* Action Icon */}
                                <div className="col-span-1 flex justify-end">
                                    <ArrowUpRight size={20} className="text-gray-400 group-hover:text-black group-hover:translate-x-1 group-hover:-translate-y-1 transition-all" />
                                </div>
                            </a>
                        ))}
                    </div>
                </div>
            </div>

          </div>
      </div>
    </section>
  );
};