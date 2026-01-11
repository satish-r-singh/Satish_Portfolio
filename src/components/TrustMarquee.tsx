import React from 'react';
import { BookOpen, Users, Terminal } from 'lucide-react';

export const TrustMarquee: React.FC = () => {
  return (
    <div className="w-full bg-white border-b-3 border-black py-8 px-6 md:px-12">

      <div className="flex flex-col md:flex-row gap-8 md:gap-16">

        {/* LEFT COL: RESEARCH & MENTORSHIP (High Value) */}
        <div className="md:w-1/3 flex flex-col gap-4">
          <div className="flex items-center gap-2 mb-2 border-b-2 border-black pb-2">
            <BookOpen size={16} />
            <h3 className="font-black text-sm uppercase tracking-wider">Research & Mentorship</h3>
          </div>

          <div className="flex flex-col gap-3">
            <div className="group">
              <span className="font-mono text-xs text-gray-500 block mb-0.5">// PUBLISHER</span>
              <span className="font-bold text-lg uppercase leading-tight group-hover:text-power transition-colors">Springer Nature</span>
            </div>
            <div className="group">
              <span className="font-mono text-xs text-gray-500 block mb-0.5">// MENTORSHIP</span>
              <span className="font-bold text-lg uppercase leading-tight group-hover:text-power transition-colors">Mindworx</span>
            </div>
          </div>
        </div>

        {/* RIGHT COL: CORPORATE TRAINING (Volume) */}
        <div className="md:w-2/3 flex flex-col gap-4">
          <div className="flex items-center gap-2 mb-2 border-b-2 border-black pb-2">
            <Users size={16} />
            <h3 className="font-black text-sm uppercase tracking-wider">Corporate Training Delivery</h3>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-y-3 gap-x-8">
            {[
              "Emirates Institute of Finance",
              "SimpliLearn",
              "Vinsys",
              "The Knowledge Academy"
            ].map((partner, idx) => (
              <div key={idx} className="flex items-center gap-2 group">
                <Terminal size={12} className="text-gray-400 group-hover:text-power" />
                <span className="font-mono text-sm font-bold uppercase text-gray-700 group-hover:text-black">
                  {partner}
                </span>
              </div>
            ))}
          </div>
        </div>

      </div>
    </div>
  );
};