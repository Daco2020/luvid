"use client";

import { useState } from "react";
import { SectionIntro } from "@/shared/components/SectionIntro";
import { CORE_VALUES } from "../../model/section3-values";
import { ValueAspect, Section3Result } from "../../model/section3-schema";
import { analyzeSection3, createTournamentBracket } from "../../model/section3-analyzer";
import { ValueSelection } from "./ValueSelection";
import { Tournament } from "./Tournament";
import { ResultSection3 } from "./ResultSection3";

type WizardStep =
  | "intro"
  | "value_selection"
  | "positive_tournament"
  | "negative_tournament"
  | "result";

export function Wizard() {
  const [step, setStep] = useState<WizardStep>("intro");
  const [selectedCoreValueIds, setSelectedCoreValueIds] = useState<string[]>([]);

  // 긍정 토너먼트 상태
  const [positiveBracket, setPositiveBracket] = useState<ValueAspect[]>([]);
  const [positiveMatches, setPositiveMatches] = useState<
    Array<{ aspectAId: string; aspectBId: string; winnerId: string }>
  >([]);
  const [positiveCurrentMatchIndex, setPositiveCurrentMatchIndex] = useState(0);

  // 부정 토너먼트 상태
  const [negativeBracket, setNegativeBracket] = useState<ValueAspect[]>([]);
  const [negativeMatches, setNegativeMatches] = useState<
    Array<{ aspectAId: string; aspectBId: string; winnerId: string }>
  >([]);
  const [negativeCurrentMatchIndex, setNegativeCurrentMatchIndex] = useState(0);

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

  // 가치 선택 완료 → 긍정 토너먼트 시작
  const handleValueSelectionComplete = () => {
    // 선택한 4개 핵심 가치에서 모든 긍정 항목 추출 (4 × 4 = 16개)
    const selectedValues = CORE_VALUES.filter((v) =>
      selectedCoreValueIds.includes(v.id)
    );
    const positiveAspects = selectedValues.flatMap((v) => v.positiveAspects);

    // 16개 전체 사용 (16강 토너먼트)
    setPositiveBracket(positiveAspects);
    setStep("positive_tournament");
  };

  // 긍정 토너먼트 선택 처리
  const handlePositiveTournamentSelect = (aspectId: string) => {
    const bracket = createTournamentBracket(positiveBracket);
    const currentMatch = bracket[positiveCurrentMatchIndex];

    // 매치 결과 저장
    const newMatch = {
      aspectAId: currentMatch.aspectA.id,
      aspectBId: currentMatch.aspectB.id,
      winnerId: aspectId,
    };
    const updatedMatches = [...positiveMatches, newMatch];
    setPositiveMatches(updatedMatches);

    // 다음 매치로
    if (positiveCurrentMatchIndex < bracket.length - 1) {
      // 현재 라운드 계속 진행
      setPositiveCurrentMatchIndex(positiveCurrentMatchIndex + 1);
    } else {
      // 현재 라운드 완료 → 다음 라운드 준비
      const roundWinners = updatedMatches
        .slice(-bracket.length) // 현재 라운드 매치만
        .map((m) => positiveBracket.find((a) => a.id === m.winnerId)!);

      if (roundWinners.length === 1) {
        // 결승 완료 → 부정 토너먼트로
        handlePositiveTournamentComplete(aspectId);
      } else {
        // 다음 라운드 진행
        setPositiveBracket(roundWinners);
        setPositiveCurrentMatchIndex(0);
      }
    }
  };

  // 긍정 토너먼트 완료 → 부정 토너먼트 시작
  const handlePositiveTournamentComplete = (winnerId: string) => {
    // 마지막 매치(결승) 업데이트
    const updatedMatches = [...positiveMatches];
    updatedMatches[updatedMatches.length - 1].winnerId = winnerId;
    setPositiveMatches(updatedMatches);

    // 부정 토너먼트 준비
    const selectedValues = CORE_VALUES.filter((v) =>
      selectedCoreValueIds.includes(v.id)
    );
    const negativeAspects = selectedValues.flatMap((v) => v.negativeAspects);

    // 16개 전체 사용 (16강 토너먼트)
    setNegativeBracket(negativeAspects);
    setStep("negative_tournament");
  };

  // 부정 토너먼트 선택 처리
  const handleNegativeTournamentSelect = (aspectId: string) => {
    const bracket = createTournamentBracket(negativeBracket);
    const currentMatch = bracket[negativeCurrentMatchIndex];

    // 매치 결과 저장
    const newMatch = {
      aspectAId: currentMatch.aspectA.id,
      aspectBId: currentMatch.aspectB.id,
      winnerId: aspectId,
    };
    const updatedMatches = [...negativeMatches, newMatch];
    setNegativeMatches(updatedMatches);

    // 다음 매치로
    if (negativeCurrentMatchIndex < bracket.length - 1) {
      // 현재 라운드 계속 진행
      setNegativeCurrentMatchIndex(negativeCurrentMatchIndex + 1);
    } else {
      // 현재 라운드 완료 → 다음 라운드 준비
      const roundWinners = updatedMatches
        .slice(-bracket.length) // 현재 라운드 매치만
        .map((m) => negativeBracket.find((a) => a.id === m.winnerId)!);

      if (roundWinners.length === 1) {
        // 결승 완료 → 결과 분석으로
        handleNegativeTournamentComplete(aspectId);
      } else {
        // 다음 라운드 진행
        setNegativeBracket(roundWinners);
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
  if (step === "intro") {
    return (
      <SectionIntro
        sectionNumber={3}
        title="가치관 월드컵"
        onComplete={() => setStep("value_selection")}
      />
    );
  }

  if (step === "value_selection") {
    return (
      <ValueSelection
        coreValues={CORE_VALUES}
        selectedIds={selectedCoreValueIds}
        onToggle={handleValueToggle}
        onComplete={handleValueSelectionComplete}
      />
    );
  }

  if (step === "positive_tournament") {
    const bracket = createTournamentBracket(positiveBracket);
    const currentMatch = bracket[positiveCurrentMatchIndex];

    return (
      <Tournament
        type="positive"
        currentMatch={currentMatch}
        onSelect={handlePositiveTournamentSelect}
      />
    );
  }

  if (step === "negative_tournament") {
    const bracket = createTournamentBracket(negativeBracket);
    const currentMatch = bracket[negativeCurrentMatchIndex];

    return (
      <Tournament
        type="negative"
        currentMatch={currentMatch}
        onSelect={handleNegativeTournamentSelect}
      />
    );
  }

  if (step === "result" && result) {
    return <ResultSection3 result={result} />;
  }

  return null;
}
