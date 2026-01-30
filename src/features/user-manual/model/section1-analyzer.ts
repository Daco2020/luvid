import {
  UserAnswer,
  Section1Result,
  Insight,
  EmotionalPattern,
} from "./section1-schema";

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
    // Q5 mapping
    secure: "high",
    anxious: "low",
    avoidant: "low",
    protest: "low",
    
    // Legacy mapping support
    independence: "high",
    anxiety: "low",
    defensive: "low",
    strategic: "medium",
  };

  return mapping[pattern] || "medium";
}

export const STRESS_INSIGHTS: Record<string, Insight> = {
    acceptance: {
      title: "잔잔한 호수 같은 평정심",
      description: "상황을 부정하기보다는, '그럴 수도 있지' 하고 차분하게 현실을 바라보는 편이에요.",
      tip: "가끔은 속상한 마음을 겉으로 표현해도 괜찮아요.",
      teaserHint: "어떤 상황에서도 평정심을 잃지 않으시네요 😌"
    },
    anxiety: {
      title: "확인이 필요한 불안한 마음",
      description: "혹시 내가 실수한 건 아닐까 걱정하며, 그 사람의 마음이 변치 않았는지 확인받고 싶어 한답니다.",
      tip: "불안할 땐 혼자 끙끙 앓지 말고 솔직하게 말해보세요.",
      teaserHint: "혹시 실수했을까 봐 마음 졸일 때가 있나요? 🥺"
    },


    withdrawal: {
      title: "안전한 동굴 속의 휴식",
      description: "상처받지 않기 위해 마음 깊은 곳 안전한 동굴로 숨어버리는 경향이 있어요.",
      tip: "동굴 속에 너무 오래 혼자 있지 않도록 주의하세요.",
      teaserHint: "마음속 깊은 동굴로 숨고 싶을 때가 있나요? 🐻"
    },
    shutdown: {
      title: "일시 정지된 회로",
      description: "너무 큰 스트레스 앞에서는 머릿속이 하얗게 되고, 아무 말도 할 수 없게 되어버려요.",
      tip: "그럴 땐 '지금은 머리가 멈췄어'라고 말해주는 게 좋아요.",
      teaserHint: "너무 힘들면 아무 생각도 안 나고 멍해지시나요? 😶"
    },
    mobilization: {
      title: "해결을 향해 달리는 전차",
      description: "문제가 생기면 바로 해결하려 들고, 에너지를 쏟아붓는 행동파가 되곤 해요.",
      tip: "가끔은 한 발짝 물러서서 지켜보는 여유도 필요해요.",
      teaserHint: "문제가 생기면 바로 움직여야 직성이 풀리시죠? 🏃"
    },
    defensiveness: {
      title: "나를 지키는 방패",
      description: "비난받는 기분이 들면 나도 모르게 핑계를 대거나 상대를 탓하며 방어막을 쳐요.",
      tip: "방패를 내려놓고 상대의 말을 들어보면 의외로 별일 아닐 수 있어요.",
      teaserHint: "나도 모르게 핑계를 대거나 방어하게 되나요? 🛡️"
    },
    // Q5 Keys
    secure: {
      title: "단단한 믿음의 뿌리",
      description: "상대방을 믿고 불안해하지 않는 편안한 마음을 가졌어요.",
      tip: "당신의 안정감이 상대방에게도 큰 힘이 될 거예요.",
      teaserHint: "웬만해서는 마음이 흔들리지 않는 편이군요! 🌳"
    },
    protest: {
      title: "답답한 건 못 참는 직진",
      description: "이유를 알 수 없을 때 답답함을 느끼고 바로 해결하고 싶어 해요.",
      tip: "가끔은 한 템포 늦게 물어보는 것도 방법이에요.",
      teaserHint: "궁금하거나 답답하면 바로 물어봐야 하나요? 🔥"
    },
    avoidant: {
      title: "잠시 거리를 두는 신중함",
      description: "상처받지 않기 위해 일단 한 발짝 물러서는 경향이 있어요.",
      tip: "너무 멀어지기 전에 다시 돌아오는 연습을 해보세요.",
      teaserHint: "마음이 상하면 일단 거리를 두고 싶으신가요? 🚶"
    },
    anxious: {
       title: "확인이 필요한 불안한 마음",
      description: "혹시 내가 실수한 건 아닐까 걱정하며, 그 사람의 마음이 변치 않았는지 확인받고 싶어 한답니다.",
      tip: "불안할 땐 혼자 끙끙 앓지 말고 솔직하게 말해보세요.",
      teaserHint: "혹시 실수했을까 봐 마음 졸일 때가 있나요? 🥺"
    },
    // Q6 Keys (Hyperarousal)
    fight: {
      title: "물러서지 않는 투사",
      description: "갈등 상황에서 논리적으로 이기거나 주장을 관철시켜야 직성이 풀리는 편이에요.",
      tip: "가끔은 져주는 것이 이기는 것일 때가 있답니다.",
      teaserHint: "끝까지 시시비비를 가려야 마음이 편하신가요? ⚔️"
    },
    explosion: {
      title: "화산 같은 에너지",
      description: "감정이 격해지면 순간적으로 폭발할 수 있지만, 뒤끝은 없는 편이에요.",
      tip: "화가 날 땐 심호흡을 하거나 잠시 자리를 피해보세요.",
      teaserHint: "한번 터지면 화끈하게 터지는 스타일이시군요! 🌋"
    },
    flight: {
      title: "평화를 찾아 떠나는 여행자",
      description: "싸움이 커질 것 같으면 일단 자리를 피하고 상황을 종료시키고 싶어 해요.",
      tip: "도만치지 말고 '잠시 생각할 시간이 필요해'라고 말해보세요.",
      teaserHint: "싸움이 싫어서 일단 피하고 보시나요? 🕊️"
    },
    flood: {
      title: "감정의 홍수",
      description: "너무 억울하거나 슬퍼서 눈물부터 나고 말문이 막혀버리곤 해요.",
      tip: "자신의 감정을 글로 적어서 전달해보는 것도 좋아요.",
      teaserHint: "너무 속상하면 눈물부터 왈칵 쏟아지시나요? 😭"
    },
    // Q7 Keys (Hypoarousal)
    freeze: {
      title: "얼음 공주/왕자",
      description: "너무 지치면 아무것도 할 수 없고 손가락 하나 까딱하기 싫어져요.",
      tip: "그럴 땐 아무것도 하지 말고 푹 쉬는 게 최고예요.",
      teaserHint: "방전되면 아무것도 안 하고 싶으시죠? ❄️"
    },
    dissociation: {
      title: "영혼 가출",
      description: "스트레스가 극심하면 현실감이 사라지고 멍해지며 로봇처럼 행동하게 돼요.",
      tip: "따뜻한 차를 마시거나 가벼운 스트레칭으로 감각을 깨워보세요.",
      teaserHint: "너무 힘들면 멍~ 하니 영혼이 빠져나가나요? 🤖"
    },
    regression: {
      title: "어리광쟁이",
      description: "힘들 땐 누군가에게 전적으로 의지하고 싶고, 어린아이처럼 돌봄 받고 싶어 해요.",
      tip: "연인에게 솔직하게 어리광 부려도 괜찮아요.",
      teaserHint: "힘들 때면 누군가 우쭈쭈 해주길 바라나요? 🍼"
    }
};

