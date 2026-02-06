"use client";

import { motion } from "framer-motion";
import { useEffect, useState } from "react";

export function PageLoading() {
  const [particles, setParticles] = useState<{id: number, x: number, y: number, color: string, size: number, delay: number}[]>([]);

  useEffect(() => {
    // 클라이언트 사이드에서만 입자 생성 (Hydration Mismatch 방지)
    const width = window.innerWidth;
    const height = window.innerHeight;
    
    const newParticles = Array.from({ length: 300 }).map((_, i) => ({
      id: i,
      // 초기 위치: 화면 전체 (더 넓게 퍼지도록)
      x: Math.random() * width - width / 2, 
      y: Math.random() * height - height / 2,
      color: [
        "bg-pink-300",
        "bg-pink-400", 
        "bg-rose-300",
        "bg-rose-400",
        "bg-orange-300"
      ][Math.floor(Math.random() * 5)],
      size: Math.random() * 6 + 2,
      delay: Math.random() * 0.5,
    }));
    setParticles(newParticles);
  }, []);

  if (particles.length === 0) return null;

  return (
    <div className="fixed inset-0 z-70 flex items-center justify-center bg-white/95 backdrop-blur-md overflow-hidden">
      
      {/* Particles */}
      {particles.map((p) => (
        <motion.div
          key={p.id}
          className={`absolute rounded-full ${p.color}`}
          style={{ width: p.size, height: p.size }}
          initial={{ 
            opacity: 0, 
            x: p.x, 
            y: p.y,
            scale: 0
          }}
          animate={{ 
            opacity: [0, 1, 0],
            x: 0,
            y: 0,
            scale: [0.5, 1, 1]
          }}
          transition={{
            duration: 2,
            ease: "easeIn",
            delay: p.delay,
          }}
        />
      ))}

      {/* Main Logo Container */}
      <motion.div
        initial={{ opacity: 0, scale: 0.8, filter: "blur(10px)", y: 0 }}
        animate={{ 
          opacity: [0, 0, 1, 1, 0], // Wait -> Fade in -> Hold -> Fade out
          scale: [0.8, 0.8, 1, 1, 1], // Initial -> Appear -> Hold -> Hold
          filter: ["blur(10px)", "blur(10px)", "blur(0px)", "blur(0px)", "blur(10px)"], // Blur out at the end
          y: [0, 0, 0, 0, 0] // No movement
        }}
        transition={{
          duration: 5, 
          times: [0, 0.2, 0.4, 0.6, 0.8, 1], 
          ease: "easeInOut",
        }}
        className="relative z-10 flex flex-col items-center gap-4"
      >
        <span className="text-5xl font-display font-bold tracking-tight text-transparent bg-clip-text bg-linear-to-r from-pink-500 to-rose-400 drop-shadow-sm">
          Luvid
        </span>
      </motion.div>
      
      {/* Background - fade out at the end */}
      <motion.div 
        className="absolute inset-0 z-0 bg-linear-to-r from-pink-100/30 to-rose-100/30 blur-3xl"
        initial={{ opacity: 0 }}
        animate={{ opacity: [0, 1, 1, 0] }}
        transition={{ duration: 3.5, times: [0, 0.2, 0.8, 1] }}
      />
    </div>
  );
}
