"use client";

import React, { useEffect, useState } from "react";
import { createPortal } from "react-dom";

/**
 * 궁합 분석 로딩 화면 (행성 충돌 애니메이션)
 * Portal을 사용해 body에 직접 렌더링
 */
export function CompatibilityLoading() {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    console.log("🌌 [CompatibilityLoading] Component mounted!");
    setMounted(true);
    
    // body에 overflow hidden 적용
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
        height: '100vh'
      }}
    >
      {/* 확인용 텍스트 */}
      <div className="text-white text-4xl font-bold mb-8 z-10">
        로딩 중...
      </div>
      
      <div className="relative w-full h-full flex items-center justify-center">
        {/* User A Planet - Left */}
        <div 
          className="absolute rounded-full blur-2xl"
          style={{
            width: '256px',
            height: '256px',
            background: 'linear-gradient(to bottom right, rgb(99, 102, 241), rgb(139, 92, 246))',
            left: 'calc(50% - 250px)',
            opacity: 0.8,
            mixBlendMode: 'screen',
            animation: 'slideIn 2s ease-out forwards'
          }}
        />
        
        {/* User B Planet - Right */}
        <div 
          className="absolute rounded-full blur-2xl"
          style={{
            width: '256px',
            height: '256px',
            background: 'linear-gradient(to bottom left, rgb(236, 72, 153), rgb(251, 146, 60))',
            right: 'calc(50% - 250px)',
            opacity: 0.8,
            mixBlendMode: 'screen',
            animation: 'slideIn 2s ease-out forwards'
          }}
        />
        
        <p className="absolute bottom-20 text-white text-lg tracking-widest z-10 font-mono">
          ANALYZING UNIVERSES...
        </p>
      </div>

      <style jsx global>{`
        @keyframes slideIn {
          from {
            transform: scale(0.5);
            opacity: 0;
          }
          to {
            transform: scale(1);
            opacity: 0.8;
          }
        }
      `}</style>
    </div>
  );

  return createPortal(content, document.body);
}
