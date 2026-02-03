/**
 * Section 3: 가치관 토너먼트 분석 로직
 */

import {
  Section3Selections,
  Section3Result,
  ValueAspect,
} from "./section3-schema";
import { getCoreValueById, getValueAspectById } from "./section3-values";

/**
 * Section 3 분석 함수
 * 사용자의 토너먼트 선택을 분석하여 결과 생성
 */
export function analyzeSection3(selections: Section3Selections): Section3Result {
  const { selectedCoreValues, positiveTournament, negativeTournament } = selections;

  // 최고 가치 (긍정)
  const topPositiveData = getValueAspectById(positiveTournament.winnerId);
  if (!topPositiveData) {
    throw new Error(`Positive winner aspect not found: ${positiveTournament.winnerId}`);
  }

  // 최대 딜브레이커 (부정)
  const topNegativeData = getValueAspectById(negativeTournament.winnerId);
  if (!topNegativeData) {
    throw new Error(`Negative winner aspect not found: ${negativeTournament.winnerId}`);
  }

  // 인사이트 생성
  const insight = generateInsight(
    selectedCoreValues,
    topPositiveData.coreValue.name,
    topPositiveData.aspect,
    topNegativeData.coreValue.name,
    topNegativeData.aspect
  );

  // Top 4 Values Logic
  const top4PositiveValues = getTop4Values(positiveTournament);
  const top4NegativeValues = getTop4Values(negativeTournament);

  return {
    completed: true,
    completedAt: new Date().toISOString(),
    selectedCoreValues,
    topPositiveValue: {
      coreValueId: topPositiveData.coreValue.id,
      aspect: topPositiveData.aspect,
    },
    top4PositiveValues,
    topNegativeValue: {
      coreValueId: topNegativeData.coreValue.id,
      aspect: topNegativeData.aspect,
    },
    top4NegativeValues,
    insight,
  };
}

function getTop4Values(tournament: { 
    matches: Section3Selections["positiveTournament"]["matches"]; 
    winnerId: string; 
    runnerUpId: string; 
}) {
  const { matches, winnerId, runnerUpId } = tournament;
  const results: { rank: number; coreValueId: string; aspect: ValueAspect }[] = [];

  // Rank 1: Winner
  const winnerData = getValueAspectById(winnerId);
  if (winnerData) {
    results.push({ rank: 1, coreValueId: winnerData.coreValue.id, aspect: winnerData.aspect });
  }

  // Rank 2: Runner Up
  const runnerUpData = getValueAspectById(runnerUpId);
  if (runnerUpData) {
    results.push({ rank: 2, coreValueId: runnerUpData.coreValue.id, aspect: runnerUpData.aspect });
  }

  // Rank 3: Losers of Semi-Finals
  // Find max round (Finals)
  const rounds = matches.map(m => m.round);
  const maxRound = Math.max(...rounds);
  const semiFinalRound = maxRound - 1;

  if (semiFinalRound >= 1) {
    const semiFinalMatches = matches.filter(m => m.round === semiFinalRound);
    
    semiFinalMatches.forEach(match => {
      // Find loser
      const loserId = match.winnerId === match.aspectAId ? match.aspectBId : match.aspectAId;
      // Exclude if this loser is somehow strictly equal to winner/runnerUp (shouldn't happen)
      if (loserId !== runnerUpId && loserId !== winnerId) {
         const loserData = getValueAspectById(loserId);
         if (loserData) {
            results.push({ rank: 3, coreValueId: loserData.coreValue.id, aspect: loserData.aspect });
         }
      }
    });
  }
  
  return results;
}

/**
 * 인사이트 메시지 생성
 */
function generateInsight(
  selectedCoreValues: string[],
  topPositiveCoreName: string,
  topPositiveAspect: ValueAspect,
  topNegativeCoreName: string,
  topNegativeAspect: ValueAspect
): string {
  const insights = [
    `당신이 선택한 8가지 가치 중에서도 "${topPositiveAspect.label}"을(를) 가장 중요하게 생각하시는군요. ${topPositiveCoreName}은(는) 당신에게 관계의 핵심입니다. 반면, "${topNegativeAspect.label}"은(는) 절대 받아들일 수 없는 부분이에요. 이런 명확한 기준이 있다는 것은 자신을 잘 이해하고 있다는 뜻입니다.`,
    
    `"${topPositiveAspect.label}"이(가) 당신의 최우선 가치네요. 이는 ${topPositiveCoreName}을(를) 얼마나 중시하는지 보여줍니다. 동시에 "${topNegativeAspect.label}"은(는) 당신의 레드라인이에요. 이 두 가지를 명확히 아는 것만으로도 더 건강한 관계를 만들 수 있습니다.`,
    
    `당신에게 가장 중요한 것은 "${topPositiveAspect.label}"이고, 가장 피하고 싶은 것은 "${topNegativeAspect.label}"이군요. ${topPositiveCoreName}을(를) 중시하면서도 ${topNegativeCoreName}에서의 경계가 분명한 당신은 자신의 가치관이 확고한 사람입니다.`,
  ];

  return insights[Math.floor(Math.random() * insights.length)];
}



/**
 * 토너먼트 브라켓 생성
 * 2의 거듭제곱 개수의 항목으로 토너먼트 생성 (16, 8, 4, 2)
 */
export function createTournamentBracket(aspects: ValueAspect[]): {
  round: number;
  matchNumber: number;
  totalMatches: number;
  aspectA: ValueAspect;
  aspectB: ValueAspect;
}[] {
  const count = aspects.length;
  
  // 2의 거듭제곱인지 확인
  if (count < 2 || (count & (count - 1)) !== 0) {
    throw new Error(`Tournament requires a power of 2 aspects, got ${count}`);
  }

  // 라운드 계산 (16=1, 8=2, 4=3, 2=4)
  const round = 5 - Math.log2(count);
  const totalMatches = count / 2;

  // 랜덤 셔플
  const shuffled = [...aspects].sort(() => Math.random() - 0.5);

  const matches = [];

  // 매치 생성
  for (let i = 0; i < totalMatches; i++) {
    matches.push({
      round,
      matchNumber: i + 1,
      totalMatches,
      aspectA: shuffled[i * 2],
      aspectB: shuffled[i * 2 + 1],
    });
  }

  return matches;
}
