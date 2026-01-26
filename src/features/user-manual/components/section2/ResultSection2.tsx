"use client";

import { motion } from "framer-motion";
import { Lock, ArrowRight, Shield } from "lucide-react";
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
    <div className="min-h-screen bg-background flex items-center justify-center p-4">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="w-full max-w-3xl space-y-8"
      >
        {/* 헤더 */}
        <div className="text-center space-y-2">
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.2, type: "spring" }}
            className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-gradient-to-br from-primary to-accent mb-4"
          >
            <Shield className="w-8 h-8 text-white" />
          </motion.div>
          <h1 className="text-3xl font-bold text-gray-900">
            섹션 2 분석 완료
          </h1>
          <p className="text-gray-600">
            당신의 갈등 스타일과 사과 언어를 분석했어요
          </p>
        </div>

        {/* 티저 인사이트 카드 */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="glass-card p-8 space-y-6"
        >
          {/* 갈등 스타일 */}
          <div className="space-y-3">
            <h2 className="text-2xl font-bold text-gray-900">
              {insights.conflict.title}
            </h2>
            <p className="text-gray-700 leading-relaxed">
              {insights.conflict.description.split('.')[0]}.
            </p>
            <div className="pt-2">
              <span className="inline-block px-3 py-1 bg-highlight text-primary rounded-full text-sm font-medium">
                💡 {insights.conflict.tip.split('.')[0]}
              </span>
            </div>
          </div>

          <div className="border-t border-gray-200 pt-6 space-y-3">
            <h2 className="text-2xl font-bold text-gray-900">
              {insights.apology.title}
            </h2>
            <p className="text-gray-700 leading-relaxed">
              {insights.apology.description.split('.')[0]}.
            </p>
          </div>
        </motion.div>

        {/* 잠금 콘텐츠 */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
          className="glass-card p-6 bg-gray-50/50 border-2 border-dashed border-gray-300"
        >
          <div className="flex flex-col items-center text-center space-y-3">
            <Lock className="w-8 h-8 text-gray-400" />
            <p className="text-sm text-gray-600">
              <strong>상세 분석 결과</strong>는 모든 테스트 완료 후 공개됩니다
            </p>
            <p className="text-xs text-gray-500">
              섹션 3까지 완료하면 통합 리포트에서 확인할 수 있어요
            </p>
          </div>
        </motion.div>

        {/* 다음 섹션 예고 */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8 }}
          className="glass-card p-8 bg-gradient-to-br from-amber-50 to-orange-50 border-amber-200"
        >
          <div className="space-y-4">
            <h3 className="text-xl font-bold text-gray-900">
              다음은 <span className="text-amber-600">섹션 3: 가치관</span>
            </h3>
            <p className="text-gray-700">
              &ldquo;관계의 나침반과 딜브레이커&rdquo;
            </p>
            <p className="text-sm text-gray-600 leading-relaxed">
              당신이 삶에서 가장 중요하게 여기는 가치는 무엇인가요? 그리고 절대 타협할 수 없는 것은 무엇인가요?
            </p>
            <button className="w-full mt-4 px-6 py-3 bg-gradient-to-r from-amber-500 to-orange-500 text-white rounded-lg font-semibold hover:from-amber-600 hover:to-orange-600 transition-all flex items-center justify-center gap-2 group">
              섹션 3 시작하기
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </button>
          </div>
        </motion.div>
      </motion.div>
    </div>
  );
}
