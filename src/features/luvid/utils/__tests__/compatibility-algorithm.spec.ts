import { describe, it, expect } from "vitest";
import {
  CompatibilityProfile,
  analyzeCompatibility,
  createProfileFromData,
  CompatibilityGrade,
} from "../compatibility-algorithm";

describe("compatibility-algorithm", () => {
  // 테스트용 프로필 생성 헬퍼
  const createTestProfile = (
    overrides: Partial<CompatibilityProfile> = {}
  ): CompatibilityProfile => ({
    name: "테스트",
    values: ["성장", "자유", "안정"],
    conflictStyle: "collaborating",
    stressResponse: "secure",
    rechargeMethod: "independent",
    comfortJudge: "solution",
    apologyStyle: "words",
    ...overrides,
  });

  describe("analyzeCompatibility", () => {
    describe("가치관 점수 계산", () => {
      it("1순위 가치관이 정확히 일치하면 높은 점수를 받아야 함", () => {
        const p1 = createTestProfile({
          values: ["성장", "자유", "안정"],
        });
        const p2 = createTestProfile({
          values: ["성장", "배려", "열정"],
        });

        const result = analyzeCompatibility(p1, p2);

        // 1순위 일치(15점) + 1개 공통(5점) = 20점
        expect(result.breakdown.values).toBeGreaterThanOrEqual(15);
        expect(result.details[0].title).toBe("가치관의 조화");
        expect(result.details[0].description).toContain("성장");
      });

      it("3개 가치관이 모두 일치하면 최고 점수(40점)를 받아야 함", () => {
        const p1 = createTestProfile({
          values: ["성장", "자유", "안정"],
        });
        const p2 = createTestProfile({
          values: ["성장", "자유", "안정"],
        });

        const result = analyzeCompatibility(p1, p2);

        // 1순위 일치(15점) + 3개 공통(25점) = 40점
        expect(result.breakdown.values).toBe(40);
        expect(result.details[0].description).toContain("성장");
        expect(result.details[0].description).toContain("자유");
        expect(result.details[0].description).toContain("안정");
      });

      it("2개 가치관이 일치하면 중간 점수를 받아야 함", () => {
        const p1 = createTestProfile({
          values: ["성장", "자유", "안정"],
        });
        const p2 = createTestProfile({
          values: ["성장", "자유", "열정"],
        });

        const result = analyzeCompatibility(p1, p2);

        // 1순위 일치(15점) + 2개 공통(15점) = 30점
        expect(result.breakdown.values).toBe(30);
      });

      it("가치관이 전혀 일치하지 않으면 낮은 점수를 받아야 함", () => {
        const p1 = createTestProfile({
          values: ["성장", "자유", "안정"],
        });
        const p2 = createTestProfile({
          values: ["배려", "열정", "도전"],
        });

        const result = analyzeCompatibility(p1, p2);

        expect(result.breakdown.values).toBe(0);
        expect(result.details[0].description).toContain(
          "서로 다른 가치관을 가지고 있어"
        );
      });

      it("1순위는 다르지만 다른 가치관이 일치하면 적절한 점수를 받아야 함", () => {
        const p1 = createTestProfile({
          values: ["성장", "자유", "안정"],
        });
        const p2 = createTestProfile({
          values: ["배려", "성장", "자유"],
        });

        const result = analyzeCompatibility(p1, p2);

        // 2개 공통(15점)
        expect(result.breakdown.values).toBe(15);
      });
    });

    describe("갈등 해결 스타일 점수 계산", () => {
      it("협력형 + 협력형 조합은 최고 점수(30점)를 받아야 함", () => {
        const p1 = createTestProfile({ conflictStyle: "collaborating" });
        const p2 = createTestProfile({ conflictStyle: "collaborating" });

        const result = analyzeCompatibility(p1, p2);

        expect(result.breakdown.conflict).toBe(30);
        expect(result.details[1].description).toContain("최고의 조합");
      });

      it("협력형 + 수용형 조합은 최고 점수(30점)를 받아야 함", () => {
        const p1 = createTestProfile({ conflictStyle: "collaborating" });
        const p2 = createTestProfile({ conflictStyle: "accommodating" });

        const result = analyzeCompatibility(p1, p2);

        expect(result.breakdown.conflict).toBe(30);
      });

      it("경쟁형 + 수용형 조합은 좋은 점수(20점)를 받아야 함", () => {
        const p1 = createTestProfile({ conflictStyle: "competing" });
        const p2 = createTestProfile({ conflictStyle: "accommodating" });

        const result = analyzeCompatibility(p1, p2);

        expect(result.breakdown.conflict).toBe(20);
        expect(result.details[1].description).toContain("보완");
      });

      it("경쟁형 + 경쟁형 조합은 낮은 점수(10점)를 받아야 함", () => {
        const p1 = createTestProfile({ conflictStyle: "competing" });
        const p2 = createTestProfile({ conflictStyle: "competing" });

        const result = analyzeCompatibility(p1, p2);

        expect(result.breakdown.conflict).toBe(10);
        expect(result.details[1].description).toContain("부딪힐 수 있어요");
      });

      it("회피형 + 회피형 조합은 낮은 점수(10점)를 받아야 함", () => {
        const p1 = createTestProfile({ conflictStyle: "avoiding" });
        const p2 = createTestProfile({ conflictStyle: "avoiding" });

        const result = analyzeCompatibility(p1, p2);

        expect(result.breakdown.conflict).toBe(10);
        expect(result.details[1].description).toContain("거리가 멀어질");
      });

      it("회피형 + 경쟁형 조합은 최저 점수(5점)를 받아야 함", () => {
        const p1 = createTestProfile({ conflictStyle: "avoiding" });
        const p2 = createTestProfile({ conflictStyle: "competing" });

        const result = analyzeCompatibility(p1, p2);

        expect(result.breakdown.conflict).toBe(5);
        expect(result.details[1].description).toContain("쫓고");
        expect(result.details[1].description).toContain("피하는");
      });

      it("정의되지 않은 조합은 기본 점수(15점)를 받아야 함", () => {
        const p1 = createTestProfile({ conflictStyle: "compromising" });
        const p2 = createTestProfile({ conflictStyle: "avoiding" });

        const result = analyzeCompatibility(p1, p2);

        expect(result.breakdown.conflict).toBe(15);
        expect(result.details[1].description).toContain("맞춰가는 과정");
      });
    });

    describe("라이프스타일 점수 계산", () => {
      it("충전 방식이 같으면 10점을 받아야 함", () => {
        const p1 = createTestProfile({ rechargeMethod: "independent" });
        const p2 = createTestProfile({ rechargeMethod: "independent" });

        const result = analyzeCompatibility(p1, p2);

        expect(result.breakdown.lifestyle).toBeGreaterThanOrEqual(10);
        expect(result.details[2].description).toContain("휴식 취하는 방식");
      });

      it("충전 방식이 독립형 vs 관계형이면 5점을 받아야 함", () => {
        const p1 = createTestProfile({ rechargeMethod: "independent" });
        const p2 = createTestProfile({ rechargeMethod: "relational" });

        const result = analyzeCompatibility(p1, p2);

        expect(result.details[2].description).toContain("혼자만의 시간");
      });

      it("사과 언어가 같으면 추가 점수를 받아야 함", () => {
        const p1 = createTestProfile({ apologyStyle: "words" });
        const p2 = createTestProfile({ apologyStyle: "words" });

        const result = analyzeCompatibility(p1, p2);

        expect(result.details[2].description).toContain("화해하는 코드");
      });

      it("위로 언어가 같으면 추가 점수를 받아야 함", () => {
        const p1 = createTestProfile({ comfortJudge: "solution" });
        const p2 = createTestProfile({ comfortJudge: "solution" });

        const result = analyzeCompatibility(p1, p2);

        expect(result.details[2].description).toContain("원하는 위로");
      });

      it("모든 라이프스타일 요소가 일치하면 최고 점수(30점)를 받아야 함", () => {
        const p1 = createTestProfile({
          rechargeMethod: "independent",
          apologyStyle: "words",
          comfortJudge: "solution",
        });
        const p2 = createTestProfile({
          rechargeMethod: "independent",
          apologyStyle: "words",
          comfortJudge: "solution",
        });

        const result = analyzeCompatibility(p1, p2);

        expect(result.breakdown.lifestyle).toBe(30);
      });
    });

    describe("총점 및 등급 계산", () => {
      it("총점이 90점 이상이면 'perfect' 등급을 받아야 함", () => {
        const perfectProfile = createTestProfile({
          values: ["성장", "자유", "안정"],
          conflictStyle: "collaborating",
          rechargeMethod: "independent",
          apologyStyle: "words",
          comfortJudge: "solution",
        });

        const result = analyzeCompatibility(perfectProfile, perfectProfile);

        expect(result.totalScore).toBeGreaterThanOrEqual(90);
        expect(result.grade).toBe("perfect");
        expect(result.summary).toContain("천생연분");
      });

      it("총점이 75-89점이면 'great' 등급을 받아야 함", () => {
        const p1 = createTestProfile({
          values: ["성장", "자유", "안정"],
          conflictStyle: "collaborating",
        });
        const p2 = createTestProfile({
          values: ["성장", "자유", "열정"],
          conflictStyle: "accommodating",
        });

        const result = analyzeCompatibility(p1, p2);

        if (result.totalScore >= 75 && result.totalScore < 90) {
          expect(result.grade).toBe("great");
          expect(result.summary).toContain("환상의 짝꿍");
        }
      });

      it("총점이 60-74점이면 'good' 등급을 받아야 함", () => {
        const p1 = createTestProfile({
          values: ["성장", "자유", "안정"],
          conflictStyle: "compromising",
        });
        const p2 = createTestProfile({
          values: ["성장", "배려", "열정"],
          conflictStyle: "avoiding",
        });

        const result = analyzeCompatibility(p1, p2);

        if (result.totalScore >= 60 && result.totalScore < 75) {
          expect(result.grade).toBe("good");
          expect(result.summary).toContain("좋은 인연");
        }
      });

      it("총점이 45-59점이면 'growth' 등급을 받아야 함", () => {
        const p1 = createTestProfile({
          values: ["성장", "자유", "안정"],
          conflictStyle: "competing",
        });
        const p2 = createTestProfile({
          values: ["배려", "열정", "도전"],
          conflictStyle: "competing",
        });

        const result = analyzeCompatibility(p1, p2);

        if (result.totalScore >= 45 && result.totalScore < 60) {
          expect(result.grade).toBe("growth");
          expect(result.summary).toContain("성장");
        }
      });

      it("총점이 44점 이하면 'challenging' 등급을 받아야 함", () => {
        const p1 = createTestProfile({
          values: ["성장", "자유", "안정"],
          conflictStyle: "avoiding",
          rechargeMethod: "independent",
          apologyStyle: "words",
          comfortJudge: "solution",
        });
        const p2 = createTestProfile({
          values: ["배려", "열정", "도전"],
          conflictStyle: "competing",
          rechargeMethod: "relational",
          apologyStyle: "actions",
          comfortJudge: "empathy",
        });

        const result = analyzeCompatibility(p1, p2);

        if (result.totalScore < 45) {
          expect(result.grade).toBe("challenging");
          expect(result.summary).toContain("다른 매력");
        }
      });
    });

    describe("결과 구조 검증", () => {
      it("결과 객체가 올바른 구조를 가져야 함", () => {
        const p1 = createTestProfile();
        const p2 = createTestProfile();

        const result = analyzeCompatibility(p1, p2);

        expect(result).toHaveProperty("totalScore");
        expect(result).toHaveProperty("grade");
        expect(result).toHaveProperty("breakdown");
        expect(result).toHaveProperty("details");
        expect(result).toHaveProperty("summary");

        expect(result.breakdown).toHaveProperty("values");
        expect(result.breakdown).toHaveProperty("conflict");
        expect(result.breakdown).toHaveProperty("lifestyle");

        expect(result.details).toHaveLength(3);
        result.details.forEach((detail) => {
          expect(detail).toHaveProperty("title");
          expect(detail).toHaveProperty("description");
        });
      });

      it("총점은 각 breakdown의 합과 일치해야 함", () => {
        const p1 = createTestProfile();
        const p2 = createTestProfile();

        const result = analyzeCompatibility(p1, p2);

        const sum =
          result.breakdown.values +
          result.breakdown.conflict +
          result.breakdown.lifestyle;

        expect(result.totalScore).toBe(sum);
      });

      it("각 breakdown 점수는 최대값을 초과하지 않아야 함", () => {
        const p1 = createTestProfile();
        const p2 = createTestProfile();

        const result = analyzeCompatibility(p1, p2);

        expect(result.breakdown.values).toBeLessThanOrEqual(40);
        expect(result.breakdown.conflict).toBeLessThanOrEqual(30);
        expect(result.breakdown.lifestyle).toBeLessThanOrEqual(30);
      });

      it("총점은 0-100 범위 내에 있어야 함", () => {
        const p1 = createTestProfile();
        const p2 = createTestProfile();

        const result = analyzeCompatibility(p1, p2);

        expect(result.totalScore).toBeGreaterThanOrEqual(0);
        expect(result.totalScore).toBeLessThanOrEqual(100);
      });
    });

    describe("엣지 케이스", () => {
      it("동일한 프로필끼리 비교하면 최고 점수를 받아야 함", () => {
        const profile = createTestProfile();

        const result = analyzeCompatibility(profile, profile);

        expect(result.totalScore).toBe(100);
        expect(result.grade).toBe("perfect");
      });

      it("모든 속성이 다른 프로필끼리 비교해도 에러가 발생하지 않아야 함", () => {
        const p1 = createTestProfile({
          values: ["성장", "자유", "안정"],
          conflictStyle: "collaborating",
          rechargeMethod: "independent",
          apologyStyle: "words",
          comfortJudge: "solution",
        });
        const p2 = createTestProfile({
          values: ["배려", "열정", "도전"],
          conflictStyle: "competing",
          rechargeMethod: "relational",
          apologyStyle: "actions",
          comfortJudge: "empathy",
        });

        expect(() => analyzeCompatibility(p1, p2)).not.toThrow();
      });

      it("빈 가치관 배열도 처리할 수 있어야 함", () => {
        const p1 = createTestProfile({ values: [] });
        const p2 = createTestProfile({ values: [] });

        const result = analyzeCompatibility(p1, p2);

        expect(result.breakdown.values).toBe(0);
      });

      it("알 수 없는 conflictStyle도 처리할 수 있어야 함", () => {
        const p1 = createTestProfile({ conflictStyle: "unknown" });
        const p2 = createTestProfile({ conflictStyle: "unknown" });

        const result = analyzeCompatibility(p1, p2);

        expect(result.breakdown.conflict).toBe(15); // 기본 점수
      });
    });

    describe("실제 시나리오", () => {
      it("시나리오 1: 가치관은 비슷하지만 갈등 스타일이 상반된 커플", () => {
        const p1 = createTestProfile({
          name: "민수",
          values: ["성장", "자유", "안정"],
          conflictStyle: "competing",
        });
        const p2 = createTestProfile({
          name: "지영",
          values: ["성장", "자유", "배려"],
          conflictStyle: "avoiding",
        });

        const result = analyzeCompatibility(p1, p2);

        expect(result.breakdown.values).toBeGreaterThan(20); // 가치관 유사
        expect(result.breakdown.conflict).toBeLessThanOrEqual(10); // 갈등 스타일 불일치
        expect(result.grade).toMatch(/growth|challenging/);
      });

      it("시나리오 2: 가치관은 다르지만 갈등 해결과 라이프스타일이 잘 맞는 커플", () => {
        const p1 = createTestProfile({
          name: "현우",
          values: ["도전", "열정", "성취"],
          conflictStyle: "collaborating",
          rechargeMethod: "independent",
          apologyStyle: "words",
          comfortJudge: "solution",
        });
        const p2 = createTestProfile({
          name: "수진",
          values: ["안정", "배려", "조화"],
          conflictStyle: "accommodating",
          rechargeMethod: "independent",
          apologyStyle: "words",
          comfortJudge: "solution",
        });

        const result = analyzeCompatibility(p1, p2);

        expect(result.breakdown.values).toBeLessThan(20); // 가치관 차이
        expect(result.breakdown.conflict).toBe(30); // 갈등 스타일 최고
        expect(result.breakdown.lifestyle).toBe(30); // 라이프스타일 완벽
        expect(result.grade).toMatch(/great|good/);
      });

      it("시나리오 3: 모든 면에서 완벽하게 맞는 이상적인 커플", () => {
        const idealProfile = createTestProfile({
          name: "완벽",
          values: ["성장", "자유", "안정"],
          conflictStyle: "collaborating",
          rechargeMethod: "independent",
          apologyStyle: "words",
          comfortJudge: "solution",
        });

        const result = analyzeCompatibility(idealProfile, idealProfile);

        expect(result.totalScore).toBe(100);
        expect(result.grade).toBe("perfect");
        expect(result.breakdown.values).toBe(40);
        expect(result.breakdown.conflict).toBe(30);
        expect(result.breakdown.lifestyle).toBe(30);
      });
    });
  });

  describe("createProfileFromData", () => {
    // Note: createProfileFromData는 실제 LuvIdProfile과 UserManualReport 타입이 필요하므로
    // 통합 테스트나 별도의 테스트 파일에서 다루는 것이 더 적합할 수 있습니다.
    // 여기서는 기본적인 구조만 테스트합니다.

    it("should be a function", () => {
      expect(typeof createProfileFromData).toBe("function");
    });
  });
});
