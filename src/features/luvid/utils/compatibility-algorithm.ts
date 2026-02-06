
import { 
  EmotionalPattern, 
} from "@/features/user-manual/model/section1-schema";
import {
  ConflictStyle, 
  ApologyLanguage 
} from "@/features/user-manual/model/section2-schema";
import { 
  BASELINE_INSIGHTS, 
  STRESS_INSIGHTS, 
  RECOVERY_INSIGHTS 
} from "@/features/user-manual/model/section1-analyzer";
import { TKI_DESCRIPTIONS, APOLOGY_DESCRIPTIONS } from "@/features/user-manual/model/section2-analyzer";
import { LuvIdProfile } from "@/features/luvid/model/types";
import { UserManualReport } from "@/features/user-manual/model/report";

// 분석을 위한 표준화된 프로필 인터페이스
export interface CompatibilityProfile {
  name: string;
  // 가치관 (Aspect Labels or IDs)
  values: string[]; 
  // 성향 코드
  conflictStyle: string;        // TKI (competing, avoiding, etc.)
  stressResponse: string;       // Section 1 (secure, anxiety, etc.) -Optional derived
  rechargeMethod: string;       // Section 1 (independent, relational...)
  comfortJudge: string;         // Section 1 (solution, empathy...)
  apologyStyle: string;         // Section 2
}

// ------------------------------------------------------------------
// Data Mapper (Data -> Profile)
// ------------------------------------------------------------------
export function createProfileFromData(luvId: LuvIdProfile, manual: UserManualReport): CompatibilityProfile {
  // Helper to reverse search codes from titles/descriptions in the constants
  const findCodeByTitle = (map: Record<string, { title: string }>, titleToFind: string): string => {
    // Exact or substring match (Title sometimes has "!" or prefixes)
    // TKI title format: "싸우자! 경쟁형"
    // LuvIdProfile type format: "알겠어. 수용형" (Matches)
    const entry = Object.entries(map).find(([key, val]) => val.title === titleToFind || titleToFind.includes(val.title) || val.title.includes(titleToFind));
    return entry ? entry[0] : "unknown";
  };

  // 1. Conflict Style
  // LuvId.conflictStyle.type holds the Title string
  const conflictStyle = findCodeByTitle(TKI_DESCRIPTIONS, luvId.conflictStyle.type);

  // 2. Apology Style
  // LuvId.apologyStyle.primary holds the Title string
  const apologyStyle = findCodeByTitle(APOLOGY_DESCRIPTIONS, luvId.apologyStyle.primary);

  // 3. Comfort Needs
  // LuvId.comfortNeeds.type holds the Title string
  const comfortJudge = findCodeByTitle(RECOVERY_INSIGHTS, luvId.comfortNeeds.type);

  // 4. Recharge Method (From Manual Specs)
  // Spec label "마음의 휴식처" -> Value corresponds to Title (minus "당신은 ", " 사람이에요")
  const rechargeSpec = manual.specs.find(s => s.label === "마음의 휴식처");
  let rechargeMethod = "independent";
  if (rechargeSpec) {
    // RECOVERY_INSIGHTS (Wait, BASELINE_INSIGHTS has recharge methods: independent, relational, etc.)
    // Spec value matches BASELINE_INSIGHTS title partially
    rechargeMethod = findCodeByTitle(BASELINE_INSIGHTS, rechargeSpec.value);
  }

  // 5. Values
  // LuvId.topValues labels
  const values = luvId.topValues.map(v => v.label);

  return {
    name: luvId.nickname,
    values,
    conflictStyle,
    stressResponse: "secure", // Default/Derived (Not explicitly in LuvIdProfile yet, secondary factor)
    rechargeMethod,
    comfortJudge,
    apologyStyle,
  };
}


export interface CompatibilityResult {
  totalScore: number;
  grade: CompatibilityGrade;
  breakdown: {
    values: number;      // 40
    conflict: number;    // 30
    lifestyle: number;   // 30
  };
  details: {
    title: string;
    description: string;
  }[];
  summary: string;
}

export type CompatibilityGrade = 
  | 'perfect'      // 90-100
  | 'great'        // 75-89
  | 'good'         // 60-74
  | 'growth'       // 45-59
  | 'challenging'; // 0-44

