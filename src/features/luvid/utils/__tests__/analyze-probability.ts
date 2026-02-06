#!/usr/bin/env node

/**
 * 호환성 등급별 확률 분석 스크립트
 * 
 * 이 스크립트는 몬테카를로 시뮬레이션을 통해
 * 각 호환성 등급이 나올 확률을 계산합니다.
 */

import {
  CompatibilityProfile,
  analyzeCompatibility,
  CompatibilityGrade,
} from "../compatibility-algorithm.js";

// 실제 가능한 값들의 범위 정의
const possibleValues = [
  ["성장", "자유", "안정"],
  ["성장", "자유", "배려"],
  ["성장", "자유", "열정"],
  ["성장", "안정", "배려"],
  ["성장", "안정", "열정"],
  ["성장", "배려", "열정"],
  ["자유", "안정", "배려"],
  ["자유", "안정", "열정"],
  ["자유", "배려", "열정"],
  ["안정", "배려", "열정"],
  ["도전", "성취", "조화"],
  ["도전", "성취", "신뢰"],
  ["도전", "조화", "신뢰"],
  ["성취", "조화", "신뢰"],
  ["배려", "열정", "도전"],
];

const conflictStyles = [
  "competing",
  "collaborating",
  "compromising",
  "avoiding",
  "accommodating",
];

const rechargeMethods = ["independent", "relational", "balanced"];

const apologyStyles = ["words", "actions", "time", "gifts", "touch"];

const comfortJudges = ["solution", "empathy", "presence"];

// 프로필 생성 헬퍼
const createProfile = (
  values: string[],
  conflictStyle: string,
  rechargeMethod: string,
  apologyStyle: string,
  comfortJudge: string
): CompatibilityProfile => ({
  name: "Test",
  values,
  conflictStyle,
  stressResponse: "secure",
  rechargeMethod,
  comfortJudge,
  apologyStyle,
});

// 랜덤 프로필 생성
const createRandomProfile = (): CompatibilityProfile => {
  return createProfile(
    possibleValues[Math.floor(Math.random() * possibleValues.length)],
    conflictStyles[Math.floor(Math.random() * conflictStyles.length)],
    rechargeMethods[Math.floor(Math.random() * rechargeMethods.length)],
    apologyStyles[Math.floor(Math.random() * apologyStyles.length)],
    comfortJudges[Math.floor(Math.random() * comfortJudges.length)]
  );
};

