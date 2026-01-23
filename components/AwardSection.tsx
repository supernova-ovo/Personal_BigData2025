import React from 'react';
import { AnnualReportData } from '../types';

interface AwardSectionProps {
  data: AnnualReportData;
}

const AwardSection: React.FC<AwardSectionProps> = ({ data }) => {
  const awards = data.JiangLi ? data.JiangLi.split(/[,;，；]/).filter(s => s.trim()) : [];

  return (
    <div className="w-full relative flex flex-col items-center justify-center h-full" style={{ transformStyle: 'preserve-3d' }}>
      
      {/* Background Rays */}
      <div className="absolute inset-0 w-full h-full pointer-events-none mix-blend-screen opacity-50" style={{ transform: 'translateZ(-100px)' }}>
        <div className="absolute top-[-50%] left-1/2 -translate-x-1/2 w-[200px] h-[800px] bg-gradient-to-b from-red-500/20 to-transparent rotate-12 blur-3xl"></div>
        <div className="absolute top-[-50%] left-1/2 -translate-x-1/2 w-[200px] h-[800px] bg-gradient-to-b from-yellow-500/20 to-transparent -rotate-12 blur-3xl"></div>
      </div>

      <div className="mb-6" style={{ transform: 'translateZ(60px)' }}>
           <div className="w-20 h-20 mx-auto bg-gradient-to-br from-yellow-300 to-yellow-600 rounded-full flex items-center justify-center shadow-[0_0_40px_rgba(234,179,8,0.6)] animate-bounce">
                <svg className="w-10 h-10 text-yellow-950" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 2a1 1 0 011 1v1.323l3.954 1.582 1.699-3.181a1 1 0 011.827.954L17.187 7H18a1 1 0 110 2h-.838l.118.06a1 1 0 010 1.766l-.118.06H18a1 1 0 110 2h-.813l1.295 2.278a1 1 0 01-1.827.954L14.954 16.5 11 18.08V19a1 1 0 11-2 0v-.92l-3.954-1.581-1.699 3.182a1 1 0 01-1.827-.954L2.813 16.5h-.838a1 1 0 010-2h.838l-.118-.06a1 1 0 010-1.766l.118-.06H2a1 1 0 110-2h.813L1.518 8.441a1 1 0 011.827-.954L5.046 10.677 9 9.096V3a1 1 0 011-1z" clipRule="evenodd" />
                </svg>
           </div>
      </div>

      <h2 className="text-5xl font-black text-center text-transparent bg-clip-text bg-gradient-to-r from-yellow-200 via-orange-400 to-red-500 drop-shadow-sm mb-8" style={{ transform: 'translateZ(40px)' }}>
        荣耀加冕
      </h2>

      {/* Awards List */}
      <div className="w-full max-w-xs space-y-4" style={{ transform: 'translateZ(20px)' }}>
          {awards.length > 0 ? awards.map((award, i) => (
             <div key={i} className="bg-gradient-to-r from-red-900/60 to-black/60 border border-yellow-500/40 p-4 rounded-xl shadow-lg relative overflow-hidden group">
                  <div className="absolute top-0 left-0 w-1 h-full bg-yellow-400"></div>
                  <div className="absolute -right-4 -top-4 w-12 h-12 bg-white/10 rounded-full blur-xl group-hover:bg-yellow-400/20 transition-colors"></div>
                  <p className="text-lg font-bold text-white text-center">{award}</p>
             </div>
          )) : (
             <div className="text-center opacity-60">
                 <p className="text-sm text-gray-400">默默耕耘，静待花开</p>
             </div>
          )}
          
          <div className="text-center mt-6">
              <span className="text-xs text-yellow-500/80 font-mono tracking-widest">AWARDS: {data.JiangLiS}</span>
          </div>
      </div>
    </div>
  );
};

export default AwardSection;