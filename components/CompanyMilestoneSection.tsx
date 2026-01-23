import React from 'react';
import { CompanyMilestones } from '../types';

interface CompanyMilestoneSectionProps {
  data: CompanyMilestones;
}

const CompanyMilestoneSection: React.FC<CompanyMilestoneSectionProps> = ({ data }) => {
  return (
    <div className="w-full relative flex flex-col items-center justify-center h-full" style={{ transformStyle: 'preserve-3d' }}>
      
      {/* Background: Ascending Cubes */}
      <div 
        className="absolute inset-0 w-full h-full pointer-events-none opacity-20"
        style={{ transform: 'translateZ(-100px) scale(2) rotateZ(15deg)' }}
      >
        <div className="absolute top-1/2 left-1/4 w-32 h-32 bg-emerald-500/20 rotate-45 border border-emerald-400/30 backdrop-blur-sm animate-float"></div>
        <div className="absolute bottom-1/4 right-1/3 w-20 h-20 bg-emerald-300/10 rotate-12 border border-emerald-200/20 backdrop-blur-sm animate-float-delayed"></div>
        <div className="absolute top-1/4 right-10 w-40 h-40 bg-teal-600/10 -rotate-12 border border-teal-500/20 backdrop-blur-sm"></div>
      </div>

      <h2 className="text-4xl font-black italic text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 to-teal-300 mb-12 self-start pl-6 border-l-4 border-emerald-500" style={{ transform: 'translateZ(60px)' }}>
        关键·时刻
      </h2>

      <div className="w-full max-w-sm px-4 space-y-8 relative">
          
          {/* Timeline Line */}
          <div className="absolute left-8 top-4 bottom-4 w-0.5 bg-gradient-to-b from-emerald-500/0 via-emerald-500 to-emerald-500/0 opacity-50"></div>

          {data.highlights.map((milestone, index) => (
             <div key={index} className="relative pl-12 group" style={{ transform: `translateZ(${40 - index * 10}px)` }}>
                {/* Node */}
                <div className="absolute left-[11px] top-1 w-4 h-4 rounded-full bg-emerald-900 border-2 border-emerald-400 shadow-[0_0_10px_#10b981] group-hover:scale-125 transition-transform z-10"></div>
                
                {/* Content Card */}
                <div className="bg-slate-900/60 backdrop-blur-md border border-emerald-500/20 p-5 rounded-tr-2xl rounded-bl-2xl rounded-br-2xl shadow-lg transform transition-all duration-300 hover:translate-x-2 hover:bg-slate-800/80">
                    <div className="flex justify-between items-center mb-1">
                        <span className="text-xs font-bold text-emerald-400 px-2 py-0.5 bg-emerald-900/50 rounded">{milestone.quarter}</span>
                    </div>
                    <h3 className="text-xl font-bold text-white mb-1">{milestone.title}</h3>
                    <p className="text-sm text-gray-400">{milestone.description}</p>
                </div>
             </div>
          ))}

          {/* Decorative Future Node */}
          <div className="relative pl-12 opacity-50" style={{ transform: 'translateZ(10px)' }}>
             <div className="absolute left-[13px] top-1 w-3 h-3 rounded-full bg-gray-700 border border-gray-500"></div>
             <div className="text-sm text-gray-500 italic">未来可期...</div>
          </div>
      </div>
    </div>
  );
};

export default CompanyMilestoneSection;