// ------------------------------------------------------------------
// 1. 가치관 점수 (40점 만점) - Similarity
// ------------------------------------------------------------------
function calculateValueScore(p1: CompatibilityProfile, p2: CompatibilityProfile): { score: number, matches: string[] } {
  let score = 0;
  const matches: string[] = [];

  // Top 3 비교
  // 순서가 같으면 가산점 (Priority Match)
  // 순서 달라도 포함되면 점수 (Cross Match)
  
  const p1v = p1.values;
  const p2v = p2.values;

  // 1순위가 정확히 일치하면 큰 점수
  if (p1v[0] === p2v[0]) {
    score += 20;
    matches.push(p1v[0]);
  } else if (p2v.includes(p1v[0])) {
    score += 10;
    matches.push(p1v[0]);
  }

  // 나머지 매칭 체크 (1순위 제외)
  const remainder1 = p1v.slice(1);
  const remainder2 = p2v.filter(v => v !== p1v[0]); // p1[0]가 p2에 있었으면 이미 점수 줬으므로 제외하진 않음? 아니, 중복 점수 방지

  // 단순 Set 교집합 개수 (1순위 제외하고 추가 점수)
  const set1 = new Set(p1v);
  const set2 = new Set(p2v);
  
  // 교집합 개수 계산
  let intersectionCount = 0;
  for (const v of set1) {
    if (set2.has(v)) intersectionCount++;
  }

  // 위에서 1순위 일치/포함으로 점수를 줬으므로, 
  // 교집합 개수에 따라 추가 점수를 부여하되 Max 40 제한.
  // 로직 조정:
  // 3개 일치: 40점
  // 2개 일치: 30점
  // 1개 일치: 15점
  // 0개 일치: 0점
  
  score = 0; // 리셋하고 개수 기반으로 심플하게 감 (순서 가중치 포함)

  if (p1v[0] === p2v[0]) {
    score += 15; // 1순위 정확 일치 보너스
  }

  const commonValues = p1v.filter(v => p2v.includes(v));
  if (commonValues.length === 3) score += 25;
  else if (commonValues.length === 2) score += 15;
  else if (commonValues.length === 1) score += 5;

  // 최대 40점 캡
  return { 
    score: Math.min(40, score),
    matches: commonValues 
  };
}

// ------------------------------------------------------------------
// 2. 갈등 및 안정성 점수 (30점 만점) - Stability & Complementarity
// ------------------------------------------------------------------
function calculateConflictScore(p1: CompatibilityProfile, p2: CompatibilityProfile): { score: number, reason: string } {
  // 조합 점수 매트릭스
  // [Score, ReasonKey]
  
  // Helper: 두 스타일을 정렬해서 키로 만듦 (순서 무관하게)
  const makeKey = (a: string, b: string) => [a, b].sort().join('_');

  const c1 = p1.conflictStyle;
  const c2 = p2.conflictStyle;
  const pairKey = makeKey(c1, c2);

  // 1. Best Match (30점) - 안정/협력/수용의 조합
  const BEST_MATCHES = [
    makeKey('collaborating', 'collaborating'),
    makeKey('accommodating', 'accommodating'),
    makeKey('collaborating', 'accommodating'),
    makeKey('compromising', 'collaborating'),
  ];

  // 2. Good Match (20점) - 보완적 관계
  const GOOD_MATCHES = [
    makeKey('competing', 'accommodating'), // 리더형 + 팔로워형
    makeKey('analyzing', 'accommodating'), // (analyzing은 TKI에 없지만 예시)
    makeKey('compromising', 'compromising'),
    makeKey('compromising', 'accommodating'),
    makeKey('secure', 'anxious') // Stress Response에서 가져올 로직을 여기서 믹스하면 복잡하니 TKI만 봄
  ];

  // 3. Risk Match (5~10점) - 불안정
  const RISK_MATCHES = [
    makeKey('avoiding', 'competing'), // 추격자-도망자 (최악의 조합 중 하나)
    makeKey('competing', 'competing'), // 파워 게임
    makeKey('avoiding', 'avoiding'), // 회피-회피 (관계 단절)
  ];

  if (BEST_MATCHES.includes(pairKey)) {
    return { score: 30, reason: "서로를 존중하며 평화롭게 해결하는 최고의 조합이에요." };
  }
  if (GOOD_MATCHES.includes(pairKey)) {
    return { score: 20, reason: "서로의 부족한 점을 보완해줄 수 있는 관계예요." };
  }
  if (RISK_MATCHES.includes(pairKey)) {
    // 세분화
    if (pairKey === makeKey('competing', 'competing')) 
      return { score: 10, reason: "둘 다 주장이 강해 부딪힐 수 있어요. 한 템포 쉬어가는 노력이 필요해요." };
    if (pairKey === makeKey('avoiding', 'avoiding'))
      return { score: 10, reason: "갈등을 덮어두기만 하면 마음의 거리가 멀어질 수 있어요." };
    if (pairKey === makeKey('avoiding', 'competing'))
      return { score: 5, reason: "한 명은 쫓고 한 명은 피하는 관계가 될 수 있어 주의가 필요해요." };
  }

  // Default (15점)
  return { score: 15, reason: "서로 다른 방식을 이해하고 맞춰가는 과정이 필요해요." };
}

