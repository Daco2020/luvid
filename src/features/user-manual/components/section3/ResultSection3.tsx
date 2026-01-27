/**
 * Section 3: 결과 화면
 * 가치관 토너먼트 결과를 표시
 */

"use client";

import { motion } from "framer-motion";
import { Heart, X, ArrowRight } from "lucide-react";
import { Section3Result } from "../../model/section3-schema";
import { getCoreValueById } from "../../model/section3-values";

interface ResultSection3Props {
  result: Section3Result;
  onNext?: () => void;
}

export function ResultSection3({ result, onNext }: ResultSection3Props) {
  const { selectedCoreValues, topPositiveValue, topNegativeValue, insight } = result;

  // 선택한 핵심 가치들 가져오기
  const selectedValues = selectedCoreValues
    .map((id) => getCoreValueById(id))
    .filter((v) => v !== undefined);

  return (
    <div className="flex flex-col items-center justify-center min-h-[60vh] text-center px-4 gap-8 w-full max-w-2xl mx-auto">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="space-y-2"
      >
        <span className="text-primary font-bold tracking-widest text-sm uppercase">
          Section 3 Analysis
        </span>
        <h2 className="text-2xl font-bold text-slate-800">가치관 분석 완료</h2>
      </motion.div>

      {/* 선택한 8개 가치 */}
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 0.2, duration: 0.6 }}
        className="w-full"
      >
        <h3 className="text-lg font-semibold text-gray-700 mb-4">선택한 핵심 가치</h3>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
          {selectedValues.map((value, index) => (
            <motion.div
              key={value.id}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 + index * 0.05 }}
              className="px-3 py-2 bg-gray-100 rounded-lg text-sm font-medium text-gray-700"
            >
              {value.name}
            </motion.div>
          ))}
        </div>
      </motion.div>

      {/* 최고 가치 (긍정) */}
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 0.5, duration: 0.6 }}
        className="w-full bg-gradient-to-br from-blue-50 to-purple-50 p-6 rounded-2xl shadow-lg border border-blue-100 relative overflow-hidden group"
      >
        <div className="absolute -top-10 -right-10 w-32 h-32 bg-blue-200/30 rounded-full blur-2xl" />

        <div className="relative z-10 flex flex-col items-center gap-3">
          <div className="p-3 bg-blue-100 rounded-full text-blue-600">
            <Heart className="w-6 h-6" />
          </div>

          <div>
            <div className="text-xs text-blue-600 font-medium mb-1">가장 중요한 가치</div>
            <h3 className="text-xl font-bold text-gray-900">{topPositiveValue.aspect.label}</h3>
            <p className="text-sm text-gray-600 mt-2">{topPositiveValue.aspect.description}</p>
          </div>
        </div>
      </motion.div>

      {/* 최대 딜브레이커 (부정) */}
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 0.7, duration: 0.6 }}
        className="w-full bg-gradient-to-br from-red-50 to-orange-50 p-6 rounded-2xl shadow-lg border border-red-100 relative overflow-hidden group"
      >
        <div className="absolute -top-10 -right-10 w-32 h-32 bg-red-200/30 rounded-full blur-2xl" />

        <div className="relative z-10 flex flex-col items-center gap-3">
          <div className="p-3 bg-red-100 rounded-full text-red-600">
            <X className="w-6 h-6" />
          </div>

          <div>
            <div className="text-xs text-red-600 font-medium mb-1">절대 받아들일 수 없는 것</div>
            <h3 className="text-xl font-bold text-gray-900">{topNegativeValue.aspect.label}</h3>
            <p className="text-sm text-gray-600 mt-2">{topNegativeValue.aspect.description}</p>
          </div>
        </div>
      </motion.div>

      {/* 인사이트 */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.9, duration: 0.6 }}
        className="w-full bg-white p-6 rounded-2xl shadow-md border border-gray-100"
      >
        <p className="text-gray-700 leading-relaxed text-sm">{insight}</p>
      </motion.div>

      {/* 티저 힌트 */}
      {/* {teaserHint && (
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.1, duration: 0.6 }}
          className="w-full bg-gradient-to-r from-accent/10 to-highlight/10 p-4 rounded-xl border border-accent/20"
        >
          <p className="text-sm text-gray-600 italic">{teaserHint}</p>
        </motion.div>
      )} */}

      {/* 다음 버튼 */}
      {onNext && (
        <motion.button
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.3, duration: 0.6 }}
          onClick={onNext}
          className="group flex items-center gap-2 px-6 py-3 bg-primary text-white rounded-xl font-semibold hover:bg-primary/90 transition-all shadow-lg hover:shadow-xl"
        >
          다음 섹션으로
          <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
        </motion.button>
      )}
    </div>
  );
}
