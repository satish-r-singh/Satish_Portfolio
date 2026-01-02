import React, { useState } from 'react';
import { Menu, X, Volume2, VolumeX } from 'lucide-react';

interface HeaderProps {
    isAudioEnabled: boolean;
    setIsAudioEnabled: (enabled: boolean) => void;
}

export const Header: React.FC<HeaderProps> = ({ isAudioEnabled, setIsAudioEnabled }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const navItems = ['ABOUT', 'PROJECTS', 'EXPERIENCE', 'SKILLS', 'CONTACT'];

  return (
    <header className="sticky top-0 z-50 w-full bg-white border-b-2 border-black">
      <div className="max-w-[1920px] mx-auto flex items-center justify-between h-16 md:h-20 px-4 md:px-0">
        
        {/* Logo Area */}
        <div className="flex items-center h-full px-4 md:px-8 md:border-r-2 md:border-black">
          <h1 className="font-mono text-xl md:text-2xl font-black tracking-tighter">
            ROHIT_SINGH_AI<span className="animate-pulse">_</span>
          </h1>
        </div>

        {/* Desktop Navigation & Controls */}
        <div className="flex items-center h-full">
            
            {/* Sound Toggle */}
            <button 
                onClick={() => setIsAudioEnabled(!isAudioEnabled)}
                className={`hidden md:flex items-center gap-2 h-full px-6 font-bold font-mono text-xs border-l-2 border-black transition-all ${isAudioEnabled ? 'bg-black text-power' : 'bg-white text-gray-400 hover:text-black'}`}
            >
                {isAudioEnabled ? <Volume2 size={16} /> : <VolumeX size={16} />}
                <span>[{isAudioEnabled ? 'SOUND_ON' : 'SOUND_OFF'}]</span>
            </button>

            {/* Nav Links */}
            <nav className="hidden md:flex h-full">
            {navItems.map((item) => (
                <a 
                key={item}
                href={`#${item.toLowerCase()}`}
                className="flex items-center px-6 lg:px-8 h-full font-bold border-l-2 border-black hover:bg-black hover:text-white transition-colors text-sm tracking-widest"
                >
                [{item}]
                </a>
            ))}
            </nav>
        </div>

        {/* Mobile Menu Button */}
        <button 
          className="md:hidden p-2 border-2 border-black active:bg-black active:text-white ml-auto"
          onClick={() => setIsMenuOpen(!isMenuOpen)}
        >
          {isMenuOpen ? <X /> : <Menu />}
        </button>

      </div>

      {/* Mobile Navigation Dropdown */}
      {isMenuOpen && (
        <div className="md:hidden border-t-2 border-black bg-white">
          <button 
                onClick={() => setIsAudioEnabled(!isAudioEnabled)}
                className="w-full flex items-center gap-2 p-4 font-bold border-b-2 border-black"
          >
             {isAudioEnabled ? <Volume2 size={16} /> : <VolumeX size={16} />}
             <span>[{isAudioEnabled ? 'SOUND_ON' : 'SOUND_OFF'}]</span>
          </button>
          {navItems.map((item) => (
            <a 
              key={item}
              href={`#${item.toLowerCase()}`}
              className="block p-4 font-bold border-b-2 border-black last:border-b-0 hover:bg-black hover:text-white"
              onClick={() => setIsMenuOpen(false)}
            >
              [{item}]
            </a>
          ))}
        </div>
      )}
    </header>
  );
};
