"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { AnimatePresence, motion } from "framer-motion";
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
  const [result, setResult] = useState<Section1Result | null>(null);
  const [direction, setDirection] = useState(0); // 1: Next, -1: Prev

  const currentQuestion = section1Questions[currentStep];
  const totalSteps = section1Questions.length;

  // 답변 선택 핸들러
  const handleAnswer = async (choice: AnswerChoice) => {
    setDirection(1); // 앞으로 이동

    const newAnswer: UserAnswer = {
      questionId: currentQuestion.id,
      selectedChoiceId: choice.id,
      pattern: choice.pattern,
    };

    const updatedAnswers = [...answers, newAnswer];
    setAnswers(updatedAnswers);

    // 애니메이션을 위해 아주 짧은 딜레이 후 상태 변경 (즉각 반응성 개선)
    setTimeout(() => {
      if (currentStep < totalSteps - 1) {
        setCurrentStep((prev) => prev + 1);
      } else {
        finishWizard(updatedAnswers);
      }
    }, 200); 
  };
  
  // 뒤로 가기 핸들러 (UI에는 없지만 브라우저 뒤로가기 대응 등을 위해 준비)
  const handleBack = () => {
     if (currentStep > 0) {
       setDirection(-1);
       setCurrentStep(prev => prev - 1);
       setAnswers(prev => prev.slice(0, -1));
     } else {
       router.back();
     }
  };

  // 완료 처리
  const finishWizard = (finalAnswers: UserAnswer[]) => {
    const finalResult = analyzeSection1(finalAnswers);
    setResult(finalResult);
    
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
            onClick={handleBack}
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
        <div className="flex-1 flex flex-col justify-center w-full min-h-[400px] overflow-hidden">
          <QuestionCard 
            key={currentQuestion.id}
            question={currentQuestion}
            onAnswer={handleAnswer}
            isExiting={false}
          />
        </div>
      </div>
    </div>
  );
}
