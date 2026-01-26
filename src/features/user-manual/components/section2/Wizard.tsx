"use client";

import { useState, useEffect, useRef } from "react";
import { useRouter } from "next/navigation";
import { ChevronLeft } from "lucide-react";

import { Modal } from "@/shared/components/Modal";
import { SectionIntro } from "@/shared/components/SectionIntro";

import { section2Scenarios } from "@/features/user-manual/model/section2-scenarios";
import type { Scenario, UserChoice, Section2Result, Branch, Choice } from "@/features/user-manual/model/section2-schema";
import { analyzeSection2 } from "@/features/user-manual/model/section2-analyzer";
import { ResultSection2 } from "@/features/user-manual/components/section2/ResultSection2";
import { ScenarioSelection } from "@/features/user-manual/components/section2/ScenarioSelection";
import { ChatMessage } from "./ChatMessage";
import { ChoicePanel } from "./ChoicePanel";

interface Message {
  id: string;
  type: "system" | "partner" | "user";
  text: string;
  caption?: string; // 상황 설명 (partner 타입에서 사용)
  branchId?: number;
  choiceId?: string;
}

export function Wizard() {
  const router = useRouter();
  const messagesEndRef = useRef<HTMLDivElement>(null);

  // 상태 관리
  const [showIntro, setShowIntro] = useState(true);
  const [selectedScenario, setSelectedScenario] = useState<Scenario | null>(null);
  const [currentBranchIndex, setCurrentBranchIndex] = useState(0);
  const [messages, setMessages] = useState<Message[]>([]);
  const [choices, setChoices] = useState<UserChoice[]>([]);
  const [result, setResult] = useState<Section2Result | null>(null);
  const [showExitModal, setShowExitModal] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);

  const isProgrammaticBackRef = useRef(false);

  const currentBranch = selectedScenario?.branches[currentBranchIndex];
  const totalBranches = selectedScenario?.branches.length || 0;

  // 자동 스크롤
  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  // 시나리오 선택 핸들러
  const handleScenarioSelect = (scenario: Scenario) => {
    setSelectedScenario(scenario);
    // 첫 번째 분기의 메시지 추가
    const firstBranch = scenario.branches[0];
    const initialMessages: Message[] = [];

    if (firstBranch.partnerDialogue) {
      // 상대방 대화가 있으면 말풍선 + 캡션
      initialMessages.push({
        id: "partner-0",
        type: "partner",
        text: firstBranch.partnerDialogue,
        caption: firstBranch.situation,
        branchId: firstBranch.id,
      });
    } else {
      // 상대방 대화가 없으면 상황 설명만
      initialMessages.push({
        id: "situation-0",
        type: "system",
        text: firstBranch.situation,
        branchId: firstBranch.id,
      });
    }

    setMessages(initialMessages);
  };

  // 선택지 선택 핸들러
  const handleChoiceSelect = async (choice: Choice) => {
    if (isProcessing || !currentBranch) return;
    setIsProcessing(true);

    // 1. 선택한 답변을 메시지로 추가
    const userMessage: Message = {
      id: `user-${currentBranch.id}-${choice.id}`,
      type: "user",
      text: choice.text,
      branchId: currentBranch.id,
      choiceId: choice.id,
    };

    setMessages((prev) => [...prev, userMessage]);

    // 2. UserChoice 저장
    const newChoice: UserChoice = {
      branchId: currentBranch.id,
      choiceId: choice.id,
      patterns: choice.patterns,
    };

    const prevChoices = choices.filter((c) => c.branchId !== currentBranch.id);
    const updatedChoices = [...prevChoices, newChoice];
    setChoices(updatedChoices);

    // 3. 다음 분기로 이동 또는 완료
    setTimeout(() => {
      if (currentBranchIndex < totalBranches - 1) {
        const nextBranch = selectedScenario!.branches[currentBranchIndex + 1];
        
        // 다음 메시지 추가
        setMessages((prev) => {
          const newMessages = [...prev];
          
          if (nextBranch.partnerDialogue) {
            // 상대방 대화가 있으면 말풍선 + 캡션
            newMessages.push({
              id: `partner-${nextBranch.id}`,
              type: "partner",
              text: nextBranch.partnerDialogue,
              caption: nextBranch.situation,
              branchId: nextBranch.id,
            });
          } else {
            // 상대방 대화가 없으면 상황 설명만
            newMessages.push({
              id: `situation-${nextBranch.id}`,
              type: "system",
              text: nextBranch.situation,
              branchId: nextBranch.id,
            });
          }
          
          return newMessages;
        });

        setCurrentBranchIndex((prev) => prev + 1);
        setIsProcessing(false);
      } else {
        // 완료
        finishWizard(updatedChoices);
      }
    }, 300);
  };

  // 뒤로 가기 핸들러
  const handleBack = () => {
    if (isProcessing) return;

    if (currentBranchIndex > 0) {
      // 이전 분기로 돌아가기
      // 마지막 2개 메시지 제거 (유저 답변 + 현재 상황)
      setMessages((prev) => prev.slice(0, -2));
      setCurrentBranchIndex((prev) => prev - 1);
    } else if (selectedScenario) {
      // 시나리오 선택 화면으로
      setSelectedScenario(null);
      setMessages([]);
      setChoices([]);
      setCurrentBranchIndex(0);
    } else {
      setShowExitModal(true);
    }
  };

  // 브라우저 뒤로가기 방지
  useEffect(() => {
    if (!selectedScenario) return;

    history.pushState({ wizard: true }, "", location.href);

    const handlePopState = () => {
      if (isProgrammaticBackRef.current) return;
      history.go(1);
      handleBack();
    };

    window.addEventListener("popstate", handlePopState);

    return () => {
      window.removeEventListener("popstate", handlePopState);
    };
  }, [selectedScenario, currentBranchIndex, isProcessing]);

  // 위저드 완료
  const finishWizard = (finalChoices: UserChoice[]) => {
    if (!selectedScenario) return;
    const analysisResult = analyzeSection2(selectedScenario.id, finalChoices);
    setResult(analysisResult);
  };

  // 결과 페이지
  if (result) {
    return <ResultSection2 result={result} />;
  }

  // 인트로 화면
  if (showIntro) {
    return <SectionIntro sectionNumber={2} title="소통 및 갈등" onComplete={() => setShowIntro(false)} />;
  }

  // 시나리오 선택 화면
  if (!selectedScenario) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-highlight via-white to-accent/30 flex items-center justify-center p-4">
        <div className="w-full max-w-4xl">
          <ScenarioSelection scenarios={section2Scenarios} onSelect={handleScenarioSelect} onBack={() => setShowExitModal(true)} />
        </div>

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

  // 대화형 UI
  return (
    <div className="h-screen flex flex-col bg-gray-50">
      {/* 헤더 */}
      <div className="bg-white border-b border-gray-200 px-4 py-3 flex items-center justify-between">
        <button onClick={handleBack} disabled={isProcessing} className="flex items-center gap-2 text-gray-600 hover:text-gray-900 transition-colors disabled:opacity-50">
          <ChevronLeft className="w-5 h-5" />
          <span className="text-sm font-medium">이전</span>
        </button>

        <div className="text-center">
          <h3 className="text-sm font-semibold text-gray-900">{selectedScenario.title}</h3>
          <p className="text-xs text-gray-500">
            {currentBranchIndex + 1} / {totalBranches}
          </p>
        </div>

        <div className="w-16"></div> {/* 균형 맞추기 */}
      </div>

      {/* 대화 영역 - 가운데 정렬 */}
      <div className="flex-1 overflow-y-auto">
        <div className="max-w-2xl mx-auto px-4 py-6 space-y-4">
          {messages.map((message) => (
            <ChatMessage key={message.id} message={message} />
          ))}
          <div ref={messagesEndRef} />
        </div>
      </div>

      {/* 선택지 패널 - 항상 렌더링하되 투명도로 제어 */}
      {currentBranch && (
        <div
          className={`transition-opacity duration-300 ${
            isProcessing ? "opacity-0 pointer-events-none" : "opacity-100"
          }`}
        >
          <ChoicePanel choices={currentBranch.choices} onSelect={handleChoiceSelect} />
        </div>
      )}

      {/* 나가기 모달 */}
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
