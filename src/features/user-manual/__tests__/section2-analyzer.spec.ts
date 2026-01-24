import { describe, it, expect } from "vitest";
import { analyzeSection2 } from "../utils/section2-analyzer";
import { UserAnswer } from "../model/section2-schema";

describe("Section2 Analyzer", () => {
  describe("Conflict Style Analysis", () => {
    it("should determine 'competing' style when most answers are competing", () => {
      const answers: UserAnswer[] = [
        { questionId: 1, selectedChoiceId: "1a", pattern: "competing" },
        { questionId: 2, selectedChoiceId: "2d", pattern: "competing" },
        { questionId: 3, selectedChoiceId: "3a", pattern: "competing" },
        { questionId: 4, selectedChoiceId: "4a", pattern: "expressing_regret" },
        { questionId: 5, selectedChoiceId: "5a", pattern: "expressing_regret" },
        { questionId: 6, selectedChoiceId: "6b", pattern: "expressing_regret" }
      ];

      const result = analyzeSection2(answers);

      expect(result.patterns.conflict_style).toBe("competing");
      expect(result.insights[0].title).toContain("추격자형");
    });

    it("should determine 'avoiding' style when most answers are avoiding", () => {
      const answers: UserAnswer[] = [
        { questionId: 1, selectedChoiceId: "1c", pattern: "avoiding" },
        { questionId: 2, selectedChoiceId: "2c", pattern: "avoiding" },
        { questionId: 3, selectedChoiceId: "3b", pattern: "avoiding" },
        { questionId: 4, selectedChoiceId: "4b", pattern: "accepting_responsibility" },
        { questionId: 5, selectedChoiceId: "5b", pattern: "accepting_responsibility" },
        { questionId: 6, selectedChoiceId: "6d", pattern: "genuinely_repenting" }
      ];

      const result = analyzeSection2(answers);

      expect(result.patterns.conflict_style).toBe("avoiding");
      expect(result.insights[0].title).toContain("회피형");
    });

    it("should determine 'accommodating' style", () => {
      const answers: UserAnswer[] = [
        { questionId: 1, selectedChoiceId: "1b", pattern: "accommodating" },
        { questionId: 2, selectedChoiceId: "2b", pattern: "accommodating" },
        { questionId: 3, selectedChoiceId: "3c", pattern: "accommodating" },
        { questionId: 4, selectedChoiceId: "4c", pattern: "making_restitution" },
        { questionId: 5, selectedChoiceId: "5a", pattern: "expressing_regret" },
        { questionId: 6, selectedChoiceId: "6a", pattern: "making_restitution" }
      ];

      const result = analyzeSection2(answers);

      expect(result.patterns.conflict_style).toBe("accommodating");
      expect(result.insights[0].title).toContain("수용형");
    });

    it("should determine 'collaborating' style", () => {
      const answers: UserAnswer[] = [
        { questionId: 1, selectedChoiceId: "1a", pattern: "competing" },
        { questionId: 2, selectedChoiceId: "2a", pattern: "collaborating" },
        { questionId: 3, selectedChoiceId: "3d", pattern: "collaborating" },
        { questionId: 4, selectedChoiceId: "4d", pattern: "genuinely_repenting" },
        { questionId: 5, selectedChoiceId: "5c", pattern: "genuinely_repenting" },
        { questionId: 6, selectedChoiceId: "6d", pattern: "genuinely_repenting" }
      ];

      const result = analyzeSection2(answers);

      expect(result.patterns.conflict_style).toBe("collaborating");
      expect(result.insights[0].title).toContain("협력형");
    });

    it("should determine 'compromising' style", () => {
      const answers: UserAnswer[] = [
        { questionId: 1, selectedChoiceId: "1d", pattern: "compromising" },
        { questionId: 2, selectedChoiceId: "2a", pattern: "collaborating" },
        { questionId: 3, selectedChoiceId: "3a", pattern: "competing" },
        { questionId: 4, selectedChoiceId: "4a", pattern: "expressing_regret" },
        { questionId: 5, selectedChoiceId: "5a", pattern: "expressing_regret" },
        { questionId: 6, selectedChoiceId: "6b", pattern: "expressing_regret" }
      ];

      const result = analyzeSection2(answers);

      expect(result.patterns.conflict_style).toBe("compromising");
      expect(result.insights[0].title).toContain("타협형");
    });
  });

  describe("Apology Language Analysis", () => {
    it("should determine 'expressing_regret' language", () => {
      const answers: UserAnswer[] = [
        { questionId: 1, selectedChoiceId: "1a", pattern: "competing" },
        { questionId: 2, selectedChoiceId: "2d", pattern: "competing" },
        { questionId: 3, selectedChoiceId: "3a", pattern: "competing" },
        { questionId: 4, selectedChoiceId: "4a", pattern: "expressing_regret" },
        { questionId: 5, selectedChoiceId: "5a", pattern: "expressing_regret" },
        { questionId: 6, selectedChoiceId: "6b", pattern: "expressing_regret" }
      ];

      const result = analyzeSection2(answers);

      expect(result.patterns.apology_language).toBe("expressing_regret");
      expect(result.insights[1].title).toContain("후회 표현형");
    });

    it("should determine 'accepting_responsibility' language", () => {
      const answers: UserAnswer[] = [
        { questionId: 1, selectedChoiceId: "1a", pattern: "competing" },
        { questionId: 2, selectedChoiceId: "2d", pattern: "competing" },
        { questionId: 3, selectedChoiceId: "3a", pattern: "competing" },
        { questionId: 4, selectedChoiceId: "4b", pattern: "accepting_responsibility" },
        { questionId: 5, selectedChoiceId: "5b", pattern: "accepting_responsibility" },
        { questionId: 6, selectedChoiceId: "6b", pattern: "expressing_regret" }
      ];

      const result = analyzeSection2(answers);

      expect(result.patterns.apology_language).toBe("accepting_responsibility");
      expect(result.insights[1].title).toContain("책임 인정형");
    });

    it("should determine 'making_restitution' language", () => {
      const answers: UserAnswer[] = [
        { questionId: 1, selectedChoiceId: "1b", pattern: "accommodating" },
        { questionId: 2, selectedChoiceId: "2b", pattern: "accommodating" },
        { questionId: 3, selectedChoiceId: "3c", pattern: "accommodating" },
        { questionId: 4, selectedChoiceId: "4c", pattern: "making_restitution" },
        { questionId: 5, selectedChoiceId: "5a", pattern: "expressing_regret" },
        { questionId: 6, selectedChoiceId: "6a", pattern: "making_restitution" }
      ];

      const result = analyzeSection2(answers);

      expect(result.patterns.apology_language).toBe("making_restitution");
      expect(result.insights[1].title).toContain("보상형");
    });

    it("should determine 'genuinely_repenting' language", () => {
      const answers: UserAnswer[] = [
        { questionId: 1, selectedChoiceId: "1a", pattern: "competing" },
        { questionId: 2, selectedChoiceId: "2d", pattern: "competing" },
        { questionId: 3, selectedChoiceId: "3a", pattern: "competing" },
        { questionId: 4, selectedChoiceId: "4d", pattern: "genuinely_repenting" },
        { questionId: 5, selectedChoiceId: "5c", pattern: "genuinely_repenting" },
        { questionId: 6, selectedChoiceId: "6d", pattern: "genuinely_repenting" }
      ];

      const result = analyzeSection2(answers);

      expect(result.patterns.apology_language).toBe("genuinely_repenting");
      expect(result.insights[1].title).toContain("행동 변화형");
    });

    it("should determine 'requesting_forgiveness' language", () => {
      const answers: UserAnswer[] = [
        { questionId: 1, selectedChoiceId: "1c", pattern: "avoiding" },
        { questionId: 2, selectedChoiceId: "2c", pattern: "avoiding" },
        { questionId: 3, selectedChoiceId: "3b", pattern: "avoiding" },
        { questionId: 4, selectedChoiceId: "4a", pattern: "expressing_regret" },
        { questionId: 5, selectedChoiceId: "5d", pattern: "requesting_forgiveness" },
        { questionId: 6, selectedChoiceId: "6c", pattern: "requesting_forgiveness" }
      ];

      const result = analyzeSection2(answers);

      expect(result.patterns.apology_language).toBe("requesting_forgiveness");
      expect(result.insights[1].title).toContain("용서 요청형");
    });
  });

  describe("Result Structure", () => {
    it("should return properly structured result", () => {
      const answers: UserAnswer[] = [
        { questionId: 1, selectedChoiceId: "1a", pattern: "competing" },
        { questionId: 2, selectedChoiceId: "2d", pattern: "competing" },
        { questionId: 3, selectedChoiceId: "3a", pattern: "competing" },
        { questionId: 4, selectedChoiceId: "4a", pattern: "expressing_regret" },
        { questionId: 5, selectedChoiceId: "5a", pattern: "expressing_regret" },
        { questionId: 6, selectedChoiceId: "6b", pattern: "expressing_regret" }
      ];

      const result = analyzeSection2(answers);

      expect(result).toHaveProperty("completed", true);
      expect(result).toHaveProperty("completedAt");
      expect(result).toHaveProperty("answers");
      expect(result).toHaveProperty("patterns");
      expect(result).toHaveProperty("insights");

      expect(result.insights).toHaveLength(2);
      expect(result.insights[0]).toHaveProperty("title");
      expect(result.insights[0]).toHaveProperty("description");
      expect(result.insights[0]).toHaveProperty("tip");
    });
  });
});
