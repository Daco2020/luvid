"use client";

import { useState, useEffect, useRef } from "react";
import { useRouter } from "next/navigation";
import { AnimatePresence, motion } from "framer-motion";
import { ChevronLeft } from "lucide-react";

import { QuestionCard } from "./QuestionCard";
import { ProgressBar } from "./ProgressBar";
import { ResultSection1 } from "./ResultSection1";
import { Modal } from "@/shared/components/Modal";
import { SectionIntro } from "@/shared/components/SectionIntro";

import { section1Questions } from "@/features/user-manual/model/section1-questions";
import { UserAnswer, AnswerChoice, Section1Result } from "@/features/user-manual/model/section1-schema";
import { analyzeSection1 } from "@/features/user-manual/model/section1-analyzer";
import { saveUserManual, loadUserManual } from "@/features/user-manual/utils/storage";

export function Wizard() {
  const router = useRouter();
  
  // 상태 관리
  const [showIntro, setShowIntro] = useState(true);
  const [currentStep, setCurrentStep] = useState(0);
  const [answers, setAnswers] = useState<UserAnswer[]>([]);
  const [isExiting, setIsExiting] = useState(false);
  const [result, setResult] = useState<Section1Result | null>(null);

  const [direction, setDirection] = useState(0); // 1: Next, -1: Prev
  const [showExitModal, setShowExitModal] = useState(false);

  // Event Handler에서 최신 State를 참조하기 위한 Ref
  const stateRef = useRef({ currentStep, isExiting });
  const isProgrammaticBackRef = useRef(false);
  const isOurNavigationRef = useRef(false); // 우리가 go(1)을 호출했는지 추적

  useEffect(() => {
    stateRef.current = { currentStep, isExiting };
  }, [currentStep, isExiting]);

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
    // Mount 시 히스토리 스택 추가하여 "Trap" 생성 (Double Trap)
    history.pushState({ wizard: true, trap: 1 }, "", location.href);
    history.pushState({ wizard: true, trap: 2 }, "", location.href);

    const handlePopState = (e: PopStateEvent) => {
      const { currentStep, isExiting } = stateRef.current;

      // 우리가 go(1)을 호출해서 발생한 popstate는 무시
      if (isOurNavigationRef.current) {
        isOurNavigationRef.current = false;
        return;
      }

      // 프로그램적 뒤로가기인 경우 무시 (Modal에서 confirm 시)
      if (isProgrammaticBackRef.current) return;

      // 애니메이션 중이면 무시
      if (isExiting) return;

      // 뒤로가기를 막고 go(1)로 복구
      isOurNavigationRef.current = true;
      history.go(1);

      if (currentStep > 0) {
        // 내부 스텝 뒤로가기
        setDirection(-1);
        setCurrentStep(prev => prev - 1);
      } else {
        // 이탈 시도 -> 모달 표시
        setShowExitModal(true);
      }
    };

    window.addEventListener("popstate", handlePopState);
    
    return () => {
      window.removeEventListener("popstate", handlePopState);
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



  const handleNextSection = () => {
    router.push("/user-manual/conflict-styles");
  };

  if (result) {
    return (
      <div className="min-h-screen bg-background mt-10 py-10 px-4 sm:px-6 relative overflow-y-auto w-full flex items-start justify-center">
        <ResultSection1 data={result} onNext={handleNextSection} />
      </div>
    );
  }

  if (showIntro) {
    return (
      <AnimatePresence>
        <SectionIntro
          sectionNumber={1}
          title="정서적 안정성"
          onComplete={() => setShowIntro(false)}
        />
      </AnimatePresence>
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
            정서적 안정성
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
          // Trap이 설정되어 있으므로 history.go(-3)으로 진짜 이전 페이지로 이동
          // (Trap2 + Trap1 + Wizard진입 = 총 3단계를 돌아가야 함)
          isProgrammaticBackRef.current = true;
          setShowExitModal(false);
          history.go(-3);
        }}
        variant="danger" // 내용 삭제는 위험한 동작이므로 danger variant 사용
      />
    </div>
  );
}
