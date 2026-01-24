import React, { useState } from 'react';
import { SectionDivider } from './SectionDivider';
import { Terminal, Cpu, Database, Cloud, Users, Radar, Share2, Info } from 'lucide-react';
import { SKILLS } from '../constants';
import { Skill } from '../types';

// Icon mapping - icons can't be stored in constants, so we map them here
const SKILL_ICONS: Record<string, React.ComponentType<any>> = {
  'genai-agents': Terminal,
  'data-science-ml': Cpu,
  'big-data-mlops': Database,
  'cloud-architecture': Cloud,
  'strategic-leadership': Users
};

// Extended type for rendering that includes the icon component
interface SkillWithIcon extends Skill {
  icon: React.ComponentType<any>;
}

export const SkillsMatrix: React.FC = () => {
  const [activeView, setActiveView] = useState<'list' | 'radar' | 'network'>('list');

  // Map skills with their corresponding icons
  const specs: SkillWithIcon[] = SKILLS.map(skill => ({
    ...skill,
    icon: SKILL_ICONS[skill.id] || Terminal
  }));


  return (
    <section id="skills" className="w-full pt-12 pb-24 bg-white border-b-3 border-black">
      <SectionDivider title="[ SYSTEM_SPECIFICATIONS ]" />

      {/* VIEW TOGGLE CONTROLS */}
      <div className="max-w-6xl mx-auto px-6 mt-8 flex flex-wrap justify-center md:justify-end gap-2">
        <button
          onClick={() => setActiveView('list')}
          className={`flex-1 md:flex-none px-4 py-3 md:py-2 font-mono text-xs font-bold border-2 border-black flex items-center justify-center gap-2 transition-all min-w-[120px] ${activeView === 'list' ? 'bg-black text-white' : 'bg-white hover:bg-gray-100'}`}
        >
          <Info size={14} /> LIST_VIEW
        </button>
        <button
          onClick={() => setActiveView('radar')}
          className={`flex-1 md:flex-none px-4 py-3 md:py-2 font-mono text-xs font-bold border-2 border-black flex items-center justify-center gap-2 transition-all min-w-[120px] ${activeView === 'radar' ? 'bg-black text-white' : 'bg-white hover:bg-gray-100'}`}
        >
          <Radar size={14} /> RADAR_HUD
        </button>
        <button
          onClick={() => setActiveView('network')}
          className={`flex-1 md:flex-none px-4 py-3 md:py-2 font-mono text-xs font-bold border-2 border-black flex items-center justify-center gap-2 transition-all min-w-[120px] ${activeView === 'network' ? 'bg-black text-white' : 'bg-white hover:bg-gray-100'}`}
        >
          <Share2 size={14} /> TOPOLOGY
        </button>
      </div>

      <div className="max-w-6xl mx-auto px-6 md:px-12 mt-8">

        {/* --- VIEW 1: THE LIST --- */}
        {activeView === 'list' && (
          <div className="border-3 border-black bg-white shadow-hard animate-in fade-in slide-in-from-bottom-4 duration-500">
            <div className="bg-black text-white p-3 md:p-4 flex items-center justify-between border-b-3 border-black gap-2">
              <h3 className="font-mono text-sm md:text-xl font-bold uppercase tracking-widest truncate">
                // TECHNICAL_INVENTORY
              </h3>
              <div className="flex gap-2">
                <span className="w-3 h-3 rounded-full bg-red-500 border border-white"></span>
                <span className="w-3 h-3 rounded-full bg-yellow-500 border border-white"></span>
                <span className="w-3 h-3 rounded-full bg-green-500 border border-white"></span>
              </div>
            </div>

            <div className="divide-y-3 divide-black">
              {specs.map((spec, i) => (
                <div key={i} className="group flex flex-col md:flex-row hover:bg-power/20 transition-colors">
                  <div className="w-full md:w-64 p-6 bg-gray-50 md:border-r-3 md:border-black flex flex-col justify-between shrink-0">
                    <div>
                      <div className="flex items-center gap-2 mb-2 text-black">
                        <spec.icon size={20} strokeWidth={2.5} />
                        <h4 className="font-black text-sm uppercase tracking-wider">{spec.category}</h4>
                      </div>
                      <div className="inline-block border border-black bg-white px-2 py-0.5 text-[10px] font-mono font-bold uppercase mb-2">
                        {spec.status}
                      </div>
                    </div>
                  </div>

                  <div className="p-6 flex-grow flex flex-col justify-center">
                    <div className="flex flex-wrap gap-2 mb-4">
                      {spec.tools.map((tool) => (
                        <span key={tool} className="font-mono text-xs font-bold border-2 border-black bg-white px-2 py-1 uppercase shadow-sm group-hover:translate-x-0.5 group-hover:translate-y-0.5 transition-transform">
                          {tool}
                        </span>
                      ))}
                    </div>
                    <p className="font-mono text-xs md:text-sm text-gray-600 border-l-2 border-gray-300 pl-3 leading-relaxed">
                      {spec.details}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* --- VIEW 2: RADAR CHART --- */}
        {activeView === 'radar' && (
          <div className="w-full h-[600px] border-3 border-black bg-white shadow-hard flex items-center justify-center relative overflow-hidden animate-in zoom-in duration-300">
            <div className="absolute top-4 left-4 bg-power px-2 py-1 font-mono text-xs font-bold uppercase border-2 border-black z-10">
              SKILL_BALANCE_ANALYSIS
            </div>
            <div className="absolute bottom-4 right-4 text-right z-10">
              <div className="font-mono text-[10px] text-gray-400">AXIS_SCALE: 0-100</div>
              <div className="font-mono text-[10px] text-gray-400">DATA_SOURCE: LIVE</div>
            </div>
            <RadarChart data={specs} />
          </div>
        )}

        {/* --- VIEW 3: FORCE GRAPH --- */}
        {activeView === 'network' && (
          <div className="w-full h-[600px] border-3 border-black bg-gray-50 shadow-hard flex items-center justify-center relative overflow-hidden animate-in zoom-in duration-300">
            <div className="absolute top-4 left-4 bg-black text-white px-2 py-1 font-mono text-xs font-bold uppercase z-10">
              KNOWLEDGE_GRAPH_TOPOLOGY
            </div>
            <NetworkGraph specs={specs} />
          </div>
        )}

      </div>
    </section>
  );
};

// --- COMPONENT: DETAILED RADAR ---
const RadarChart = ({ data }: { data: SkillWithIcon[] }) => {
  const size = 500;
  const center = size / 2;
  const radius = 160;
  const angleStep = (Math.PI * 2) / data.length;

  const getPoint = (score: number, index: number) => {
    const angle = index * angleStep - Math.PI / 2;
    const r = (score / 100) * radius;
    return {
      x: center + r * Math.cos(angle),
      y: center + r * Math.sin(angle)
    };
  };

  const pathPoints = data.map((d, i) => {
    const p = getPoint(d.score, i);
    return `${p.x},${p.y}`;
  }).join(' ');

  return (
    <svg width="100%" height="100%" viewBox={`0 0 ${size} ${size}`} className="overflow-visible">
      {/* Background Grid */}
      {[0.25, 0.5, 0.75, 1].map((scale, i) => (
        <circle
          key={i}
          cx={center} cy={center} r={radius * scale}
          fill="none" stroke="#e5e7eb" strokeWidth="1" strokeDasharray="4 4"
        />
      ))}

      {/* Axes */}
      {data.map((_, i) => {
        const p = getPoint(110, i);
        return <line key={i} x1={center} y1={center} x2={p.x} y2={p.y} stroke="#d1d5db" strokeWidth="1" />;
      })}

      {/* Data Polygon */}
      <polygon points={pathPoints} fill="rgba(255, 69, 0, 0.1)" stroke="#FF4500" strokeWidth="3" />

      {/* Points & Labels */}
      {data.map((d, i) => {
        const p = getPoint(100, i);
        const pointP = getPoint(d.score, i);
        const isLeft = p.x < center;
        const isTop = p.y < center;
        const textAnchor = isLeft ? "end" : "start";
        const xOffset = isLeft ? -15 : 15;
        const yOffset = isTop ? -15 : 15;

        return (
          <g key={i} className="group cursor-pointer">
            <circle cx={pointP.x} cy={pointP.y} r="5" fill="black" stroke="white" strokeWidth="2" className="group-hover:fill-power transition-colors" />

            {/* Category */}
            <text x={p.x + xOffset} y={p.y + yOffset} textAnchor={textAnchor} className="text-[12px] font-black uppercase fill-black">
              {d.category}
            </text>

            {/* Micro Tools List */}
            {d.tools.slice(0, 3).map((tool, idx) => (
              <text key={idx} x={p.x + xOffset} y={p.y + yOffset + 14 + (idx * 10)} textAnchor={textAnchor} className="text-[9px] font-mono font-medium fill-gray-500 uppercase">
                + {tool}
              </text>
            ))}
          </g>
        );
      })}
    </svg>
  );
};

// --- COMPONENT: PLANETARY SYSTEM ---
const NetworkGraph = ({ specs }: { specs: SkillWithIcon[] }) => {
  const width = 600;
  const height = 600;
  const center = { x: width / 2, y: height / 2 };
  const orbitRadiusCategory = 140;

  return (
    <svg width="100%" height="100%" viewBox={`0 0 ${width} ${height}`}>
      {/* Central Node */}
      <circle cx={center.x} cy={center.y} r="40" fill="black" />
      <text x={center.x} y={center.y} dy="5" textAnchor="middle" fill="white" className="font-black text-sm tracking-widest">SATISH</text>

      {/* Orbit Guide */}
      <circle cx={center.x} cy={center.y} r={orbitRadiusCategory} fill="none" stroke="#e5e7eb" strokeWidth="1" strokeDasharray="5 5" />

      {/* Categories */}
      {specs.map((cat, i) => {
        const angle = (i / specs.length) * 2 * Math.PI - Math.PI / 2;
        const catX = center.x + orbitRadiusCategory * Math.cos(angle);
        const catY = center.y + orbitRadiusCategory * Math.sin(angle);

        return (
          <g key={i}>
            <line x1={center.x} y1={center.y} x2={catX} y2={catY} stroke="#e5e7eb" strokeWidth="2" />
            <circle cx={catX} cy={catY} r="25" fill="#FF4500" stroke="white" strokeWidth="3" className="shadow-lg" />
            <text x={catX} y={catY} dy="35" textAnchor="middle" className="font-bold text-[10px] uppercase fill-black bg-white px-1">
              {cat.category.split(' ')[0]}
            </text>

            {/* Tool Satellites */}
            {cat.tools.map((tool, j) => {
              const toolAngle = angle + ((j - cat.tools.length / 2 + 0.5) * 0.5);
              const toolDist = 70 + (j % 2) * 20;
              const toolX = catX + toolDist * Math.cos(toolAngle);
              const toolY = catY + toolDist * Math.sin(toolAngle);

              return (
                <g key={tool}>
                  <line x1={catX} y1={catY} x2={toolX} y2={toolY} stroke="#cbd5e1" strokeWidth="1" />
                  <circle cx={toolX} cy={toolY} r="4" fill="white" stroke="black" strokeWidth="2" />
                  <text
                    x={toolX} y={toolY}
                    dx={toolX > center.x ? 8 : -8} dy="3"
                    textAnchor={toolX > center.x ? "start" : "end"}
                    className="font-mono text-[9px] font-bold uppercase fill-gray-600"
                  >
                    {tool}
                  </text>
                </g>
              );
            })}
          </g>
        );
      })}
    </svg>
  );
};