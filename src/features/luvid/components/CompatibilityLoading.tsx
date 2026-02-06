"use client";

import React, { useEffect, useState } from "react";
import { createPortal } from "react-dom";

/**
 * 궁합 분석 로딩 화면 - 은하계 충돌 → 빅뱅
 */
export function CompatibilityLoading() {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    console.log("🌌 [CompatibilityLoading] Component mounted!");
    setMounted(true);
    
    document.body.style.overflow = 'hidden';
    
    return () => {
      document.body.style.overflow = '';
    };
  }, []);

  if (!mounted) {
    return null;
  }

  const content = (
    <div 
      className="fixed inset-0 flex flex-col items-center justify-center overflow-hidden"
      style={{ 
        backgroundColor: '#000000',
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        zIndex: 9999,
        width: '100vw',
        height: '100vh',
        padding: '2rem'
      }}
    >
      <div className="relative w-full h-full flex flex-col items-center justify-center">
        
        {/* 은하계 충돌 영역 */}
        <div className="relative flex items-center justify-center" style={{ minHeight: '500px', width: '100%', maxWidth: '800px' }}>
          
          {/* Left Galaxy Core (Indigo/Purple) */}
          <div className="galaxy-left absolute" style={{ width: '320px', height: '320px' }}>
            {/* Core */}
            <div 
              className="absolute inset-0 rounded-full blur-3xl"
              style={{
                background: 'radial-gradient(circle, rgba(99, 102, 241, 1) 0%, rgba(139, 92, 246, 0.9) 30%, rgba(99, 102, 241, 0.4) 60%, transparent 100%)',
                mixBlendMode: 'screen',
              }}
            />
            {/* Particles */}
            <div className="particle particle-l1 absolute w-3 h-3 rounded-full bg-indigo-300 blur-sm" />
            <div className="particle particle-l2 absolute w-2 h-2 rounded-full bg-purple-400 blur-sm" />
            <div className="particle particle-l3 absolute w-4 h-4 rounded-full bg-indigo-400 blur-sm" />
            <div className="particle particle-l4 absolute w-2 h-2 rounded-full bg-purple-300 blur-sm" />
            <div className="particle particle-l5 absolute w-3 h-3 rounded-full bg-indigo-200 blur-sm" />
            <div className="particle particle-l6 absolute w-2 h-2 rounded-full bg-purple-200 blur-sm" />
          </div>
          
          {/* Right Galaxy Core (Pink/Orange) */}
          <div className="galaxy-right absolute" style={{ width: '320px', height: '320px' }}>
            {/* Core */}
            <div 
              className="absolute inset-0 rounded-full blur-3xl"
              style={{
                background: 'radial-gradient(circle, rgba(236, 72, 153, 1) 0%, rgba(251, 146, 60, 0.9) 30%, rgba(236, 72, 153, 0.4) 60%, transparent 100%)',
                mixBlendMode: 'screen',
              }}
            />
            {/* Particles */}
            <div className="particle particle-r1 absolute w-3 h-3 rounded-full bg-pink-300 blur-sm" />
            <div className="particle particle-r2 absolute w-2 h-2 rounded-full bg-orange-400 blur-sm" />
            <div className="particle particle-r3 absolute w-4 h-4 rounded-full bg-pink-400 blur-sm" />
            <div className="particle particle-r4 absolute w-2 h-2 rounded-full bg-orange-300 blur-sm" />
            <div className="particle particle-r5 absolute w-3 h-3 rounded-full bg-pink-200 blur-sm" />
            <div className="particle particle-r6 absolute w-2 h-2 rounded-full bg-orange-200 blur-sm" />
          </div>

          {/* Big Bang Explosion */}
          <div className="bigbang absolute inset-0 flex items-center justify-center">
            <div 
              className="absolute rounded-full"
              style={{
                width: '150%',
                height: '150%',
                filter: 'blur(120px)',
                background: 'radial-gradient(circle, rgba(238, 240, 252, 1) 0%, rgba(238, 240, 252, 0.95) 15%, rgba(238, 240, 252, 0.8) 30%, rgba(238, 240, 252, 0.4) 50%, transparent 70%)',
                mixBlendMode: 'screen',
              }}
            />
          </div>

          {/* Stardust Sparkles */}
          <div className="sparkle sparkle-1 absolute w-2 h-2 bg-white rounded-full blur" />
          <div className="sparkle sparkle-2 absolute w-1 h-1 bg-white rounded-full blur" />
          <div className="sparkle sparkle-3 absolute w-2 h-2 bg-white rounded-full blur" />
          <div className="sparkle sparkle-4 absolute w-1 h-1 bg-white rounded-full blur" />
          <div className="sparkle sparkle-5 absolute w-2 h-2 bg-white rounded-full blur" />
          <div className="sparkle sparkle-6 absolute w-1 h-1 bg-white rounded-full blur" />
          <div className="sparkle sparkle-7 absolute w-2 h-2 bg-white rounded-full blur" />
          <div className="sparkle sparkle-8 absolute w-1 h-1 bg-white rounded-full blur" />
        </div>


      </div>

      <style jsx global>{`
        @keyframes galaxySlideLeft {
          0% {
            transform: translateX(-600px) rotate(-360deg) scale(0.3);
            opacity: 0;
          }
          40% {
            transform: translateX(-150px) rotate(-180deg) scale(0.9);
            opacity: 1;
          }
          70% {
            transform: translateX(-30px) rotate(-45deg) scale(1);
            opacity: 1;
          }
          100% {
            transform: translateX(0) rotate(0deg) scale(1.2);
            opacity: 1;
          }
        }

        @keyframes galaxySlideRight {
          0% {
            transform: translateX(600px) rotate(360deg) scale(0.3);
            opacity: 0;
          }
          40% {
            transform: translateX(150px) rotate(180deg) scale(0.9);
            opacity: 1;
          }
          70% {
            transform: translateX(30px) rotate(45deg) scale(1);
            opacity: 1;
          }
          100% {
            transform: translateX(0) rotate(0deg) scale(1.2);
            opacity: 1;
          }
        }

        @keyframes particleOrbit {
          0% {
            transform: rotate(0deg) translateX(90px) rotate(0deg);
            opacity: 0.8;
          }
          100% {
            transform: rotate(360deg) translateX(90px) rotate(-360deg);
            opacity: 0.8;
          }
        }

        @keyframes bigBangExplosion {
          0% {
            opacity: 0;
            transform: scale(0);
          }
          70% {
            opacity: 0;
            transform: scale(0);
          }
          85% {
            opacity: 0.8;
            transform: scale(2);
          }
          95% {
            opacity: 1;
            transform: scale(4);
          }
          100% {
            opacity: 1;
            transform: scale(6);
          }
        }

        @keyframes sparkleFloat {
          0%, 100% {
            opacity: 0;
            transform: translateY(0) scale(0);
          }
          50% {
            opacity: 1;
            transform: translateY(-50px) scale(2);
          }
        }

        @keyframes textPulse {
          0%, 100% {
            opacity: 0.5;
          }
          50% {
            opacity: 1;
          }
        }

        .galaxy-left {
          animation: galaxySlideLeft 3.5s cubic-bezier(0.34, 1.56, 0.64, 1) forwards;
        }

        .galaxy-right {
          animation: galaxySlideRight 3.5s cubic-bezier(0.34, 1.56, 0.64, 1) forwards;
        }

        .particle {
          opacity: 0.7;
        }

        .particle-l1 { top: 15%; left: 25%; animation: particleOrbit 4s linear infinite; }
        .particle-l2 { top: 45%; left: 5%; animation: particleOrbit 5s linear infinite reverse; }
        .particle-l3 { top: 65%; left: 35%; animation: particleOrbit 4.5s linear infinite; }
        .particle-l4 { top: 25%; left: 55%; animation: particleOrbit 5.5s linear infinite reverse; }
        .particle-l5 { top: 75%; left: 15%; animation: particleOrbit 4.8s linear infinite; }
        .particle-l6 { top: 85%; left: 45%; animation: particleOrbit 5.2s linear infinite reverse; }

        .particle-r1 { top: 20%; right: 25%; animation: particleOrbit 4.2s linear infinite reverse; }
        .particle-r2 { top: 50%; right: 5%; animation: particleOrbit 5.3s linear infinite; }
        .particle-r3 { top: 70%; right: 35%; animation: particleOrbit 4.7s linear infinite reverse; }
        .particle-r4 { top: 30%; right: 55%; animation: particleOrbit 5.8s linear infinite; }
        .particle-r5 { top: 80%; right: 15%; animation: particleOrbit 5s linear infinite reverse; }
        .particle-r6 { top: 90%; right: 45%; animation: particleOrbit 5.5s linear infinite; }

        .bigbang {
          animation: bigBangExplosion 5s cubic-bezier(0.22, 1, 0.36, 1) forwards;
        }

        .sparkle {
          opacity: 0;
        }

        .sparkle-1 { top: 15%; left: 25%; animation: sparkleFloat 3s ease-in-out 3s infinite; }
        .sparkle-2 { top: 10%; right: 20%; animation: sparkleFloat 3.2s ease-in-out 3.2s infinite; }
        .sparkle-3 { top: 45%; left: 15%; animation: sparkleFloat 2.8s ease-in-out 3.4s infinite; }
        .sparkle-4 { bottom: 25%; left: 30%; animation: sparkleFloat 3.1s ease-in-out 3.6s infinite; }
        .sparkle-5 { bottom: 20%; right: 25%; animation: sparkleFloat 2.9s ease-in-out 3.8s infinite; }
        .sparkle-6 { top: 35%; right: 30%; animation: sparkleFloat 3.3s ease-in-out 4s infinite; }
        .sparkle-7 { top: 60%; left: 40%; animation: sparkleFloat 3s ease-in-out 4.2s infinite; }
        .sparkle-8 { bottom: 40%; right: 35%; animation: sparkleFloat 3.2s ease-in-out 4.4s infinite; }

        .loading-text {
          animation: textPulse 2.5s ease-in-out infinite;
        }
      `}</style>
    </div>
  );

  return createPortal(content, document.body);
}
