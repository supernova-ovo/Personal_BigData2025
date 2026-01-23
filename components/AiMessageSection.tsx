import React, { useEffect, useState } from 'react';
import { AnnualReportData } from '../types';
import { generateInspiringMessage } from '../services/geminiService';

interface AiMessageSectionProps {
  data: AnnualReportData;
}

const AiMessageSection: React.FC<AiMessageSectionProps> = ({ data }) => {
  const [message, setMessage] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    let isMounted = true;
    const fetchMessage = async () => {
      const msg = await generateInspiringMessage(data);
      if (isMounted) {
        setMessage(msg);
        setLoading(false);
      }
    };
    fetchMessage();

    return () => {
      isMounted = false;
    };
  }, [data]);

  return (
    <div className="w-full h-full flex flex-col justify-center items-center" style={{ transformStyle: 'preserve-3d' }}>
      <div className="mb-8 text-center" style={{ transform: 'translateZ(60px)' }}>
        <div className="inline-flex items-center space-x-2 px-4 py-1.5 rounded-full bg-white/10 border border-white/40 backdrop-blur-md mb-4 shadow-[0_0_20px_rgba(255,255,255,0.3)] animate-float">
             <div className="w-2 h-2 bg-fuchsia-400 rounded-full animate-ping shadow-[0_0_10px_fuchsia]"></div>
             <span className="text-[10px] font-bold text-white uppercase tracking-[0.2em]">AI Intelligence</span>
        </div>
        <h2 className="text-6xl font-black text-white drop-shadow-[0_0_15px_rgba(167,139,250,0.8)]">
          未来<span className="text-transparent bg-clip-text bg-gradient-to-r from-fuchsia-400 to-cyan-400">寄语</span>
        </h2>
      </div>

      {/* Iridescent Holographic Card */}
      <div className="relative group w-full max-w-sm" style={{ transformStyle: 'preserve-3d', transform: 'translateZ(30px)' }}>
        {/* Rainbow Blur Background */}
        <div className="absolute -inset-2 bg-gradient-to-r from-cyan-500 via-purple-500 to-pink-500 rounded-3xl blur-xl opacity-70 group-hover:opacity-100 transition duration-1000 animate-pulse"></div>
        
        <div className="relative p-0.5 rounded-3xl bg-gradient-to-br from-white/60 to-white/10 backdrop-blur-2xl border border-white/40 shadow-2xl">
           
           <div className="bg-black/60 rounded-[22px] p-8 min-h-[340px] flex flex-col items-center justify-center relative overflow-hidden backdrop-blur-xl">
             
             {/* Prismatic Overlay */}
             <div className="absolute inset-0 bg-gradient-to-tr from-white/5 via-transparent to-white/5 pointer-events-none"></div>
             
             {/* Tech Corners */}
             <div className="absolute top-5 left-5 w-4 h-4 border-t-2 border-l-2 border-cyan-400 shadow-[0_0_10px_cyan]"></div>
             <div className="absolute bottom-5 right-5 w-4 h-4 border-b-2 border-r-2 border-fuchsia-400 shadow-[0_0_10px_fuchsia]"></div>

             {loading ? (
               <div className="flex flex-col items-center space-y-4">
                 <div className="relative w-16 h-16">
                    <div className="absolute inset-0 border-4 border-white/20 rounded-full"></div>
                    <div className="absolute inset-0 border-4 border-t-cyan-400 border-r-fuchsia-400 border-b-transparent border-l-transparent rounded-full animate-spin"></div>
                 </div>
                 <p className="text-white text-xs font-bold animate-pulse tracking-widest">ANALYZING DATA...</p>
               </div>
             ) : (
               <div className="relative z-10 text-center" style={{ transform: 'translateZ(20px)' }}>
                   <p className="text-xl md:text-2xl leading-relaxed text-transparent bg-clip-text bg-gradient-to-br from-white via-blue-100 to-purple-200 font-bold tracking-wide drop-shadow-sm animate-fade-in-up">
                    {message}
                   </p>
                   <div className="mt-8 flex justify-center">
                       <div className="h-1 w-24 bg-gradient-to-r from-cyan-500 via-white to-fuchsia-500 rounded-full shadow-[0_0_15px_white]"></div>
                   </div>
               </div>
             )}
           </div>
        </div>
      </div>

      <div className="mt-12 w-full px-4" style={{ transform: 'translateZ(50px)' }}>
        <button className="w-full py-4 relative overflow-hidden group bg-white text-black font-black uppercase tracking-widest rounded-2xl transition-all hover:scale-105 active:scale-95 shadow-[0_0_30px_rgba(255,255,255,0.4)]">
           <div className="absolute inset-0 bg-gradient-to-r from-cyan-400 via-white to-fuchsia-400 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
           <span className="relative z-10 group-hover:text-black transition-colors text-lg flex items-center justify-center gap-2">
             <span>分享我的高光时刻</span>
             <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.368 2.684 3 3 0 00-5.368-2.684z" /></svg>
           </span>
        </button>
      </div>
    </div>
  );
};

export default AiMessageSection;