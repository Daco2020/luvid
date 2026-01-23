import { describe, it, expect } from "vitest";
import {
  analyzeSection1,
  getMostFrequent,
  mapUncertaintyTolerance,
  generateRechargeInsight,
  generateUncertaintyInsight,
  generateConflictInsight,
} from "@/features/user-manual/utils/section1-analyzer";
import { UserAnswer } from "@/features/user-manual/model/section1-schema";

describe("Section 1 Analyzer", () => {
  describe("getMostFrequent", () => {
    it("should return the most frequent pattern", () => {
      const patterns = ["anxiety", "anxiety", "independence"];
      expect(getMostFrequent(patterns, "anxiety")).toBe("anxiety");
    });

    it("should use fallback when there is a tie", () => {
      const patterns = ["anxiety", "independence"];
      expect(getMostFrequent(patterns, "independence")).toBe("independence");
    });
  });

  describe("mapUncertaintyTolerance", () => {
    it("should map independence to high", () => {
      expect(mapUncertaintyTolerance("independence")).toBe("high");
    });

    it("should map anxiety to low", () => {
      expect(mapUncertaintyTolerance("anxiety")).toBe("low");
    });

    it("should map defensive to low", () => {
      expect(mapUncertaintyTolerance("defensive")).toBe("low");
    });

    it("should map strategic to medium", () => {
      expect(mapUncertaintyTolerance("strategic")).toBe("medium");
    });
  });

  describe("analyzeSection1", () => {
    it("should analyze answers and return correct patterns", () => {
      const answers: UserAnswer[] = [
        { questionId: 1, selectedChoiceId: "B", pattern: "anxiety" },
        { questionId: 2, selectedChoiceId: "B", pattern: "anxiety" },
        { questionId: 3, selectedChoiceId: "B", pattern: "anxiety" },
        { questionId: 4, selectedChoiceId: "A", pattern: "quick_fix" },
        { questionId: 5, selectedChoiceId: "B", pattern: "withdrawal" },
        { questionId: 6, selectedChoiceId: "B", pattern: "solitude" },
        { questionId: 7, selectedChoiceId: "B", pattern: "listening" },
        { questionId: 8, selectedChoiceId: "A", pattern: "solitude" },
      ];

      const result = analyzeSection1(answers);

      expect(result.completed).toBe(true);
      expect(result.patterns.stress_response).toBe("anxiety");
      expect(result.patterns.uncertainty_tolerance).toBe("low");
      expect(result.patterns.conflict_resolution).toBe("quick_fix");
      expect(result.patterns.recharge_method).toBe("solitude");
      expect(result.patterns.comfort_language).toBe("listening");
      expect(result.insights).toHaveLength(3);
    });

    it("should generate insights with title, description, and tip", () => {
      const answers: UserAnswer[] = [
        { questionId: 1, selectedChoiceId: "A", pattern: "acceptance" },
        { questionId: 2, selectedChoiceId: "C", pattern: "independence" },
        { questionId: 3, selectedChoiceId: "A", pattern: "independence" },
        { questionId: 4, selectedChoiceId: "D", pattern: "time_needed" },
        { questionId: 5, selectedChoiceId: "A", pattern: "sharing" },
        { questionId: 6, selectedChoiceId: "B", pattern: "solitude" },
        { questionId: 7, selectedChoiceId: "D", pattern: "space" },
        { questionId: 8, selectedChoiceId: "A", pattern: "solitude" },
      ];

      const result = analyzeSection1(answers);

      result.insights.forEach((insight) => {
        expect(insight.title).toBeTruthy();
        expect(insight.description).toBeTruthy();
        expect(insight.tip).toBeTruthy();
      });
    });
  });

  describe("generateRechargeInsight", () => {
    it("should generate solitude insight", () => {
      const insight = generateRechargeInsight("solitude");
      expect(insight.title).toContain("혼자만의 시간이 필요한");
    });

    it("should generate social insight", () => {
      const insight = generateRechargeInsight("social");
      expect(insight.title).toContain("사람을 만나야 에너지가");
    });
  });

  describe("generateUncertaintyInsight", () => {
    it("should generate low tolerance insight", () => {
      const insight = generateUncertaintyInsight("low");
      expect(insight.title).toContain("불확실성에 약한");
    });

    it("should generate high tolerance insight", () => {
      const insight = generateUncertaintyInsight("high");
      expect(insight.title).toContain("불확실성을 잘 견디는");
    });
  });

  describe("generateConflictInsight", () => {
    it("should generate quick_fix insight", () => {
      const insight = generateConflictInsight("quick_fix");
      expect(insight.title).toContain("빨리 화해하고 싶어하는");
    });

    it("should generate time_needed insight", () => {
      const insight = generateConflictInsight("time_needed");
      expect(insight.title).toContain("생각할 시간이 필요한");
    });
  });
});
