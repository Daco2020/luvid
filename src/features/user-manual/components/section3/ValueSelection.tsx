/**
 * Section 3: 가치 선택 화면
 * 20개 핵심 가치 중 8개를 선택하는 화면
 */

import { CoreValue } from "@/features/user-manual/model/section3-schema";

interface ValueSelectionProps {
  coreValues: CoreValue[];
  selectedIds: string[];
  onToggle: (id: string) => void;
  onComplete: () => void;
}

export function ValueSelection({
  coreValues,
  selectedIds,
  onToggle,
  onComplete,
}: ValueSelectionProps) {
  const isSelected = (id: string) => selectedIds.includes(id);
  const canProceed = selectedIds.length === 8;

  return (
    <div className="max-w-5xl mx-auto">
      {/* 제목 */}
      <div className="text-center mb-8">
        <h2 className="md:text-2xl text-xl font-bold text-gray-900 mb-4">
          연인에게 중요한 가치 8가지를 선택해주세요
        </h2>
        <p className="text-gray-600 mb-2">
          이상적인 연인에게서 발견하고 싶은 가치를 골라주세요.
        </p>
        <div className="text-sm text-gray-500">
          선택된 가치: <span className="font-bold text-primary">{selectedIds.length}</span> / 8
        </div>
      </div>

      {/* 가치 칩 그리드 */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-8">
        {coreValues.map((value) => {
          const selected = isSelected(value.id);
          return (
            <button
              key={value.id}
              onClick={() => onToggle(value.id)}
              disabled={!selected && selectedIds.length >= 8}
              className={`
                relative px-4 py-3 rounded-xl font-medium text-sm transition-all duration-200
                ${
                  selected
                    ? "bg-primary text-white shadow-lg scale-105"
                    : "bg-white text-gray-700 border-2 border-gray-200 hover:border-primary hover:shadow-md"
                }
                ${!selected && selectedIds.length >= 8 ? "opacity-40 cursor-not-allowed" : "cursor-pointer"}
              `}
            >
              {/* 선택 표시 */}
              {selected && (
                <div className="absolute -top-1 -right-1 w-5 h-5 bg-accent rounded-full flex items-center justify-center">
                  <span className="text-white text-xs">✓</span>
                </div>
              )}
              
              <div className="text-center">
                <div className="font-bold">{value.name}</div>
                <div className="text-xs opacity-80 mt-0.5">{value.nameEn}</div>
              </div>
            </button>
          );
        })}
      </div>

      {/* 다음 버튼 */}
      <div className="flex justify-center">
        <button
          onClick={onComplete}
          disabled={!canProceed}
          className={`
            px-8 py-3 rounded-xl font-bold text-lg transition-all duration-200
            ${
              canProceed
                ? "bg-primary text-white hover:bg-primary/90 shadow-lg hover:shadow-xl"
                : "bg-gray-200 text-gray-400 cursor-not-allowed"
            }
          `}
        >
          {canProceed ? "다음 단계로" : "8개를 선택해주세요"}
        </button>
      </div>
    </div>
  );
}
