"use client";

import { useState, useEffect, useRef } from "react";
import { useRouter } from "next/navigation";
import { ChevronLeft, MessageCircle } from "lucide-react";

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
  const [showTutorialModal, setShowTutorialModal] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);
  const [isAllComplete, setIsAllComplete] = useState(false); // 6분기 모두 완료 여부

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

  // 시나리오 선택 후 튜토리얼 모달 표시
  const handleScenarioSelect = (scenario: Scenario) => {
    setSelectedScenario(scenario);
    setShowTutorialModal(true);
  };

  // 튜토리얼 모달 닫기 후 위저드 시작
  const handleTutorialClose = () => {
    setShowTutorialModal(false);
    // 첫 번째 분기의 메시지 추가
    if (!selectedScenario) return;
    
    const firstBranch = selectedScenario.branches[0];
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
        // 6분기 모두 완료 - 버튼만 변경, 자동 이동 안 함
        setIsAllComplete(true);
        setIsProcessing(false);
      }
    }, 1500); // 1.5초 딜레이
  };

  // 뒤로 가기 핸들러 - 모달 표시
  const handleBack = () => {
    if (isProcessing) return;
    setShowExitModal(true);
  };

  // 브라우저 뒤로가기 방지
  useEffect(() => {
    if (!selectedScenario) return;

    // Mount 시 히스토리 스택 추가
    history.pushState({ wizard: true, trap: 1 }, "", location.href);
    history.pushState({ wizard: true, trap: 2 }, "", location.href);

    const handlePopState = () => {
      // 프로그램적 뒤로가기인 경우 무시
      if (isProgrammaticBackRef.current) {
        isProgrammaticBackRef.current = false;
        return;
      }
      
      // 뒤로가기를 막고 go(1)로 복구
      history.go(1);
      
      // 모달 표시
      setShowExitModal(true);
    };

    window.addEventListener("popstate", handlePopState);

    return () => {
      window.removeEventListener("popstate", handlePopState);
    };
  }, [selectedScenario]);

  // 위저드 완료
  const finishWizard = (finalChoices: UserChoice[]) => {
    if (!selectedScenario) return;
    const analysisResult = analyzeSection2(selectedScenario.id, finalChoices);
    setResult(analysisResult);
  };

  // 결과 페이지
  if (result) {
    return (
      <div className="min-h-screen bg-background mt-10 py-10 px-4 sm:px-6 relative overflow-y-auto w-full flex items-start justify-center">
        <ResultSection2 result={result} />
      </div>
    );
  }

  // 튜토리얼 모달
  if (showTutorialModal) {
    return (
      <div className="min-h-screen bg-background flex flex-col py-10 px-4 sm:px-6 relative overflow-hidden w-full">
        <Modal
          isOpen={true}
          onClose={handleTutorialClose}
          title="대화 방법 안내"
          description=""
          variant="info"
          confirmLabel="시작하기"
          onConfirm={handleTutorialClose}
        >
          <div className="space-y-4 text-left">
            <p className="text-xs text-gray-700 leading-relaxed">
              대화를 시작하면 <strong>화면 하단</strong>에 말풍선 버튼이 나타납니다.
            </p>
            
            <div className="flex items-center justify-center gap-3 bg-blue-50 p-4 rounded-lg">
              <div className="shrink-0 w-12 h-12 rounded-full bg-primary flex items-center justify-center shadow-lg">
                <MessageCircle className="w-6 h-6 text-white" />
              </div>
              <p className="text-xs text-gray-700">
                ← 이 버튼이 말풍선 버튼이에요!
              </p>
            </div>

            <p className="text-xs text-gray-600">
              버튼을 누르면 <strong>선택지</strong>가 나타나고 원하는 답변을 선택할 수 있어요.
            </p>
          </div>
        </Modal>
      </div>
    );
  }

  // 인트로 화면
  if (showIntro) {
    return <SectionIntro sectionNumber={2} title="소통 및 갈등" onComplete={() => setShowIntro(false)} />;
  }

  // 시나리오 선택 화면
  if (!selectedScenario) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center p-4">
        <div className="w-full max-w-xl mx-auto">
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
    <div className="h-screen flex flex-col bg-background">
      {/* 헤더 - 모바일 친화적 */}
      <div className="bg-white border-b border-border px-4 py-3 shadow-sm">
        <div className="max-w-xl mx-auto flex items-center justify-between">
          <button onClick={handleBack} disabled={isProcessing} className="flex items-center gap-1 text-gray-600 hover:text-gray-900 transition-colors disabled:opacity-50">
            <ChevronLeft className="w-5 h-5" />
            <span className="text-sm font-medium">나가기</span>
          </button>

          <div className="text-center flex-1">
            <h3 className="text-sm font-semibold text-gray-900">{selectedScenario.title}</h3>
            <p className="text-xs text-gray-500">
              {currentBranchIndex + 1} / {totalBranches}
            </p>
          </div>

          <div className="w-16"></div> {/* 균형 맞추기 */}
        </div>
      </div>

      {/* 대화 영역 - 스크롤 가능, 표시선까지만 */}
      <div className="flex-1 overflow-y-auto bg-background" style={{ maxHeight: '80vh' }}>
        <div className="max-w-xl mx-auto px-4 py-6 space-y-4">
          {messages.map((message) => (
            <ChatMessage key={message.id} message={message} />
          ))}
          <div ref={messagesEndRef} />
        </div>
      </div>

      {/* 고정 영역 - 표시선 + 플로팅 버튼 (15vh) */}
      <div className="relative bg-background" style={{ height: '20vh', minHeight: '120px' }}>
        <div className="max-w-xl mx-auto h-full relative px-4">
          {/* 대화 끝 표시선 - 상단 고정 */}
          <div className="absolute top-0 left-4 right-4">
            <div className="w-full h-px bg-gray-300"></div>
          </div>
          
          {/* 플로팅 버튼 - 우측 하단 (진행 중) */}
          {currentBranch && !isAllComplete && (
            <div className="absolute top-6 right-4 md:right-6 z-50">
              <ChoicePanel 
                choices={currentBranch.choices} 
                onSelect={(choice) => choice && handleChoiceSelect(choice)}
                isComplete={false}
                isDisabled={isProcessing}
              />
            </div>
          )}

          {/* 플로팅 버튼 - 우측 하단 (완료) */}
          {isAllComplete && (
            <div className="absolute top-6 right-4 md:right-6 z-50">
              <ChoicePanel 
                onSelect={() => {
                  if (selectedScenario) {
                    const analysisResult = analyzeSection2(selectedScenario.id, choices);
                    setResult(analysisResult);
                  }
                }}
                isComplete={true}
              />
            </div>
          )}
        </div>
      </div>

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
          // 시나리오 선택 화면으로 리셋
          isProgrammaticBackRef.current = true;
          setShowExitModal(false);
          setSelectedScenario(null);
          setChoices([]);
          setCurrentBranchIndex(0);
          setMessages([]);
          setIsAllComplete(false);
        }}
      />
    </div>
  );
}
