import React from 'react';
import { AnnualReportData } from '../types';

interface EngagementSectionProps {
  data: AnnualReportData;
}

const EngagementSection: React.FC<EngagementSectionProps> = ({ data }) => {
  return (
    <div className="w-full relative flex flex-col items-center h-full justify-center" style={{ transformStyle: 'preserve-3d' }}>

      <h2 className="text-4xl font-black italic text-transparent bg-clip-text bg-gradient-to-r from-violet-400 to-fuchsia-400 mb-10 text-center px-4 leading-tight" style={{ transform: 'translateZ(50px)' }}>
        共鸣·回响
      </h2>

      {/* Central Interactive Sun */}
      <div className="relative w-64 h-64 flex items-center justify-center mb-8" style={{ transformStyle: 'preserve-3d' }}>
        <div className="absolute inset-0 rounded-full border border-violet-500/30 animate-[spin_20s_linear_infinite]"></div>
        <div className="absolute inset-8 rounded-full border border-fuchsia-500/20 animate-[spin_15s_linear_infinite_reverse]"></div>

        <div
          className="relative z-10 w-32 h-32 bg-gradient-to-br from-violet-600 to-fuchsia-600 rounded-full shadow-[0_0_40px_rgba(139,92,246,0.6)] flex flex-col items-center justify-center animate-pulse"
          style={{ transform: 'translateZ(60px)' }}
        >
          <span className="text-3xl font-black text-white">{data.Readcnt || 0}</span>
          <span className="text-[10px] font-bold text-violet-100 uppercase tracking-widest">总阅读量</span>
        </div>

        {/* Orbiting Stats */}
        {/* Likes */}
        <div className="absolute w-full h-full animate-[spin_10s_linear_infinite]">
          <div className="absolute top-0 left-1/2 transform -translate-x-1/2 -mt-5">
            <div className="w-16 h-16 bg-slate-900/80 border border-fuchsia-400 rounded-full flex flex-col items-center justify-center shadow-[0_0_15px_rgba(232,121,249,0.5)] backdrop-blur-md transform rotate-[20deg]">
              <span className="text-lg font-bold text-white">{data.Zancnt || 0}</span>
              <span className="text-[8px] text-fuchsia-200">获赞</span>
            </div>
          </div>
        </div>

        {/* Attachments */}
        <div className="absolute w-full h-full animate-[spin_14s_linear_infinite_reverse]">
          <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 mb-[-20px]">
            <div className="w-14 h-14 bg-slate-900/80 border border-blue-400 rounded-full flex flex-col items-center justify-center shadow-[0_0_15px_rgba(96,165,250,0.5)] backdrop-blur-md">
              <span className="text-sm font-bold text-white">{data.FuJianSL || 0}</span>
              <span className="text-[8px] text-blue-200">附件</span>
            </div>
          </div>
        </div>
      </div>

      {/* Detail Grid */}
      <div className="grid grid-cols-2 gap-2 w-full max-w-sm px-6" style={{ transform: 'translateZ(30px)' }}>
        <div className="bg-white/5 rounded-lg p-2 flex justify-between items-center">
          <span className="text-[10px] text-gray-400">人事大厅</span>
          <span className="text-xs font-bold text-white">{data.R_rsdt || 0} 阅读</span>
        </div>
        <div className="bg-white/5 rounded-lg p-2 flex justify-between items-center">
          <span className="text-[10px] text-gray-400">知识分享</span>
          <span className="text-xs font-bold text-white">{data.R_zsfx || 0} 阅读</span>
        </div>
        {data.YueDuTB !== null && (
          <div className="col-span-2 text-center mt-2">
            <p className="text-[10px] text-gray-400">阅读同比 <span className={data.YueDuTB > 0 ? "text-green-400" : "text-red-400"}>{data.YueDuTB > 0 ? '+' : ''}{data.YueDuTB}</span></p>
          </div>
        )}
      </div>

    </div>
  );
};

export default EngagementSection;