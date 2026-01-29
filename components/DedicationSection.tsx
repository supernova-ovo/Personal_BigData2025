import React from 'react';
import { AnnualReportData } from '../types';

interface DedicationSectionProps {
    data: AnnualReportData;
}

const DedicationSection: React.FC<DedicationSectionProps> = ({ data }) => {

    // Helper to determine arrow direction
    const renderTrend = (val: number | null) => {
        if (val === null || val === undefined) return null;
        const isPos = val > 0;
        return (
            <span className={`text-[10px] font-bold ml-1 ${isPos ? 'text-green-400' : 'text-red-400'}`}>
                {isPos ? '▲' : '▼'} {Math.abs(val)}
            </span>
        );
    };

    // Safe time extraction
    const safeTime = (timeStr: string | null) => {
        if (!timeStr) return '--:--';
        try {
            // 处理 ISO 8601 格式: 2019-01-01T08:14:50.970000
            if (timeStr.includes('T')) {
                const timePart = timeStr.split('T')[1];
                // 提取 HH:mm:ss 部分（去掉毫秒）
                const timeOnly = timePart.split('.')[0];
                // 只显示 HH:mm
                return timeOnly.split(':').slice(0, 2).join(':');
            }
            // 处理空格分隔的格式: "2019-01-01 08:14:50"
            if (timeStr.includes(' ')) {
                const timePart = timeStr.split(' ')[1];
                return timePart.split(':').slice(0, 2).join(':');
            }
            // 如果已经是时间格式，直接返回
            return timeStr;
        } catch (e) {
            console.error('时间解析错误:', e, timeStr);
            return '--:--';
        }
    };

    const safeDate = (dateStr: string | null) => {
        if (!dateStr) return '未知日期';
        try {
            // 处理 ISO 8601 格式: 2019-01-01T08:14:50.970000
            if (dateStr.includes('T')) {
                return dateStr.split('T')[0];
            }
            // 处理空格分隔的格式: "2019-01-01 08:14:50"
            if (dateStr.includes(' ')) {
                return dateStr.split(' ')[0];
            }
            // 如果已经是日期格式，直接返回
            return dateStr;
        } catch (e) {
            console.error('日期解析错误:', e, dateStr);
            return '未知日期';
        }
    };

    return (
        <div className="w-full relative flex flex-col items-center justify-center h-full px-4" style={{ transformStyle: 'preserve-3d' }}>

            {/* Background Graphics */}
            <div className="absolute inset-0 pointer-events-none opacity-20" style={{ transform: 'translateZ(-100px)' }}>
                <div className="absolute top-20 right-10 w-40 h-40 border border-cyan-500/30 rounded-full animate-ping"></div>
                <div className="absolute bottom-20 left-10 w-60 h-60 border border-blue-500/20 rounded-full animate-pulse"></div>
            </div>

            <div className="flex items-center space-x-2 mb-6" style={{ transform: 'translateZ(60px)' }}>
                <h2 className="text-4xl font-black italic text-transparent bg-clip-text bg-gradient-to-r from-cyan-300 to-blue-400 leading-tight px-4 py-1">
                    坚守·时光
                </h2>
            </div>

            {/* Main Stats: On Duty Hours */}
            <div className="relative w-full max-w-sm mb-8" style={{ transform: 'translateZ(40px)' }}>
                <div className="bg-slate-900/80 backdrop-blur-xl border border-cyan-500/30 p-6 rounded-2xl shadow-[0_0_30px_rgba(6,182,212,0.15)] text-center relative overflow-hidden">
                    <div className="absolute top-0 left-0 w-1 h-full bg-cyan-500"></div>
                    <p className="text-xs text-cyan-200/70 uppercase tracking-widest font-bold mb-2">全年在岗总时长</p>
                    <div className="flex items-baseline justify-center">
                        <span className="text-5xl font-black text-white drop-shadow-md">{Number(data.ZaiGangZSC || 0).toFixed(0)}</span>
                        <span className="text-sm text-cyan-400 ml-1 font-bold">小时</span>
                    </div>
                    <div className="mt-2 flex justify-center items-center opacity-80">
                        <span className="text-xs text-gray-400">同比</span>
                        {renderTrend(data.ZaiGangTB)}
                    </div>
                </div>
            </div>

            {/* Grid: Dedication Metrics */}
            <div className="grid grid-cols-2 gap-3 w-full max-w-sm" style={{ transform: 'translateZ(20px)' }}>

                {/* Login Count */}
                <div className="bg-black/50 border border-white/10 p-4 rounded-xl backdrop-blur-md">
                    <div className="flex justify-between items-start mb-1">
                        <span className="text-[10px] text-gray-400 uppercase">登录次数</span>
                        {renderTrend(data.DengLuTB)}
                    </div>
                    <p className="text-2xl font-bold text-white">{data.DengLuCS || 0}</p>

                    {data.DengLuPX !== null && (
                        <>
                            <div className="w-full bg-gray-800 h-1 mt-2 rounded-full overflow-hidden">
                                <div className="bg-blue-500 h-full" style={{ width: `${Math.min(Number(data.DengLuPX), 100)}%` }}></div>
                            </div>
                            <p className="text-[9px] text-blue-300 mt-1 text-right">超越 {data.DengLuPX}% 同事</p>
                        </>
                    )}
                </div>

                {/* Hardest Day */}
                <div className="bg-black/50 border border-white/10 p-4 rounded-xl backdrop-blur-md relative overflow-hidden">
                    <div className="absolute top-0 right-0 p-1">
                        <div className="w-2 h-2 bg-red-500 rounded-full animate-pulse shadow-[0_0_5px_red]"></div>
                    </div>
                    <p className="text-[10px] text-gray-400 uppercase">最长在岗</p>
                    <p className="text-2xl font-bold text-white">{data.RiZuiCZG || 0} <span className="text-xs font-normal">小时</span></p>
                    <p className="text-[9px] text-gray-400 mt-1">{safeDate(data.RiZuiCZG_Date)}</p>
                </div>

                {/* Earliest */}
                <div className="bg-black/50 border border-white/10 p-4 rounded-xl backdrop-blur-md">
                    <p className="text-[10px] text-cyan-200 uppercase">最早上线</p>
                    <p className="text-xl font-mono font-bold text-white mt-1">{safeTime(data.ZuiZaoSX)}</p>
                    <p className="text-[9px] text-gray-500 mt-1">披星戴月</p>
                </div>

                {/* Latest */}
                <div className="bg-black/50 border border-white/10 p-4 rounded-xl backdrop-blur-md">
                    <p className="text-[10px] text-purple-200 uppercase">最晚下线</p>
                    <p className="text-xl font-mono font-bold text-white mt-1">{safeTime(data.ZuiWanXX)}</p>
                    <p className="text-[9px] text-gray-500 mt-1">坚守时刻</p>
                </div>

            </div>

            {/* Tenure Stripe */}
            <div className="mt-6 w-full max-w-sm px-2" style={{ transform: 'translateZ(10px)' }}>
                <div className="flex items-center justify-between text-xs text-gray-400 mb-1">
                    <span>司龄 {data.GongLingN || 0} 年 ({data.GongLingT || 0}天)</span>
                    {data.GongLingPX !== null && <span>资深程度: Top {data.GongLingPX}%</span>}
                </div>
                <div className="w-full h-1.5 bg-gray-800 rounded-full overflow-hidden border border-white/10">
                    <div
                        className="h-full bg-gradient-to-r from-cyan-600 to-blue-600 shadow-[0_0_10px_cyan]"
                        style={{ width: `${Number(data.GongLingPX || 0)}%` }}
                    ></div>
                </div>
            </div>

        </div>
    );
};

export default DedicationSection;