import { describe, it, expect } from "vitest";
import {
  CompatibilityProfile,
  analyzeCompatibility,
  CompatibilityGrade,
} from "../compatibility-algorithm";

describe("compatibility-probability-analysis", () => {
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
    // 더 많은 조합들...
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

  it("should calculate grade distribution across all possible combinations", () => {
    const gradeCount: Record<CompatibilityGrade, number> = {
      perfect: 0,
      great: 0,
      good: 0,
      growth: 0,
      challenging: 0,
    };

    let totalCombinations = 0;
    const sampleSize = 10000; // 샘플링으로 계산 (모든 조합은 너무 많음)

    // 랜덤 샘플링
    for (let i = 0; i < sampleSize; i++) {
      // 랜덤하게 두 프로필 생성
      const p1 = createProfile(
        possibleValues[Math.floor(Math.random() * possibleValues.length)],
        conflictStyles[Math.floor(Math.random() * conflictStyles.length)],
        rechargeMethods[Math.floor(Math.random() * rechargeMethods.length)],
        apologyStyles[Math.floor(Math.random() * apologyStyles.length)],
        comfortJudges[Math.floor(Math.random() * comfortJudges.length)]
      );

      const p2 = createProfile(
        possibleValues[Math.floor(Math.random() * possibleValues.length)],
        conflictStyles[Math.floor(Math.random() * conflictStyles.length)],
        rechargeMethods[Math.floor(Math.random() * rechargeMethods.length)],
        apologyStyles[Math.floor(Math.random() * apologyStyles.length)],
        comfortJudges[Math.floor(Math.random() * comfortJudges.length)]
      );

      const result = analyzeCompatibility(p1, p2);
      gradeCount[result.grade]++;
      totalCombinations++;
    }

    // 백분율 계산
    const percentages = {
      perfect: ((gradeCount.perfect / totalCombinations) * 100).toFixed(2),
      great: ((gradeCount.great / totalCombinations) * 100).toFixed(2),
      good: ((gradeCount.good / totalCombinations) * 100).toFixed(2),
      growth: ((gradeCount.growth / totalCombinations) * 100).toFixed(2),
      challenging: ((gradeCount.challenging / totalCombinations) * 100).toFixed(2),
    };

    console.log("\n=== 등급별 확률 분석 (샘플 크기: " + sampleSize + ") ===\n");
    console.log(`Perfect (90-100점):     ${gradeCount.perfect}회 (${percentages.perfect}%)`);
    console.log(`Great (75-89점):        ${gradeCount.great}회 (${percentages.great}%)`);
    console.log(`Good (60-74점):         ${gradeCount.good}회 (${percentages.good}%)`);
    console.log(`Growth (45-59점):       ${gradeCount.growth}회 (${percentages.growth}%)`);
    console.log(`Challenging (0-44점):   ${gradeCount.challenging}회 (${percentages.challenging}%)`);
    console.log("\n총 조합 수:", totalCombinations);

    // 점수 분포도 분석
    const scoreDistribution: Record<number, number> = {};
    for (let i = 0; i < 1000; i++) {
      const p1 = createProfile(
        possibleValues[Math.floor(Math.random() * possibleValues.length)],
        conflictStyles[Math.floor(Math.random() * conflictStyles.length)],
        rechargeMethods[Math.floor(Math.random() * rechargeMethods.length)],
        apologyStyles[Math.floor(Math.random() * apologyStyles.length)],
        comfortJudges[Math.floor(Math.random() * comfortJudges.length)]
      );

      const p2 = createProfile(
        possibleValues[Math.floor(Math.random() * possibleValues.length)],
        conflictStyles[Math.floor(Math.random() * conflictStyles.length)],
        rechargeMethods[Math.floor(Math.random() * rechargeMethods.length)],
        apologyStyles[Math.floor(Math.random() * apologyStyles.length)],
        comfortJudges[Math.floor(Math.random() * comfortJudges.length)]
      );

      const result = analyzeCompatibility(p1, p2);
      const scoreRange = Math.floor(result.totalScore / 10) * 10;
      scoreDistribution[scoreRange] = (scoreDistribution[scoreRange] || 0) + 1;
    }

    console.log("\n=== 점수대별 분포 ===");
    Object.keys(scoreDistribution)
      .map(Number)
      .sort((a, b) => b - a)
      .forEach((range) => {
        const count = scoreDistribution[range];
        const percent = ((count / 1000) * 100).toFixed(1);
        const bar = "█".repeat(Math.floor(count / 10));
        console.log(`${range}-${range + 9}점: ${bar} ${count}회 (${percent}%)`);
      });

    // 검증: 모든 백분율의 합은 100%여야 함
    const totalPercentage =
      parseFloat(percentages.perfect) +
      parseFloat(percentages.great) +
      parseFloat(percentages.good) +
      parseFloat(percentages.growth) +
      parseFloat(percentages.challenging);

    expect(totalPercentage).toBeCloseTo(100, 0);
  });

  it("should analyze perfect grade requirements", () => {
    // Perfect 등급을 받기 위한 최소 조건 분석
    console.log("\n=== Perfect 등급 (90-100점) 달성 조건 ===\n");

    // 케이스 1: 모든 것이 완벽하게 일치 (100점)
    const perfectMatch = createProfile(
      ["성장", "자유", "안정"],
      "collaborating",
      "independent",
      "words",
      "solution"
    );
    const result1 = analyzeCompatibility(perfectMatch, perfectMatch);
    console.log("케이스 1 - 완벽 일치:", result1.totalScore, "점");
    console.log("  가치관:", result1.breakdown.values, "/ 40");
    console.log("  갈등:", result1.breakdown.conflict, "/ 30");
    console.log("  라이프:", result1.breakdown.lifestyle, "/ 30");

    // 케이스 2: 가치관 3개 일치 + 갈등 최고 + 라이프 일부 일치
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
    console.log("\n케이스 2 - 가치관 완벽 + 갈등 최고:", result2.totalScore, "점");
    console.log("  가치관:", result2.breakdown.values, "/ 40");
    console.log("  갈등:", result2.breakdown.conflict, "/ 30");
    console.log("  라이프:", result2.breakdown.lifestyle, "/ 30");

    // 케이스 3: 최소 조건 (90점 달성)
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
      "relational",
      "actions",
      "empathy"
    );
    const result3 = analyzeCompatibility(p3a, p3b);
    console.log("\n케이스 3 - 가치관 2개 일치 + 갈등 최고:", result3.totalScore, "점");
    console.log("  가치관:", result3.breakdown.values, "/ 40");
    console.log("  갈등:", result3.breakdown.conflict, "/ 30");
    console.log("  라이프:", result3.breakdown.lifestyle, "/ 30");

    console.log("\n💡 Perfect 등급 달성 전략:");
    console.log("  - 가치관 3개 일치 (40점) + 갈등 최고 (30점) + 라이프 20점 이상");
    console.log("  - 가치관 2개 일치 (30점) + 갈등 최고 (30점) + 라이프 30점");
    console.log("  - 가치관 3개 일치 (40점) + 갈등 좋음 (20점) + 라이프 30점");
  });

  it("should analyze worst case scenarios", () => {
    console.log("\n=== Challenging 등급 (최저점) 시나리오 ===\n");

    // 최악의 조합
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
    console.log("최악의 조합:", worstResult.totalScore, "점");
    console.log("  가치관:", worstResult.breakdown.values, "/ 40 (완전 불일치)");
    console.log("  갈등:", worstResult.breakdown.conflict, "/ 30 (회피-경쟁)");
    console.log("  라이프:", worstResult.breakdown.lifestyle, "/ 30 (모두 다름)");
    console.log("  등급:", worstResult.grade);
  });

  it("should calculate theoretical probability of perfect match", () => {
    // 이론적 확률 계산
    console.log("\n=== Perfect 등급 이론적 확률 ===\n");

    // 가정: 각 속성이 독립적이고 균등 분포
    const valueMatchProb = 1 / 14; // 14개 가능한 조합 중 1개 (예시)
    const conflictBestProb = 4 / 25; // 5x5 조합 중 4개가 최고
    const lifestylePerfectProb = 1 / 45; // 3x5x3 조합

    const theoreticalPerfect = valueMatchProb * conflictBestProb * lifestylePerfectProb * 100;

    console.log("가치관 완벽 일치 확률:", (valueMatchProb * 100).toFixed(2), "%");
    console.log("갈등 스타일 최고 조합 확률:", (conflictBestProb * 100).toFixed(2), "%");
    console.log("라이프스타일 완벽 일치 확률:", (lifestylePerfectProb * 100).toFixed(2), "%");
    console.log("\n이론적 Perfect 확률 (모두 만족):", theoreticalPerfect.toFixed(4), "%");
    console.log("→ 약", Math.round(1 / (theoreticalPerfect / 100)), "쌍 중 1쌍");
  });
});
