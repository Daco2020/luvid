import { LuvIdProfile, CompatibilityScore, getCompatibilityGrade } from "../model/types";

/**
 * 두 Luv ID 프로필 간의 궁합 계산
 * 나 사용 설명서의 모든 데이터를 활용한 디테일한 분석
 */
export function calculateCompatibility(
  profileA: LuvIdProfile,
  profileB: LuvIdProfile
): CompatibilityScore {
  // 1. 핵심 가치 일치도 (30점)
  const valuesScore = calculateValueMatch(profileA, profileB);
  
  // 2. 소통 스타일 궁합 (25점)
  const communicationScore = calculateCommunicationFit(profileA, profileB);
  
  // 3. 갈등 해결 방식 (20점)
  const conflictScore = calculateConflictCompatibility(profileA, profileB);
  
  // 4. 생활 패턴 조화 (15점)
  const lifestyleScore = calculateLifestyleHarmony(profileA, profileB);
  
  // 5. 에너지 레벨 균형 (10점)
  const energyScore = calculateEnergyBalance(profileA, profileB);
  
  // 6. Dealbreaker 체크 (감점)
  const dealbreakerResult = checkDealbreakers(profileA, profileB);
  
  // 총점 계산
  const totalScore = Math.max(0, Math.min(100,
    valuesScore.score +
    communicationScore.score +
    conflictScore.score +
    lifestyleScore.score +
    energyScore.score -
    dealbreakerResult.penalty
  ));
  
  // 강점 및 조율 영역 분석
  const strengths = analyzeStrengths(
    valuesScore,
    communicationScore,
    conflictScore,
    lifestyleScore,
    energyScore
  );
  
  const growthAreas = analyzeGrowthAreas(
    valuesScore,
    communicationScore,
    conflictScore,
    lifestyleScore,
    energyScore
  );
  
  return {
    total: Math.round(totalScore),
    grade: getCompatibilityGrade(totalScore),
    breakdown: {
      values: valuesScore,
      communication: communicationScore,
      conflict: conflictScore,
      lifestyle: lifestyleScore,
      energy: energyScore
    },
    strengths,
    growthAreas,
    dealbreakerCheck: dealbreakerResult
  };
}

/**
 * 1. 핵심 가치 일치도 (30점)
 */
function calculateValueMatch(profileA: LuvIdProfile, profileB: LuvIdProfile) {
  const valuesA = profileA.topValues.map(v => v.label);
  const valuesB = profileB.topValues.map(v => v.label);
  
  // 공통 가치 개수
  const commonValues = valuesA.filter(v => valuesB.includes(v));
  
  // 순위 가중치 적용
  let weightedScore = 0;
  profileA.topValues.forEach((valueA, indexA) => {
    const indexB = valuesB.indexOf(valueA.label);
    if (indexB !== -1) {
      // 같은 가치를 공유하면 점수, 순위가 비슷할수록 높은 점수
      const rankDiff = Math.abs(indexA - indexB);
      weightedScore += (3 - rankDiff) * 3; // 최대 9점
    }
  });
  
  const score = Math.min(30, weightedScore);
  const percentage = Math.round((score / 30) * 100);
  
  let details = '';
  if (commonValues.length === 0) {
    details = '핵심 가치관이 다르지만, 서로의 차이를 존중하며 배울 수 있어요.';
  } else if (commonValues.length === 1) {
    details = `'${commonValues[0]}'을(를) 함께 중요하게 생각해요.`;
  } else {
    details = `${commonValues.map(v => `'${v}'`).join(', ')}을(를) 함께 중요하게 생각해요.`;
  }
  
  return { score, details, percentage, commonValues };
}

/**
 * 2. 소통 스타일 궁합 (25점)
 */
function calculateCommunicationFit(profileA: LuvIdProfile, profileB: LuvIdProfile) {
  const styleA = profileA.communicationStyle.type;
  const styleB = profileB.communicationStyle.type;
  
  // 소통 스타일 호환성 매트릭스
  const compatibilityMatrix: Record<string, number> = {
    '같은 스타일': 25,
    '보완적': 20,
    '조율 필요': 12,
    '충돌 가능': 5
  };
  
  let score = 15; // 기본 점수
  let details = '';
  
  // 같은 스타일
  if (styleA === styleB) {
    score = 25;
    details = '둘 다 비슷한 방식으로 소통하여 서로를 잘 이해할 수 있어요.';
  }
  // 명확한 표현 vs 명확한 표현
  else if (styleA.includes('명확') && styleB.includes('명확')) {
    score = 24;
    details = '둘 다 솔직하고 명확한 대화를 선호해서 오해가 적을 거예요.';
  }
  // 조율 필요
  else {
    score = 15;
    details = '소통 방식이 다르지만, 서로의 스타일을 이해하면 잘 맞을 수 있어요.';
  }
  
  const percentage = Math.round((score / 25) * 100);
  
  return { score, details, percentage };
}

/**
 * 3. 갈등 해결 방식 (20점)
 */
