"use client";

import { motion } from "framer-motion";
import { Lock, ArrowRight, Sparkles } from "lucide-react";
import { Section1Result } from "@/features/user-manual/model/section1-schema";

interface ResultSection1Props {
  data: Section1Result;
  onNext: () => void;
}

export function ResultSection1({ data, onNext }: ResultSection1Props) {
  // 데이터에서 첫 번째 인사이트(재충전 방식)를 메인 티저로 활용
  const mainInsight = data.insights[0];
  
  return (
    <div className="flex flex-col items-center justify-center min-h-[60vh] text-center px-4 gap-8 w-full max-w-md mx-auto">
      
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="space-y-2"
      >
        <span className="text-primary font-bold tracking-widest text-sm uppercase">Section 1 Analysis</span>
        <h2 className="text-2xl font-bold text-slate-800">정서적 안정성 분석 완료</h2>
      </motion.div>

      {/* Teaser Card */}
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 0.3, duration: 0.6 }}
        className="w-full bg-white p-8 rounded-2xl shadow-xl border border-slate-100 relative overflow-hidden group"
      >
        {/* Background Decor */}
        <div className="absolute -top-10 -right-10 w-32 h-32 bg-primary/10 rounded-full blur-2xl group-hover:bg-primary/20 transition-all duration-500" />
        
        <div className="relative z-10 flex flex-col items-center gap-4">
          <div className="p-3 bg-indigo-50 rounded-full text-indigo-500">
             <Sparkles size={24} />
          </div>
          
          <div className="space-y-2">
            <p className="text-sm text-slate-500 font-medium">당신의 에너지 충전 방식은...</p>
            <h3 className="text-lg font-bold text-slate-800 break-keep leading-relaxed">
              에에엣!!!? 👀
            </h3>
            <p className="text-sm text-slate-600 px-2 break-keep leading-relaxed">
              {mainInsight.teaserHint}
            </p>
          </div>
        </div>
      </motion.div>

      {/* Locked Content */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.6, duration: 0.6 }}
        className="flex flex-col items-center gap-3 py-6 px-8 bg-slate-50/50 rounded-xl border border-slate-200 border-dashed w-full"
      >
        <div className="p-2 bg-slate-200 rounded-full text-slate-500">
          <Lock size={16} />
        </div>
        <p className="text-xs text-slate-500 font-medium leading-relaxed">
          당신이 불확실한 상황에서 어떻게 반응하는지,<br/>
          스트레스를 어떻게 관리하는지...<br/>
          궁금하시죠? 😏<br/>
          <span className="text-primary font-semibold">다음 단계</span>를 진행하는 동안 정리하고 있을게요!
        </p>
      </motion.div>

      {/* Next Section Hook & Action */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.9, duration: 0.6 }}
        className="w-full space-y-4"
      >
        <div className="text-slate-600 text-sm font-medium animate-pulse">
          "갈등의 순간, 당신은 어떤 선택을 할까요?"
        </div>
        
        <button
          onClick={onNext}
          className="w-full py-4 bg-primary hover:bg-primary/90 text-white rounded-xl font-bold text-lg shadow-lg shadow-primary/20 transition-all flex items-center justify-center gap-2 group"
        >
          <span>섹션 2 시작하기</span>
          <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform" />
        </button>
      </motion.div>

    </div>
  );
}
