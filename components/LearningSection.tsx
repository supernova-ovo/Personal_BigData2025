import React from 'react';
import { AnnualReportData } from '../types';

interface LearningSectionProps {
  data: AnnualReportData;
}

const LearningSection: React.FC<LearningSectionProps> = ({ data }) => {
  return (
    <div className="w-full relative flex flex-col items-center justify-center h-full" style={{ transformStyle: 'preserve-3d' }}>

      {/* Background: Geometric Brain */}
      <div className="absolute inset-0 pointer-events-none opacity-20" style={{ transform: 'translateZ(-140px) scale(2)' }}>
        <svg className="w-full h-full animate-float-delayed" viewBox="0 0 200 200">
          <polygon points="100,20 40,80 100,140 160,80" fill="none" stroke="#f59e0b" strokeWidth="0.5" />
          <polygon points="100,50 60,90 100,130 140,90" fill="none" stroke="#fbbf24" strokeWidth="0.5" />
          <line x1="100" y1="20" x2="100" y2="180" stroke="#f59e0b" strokeWidth="0.5" strokeDasharray="5 5" />
          <circle cx="100" cy="90" r="10" fill="#fcd34d" className="animate-pulse" />
        </svg>
      </div>

      <h2 className="text-4xl font-black italic text-transparent bg-clip-text bg-gradient-to-r from-amber-400 to-orange-300 mb-8 self-end pr-6 border-r-4 border-amber-500 text-right leading-tight" style={{ transform: 'translateZ(50px)' }}>
        求知·进化
      </h2>

      {/* Main Stats: Exams */}
      <div className="w-full px-6 space-y-6" style={{ transform: 'translateZ(30px)' }}>

        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm text-amber-200 uppercase font-bold tracking-widest">答题风暴</p>
            <p className="text-5xl font-black text-white drop-shadow-[0_0_10px_rgba(245,158,11,0.5)]">{data.ExamCiShu || 0}</p>
            <p className="text-xs text-gray-400 mt-1">次参与</p>
          </div>

          {/* Score Badge */}
          <div className="relative w-24 h-24 flex items-center justify-center">
            <div className="absolute inset-0 bg-gradient-to-tr from-yellow-400 to-orange-600 rounded-full opacity-20 animate-spin-slow"></div>
            <div className="absolute inset-2 border-2 border-amber-400 rounded-full border-dashed"></div>
            <div className="text-center">
              <p className="text-2xl font-black text-white">{data.MaxScore !== undefined ? data.MaxScore : '--'}</p>
              <p className="text-[8px] text-amber-300 uppercase">最高分</p>
            </div>
          </div>
        </div>

        <div className="h-px w-full bg-amber-500/20"></div>

        <div className="flex items-end justify-between">
          <span className="text-lg font-bold text-white">攻克题目</span>
          <div className="text-right">
            <span className="text-4xl font-bold text-amber-300">{data.TimuShu || 0}</span>
            <span className="text-sm text-gray-400 ml-1">道</span>
          </div>
        </div>

      </div>

      {/* Decorative Binary Rain */}
      <div className="mt-10 flex space-x-4 opacity-30 text-[10px] text-amber-500 font-mono" style={{ transform: 'translateZ(10px)' }}>
        <div className="flex flex-col animate-[float_4s_infinite]">1 0 1 1</div>
        <div className="flex flex-col animate-[float_6s_infinite]">0 1 0 0</div>
        <div className="flex flex-col animate-[float_5s_infinite]">1 1 1 0</div>
      </div>

    </div>
  );
};

export default LearningSection;