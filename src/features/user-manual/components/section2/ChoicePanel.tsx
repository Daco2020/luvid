"use client";

import { useState } from "react";
import { MessageCircle, X, Check, Loader2 } from "lucide-react";
import type { Choice } from "@/features/user-manual/model/section2-schema";

interface ChoicePanelProps {
  choices?: Choice[]; // 완료 상태에서는 선택지 없음
  onSelect: (choice?: Choice) => void;
  isComplete?: boolean; // 마지막 분기인지 여부
  isDisabled?: boolean; // 처리 중 비활성화
}

export function ChoicePanel({ choices, onSelect, isComplete = false, isDisabled = false }: ChoicePanelProps) {
  const [isExpanded, setIsExpanded] = useState(false);

  const handleSelect = (choice: Choice) => {
    onSelect(choice);
    setIsExpanded(false);
  };

  const handleCompleteClick = () => {
    if (isComplete) {
      onSelect(); // 완료 버튼 클릭 시 선택지 없이 호출
    } else {
      setIsExpanded(!isExpanded);
    }
  };

  return (
    <div className="relative">
      {/* 확장된 선택지 메뉴 - 완료 상태가 아닐 때만 */}
      {isExpanded && !isComplete && choices && (
        <>
          {/* 배경 오버레이 */}
          <div
            className="fixed inset-0 bg-black/20 z-40"
            onClick={() => setIsExpanded(false)}
          />

          {/* 선택지 패널 - 플로팅 버튼 왼쪽에 배치 */}
          <div className="absolute bottom-0 right-16 md:right-20 w-80 max-w-[calc(100vw-6rem)] bg-white rounded-2xl shadow-2xl border border-gray-200 z-50 max-h-[60vh] overflow-y-auto">
            <div className="p-4">
              <div className="flex items-center justify-between mb-3">
                <p className="text-sm font-semibold text-gray-700">당신의 선택은?</p>
                <button
                  onClick={() => setIsExpanded(false)}
                  className="text-gray-400 hover:text-gray-600 transition-colors"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              <div className="space-y-2">
                {choices.map((choice, index) => {
                  const letter = String.fromCharCode(65 + index); // A, B, C, D, E

                  return (
                    <button
                      key={choice.id}
                      onClick={() => handleSelect(choice)}
                      className="w-full text-left p-3 rounded-xl bg-gray-50 hover:bg-primary/10 border-2 border-transparent hover:border-primary transition-all duration-200"
                    >
                      <div className="flex items-start gap-3">
                        {/* 선택지 레이블 */}
                        <div className="shrink-0 w-6 h-6 rounded-full bg-gray-200 flex items-center justify-center text-xs font-bold text-gray-600">
                          {letter}
                        </div>

                        {/* 선택지 텍스트 */}
                        <p className="flex-1 text-xs text-gray-700 pt-0.5 leading-relaxed">
                          {choice.text}
                        </p>
                      </div>
                    </button>
                  );
                })}
              </div>
            </div>
          </div>
        </>
      )}

      {/* 플로팅 버튼 */}
      <button
        onClick={handleCompleteClick}
        disabled={isDisabled}
        className={`w-14 h-14 rounded-full shadow-lg flex items-center justify-center transition-all duration-300 ${
          isDisabled
            ? "bg-gray-400 cursor-not-allowed"
            : isExpanded
            ? "bg-gray-600 hover:bg-gray-700"
            : isComplete
            ? "bg-teal-600 hover:bg-teal-700/90"
            : "bg-primary hover:bg-primary/90"
        }`}
        title={isComplete ? "결과 보기" : "선택하기"}
      >
        {isDisabled ? (
          <Loader2 className="w-6 h-6 text-white animate-spin" />
        ) : isExpanded ? (
          <X className="w-6 h-6 text-white" />
        ) : isComplete ? (
          <Check className="w-6 h-6 text-white" />
        ) : (
          <MessageCircle className="w-6 h-6 text-white" />
        )}
      </button>
    </div>
  );
}
