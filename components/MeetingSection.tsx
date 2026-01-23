import React from 'react';
import { MeetingStats } from '../types';

interface MeetingSectionProps {
  data: MeetingStats;
}

const MeetingSection: React.FC<MeetingSectionProps> = ({ data }) => {
  return (
    <div className="w-full relative flex flex-col items-center justify-center h-full" style={{ transformStyle: 'preserve-3d' }}>
      
      {/* Background: Soundwaves / Connection Lines */}
      <div 
        className="absolute inset-0 w-full h-full pointer-events-none opacity-20"
        style={{ transform: 'translateZ(-120px) scale(2)' }}
      >
        <div className="absolute top-1/2 left-1/2 w-[600px] h-[600px] border border-violet-500/30 rounded-full -translate-x-1/2 -translate-y-1/2 animate-pulse"></div>
        <div className="absolute top-1/2 left-1/2 w-[400px] h-[400px] border border-indigo-500/30 rounded-full -translate-x-1/2 -translate-y-1/2 animate-pulse" style={{ animationDelay: '1s' }}></div>
        <div className="absolute top-1/2 left-1/2 w-[200px] h-[200px] border border-purple-500/30 rounded-full -translate-x-1/2 -translate-y-1/2 animate-pulse" style={{ animationDelay: '2s' }}></div>
      </div>

      <div className="text-center mb-10 z-10" style={{ transform: 'translateZ(60px)' }}>
          <h2 className="text-4xl font-black text-white drop-shadow-md">
            协作·<span className="text-violet-400">回响</span>
          </h2>
      </div>

      {/* Centerpiece: Time */}
      <div className="relative w-48 h-48 flex items-center justify-center mb-8" style={{ transform: 'translateZ(40px)' }}>
          <div className="absolute inset-0 bg-gradient-to-tr from-violet-600 to-indigo-600 rounded-full opacity-20 blur-xl animate-pulse"></div>
          <div className="relative z-10 w-full h-full border-4 border-violet-500/30 rounded-full flex flex-col items-center justify-center bg-black/40 backdrop-blur-sm">
               <span className="text-5xl font-black text-white">{data.totalHours}</span>
               <span className="text-xs text-violet-300 uppercase mt-1">会议小时</span>
          </div>
          {/* Orbiting dots */}
          <div className="absolute w-full h-full animate-spin-slow">
              <div className="absolute top-0 left-1/2 w-3 h-3 bg-white rounded-full -translate-x-1/2 -translate-y-1.5 shadow-[0_0_10px_white]"></div>
          </div>
      </div>

      {/* Grid Stats */}
      <div className="grid grid-cols-3 gap-3 w-full px-4" style={{ transform: 'translateZ(20px)' }}>
          <div className="bg-violet-900/30 border border-violet-500/20 p-3 rounded-lg text-center backdrop-blur-sm">
               <p className="text-xl font-bold text-white">{data.hostedCount}</p>
               <p className="text-[10px] text-violet-200">发起会议</p>
          </div>
          <div className="bg-indigo-900/30 border border-indigo-500/20 p-3 rounded-lg text-center backdrop-blur-sm">
               <p className="text-xl font-bold text-white">{data.externalMeetings}</p>
               <p className="text-[10px] text-indigo-200">外部协同</p>
          </div>
          <div className="bg-purple-900/30 border border-purple-500/20 p-3 rounded-lg text-center backdrop-blur-sm">
               <p className="text-xl font-bold text-white">{data.busiestMonth}</p>
               <p className="text-[10px] text-purple-200">最忙碌</p>
          </div>
      </div>

      <p className="mt-8 text-xs text-gray-400 italic opacity-80" style={{ transform: 'translateZ(10px)' }}>
          "每一次沟通，都在缩短与目标的距离"
      </p>

    </div>
  );
};

export default MeetingSection;