export const COMFORT_INSIGHTS: Record<string, Insight> = {
    listening: {
      title: "묵묵히 들어주는 대나무 숲",
      description: "해결책을 주지 않아도 괜찮아요. 그저 끄덕이며 '그랬구나' 하고 내 편이 되어줄 때 가장 위로받아요.",
      tip: "연인에게 \"그냥 내 편 들어줘\"라고 말해보세요.",
      teaserHint: "그저 묵묵히 들어줄 때 큰 위로를 받으시네요 👂"
    },
    physical_touch: {
      title: "말보다 따뜻한 온기",
      description: "백 마디 말보다, 조용히 손을 잡아주거나 안아주는 행동이 불안했던 마음을 녹여줘요.",
      tip: "힘들 땐 연인의 손을 잡거나 안아달라고 해보세요.",
      teaserHint: "백 마디 말보다 따뜻한 포옹 한번이 더 좋으시죠? 🫂"
    },
    distraction: {
      title: "기분 전환을 위한 작은 탈출",
      description: "우울한 기분에서 억지로 끄집어내기보다, 맛있는 걸 먹거나 산책하며 기분을 환기시켜 주는 게 좋아요.",
      tip: "기분이 안 좋을 땐 맛있는 걸 먹으러 가자고 해보세요.",
      teaserHint: "맛있는 거 먹으면 기분이 좀 나아지시나요? 🍰"
    },
    space: {
      title: "나만의 시간을 지켜주는 배려",
      description: "스스로 감정을 정리할 때까지 재촉하지 않고 기다려주는 것이, 저에게는 최고의 위로랍니다.",
      tip: "생각 정리할 시간을 달라고 명확히 표현하세요.",
      teaserHint: "혼자만의 시간을 존중받을 때 안심이 되시나요? ⏳"
    },
    act_of_service: {
      title: "짐을 덜어주는 든든한 어깨",
      description: "말보다 행동으로! 내가 짊어진 짐을 대신 덜어주고 문제를 해결해줄 때 깊은 사랑을 느껴요.",
      tip: "도움이 필요할 땐 구체적으로 부탁해보세요.",
      teaserHint: "말보다 행동으로 도와줄 때 사랑을 느끼시네요 💪"
    },
    respecting_space: {
      title: "재촉하지 않는 기다림",
      description: "재촉하지 않는 기다림이 필요해요. 내가 준비될 때까지 묵묵히 기다려줄 때 신뢰를 느껴요.",
      tip: "재촉하지 말고 기다려달라고 말해보세요.",
      teaserHint: "준비될 때까지 기다려주는 배려가 필요하신가요? 🕰️"
    },
};

