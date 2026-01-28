import React from 'react';
import { AnnualReportData } from '../types';

interface TravelSectionProps {
   data: AnnualReportData;
}

const TravelSection: React.FC<TravelSectionProps> = ({ data }) => {
   const cities = data.ChuChaiCity ? data.ChuChaiCity.split(/[,;，；]/).filter(c => c.trim()) : [];

   return (
      <div className="w-full relative flex flex-col items-center justify-center h-full" style={{ transformStyle: 'preserve-3d' }}>

         {/* Background Map Visual */}
         <div
            className="absolute inset-0 w-full h-full opacity-30 pointer-events-none"
            style={{ transform: 'translateZ(-150px) scale(3)' }}
         >
            <svg viewBox="0 0 200 100" className="w-full h-full fill-teal-500/50">
               {/* Simple Dots for Map Aesthetic */}
               <circle cx="50" cy="50" r="2" /> <circle cx="100" cy="40" r="2" /> <circle cx="150" cy="60" r="2" />
               <path d="M50 50 Q 100 20 150 60" fill="none" stroke="teal" strokeWidth="0.5" strokeDasharray="2 2" className="animate-pulse" />
            </svg>
         </div>

         <h2 className="text-4xl font-black italic text-transparent bg-clip-text bg-gradient-to-r from-teal-400 to-green-300 mb-8 self-start pl-4 pr-4 border-l-4 border-teal-500 leading-tight" style={{ transform: 'translateZ(50px)' }}>
            行无止境
         </h2>

         {/* Radar / Globe Visual */}
         <div className="relative w-64 h-64 mb-8" style={{ transformStyle: 'preserve-3d', transform: 'translateZ(60px)' }}>
            {/* Rings */}
            <div className="absolute inset-0 border border-teal-500/40 rounded-full animate-[spin_10s_linear_infinite]"></div>
            <div className="absolute inset-4 border border-teal-400/20 rounded-full animate-[spin_15s_linear_infinite_reverse]"></div>

            {/* Central Content */}
            <div
               className="absolute inset-0 flex flex-col justify-center items-center z-10 bg-black/50 backdrop-blur-md rounded-full m-8 border border-teal-500/50 shadow-[0_0_30px_rgba(20,184,166,0.4)]"
               style={{ transform: 'translateZ(30px)' }}
            >
               <span className="text-4xl font-black text-white">{data.ChuChaiCS}</span>
               <span className="text-[10px] text-teal-300 font-bold uppercase tracking-widest mt-1">出差 (次)</span>
            </div>

            {/* Orbiting Cities */}
            {cities.slice(0, 4).map((city, i) => (
               <div
                  key={i}
                  className="absolute w-full h-full animate-[spin_8s_linear_infinite]"
                  style={{ animationDuration: `${8 + i * 2}s`, animationDirection: i % 2 === 0 ? 'normal' : 'reverse' }}
               >
                  <div className="absolute top-0 left-1/2 transform -translate-x-1/2 -mt-3">
                     <div className="px-3 py-1 bg-teal-900/90 border border-teal-400 text-[10px] font-bold text-teal-100 rounded-full whitespace-nowrap shadow-[0_0_10px_rgba(20,184,166,0.5)]">
                        {city}
                     </div>
                  </div>
               </div>
            ))}
         </div>

         {/* Stats Grid */}
         <div className="w-full max-w-sm grid grid-cols-2 gap-3 px-4" style={{ transform: 'translateZ(30px)' }}>
            <div className="bg-teal-950/40 p-4 rounded-xl border border-teal-500/30 backdrop-blur-sm">
               <p className="text-gray-400 text-[10px] uppercase font-bold">出差天数</p>
               <p className="text-2xl font-bold text-teal-300">{data.ChuChaiTS} <span className="text-xs text-white">天</span></p>
            </div>
            <div className="bg-teal-950/40 p-4 rounded-xl border border-teal-500/30 backdrop-blur-sm">
               <p className="text-gray-400 text-[10px] uppercase font-bold">足迹城市</p>
               <p className="text-2xl font-bold text-teal-300">{cities.length}</p>
            </div>
         </div>

         {/* Leave Stats */}
         <div className="mt-4 flex w-full max-w-sm px-4 space-x-4" style={{ transform: 'translateZ(20px)' }}>
            <div className="flex-1 bg-white/5 rounded-lg p-2 text-center">
               <span className="text-[10px] text-gray-400">年假</span>
               <span className="block text-xl font-bold text-white">{data.NianJia}</span>
            </div>
            <div className="flex-1 bg-white/5 rounded-lg p-2 text-center">
               <span className="text-[10px] text-gray-400">请假</span>
               <span className="block text-xl font-bold text-white">{data.QingJiaTS}</span>
            </div>
         </div>

      </div>
   );
};

export default TravelSection;