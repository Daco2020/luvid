"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { AnimatePresence } from "framer-motion";
import { ChevronLeft } from "lucide-react";

import { QuestionCard } from "@/features/user-manual/components/QuestionCard";
import { ProgressBar } from "@/features/user-manual/components/ProgressBar";
import { Result } from "@/features/user-manual/components/Result";

import { section1Questions } from "@/features/user-manual/model/section1-questions";
import { UserAnswer, AnswerChoice, Section1Result } from "@/features/user-manual/model/section1-schema";
import { analyzeSection1 } from "@/features/user-manual/utils/section1-analyzer";
import { saveUserManual, loadUserManual } from "@/features/user-manual/utils/storage";

export function Wizard() {
  const router = useRouter();
  
  // 상태 관리
  const [currentStep, setCurrentStep] = useState(0);
  const [answers, setAnswers] = useState<UserAnswer[]>([]);
  const [isExiting, setIsExiting] = useState(false);
  const [result, setResult] = useState<Section1Result | null>(null);

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
    setResult(finalResult);
    
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
      <div className="min-h-screen bg-background py-10 px-4 sm:px-6 relative overflow-y-auto w-full">
        <Result data={result} />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background flex flex-col py-10 px-4 sm:px-6 relative overflow-hidden w-full">
      
      {/* Background Decor */}
      <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-primary/20 via-primary to-primary/20" />

      <div className="w-full max-w-xl mx-auto flex flex-col h-full relative z-10"> 
        {/* Header */}
        <div className="flex items-center justify-between mb-10 w-full">
          <button 
            onClick={() => router.back()}
            className="p-2 -ml-2 text-slate-400 hover:text-slate-600 transition-colors"
          >
            <ChevronLeft size={24} />
          </button>
          <span className="text-sm font-bold text-slate-400 tracking-widest uppercase">
            Emotional Patterns
          </span>
          <div className="w-8" />
        </div>

        {/* Progress Bar */}
        <ProgressBar current={currentStep + 1} total={totalSteps} />

        {/* Question Card Area */}
        <div className="flex-1 flex flex-col justify-center w-full min-h-[400px]">
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
    </div>
  );
}
