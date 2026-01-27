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

  const title = type === "positive" ? "추구하는 가치 토너먼트" : "거부하는 가치 토너먼트";
  const subtitle =
    type === "positive"
      ? "연인에게서 더 중요하게 생각하는 가치를 선택해주세요"
      : "절대 받아들일 수 없는 것을 선택해주세요";

  const roundName = round === 1 ? "16강" : round === 2 ? "8강" : round === 3 ? "준결승" : "결승";

  // 고유 키 생성 (라운드와 매치 번호 조합)
  const matchKey = `${type}-${round}-${matchNumber}`;

  return (
    <div className="min-h-screen bg-secondary flex items-center justify-center p-4 md:p-8">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="w-full max-w-sm md:max-w-4xl"
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

        {/* 매치 영역 (key 변경 시 새로 마운트되어 상태 초기화) */}
        <TournamentMatch
          key={matchKey}
          type={type}
          aspectA={aspectA}
          aspectB={aspectB}
          onSelect={onSelect}
        />
      </motion.div>
    </div>
  );
}

interface TournamentMatchProps {
  type: "positive" | "negative";
  aspectA: ValueAspect;
  aspectB: ValueAspect;
  onSelect: (aspectId: string) => void;
}

function TournamentMatch({ type, aspectA, aspectB, onSelect }: TournamentMatchProps) {
  const [selectedId, setSelectedId] = useState<string | null>(null);

  const handleSelect = (aspectId: string) => {
    if (selectedId) return; // 이미 선택 중이면 무시
    setSelectedId(aspectId);
  };

  // 애니메이션 완료 후 onSelect 호출
  useEffect(() => {
    if (selectedId) {
      const timer = setTimeout(() => {
        onSelect(selectedId);
      }, 1000); // 애니메이션 시간

      return () => clearTimeout(timer);
    }
  }, [selectedId, onSelect]);

  return (
    <div className="relative grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-10 items-stretch">
      {/* Card A */}
      <ValueCard
        key={aspectA.id}
        aspect={aspectA}
        onSelect={() => handleSelect(aspectA.id)}
        type={type}
        isSelected={selectedId === aspectA.id}
        isOtherSelected={selectedId !== null && selectedId !== aspectA.id}
        position="left"
      />

      {/* VS Badge - Centered */}
      <AnimatePresence>
        {!selectedId && (
          <div className="flex items-center justify-center md:absolute md:left-1/2 md:top-1/2 md:-translate-x-1/2 md:-translate-y-1/2 md:z-10 my-4 md:my-0 pointer-events-none">
            <motion.div
              initial={{ opacity: 0, scale: 0 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0, transition: { duration: 0.2 } }}
              className="bg-primary rounded-full w-14 h-14 md:w-16 md:h-16 flex items-center justify-center shadow-lg shadow-primary/30"
            >
              <span className="text-lg md:text-2xl font-semibold text-white">VS</span>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* Card B */}
      <ValueCard
        key={aspectB.id}
        aspect={aspectB}
        onSelect={() => handleSelect(aspectB.id)}
        type={type}
        isSelected={selectedId === aspectB.id}
        isOtherSelected={selectedId !== null && selectedId !== aspectB.id}
        position="right"
      />
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
  position: "left" | "right";
}

function ValueCard({ aspect, onSelect, type, isSelected, isOtherSelected, position }: ValueCardProps) {
  const Icon = getValueAspectIcon(aspect.id);
  const iconColor = type === "positive" ? "text-blue-500" : "text-red-500";
  const iconBgColor = type === "positive" ? "bg-blue-50" : "bg-red-50";
  const hoverBorderColor = type === "positive" ? "hover:border-blue-400" : "hover:border-red-400";
  const hoverShadowColor =
    type === "positive" ? "hover:shadow-blue-200/60" : "hover:shadow-red-200/60";
  const selectedBorderColor = type === "positive" ? "border-blue-500" : "border-red-500";

  // 애니메이션 Variants 정의
  const variants = {
    initial: { 
      opacity: 0, 
      scale: 0.96, 
      x: 0,
    },
    visible: { 
      opacity: 1, 
      scale: 1, 
      x: 0,
      transition: { duration: 0.4, ease: "easeOut" as const }
    },
    selected: {
      x: position === "left" ? "55%" : "-55%", // 중앙으로 이동 (gap 고려하여 조정)
      scale: 1.05,
      opacity: 1,
      zIndex: 20,
      transition: { duration: 0.5, ease: "easeInOut" as const }
    },
    hidden: {
      x: position === "left" ? "-50%" : "50%", // 반대편 카드 뒤로 숨거나 살짝만 이동
      opacity: 0,
      scale: 0.9,
      transition: { duration: 0.4, ease: "easeInOut" as const }
    }
  };

  // 현재 상태 결정
  const getCurrentVariant = () => {
    if (isSelected) return "selected";
    if (isOtherSelected) return "hidden";
    return "visible";
  };

  return (
    <motion.button
      initial="initial"
      animate={getCurrentVariant()}
      variants={variants}
      onClick={onSelect}
      disabled={isSelected || isOtherSelected}
      whileHover={!isSelected && !isOtherSelected ? { scale: 1.02, y: -4 } : {}}
      whileTap={!isSelected && !isOtherSelected ? { scale: 0.98 } : {}}
      className={`
        relative bg-white rounded-2xl border-2
        ${isSelected ? selectedBorderColor : "border-gray-200"}
        ${!isSelected && !isOtherSelected ? `${hoverBorderColor} ${hoverShadowColor}` : ""}
        ${!isSelected && !isOtherSelected ? "hover:shadow-xl" : ""}
        transition-all duration-300
        w-full min-h-[400px] md:min-h-[450px] flex flex-col
        group cursor-pointer overflow-hidden
      `}
    >
      {/* 상단 아이콘 영역 (2/3) */}
      <div className="flex-5 flex items-center justify-center pt-8 md:pt-10">
        <div className={`p-4 md:p-5 rounded-2xl ${iconBgColor} group-hover:scale-110 transition-transform duration-300`}>
          <Icon className={`w-14 h-14 md:w-16 md:h-16 ${iconColor}`} strokeWidth={1.5} />
        </div>
      </div>

      {/* 점선 구분선 (좌우 여백 없음) */}
      <div className="w-full border-t-2 border-dashed border-gray-200" />

      {/* 하단 텍스트 영역 (2/3) */}
      <div className="flex-[2] flex flex-col items-center justify-center p-6 md:p-8">
        {/* 라벨 */}
        <h3 className="text-xl md:text-2xl font-bold text-gray-900 mb-3 text-center">
          {aspect.label}
        </h3>

        {/* 설명 */}
        <p className="text-gray-600 text-sm md:text-base leading-relaxed text-center">
          {aspect.description}
        </p>
      </div>

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
