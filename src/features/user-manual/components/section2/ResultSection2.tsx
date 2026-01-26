"use client";

import { motion } from "framer-motion";
import { Lock, ArrowRight, MessageCircle } from "lucide-react";
import { Section2Result } from "../../model/section2-schema";

interface ResultSection2Props {
  result: Section2Result;
}

export function ResultSection2({ result }: ResultSection2Props) {
  const { insights } = result;

  // insights가 제대로 생성되지 않은 경우 처리
  if (!insights || !insights.conflict || !insights.apology) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center p-4">
        <div className="text-center">
          <p className="text-gray-600">분석 결과를 생성하는 중...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-col items-center justify-center min-h-[60vh] text-center px-4 gap-8 w-full max-w-md mx-auto">
        
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="space-y-2"
        >
          <span className="text-primary font-bold tracking-widest text-sm uppercase">Section 2 Analysis</span>
          <h2 className="text-2xl font-bold text-slate-800">소통 및 갈등 분석 완료</h2>
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
            <div className="p-3 bg-blue-50 rounded-full text-blue-500">
              <MessageCircle size={24} />
            </div>
            
            <div className="space-y-2">
              <p className="text-sm text-slate-500 font-medium">당신의 갈등 대처 방법은...</p>
              <h3 className="text-lg font-bold text-slate-800 break-keep leading-relaxed">
                앗!!!? 👀
              </h3>
              <p className="text-sm text-slate-600 px-2 break-keep leading-relaxed">
                {insights.conflict.teaserHint}
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
            당신은 이렇게 사과받기를 바라는군요..<br/>
            흠흠.. 아! 이 내용은 아직 정리중이니까~ 😏<br/>
            <span className="text-primary font-semibold">섹션 3까지 마치면</span> 보여드릴게요!
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
            "당신이 절대 타협할 수 없는 것은 무엇인가요?"
          </div>
          
          <button
            onClick={() => {/* TODO: 섹션 3 이동 */}}
            className="w-full py-4 bg-primary hover:bg-primary/90 text-white rounded-xl font-bold text-lg shadow-lg shadow-primary/20 transition-all flex items-center justify-center gap-2 group"
          >
            <span>섹션 3 시작하기</span>
            <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform" />
          </button>
        </motion.div>

      </div>
  );
}
