import {
  UserAnswer,
  Section1Result,
  Insight,
  EmotionalPattern,
} from "../model/section1-schema";

/**
 * 가장 많이 나온 패턴 찾기
 */
export function getMostFrequent(patterns: string[], fallback: string): string {
  const counts: Record<string, number> = {};

  patterns.forEach((pattern) => {
    counts[pattern] = (counts[pattern] || 0) + 1;
  });

  const maxCount = Math.max(...Object.values(counts));
  const mostFrequent = Object.keys(counts).filter(
    (key) => counts[key] === maxCount
  );

  // 동점이면 fallback 사용
  if (mostFrequent.length > 1) {
    return fallback;
  }

  return mostFrequent[0];
}

/**
 * 불확실성 내성 매핑
 */
export function mapUncertaintyTolerance(
  pattern: string
): "high" | "medium" | "low" {
  const mapping: Record<string, "high" | "medium" | "low"> = {
    independence: "high",
    anxiety: "low",
    defensive: "low",
    strategic: "medium",
  };

  return mapping[pattern] || "medium";
}

/**
 * 재충전 인사이트 생성
 */
export function generateRechargeInsight(
  method: string
): Insight {
  const insights: Record<string, Insight> = {
    solitude: {
      title: "당신은 혼자만의 시간이 필요한 사람이에요",
      description:
        "당신은 스트레스를 받으면 에너지가 고갈되고, 혼자 있는 시간을 통해 다시 충전됩니다. 이건 나쁜 게 아니에요.",
      tip: "연인에게 \"지금은 혼자 있고 싶어\"라고 솔직하게 말하는 연습이 필요해요.",
    },
    social: {
      title: "당신은 사람을 만나야 에너지가 생기는 사람이에요",
      description:
        "혼자 있으면 오히려 더 우울해지고, 사람들과 함께 있을 때 활력을 얻습니다.",
      tip: "연인이 혼자 있고 싶어할 때, 억지로 붙잡지 말고 친구들을 만나보세요.",
    },
    close_friends: {
      title: "당신은 편한 사람과의 깊은 대화가 필요한 사람이에요",
      description:
        "많은 사람보다는 소수의 친한 사람과 진솔한 이야기를 나눌 때 회복됩니다.",
      tip: "연인에게 \"오늘은 둘이서만 조용히 있고 싶어\"라고 말해보세요.",
    },
    activity: {
      title: "당신은 몸을 움직여야 스트레스가 풀리는 사람이에요",
      description:
        "가만히 있으면 답답하고, 운동이나 활동을 통해 에너지를 발산해야 합니다.",
      tip: "연인과 함께 산책, 등산, 운동 같은 활동적인 데이트를 제안해보세요.",
    },
  };

  return insights[method] || insights.solitude;
}

/**
 * 불확실성 인사이트 생성
 */
export function generateUncertaintyInsight(
  tolerance: "high" | "medium" | "low"
): Insight {
  const insights: Record<string, Insight> = {
    low: {
      title: "당신은 불확실성에 약한 편이에요",
      description:
        "답장이 늦으면 불안해지고, 상대방의 마음을 확인하고 싶어집니다. 이건 당연한 감정이에요.",
      tip: "하지만 매번 확인하려 들면 상대방이 부담스러울 수 있어요. \"불안한 건 내 감정이지, 상대방 잘못이 아니야\"라고 스스로에게 말해보세요.",
    },
    high: {
      title: "당신은 불확실성을 잘 견디는 사람이에요",
      description:
        "답장이 늦어도 크게 신경 쓰지 않고, 상대방을 믿고 기다릴 수 있습니다.",
      tip: "하지만 상대방이 불안형이라면? 가끔은 \"잘 지내고 있어\"라는 짧은 연락이 큰 도움이 돼요.",
    },
    medium: {
      title: "당신은 상황에 따라 불안도가 달라지는 사람이에요",
      description:
        "평소엔 괜찮지만, 관계 초반이나 불안정할 때는 확인하고 싶어집니다.",
      tip: "\"지금 나 좀 불안해\"라고 솔직하게 말하는 게 도움이 될 수 있어요.",
    },
  };

  return insights[tolerance];
}

