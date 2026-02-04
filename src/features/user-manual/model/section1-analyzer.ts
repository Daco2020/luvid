import {
  UserAnswer,
  Section1Result,
  Insight,
  EmotionalPattern,
} from "./section1-schema";

export function getMostFrequent(patterns: string[], fallback: string): string {
  const counts: Record<string, number> = {};

  patterns.forEach((pattern) => {
    counts[pattern] = (counts[pattern] || 0) + 1;
  });

  const maxCount = Math.max(...Object.values(counts));
  const mostFrequent = Object.keys(counts).filter(
    (key) => counts[key] === maxCount
  );

  if (mostFrequent.length > 1) {
    return fallback;
  }

  return mostFrequent[0];
}

export function mapUncertaintyTolerance(
  pattern: string
): "high" | "medium" | "low" {
  const mapping: Record<string, "high" | "medium" | "low"> = {
    secure: "high",
    anxious: "low",
    flight: "low",
    fight: "low",
    freeze: "low",
  };
  return mapping[pattern] || "medium";
}

// =============================================================================
// Insight Maps (4-Pattern Structure)
// =============================================================================

export const BASELINE_INSIGHTS: Record<string, Insight> = {
  independent: { // Previously Solitude
    title: "홀로서기 가능한 독립형",
    description: "혼자만의 시간과 자율성이 보장될 때 가장 안정감을 느껴요. 방해받지 않는 환경을 선호해요.",
    tip: "연인에게 \"지금은 혼자 생각할 시간이 필요해\"라고 명확히 알려주세요.",
    teaserHint: "혼자 있을 때 가장 자유로운가요? 🌿",
  },
  relational: { // Previously Connection (Social)
    title: "사람 속에서 피어나는 관계형",
    description: "타인과의 교류와 소속감 속에서 에너지를 얻어요. 관계의 단절이나 소외감에 예민하게 반응해요.",
    tip: "힘들 땐 혼자 끙끙 앓지 말고 친구나 연인을 만나 에너지를 채우세요.",
    teaserHint: "사람들과 함께할 때 살아있음을 느끼나요? ⚡",
  },
  emotional: { // New: Deep Intimacy/Sensitivity
    title: "마음을 나누는 정서형",
    description: "깊은 정서적 유대감과 공감을 통해 회복해요. 분위기나 감정의 변화에 섬세하게 반응하는 편이에요.",
    tip: "자신의 감정을 솔직하게 표현하고 위로받는 것을 주저하지 마세요.",
    teaserHint: "깊은 대화를 나눌 때 마음이 편안해지나요? ☁️",
  },
  physical: { // Previously Sensory/Activity
    title: "감각이 깨어있는 신체형",
    description: "직접 몸을 움직이거나 오감을 만족시킬 때 활력을 되찾아요. 신체적 컨디션이 기분에 큰 영향을 미쳐요.",
    tip: "기분이 다운될 땐 맛있는 걸 먹거나 땀 흘리는 운동을 해보세요.",
    teaserHint: "몸을 움직여야 스트레스가 풀리나요? 🏃",
  },
};

export const STRESS_INSIGHTS: Record<string, Insight> = {
    secure: {
      title: "'이 문제를 어떻게 해결할까?'",
      description: "갈등이나 스트레스 상황에서도 쉽게 흔들리지 않고, 자신과 상대방을 믿으며 차분하게 대처해요.",
      tip: "당신의 안정감은 상대방에게도 큰 휴식처가 됩니다. 지금처럼 든든한 버팀목이 되어주세요.",
      teaserHint: "웬만해서는 마음이 흔들리지 않는 편이군요! 🌳",
  },
    anxious: {
      title: "'내가 잘못했나봐...'",
      description: "관계가 조금만 어긋나도 '나 때문인가?' 자책하거나, 끊임없이 사랑을 확인받고 싶어 해요.",
      tip: "불안할 땐 혼자 끙끙 앓지 말고 '나 지금 좀 불안해'라고 솔직하게 말하는 연습이 필요해요.",
      teaserHint: "혹시 실수했을까 봐 마음 졸일 때가 있나요? 🥺",
    },
    flight: {
      title: "'일단 이 자리를 피하자'",
      description: "불편한 공기나 갈등이 감지되면, 일단 그 자리를 피하거나 마음의 문을 닫아버림으로써 자신을 보호하려 해요.",
      tip: "도망치는 게 아니라 '잠시 생각할 시간이 필요해'라고 말해주면 상대방도 안심할 거예요.",
      teaserHint: "싸움이 커질 것 같으면 일단 자리를 피하시나요? 🕊️",
    },
    fight: {
      title: "'그래, 한 번 붙어보자!'",
      description: "답답한 상황을 참지 못하고 즉각적으로 해결하려 하며, 때로는 목소리를 높여서라도 내 입장을 관철시켜야 해요.",
      tip: "가끔은 '지금은 너무 흥분했으니 나중에 얘기하자'라며 한 템포 쉬어가는 지혜가 필요해요.",
      teaserHint: "답답한 건 못 참고 바로바로 해결해야 하나요? 🔥",
    },
    freeze: {
      title: "멍... (꽁꽁 얼어붙음)",
      description: "감당하기 힘든 스트레스가 오면 시스템이 일시 정지(Shutdown)되어, 말문이 막히고 아무것도 할 수 없는 상태가 돼요.",
      tip: "이건 당신 잘못이 아니에요. 긴장이 풀릴 때까지 잠시 시간이 필요한 것 뿐이랍니다.",
      teaserHint: "너무 힘들면 머릿속이 하얗게 멈춰버리나요? ❄️",
    },
};

