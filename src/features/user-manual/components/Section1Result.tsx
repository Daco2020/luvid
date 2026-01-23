import { motion } from "framer-motion";
import { CheckCircle2, ArrowRight } from "lucide-react";
import Link from "next/link";
import { Section1Result as ResultType } from "@/features/user-manual/model/section1-schema";

interface Section1ResultProps {
  result: ResultType;
}

export function Section1Result({ result }: Section1ResultProps) {
  return (
    <div className="w-full max-w-2xl mx-auto pb-20">
      
      {/* Header */}
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center mb-10"
      >
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-green-100 text-green-700 text-xs font-bold mb-4">
          <CheckCircle2 size={14} />
          <span>분석 완료</span>
        </div>
        <h2 className="text-2xl font-bold text-slate-800 mb-2">
          당신에 대한 사용 설명서가<br />도착했어요 💌
        </h2>
        <p className="text-slate-500">
          3가지 핵심 키워드로 당신의 연애 스타일을 정리해봤어요.
        </p>
      </motion.div>

      {/* Insights Cards */}
      <div className="space-y-6">
        {result.insights.map((insight, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.15 + 0.2 }}
            className="bg-white rounded-xl p-6 border border-slate-200 shadow-sm overflow-hidden relative"
          >
            <div className="absolute top-0 left-0 w-1 h-full bg-primary/50" />
            
            <h3 className="text-lg font-bold text-slate-800 mb-2">
              {insight.title}
            </h3>
            <p className="text-slate-600 text-sm leading-relaxed mb-4">
              {insight.description}
            </p>
            
            <div className="bg-slate-50 rounded-lg p-3 text-sm text-slate-600 border border-slate-100 flex gap-3">
              <span className="text-lg">💡</span>
              <div>
                <span className="font-bold text-slate-700 block mb-1">Luvid's Tip</span>
                {insight.tip}
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Next Step CTA */}
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.8 }}
        className="mt-10 text-center"
      >
        <Link 
          href="/" 
          className="inline-flex items-center gap-2 px-8 py-4 bg-slate-800 text-white rounded-xl font-medium hover:bg-slate-900 transition-colors shadow-lg shadow-slate-200"
        >
          홈으로 돌아가기
          <ArrowRight size={18} />
        </Link>
      </motion.div>

    </div>
  );
}
