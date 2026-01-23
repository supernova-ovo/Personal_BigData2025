import React from 'react';
import { AnnualReportData } from '../types';

interface IntroSectionProps {
  data: AnnualReportData;
}

const IntroSection: React.FC<IntroSectionProps> = ({ data }) => {
  const displayName = data.XingMing || '同事';
  const displayRole = data.GangWei || '岗位信息暂缺';
  const displayId = data.GongHao || 'N/A';
  const displaySchool = data.BiYeYX || '未知院校';

  return (
    <div className="flex flex-col items-center text-center space-y-8 animate-fade-in-up relative h-full justify-center" style={{ transformStyle: 'preserve-3d' }}>
      
      {/* Background Year */}
      <div
        className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-[10rem] font-black text-white/5 select-none pointer-events-none z-0 leading-none mix-blend-overlay"
        style={{ transform: 'translate(-50%, -50%) translateZ(-50px)' }}
      >
        {data.NianFen || '2025'}
      </div>

      {/* Profile Image Area */}
      <div className="relative z-10 group" style={{ transform: 'translateZ(40px)' }}>
        <div className="absolute -inset-4 bg-gradient-to-r from-cyan-600 via-blue-700 to-purple-700 rounded-full blur-lg opacity-60 animate-spin-slow"></div>
        <div className="relative w-32 h-32 rounded-full border-4 border-white/20 overflow-hidden shadow-2xl bg-black/50 backdrop-blur-sm flex items-center justify-center">
            {/* Fallback to first char of name or '?' */}
            <span className="text-4xl font-black text-white">{displayName.charAt(0)}</span>
        </div>
      </div>
      
      {/* Title */}
      <div className="z-10 space-y-2" style={{ transform: 'translateZ(80px)' }}>
        <h1 className="text-6xl font-black tracking-tighter text-transparent bg-clip-text bg-gradient-to-r from-cyan-300 via-white to-purple-400 drop-shadow-[0_0_20px_rgba(34,211,238,0.6)] animate-neon-flicker">
          年度·回响
        </h1>
        <p className="text-sm font-bold text-cyan-200 tracking-[0.5em] uppercase opacity-80">PERSONAL BIG DATA</p>
      </div>
      
      {/* Info Card - Darker background for contrast */}
      <div 
        className="z-10 bg-black/40 backdrop-blur-xl border border-white/20 p-6 rounded-2xl shadow-2xl w-80 relative overflow-hidden"
        style={{ transform: 'translateZ(20px)' }}
      >
        <div className="absolute top-0 right-0 p-3 opacity-30">
             <span className="text-xs font-mono border border-white/50 px-1 rounded">{displayId}</span>
        </div>

        <p className="text-3xl font-bold text-white mb-1">{displayName}</p>
        <p className="text-sm text-cyan-300 font-bold mb-4 tracking-wider">{displayRole}</p>
        
        <div className="h-px w-full bg-white/10 mb-4"></div>

        {/* School & Alumni Info */}
        <div className="flex items-center justify-between">
            <div className="text-left">
                <p className="text-[10px] text-gray-400 uppercase">毕业院校</p>
                <p className="text-sm font-medium text-white">{displaySchool}</p>
            </div>
            {(data.XiaoYouSh || 0) > 0 && (
                <div className="text-right">
                    <p className="text-[10px] text-gray-400 uppercase">校友圈</p>
                    <div className="flex -space-x-2 justify-end mt-1">
                        <div className="w-6 h-6 rounded-full bg-blue-500 flex items-center justify-center text-[10px] ring-2 ring-black font-bold">
                            {data.XiaoYouSh}
                        </div>
                    </div>
                </div>
            )}
        </div>
      </div>
      
      <div 
        className="absolute bottom-10 left-1/2 transform -translate-x-1/2 flex flex-col items-center gap-2 animate-bounce opacity-80"
        style={{ transform: 'translateX(-50%) translateZ(10px)' }}
      >
        <span className="text-[10px] uppercase tracking-widest text-cyan-200 font-bold">向上滑动</span>
        <svg className="w-5 h-5 text-cyan-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M19 14l-7 7m0 0l-7-7" />
        </svg>
      </div>
    </div>
  );
};

export default IntroSection;