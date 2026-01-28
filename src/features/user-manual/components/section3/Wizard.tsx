"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { SectionIntro } from "@/shared/components/SectionIntro";
import { CORE_VALUES } from "../../model/section3-values";
import { ValueAspect, Section3Result } from "../../model/section3-schema";
import { analyzeSection3, createTournamentBracket } from "../../model/section3-analyzer";
import { ValueSelection } from "./ValueSelection";
import { Tournament } from "./Tournament";
import { ResultSection3 } from "./ResultSection3";
import { TransitionScreen } from "./TransitionScreen";

type WizardStep =
  | "intro"
  | "value_selection"
  | "intro_positive"
  | "positive_tournament"
  | "intro_negative"
  | "negative_tournament"
  | "result";

export function Wizard() {
  const [step, setStep] = useState<WizardStep>("intro");
  const [selectedCoreValueIds, setSelectedCoreValueIds] = useState<string[]>([]);

  // 긍정 토너먼트 상태
  const [positiveBracket, setPositiveBracket] = useState<ValueAspect[]>([]);
  const [positiveCurrentMatchIndex, setPositiveCurrentMatchIndex] = useState(0);
  const [positiveMatches, setPositiveMatches] = useState<
    { aspectAId: string; aspectBId: string; winnerId: string }[]
  >([]);
  const [positiveFullBracket, setPositiveFullBracket] = useState<ReturnType<typeof createTournamentBracket>>([]);

  // 부정 토너먼트 상태
  const [negativeBracket, setNegativeBracket] = useState<ValueAspect[]>([]);
  const [negativeCurrentMatchIndex, setNegativeCurrentMatchIndex] = useState(0);
  const [negativeMatches, setNegativeMatches] = useState<
    { aspectAId: string; aspectBId: string; winnerId: string }[]
  >([]);
  const [negativeFullBracket, setNegativeFullBracket] = useState<ReturnType<typeof createTournamentBracket>>([]);

  // 결과
  const [result, setResult] = useState<Section3Result | null>(null);

  // 가치 선택 토글
  const handleValueToggle = (id: string) => {
    if (selectedCoreValueIds.includes(id)) {
      setSelectedCoreValueIds(selectedCoreValueIds.filter((v) => v !== id));
    } else if (selectedCoreValueIds.length < 8) {
      setSelectedCoreValueIds([...selectedCoreValueIds, id]);
    }
  };

  // 가치 선택 완료 → 긍정 인트로로 이동
  const handleValueSelectionComplete = () => {
    setStep("intro_positive");
  };

  // 긍정 인트로 완료 → 긍정 토너먼트 시작
  const handlePositiveIntroComplete = () => {
    // 선택한 4개 핵심 가치에서 모든 긍정 항목 추출 (4 × 4 = 16개)
    const selectedValues = CORE_VALUES.filter((v) =>
      selectedCoreValueIds.includes(v.id)
    );
    const positiveAspects = selectedValues.flatMap((v) => v.positiveAspects);

    // 16개 전체 사용 (16강 토너먼트)
    setPositiveBracket(positiveAspects);
    // 브라켓 생성 (한 번만)
    const bracket = createTournamentBracket(positiveAspects);
    setPositiveFullBracket(bracket);
    setStep("positive_tournament");
  };

  // 긍정 토너먼트 선택 처리
  const handlePositiveTournamentSelect = (aspectId: string) => {
    const currentMatch = positiveFullBracket[positiveCurrentMatchIndex];

    // 매치 결과 저장
    const newMatch = {
      aspectAId: currentMatch.aspectA.id,
      aspectBId: currentMatch.aspectB.id,
      winnerId: aspectId,
    };
    const updatedMatches = [...positiveMatches, newMatch];
    setPositiveMatches(updatedMatches);

    // 다음 매치로
    if (positiveCurrentMatchIndex < positiveFullBracket.length - 1) {
      // 현재 라운드 계속 진행
      setPositiveCurrentMatchIndex(positiveCurrentMatchIndex + 1);
    } else {
      // 현재 라운드 완료 → 다음 라운드 준비
      const roundWinners = updatedMatches
        .slice(-positiveFullBracket.length) // 현재 라운드 매치만
        .map((m) => positiveBracket.find((a) => a.id === m.winnerId)!);

      if (roundWinners.length === 1) {
        // 결승 완료 → 부정 토너먼트로
        handlePositiveTournamentComplete(aspectId);
      } else {
        // 다음 라운드 진행
        setPositiveBracket(roundWinners);
        const newBracket = createTournamentBracket(roundWinners);
        setPositiveFullBracket(newBracket);
        setPositiveCurrentMatchIndex(0);
      }
    }
  };

  // 긍정 토너먼트 완료 → 부정 인트로로 이동
  const handlePositiveTournamentComplete = (winnerId: string) => {
    // 마지막 매치(결승) 업데이트
    const updatedMatches = [...positiveMatches];
    updatedMatches[updatedMatches.length - 1].winnerId = winnerId;
    setPositiveMatches(updatedMatches);

    setStep("intro_negative");
  };

  // 부정 인트로 완료 → 부정 토너먼트 시작
  const handleNegativeIntroComplete = () => {
    // 부정 토너먼트 준비
    const selectedValues = CORE_VALUES.filter((v) =>
      selectedCoreValueIds.includes(v.id)
    );
    const negativeAspects = selectedValues.flatMap((v) => v.negativeAspects);

    // 16개 전체 사용 (16강 토너먼트)
    setNegativeBracket(negativeAspects);
    const bracket = createTournamentBracket(negativeAspects);
    setNegativeFullBracket(bracket);
    setStep("negative_tournament");
  };

  // 부정 토너먼트 선택 처리
  const handleNegativeTournamentSelect = (aspectId: string) => {
    const currentMatch = negativeFullBracket[negativeCurrentMatchIndex];

    // 매치 결과 저장
    const newMatch = {
      aspectAId: currentMatch.aspectA.id,
      aspectBId: currentMatch.aspectB.id,
      winnerId: aspectId,
    };
    const updatedMatches = [...negativeMatches, newMatch];
    setNegativeMatches(updatedMatches);

    // 다음 매치로
    if (negativeCurrentMatchIndex < negativeFullBracket.length - 1) {
      // 현재 라운드 계속 진행
      setNegativeCurrentMatchIndex(negativeCurrentMatchIndex + 1);
    } else {
      // 현재 라운드 완료 → 다음 라운드 준비
      const roundWinners = updatedMatches
        .slice(-negativeFullBracket.length) // 현재 라운드 매치만
        .map((m) => negativeBracket.find((a) => a.id === m.winnerId)!);

      if (roundWinners.length === 1) {
        // 결승 완료 → 결과 분석으로
        handleNegativeTournamentComplete(aspectId);
      } else {
        // 다음 라운드 진행
        setNegativeBracket(roundWinners);
        const newBracket = createTournamentBracket(roundWinners);
        setNegativeFullBracket(newBracket);
        setNegativeCurrentMatchIndex(0);
      }
    }
  };

  // 부정 토너먼트 완료 → 결과 분석
  const handleNegativeTournamentComplete = (winnerId: string) => {
    // 마지막 매치(결승) 업데이트
    const updatedMatches = [...negativeMatches];
    updatedMatches[updatedMatches.length - 1].winnerId = winnerId;
    setNegativeMatches(updatedMatches);

    // 분석 실행
    const positiveWinnerId = positiveMatches[positiveMatches.length - 1].winnerId;
    const positiveRunnerUpId =
      positiveMatches[positiveMatches.length - 2].winnerId === positiveWinnerId
        ? positiveMatches[positiveMatches.length - 2].aspectAId
        : positiveMatches[positiveMatches.length - 2].aspectBId;

    const negativeWinnerId = winnerId;
    const negativeRunnerUpId =
      updatedMatches[updatedMatches.length - 2].winnerId === negativeWinnerId
        ? updatedMatches[updatedMatches.length - 2].aspectAId
        : updatedMatches[updatedMatches.length - 2].aspectBId;

    const analysisResult = analyzeSection3({
      selectedCoreValues: selectedCoreValueIds,
      positiveTournament: {
        matches: positiveMatches.map((m, i) => ({
          id: `pos_match_${i}`,
          round: i < 2 ? 1 : 2,
          ...m,
        })),
        winnerId: positiveWinnerId,
        runnerUpId: positiveRunnerUpId,
      },
      negativeTournament: {
        matches: updatedMatches.map((m, i) => ({
          id: `neg_match_${i}`,
          round: i < 2 ? 1 : 2,
          ...m,
        })),
        winnerId: negativeWinnerId,
        runnerUpId: negativeRunnerUpId,
      },
    });

    setResult(analysisResult);
    setStep("result");
  };

  // 현재 스텝 렌더링
  const renderContent = () => {
    switch (step) {
      case "intro":
        return (
          <SectionIntro
            sectionNumber={3}
            title="가치관 월드컵"
            onComplete={() => setStep("value_selection")}
          />
        );
      
      case "value_selection":
        return (
          <ValueSelection
            coreValues={CORE_VALUES}
            selectedIds={selectedCoreValueIds}
            onToggle={handleValueToggle}
            onComplete={handleValueSelectionComplete}
          />
        );

      case "intro_positive":
        return (
          <TransitionScreen 
            type="positive" 
            onComplete={handlePositiveIntroComplete} 
          />
        );

      case "positive_tournament":
        if (positiveFullBracket.length === 0) return null;
        const currentPosMatch = positiveFullBracket[positiveCurrentMatchIndex];
        return (
          <Tournament
            type="positive"
            currentMatch={currentPosMatch}
            onSelect={handlePositiveTournamentSelect}
          />
        );
      
      case "intro_negative":
        return (
          <TransitionScreen 
            type="negative" 
            onComplete={handleNegativeIntroComplete} 
          />
        );

      case "negative_tournament":
        if (negativeFullBracket.length === 0) return null;
        const currentNegMatch = negativeFullBracket[negativeCurrentMatchIndex];
        return (
          <Tournament
            type="negative"
            currentMatch={currentNegMatch}
            onSelect={handleNegativeTournamentSelect}
          />
        );

      case "result":
        return result ? <ResultSection3 result={result} /> : null;
    }
  };

  return (
    <div className="w-full min-h-screen bg-background">
      <AnimatePresence mode="wait">
        <motion.div
          key={step}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3 }}
          className="w-full h-full"
        >
          {renderContent()}
        </motion.div>
      </AnimatePresence>
    </div>
  );
}
