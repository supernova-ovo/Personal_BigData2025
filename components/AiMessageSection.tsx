
import React, { useEffect, useState, useRef } from 'react';
import { AnnualReportData } from '../types';
import { generateInspiringMessage } from '../services/geminiService';

interface AiMessageSectionProps {
  data: AnnualReportData;
  onRestart?: () => void;
}

const AiMessageSection: React.FC<AiMessageSectionProps> = ({ data, onRestart }) => {
  const [message, setMessage] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(true);

  // 使用 ref 来追踪当前请求的标识符
  const currentRequestKeyRef = useRef<string>('');
  // 追踪是否有请求正在进行中
  const isRequestInProgressRef = useRef<boolean>(false);
  // 追踪已完成的请求，避免重复设置
  const completedRequestRef = useRef<string>('');


  useEffect(() => {
    // 生成唯一的请求标识符
    const requestKey = `${data.GongHao} -${data.NianFen} `;

    // 如果已经有相同数据的消息，直接使用（避免重复请求）
    if (currentRequestKeyRef.current === requestKey && message && message.trim()) {
      setLoading(false);
      return;
    }

    // 如果有请求正在进行中且是相同的数据，跳过（防止React.StrictMode双重调用）
    if (isRequestInProgressRef.current && currentRequestKeyRef.current === requestKey) {
      return;
    }

    // 更新当前请求标识符和请求状态
    currentRequestKeyRef.current = requestKey;
    isRequestInProgressRef.current = true;

    // 如果数据变化了，重置状态
    setLoading(true);
    if (!message) {
      setMessage('');
    }

    let isMounted = true;

    const fetchMessage = async () => {
      try {
        const msg = await generateInspiringMessage(data);

        // 如果这个请求已经处理过，跳过
        if (completedRequestRef.current === requestKey) {
          isRequestInProgressRef.current = false;
          return;
        }

        // 再次检查请求标识符是否仍然匹配（防止数据在请求期间变化）
        if (isMounted && currentRequestKeyRef.current === requestKey) {
          completedRequestRef.current = requestKey;
          isRequestInProgressRef.current = false;

          if (msg && typeof msg === 'string' && msg.trim()) {
            const trimmedMsg = msg.trim();

            // 使用函数式更新确保状态正确设置
            setMessage(() => trimmedMsg);
            setLoading(() => false);
          } else {
            const defaultMsg = "这一年你付出了惊人的努力，数据见证了你的成长与坚韧。愿你的未来如星辰般璀璨！";
            setMessage(() => defaultMsg);
            setLoading(() => false);
          }
        } else {
          isRequestInProgressRef.current = false;
        }
      } catch (error) {
        console.error('❌ [AiMessageSection] AI消息获取失败:', error);
        isRequestInProgressRef.current = false;

        if (isMounted && currentRequestKeyRef.current === requestKey) {
          const errorMsg = "你的辛勤耕耘铸就了我们今年的辉煌。数据无言，却震耳欲聋。";
          setMessage(errorMsg);
          setLoading(false);
        }
      }
    };

    fetchMessage();

    return () => {
      isMounted = false;
      // 在cleanup时重置请求进行中标志和完成标志
      // 这样React.StrictMode的第二次执行可以正常进行
      if (isRequestInProgressRef.current) {
        isRequestInProgressRef.current = false;
      }
      // 注意：不重置completedRequestRef，这样如果第一次请求已完成，第二次执行时会跳过
      // 但如果第一次请求还没完成，第二次执行时会再次发起请求（这是可以接受的）
    };
    // 使用稳定的标识符作为依赖，避免对象引用变化导致的重复调用
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [data.GongHao, data.NianFen]);

  return (
    <div className="w-full h-full flex flex-col justify-center items-center" style={{ transformStyle: 'preserve-3d' }}>
      <div className="mb-8 text-center" style={{ transform: 'translateZ(60px)' }}>
        <h2 className="text-6xl font-black text-white drop-shadow-[0_0_15px_rgba(167,139,250,0.8)]">
          未来<span className="text-transparent bg-clip-text bg-gradient-to-r from-fuchsia-400 to-cyan-400">寄语</span>
        </h2>
      </div>

      {/* Iridescent Holographic Card */}
      <div className="relative group w-full max-w-xs sm:max-w-md md:max-w-lg lg:max-w-2xl px-4" style={{ transformStyle: 'preserve-3d', transform: 'translateZ(30px)' }}>
        {/* Rainbow Blur Background */}
        <div className="absolute -inset-2 bg-gradient-to-r from-cyan-500 via-purple-500 to-pink-500 rounded-3xl blur-xl opacity-70 group-hover:opacity-100 transition duration-1000 animate-pulse"></div>

        <div className="relative p-0.5 rounded-3xl bg-gradient-to-br from-white/60 to-white/10 backdrop-blur-2xl border border-white/40 shadow-2xl">

          <div className="bg-black/60 rounded-[22px] p-6 sm:p-8 md:p-10 min-h-[340px] flex flex-col items-center justify-center relative overflow-hidden backdrop-blur-xl">

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
                <p className="text-white text-xs font-bold animate-pulse tracking-widest">分析数据中...</p>
              </div>
            ) : (
              <div className="relative z-10 text-center w-full" style={{ transform: 'translateZ(20px)' }}>
                {message ? (
                  <>
                    <p className="text-sm sm:text-base md:text-lg lg:text-xl leading-normal text-transparent bg-clip-text bg-gradient-to-br from-white via-blue-100 to-purple-200 font-bold tracking-wide drop-shadow-sm animate-fade-in-up break-words px-2">
                      {message}
                    </p>
                    <div className="mt-8 flex justify-center">
                      <div className="h-1 w-24 bg-gradient-to-r from-cyan-500 via-white to-fuchsia-500 rounded-full shadow-[0_0_15px_white]"></div>
                    </div>
                  </>
                ) : (
                  <div className="text-center">
                    <p className="text-lg text-yellow-400 mb-2">⚠️ 消息加载中...</p>
                    <p className="text-sm text-gray-400">如果长时间未显示，请刷新页面重试</p>
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
      </div>

      <div className="mt-12 w-full px-4" style={{ transform: 'translateZ(50px)' }}>
        <button
          onClick={() => {
            if (onRestart) {
              onRestart();
            } else {
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }
          }}
          className="w-full py-4 relative overflow-hidden group bg-white text-black font-black uppercase tracking-widest rounded-2xl transition-all hover:scale-105 active:scale-95 shadow-[0_0_30px_rgba(255,255,255,0.4)]"
        >
          <div className="absolute inset-0 bg-gradient-to-r from-cyan-400 via-white to-fuchsia-400 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
          <span className="relative z-10 group-hover:text-black transition-colors text-lg flex items-center justify-center gap-2">
            <span>再看一遍</span>
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" /></svg>
          </span>
        </button>
      </div>
    </div>
  );
};

export default AiMessageSection;