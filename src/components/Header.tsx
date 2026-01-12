import React, { useState } from 'react';

interface HeaderProps { }

export const Header: React.FC<HeaderProps> = () => {
  // State to toggle mobile menu
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const navItems = [
    { label: '[ABOUT]', id: 'about' },
    { label: '[PROJECTS]', id: 'projects' },
    { label: '[EXPERIENCE]', id: 'experience' },
    { label: '[SKILLS]', id: 'skills' },
    { label: '[CONTACT]', id: 'contact' },
  ];

  const scrollToSection = (id: string) => {
    setIsMenuOpen(false); // Close menu when clicking an item
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <>
      {/* --- THE MAIN HEADER BAR (High Z-Index) --- */}
      <header className="sticky top-0 z-[999] w-full bg-white border-b-3 border-black flex h-14 relative">

        {/* 1. LOGO SECTION */}
        <div className="flex-grow flex items-center px-4 lg:px-6 border-r-3 border-black bg-white z-20">
          <span className="font-black text-lg md:text-xl tracking-tighter uppercase">
            SATISH_ROHIT_SINGH<span className="animate-blink-bw">_</span>
          </span>
        </div>

        {/* 2. NAVIGATION (Desktop) */}
        <nav className="hidden lg:flex h-full">
          {navItems.map((item) => (
            <button
              key={item.id}
              onClick={() => scrollToSection(item.id)}
              className="h-full px-6 flex items-center justify-center border-r-3 border-black last:border-r-0 hover:bg-power hover:text-white transition-all font-mono text-[10px] font-bold uppercase tracking-widest"
            >
              {item.label}
            </button>
          ))}
        </nav>

        {/* 3. MOBILE MENU TRIGGER */}
        <button
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          className="lg:hidden flex items-center justify-center px-6 hover:bg-black hover:text-white cursor-pointer border-l-3 border-black lg:border-none transition-colors z-20 bg-white"
        >
          <span className="font-mono text-xs font-bold">
            {isMenuOpen ? '[CLOSE]' : '[MENU]'}
          </span>
        </button>

      </header>

      {/* --- MOBILE DROPDOWN (Maximum Z-Index) --- */}
      {isMenuOpen && (
        <div className="fixed top-14 left-0 w-full bg-white border-b-3 border-black shadow-[0_10px_20px_rgba(0,0,0,0.5)] z-[9999] lg:hidden animate-in slide-in-from-top-2 duration-200">
          <div className="flex flex-col">
            {navItems.map((item) => (
              <button
                key={item.id}
                onClick={() => scrollToSection(item.id)}
                className="w-full text-left px-6 py-4 font-mono text-sm font-bold uppercase border-b border-gray-200 hover:bg-power hover:text-white transition-colors last:border-b-0"
              >
                {item.label}
              </button>
            ))}
          </div>
        </div>
      )}
    </>
  );
};