import { describe, it, expect } from "vitest";
import {
  analyzeTKI,
  analyzeApology,
  analyzeGottman,
  analyzeSection2,
} from "@/features/user-manual/model/section2-analyzer";
import { UserChoice } from "@/features/user-manual/model/section2-schema";

describe("Section 2 Analyzer", () => {
  describe("analyzeTKI", () => {
    it("should analyze TKI conflict styles correctly", () => {
      const choices: UserChoice[] = [
        {
          branchId: 1,
          choiceId: "a1_1",
          patterns: {
            primary: { type: "competing", score: 3 },
            secondary: { type: "collaborating", score: 1 },
          },
        },
        {
          branchId: 2,
          choiceId: "a2_1",
          patterns: {
            primary: { type: "competing", score: 3 },
          },
        },
      ];

      const result = analyzeTKI(choices);

      expect(result.primaryStyle).toBe("competing");
      expect(result.scores.competing).toBe(6);
      expect(result.scores.collaborating).toBe(1);
    });

    it("should identify secondary style when present", () => {
      const choices: UserChoice[] = [
        {
          branchId: 1,
          choiceId: "a1_1",
          patterns: {
            primary: { type: "collaborating", score: 3 },
            secondary: { type: "compromising", score: 1 },
          },
        },
        {
          branchId: 2,
          choiceId: "a2_2",
          patterns: {
            primary: { type: "compromising", score: 3 },
            secondary: { type: "collaborating", score: 1 },
          },
        },
      ];

      const result = analyzeTKI(choices);

      expect(result.primaryStyle).toBe("collaborating");
      expect(result.secondaryStyle).toBe("compromising");
      expect(result.scores.collaborating).toBe(4);
      expect(result.scores.compromising).toBe(4);
    });

    it("should only analyze branches 1-2", () => {
      const choices: UserChoice[] = [
        {
          branchId: 1,
          choiceId: "a1_1",
          patterns: {
            primary: { type: "competing", score: 3 },
          },
        },
        {
          branchId: 3,
          choiceId: "a3_1",
          patterns: {
            primary: { type: "avoiding", score: 3 },
          },
        },
      ];

      const result = analyzeTKI(choices);

      expect(result.scores.competing).toBe(3);
      expect(result.scores.avoiding).toBe(0); // Branch 3 should be ignored
    });
  });

  describe("analyzeApology", () => {
    it("should analyze apology languages correctly", () => {
      const choices: UserChoice[] = [
        {
          branchId: 3,
          choiceId: "a3_1",
          patterns: {
            primary: { type: "expressing_regret", score: 3 },
            secondary: { type: "accepting_responsibility", score: 1 },
          },
        },
        {
          branchId: 4,
          choiceId: "a4_1",
          patterns: {
            primary: { type: "expressing_regret", score: 3 },
          },
        },
      ];

      const result = analyzeApology(choices);

      expect(result.primaryLanguage).toBe("expressing_regret");
      expect(result.scores.expressing_regret).toBe(6);
      expect(result.scores.accepting_responsibility).toBe(1);
    });

    it("should only analyze branches 3-4", () => {
      const choices: UserChoice[] = [
        {
          branchId: 2,
          choiceId: "a2_1",
          patterns: {
            primary: { type: "making_restitution", score: 3 },
          },
        },
        {
          branchId: 3,
          choiceId: "a3_1",
          patterns: {
            primary: { type: "expressing_regret", score: 3 },
          },
        },
      ];

      const result = analyzeApology(choices);

      expect(result.scores.expressing_regret).toBe(3);
      expect(result.scores.making_restitution).toBe(0); // Branch 2 should be ignored
    });
  });

  describe("analyzeGottman", () => {
    it("should analyze Gottman patterns correctly", () => {
      const choices: UserChoice[] = [
        {
          branchId: 5,
          choiceId: "a5_1",
          patterns: {
            primary: { type: "criticism", score: 3 },
            secondary: { type: "defensiveness", score: 1 },
          },
        },
        {
          branchId: 6,
          choiceId: "a6_1",
          patterns: {
            primary: { type: "criticism", score: 3 },
          },
        },
      ];

      const result = analyzeGottman(choices);

      expect(result.dominantPattern).toBe("criticism");
      expect(result.scores.criticism).toBe(6);
      expect(result.scores.defensiveness).toBe(1);
      expect(result.totalScore).toBe(7);
      expect(result.riskLevel).toBe("danger"); // totalScore > 5
    });

    it("should identify healthy risk level", () => {
      const choices: UserChoice[] = [
        {
          branchId: 5,
          choiceId: "a5_1",
          patterns: {
            primary: { type: "criticism", score: 1 },
          },
        },
        {
          branchId: 6,
          choiceId: "a6_1",
          patterns: {
            primary: { type: "stonewalling", score: 1 },
          },
        },
      ];

      const result = analyzeGottman(choices);

      expect(result.totalScore).toBe(2);
      expect(result.riskLevel).toBe("healthy"); // totalScore <= 2
    });

    it("should only analyze branches 5-6", () => {
      const choices: UserChoice[] = [
        {
          branchId: 4,
          choiceId: "a4_1",
          patterns: {
            primary: { type: "contempt", score: 3 },
          },
        },
        {
          branchId: 5,
          choiceId: "a5_1",
          patterns: {
            primary: { type: "criticism", score: 3 },
          },
        },
      ];

      const result = analyzeGottman(choices);

      expect(result.scores.criticism).toBe(3);
      expect(result.scores.contempt).toBe(0); // Branch 4 should be ignored
    });
  });

  describe("analyzeSection2", () => {
    it("should analyze complete section 2 and return insights", () => {
      const choices: UserChoice[] = [
        // TKI (branches 1-2)
        {
          branchId: 1,
          choiceId: "a1_1",
          patterns: {
            primary: { type: "collaborating", score: 3 },
          },
        },
        {
          branchId: 2,
          choiceId: "a2_1",
          patterns: {
            primary: { type: "collaborating", score: 3 },
          },
        },
        // Apology (branches 3-4)
        {
          branchId: 3,
          choiceId: "a3_1",
          patterns: {
            primary: { type: "accepting_responsibility", score: 3 },
          },
        },
        {
          branchId: 4,
          choiceId: "a4_1",
          patterns: {
            primary: { type: "accepting_responsibility", score: 3 },
          },
        },
        // Gottman (branches 5-6)
        {
          branchId: 5,
          choiceId: "a5_1",
          patterns: {
            primary: { type: "criticism", score: 3 },
          },
        },
        {
          branchId: 6,
          choiceId: "a6_1",
          patterns: {
            primary: { type: "defensiveness", score: 3 },
          },
        },
      ];

      const result = analyzeSection2("scenario_a", choices);

      expect(result.completed).toBe(true);
      expect(result.completedAt).toBeTruthy();
      expect(result.scenarioId).toBe("scenario_a");
      expect(result.analysis.tki.primaryStyle).toBe("collaborating");
      expect(result.analysis.apology.primaryLanguage).toBe("accepting_responsibility");
      expect(result.analysis.gottman.dominantPattern).toBeDefined();
      expect(result.insights).toBeDefined();
      expect(result.insights.conflict).toBeDefined();
      expect(result.insights.apology).toBeDefined();
      expect(result.insights.conflict.teaserHint).toBeTruthy();
    });

    it("should generate insights with correct structure", () => {
      const choices: UserChoice[] = [
        {
          branchId: 1,
          choiceId: "a1_1",
          patterns: { primary: { type: "avoiding", score: 3 } },
        },
        {
          branchId: 2,
          choiceId: "a2_1",
          patterns: { primary: { type: "avoiding", score: 3 } },
        },
        {
          branchId: 3,
          choiceId: "a3_1",
          patterns: { primary: { type: "requesting_forgiveness", score: 3 } },
        },
        {
          branchId: 4,
          choiceId: "a4_1",
          patterns: { primary: { type: "requesting_forgiveness", score: 3 } },
        },
        {
          branchId: 5,
          choiceId: "a5_1",
          patterns: { primary: { type: "stonewalling", score: 3 } },
        },
        {
          branchId: 6,
          choiceId: "a6_1",
          patterns: { primary: { type: "stonewalling", score: 3 } },
        },
      ];

      const result = analyzeSection2("scenario_b", choices);

      // Conflict insight structure
      expect(result.insights.conflict.title).toBeTruthy();
      expect(result.insights.conflict.description).toBeTruthy();
      expect(result.insights.conflict.tip).toBeTruthy();
      expect(result.insights.conflict.teaserHint).toBeTruthy();

      // Apology insight structure
      expect(result.insights.apology.title).toBeTruthy();
      expect(result.insights.apology.description).toBeTruthy();
      expect(result.insights.apology.tip).toBeTruthy();
    });

    it("should handle healthy Gottman risk level", () => {
      const choices: UserChoice[] = [
        {
          branchId: 1,
          choiceId: "a1_1",
          patterns: { primary: { type: "compromising", score: 3 } },
        },
        {
          branchId: 2,
          choiceId: "a2_1",
          patterns: { primary: { type: "compromising", score: 3 } },
        },
        {
          branchId: 3,
          choiceId: "a3_1",
          patterns: { primary: { type: "genuinely_repenting", score: 3 } },
        },
        {
          branchId: 4,
          choiceId: "a4_1",
          patterns: { primary: { type: "genuinely_repenting", score: 3 } },
        },
        {
          branchId: 5,
          choiceId: "a5_1",
          patterns: { primary: { type: "criticism", score: 1 } },
        },
        {
          branchId: 6,
          choiceId: "a6_1",
          patterns: { primary: { type: "defensiveness", score: 1 } },
        },
      ];

      const result = analyzeSection2("scenario_a", choices);

      expect(result.analysis.gottman.riskLevel).toBe("healthy");
      expect(result.analysis.gottman.totalScore).toBe(2);
    });
  });
});