// 메인 분석 함수
function analyzeProbability(sampleSize: number = 50000) {
  console.log("\n" + "=".repeat(60));
  console.log("🎲 호환성 등급 확률 분석 (몬테카를로 시뮬레이션)");
  console.log("=".repeat(60));
  console.log(`샘플 크기: ${sampleSize.toLocaleString()}개 커플 조합\n`);

  const gradeCount: Record<CompatibilityGrade, number> = {
    perfect: 0,
    great: 0,
    good: 0,
    growth: 0,
    challenging: 0,
  };

  const scoreDistribution: Record<number, number> = {};
  let minScore = 100;
  let maxScore = 0;
  let totalScore = 0;

  // 시뮬레이션 실행
  for (let i = 0; i < sampleSize; i++) {
    const p1 = createRandomProfile();
    const p2 = createRandomProfile();
    const result = analyzeCompatibility(p1, p2);

    gradeCount[result.grade]++;
    totalScore += result.totalScore;

    const scoreRange = Math.floor(result.totalScore / 5) * 5;
    scoreDistribution[scoreRange] = (scoreDistribution[scoreRange] || 0) + 1;

    if (result.totalScore < minScore) minScore = result.totalScore;
    if (result.totalScore > maxScore) maxScore = result.totalScore;
  }

  // 결과 출력
  console.log("📊 등급별 분포\n");
  console.log("┌─────────────┬──────────┬──────────┬────────────────────────┐");
  console.log("│    등급     │ 점수 범위│   횟수   │        확률 (%)        │");
  console.log("├─────────────┼──────────┼──────────┼────────────────────────┤");

  const grades: Array<{
    name: string;
    key: CompatibilityGrade;
    range: string;
    emoji: string;
  }> = [
    { name: "Perfect", key: "perfect", range: "90-100", emoji: "💯" },
    { name: "Great", key: "great", range: "75-89", emoji: "✨" },
    { name: "Good", key: "good", range: "60-74", emoji: "👍" },
    { name: "Growth", key: "growth", range: "45-59", emoji: "🌱" },
    { name: "Challenging", key: "challenging", range: "0-44", emoji: "💪" },
  ];

  grades.forEach((grade) => {
    const count = gradeCount[grade.key];
    const percentage = ((count / sampleSize) * 100).toFixed(2);
    const bar = "█".repeat(Math.floor(parseFloat(percentage) / 2));
    console.log(
      `│ ${grade.emoji} ${grade.name.padEnd(9)}│ ${grade.range.padEnd(8)}│ ${count
        .toString()
        .padStart(8)} │ ${percentage.padStart(6)}% ${bar.padEnd(20)}│`
    );
  });

  console.log("└─────────────┴──────────┴──────────┴────────────────────────┘\n");

  // 통계 정보
  const avgScore = (totalScore / sampleSize).toFixed(2);
  console.log("📈 통계 정보\n");
  console.log(`평균 점수: ${avgScore}점`);
  console.log(`최저 점수: ${minScore}점`);
  console.log(`최고 점수: ${maxScore}점`);
  console.log(`중앙값 범위: 약 ${avgScore}점 근처\n`);

  // 점수대별 상세 분포
  console.log("📉 점수대별 상세 분포 (5점 단위)\n");
  const sortedRanges = Object.keys(scoreDistribution)
    .map(Number)
    .sort((a, b) => b - a);

  sortedRanges.forEach((range) => {
    const count = scoreDistribution[range];
    const percent = ((count / sampleSize) * 100).toFixed(1);
    const bar = "▓".repeat(Math.floor(count / (sampleSize / 50)));
    console.log(
      `${range.toString().padStart(3)}-${(range + 4).toString().padEnd(3)}점: ${bar.padEnd(
        25
      )} ${count.toString().padStart(5)}회 (${percent.padStart(4)}%)`
    );
  });

  // Perfect 등급 달성 조건 분석
  console.log("\n" + "=".repeat(60));
  console.log("💯 Perfect 등급 (90-100점) 달성 조건 분석");
  console.log("=".repeat(60) + "\n");

  // 케이스 1: 완벽한 일치
  const perfectMatch = createProfile(
    ["성장", "자유", "안정"],
    "collaborating",
    "independent",
    "words",
    "solution"
  );
  const result1 = analyzeCompatibility(perfectMatch, perfectMatch);
  console.log("✅ 케이스 1: 모든 속성이 완벽하게 일치");
  console.log(`   총점: ${result1.totalScore}점`);
  console.log(`   - 가치관: ${result1.breakdown.values}/40점`);
  console.log(`   - 갈등 해결: ${result1.breakdown.conflict}/30점`);
  console.log(`   - 라이프스타일: ${result1.breakdown.lifestyle}/30점\n`);

  // 케이스 2: 가치관 3개 일치 + 갈등 최고
  const p2a = createProfile(
    ["성장", "자유", "안정"],
    "collaborating",
    "independent",
    "words",
    "empathy"
  );
  const p2b = createProfile(
    ["성장", "자유", "안정"],
    "accommodating",
    "independent",
    "actions",
    "solution"
  );
  const result2 = analyzeCompatibility(p2a, p2b);
  console.log("✅ 케이스 2: 가치관 완벽 일치 + 갈등 스타일 최고");
  console.log(`   총점: ${result2.totalScore}점`);
  console.log(`   - 가치관: ${result2.breakdown.values}/40점 (3개 일치)`);
  console.log(`   - 갈등 해결: ${result2.breakdown.conflict}/30점 (최고 조합)`);
  console.log(`   - 라이프스타일: ${result2.breakdown.lifestyle}/30점\n`);

  // 케이스 3: 가치관 2개 일치 + 모든 라이프스타일 일치
  const p3a = createProfile(
    ["성장", "자유", "안정"],
    "collaborating",
    "independent",
    "words",
    "solution"
  );
  const p3b = createProfile(
    ["성장", "자유", "배려"],
    "collaborating",
    "independent",
    "words",
    "solution"
  );
  const result3 = analyzeCompatibility(p3a, p3b);
  console.log("✅ 케이스 3: 가치관 2개 일치 + 갈등 최고 + 라이프 완벽");
  console.log(`   총점: ${result3.totalScore}점`);
  console.log(`   - 가치관: ${result3.breakdown.values}/40점 (2개 일치)`);
  console.log(`   - 갈등 해결: ${result3.breakdown.conflict}/30점 (최고 조합)`);
  console.log(`   - 라이프스타일: ${result3.breakdown.lifestyle}/30점 (완벽 일치)\n`);

  console.log("💡 Perfect 등급 달성 전략:");
  console.log("   1️⃣  가치관 40점 + 갈등 30점 + 라이프 20점 이상");
  console.log("   2️⃣  가치관 30점 + 갈등 30점 + 라이프 30점");
  console.log("   3️⃣  가치관 35점 + 갈등 30점 + 라이프 25점");
  console.log(`   → Perfect 등급 확률: ${((gradeCount.perfect / sampleSize) * 100).toFixed(2)}%`);
  console.log(
    `   → 약 ${Math.round(sampleSize / gradeCount.perfect)}쌍 중 1쌍이 Perfect!\n`
  );

  // 최악의 케이스
  console.log("=".repeat(60));
  console.log("💪 Challenging 등급 (최저점) 시나리오");
  console.log("=".repeat(60) + "\n");

  const worstP1 = createProfile(
    ["성장", "자유", "안정"],
    "avoiding",
    "independent",
    "words",
    "solution"
  );
  const worstP2 = createProfile(
    ["배려", "열정", "도전"],
    "competing",
    "relational",
    "actions",
    "empathy"
  );
  const worstResult = analyzeCompatibility(worstP1, worstP2);
  console.log("❌ 최악의 조합 예시:");
  console.log(`   총점: ${worstResult.totalScore}점`);
  console.log(`   - 가치관: ${worstResult.breakdown.values}/40점 (완전 불일치)`);
  console.log(`   - 갈등 해결: ${worstResult.breakdown.conflict}/30점 (회피-경쟁 조합)`);
  console.log(`   - 라이프스타일: ${worstResult.breakdown.lifestyle}/30점 (모두 다름)`);
  console.log(`   등급: ${worstResult.grade}\n`);

  console.log("=".repeat(60) + "\n");
}

// 스크립트 실행
analyzeProbability(50000);
