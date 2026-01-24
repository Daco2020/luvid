"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { AnimatePresence, motion } from "framer-motion";
import { ChevronLeft } from "lucide-react";

import { QuestionCard } from "@/features/user-manual/components/QuestionCard";
import { ProgressBar } from "@/features/user-manual/components/ProgressBar";
import { Result } from "@/features/user-manual/components/Result";
import { Modal } from "@/shared/components/Modal";

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

  const [direction, setDirection] = useState(0); // 1: Next, -1: Prev
  const [showExitModal, setShowExitModal] = useState(false);

  const currentQuestion = section1Questions[currentStep];
  const totalSteps = section1Questions.length;

  // 현재 문항에 대한 기존 답변 확인
  const currentAnswer = answers.find(a => a.questionId === currentQuestion.id);

  // 답변 선택 핸들러
  const handleAnswer = async (choice: AnswerChoice) => {
    // 중복 클릭 방지
    if (isExiting) return;
    setIsExiting(true);
    
    setDirection(1); // 앞으로 이동

    const newAnswer: UserAnswer = {
      questionId: currentQuestion.id,
      selectedChoiceId: choice.id,
      pattern: choice.pattern,
    };

    // 기존 답변이 있으면 교체, 없으면 추가 (순서는 유지)
    // 뒤로 가기 했다가 다시 선택하는 경우를 위해 filter 대신 map이나 splice 로직 필요하지만
    // 단순하게는 현재 스텝 이후의 답변을 날리고 새로 추가하는 방식이 안전함 (선형 진행)
    const prevAnswers = answers.filter(a => a.questionId !== currentQuestion.id);
    const updatedAnswers = [...prevAnswers, newAnswer];
    
    setAnswers(updatedAnswers);

    // 애니메이션을 위해 아주 짧은 딜레이 후 상태 변경
    setTimeout(() => {
      if (currentStep < totalSteps - 1) {
        setCurrentStep((prev) => prev + 1);
        setIsExiting(false); // 다음 스텝으로 넘어가면 입력 잠금 해제
      } else {
        // 마지막 스텝에서는 잠금 유지 (결과 페이지 로딩 등)
        finishWizard(updatedAnswers);
      }
    }, 200); 
  };
  
  // 뒤로 가기 핸들러
  const handleBack = () => {
    if (isExiting) return; // 애니메이션 중 뒤로가기 방지

     if (currentStep > 0) {
       setDirection(-1);
       setCurrentStep(prev => prev - 1);
       // answers는 유지하여 이전 선택 상태를 보여줌 (삭제하지 않음)
     } else {
       // 첫 단계에서 뒤로가기 시 확인
       setShowExitModal(true);
     }
  };

  // 브라우저 뒤로가기 방지 (Popstate)
  useEffect(() => {
    const handlePopState = (e: PopStateEvent) => {
      // 브라우저 뒤로가기를 막고 확인창 띄우기
      // Next.js에서는 완벽한 가로채기가 어렵지만, pushState로 이력을 남겨두고
      // 뒤로가기 시도 시 다시 현재 페이지를 push하여 머물게 하는 꼼수(hack)보다는
      // 페이지 이탈 감지 경고를 주는 것이 일반적임.
      // 여기서는 심플하게 컨펌만 띄우고, 이미 이동해버린 경우 어쩔 수 없음(SPA 특성).
      // 대신 beforeunload를 사용하여 새로고침/닫기 방지
    };

    const handleBeforeUnload = (e: BeforeUnloadEvent) => {
      e.preventDefault();
      e.returnValue = ""; // Chrome requires returnValue to be set
    };

    window.addEventListener("beforeunload", handleBeforeUnload);
    return () => {
      window.removeEventListener("beforeunload", handleBeforeUnload);
    };
  }, []);

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
            섹션1. 정서적 안정성
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
            isExiting={isExiting}
            selectedChoiceId={currentAnswer?.selectedChoiceId}
          />
        </div>
      </div>

      <Modal
        isOpen={showExitModal}
        onClose={() => setShowExitModal(false)}
        title="작성을 중단하시겠어요?"
        description={`지금 나가시면 작성 중인 내용이 모두 사라져요.\n정말 나가시겠어요?`}
        confirmLabel="나가기"
        cancelLabel="계속 작성하기"
        onConfirm={() => {
          setShowExitModal(false);
          router.back();
        }}
        variant="danger" // 내용 삭제는 위험한 동작이므로 danger variant 사용
      />
    </div>
  );
}
