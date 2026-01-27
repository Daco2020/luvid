/**
 * Section 3: 토너먼트 화면
 * 선택한 가치들을 토너먼트 방식으로 비교하여 우선순위를 결정
 */

import { ValueAspect } from "@/features/user-manual/model/section3-schema";
import { getValueAspectIcon } from "@/features/user-manual/model/icon-mapper";
import { motion, AnimatePresence } from "framer-motion";
import { useState, useEffect } from "react";

interface TournamentProps {
  type: "positive" | "negative";
  currentMatch: {
    round: number;
    matchNumber: number;
    totalMatches: number;
    aspectA: ValueAspect;
    aspectB: ValueAspect;
  };
  onSelect: (aspectId: string) => void;
}

export function Tournament({ type, currentMatch, onSelect }: TournamentProps) {
  const { round, matchNumber, totalMatches, aspectA, aspectB } = currentMatch;
  const [selectedId, setSelectedId] = useState<string | null>(null);

  const title = type === "positive" ? "추구하는 가치 토너먼트" : "거부하는 가치 토너먼트";
  const subtitle =
    type === "positive"
      ? "연인에게서 더 중요하게 생각하는 가치를 선택해주세요"
      : "절대 받아들일 수 없는 것을 선택해주세요";

  const roundName = round === 1 ? "16강" : round === 2 ? "8강" : round === 3 ? "준결승" : "결승";

  const handleSelect = (aspectId: string) => {
    if (selectedId) return; // 이미 선택 중이면 무시
    setSelectedId(aspectId);
  };

  // 애니메이션 완료 후 onSelect 호출
  useEffect(() => {
    if (selectedId) {
      const timer = setTimeout(() => {
        onSelect(selectedId);
        setSelectedId(null);
      }, 1000); // 애니메이션 시간과 동일

      return () => clearTimeout(timer);
    }
  }, [selectedId, onSelect]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-slate-50 flex items-center justify-center p-4 md:p-8">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="w-full max-w-6xl"
      >
        {/* Header */}
        <div className="text-center mb-8 md:mb-10">
          <h1 className="text-2xl md:text-3xl font-bold text-slate-800 mb-3">
            {title}
          </h1>
          <p className="text-slate-600 text-base md:text-lg mb-2">{subtitle}</p>
          <p className="text-sm text-slate-500">
            {roundName} - {matchNumber} / {totalMatches}
          </p>
        </div>

        {/* Cards Container */}
        <div className="relative grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-10 items-stretch">
          {/* Card A */}
          <ValueCard
            aspect={aspectA}
            onSelect={() => handleSelect(aspectA.id)}
            type={type}
            isSelected={selectedId === aspectA.id}
            isOtherSelected={selectedId !== null && selectedId !== aspectA.id}
          />

          {/* VS Badge - Centered */}
          <div className="flex items-center justify-center md:absolute md:left-1/2 md:top-1/2 md:-translate-x-1/2 md:-translate-y-1/2 md:z-10 my-4 md:my-0">
            <div className="bg-white rounded-full w-14 h-14 md:w-16 md:h-16 flex items-center justify-center shadow-xl border-4 border-slate-100">
              <span className="text-lg md:text-2xl font-bold text-red-500">VS</span>
            </div>
          </div>

          {/* Card B */}
          <ValueCard
            aspect={aspectB}
            onSelect={() => handleSelect(aspectB.id)}
            type={type}
            isSelected={selectedId === aspectB.id}
            isOtherSelected={selectedId !== null && selectedId !== aspectB.id}
          />
        </div>
      </motion.div>
    </div>
  );
}

// 개별 가치 카드 컴포넌트
interface ValueCardProps {
  aspect: ValueAspect;
  onSelect: () => void;
  type: "positive" | "negative";
  isSelected: boolean;
  isOtherSelected: boolean;
}

function ValueCard({ aspect, onSelect, type, isSelected, isOtherSelected }: ValueCardProps) {
  const Icon = getValueAspectIcon(aspect.id);
  const iconColor = type === "positive" ? "text-blue-500" : "text-red-500";
  const iconBgColor = type === "positive" ? "bg-blue-50" : "bg-red-50";
  const hoverBorderColor = type === "positive" ? "hover:border-blue-400" : "hover:border-red-400";
  const hoverShadowColor =
    type === "positive" ? "hover:shadow-blue-200/60" : "hover:shadow-red-200/60";
  const selectedBorderColor = type === "positive" ? "border-blue-500" : "border-red-500";
  const selectedShadow =
    type === "positive"
      ? "0 20px 60px rgba(59, 130, 246, 0.5)"
      : "0 20px 60px rgba(239, 68, 68, 0.5)";

  return (
    <motion.button
      onClick={onSelect}
      disabled={isSelected || isOtherSelected}
      whileHover={!isSelected && !isOtherSelected ? { scale: 1.02, y: -4 } : {}}
      whileTap={!isSelected && !isOtherSelected ? { scale: 0.98 } : {}}
      animate={
        isSelected
          ? {
              scale: 1.1,
              y: -20,
              borderWidth: 4,
              boxShadow: selectedShadow,
            }
          : isOtherSelected
          ? {
              opacity: 0,
              scale: 0.95,
              y: 20,
              filter: "blur(4px)",
            }
          : {}
      }
      transition={{ duration: 1.0, ease: "easeOut" }}
      className={`
        relative bg-white rounded-2xl p-6 md:p-8 border-2
        ${isSelected ? selectedBorderColor : "border-gray-200"}
        ${!isSelected && !isOtherSelected ? `${hoverBorderColor} ${hoverShadowColor}` : ""}
        ${!isSelected && !isOtherSelected ? "hover:shadow-xl" : ""}
        transition-all duration-300
        w-full min-h-[400px] md:min-h-[450px] flex flex-col items-center justify-center
        group cursor-pointer
      `}
    >
      {/* 아이콘 */}
      <div className="mb-5 md:mb-6">
        <div className={`p-4 md:p-5 rounded-2xl ${iconBgColor} group-hover:scale-110 transition-transform duration-300`}>
          <Icon className={`w-14 h-14 md:w-16 md:h-16 ${iconColor}`} strokeWidth={1.5} />
        </div>
      </div>

      {/* 라벨 */}
      <h3 className="text-xl md:text-2xl font-bold text-gray-900 mb-3 text-center px-2">
        {aspect.label}
      </h3>

      {/* 설명 */}
      <p className="text-gray-600 text-sm md:text-base leading-relaxed text-center px-4">
        {aspect.description}
      </p>

      {/* Hover 효과 */}
      {!isSelected && !isOtherSelected && (
        <div
          className={`
            absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100
            transition-opacity duration-300 pointer-events-none
            ${type === "positive" ? "bg-blue-500/5" : "bg-red-500/5"}
          `}
        />
      )}
    </motion.button>
  );
}
