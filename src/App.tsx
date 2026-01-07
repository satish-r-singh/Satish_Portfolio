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

  // We keep this state to set the INITIAL value for Hero, 
  // but we don't need to pass the setter around anymore.
  // Default is false (Sound Off)
  const [isAudioEnabled] = useState(false);

  // Create a ref for the projects section for scrolling
  const projectsSectionRef = useRef<HTMLDivElement>(null);

  const handleNavigateToProjects = (filter: string | null) => {
    setProjectFilter(filter);
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

      {/* UPDATED: No props needed for Header anymore */}
      <Header />

      <Marquee />

      <main>
        {/* UPDATED: Hero receives the initial state, but manages toggling internally */}
        <Hero
          onNavigateToProjects={handleNavigateToProjects}
          isAudioEnabled={isAudioEnabled}
        />

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