export const RECHARGE_INSIGHTS: Record<string, Insight> = {
    solitude: {
      title: "당신은 혼자만의 시간이 필요한 사람이에요",
      description:
        "당신은 스트레스를 받으면 에너지가 고갈되고, 혼자 있는 시간을 통해 다시 충전됩니다. 이건 나쁜 게 아니에요.",
      tip: "연인에게 \"지금은 혼자 있고 싶어\"라고 솔직하게 말하는 연습이 필요해요.",
      teaserHint: "혼자 있을 때 마음이 안정되는 경향이 있어요! 🌿",
    },
    social: {
      title: "당신은 사람을 만나야 에너지가 생기는 사람이에요",
      description:
        "혼자 있으면 오히려 더 우울해지고, 사람들과 함께 있을 때 활력을 얻습니다.",
      tip: "연인이 혼자 있고 싶어할 때, 억지로 붙잡지 말고 친구들을 만나보세요.",
      teaserHint: "사람들 사이에서 에너지를 얻는 편이네요! ⚡",
    },
    intimacy: {
      title: "당신은 편한 사람과의 깊은 대화가 필요한 사람이에요",
      description:
        "많은 사람보다는 소수의 친한 사람과 진솔한 이야기를 나눌 때 회복됩니다.",
      tip: "연인에게 \"오늘은 둘이서만 조용히 있고 싶어\"라고 말해보세요.",
      teaserHint: "진솔한 대화로 마음을 채우는 스타일인가봐요 💭",
    },
    activity: {
      title: "당신은 몸을 움직여야 스트레스가 풀리는 사람이에요",
      description:
        "가만히 있으면 답답하고, 운동이나 활동을 통해 에너지를 발산해야 합니다.",
      tip: "연인과 함께 산책, 등산, 운동 같은 활동적인 데이트를 제안해보세요.",
      teaserHint: "움직이면서 스트레스를 날려버리는 편이네요! 🏃‍♂️",
    },
  };

/**
 * 재충전 인사이트 생성
 */
export function generateRechargeInsight(
  method: string
): Insight {

  return RECHARGE_INSIGHTS[method] || RECHARGE_INSIGHTS.solitude;
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
      teaserHint: "답장 안 오면 마음이 조마조마한 편이죠? 🌊",
    },
    high: {
      title: "당신은 불확실성을 잘 견디는 사람이에요",
      description:
        "답장이 늦어도 크게 신경 쓰지 않고, 상대방을 믿고 기다릴 수 있습니다.",
      tip: "하지만 상대방이 불안형이라면? 가끔은 \"잘 지내고 있어\"라는 짧은 연락이 큰 도움이 돼요.",
      teaserHint: "기다림도 여유롭게 즐기는 스타일이네요 ☕",
    },
    medium: {
      title: "당신은 상황에 따라 불안도가 달라지는 사람이에요",
      description:
        "평소엔 괜찮지만, 관계 초반이나 불안정할 때는 확인하고 싶어집니다.",
      tip: "\"지금 나 좀 불안해\"라고 솔직하게 말하는 게 도움이 될 수 있어요.",
      teaserHint: "혹시, 상황에 따라 마음이 흔들리나요? 🍃",
    },
  };

  return insights[tolerance];
}

