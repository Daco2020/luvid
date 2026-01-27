/**
 * Section 3: Wizard 컴포넌트
 * 가치 선택 → 긍정 토너먼트 → 부정 토너먼트 → 결과
 */

"use client";

import { useState } from "react";
import { CORE_VALUES } from "../../model/section3-values";
import { ValueAspect, Section3Result } from "../../model/section3-schema";
import { analyzeSection3, createTournamentBracket } from "../../model/section3-analyzer";
import { ValueSelection } from "./ValueSelection";
import { Tournament } from "./Tournament";
import { ResultSection3 } from "./ResultSection3";

type WizardStep =
  | "value_selection"
  | "positive_tournament"
  | "negative_tournament"
  | "result";

export function Wizard() {
  const [step, setStep] = useState<WizardStep>("value_selection");
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
    // 선택한 8개 핵심 가치에서 긍정 항목 4개 추출
    const selectedValues = CORE_VALUES.filter((v) =>
      selectedCoreValueIds.includes(v.id)
    );
    const positiveAspects = selectedValues.flatMap((v) => v.positiveAspects);

    // 랜덤하게 4개 선택
    const shuffled = [...positiveAspects].sort(() => Math.random() - 0.5);
    const selected4 = shuffled.slice(0, 4);

    setPositiveBracket(selected4);
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
      setPositiveCurrentMatchIndex(positiveCurrentMatchIndex + 1);
    } else {
      // 준결승 완료 → 결승 진행
      const semifinalWinners = updatedMatches.map((m) =>
        positiveBracket.find((a) => a.id === m.winnerId)!
      );

      // 결승 매치 추가
      const finalMatch = {
        aspectAId: semifinalWinners[0].id,
        aspectBId: semifinalWinners[1].id,
        winnerId: "", // 아직 선택 안 됨
      };

      // 결승 진행을 위해 bracket을 업데이트
      setPositiveBracket(semifinalWinners);
      setPositiveCurrentMatchIndex(0); // 결승은 인덱스 0
      setPositiveMatches([...updatedMatches, finalMatch]);
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

    // 랜덤하게 4개 선택
    const shuffled = [...negativeAspects].sort(() => Math.random() - 0.5);
    const selected4 = shuffled.slice(0, 4);

    setNegativeBracket(selected4);
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
      setNegativeCurrentMatchIndex(negativeCurrentMatchIndex + 1);
    } else {
      // 준결승 완료 → 결승 진행
      const semifinalWinners = updatedMatches.map((m) =>
        negativeBracket.find((a) => a.id === m.winnerId)!
      );

      // 결승 매치 추가
      const finalMatch = {
        aspectAId: semifinalWinners[0].id,
        aspectBId: semifinalWinners[1].id,
        winnerId: "", // 아직 선택 안 됨
      };

      setNegativeBracket(semifinalWinners);
      setNegativeCurrentMatchIndex(0);
      setNegativeMatches([...updatedMatches, finalMatch]);
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

    // 결승 여부 확인
    const isFinal = positiveMatches.length === 2;

    if (isFinal) {
      // 결승: 준결승 우승자 2명
      const semifinalWinners = positiveMatches.map((m) =>
        positiveBracket.find((a) => a.id === m.winnerId)!
      );

      return (
        <Tournament
          type="positive"
          currentMatch={{
            round: 2,
            matchNumber: 1,
            totalMatches: 1,
            aspectA: semifinalWinners[0],
            aspectB: semifinalWinners[1],
          }}
          onSelect={handlePositiveTournamentComplete}
        />
      );
    }

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

    // 결승 여부 확인
    const isFinal = negativeMatches.length === 2;

    if (isFinal) {
      // 결승: 준결승 우승자 2명
      const semifinalWinners = negativeMatches.map((m) =>
        negativeBracket.find((a) => a.id === m.winnerId)!
      );

      return (
        <Tournament
          type="negative"
          currentMatch={{
            round: 2,
            matchNumber: 1,
            totalMatches: 1,
            aspectA: semifinalWinners[0],
            aspectB: semifinalWinners[1],
          }}
          onSelect={handleNegativeTournamentComplete}
        />
      );
    }

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
