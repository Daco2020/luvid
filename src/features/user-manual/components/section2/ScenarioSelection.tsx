import type { Scenario } from "@/features/user-manual/model/section2-schema";
import { ChevronLeft } from "lucide-react";

interface ScenarioSelectionProps {
  scenarios: Scenario[];
  onSelect: (scenario: Scenario) => void;
  onBack: () => void;
}

export function ScenarioSelection({ scenarios, onSelect, onBack }: ScenarioSelectionProps) {
  return (
    <div>
      {/* 뒤로가기 버튼 */}
      <button
        onClick={onBack}
        className="mb-6 flex items-center gap-2 text-sm text-gray-600 hover:text-gray-900 transition-colors"
      >
        <ChevronLeft className="w-4 h-4" />
        나가기
      </button>

      {/* 제목 */}
      <div className="text-center mb-12">
        <h2 className="text-3xl font-bold text-gray-900 mb-4">
          어떤 상황에서 당신의 갈등 스타일을 확인하고 싶으신가요?
        </h2>
        <p className="text-gray-600">
          공감되는 상황을 선택해주세요. 나이는 상관없습니다.
        </p>
      </div>

      {/* 시나리오 카드 그리드 */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {scenarios.map((scenario) => (
          <button
            key={scenario.id}
            onClick={() => onSelect(scenario)}
            className="group relative bg-white rounded-2xl p-8 shadow-lg hover:shadow-xl transition-all duration-300 text-left border-2 border-transparent hover:border-accent"
          >
            {/* 아이콘 */}
            <div className="text-4xl mb-4">
              {scenario.id === "scenario_a" && "📱"}
              {scenario.id === "scenario_b" && "💑"}
            </div>

            {/* 제목 */}
            <h3 className="text-xl font-bold text-gray-900 mb-2 group-hover:text-primary transition-colors">
              {scenario.title}
            </h3>

            {/* 설명 */}
            <p className="text-gray-600 text-sm mb-4">{scenario.description}</p>

            {/* 분기 수 표시 */}
            <div className="flex items-center gap-2 text-sm text-gray-500">
              <span className="inline-block w-2 h-2 bg-primary rounded-full"></span>
              {scenario.branches.length}개 분기
            </div>

            {/* Hover 효과 */}
            <div className="absolute inset-0 bg-gradient-to-br from-highlight to-accent/30 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity -z-10"></div>
          </button>
        ))}
      </div>
    </div>
  );
}