function calculateConflictCompatibility(profileA: LuvIdProfile, profileB: LuvIdProfile) {
  const conflictA = profileA.conflictStyle.type;
  const conflictB = profileB.conflictStyle.type;
  
  let score = 12; // 기본 점수
  let details = '';
  
  // 수용형 + 수용형 = 갈등 회피 위험
  if (conflictA.includes('수용') && conflictB.includes('수용')) {
    score = 14;
    details = '둘 다 양보를 잘하지만, 때로는 솔직한 대화가 필요할 수 있어요.';
  }
  // 해결형 + 해결형 = 최고
  else if (conflictA.includes('해결') && conflictB.includes('해결')) {
    score = 20;
    details = '둘 다 문제를 적극적으로 해결하려는 성향이라 건강한 관계를 만들 수 있어요.';
  }
  // 수용형 + 해결형 = 균형
  else if (
    (conflictA.includes('수용') && conflictB.includes('해결')) ||
    (conflictA.includes('해결') && conflictB.includes('수용'))
  ) {
    score = 18;
    details = '한 명은 부드럽게, 한 명은 적극적으로 문제를 풀어가는 좋은 조합이에요.';
  }
  // 회피형 포함
  else if (conflictA.includes('얼어붙') || conflictB.includes('얼어붙')) {
    score = 10;
    details = '갈등 상황에서 소통이 막힐 수 있으니, 평소 대화를 많이 나누는 게 중요해요.';
  }
  
  const percentage = Math.round((score / 20) * 100);
  
  return { score, details, percentage };
}

/**
 * 4. 생활 패턴 조화 (15점)
 */
function calculateLifestyleHarmony(profileA: LuvIdProfile, profileB: LuvIdProfile) {
  const comfortA = profileA.comfortNeeds.type;
  const comfortB = profileB.comfortNeeds.type;
  
  let score = 10; // 기본 점수
  let details = '';
  
  // 위로 방식이 비슷하면 서로를 잘 이해
  if (comfortA === comfortB) {
    score = 15;
    details = '힘들 때 필요한 위로가 비슷해서 서로를 잘 달래줄 수 있어요.';
  }
  // 해결책 vs 공감
  else if (
    (comfortA.includes('해결') && comfortB.includes('공감')) ||
    (comfortA.includes('공감') && comfortB.includes('해결'))
  ) {
    score = 11;
    details = '위로 방식이 다르니, 상대가 원하는 걸 물어보는 게 좋아요.';
  }
  else {
    score = 12;
    details = '서로 다른 방식으로 위로받길 원하지만, 배려하면 잘 맞출 수 있어요.';
  }
  
  const percentage = Math.round((score / 15) * 100);
  
  return { score, details, percentage };
}

/**
 * 5. 에너지 레벨 균형 (10점)
 */
function calculateEnergyBalance(profileA: LuvIdProfile, profileB: LuvIdProfile) {
  const energyA = profileA.energyLevel;
  const energyB = profileB.energyLevel;
  
  const diff = Math.abs(energyA - energyB);
  
  let score = 10;
  let details = '';
  
  if (diff <= 20) {
    score = 10;
    details = '에너지 레벨이 비슷해서 함께 시간을 보내기 편할 거예요.';
  } else if (diff <= 40) {
    score = 7;
    details = '한 명은 혼자 시간을, 한 명은 함께 시간을 더 원할 수 있어요.';
  } else {
    score = 4;
    details = '독립성과 친밀감에 대한 욕구 차이가 커서 조율이 필요해요.';
  }
  
  const percentage = Math.round((score / 10) * 100);
  
  return { score, details, percentage, energyDiff: diff };
}

/**
 * 6. Dealbreaker 체크
 */
function checkDealbreakers(profileA: LuvIdProfile, profileB: LuvIdProfile) {
  const warnings: string[] = [];
  let penalty = 0;
  
  // A의 dealbreaker가 B의 특성과 충돌하는지 체크
  profileA.dealbreakers.forEach(db => {
    // 예: "상처주는 농담"이 dealbreaker인데 상대가 그런 성향이면 경고
    // 실제로는 더 정교한 매칭 로직 필요
    if (db.label.includes('농담') && profileB.topValues.some(v => v.label.includes('유머'))) {
      warnings.push(`${profileA.nickname}님은 상처주는 농담을 싫어하시니 주의가 필요해요.`);
      penalty += 5;
    }
  });
  
  // B의 dealbreaker도 체크
  profileB.dealbreakers.forEach(db => {
    if (db.label.includes('무관심') && profileA.energyLevel < 50) {
      warnings.push(`${profileB.nickname}님은 관계에 무관심한 태도를 싫어하시니 적극적인 관심 표현이 필요해요.`);
      penalty += 5;
    }
  });
  
  return {
    safe: warnings.length === 0,
    warnings,
    penalty
  };
}

/**
 * 강점 분석
 */
function analyzeStrengths(...scores: any[]): Array<{
  category: string;
  percentage: number;
  description: string;
  tip?: string;
}> {
  const strengths: any[] = [];
  
  scores.forEach((scoreObj, index) => {
    if (scoreObj.percentage >= 70) {
      const categories = ['핵심 가치', '소통 스타일', '갈등 해결', '생활 패턴', '에너지 균형'];
      strengths.push({
        category: categories[index],
        percentage: scoreObj.percentage,
        description: scoreObj.details
      });
    }
  });
  
  return strengths;
}

/**
 * 조율 필요 영역 분석
 */
function analyzeGrowthAreas(...scores: any[]): Array<{
  category: string;
  percentage: number;
  description: string;
  tip: string;
}> {
  const growthAreas: any[] = [];
  
  scores.forEach((scoreObj, index) => {
    if (scoreObj.percentage < 70) {
      const categories = ['핵심 가치', '소통 스타일', '갈등 해결', '생활 패턴', '에너지 균형'];
      const tips = [
        '서로의 가치관을 존중하며 대화를 나눠보세요.',
        '상대가 선호하는 소통 방식을 물어보고 맞춰보세요.',
        '갈등 시 서로의 대처 방식을 이해하고 배려해주세요.',
        '힘들 때 어떤 위로를 원하는지 미리 이야기 나눠보세요.',
        '함께 시간과 각자 시간의 균형을 찾아보세요.'
      ];
      
      growthAreas.push({
        category: categories[index],
        percentage: scoreObj.percentage,
        description: scoreObj.details,
        tip: tips[index]
      });
    }
  });
  
  return growthAreas;
}
