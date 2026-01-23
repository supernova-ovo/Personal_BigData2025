import React from 'react';
import { CompanyStats } from '../types';

interface CompanyOverviewSectionProps {
  data: CompanyStats;
}

const CompanyOverviewSection: React.FC<CompanyOverviewSectionProps> = ({ data }) => {
  return (
    <div className="w-full relative flex flex-col items-center justify-center h-full" style={{ transformStyle: 'preserve-3d' }}>
      
      {/* Background: Abstract Globe / Network */}
      <div 
        className="absolute inset-0 w-full h-full pointer-events-none opacity-30"
        style={{ transform: 'translateZ(-150px) scale(2.5)' }}
      >
        <svg viewBox="0 0 200 200" className="w-full h-full animate-[spin_60s_linear_infinite]">
          <defs>
             <radialGradient id="globeGrad" cx="50%" cy="50%" r="50%" fx="50%" fy="50%">
                <stop offset="0%" stopColor="#1e40af" stopOpacity="0.2" />
                <stop offset="100%" stopColor="#172554" stopOpacity="0" />
             </radialGradient>
          </defs>
          <circle cx="100" cy="100" r="80" fill="url(#globeGrad)" />
          {/* Longitudes */}
          <ellipse cx="100" cy="100" rx="30" ry="80" fill="none" stroke="#60a5fa" strokeWidth="0.5" strokeOpacity="0.5" />
          <ellipse cx="100" cy="100" rx="60" ry="80" fill="none" stroke="#60a5fa" strokeWidth="0.5" strokeOpacity="0.5" />
          <line x1="100" y1="20" x2="100" y2="180" stroke="#60a5fa" strokeWidth="0.5" strokeOpacity="0.8" />
          {/* Latitudes */}
          <line x1="20" y1="100" x2="180" y2="100" stroke="#60a5fa" strokeWidth="0.5" strokeOpacity="0.8" />
          <path d="M 28 70 Q 100 90 172 70" fill="none" stroke="#60a5fa" strokeWidth="0.5" strokeOpacity="0.5" />
          <path d="M 28 130 Q 100 110 172 130" fill="none" stroke="#60a5fa" strokeWidth="0.5" strokeOpacity="0.5" />
        </svg>
      </div>

      <div className="flex flex-col items-center z-10 space-y-2 mb-10" style={{ transform: 'translateZ(50px)' }}>
        <h2 className="text-4xl font-black text-transparent bg-clip-text bg-gradient-to-r from-blue-300 via-white to-blue-300 tracking-tight">
          聚势·共赢
        </h2>
        <div className="h-1 w-20 bg-blue-500 rounded-full shadow-[0_0_10px_#3b82f6]"></div>
      </div>

      {/* Main Stats */}
      <div className="grid grid-cols-1 gap-8 w-full px-4" style={{ transform: 'translateZ(30px)' }}>
        
        {/* Revenue Card */}
        <div className="bg-blue-900/20 backdrop-blur-md border border-blue-500/30 p-6 rounded-2xl relative overflow-hidden group">
            <div className="absolute -right-10 -top-10 w-32 h-32 bg-blue-500/20 rounded-full blur-2xl group-hover:bg-blue-400/30 transition-colors"></div>
            <p className="text-blue-300 text-xs font-bold uppercase tracking-widest mb-1">年度营收增长</p>
            <p className="text-5xl font-black text-white drop-shadow-[0_0_10px_rgba(59,130,246,0.5)]">{data.revenueGrowth}</p>
        </div>

        {/* 2-Col Stats */}
        <div className="grid grid-cols-2 gap-4">
             <div className="bg-slate-900/40 border border-white/10 p-4 rounded-xl text-center">
                 <p className="text-2xl font-bold text-white">{data.marketRank}</p>
                 <p className="text-[10px] text-gray-400 mt-1">行业排名 TOP</p>
             </div>
             <div className="bg-slate-900/40 border border-white/10 p-4 rounded-xl text-center">
                 <p className="text-2xl font-bold text-white">{data.totalEmployees}</p>
                 <p className="text-[10px] text-gray-400 mt-1">全球员工数</p>
             </div>
        </div>

        {/* Office Expansion */}
        <div className="relative p-4 rounded-xl bg-gradient-to-r from-blue-950 to-slate-900 border-l-4 border-blue-500" style={{ transform: 'translateZ(10px)' }}>
             <div className="flex items-center justify-between">
                 <span className="text-gray-300 font-medium">新设研发中心</span>
                 <span className="text-2xl font-bold text-blue-400">+{data.newOffices}</span>
             </div>
             <div className="mt-2 text-xs text-gray-500">
                 布局 硅谷 / 伦敦 / 班加罗尔
             </div>
        </div>

      </div>
    </div>
  );
};

export default CompanyOverviewSection;