// ------------------------------------------------------------------
// 3. 라이프스타일 & 정서 (30점 만점) - Similarity & Understanding
// ------------------------------------------------------------------
function calculateLifestyleScore(p1: CompatibilityProfile, p2: CompatibilityProfile): { score: number, details: string[] } {
  let score = 0;
  const details: string[] = [];

  // A. 충전 방식 (10점) - 비슷하면 좋음
  if (p1.rechargeMethod === p2.rechargeMethod) {
    score += 10;
    details.push("휴식 취하는 방식이 같아 편안해요");
  } else {
    // 독립형 vs 관계형 등
    if (
      (p1.rechargeMethod === 'independent' && p2.rechargeMethod === 'relational') ||
      (p1.rechargeMethod === 'relational' && p2.rechargeMethod === 'independent')
    ) {
      score += 5; // 다름을 인정하면 됨
      details.push("서로의 혼자만의 시간을 존중해주세요");
    } else {
      score += 7; // 기타 조합
      details.push("서로의 에너지를 채워주는 방식이 달라요");
    }
  }

  // B. 위로/사과 언어 (20점)
  // 사과 언어 일치 시 +10
  if (p1.apologyStyle === p2.apologyStyle) {
    score += 10;
    details.push("화해하는 코드가 잘 맞아요");
  } else {
    score += 5;
  }

  // 위로 언어 일치 시 +10
  if (p1.comfortJudge === p2.comfortJudge) {
    score += 10;
    details.push("서로가 원하는 위로를 줄 수 있어요");
  } else {
    score += 5;
  }

  return { score, details };
}

// ------------------------------------------------------------------
// Main Function
// ------------------------------------------------------------------
export function analyzeCompatibility(p1: CompatibilityProfile, p2: CompatibilityProfile): CompatibilityResult {
  const valueAnalysis = calculateValueScore(p1, p2);
  const conflictAnalysis = calculateConflictScore(p1, p2);
  const lifestyleAnalysis = calculateLifestyleScore(p1, p2);

  const totalScore = valueAnalysis.score + conflictAnalysis.score + lifestyleAnalysis.score;
  
  let grade: CompatibilityGrade = 'challenging';
  if (totalScore >= 90) grade = 'perfect';
  else if (totalScore >= 75) grade = 'great';
  else if (totalScore >= 60) grade = 'good';
  else if (totalScore >= 45) grade = 'growth';

  // Summary Text
  let summary = "";
  if (grade === 'perfect') summary = "더할 나위 없는 천생연분! 두 분의 우주는 완벽하게 조화를 이루고 있어요.";
  else if (grade === 'great') summary = "서로를 빛내주는 환상의 짝꿍! 안정감과 설렘이 공존하는 관계예요.";
  else if (grade === 'good') summary = "서로의 다름이 매력이 되는 좋은 인연이에요. 조금만 조율하면 더 완벽해질 거예요.";
  else if (grade === 'growth') summary = "함께 성장해나가는 파트너예요. 서로를 이해하려는 노력이 사랑을 깊게 만들어요.";
  else summary = "서로 너무 다른 매력을 가진 두 분, 맞춰가는 과정에서 새로운 세상을 발견할 거예요.";

  return {
    totalScore,
    grade,
    breakdown: {
      values: valueAnalysis.score,
      conflict: conflictAnalysis.score,
      lifestyle: lifestyleAnalysis.score,
    },
    details: [
      {
        title: "가치관의 조화",
        description: valueAnalysis.matches.length > 0 
          ? `"${valueAnalysis.matches.join(', ')}" 등 중요하게 생각하는 가치가 통하네요!`
          : "서로 다른 가치관을 가지고 있어 새로운 관점을 배울 수 있어요."
      },
      {
        title: "갈등 해결 스타일",
        description: conflictAnalysis.reason
      },
      {
        title: "라이프스타일",
        description: lifestyleAnalysis.details.join(', ')
      }
    ],
    summary
  };
}
