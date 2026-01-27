/**
 * Section 3: 토너먼트 화면
 * 선택한 가치들을 토너먼트 방식으로 비교하여 우선순위를 결정
 */

import { ValueAspect } from "@/features/user-manual/model/section3-schema";
import { getValueAspectIcon } from "@/features/user-manual/model/icon-mapper";
import { motion } from "framer-motion";

interface TournamentProps {
  type: "positive" | "negative";
  currentMatch: {
    round: number; // 1: 준결승(4강), 2: 결승
    matchNumber: number; // 현재 매치 번호
    totalMatches: number; // 해당 라운드 총 매치 수
    aspectA: ValueAspect;
    aspectB: ValueAspect;
  };
  onSelect: (aspectId: string) => void;
}

export function Tournament({ type, currentMatch, onSelect }: TournamentProps) {
  const { round, matchNumber, totalMatches, aspectA, aspectB } = currentMatch;

  const title = type === "positive" ? "추구하는 가치 토너먼트" : "거부하는 가치 토너먼트";
  const subtitle =
    type === "positive"
      ? "연인에게서 더 중요하게 생각하는 가치를 선택해주세요"
      : "절대 받아들일 수 없는 것을 선택해주세요";

  const roundName = round === 1 ? "16강" : round === 2 ? "8강" : round === 3 ? "준결승" : "결승";
  const bgColor = type === "positive" ? "from-blue-50 to-purple-50" : "from-red-50 to-orange-50";

  return (
    <div className={`min-h-[600px] bg-gradient-to-br ${bgColor} rounded-3xl p-8`}>
      {/* 헤더 */}
      <div className="text-center mb-8">
        <h2 className="md:text-2xl text-xl font-bold text-gray-900 mb-2">{title}</h2>
        <p className="text-gray-600 mb-4">{subtitle}</p>
        <div className="text-sm text-gray-500">
          {roundName} - {matchNumber} / {totalMatches}
        </div>
      </div>

      {/* VS 레이아웃 */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl mx-auto">
        {/* 옵션 A */}
        <ValueCard aspect={aspectA} onSelect={() => onSelect(aspectA.id)} type={type} />

        {/* VS 구분선 (모바일에서는 가로, 데스크톱에서는 세로) */}
        <div className="hidden md:flex items-center justify-center absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2">
          <div className="w-12 h-12 bg-white rounded-full shadow-lg flex items-center justify-center font-bold text-gray-700">
            VS
          </div>
        </div>
        <div className="md:hidden flex items-center justify-center my-2">
          <div className="w-12 h-12 bg-white rounded-full shadow-lg flex items-center justify-center font-bold text-gray-700">
            VS
          </div>
        </div>

        {/* 옵션 B */}
        <ValueCard aspect={aspectB} onSelect={() => onSelect(aspectB.id)} type={type} />
      </div>
    </div>
  );
}

// 개별 가치 카드 컴포넌트
interface ValueCardProps {
  aspect: ValueAspect;
  onSelect: () => void;
  type: "positive" | "negative";
}

function ValueCard({ aspect, onSelect, type }: ValueCardProps) {
  const Icon = getValueAspectIcon(aspect.id);
  const iconColor = type === "positive" ? "text-blue-500" : "text-red-500";
  const iconBgColor = type === "positive" ? "bg-blue-50" : "bg-red-50";
  const hoverColor =
    type === "positive"
      ? "hover:border-blue-600 hover:shadow-blue-200"
      : "hover:border-red-600 hover:shadow-red-200";

  return (
    <motion.button
      onClick={onSelect}
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
      className={`
        relative bg-white rounded-2xl p-6 border-2 border-gray-200
        ${hoverColor}
        hover:shadow-xl transition-all duration-200 text-left
        group
      `}
    >
      {/* 아이콘 */}
      <div className="flex justify-center mb-4">
        <div className={`p-4 rounded-2xl ${iconBgColor}`}>
          <Icon className={`w-12 h-12 ${iconColor}`} strokeWidth={1.5} />
        </div>
      </div>

      {/* 라벨 */}
      <h3 className="text-xl font-bold text-gray-900 mb-3 group-hover:text-primary transition-colors text-center">
        {aspect.label}
      </h3>

      {/* 설명 */}
      <p className="text-gray-600 text-sm leading-relaxed text-center">{aspect.description}</p>

      {/* Hover 효과 */}
      <div
        className={`
        absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity -z-10
        ${type === "positive" ? "bg-gradient-to-br from-blue-100 to-purple-100" : "bg-gradient-to-br from-red-100 to-orange-100"}
      `}
      />
    </motion.button>
  );
}
