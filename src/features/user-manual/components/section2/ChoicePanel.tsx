import type { Choice } from "@/features/user-manual/model/section2-schema";

interface ChoicePanelProps {
  choices: Choice[];
  onSelect: (choice: Choice) => void;
}

export function ChoicePanel({ choices, onSelect }: ChoicePanelProps) {
  return (
    <div className="bg-background border-t border-border px-4 py-4">
      <div className="max-w-xl mx-auto">
        <p className="text-xs text-gray-500 mb-3">당신의 선택은?</p>
        <div className="space-y-2">
          {choices.map((choice, index) => {
            const letter = String.fromCharCode(65 + index); // A, B, C, D, E

            return (
              <button
                key={choice.id}
                onClick={() => onSelect(choice)}
                className="w-full text-left p-3 rounded-xl bg-gray-50 hover:bg-highlight border-2 border-transparent hover:border-primary transition-all duration-200"
              >
                <div className="flex items-start gap-3">
                  {/* 선택지 레이블 */}
                  <div className="flex-shrink-0 w-6 h-6 rounded-full bg-gray-200 flex items-center justify-center text-xs font-bold text-gray-600">
                    {letter}
                  </div>

                  {/* 선택지 텍스트 */}
                  <p className="flex-1 text-sm text-gray-700 pt-0.5">{choice.text}</p>
                </div>
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
}
