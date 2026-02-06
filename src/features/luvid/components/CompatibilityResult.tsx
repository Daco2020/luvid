"use client";

import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { CompatibilityResult } from "../utils/compatibility-algorithm";
import { ArrowLeft, Heart, Zap, RefreshCw, Share2 } from "lucide-react";
import { useRouter } from "next/navigation";
import { useToast } from "@/shared/hooks/useToast";

// Radar Chart Component (Simple SVG implementation)
function RadarChart({ data }: { data: { values: number; conflict: number; lifestyle: number } }) {
  // Max scores: Values(40), Conflict(30), Lifestyle(30)
  // Normalize to 0-1 range for chart
  const v = Math.min(1, data.values / 40);
  const c = Math.min(1, data.conflict / 30);
  const l = Math.min(1, data.lifestyle / 30);

  // Triangle coordinates (normalized radius 100)
  const r = 100;
  const center = { x: 150, y: 150 };
  
  const p1 = { x: center.x, y: center.y - (r * v) };
  const p2 = { x: center.x + (r * c * 0.866), y: center.y + (r * c * 0.5) };
  const p3 = { x: center.x - (r * l * 0.866), y: center.y + (r * l * 0.5) };

  const pathData = `M ${p1.x} ${p1.y} L ${p2.x} ${p2.y} L ${p3.x} ${p3.y} Z`;

  // Background triangle (Full scale)
  const bgP1 = { x: center.x, y: center.y - r };
  const bgP2 = { x: center.x + (r * 0.866), y: center.y + (r * 0.5) };
  const bgP3 = { x: center.x - (r * 0.866), y: center.y + (r * 0.5) };
  const bgPath = `M ${bgP1.x} ${bgP1.y} L ${bgP2.x} ${bgP2.y} L ${bgP3.x} ${bgP3.y} Z`;

  return (
    <svg width="300" height="250" viewBox="0 0 300 300" className="mx-auto">
      {/* Background Guide */}
      <path d={bgPath} fill="none" stroke="#e2e8f0" strokeWidth="1" strokeDasharray="4 4" />
      <line x1={center.x} y1={center.y} x2={bgP1.x} y2={bgP1.y} stroke="#e2e8f0" strokeDasharray="4 4" />
      <line x1={center.x} y1={center.y} x2={bgP2.x} y2={bgP2.y} stroke="#e2e8f0" strokeDasharray="4 4" />
      <line x1={center.x} y1={center.y} x2={bgP3.x} y2={bgP3.y} stroke="#e2e8f0" strokeDasharray="4 4" />
      
      {/* Labels */}
      <text x={bgP1.x} y={bgP1.y - 15} textAnchor="middle" className="text-[10px] fill-slate-400 font-bold uppercase">가치관</text>
      <text x={bgP2.x + 15} y={bgP2.y + 10} textAnchor="start" className="text-[10px] fill-slate-400 font-bold uppercase">갈등해결</text>
      <text x={bgP3.x - 15} y={bgP3.y + 10} textAnchor="end" className="text-[10px] fill-slate-400 font-bold uppercase">라이프스타일</text>

      {/* Data Polygon - Animated */}
      <motion.path 
        d={pathData} 
        fill="rgba(236, 72, 153, 0.2)" 
        stroke="#ec4899" 
        strokeWidth="2"
        initial={{ pathLength: 0, opacity: 0 }}
        animate={{ pathLength: 1, opacity: 1 }}
        transition={{ duration: 1.5, delay: 0.5, ease: "easeOut" }}
      />
      {/* Points */}
      <motion.circle 
        cx={p1.x} cy={p1.y} r="3" fill="#ec4899"
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ delay: 1.8 }}
      />
      <motion.circle 
        cx={p2.x} cy={p2.y} r="3" fill="#ec4899"
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ delay: 1.9 }}
      />
      <motion.circle 
        cx={p3.x} cy={p3.y} r="3" fill="#ec4899"
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ delay: 2.0 }}
      />
    </svg>
  );
}