export const RECOVERY_INSIGHTS: Record<string, Insight> = {
    space: {
      title: "생각 정리 되면 연락줘",
      description: "감정이 가라앉을 때까지 재촉하지 않고 가만히 기다려주는 것이 최고의 배려예요.",
      tip: "생각 정리할 시간을 달라고 명확히 표현하세요.",
      teaserHint: "혼자 생각할 시간이 필요하신가요? ⏳",
    },
    connection: {
      title: "힘들었지? (토닥토닥)",
      description: "해결책보다는 내 감정을 알아주고 편들어줄 때, 따뜻하게 안아줄 때 가장 큰 위로를 받아요.",
      tip: "연인에게 \"지금은 그냥 내 편 들어줘\"라고 말해보세요.",
      teaserHint: "말없이 안아줄 때 위로가 되시나요? 🫂",
    },
    sensory: {
      title: "맛있는거 먹으러 갈래?",
      description: "복잡한 말보다 맛있는 음식, 좋은 향기, 따뜻한 온기가 당신을 더 빨리 회복시켜요.",
      tip: "스트레스 받을 땐 오감을 편안하게 해주는 환경을 찾아보세요.",
      teaserHint: "맛있는 걸 먹으면 기분이 나아지나요? 🍰",
    },
    solution: {
      title: "이렇게 해보면 어떄?",
      description: "막연한 위로보다는 문제가 해결되거나 구체적인 계획이 설 때 비로소 마음이 놓여요.",
      tip: "원하는 도움을 구체적으로 요청하여 문제를 해결해보세요.",
      teaserHint: "문제가 해결되어야 발를 뻗고 자나요? 💡",
    },
};

export function generateRechargeInsight(method: string): Insight {
  return BASELINE_INSIGHTS[method] || BASELINE_INSIGHTS.independent;
}

export function generateStressInsight(pattern: string): Insight {
  return STRESS_INSIGHTS[pattern] || STRESS_INSIGHTS.secure;
}

export function generateComfortInsight(pattern: string): Insight {
  return RECOVERY_INSIGHTS[pattern] || RECOVERY_INSIGHTS.connection;
}

export function generateUncertaintyInsight(tolerance: string): Insight {
   const insights: Record<string, Insight> = {
        low: STRESS_INSIGHTS.anxious,
        high: STRESS_INSIGHTS.secure,
        medium: STRESS_INSIGHTS.flight,
   };
   return insights[tolerance] || STRESS_INSIGHTS.secure;
}

export function generateConflictInsight(pattern: string): Insight {
    return STRESS_INSIGHTS[pattern] || STRESS_INSIGHTS.fight;
}

export function analyzeSection1(answers: UserAnswer[]): Section1Result {
  
  // Part 1: 기저 상태 (Q1, Q2, Q3) -> Recharge Method
  const baselinePatterns = [
    answers.find((a) => a.questionId === 1)?.pattern,
    answers.find((a) => a.questionId === 2)?.pattern,
    answers.find((a) => a.questionId === 3)?.pattern,
  ].filter((p): p is string => Boolean(p));
  
  const recharge_method = getMostFrequent(
    baselinePatterns, 
    answers.find((a) => a.questionId === 1)?.pattern || "independent"
  ) as EmotionalPattern["recharge_method"];

  // Part 2: 스트레스 반응 (Q4, Q5, Q6, Q7) -> Stress Response
  const stressPatterns = [
    answers.find((a) => a.questionId === 4)?.pattern,
    answers.find((a) => a.questionId === 5)?.pattern,
    answers.find((a) => a.questionId === 6)?.pattern,
    answers.find((a) => a.questionId === 7)?.pattern,
  ].filter((p): p is string => Boolean(p));

  const stress_response = getMostFrequent(
    stressPatterns,
    answers.find((a) => a.questionId === 4)?.pattern || "secure"
  ) as EmotionalPattern["stress_response"];

  // Part 3: 회복 및 위로 (Q8, Q9, Q10) -> Comfort Language
  const recoveryPatterns = [
    answers.find((a) => a.questionId === 8)?.pattern,
    answers.find((a) => a.questionId === 9)?.pattern,
    answers.find((a) => a.questionId === 10)?.pattern,
  ].filter((p): p is string => Boolean(p));

  const comfort_language = getMostFrequent(
    recoveryPatterns,
    answers.find((a) => a.questionId === 9)?.pattern || "connection"
  ) as EmotionalPattern["comfort_language"];

  const uncertainty_tolerance = mapUncertaintyTolerance(stress_response);
  const conflict_resolution = stress_response as EmotionalPattern["conflict_resolution"];

  const insights: Insight[] = [
    generateRechargeInsight(recharge_method),
    generateStressInsight(stress_response),
    generateComfortInsight(comfort_language),
  ];

  return {
    completed: true,
    completedAt: new Date().toISOString(),
    answers,
    patterns: {
      stress_response,
      uncertainty_tolerance,
      conflict_resolution,
      recharge_method,
      comfort_language,
    },
    insights,
  };
}
