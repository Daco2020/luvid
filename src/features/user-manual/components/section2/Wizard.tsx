"use client";

import { useState, useEffect, useRef } from "react";
import { useRouter } from "next/navigation";
import { AnimatePresence, motion } from "framer-motion";
import { ChevronLeft } from "lucide-react";

import { QuestionCard } from "./QuestionCard";
import { ProgressBar } from "./ProgressBar";
import { Modal } from "@/shared/components/Modal";
import { SectionIntro } from "@/shared/components/SectionIntro";

import { section2Questions } from "@/features/user-manual/model/section2-questions";
import { UserAnswer, AnswerChoice, Section2Result } from "@/features/user-manual/model/section2-schema";
import { analyzeSection2 } from "@/features/user-manual/utils/section2-analyzer";
import { ResultSection2 } from "./ResultSection2";

export function Wizard() {
  const router = useRouter();
  
  // 상태 관리
  const [showIntro, setShowIntro] = useState(true);
  const [currentStep, setCurrentStep] = useState(0);
  const [answers, setAnswers] = useState<UserAnswer[]>([]);
  const [isExiting, setIsExiting] = useState(false);
  const [result, setResult] = useState<Section2Result | null>(null);

  const [direction, setDirection] = useState(0); // 1: Next, -1: Prev
  const [showExitModal, setShowExitModal] = useState(false);

  // Event Handler에서 최신 State를 참조하기 위한 Ref
  const stateRef = useRef({ currentStep, isExiting });
  const isProgrammaticBackRef = useRef(false);
  const isOurNavigationRef = useRef(false);

  useEffect(() => {
    stateRef.current = { currentStep, isExiting };
  }, [currentStep, isExiting]);

  const currentQuestion = section2Questions[currentStep];
  const totalSteps = section2Questions.length;

  // 현재 문항에 대한 기존 답변 확인
  const currentAnswer = answers.find(a => a.questionId === currentQuestion.id);

  // 답변 선택 핸들러
  const handleAnswer = async (choice: AnswerChoice) => {
    if (isExiting) return;
    setIsExiting(true);
    
    setDirection(1);

    const newAnswer: UserAnswer = {
      questionId: currentQuestion.id,
      selectedChoiceId: choice.id,
      pattern: choice.pattern,
    };

    const prevAnswers = answers.filter(a => a.questionId !== currentQuestion.id);
    const updatedAnswers = [...prevAnswers, newAnswer];
    
    setAnswers(updatedAnswers);

    setTimeout(() => {
      if (currentStep < totalSteps - 1) {
        setCurrentStep((prev) => prev + 1);
        setIsExiting(false);
      } else {
        finishWizard(updatedAnswers);
      }
    }, 200); 
  };
  
  // 뒤로 가기 핸들러
  const handleBack = () => {
    if (isExiting) return;

     if (currentStep > 0) {
       setDirection(-1);
       setCurrentStep(prev => prev - 1);
     } else {
       setShowExitModal(true);
     }
  };

  // 브라우저 뒤로가기 방지 (Popstate)
  useEffect(() => {
    history.pushState({ wizard: true, trap: 1 }, "", location.href);
    history.pushState({ wizard: true, trap: 2 }, "", location.href);

    const handlePopState = () => {
      const { currentStep, isExiting } = stateRef.current;

      if (isOurNavigationRef.current) {
        isOurNavigationRef.current = false;
        return;
      }

      if (isProgrammaticBackRef.current) return;
      if (isExiting) return;

      isOurNavigationRef.current = true;
      history.go(1);

      if (currentStep > 0) {
        setDirection(-1);
        setCurrentStep(prev => prev - 1);
      } else {
        setShowExitModal(true);
      }
    };

    window.addEventListener("popstate", handlePopState);
    
    return () => {
      window.removeEventListener("popstate", handlePopState);
    };
  }, []);

  // 위저드 완료 핸들러
  const finishWizard = (finalAnswers: UserAnswer[]) => {
    const analysisResult = analyzeSection2(finalAnswers);
    setResult(analysisResult);
  };

  // 결과 페이지 표시 중
  if (result) {
    return <ResultSection2 result={result} />;
  }

  // 인트로 화면
  if (showIntro) {
    return (
      <SectionIntro
        sectionNumber={2}
        title="소통 및 갈등"
        onComplete={() => setShowIntro(false)}
      />
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-rose-50 via-white to-red-50 flex items-center justify-center p-4">
      <div className="w-full max-w-2xl">
        {/* 헤더: 진행률 */}
        <div className="mb-8">
          <ProgressBar current={currentStep + 1} total={totalSteps} />
        </div>

        {/* 뒤로가기 버튼 */}
        <button
          onClick={handleBack}
          disabled={isExiting}
          className="mb-6 flex items-center gap-2 text-sm text-gray-600 hover:text-gray-900 transition-colors disabled:opacity-50"
        >
          <ChevronLeft className="w-4 h-4" />
          이전
        </button>

        {/* 질문 카드 */}
        <AnimatePresence mode="wait" custom={direction}>
          <motion.div
            key={currentStep}
            custom={direction}
            initial={{ opacity: 0, x: direction > 0 ? 100 : -100 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: direction > 0 ? -100 : 100 }}
            transition={{ duration: 0.3 }}
          >
            <QuestionCard
              question={currentQuestion}
              onAnswer={handleAnswer}
              selectedChoiceId={currentAnswer?.selectedChoiceId}
              disabled={isExiting}
            />
          </motion.div>
        </AnimatePresence>
      </div>

      {/* 나가기 확인 모달 */}
      <Modal
        isOpen={showExitModal}
        onClose={() => setShowExitModal(false)}
        title="정말 나가시겠어요?"
        description="지금 나가시면 작성 중인 내용이 모두 사라져요. 정말 나가시겠어요?"
        variant="danger"
        confirmLabel="나가기"
        cancelLabel="계속하기"
        onConfirm={() => {
          isProgrammaticBackRef.current = true;
          router.back();
        }}
      />
    </div>
  );
}