export const CONFLICT_RESOLUTION_INSIGHTS: Record<string, Insight> = {
    quick_fix: {
      title: "당신은 빨리 화해하고 싶어하는 사람이에요",
      description:
        "갈등이 생기면 불편해서 빨리 풀고 싶어집니다. 하지만 상대방은 생각할 시간이 필요할 수도 있어요.",
      tip: "\"20분 후에 다시 이야기하자\"처럼 타임아웃 규칙을 미리 정해두면 좋아요.",
      teaserHint: "불편한 건 빨리빨리 해결하고 싶으시죠? ⚡",
    },
    time_needed: {
      title: "당신은 갈등 후 생각할 시간이 필요한 사람이에요",
      description:
        "감정이 격해진 상태에서는 대화가 어렵고, 시간을 두고 정리해야 합니다.",
      tip: "상대방에게 \"지금은 대화하기 힘들어. 내일 이야기하자\"라고 명확히 말해주세요.",
      teaserHint: "머리 식히는 시간이 꼭 필요한 스타일이네요 🧊",
    },
    indirect: {
      title: "당신은 직접적인 사과가 어색한 사람이에요",
      description:
        "\"미안해\"라고 말하기보다는 행동으로 보여주거나 우회적으로 접근합니다.",
      tip: "하지만 상대방은 명확한 사과를 원할 수 있어요. 가끔은 \"미안해\"라고 직접 말하는 연습이 필요해요.",
      teaserHint: "말보다 행동이 더 편한 스타일인 것 같은데요? 🤸",
    },
    standoff: {
      title: "당신은 먼저 연락하기 싫어하는 사람이에요",
      description:
        "\"내가 왜 먼저?\"라는 생각이 들고, 상대방이 먼저 연락하길 기다립니다.",
      tip: "하지만 둘 다 기다리면 관계가 멀어질 수 있어요. 자존심보다 관계가 더 중요하다면, 먼저 손 내미는 용기가 필요해요.",
      teaserHint: "먼저 손 내밀기가 쉽지 않으시죠? 🤝",
    },
    // Q6 Keys Mapped
    fight: { title: "물러서지 않는 투사", description: "논리적으로 따져야 직성이 풀리는 스타일이에요.", tip: "져주는 게 이기는 것일 때도 있어요.", teaserHint: "끝장 토론을 선호하시나요? ⚔️" },
    explosion: { title: "화산 같은 에너지", description: "순간적으로 욱하지만 뒤끝은 없는 편이에요.", tip: "화가 나면 잠시 자리를 피해보세요.", teaserHint: "한번 터지면 화끈한가요? 🌋" },
    flight: { title: "평화를 찾아 떠나는 여행자", description: "갈등을 피하고 싶어 일단 자리를 떠요.", tip: "도망이 아니라 생각할 시간이 필요하다고 말해주세요.", teaserHint: "싸움은 일단 피하고 보시나요? 🕊️" },
    flood: { title: "감정의 홍수", description: "너무 속상해서 눈물부터 쏟아져요.", tip: "글로 마음을 전해보세요.", teaserHint: "눈물부터 나나요? 😭" },
  };

/**
 * 갈등 해결 인사이트 생성
 */
export function generateConflictInsight(resolution: string): Insight {

  return CONFLICT_RESOLUTION_INSIGHTS[resolution] || CONFLICT_RESOLUTION_INSIGHTS.quick_fix;
}

/**
 * 스트레스 인사이트 생성
 */
export function generateStressInsight(pattern: string): Insight {
  return STRESS_INSIGHTS[pattern] || STRESS_INSIGHTS.acceptance;
}

/**
 * 위로 언어 인사이트 생성
 */
export function generateComfortInsight(pattern: string): Insight {
  return COMFORT_INSIGHTS[pattern] || COMFORT_INSIGHTS.listening;
}

/**
 * 섹션 1 답변 분석
 */
export function analyzeSection1(answers: UserAnswer[]): Section1Result {
  // 1. 스트레스 반응 패턴 (Q4: Warning, Q5: Uncertainty, Q6: Hyper, Q7: Hypo)
  const stressPatterns = [
    answers.find((a) => a.questionId === 4)?.pattern,
    answers.find((a) => a.questionId === 5)?.pattern,
    answers.find((a) => a.questionId === 6)?.pattern,
    answers.find((a) => a.questionId === 7)?.pattern,
  ].filter((p): p is string => Boolean(p));

  const stress_response = getMostFrequent(
    stressPatterns,
    answers.find((a) => a.questionId === 5)?.pattern || "secure"
  ) as EmotionalPattern["stress_response"];

  // 2. 불확실성 내성 (Q5)
  const q5Pattern = answers.find((a) => a.questionId === 5)?.pattern || "secure";
  const uncertainty_tolerance = mapUncertaintyTolerance(q5Pattern);

  // 3. 갈등 해결 (Q6)
  const conflict_resolution = (answers.find((a) => a.questionId === 6)?.pattern ||
    "flight") as EmotionalPattern["conflict_resolution"];

  // 4. 재충전 방식 (Q1)
  const rechargePatterns = [
    answers.find((a) => a.questionId === 1)?.pattern,
  ].filter((p): p is string => Boolean(p));

  const recharge_method = getMostFrequent(
    rechargePatterns,
    answers.find((a) => a.questionId === 1)?.pattern || "solitude"
  ) as EmotionalPattern["recharge_method"];

  // 5. 위로 언어 (Q9) -> Corrected from Q7
  const comfort_language = (answers.find((a) => a.questionId === 9)?.pattern ||
    "listening") as EmotionalPattern["comfort_language"];

  // 6. 인사이트 생성
  const insights: Insight[] = [
    generateRechargeInsight(recharge_method),
    generateUncertaintyInsight(uncertainty_tolerance),
    generateConflictInsight(conflict_resolution),
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
