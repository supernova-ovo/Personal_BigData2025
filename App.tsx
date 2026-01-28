import React, { useState, useMemo, useEffect } from 'react';
import ParallaxSection from './components/ParallaxSection';
import IntroSection from './components/IntroSection';
import DedicationSection from './components/DedicationSection';
import EfficiencySection from './components/EfficiencySection';
import TravelSection from './components/TravelSection';
import EngagementSection from './components/EngagementSection';
import LearningSection from './components/LearningSection';
import AwardSection from './components/AwardSection';
import SummarySection from './components/SummarySection';
import AiMessageSection from './components/AiMessageSection';
import { AnnualReportData } from './types';
import { apiService } from './services/apiService';

// Loading and Error components
const LoadingSpinner: React.FC = () => (
  <div className="w-full h-screen flex items-center justify-center bg-[#050A1F]">
    <div className="flex flex-col items-center space-y-4">
      <div className="w-16 h-16 border-4 border-blue-500/30 border-t-blue-500 rounded-full animate-spin"></div>
      <p className="text-blue-300 text-lg font-medium">正在加载年度报告...</p>
    </div>
  </div>
);

const ErrorMessage: React.FC<{ message: string; onRetry: () => void }> = ({ message, onRetry }) => (
  <div className="w-full h-screen flex items-center justify-center bg-[#050A1F]">
    <div className="flex flex-col items-center space-y-6 max-w-md mx-auto px-4">
      <div className="w-16 h-16 bg-red-500/20 rounded-full flex items-center justify-center">
        <svg className="w-8 h-8 text-red-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.732 16.5c-.77.833.192 2.5 1.732 2.5z" />
        </svg>
      </div>
      <div className="text-center">
        <h2 className="text-xl font-bold text-white mb-2">数据加载失败</h2>
        <p className="text-gray-400 text-sm">{message}</p>
      </div>
      <button
        onClick={onRetry}
        className="px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-lg transition-colors duration-200 flex items-center space-x-2"
      >
        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
        </svg>
        <span>重试</span>
      </button>
    </div>
  </div>
);

// Deep Blue Background Gradients (#050A1F)
const sectionGradients: Record<string, string> = {
  INTRO: "bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-blue-800/40 via-[#050A1F] to-[#050A1F]",
  DEDICATION: "bg-[radial-gradient(circle_at_right,_var(--tw-gradient-stops))] from-cyan-800/30 via-[#050A1F] to-[#050A1F]",
  EFFICIENCY: "bg-[radial-gradient(ellipse_at_bottom_left,_var(--tw-gradient-stops))] from-fuchsia-800/30 via-[#050A1F] to-[#050A1F]",
  TRAVEL: "bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-teal-800/30 via-[#050A1F] to-[#050A1F]",
  LEARNING: "bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-amber-800/30 via-[#050A1F] to-[#050A1F]",
  ENGAGEMENT: "bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-violet-800/30 via-[#050A1F] to-[#050A1F]",
  AWARDS: "bg-[radial-gradient(circle_at_bottom,_var(--tw-gradient-stops))] from-red-800/30 via-[#050A1F] to-[#050A1F]",
  SUMMARY: "bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-cyan-900/40 via-[#050A1F] to-[#050A1F]",
  AI_SUMMARY: "bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-indigo-900/40 via-[#050A1F] to-[#050A1F]"
};

