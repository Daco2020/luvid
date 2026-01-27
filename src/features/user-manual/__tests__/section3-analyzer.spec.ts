import { describe, it, expect } from "vitest";
import {
  analyzeSection3,
  createTournamentBracket,
} from "@/features/user-manual/model/section3-analyzer";
import { Section3Selections, ValueAspect } from "@/features/user-manual/model/section3-schema";
import { CORE_VALUES } from "@/features/user-manual/model/section3-values";

describe("Section 3 Analyzer", () => {
  describe("createTournamentBracket", () => {
    it("should create 2 matches from 4 aspects (준결승)", () => {
      const aspects: ValueAspect[] = [
        {
          id: "test_1",
          label: "테스트 1",
          description: "설명 1",
          type: "positive",
        },
        {
          id: "test_2",
          label: "테스트 2",
          description: "설명 2",
          type: "positive",
        },
        {
          id: "test_3",
          label: "테스트 3",
          description: "설명 3",
          type: "positive",
        },
        {
          id: "test_4",
          label: "테스트 4",
          description: "설명 4",
          type: "positive",
        },
      ];

      const bracket = createTournamentBracket(aspects);

      expect(bracket).toHaveLength(2);
      expect(bracket[0].round).toBe(3); // 4개 = 준결승 = round 3
      expect(bracket[0].matchNumber).toBe(1);
      expect(bracket[0].totalMatches).toBe(2);
      expect(bracket[1].round).toBe(3);
      expect(bracket[1].matchNumber).toBe(2);
      expect(bracket[1].totalMatches).toBe(2);
    });

    it("should throw error if not power of 2", () => {
      const aspects: ValueAspect[] = [
        {
          id: "test_1",
          label: "테스트 1",
          description: "설명 1",
          type: "positive",
        },
      ];

      expect(() => createTournamentBracket(aspects)).toThrow(
        "Tournament requires a power of 2 aspects"
      );
    });

    it("should shuffle aspects randomly", () => {
      const aspects: ValueAspect[] = [
        {
          id: "test_1",
          label: "테스트 1",
          description: "설명 1",
          type: "positive",
        },
        {
          id: "test_2",
          label: "테스트 2",
          description: "설명 2",
          type: "positive",
        },
        {
          id: "test_3",
          label: "테스트 3",
          description: "설명 3",
          type: "positive",
        },
        {
          id: "test_4",
          label: "테스트 4",
          description: "설명 4",
          type: "positive",
        },
      ];

      const bracket = createTournamentBracket(aspects);

      // 모든 aspect가 bracket에 포함되어 있는지 확인
      const allAspectIds = [
        bracket[0].aspectA.id,
        bracket[0].aspectB.id,
        bracket[1].aspectA.id,
        bracket[1].aspectB.id,
      ];
      expect(allAspectIds.sort()).toEqual(["test_1", "test_2", "test_3", "test_4"]);
    });
  });

  describe("analyzeSection3", () => {
    // 실제 데이터를 사용한 테스트
    const selectedCoreValues = [
      "honesty",
      "consideration",
      "communication",
      "reliability",
      "respect",
      "empathy",
      "humor",
      "diligence",
    ];

    it("should analyze selections and return complete result", () => {
      const selections: Section3Selections = {
        selectedCoreValues,
        positiveTournament: {
          matches: [
            {
              id: "pos_match_0",
              round: 1,
              aspectAId: "honesty_pos_1",
              aspectBId: "honesty_pos_2",
              winnerId: "honesty_pos_1",
            },
            {
              id: "pos_match_1",
              round: 1,
              aspectAId: "consideration_pos_1",
              aspectBId: "consideration_pos_2",
              winnerId: "consideration_pos_1",
            },
            {
              id: "pos_match_2",
              round: 2,
              aspectAId: "honesty_pos_1",
              aspectBId: "consideration_pos_1",
              winnerId: "honesty_pos_1",
            },
          ],
          winnerId: "honesty_pos_1",
          runnerUpId: "consideration_pos_1",
        },
        negativeTournament: {
          matches: [
            {
              id: "neg_match_0",
              round: 1,
              aspectAId: "honesty_neg_1",
              aspectBId: "honesty_neg_2",
              winnerId: "honesty_neg_1",
            },
            {
              id: "neg_match_1",
              round: 1,
              aspectAId: "consideration_neg_1",
              aspectBId: "consideration_neg_2",
              winnerId: "consideration_neg_1",
            },
            {
              id: "neg_match_2",
              round: 2,
              aspectAId: "honesty_neg_1",
              aspectBId: "consideration_neg_1",
              winnerId: "honesty_neg_1",
            },
          ],
          winnerId: "honesty_neg_1",
          runnerUpId: "consideration_neg_1",
        },
      };

      const result = analyzeSection3(selections);

      expect(result.completed).toBe(true);
      expect(result.completedAt).toBeTruthy();
      expect(result.selectedCoreValues).toEqual(selectedCoreValues);
      expect(result.topPositiveValue.coreValueId).toBe("honesty");
      expect(result.topPositiveValue.aspect.id).toBe("honesty_pos_1");
      expect(result.topNegativeValue.coreValueId).toBe("honesty");
      expect(result.topNegativeValue.aspect.id).toBe("honesty_neg_1");
      expect(result.insight).toBeTruthy();
    });

    it("should generate insight with correct structure", () => {
      const selections: Section3Selections = {
        selectedCoreValues,
        positiveTournament: {
          matches: [
            {
              id: "pos_match_0",
              round: 1,
              aspectAId: "empathy_pos_1",
              aspectBId: "empathy_pos_2",
              winnerId: "empathy_pos_1",
            },
            {
              id: "pos_match_1",
              round: 1,
              aspectAId: "respect_pos_1",
              aspectBId: "respect_pos_2",
              winnerId: "respect_pos_1",
            },
            {
              id: "pos_match_2",
              round: 2,
              aspectAId: "empathy_pos_1",
              aspectBId: "respect_pos_1",
              winnerId: "empathy_pos_1",
            },
          ],
          winnerId: "empathy_pos_1",
          runnerUpId: "respect_pos_1",
        },
        negativeTournament: {
          matches: [
            {
              id: "neg_match_0",
              round: 1,
              aspectAId: "empathy_neg_1",
              aspectBId: "empathy_neg_2",
              winnerId: "empathy_neg_1",
            },
            {
              id: "neg_match_1",
              round: 1,
              aspectAId: "respect_neg_1",
              aspectBId: "respect_neg_2",
              winnerId: "respect_neg_1",
            },
            {
              id: "neg_match_2",
              round: 2,
              aspectAId: "empathy_neg_1",
              aspectBId: "respect_neg_1",
              winnerId: "empathy_neg_1",
            },
          ],
          winnerId: "empathy_neg_1",
          runnerUpId: "respect_neg_1",
        },
      };

      const result = analyzeSection3(selections);

      // 인사이트가 문자열이고 비어있지 않은지 확인
      expect(typeof result.insight).toBe("string");
      expect(result.insight.length).toBeGreaterThan(0);
    });

    it("should throw error if winner aspect not found", () => {
      const selections: Section3Selections = {
        selectedCoreValues,
        positiveTournament: {
          matches: [],
          winnerId: "invalid_aspect_id",
          runnerUpId: "honesty_pos_1",
        },
        negativeTournament: {
          matches: [],
          winnerId: "honesty_neg_1",
          runnerUpId: "honesty_neg_2",
        },
      };

      expect(() => analyzeSection3(selections)).toThrow(
        "Positive winner aspect not found"
      );
    });

    it("should handle different core value combinations", () => {
      const selections: Section3Selections = {
        selectedCoreValues: [
          "humor",
          "positivity",
          "passion",
          "planning",
          "kindness",
          "stability",
          "proactiveness",
          "acceptance",
        ],
        positiveTournament: {
          matches: [
            {
              id: "pos_match_0",
              round: 1,
              aspectAId: "humor_pos_1",
              aspectBId: "humor_pos_2",
              winnerId: "humor_pos_1",
            },
            {
              id: "pos_match_1",
              round: 1,
              aspectAId: "positivity_pos_1",
              aspectBId: "positivity_pos_2",
              winnerId: "positivity_pos_1",
            },
            {
              id: "pos_match_2",
              round: 2,
              aspectAId: "humor_pos_1",
              aspectBId: "positivity_pos_1",
              winnerId: "humor_pos_1",
            },
          ],
          winnerId: "humor_pos_1",
          runnerUpId: "positivity_pos_1",
        },
        negativeTournament: {
          matches: [
            {
              id: "neg_match_0",
              round: 1,
              aspectAId: "humor_neg_1",
              aspectBId: "humor_neg_2",
              winnerId: "humor_neg_1",
            },
            {
              id: "neg_match_1",
              round: 1,
              aspectAId: "positivity_neg_1",
              aspectBId: "positivity_neg_2",
              winnerId: "positivity_neg_1",
            },
            {
              id: "neg_match_2",
              round: 2,
              aspectAId: "humor_neg_1",
              aspectBId: "positivity_neg_1",
              winnerId: "humor_neg_1",
            },
          ],
          winnerId: "humor_neg_1",
          runnerUpId: "positivity_neg_1",
        },
      };

      const result = analyzeSection3(selections);

      expect(result.completed).toBe(true);
      expect(result.topPositiveValue.coreValueId).toBe("humor");
      expect(result.topNegativeValue.coreValueId).toBe("humor");
    });
  });
});
