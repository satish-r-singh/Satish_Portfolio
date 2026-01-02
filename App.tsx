import React, { useState, useRef } from 'react';
import { Header } from './components/Header';
import { Hero } from './components/Hero';
import { ProjectGrid } from './components/ProjectGrid';
import { ExperienceLog } from './components/ExperienceLog';
import { SkillsMatrix } from './components/SkillsMatrix';
import { CoreDirectives } from './components/CoreDirectives';
import { Footer } from './components/Footer';
import { Marquee } from './components/Marquee';

const App: React.FC = () => {
  const [projectFilter, setProjectFilter] = useState<string | null>(null);
  const [isAudioEnabled, setIsAudioEnabled] = useState(false);
  
  // Create a ref for the projects section for scrolling
  const projectsSectionRef = useRef<HTMLDivElement>(null);

  const handleNavigateToProjects = (filter: string | null) => {
      setProjectFilter(filter);
      // We need to wait a tick for the state to update or just scroll immediately
      setTimeout(() => {
        if (projectsSectionRef.current) {
            projectsSectionRef.current.scrollIntoView({ behavior: 'smooth' });
        } else {
             const element = document.getElementById('projects');
             if (element) element.scrollIntoView({ behavior: 'smooth' });
        }
      }, 100);
  };

  return (
    <div className="min-h-screen bg-white text-black font-sans selection:bg-power selection:text-white">
      <Header isAudioEnabled={isAudioEnabled} setIsAudioEnabled={setIsAudioEnabled} />
      <Marquee />
      <main>
        <Hero onNavigateToProjects={handleNavigateToProjects} isAudioEnabled={isAudioEnabled} />
        
        <CoreDirectives />

        <div ref={projectsSectionRef}>
             <ProjectGrid filter={projectFilter} setFilter={setProjectFilter} />
        </div>
        
        <ExperienceLog />
        <SkillsMatrix />
      </main>
      <Footer />
    </div>
  );
};

export default App;
