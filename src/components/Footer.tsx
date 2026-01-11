import React, { useState } from 'react';
import { Github, Linkedin, Mail, Calendar, ArrowUp, Terminal, MapPin } from 'lucide-react';

export const Footer: React.FC = () => {
  const [hoveredBox, setHoveredBox] = useState<string | null>(null);

  const links = [
    {
      id: 'email',
      label: 'EMAIL_PROTOCOL',
      value: 'satishk.singh@outlook.com',
      icon: Mail,
      href: 'mailto:satishk.singh@outlook.com'
    },
    {
      id: 'linkedin',
      label: 'LINKEDIN_FEED',
      value: '/in/satish-r-singh',
      icon: Linkedin,
      href: 'https://www.linkedin.com/in/satish-r-singh/'
    },
    {
      id: 'github',
      label: 'GITHUB_REPOS',
      value: '/satish-r-singh',
      icon: Github,
      href: 'https://github.com/satish-r-singh'
    },
    {
      id: 'calendly',
      label: 'CALENDLY_SYNC',
      value: 'Schedule_Meeting',
      icon: Calendar,
      href: 'https://calendly.com/satish-r-singh'
    },
  ];

  return (
    <footer id="contact" className="w-full bg-black text-white pt-24 pb-12 border-t-4 border-white relative overflow-hidden">

      {/* Background Grid Effect */}
      <div className="absolute inset-0 opacity-10 pointer-events-none"
        style={{ backgroundImage: 'linear-gradient(#333 1px, transparent 1px), linear-gradient(90deg, #333 1px, transparent 1px)', backgroundSize: '40px 40px' }}>
      </div>

      <div className="max-w-[1920px] mx-auto px-6 md:px-12 relative z-10">

        {/* --- HEADER --- */}
        <div className="mb-20 text-center">
          <h2 className="text-4xl md:text-6xl lg:text-8xl font-black uppercase tracking-tighter mb-6 leading-none text-white glitch-effect">
            CONNECTION_TERMINATED
          </h2>
          <div className="inline-flex items-center gap-3 px-4 py-2 border border-white/30 bg-white/5">
            <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></span>
            <p className="font-mono text-sm md:text-base text-gray-300 tracking-widest">
              // INITIATE_HUMAN_HANDSHAKE_PROTOCOL
            </p>
          </div>
        </div>

        {/* --- CONTACT GRID --- */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-20">
          {links.map((link) => {
            const isMail = link.href.startsWith('mailto');
            const isHovered = hoveredBox === link.id;

            return (
              <a
                key={link.id}
                href={link.href}
                target={isMail ? undefined : "_blank"}
                rel={isMail ? undefined : "noopener noreferrer"}
                onMouseEnter={() => setHoveredBox(link.id)}
                onMouseLeave={() => setHoveredBox(null)}
                className="group relative h-48 border-2 border-white/20 bg-black hover:bg-white hover:text-black transition-all duration-300 flex flex-col items-center justify-center overflow-hidden cursor-pointer"
              >
                {/* Tech Corners */}
                <div className="absolute top-2 left-2 w-2 h-2 border-t-2 border-l-2 border-white/50 group-hover:border-black transition-colors"></div>
                <div className="absolute bottom-2 right-2 w-2 h-2 border-b-2 border-r-2 border-white/50 group-hover:border-black transition-colors"></div>

                {/* Icon Animation */}
                <link.icon
                  size={40}
                  strokeWidth={1.5}
                  className={`transition-all duration-500 ease-out mb-4 ${isHovered ? 'scale-110 -translate-y-2' : 'scale-100'}`}
                />

                {/* Text Swap Animation */}
                <div className="relative w-full h-6 overflow-hidden text-center">
                  <span className={`absolute inset-0 w-full font-mono font-bold text-lg tracking-tight transition-all duration-300 flex items-center justify-center
                    ${isHovered ? 'translate-y-8 opacity-0' : 'translate-y-0 opacity-100'}`}>
                    [{link.label}]
                  </span>
                  <span className={`absolute inset-0 w-full font-mono text-sm font-bold transition-all duration-300 flex items-center justify-center
                    ${isHovered ? 'translate-y-0 opacity-100' : '-translate-y-8 opacity-0'}`}>
                    {link.value}
                  </span>
                </div>
              </a>
            );
          })}
        </div>

        {/* --- MAJOR ACTION: RERUN INIT (New & Prominent) --- */}
        <div className="flex justify-center mb-16">
          <button
            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
            className="group relative px-8 py-5 border-4 border-white bg-black hover:bg-white hover:text-black transition-all duration-300"
          >
            <div className="flex items-center gap-4">
              <ArrowUp size={32} className="group-hover:-translate-y-2 transition-transform duration-300" />
              <span className="font-black text-xl md:text-3xl tracking-tighter uppercase">
                [ RERUN_SYSTEM_INITIALIZATION ]
              </span>
            </div>
            {/* Decoration: Pulse Dot */}
            <span className="absolute -top-1.5 -right-1.5 flex h-3 w-3">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-power opacity-75"></span>
              <span className="relative inline-flex rounded-full h-3 w-3 bg-power"></span>
            </span>
          </button>
        </div>

        {/* --- FOOTER STATUS BAR --- */}
        <div className="border-t border-white/20 pt-8 flex flex-col md:flex-row justify-between items-center gap-6 font-mono text-xs text-gray-500 uppercase tracking-wider">

          <div className="flex items-center gap-6">
            <div className="flex items-center gap-2">
              <div className="w-1.5 h-1.5 bg-yellow-500 rounded-full animate-pulse"></div>
              <span>SYSTEM_STATUS: STANDBY</span>
            </div>
            <div className="hidden md:flex items-center gap-2">
              <MapPin size={12} />
              <span>LOC: ABU_DHABI</span>
            </div>
          </div>

          <div className="flex gap-8">
            <a
              href="https://github.com/satish-r-singh/Satish_Portfolio/"
              target="_blank"
              className="hover:text-white flex items-center gap-2 transition-colors"
            >
              <Terminal size={14} />
              SOURCE_CODE
            </a>
          </div>

          <div>
            © {new Date().getFullYear()} SATISH ROHIT SINGH // LEAD DATA SCIENTIST
          </div>
        </div>

      </div>
    </footer>
  );
};