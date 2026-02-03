/**
 * Section 3: 가치 선택 화면
 */

"use client";

import { useState, useEffect } from "react";
import { CoreValue } from "../../model/section3-schema";

interface ValueSelectionProps {
  coreValues: CoreValue[];
  selectedIds: string[];
  onToggle: (id: string) => void;
  onComplete: () => void;
}

// 무거운 톤 + 투명도로 연한 파스텔 색상 팔레트
const PASTEL_COLORS = [
  { bg: "bg-white", border: "border-white" },
  { bg: "bg-white", border: "border-white" },
  { bg: "bg-white", border: "border-white" },
  { bg: "bg-white", border: "border-white" },
  { bg: "bg-white", border: "border-white" },
  { bg: "bg-white", border: "border-white" },
  { bg: "bg-white", border: "border-white" },
  { bg: "bg-white", border: "border-white" },
];

export function ValueSelection({
  coreValues,
  selectedIds,
  onToggle,
  onComplete,
}: ValueSelectionProps) {
  const isSelected = (id: string) => selectedIds.includes(id);
  const canSelect = selectedIds.length < 4;

  // 각 칩의 현재 색상 상태 (null이면 기본 상태)
  const [chipColors, setChipColors] = useState<Record<string, typeof PASTEL_COLORS[0] | null>>({});

  useEffect(() => {
    const interval = setInterval(() => {
      // 선택되지 않은 칩들만 필터링
      const unselectedChips = coreValues.filter((v) => !selectedIds.includes(v.id));
      
      if (unselectedChips.length === 0) return;

      // 랜덤하게 2~3개 선택
      const numToAnimate = Math.floor(Math.random() * 2) + 3; // 3 or 4
      const chipsToAnimate = [...unselectedChips]
        .sort(() => Math.random() - 0.5)
        .slice(0, Math.min(numToAnimate, unselectedChips.length));

      // 각 칩에 랜덤 딜레이를 주어서 순차적으로 색상 적용
      chipsToAnimate.forEach((chip, index) => {
        const randomDelay = (Math.random() * 800) + 200; // 200~1000ms 랜덤 딜레이
        const randomColor = PASTEL_COLORS[Math.floor(Math.random() * PASTEL_COLORS.length)];
        
        setTimeout(() => {
          setChipColors(prev => ({
            ...prev,
            [chip.id]: randomColor
          }));

          // 0.5초 후 해당 칩의 색상만 제거
          setTimeout(() => {
            setChipColors(prev => {
              const newColors = { ...prev };
              delete newColors[chip.id];
              return newColors;
            });
          }, 500);
        }, randomDelay);
      });
    }, 3000);

    return () => clearInterval(interval);
  }, [coreValues, selectedIds]);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen px-6 py-12">
      <div className="w-full max-w-4xl space-y-8">
        {/* Header */}
        <div className="text-center space-y-3">
          <h2 className="text-2xl md:text-3xl font-bold text-slate-800 leading-normal">
            당신이 중요하게 생각하는 가치<br />4가지를 선택해주세요
          </h2>
          <p className="text-slate-600">
            <span className="font-bold text-primary">{selectedIds.length}</span> / 4
          </p>
        </div>

        {/* Value Grid */}
        <div className="grid grid-cols-3 md:grid-cols-5 lg:grid-cols-6 gap-4 md:gap-6">
          {coreValues.map((value) => {
            const selected = isSelected(value.id);
            const animatedColor = chipColors[value.id];
            
            return (
              <button
                key={value.id}
                onClick={() => {
                  if (selected || canSelect) {
                    onToggle(value.id);
                  }
                }}
                disabled={!selected && !canSelect}
                className={`
                  relative px-4 py-4 rounded-2xl font-semibold text-xs md:text-sm
                  transition-all duration-500 shadow-sm shadow-primary/20
                  ${
                    selected
                      ? "bg-primary text-white shadow-lg shadow-primary/30 md:scale-102 scale-102"
                      : canSelect
                      ? animatedColor
                        ? `${animatedColor.bg} text-gray-700`
                        : "bg-white/40  text-gray-600 hover:bg-primary/20"
                      : "bg-gray-50 text-gray-400 cursor-not-allowed"
                  }
                `}
              >
                {value.name}
              </button>
            );
          })}
        </div>

        {/* Next Button */}
        <div className="flex justify-center pt-4">
          <button
            onClick={onComplete}
            disabled={selectedIds.length !== 4}
            className={`
              px-8 py-4 rounded-xl font-bold text-lg
              transition-all duration-200
              ${
                selectedIds.length === 4
                  ? "bg-primary text-white hover:bg-primary/90 shadow-lg shadow-primary/30"
                  : "bg-gray-200 text-gray-400 cursor-not-allowed"
              }
            `}
          >
            다음
          </button>
        </div>
      </div>
    </div>
  );
}
