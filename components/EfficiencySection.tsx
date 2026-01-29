import React from 'react';
import { AnnualReportData } from '../types';

interface EfficiencySectionProps {
    data: AnnualReportData;
}

const EfficiencySection: React.FC<EfficiencySectionProps> = ({ data }) => {
    return (
        <div className="w-full relative flex flex-col items-center justify-center h-full px-4" style={{ transformStyle: 'preserve-3d' }}>

            {/* Background HUD */}
            <div className="absolute inset-0 pointer-events-none" style={{ transform: 'translateZ(-80px)' }}>
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[300px] h-[300px] border border-fuchsia-500/20 rounded-full animate-spin-slow border-dashed"></div>
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[250px] h-[250px] border border-cyan-500/20 rounded-full animate-[spin_10s_linear_infinite_reverse]"></div>
            </div>

            <h2 className="text-4xl font-black italic text-transparent bg-clip-text bg-gradient-to-r from-fuchsia-400 to-purple-400 mb-8 self-end pr-4 border-r-4 border-fuchsia-500 text-right leading-tight" style={{ transform: 'translateZ(50px)' }}>
                效能·风暴
            </h2>

            {/* APM Core Stats */}
            <div className="relative w-48 h-48 flex items-center justify-center mb-8" style={{ transform: 'translateZ(60px)' }}>
                <div className="absolute inset-0 bg-fuchsia-500/10 rounded-full blur-xl animate-pulse"></div>
                <div className="relative z-10 text-center">
                    <p className="text-5xl font-black text-white drop-shadow-[0_0_10px_rgba(232,121,249,0.8)]">{(data.Apm || 0).toLocaleString()}</p>
                    <p className="text-xs font-bold text-fuchsia-300 tracking-[0.3em] mt-1">总操作数</p>
                    {data.Apmpx !== null && <p className="text-[9px] text-gray-400 mt-1">操作数击败 {data.Apmpx}% 用户</p>}
                </div>
                {/* Rotating Rings */}
                <div className="absolute w-full h-full border-t-2 border-fuchsia-500 rounded-full animate-spin"></div>
            </div>

            {/* 2x2 Detail Grid */}
            <div className="grid grid-cols-2 gap-3 w-full max-w-sm" style={{ transform: 'translateZ(30px)' }}>

                {/* Tasks */}
                <div className="bg-slate-900/80 border border-fuchsia-500/30 p-3 rounded-lg backdrop-blur-sm">
                    <p className="text-[10px] text-gray-400">已办任务</p>
                    <p className="text-xl font-bold text-white">{data.YiBanSL || '0'}</p>
                    <div className="flex items-center mt-1">
                        <div className="h-1 flex-1 bg-gray-700 rounded-full mr-2">
                            <div className="h-full bg-fuchsia-500" style={{ width: '80%' }}></div>
                        </div>
                        {data.YiBanTB !== null && (
                            <span className={`text-[9px] ${data.YiBanTB >= 0 ? 'text-green-400' : 'text-red-400'}`}>
                                {data.YiBanTB > 0 ? '+' : ''}{data.YiBanTB}
                            </span>
                        )}
                    </div>
                </div>

                {/* Rate */}
                <div className="bg-slate-900/80 border border-purple-500/30 p-3 rounded-lg backdrop-blur-sm">
                    <p className="text-[10px] text-gray-400">处理率</p>
                    <p className="text-xl font-bold text-white">{data.ChuLiL || 0}%</p>
                    <p className="text-[9px] text-gray-500 mt-1">平均耗时: {(Number(data.PingJunCLSC || 0) / 60).toFixed(1)}小时</p>
                </div>

                {/* PC vs App */}
                <div className="col-span-2 bg-black/60 border border-white/10 p-3 rounded-lg flex items-center justify-between">
                    <div className="flex flex-col items-center w-1/2 border-r border-white/10">
                        <span className="text-[10px] text-cyan-300 uppercase">客户端操作数</span>
                        <span className="text-lg font-bold text-white">{Number(data.Client_APM || 0).toLocaleString()}</span>
                    </div>
                    <div className="flex flex-col items-center w-1/2">
                        <span className="text-[10px] text-pink-300 uppercase">App 操作数</span>
                        <span className="text-lg font-bold text-white">{Number(data.App_APM || 0).toLocaleString()}</span>
                    </div>
                </div>

            </div>

            {/* Most Used App */}
            <div className="mt-6 flex items-center space-x-2 bg-black/60 px-4 py-2 rounded-full border border-white/20" style={{ transform: 'translateZ(20px)' }}>
                <span className="text-xs text-gray-400">最常用业务:</span>
                <span className="text-sm font-bold text-transparent bg-clip-text bg-gradient-to-r from-fuchsia-400 to-cyan-400">
                    {data.ZuiDuoYW || '暂无数据'}
                </span>
            </div>

        </div>
    );
};

export default EfficiencySection;