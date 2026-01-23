"use client";

import { motion } from "framer-motion";
import { Lock, ArrowRight, Sparkles } from "lucide-react";
import Link from "next/link";
import { Section1Result as ResultType } from "@/features/user-manual/model/section1-schema";

interface ResultProps {
  data: ResultType;
}

export function Result({ data }: ResultProps) {
  // 첫 번째 인사이트를 힌트로 사용
  const hintKeyword = data.insights[0]?.title || "알 수 없는 패턴";

  return (
    <div className="w-full max-w-xl mx-auto pb-20 pt-10">
      
      {/* Header Area */}
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center mb-12"
      >
        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 text-primary text-sm font-bold mb-6">
          <Sparkles size={16} />
          <span>Step 1 분석 완료</span>
        </div>
        
        <h2 className="text-2xl md:text-3xl font-bold text-slate-800 mb-4 leading-tight">
          당신의 연애 DNA,<br/>
          <span className="text-primary">30%</span> 해독되었어요!
        </h2>
        
        <p className="text-slate-500 leading-relaxed">
          답변을 분석해보니,<br/>
          당신은 <strong className="text-slate-800 underline decoration-primary/30 decoration-4 underline-offset-2">"{hintKeyword}"</strong><br/>
          경향이 조금 보이는데요? 👀
        </p>
      </motion.div>

      {/* Blurred Preview Card */}
      <motion.div 
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 0.2 }}
        className="relative w-full aspect-[4/3] bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden mb-10 group"
      >
        {/* Blurred Content Background */}
        <div className="absolute inset-0 p-6 flex flex-col gap-4 blur-[8px] opacity-60 select-none bg-slate-50">
           <div className="h-6 w-3/4 bg-slate-200 rounded-md" />
           <div className="h-4 w-full bg-slate-100 rounded-md" />
           <div className="h-4 w-5/6 bg-slate-100 rounded-md" />
           <div className="h-20 w-full bg-slate-100 rounded-xl mt-4" />
           <div className="h-6 w-1/2 bg-slate-200 rounded-md mt-6" />
        </div>

        {/* Lock Overlay */}
        <div className="absolute inset-0 flex flex-col items-center justify-center bg-white/30 backdrop-blur-[2px] z-10 p-6 text-center">
          <div className="w-16 h-16 bg-slate-800 text-white rounded-full flex items-center justify-center mb-4 shadow-xl shadow-slate-200">
            <Lock size={28} strokeWidth={2.5} />
          </div>
          <h3 className="text-lg font-bold text-slate-800 mb-2">
            전체 리포트가 잠겨있어요
          </h3>
          <p className="text-slate-600 text-sm">
            남은 2개의 섹션을 완료하면<br/>
            당신만의 <strong>완벽한 사용 설명서</strong>가 열립니다.
          </p>
        </div>
      </motion.div>

      {/* Next Step Hooking */}
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5 }}
        className="bg-primary/5 rounded-2xl p-6 border border-primary/10"
      >
        <div className="mb-6">
          <div className="text-xs font-bold text-primary mb-2 uppercase tracking-wide">Next Step</div>
          <h3 className="text-xl font-bold text-slate-800 mb-2">
            Step 2. 갈등 스타일 분석
          </h3>
          <p className="text-slate-600 text-sm leading-relaxed">
            행복한 연애의 핵심은 '어떻게 싸우느냐'에 있습니다.<br/>
            내가 갈등을 피하는지, 맞서는지 알아보세요.
            관계가 훨씬 더 편안해질 거예요.
          </p>
        </div>

        <Link 
          href="/user-manual/conflict-styles" 
          className="w-full py-4 bg-primary hover:bg-[#466699] text-white rounded-xl text-base font-bold transition-all flex items-center justify-center gap-2 shadow-lg shadow-primary/20 active:scale-[0.98]"
        >
          갈등 스타일 알아보러 가기
          <ArrowRight size={18} />
        </Link>
      </motion.div>

    </div>
  );
}
