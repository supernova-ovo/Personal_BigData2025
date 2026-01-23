import React from 'react';
import { WorkStats } from '../types';
import { BarChart, Bar, XAxis, Tooltip, ResponsiveContainer, Cell } from 'recharts';

interface WorkStatsSectionProps {
  data: WorkStats;
}

const WorkStatsSection: React.FC<WorkStatsSectionProps> = ({ data }) => {
  const monthlyData = [
    { name: 'Q1', tasks: Math.floor(data.tasksCompleted * 0.2) },
    { name: 'Q2', tasks: Math.floor(data.tasksCompleted * 0.25) },
    { name: 'Q3', tasks: Math.floor(data.tasksCompleted * 0.35) },
    { name: 'Q4', tasks: Math.floor(data.tasksCompleted * 0.2) },
  ];

  return (
    <div className="space-y-6 w-full relative h-full flex flex-col justify-center" style={{ transformStyle: 'preserve-3d' }}>
      
      {/* Background: Neon Grid & Holograms */}
      <div 
        className="absolute bottom-[-20%] right-[-40%] w-[1000px] h-[800px] opacity-30 pointer-events-none"
        style={{ transform: 'translateZ(-150px) scale(2.5) rotateX(60deg) rotateZ(-30deg)' }}
      >
        <div className="w-full h-full grid grid-cols-4 grid-rows-3 gap-4 p-4">
          {Array(12).fill(0).map((_, i) => (
             <div key={i} className="bg-gradient-to-br from-cyan-500/20 to-blue-500/10 border border-cyan-400/50 backdrop-blur-sm shadow-[0_0_15px_rgba(34,211,238,0.3)] animate-pulse"></div>
          ))}
        </div>
      </div>

      <div className="flex items-center space-x-3 mb-4" style={{ transform: 'translateZ(40px)' }}>
        <div className="h-8 w-1.5 bg-cyan-400 shadow-[0_0_15px_#22d3ee]"></div>
        <h2 className="text-4xl font-black italic text-white tracking-wide uppercase drop-shadow-lg">
          辛勤 <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-300 to-blue-400 text-glow">耕耘</span>
        </h2>
      </div>

      {/* Neon Glass Cards */}
      <div className="grid grid-cols-2 gap-4" style={{ transform: 'translateZ(20px)' }}>
        <div className="relative overflow-hidden bg-white/5 p-5 rounded-2xl border border-cyan-400/40 shadow-[0_0_20px_rgba(6,182,212,0.3)] backdrop-blur-md group hover:bg-white/10 transition-colors">
          <div className="absolute top-0 right-0 p-2 opacity-60">
            <svg className="w-8 h-8 text-cyan-300 drop-shadow-[0_0_5px_cyan]" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z"></path></svg>
          </div>
          <p className="text-[12px] font-bold text-cyan-200 uppercase tracking-widest mb-1 shadow-black">最早登录</p>
          <p className="text-3xl font-mono font-bold text-white drop-shadow-[0_0_10px_rgba(34,211,238,1)]">{data.earliestLogin}</p>
        </div>
        <div className="relative overflow-hidden bg-white/5 p-5 rounded-2xl border border-fuchsia-400/40 shadow-[0_0_20px_rgba(232,121,249,0.3)] backdrop-blur-md group hover:bg-white/10 transition-colors">
           <div className="absolute top-0 right-0 p-2 opacity-60">
            <svg className="w-8 h-8 text-fuchsia-300 drop-shadow-[0_0_5px_fuchsia]" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z"></path></svg>
          </div>
          <p className="text-[12px] font-bold text-fuchsia-200 uppercase tracking-widest mb-1 shadow-black">最晚下线</p>
          <p className="text-3xl font-mono font-bold text-white drop-shadow-[0_0_10px_rgba(232,121,249,1)]">{data.latestLogin}</p>
        </div>
      </div>

      {/* Main Stats Card - Holo Style */}
      <div 
        className="bg-slate-900/60 backdrop-blur-xl p-6 rounded-3xl border border-white/20 shadow-2xl relative overflow-hidden"
        style={{ transform: 'translateZ(60px)' }}
      >
        {/* Shine */}
        <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-br from-white/10 to-transparent pointer-events-none"></div>

        <div className="relative z-10 flex flex-col h-full">
            <div className="flex justify-between items-start mb-6">
                <div>
                    <div className="text-6xl font-black text-transparent bg-clip-text bg-gradient-to-r from-cyan-300 to-blue-500 drop-shadow-[0_0_15px_rgba(34,211,238,0.6)]">
                        {data.tasksCompleted}
                    </div>
                    <div className="text-xs text-cyan-100 font-bold mt-1 tracking-widest">任务达成 (项)</div>
                </div>
                <div className="bg-white/10 rounded-lg p-3 text-center backdrop-blur-md border border-white/20">
                    <div className="text-2xl font-bold text-green-300 drop-shadow-[0_0_5px_rgba(74,222,128,0.8)]">{data.totalLogins}</div>
                    <div className="text-[10px] text-gray-300 uppercase font-bold">登录次数</div>
                </div>
            </div>

            <div className="h-40 w-full mt-auto" style={{ transform: 'translateZ(10px)' }}>
            <ResponsiveContainer width="100%" height="100%">
                <BarChart data={monthlyData}>
                <defs>
                    <linearGradient id="colorTasks" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#22d3ee" stopOpacity={1}/>
                    <stop offset="95%" stopColor="#22d3ee" stopOpacity={0.2}/>
                    </linearGradient>
                    <linearGradient id="colorTasksInactive" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#475569" stopOpacity={0.8}/>
                    <stop offset="95%" stopColor="#475569" stopOpacity={0.2}/>
                    </linearGradient>
                </defs>
                <XAxis dataKey="name" stroke="#cbd5e1" fontSize={12} tickLine={false} axisLine={false} dy={10} fontWeight="bold" />
                <Tooltip 
                    cursor={{fill: 'rgba(255,255,255,0.1)'}}
                    contentStyle={{ backgroundColor: 'rgba(15, 23, 42, 0.9)', border: '1px solid #22d3ee', borderRadius: '12px', color: '#fff', boxShadow: '0 0 15px rgba(34,211,238,0.3)' }}
                    itemStyle={{ color: '#22d3ee', fontWeight: 'bold' }}
                />
                <Bar dataKey="tasks" radius={[6, 6, 0, 0]} animationDuration={1500}>
                    {monthlyData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={index === 2 ? "url(#colorTasks)" : "url(#colorTasksInactive)"} stroke={index === 2 ? "#67e8f9" : "transparent"} strokeWidth={index === 2 ? 2 : 0} />
                    ))}
                </Bar>
                </BarChart>
            </ResponsiveContainer>
            </div>
        </div>
      </div>
      
      <p className="text-center text-xs text-cyan-200/50 italic font-bold tracking-widest" style={{ transform: 'translateZ(10px)' }}>// EFFICIENCY IS KEY</p>
    </div>
  );
};

export default WorkStatsSection;