import React from 'react';
import { Github, Linkedin, Mail, Calendar } from 'lucide-react';

export const Footer: React.FC = () => {
  const links = [
    { label: 'EMAIL_PROTOCOL', icon: Mail, href: 'mailto:satishk.singh@outlook.com' },
    { label: 'LINKEDIN_FEED', icon: Linkedin, href: 'https://www.linkedin.com/in/satish-r-singh/' },
    { label: 'GITHUB_REPOS', icon: Github, href: 'https://github.com/satish-r-singh' },
    { label: 'CALENDLY_SYNC', icon: Calendar, href: 'https://calendly.com/satish-r-singh' },
  ];

  return (
    <footer id="contact" className="w-full bg-black text-white py-24 border-t-3 border-black relative overflow-hidden">
      <div className="max-w-[1920px] mx-auto px-6 md:px-12 text-center relative z-10">

        <div className="mb-20">
          <h2 className="text-4xl md:text-6xl lg:text-8xl font-black uppercase tracking-tighter mb-4 leading-none text-white">
            CONNECTION_TERMINATED
          </h2>
          <p className="font-mono text-xl md:text-2xl text-gray-500">
              // CONTACT HUMAN:
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {links.map((link) => {
            // Check if it is an email link
            const isMail = link.href.startsWith('mailto');

            return (
              <a
                key={link.label}
                href={link.href}
                // Only open in new tab if it is NOT an email link
                target={isMail ? undefined : "_blank"}
                rel={isMail ? undefined : "noopener noreferrer"}
                className="group border-3 border-white p-10 flex flex-col items-center justify-center gap-6 transition-all duration-300 hover:bg-white hover:text-black"
              >
                <link.icon size={48} strokeWidth={1.5} className="group-hover:scale-110 transition-transform" />
                <span className="font-mono font-bold text-lg tracking-tight">
                  [{link.label}]
                </span>
              </a>
            );
          })}
        </div>

        <div className="mt-24 flex flex-col md:flex-row justify-between items-center font-mono text-xs text-gray-600 border-t border-gray-900 pt-8">
          <span className="uppercase">System_Status: Offline</span>
          <span>© {new Date().getFullYear()} SATISH ROHIT SINGH // </span>
        </div>

      </div>

      {/* Background Noise Texture */}
      <div className="absolute inset-0 opacity-5 pointer-events-none bg-[url('https://grainy-gradients.vercel.app/noise.svg')] brightness-100 contrast-150"></div>
    </footer>
  );
};