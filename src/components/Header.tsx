import React from 'react';

// REMOVED: Audio props are no longer needed here
interface HeaderProps { }

export const Header: React.FC<HeaderProps> = () => {

  const navItems = [
    { label: '[ABOUT]', id: 'about' },
    { label: '[PROJECTS]', id: 'projects' },
    { label: '[EXPERIENCE]', id: 'experience' },
    { label: '[SKILLS]', id: 'skills' },
    { label: '[CONTACT]', id: 'contact' },
  ];

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    // Fixed height h-14 (56px)
    <header className="sticky top-0 z-50 w-full bg-white border-b-3 border-black flex h-14">

      {/* 1. LOGO SECTION - Left aligned (Grows to fill space) */}
      <div className="flex-grow flex items-center px-4 lg:px-6 border-r-3 border-black bg-white">
        <span className="font-black text-lg md:text-xl tracking-tighter uppercase">
          SATISH_ROHIT_SINGH<span className="animate-blink-bw">_</span>
        </span>
      </div>

      {/* 2. NAVIGATION - Right aligned */}
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

      {/* Mobile Menu Trigger */}
      <div className="lg:hidden flex items-center justify-center px-4 hover:bg-black hover:text-white cursor-pointer border-l-3 border-black lg:border-none">
        <span className="font-mono text-xs font-bold">[MENU]</span>
      </div>

    </header>
  );
};