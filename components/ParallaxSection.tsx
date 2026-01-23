import React, { ReactNode, useRef, useEffect, useState } from 'react';

interface ParallaxSectionProps {
  children: ReactNode;
  index: number;
  onInView: (index: number) => void;
  id?: string;
}

const ParallaxSection: React.FC<ParallaxSectionProps> = ({ children, index, onInView, id }) => {
  const sectionRef = useRef<HTMLElement>(null);
  const bg1Ref = useRef<HTMLDivElement>(null);
  const bg2Ref = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    // 1. Setup Intersection Observer for Visibility and Active State
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setIsVisible(true);
            onInView(index);
          }
        });
      },
      { threshold: 0.5 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    // 2. Setup Parallax Logic
    let currentX = 0;
    let currentY = 0;
    let targetX = 0;
    let targetY = 0;
    let rafId: number;
    let hasOrientation = false;

    const animate = () => {
      const ease = 0.1;
      currentX += (targetX - currentX) * ease;
      currentY += (targetY - currentY) * ease;

      if (bg1Ref.current) {
        bg1Ref.current.style.transform = `translate(${-currentX * 180}px, ${-currentY * 180}px) scale(1.3)`;
      }
      if (bg2Ref.current) {
        bg2Ref.current.style.transform = `translate(${currentX * 100}px, ${currentY * 100}px) scale(1.2)`;
      }
      if (contentRef.current) {
        contentRef.current.style.transform = `perspective(800px) rotateX(${currentY * 35}deg) rotateY(${-currentX * 35}deg)`;
      }

      rafId = requestAnimationFrame(animate);
    };
    
    animate();

    const handleInput = (clientX: number, clientY: number) => {
      if (hasOrientation) return;
      const { innerWidth, innerHeight } = window;
      targetX = (clientX / innerWidth) - 0.5;
      targetY = (clientY / innerHeight) - 0.5;
    };

    const handleMouseMove = (e: MouseEvent) => handleInput(e.clientX, e.clientY);
    const handleTouchMove = (e: TouchEvent) => {
      if (e.touches.length > 0) {
        handleInput(e.touches[0].clientX, e.touches[0].clientY);
      }
    };

    const handleOrientation = (e: DeviceOrientationEvent) => {
      if (e.gamma === null || e.beta === null) return;
      hasOrientation = true;
      const gamma = e.gamma || 0; 
      const beta = e.beta || 0;
      const clampedGamma = Math.max(-40, Math.min(40, gamma));
      targetX = clampedGamma / 80;
      const clampedBeta = Math.max(5, Math.min(85, beta));
      targetY = (clampedBeta - 45) / 80;
    };

    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('touchmove', handleTouchMove, { passive: true });
    window.addEventListener('deviceorientation', handleOrientation);

    return () => {
      if (sectionRef.current) observer.unobserve(sectionRef.current);
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('touchmove', handleTouchMove);
      window.removeEventListener('deviceorientation', handleOrientation);
      cancelAnimationFrame(rafId);
    };
  }, [index, onInView]);

  return (
    <section 
      ref={sectionRef}
      id={id}
      className="h-screen w-full snap-start relative flex flex-col justify-center items-center overflow-hidden bg-transparent"
      style={{ perspective: '800px' }} 
    >
      {/* Floating Particles - Updated for Higher Visibility */}
      <div 
        ref={bg1Ref}
        className={`absolute inset-0 z-0 pointer-events-none transition-opacity duration-1000 ${isVisible ? 'opacity-70' : 'opacity-0'}`}
      >
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-gradient-to-tr from-white/10 to-transparent rounded-full blur-3xl animate-pulse mix-blend-screen"></div>
        <div className="absolute bottom-1/4 right-1/4 w-[500px] h-[500px] bg-gradient-to-bl from-white/10 to-transparent rounded-full blur-3xl animate-float-delayed mix-blend-screen"></div>
      </div>

      <div 
        ref={bg2Ref}
        className={`absolute inset-0 z-0 pointer-events-none mix-blend-screen transition-opacity duration-1000 ${isVisible ? 'opacity-80' : 'opacity-0'}`}
      >
         {/* Brighter, more defined particles */}
         <div className="absolute top-10 right-20 w-2 h-2 bg-white rounded-full animate-ping shadow-[0_0_10px_white]"></div>
         <div className="absolute bottom-20 left-10 w-1.5 h-1.5 bg-cyan-300 rounded-full shadow-[0_0_10px_cyan]"></div>
         <div className="absolute top-1/2 left-1/2 w-2 h-2 bg-purple-300 rounded-full opacity-60 shadow-[0_0_10px_purple]"></div>
         <div className="absolute top-1/3 left-10 w-6 h-6 bg-blue-400/20 rounded-full blur-md animate-pulse"></div>
         <div className="absolute bottom-1/3 right-10 w-3 h-3 bg-white/40 rounded-full animate-float"></div>
      </div>
      
      {/* Content Container */}
      <div 
        className={`relative z-10 w-full max-w-md px-6 py-8 h-full flex flex-col justify-center transition-all duration-1000 ease-out ${
          isVisible ? 'opacity-100 translate-y-0 blur-0' : 'opacity-0 translate-y-20 blur-sm'
        }`}
      >
        <div 
          ref={contentRef}
          className="w-full h-full flex flex-col justify-center will-change-transform"
          style={{ transformStyle: 'preserve-3d' }}
        >
          <div className="animate-float" style={{ transformStyle: 'preserve-3d' }}>
              {children}
          </div>
        </div>
      </div>
    </section>
  );
};

export default ParallaxSection;