interface Props {
  result: CompatibilityResult;
}

export function CompatibilityResultView({ result }: Props) {
  const router = useRouter();
  const { showToast } = useToast();
  const [scoreCount, setScoreCount] = useState(0);

  // Score counting animation
  useEffect(() => {
    let start = 0;
    const end = result.totalScore;
    const duration = 2000; // 2 seconds
    const incrementTime = duration / end;

    const timer = setInterval(() => {
      start += 1;
      setScoreCount(start);
      if (start >= end) {
        clearInterval(timer);
      }
    }, incrementTime);

    return () => clearInterval(timer);
  }, [result.totalScore]);

  const handleShare = async () => {
    try {
      await navigator.clipboard.writeText(window.location.href);
      showToast({
        title: "링크가 복사되었어요!",
        description: "친구에게 궁합 결과를 공유해보세요."
      });
    } catch (err) {
      console.error("Failed to copy:", err);
    }
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Header - Consistent with my/page.tsx */}
      <div className="sticky top-0 bg-background/80 backdrop-blur-lg border-b border-slate-100 z-10">
        <div className="max-w-2xl mx-auto px-6 py-4 flex items-center justify-between">
          <button
            onClick={() => router.push("/luvid/my")}
            className="flex items-center gap-2 text-slate-600 hover:text-slate-800"
          >
            <ArrowLeft size={20} />
            <span className="font-medium">내 카드로</span>
          </button>
          <button
            onClick={handleShare}
            className="flex items-center gap-2 px-4 py-2 bg-slate-900 text-white rounded-full font-medium hover:bg-slate-800 transition-colors"
          >
            <Share2 size={18} />
            <span>공유하기</span>
          </button>
        </div>
      </div>

      <main className="max-w-2xl mx-auto px-6 py-12">
        {/* Score Section with Counting Animation */}
        <div className="text-center mb-12">
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.5 }}
            className="relative inline-block"
          >
            {result.grade === 'perfect' && (
              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3, duration: 0.5 }}
                className="absolute -top-8 left-1/2 -translate-x-1/2 whitespace-nowrap bg-red-500 text-white px-3 py-1 rounded-full text-xs font-bold shadow-lg"
              >
                🔥 천생연분
              </motion.div>
            )}
            <span className="text-[100px] font-black text-slate-900 leading-none tracking-tighter">
              {scoreCount}
            </span>
            <span className="text-3xl text-slate-400 font-bold ml-1">점</span>
          </motion.div>
          
          <motion.p 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 2.2, duration: 0.5 }}
            className="text-slate-500 font-medium mt-4 text-lg"
          >
            {result.summary}
          </motion.p>
        </div>

        {/* Radar Chart */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 2.5, duration: 0.5 }}
          className="bg-white rounded-3xl p-8 shadow-sm border border-slate-100 mb-8"
        >
          <h3 className="text-sm font-bold text-slate-400 mb-6 text-center tracking-widest uppercase">Love Balance</h3>
          <RadarChart data={result.breakdown} />
        </motion.div>

        {/* Detail Cards */}
        <div className="space-y-4 mb-12">
          {result.details.map((detail, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 3.0 + (idx * 0.15), duration: 0.5 }}
              className="bg-white p-6 rounded-3xl shadow-sm border border-slate-100 relative overflow-hidden flex items-start gap-5"
            >
              <div className={`p-4 rounded-2xl shrink-0 ${
                idx === 0 ? "bg-pink-50 text-pink-500" :
                idx === 1 ? "bg-indigo-50 text-indigo-500" :
                "bg-emerald-50 text-emerald-500"
              }`}>
                {idx === 0 ? <Heart size={24} /> : 
                 idx === 1 ? <Zap size={24} /> : 
                 <RefreshCw size={24} />}
              </div>
              <div>
                <h3 className="font-bold text-slate-800 mb-2 text-lg">{detail.title}</h3>
                <p className="text-slate-600 leading-relaxed">
                  {detail.description}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </main>
    </div>
  );
}
