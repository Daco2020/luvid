import { describe, it, expect } from "vitest";
import {
  analyzeSection1,
  getMostFrequent,
  mapUncertaintyTolerance,
  generateRechargeInsight,
  generateUncertaintyInsight,
  generateConflictInsight,
} from "@/features/user-manual/model/section1-analyzer";
import { UserAnswer } from "@/features/user-manual/model/section1-schema";

describe("Section 1 Analyzer", () => {
  describe("getMostFrequent", () => {
    it("should return the most frequent pattern", () => {
      const patterns = ["fight", "fight", "secure"];
      expect(getMostFrequent(patterns, "secure")).toBe("fight");
    });

    it("should use fallback when there is a tie", () => {
      const patterns = ["fight", "secure"];
      expect(getMostFrequent(patterns, "secure")).toBe("secure");
    });
  });

  describe("mapUncertaintyTolerance", () => {
    it("should map secure to high", () => {
      expect(mapUncertaintyTolerance("secure")).toBe("high");
    });
  });

  describe("analyzeSection1", () => {
    it("should analyze answers and return correct patterns", () => {
      // Data Setup based on 4-part independent structure
      const answers: UserAnswer[] = [
        // Part 1
        { questionId: 1, selectedChoiceId: "A", pattern: "independent" },   
        { questionId: 2, selectedChoiceId: "A", pattern: "independent" }, 
        { questionId: 3, selectedChoiceId: "B", pattern: "emotional" },  
        // Result Part 1: independent (2) vs emotional (1) -> independent

        // Part 2
        { questionId: 4, selectedChoiceId: "B", pattern: "fight" },    
        { questionId: 5, selectedChoiceId: "D", pattern: "fight" },    
        { questionId: 6, selectedChoiceId: "A", pattern: "fight" }, 
        { questionId: 7, selectedChoiceId: "B", pattern: "flight" },
        // Result Part 2: fight

        // Part 3
        { questionId: 8, selectedChoiceId: "A", pattern: "space" },
        { questionId: 9, selectedChoiceId: "D", pattern: "space" },
        { questionId: 10, selectedChoiceId: "A", pattern: "space" },
        // Result Part 3: space
      ];

      const result = analyzeSection1(answers);

      expect(result.completed).toBe(true);
      expect(result.patterns.recharge_method).toBe("independent");
      expect(result.patterns.stress_response).toBe("fight"); 
      expect(result.patterns.comfort_language).toBe("space");

      expect(result.patterns.uncertainty_tolerance).toBe("low");
      expect(result.patterns.conflict_resolution).toBe("fight");

      expect(result.insights).toHaveLength(3);
    });

    it("should generate insights with title, description, and tip", () => {
      const answers: UserAnswer[] = [
        { questionId: 1, selectedChoiceId: "A", pattern: "independent" },
        { questionId: 4, selectedChoiceId: "A", pattern: "freeze" },
        { questionId: 8, selectedChoiceId: "A", pattern: "space" },
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
    it("should generate independent insight", () => {
      const insight = generateRechargeInsight("independent");
      expect(insight.title).toContain("홀로서기 가능한 독립형");
    });
  });

  describe("generateConflictInsight", () => {
    it("should generate fight insight", () => {
      const insight = generateConflictInsight("fight");
      expect(insight.title).toContain("'그래, 한 번 붙어보자!'");
    });
  });
});