const App: React.FC = () => {
  const [userData, setUserData] = useState<AnnualReportData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [activeSection, setActiveSection] = useState(0);

  // Fetch user data from API
  const fetchUserData = async () => {
    try {
      setLoading(true);
      setError(null);
      console.log('🟣 [App] 开始获取用户数据...');
      const response = await apiService.getUserSummary();
      // console.log('🟣 [App] API 响应:', response);

      if (response.success && response.data) {
        // console.log('🟣 [App] 设置用户数据:', response.data);
        // console.log('🟣 [App] 数据关键字段:', {
        //   XingMing: response.data.XingMing,
        //   GongHao: response.data.GongHao,
        //   Apm: response.data.Apm,
        //   ExamCiShu: response.data.ExamCiShu,
        //   Readcnt: response.data.Readcnt,
        //   Zancnt: response.data.Zancnt
        // });
        setUserData(response.data);
      } else {
        console.error('🟣 [App] API 返回失败:', response.message);
        setError(response.message || '获取数据失败');
      }
    } catch (err) {
      console.error('🟣 [App] 获取数据异常:', err);
      setError(err instanceof Error ? err.message : '网络请求失败');
    } finally {
      setLoading(false);
    }
  };

  // Fetch data on component mount
  useEffect(() => {
    fetchUserData();
  }, []);

  // Use API data directly
  const displayData = userData;
  
  // 调试日志：检查 displayData
  useEffect(() => {
    if (displayData) {
      // console.log('🟠 [App] displayData 已设置:', displayData);
      // console.log('🟠 [App] displayData 关键字段:', {
      //   XingMing: displayData.XingMing,
      //   GongHao: displayData.GongHao,
      //   Apm: displayData.Apm,
      //   ExamCiShu: displayData.ExamCiShu,
      //   Readcnt: displayData.Readcnt,
      //   Zancnt: displayData.Zancnt,
      //   ZaiGangZSC: displayData.ZaiGangZSC,
      //   DengLuCS: displayData.DengLuCS
      // });
    } else {
      // console.log('🟠 [App] displayData 为空');
    }
  }, [displayData]);

  // Filter sections based on data availability
  const visibleSections = useMemo(() => {
    if (!displayData) return [];

    const sections = [
      {
        id: 'INTRO',
        Component: IntroSection,
        gradient: sectionGradients.INTRO,
        shouldShow: true
      },
      {
        id: 'DEDICATION',
        Component: DedicationSection,
        gradient: sectionGradients.DEDICATION,
        // Show if there is any attendance data
        shouldShow: (displayData.ZaiGangZSC || 0) > 0 || (displayData.DengLuCS || 0) > 0
      },
      {
        id: 'EFFICIENCY',
        Component: EfficiencySection,
        gradient: sectionGradients.EFFICIENCY,
        // Show if there is APM or Task data
        shouldShow: (displayData.Apm || 0) > 0 || (displayData.YiBanSL && displayData.YiBanSL !== '0')
      },
      {
        id: 'TRAVEL',
        Component: TravelSection,
        gradient: sectionGradients.TRAVEL,
        // Show if travelled
        shouldShow: (displayData.ChuChaiCS || 0) > 0
      },
      {
        id: 'LEARNING',
        Component: LearningSection,
        gradient: sectionGradients.LEARNING,
        // Show if took exams
        shouldShow: (displayData.ExamCiShu || 0) > 0
      },
      {
        id: 'ENGAGEMENT',
        Component: EngagementSection,
        gradient: sectionGradients.ENGAGEMENT,
        // Show if active in reading or liking
        shouldShow: (displayData.Readcnt || 0) > 0 || (displayData.Zancnt || 0) > 0
      },
      {
        id: 'AWARDS',
        Component: AwardSection,
        gradient: sectionGradients.AWARDS,
        // Show if has awards
        shouldShow: (displayData.JiangLiS || 0) > 0
      },
      {
        id: 'SUMMARY',
        Component: SummarySection,
        gradient: sectionGradients.SUMMARY,
        // Always show summary to consolidate stats
        shouldShow: true
      },
      {
        id: 'AI_SUMMARY',
        Component: AiMessageSection,
        gradient: sectionGradients.AI_SUMMARY,
        shouldShow: true
      }
    ];

    return sections.filter(section => section.shouldShow);
  }, [displayData]);

  // Show loading state
  if (loading) {
    return <LoadingSpinner />;
  }

  // Show error state
  if (error) {
    return <ErrorMessage message={error} onRetry={fetchUserData} />;
  }

  // Ensure data is available
  if (!displayData) {
    return <ErrorMessage message="未获取到用户数据" onRetry={fetchUserData} />;
  }

  return (
    <div className="h-screen w-full overflow-y-scroll snap-y snap-mandatory no-scrollbar text-white relative">

      {/* Global Background Layer with Deep Blue base */}
      <div className="fixed inset-0 -z-50 bg-[#050A1F]">
        {visibleSections.map((section, index) => (
          <div
            key={section.id}
            className={`absolute inset-0 transition-opacity duration-[1500ms] ease-in-out ${activeSection === index ? 'opacity-100' : 'opacity-0'
              } ${section.gradient}`}
          />
        ))}

        {/* --- POWER & CONSTRUCTION SKYLINE BACKGROUND (GLOWING EDITION) --- */}
        <div className="absolute bottom-0 left-0 w-full h-[40vh] pointer-events-none z-0 opacity-40 mix-blend-screen overflow-visible">
          <svg className="w-full h-full" viewBox="-50 -80 850 380" preserveAspectRatio="xMidYMax slice">
            <defs>
              <linearGradient id="structure-grad" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#22d3ee" stopOpacity="0.8" />
                <stop offset="100%" stopColor="#050A1F" stopOpacity="0" />
              </linearGradient>
              {/* Neon Glow Filter */}
              <filter id="neon-glow" x="-50%" y="-50%" width="200%" height="200%">
                <feGaussianBlur stdDeviation="3" result="coloredBlur" />
                <feMerge>
                  <feMergeNode in="coloredBlur" />
                  <feMergeNode in="SourceGraphic" />
                </feMerge>
              </filter>
            </defs>

            {/* Wind Turbines (Left) - Cyan Glow */}
            <g transform="translate(80, 180)" filter="url(#neon-glow)">
              {/* Turbine Tower (Fixed) */}
              <line x1="0" y1="0" x2="0" y2="120" stroke="#22d3ee" strokeWidth="2.5" strokeLinecap="round" />
              <circle cx="0" cy="0" r="3" fill="#fff" />
              {/* Turbine Blades (Rotating) */}
              <g className="animate-[spin_4s_linear_infinite]" style={{ transformOrigin: '0 0' }}>
                <path d="M0,0 L-5,-10 L0,-60 L5,-10 Z" fill="#22d3ee" stroke="#22d3ee" strokeWidth="1" />
                <path d="M0,0 L-5,-10 L0,-60 L5,-10 Z" fill="#22d3ee" stroke="#22d3ee" strokeWidth="1" transform="rotate(120)" />
                <path d="M0,0 L-5,-10 L0,-60 L5,-10 Z" fill="#22d3ee" stroke="#22d3ee" strokeWidth="1" transform="rotate(240)" />
              </g>
            </g>
            <g transform="translate(40, 220) scale(0.6)" filter="url(#neon-glow)">
              {/* Turbine Tower (Fixed) */}
              <line x1="0" y1="0" x2="0" y2="120" stroke="#22d3ee" strokeWidth="2.5" strokeLinecap="round" />
              <circle cx="0" cy="0" r="3" fill="#fff" />
              {/* Turbine Blades (Rotating) */}
              <g className="animate-[spin_6s_linear_infinite]" style={{ transformOrigin: '0 0' }}>
                <path d="M0,0 L-5,-10 L0,-60 L5,-10 Z" fill="#22d3ee" stroke="#22d3ee" strokeWidth="1" />
                <path d="M0,0 L-5,-10 L0,-60 L5,-10 Z" fill="#22d3ee" stroke="#22d3ee" strokeWidth="1" transform="rotate(120)" />
                <path d="M0,0 L-5,-10 L0,-60 L5,-10 Z" fill="#22d3ee" stroke="#22d3ee" strokeWidth="1" transform="rotate(240)" />
              </g>
            </g>

            {/* Thermal Power - Cooling Towers & Chimneys (Center-Right) - Mixed Glow */}
            <g transform="translate(550, 180)" filter="url(#neon-glow)">
              {/* Cooling Tower */}
              <path d="M-30,120 Q-10,60 -20,0 L20,0 Q10,60 30,120" fill="none" stroke="#22d3ee" strokeWidth="2" />
              {/* Grid lines on tower */}
              <path d="M-25,100 L25,100" stroke="#22d3ee" strokeWidth="0.8" opacity="0.6" />
              <path d="M-22,80 L22,80" stroke="#22d3ee" strokeWidth="0.8" opacity="0.6" />

              {/* Chimney */}
              <rect x="50" y="-40" width="12" height="160" fill="url(#structure-grad)" />
              {/* Smoke particles */}
              <circle cx="56" cy="-50" r="3" fill="#e879f9" opacity="0.6" className="animate-[float_3s_ease-out_infinite]" />
              <circle cx="56" cy="-70" r="2" fill="#e879f9" opacity="0.4" className="animate-[float_4s_ease-out_infinite_delayed]" />
            </g>

            {/* Tower Crane (Right) - Purple Glow */}
            <g transform="translate(680, 150)" filter="url(#neon-glow)">
              <line x1="0" y1="0" x2="0" y2="150" stroke="#e879f9" strokeWidth="2.5" /> {/* Mast */}
              <line x1="-20" y1="20" x2="80" y2="10" stroke="#e879f9" strokeWidth="2.5" /> {/* Jib */}
              <line x1="0" y1="0" x2="40" y2="10" stroke="#e879f9" strokeWidth="0.5" /> {/* Cable */}
              <line x1="70" y1="10" x2="70" y2="50" stroke="#e879f9" strokeWidth="1.5" /> {/* Hook cable */}
              <rect x="65" y="50" width="10" height="10" stroke="#e879f9" strokeWidth="1.5" fill="none" />
              {/* Warning Light */}
              <circle cx="0" cy="-5" r="3" fill="#ef4444" className="animate-ping" />
            </g>

            {/* Transmission Tower (Background) - Fainter Cyan Glow */}
            <g transform="translate(300, 190) scale(0.8)" opacity="0.8" filter="url(#neon-glow)">
              <path d="M0,0 L-20,100 L20,100 Z" fill="none" stroke="#22d3ee" strokeWidth="1.5" />
              <line x1="-30" y1="30" x2="30" y2="30" stroke="#22d3ee" strokeWidth="1.5" />
              <line x1="-25" y1="15" x2="25" y2="15" stroke="#22d3ee" strokeWidth="1.5" />
              {/* Power lines connecting */}
              <path d="M-30,30 Q-100,60 -200,40" fill="none" stroke="#22d3ee" strokeWidth="0.8" />
              <path d="M30,30 Q150,60 250,40" fill="none" stroke="#22d3ee" strokeWidth="0.8" />
            </g>

            {/* Solar Panels (Foreground Bottom) - Tech Grid Glow */}
            <g transform="translate(200, 260)" filter="url(#neon-glow)">
              <path d="M0,40 L20,0 L100,0 L120,40 Z" fill="url(#structure-grad)" stroke="#22d3ee" strokeWidth="1.5" opacity="0.7" />
              <line x1="30" y1="0" x2="20" y2="40" stroke="#22d3ee" strokeWidth="0.5" />
              <line x1="60" y1="0" x2="60" y2="40" stroke="#22d3ee" strokeWidth="0.5" />
              <line x1="90" y1="0" x2="100" y2="40" stroke="#22d3ee" strokeWidth="0.5" />
            </g>
            <g transform="translate(350, 270)" filter="url(#neon-glow)">
              <path d="M0,30 L15,0 L80,0 L95,30 Z" fill="url(#structure-grad)" stroke="#22d3ee" strokeWidth="1.5" opacity="0.7" />
            </g>
          </svg>
        </div>

        {/* Dark Grain Texture for contrast */}
        <div className="absolute inset-0 opacity-10 pointer-events-none mix-blend-overlay"
          style={{ backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")` }}>
        </div>

        {/* Global Orbs - Reduced opacity for better text contrast */}
        <div className={`absolute top-0 left-0 w-full h-full overflow-hidden transition-colors duration-[2000ms] ${activeSection % 2 === 0 ? 'text-blue-600' : 'text-purple-600'
          }`}>
          <div className="absolute top-[-20%] left-[-10%] w-[60vh] h-[60vh] bg-current rounded-full mix-blend-screen filter blur-[120px] opacity-10 animate-float-delayed"></div>
          <div className="absolute bottom-[-20%] right-[-10%] w-[60vh] h-[60vh] bg-cyan-900 rounded-full mix-blend-screen filter blur-[120px] opacity-10 animate-float"></div>
        </div>
      </div>

      {visibleSections.map((section, index) => (
        <ParallaxSection key={section.id} index={index} onInView={setActiveSection}>
          <section.Component data={displayData!} />
        </ParallaxSection>
      ))}

    </div>
  );
};

export default App;