"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronLeft } from "lucide-react";

import { QuestionCard } from "@/features/user-manual/components/QuestionCard";
import { ProgressBar } from "@/features/user-manual/components/ProgressBar";
import { section1Questions } from "@/features/user-manual/model/section1-questions";
import { UserAnswer, AnswerChoice } from "@/features/user-manual/model/section1-schema";
import { analyzeSection1 } from "@/features/user-manual/utils/section1-analyzer";
import { saveUserManual, loadUserManual } from "@/features/user-manual/utils/storage";
import { Section1Result } from "@/features/user-manual/components/Section1Result";
import { UserManualStorage, Section1Result as ResultType } from "@/features/user-manual/model/section1-schema"; // 타입 import 추가

export function Section1Wizard() {
  const router = useRouter();
  
  // 상태 관리
  const [currentStep, setCurrentStep] = useState(0);
  const [answers, setAnswers] = useState<UserAnswer[]>([]);
  const [isExiting, setIsExiting] = useState(false);
  const [result, setResult] = useState<ResultType | null>(null); // 결과 상태 추가

  const currentQuestion = section1Questions[currentStep];
  const totalSteps = section1Questions.length;

  // 답변 선택 핸들러
  const handleAnswer = async (choice: AnswerChoice) => {
    if (isExiting) return;
    setIsExiting(true);

    const newAnswer: UserAnswer = {
      questionId: currentQuestion.id,
      selectedChoiceId: choice.id,
      pattern: choice.pattern,
    };

    const updatedAnswers = [...answers, newAnswer];
    setAnswers(updatedAnswers);

    setTimeout(() => {
      if (currentStep < totalSteps - 1) {
        setCurrentStep((prev) => prev + 1);
        setIsExiting(false);
      } else {
        finishWizard(updatedAnswers);
      }
    }, 400);
  };

  // 완료 처리
  const finishWizard = (finalAnswers: UserAnswer[]) => {
    // 1. 분석 실행
    const finalResult = analyzeSection1(finalAnswers);
    setResult(finalResult); // 결과 상태 업데이트
    
    // 2. 로컬스토리지 저장
    const currentStorage = loadUserManual() || {
      version: "1.0",
      userId: crypto.randomUUID(),
      startedAt: new Date().toISOString(),
    };
    
    saveUserManual({
      ...currentStorage,
      section1: finalResult
    });
  };

  // 결과 화면 렌더링
  if (result) {
    return (
      <div className="min-h-screen bg-background flex flex-col items-center py-10 px-6 relative overflow-y-auto">
        <Section1Result result={result} />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background flex flex-col items-center py-10 px-6 relative overflow-hidden">
      
      {/* Background Decor */}
      <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-primary/20 via-primary to-primary/20" />

      {/* Header: 뒤로가기 & 로고 */}
      <div className="w-full max-w-xl flex items-center justify-between mb-10 z-10">
        <button 
          onClick={() => router.back()}
          className="p-2 -ml-2 text-slate-400 hover:text-slate-600 transition-colors"
        >
          <ChevronLeft size={24} />
        </button>
        <span className="text-sm font-bold text-slate-300 tracking-widest uppercase">
          Emotional Patterns
        </span>
        <div className="w-8" />
      </div>

      {/* Progress Bar */}
      <ProgressBar current={currentStep + 1} total={totalSteps} />

      {/* Question Card Area */}
      <div className="w-full max-w-xl flex-1 flex flex-col justify-center min-h-[400px]">
        <AnimatePresence mode="wait">
          <QuestionCard 
            key={currentQuestion.id}
            question={currentQuestion}
            onAnswer={handleAnswer}
            isExiting={isExiting}
          />
        </AnimatePresence>
      </div>

    </div>
  );
}