/**
 * 갈등 해결 인사이트 생성
 */
export function generateConflictInsight(resolution: string): Insight {
  const insights: Record<string, Insight> = {
    quick_fix: {
      title: "당신은 빨리 화해하고 싶어하는 사람이에요",
      description:
        "갈등이 생기면 불편해서 빨리 풀고 싶어집니다. 하지만 상대방은 생각할 시간이 필요할 수도 있어요.",
      tip: "\"20분 후에 다시 이야기하자\"처럼 타임아웃 규칙을 미리 정해두면 좋아요.",
    },
    time_needed: {
      title: "당신은 갈등 후 생각할 시간이 필요한 사람이에요",
      description:
        "감정이 격해진 상태에서는 대화가 어렵고, 시간을 두고 정리해야 합니다.",
      tip: "상대방에게 \"지금은 대화하기 힘들어. 내일 이야기하자\"라고 명확히 말해주세요.",
    },
    indirect: {
      title: "당신은 직접적인 사과가 어색한 사람이에요",
      description:
        "\"미안해\"라고 말하기보다는 행동으로 보여주거나 우회적으로 접근합니다.",
      tip: "하지만 상대방은 명확한 사과를 원할 수 있어요. 가끔은 \"미안해\"라고 직접 말하는 연습이 필요해요.",
    },
    standoff: {
      title: "당신은 먼저 연락하기 싫어하는 사람이에요",
      description:
        "\"내가 왜 먼저?\"라는 생각이 들고, 상대방이 먼저 연락하길 기다립니다.",
      tip: "하지만 둘 다 기다리면 관계가 멀어질 수 있어요. 자존심보다 관계가 더 중요하다면, 먼저 손 내미는 용기가 필요해요.",
    },
  };

  return insights[resolution] || insights.quick_fix;
}

/**
 * 섹션 1 답변 분석
 */
export function analyzeSection1(answers: UserAnswer[]): Section1Result {
  // 1. 스트레스 반응 패턴 (Q1, Q2, Q5)
  const stressPatterns = [
    answers.find((a) => a.questionId === 1)?.pattern,
    answers.find((a) => a.questionId === 2)?.pattern,
    answers.find((a) => a.questionId === 5)?.pattern,
  ].filter((p): p is string => Boolean(p));

  const stress_response = getMostFrequent(
    stressPatterns,
    answers.find((a) => a.questionId === 5)?.pattern || "acceptance"
  ) as EmotionalPattern["stress_response"];

  // 2. 불확실성 내성 (Q3)
  const q3Pattern = answers.find((a) => a.questionId === 3)?.pattern || "independence";
  const uncertainty_tolerance = mapUncertaintyTolerance(q3Pattern);

  // 3. 갈등 해결 (Q4)
  const conflict_resolution = (answers.find((a) => a.questionId === 4)?.pattern ||
    "quick_fix") as EmotionalPattern["conflict_resolution"];

  // 4. 재충전 방식 (Q6, Q8)
  const rechargePatterns = [
    answers.find((a) => a.questionId === 6)?.pattern,
    answers.find((a) => a.questionId === 8)?.pattern,
  ].filter((p): p is string => Boolean(p));

  const recharge_method = getMostFrequent(
    rechargePatterns,
    answers.find((a) => a.questionId === 8)?.pattern || "solitude"
  ) as EmotionalPattern["recharge_method"];

  // 5. 위로 언어 (Q7)
  const comfort_language = (answers.find((a) => a.questionId === 7)?.pattern ||
    "listening") as EmotionalPattern["comfort_language"];

  // 6. 인사이트 생성
  const insights: Insight[] = [
    generateRechargeInsight(recharge_method),
    generateUncertaintyInsight(uncertainty_tolerance),
    generateConflictInsight(conflict_resolution),
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
