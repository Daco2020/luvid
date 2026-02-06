"use client";

import { motion } from "framer-motion";
import { Lock, ArrowRight, Heart } from "lucide-react";
import { useRouter } from "next/navigation";
import { Section3Result } from "../../model/section3-schema";
import { ARCHETYPE_TEASER_HINTS } from "../../model/archetype-constants";

interface ResultSection3Props {
  result: Section3Result;
  onNext?: () => void;
}

export function ResultSection3({ result }: ResultSection3Props) {
  const router = useRouter();
  const { topPositiveValue } = result;

  return (
    <div className="flex flex-col items-center justify-center min-h-[60vh] text-center px-4 gap-8 w-full max-w-md mx-auto">
      
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="space-y-2"
      >
        <span className="text-primary font-bold tracking-widest text-sm uppercase">Section 3 Analysis</span>
        <h2 className="text-2xl font-bold text-slate-800">가치관 분석 완료</h2>
      </motion.div>

      {/* Teaser Card */}
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 0.3, duration: 0.6 }}
        className="w-full bg-white p-8 rounded-2xl shadow-xl border border-slate-100 relative overflow-hidden group"
      >
        {/* Background Decor */}
        <div className="absolute -top-10 -right-10 w-32 h-32 bg-rose-500/10 rounded-full blur-2xl group-hover:bg-rose-500/20 transition-all duration-500" />
        
        <div className="relative z-10 flex flex-col items-center gap-4">
          <div className="p-3 bg-rose-50 rounded-full text-rose-500">
             <Heart size={24} fill="currentColor" />
          </div>
          
          <div className="space-y-2">
            <p className="text-sm text-slate-500 font-medium">당신이 가장 중요하게 생각하는 가치는...</p>
            <h3 className="text-xl font-bold text-slate-800 break-keep leading-relaxed text-balance">
              헉 이거였군요! 👀
            </h3>
            <p className="text-sm text-slate-600 px-2 break-keep leading-relaxed">
              {ARCHETYPE_TEASER_HINTS[topPositiveValue.coreValueId]}
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
          선택하신 다른 가치들도 궁금하다고요?<br/>
          그리고 이전의 결과들도 궁금하시겠죠~ <br/>
          오래 기다리셨어요! 😊<br/>
          이제 <span className="text-primary font-semibold">최종 결과</span>에서 모두 공개됩니다!
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
          "나 사용 설명서가 완성되었습니다!"
        </div>
        
        <button
          onClick={() => router.push("/user-manual/report")} // 나중에 실제 경로로 수정
          className="w-full py-4 bg-primary hover:bg-primary/90 text-white rounded-xl font-bold text-lg shadow-lg shadow-primary/20 transition-all flex items-center justify-center gap-2 group"
        >
          <span>최종 결과 확인하기</span>
          <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform" />
        </button>
      </motion.div>

    </div>
  );
}
