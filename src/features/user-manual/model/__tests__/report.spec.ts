import { describe, it, expect } from "vitest";
import { generateUserManual } from "../report";
import { UserManualStorage } from "../section1-schema";
import { Section2Result } from "../section2-schema";
import { Section3Result } from "../section3-schema";

// Mock Data Generators
const createMockStorage = (): UserManualStorage => ({
  version: "1.0",
  userId: "test-user-id",
  startedAt: new Date().toISOString(),
  section1: {
    completed: true,
    answers: [],
    patterns: {
      recharge_method: "independent", // -> "홀로서기 가능한 독립형"
      stress_response: "flight",
      comfort_language: "connection", // -> "따뜻한 공감이 필요한 연결형"
      uncertainty_tolerance: "high",
      conflict_resolution: "constructive"
    },
    insights: []
  },
  section2: {
    completed: true,
    completedAt: new Date().toISOString(),
    scenarioId: "test-scenario",
    choices: [],
    analysis: {
      tki: {
        scores: {
          competing: 0, avoiding: 0, accommodating: 0, collaborating: 0, compromising: 0
        },
        primaryStyle: "collaborating", // -> "함께 더 나은 답을 찾는 지혜"
        secondaryStyle: "accommodating" // -> "상대를 위해 먼저 맞춰주는 다정함"
      },
      apology: {
        scores: {
          expressing_regret: 0, accepting_responsibility: 0, making_restitution: 0, genuinely_repenting: 0, requesting_forgiveness: 0
        },
        primaryLanguage: "expressing_regret",
        secondaryLanguage: "accepting_responsibility"
      },
      gottman: {
        scores: { criticism: 0, defensiveness: 0, contempt: 0, stonewalling: 0 },
        totalScore: 0,
        riskLevel: "healthy"
      }
    },
    insights: {
      conflict: { title: "", description: "", tip: "", teaserHint: "" },
      apology: { 
        title: "진심 어린 후회 표현", 
        description: "상처받은 마음을 어루만져주는 진솔한 대화가 필요해요.", 
        tip: "", 
        teaserHint: "" 
      }
    }
  } as Section2Result,
  section3: {
    completed: true,
    selectedCoreValues: [],
    topPositiveValue: {
      coreValueId: "stability",
      aspect: {
        id: "stability_pos_1",
        label: "굳건한 신뢰",
        description: "서로를 믿는 마음",
        type: "positive"
      }
    },
    top4PositiveValues: [
      { rank: 1, coreValueId: "stability", aspect: { id: "stability_pos_1", label: "굳건한 신뢰", description: "서로를 믿는 마음", type: "positive" } },
      { rank: 2, coreValueId: "growth", aspect: { id: "growth_positive_1", label: "함께하는 성장", description: "발전하는 관계", type: "positive" } },
    ],
    topNegativeValue: {
      coreValueId: "honesty",
      aspect: {
        id: "honesty_negative_1",
        label: "거짓말",
        description: "속이는 행동",
        type: "negative"
      }
    },
    top4NegativeValues: [
      { rank: 1, coreValueId: "honesty", aspect: { id: "honesty_negative_1", label: "거짓말", description: "속이는 행동", type: "negative" } },
      { rank: 2, coreValueId: "respect", aspect: { id: "respect_negative_1", label: "무시", description: "존중없는 태도", type: "negative" } },
    ],
    insight: "test insight"
  } as Section3Result
});

describe("generateUserManual", () => {
  it("should generate a valid report when all sections are complete", () => {
    const data = createMockStorage();
    const report = generateUserManual(data);

    expect(report).not.toBeNull();
    if (!report) return;

    // 1. Identity Verification
    expect(report.identity.archetype).toBe("편안한 휴식 같은 안식처"); // Stability archetype
    expect(report.identity.themeColor).toBe("indigo"); // Solitude recharge -> indigo

    // 2. Specs Verification
    // Spec 1: Energy (Recharge)
    const energySpec = report.specs.find(s => s.icon === "battery");
    expect(energySpec).toBeDefined();
    expect(energySpec?.value).toContain("홀로서기 가능한 독립형"); // Processed from RECHARGE_INSIGHTS.independent.title

    // Spec 2: Conflict (Primary Style)
    const conflictSpec = report.specs.find(s => s.icon === "wifi");
    expect(conflictSpec).toBeDefined();
    expect(conflictSpec?.value).toContain("협력형"); // TKI_DESCRIPTIONS.collaborating.title = "협력형 (Collaborating)"

    // Spec 3: Core Value
    const valueSpec = report.specs.find(s => s.icon === "cpu");
    expect(valueSpec).toBeDefined();
    expect(valueSpec?.value).toBe("굳건한 신뢰"); // from section3 topPositiveValue

    // 3. Details Verification
    const { details } = report;
    
    // Stress
    expect(details.section1.stress.title).toBe("스트레스가 찾아오면");
    expect(details.section1.stress.value).toContain("'일단 이 자리를 피하자'"); // "flight" title map check
    
    // Comfort
    expect(details.section1.comfort.title).toBe("가장 필요한 위로");
    expect(details.section1.comfort.value).toBe("힘들었지? (토닥토닥)");

    // Apology
    expect(details.section2.apology.title).toBe("마음이 풀리는 사과"); 
    expect(details.section2.apology.value).toBe("진심으로 미안해"); 

    // Apology Secondary (New Logic)
    expect(details.section2.apologySecondary).toBeDefined();
    expect(details.section2.apologySecondary?.title).toBe("이런 사과도 좋아요");
    expect(details.section2.apologySecondary?.value).toBe("내가 ~~해서 잘못했어"); 
    expect(details.section2.apologySecondary?.description).toContain("구체적으로 무엇을 잘못했는지 인정해줄 때"); // check map correctness

    // 4. Dealbreakers Verification
    expect(report.dealbreakers[0].label).toBe("거짓말"); // section3 topNegativeValue
    expect(report.dealbreakers[0].rank).toBe(1);
    expect(report.dealbreakers[0].description).toContain("속이는 행동");

    // 5. User Guide Verification
    // Dos - Check keywords
    const dos = report.userGuide.dos;
    // comfort: "listening" -> "해결책을 주지 않아도 괜찮아요..." (from comfortDescMap)
    expect(dos.some(d => d.detailedExample.includes("해결책을 찾기보다 그냥 따뜻하게 안아줬으면 좋겠어"))).toBe(true); 
    expect(dos.some(d => d.detailedExample.includes("변함없이 내 곁을 지켜주는"))).toBe(true); // core value check (stability)

    // Donts - Check keywords
    const donts = report.userGuide.donts;
    expect(donts.some(d => d.detailedExample.includes("거짓말"))).toBe(true); // dealbreaker check
    expect(donts.some(d => d.title === "혼자 있고 싶어 할 때")).toBe(true); // stress response: avoidance check
    
  });

  it("should return null if any section is missing", () => {
    const data = createMockStorage();
    // @ts-ignore
    data.section3 = null;
    expect(generateUserManual(data)).toBeNull();
  });
});
