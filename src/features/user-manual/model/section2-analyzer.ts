import type {
  UserChoice,
  TKIAnalysis,
  ApologyAnalysis,
  GottmanAnalysis,
  ConflictStyle,
  ApologyLanguage,
  GottmanPattern,
  Insight,
  Section2Result,
} from "./section2-schema";

/**
 * 섹션 2 분석 로직
 * 가중치 점수 시스템을 사용하여 TKI, 사과 언어, 고트맨 패턴 분석
 */

// TKI 갈등 스타일 분석
export function analyzeTKI(choices: UserChoice[]): TKIAnalysis {
  // 분기 1-2만 필터링 (TKI 측정)
  const tkiChoices = choices.filter((c) => c.branchId <= 2);

  // 점수 집계
  const scores: Record<ConflictStyle, number> = {
    competing: 0,
    avoiding: 0,
    accommodating: 0,
    collaborating: 0,
    compromising: 0,
  };

  tkiChoices.forEach((choice) => {
    const { primary, secondary } = choice.patterns;
    scores[primary.type as ConflictStyle] += primary.score;
    if (secondary) {
      scores[secondary.type as ConflictStyle] += secondary.score;
    }
  });

  // 점수 순으로 정렬
  const sortedStyles = Object.entries(scores).sort(([, a], [, b]) => b - a);

  const primaryStyle = sortedStyles[0][0] as ConflictStyle;
  const secondaryStyle =
    sortedStyles[1][1] > 0 ? (sortedStyles[1][0] as ConflictStyle) : undefined;

  return {
    scores,
    primaryStyle,
    secondaryStyle,
  };
}

// 사과 언어 분석
export function analyzeApology(choices: UserChoice[]): ApologyAnalysis {
  // 분기 3-4만 필터링 (사과 언어 측정)
  const apologyChoices = choices.filter((c) => c.branchId >= 3 && c.branchId <= 4);

  // 점수 집계
  const scores: Record<ApologyLanguage, number> = {
    expressing_regret: 0,
    accepting_responsibility: 0,
    making_restitution: 0,
    genuinely_repenting: 0,
    requesting_forgiveness: 0,
  };

  apologyChoices.forEach((choice) => {
    const { primary, secondary } = choice.patterns;
    scores[primary.type as ApologyLanguage] += primary.score;
    if (secondary) {
      scores[secondary.type as ApologyLanguage] += secondary.score;
    }
  });

  // 점수 순으로 정렬
  const sortedLanguages = Object.entries(scores).sort(([, a], [, b]) => b - a);

  const primaryLanguage = sortedLanguages[0][0] as ApologyLanguage;
  const secondaryLanguage =
    sortedLanguages[1][1] > 0 ? (sortedLanguages[1][0] as ApologyLanguage) : undefined;

  return {
    scores,
    primaryLanguage,
    secondaryLanguage,
  };
}

// 고트맨 패턴 분석
export function analyzeGottman(choices: UserChoice[]): GottmanAnalysis {
  // 분기 5-6만 필터링 (고트맨 측정)
  const gottmanChoices = choices.filter((c) => c.branchId >= 5 && c.branchId <= 6);

  // 점수 집계
  const scores: Record<GottmanPattern, number> = {
    criticism: 0,
    defensiveness: 0,
    contempt: 0,
    stonewalling: 0,
  };

  let totalScore = 0;

  gottmanChoices.forEach((choice) => {
    const { primary, secondary } = choice.patterns;
    scores[primary.type as GottmanPattern] += primary.score;
    totalScore += primary.score;

    if (secondary) {
      scores[secondary.type as GottmanPattern] += secondary.score;
      totalScore += secondary.score;
    }
  });

  // 위험 수준 판정
  let riskLevel: "healthy" | "caution" | "danger";
  if (totalScore <= 2) {
    riskLevel = "healthy";
  } else if (totalScore <= 5) {
    riskLevel = "caution";
  } else {
    riskLevel = "danger";
  }

  // 가장 높은 점수의 패턴
  const sortedPatterns = Object.entries(scores).sort(([, a], [, b]) => b - a);
  const dominantPattern =
    sortedPatterns[0][1] > 0 ? (sortedPatterns[0][0] as GottmanPattern) : undefined;

  return {
    scores,
    totalScore,
    riskLevel,
    dominantPattern,
  };
}

// TKI Descriptions
export const TKI_DESCRIPTIONS: Record<ConflictStyle, { title: string; description: string; tip: string; teaserHint: string }> = {
    competing: {
      title: "경쟁형 (Competing)",
      description:
        "갈등 상황에서 자신의 의견을 솔직하고 강하게 이야기하는 편이에요. 내 목표를 달성하는 것이 중요하고, 주관이 뚜렷한 스타일이랍니다.",
      tip: '연인에게 이렇게 말하세요: "나는 내 생각을 솔직하게 말하는 편이야. 하지만 네 의견도 꼭 듣고 싶어."',
      teaserHint: "내 생각은 확실하게 말하는 편이시네요! 💪",
    },
    avoiding: {
      title: "회피형 (Avoiding)",
      description:
        "갈등이 생기면 일단 한 발짝 뒤로 물러나거나 시간을 두고 싶어 해요. 불편한 공기를 견디기보다는 상황이 진정되길 기다리는 편이죠.",
      tip: '연인에게 이렇게 말하세요: "싸우고 싶지 않아서 그러는 거야. 생각 정리할 시간이 조금 필요해."',
      teaserHint: "일단 거리를 두고 보는 스타일인가봐요? 🌫️",
    },
    accommodating: {
      title: "수용형 (Accommodating)",
      description:
        "관계의 평화를 위해 내가 조금 양보하는 게 낫다고 생각하는 다정한 사람이에요. 상대방의 의견을 존중하고 맞춰주는 걸 편하게 느낍니다.",
      tip: '연인에게 이렇게 말하세요: "나는 네 의견을 존중해. 하지만 내 생각도 들어줬으면 좋겠어."',
      teaserHint: "관계가 우선이라 양보도 잘하시는 편이죠? 🕊️",
    },
    collaborating: {
      title: "협력형 (Collaborating)",
      description:
        "갈등이 생기면 서로에게 가장 좋은 답을 찾기 위해 끝까지 대화하려 해요. 단순히 덮어두기보다 근본적인 해결을 원하는 적극적인 스타일이에요.",
      tip: '연인에게 이렇게 말하세요: "우리 둘 다 만족할 수 있는 방법을 찾아보자. 함께 이야기하면 해결할 수 있어."',
      teaserHint: "함께 좋은 방법을 찾아가는 걸 좋아하시네요! 🤝",
    },
    compromising: {
      title: "타협형 (Compromising)",
      description:
        "갈등을 빠르고 공정하게 해결하고 싶어 해요. '너 하나, 나 하나' 서로 반반씩 양보해서 중간 지점을 찾는 것이 현실적이라고 생각합니다.",
      tip: '연인에게 이렇게 말하세요: "우리 서로 조금씩 양보하면 어떨까? 중간에서 만나자."',
      teaserHint: "서로 반반씩 양보하는 게 현실적이라고 보시나봐요 ⚖️",
    },
  };

// 인사이트 생성 - TKI
export function generateTKIInsight(analysis: TKIAnalysis): Insight {


  const primary = TKI_DESCRIPTIONS[analysis.primaryStyle];
  let description = primary.description;

  if (analysis.secondaryStyle) {
    const secondary = TKI_DESCRIPTIONS[analysis.secondaryStyle];
    description += ` 하지만 상황에 따라서는 ${secondary.title.split(" ")[0]} 성향이 나오기도 해요.`;
  }

  return {
    title: primary.title,
    description,
    tip: primary.tip,
    teaserHint: primary.teaserHint,
  };
}

// Apology Descriptions
export const APOLOGY_DESCRIPTIONS: Record<
    ApologyLanguage,
    { title: string; description: string; tip: string; teaserHint: string }
  > = {
    expressing_regret: {
      title: "\"진심으로 미안해\"",
      description:
        '"미안해"라는 진심 어린 말 한마디가 무엇보다 중요해요. 어떤 변명보다도, 미안하다는 감정이 느껴질 때 마음이 녹아내린답니다.',
      tip: '연인에게 이렇게 말하세요. "나한테는 \"미안해\"라는 말을 직접 듣는 게 정말 중요해."',
      teaserHint: "진심 어린 \"미안해\" 한 마디가 중요하시죠? 💬",
    },
    accepting_responsibility: {
      title: "\"내가 ~~해서 잘못했어\"",
      description:
        "구체적으로 무엇을 잘못했는지 인정해줄 때 진정성을 느껴요. '그냥 미안해'가 아니라 '내가 ~~해서 미안해'라고 말해주길 바라는 꼼꼼한 스타일이에요.",
      tip: '연인에게 이렇게 말하세요. "왜 그랬는지, 무엇이 잘못됐는지 솔직하게 말해줘."',
      teaserHint: "뭐가 잘못됐는지 확실히 알고 싶은 스타일이네요 📋",
    },
    making_restitution: {
      title: "\"배고프지? 떡볶이 먹으러 갈까?\"",
      description:
        "말뿐인 사과보다는, 행동으로 보여주는 노력이 중요하다고 생각해요. 상황을 바로잡거나 기분을 풀어주려는 실질적인 행동이 필요합니다.",
      tip: '연인에게 이렇게 말하세요. "말보다는 행동으로 보여줘. 맛있는 걸 먹거나 같이 시간을 보내면 좋겠어."',
      teaserHint: "말보다 행동으로 보여주는 게 진짜 사과라고 생각하시나봐요! 🎁",
    },
    genuinely_repenting: {
      title: "\"다음엔 이런 일 없을거야\"",
      description:
        "다시는 같은 실수를 반복하지 않겠다는 약속과 의지가 중요해요. 변화하려는 노력이 보일 때 비로소 믿음이 회복되는 신중한 타입이에요.",
      tip: '연인에게 이렇게 말하세요. "다음엔 이런 일 없게 해줘. 약속할 수 있어?"',
      teaserHint: "다시는 안 그러겠다는 약속이 필요하시죠? 🙏",
    },
    requesting_forgiveness: {
      title: "\"미안, 나를 용서해줄래?\"",
      description:
        "상대방이 내게 용서를 구하는 태도를 중요하게 여겨요. 관계를 소중히 여기고 내 마음이 풀릴 때까지 기다려주는 모습에서 사랑을 느낍니다.",
      tip: '연인에게 이렇게 말하세요. "용서해달라고 진심으로 말해줘. 그럼 용서할게."',
      teaserHint: "용서를 구하는 정중한 태도가 중요하시네요 🤲",
    },
  };

// 인사이트 생성 - 사과 언어
export function generateApologyInsight(analysis: ApologyAnalysis): Insight {


  const primary = APOLOGY_DESCRIPTIONS[analysis.primaryLanguage];
  let description = primary.description;

  return {
    title: primary.title,
    description,
    tip: primary.tip,
    teaserHint: primary.teaserHint,
  };
}

// 인사이트 생성 - 고트맨
export function generateGottmanInsight(analysis: GottmanAnalysis): Insight | undefined {
  if (analysis.riskLevel === "healthy") {
    return undefined; // 건강한 경우 인사이트 없음
  }

  const patternDescriptions: Record<GottmanPattern, { title: string; description: string }> = {
    criticism: {
      title: "비난 (Criticism)",
      description:
        "상대방의 성격이나 인격을 공격하는 말이 튀어나올 때가 있어요. '너는 항상~', '너는 절대~' 같은 표현은 서로에게 상처가 될 수 있답니다.",
    },
    defensiveness: {
      title: "방어 (Defensiveness)",
      description:
        "억울한 마음에 나를 정당화하거나 상대를 역공격하고 싶어질 때가 있죠. '나도 마찬가지야'보다는 '그렇게 보였구나'라고 받아주면 좋아요.",
    },
    contempt: {
      title: "경멸 (Contempt)",
      description:
        "화가 나면 상대를 무시하거나 비꼬는 마음이 들 수도 있어요. 하지만 이건 관계를 가장 빨리 무너뜨리는 행동이니 꼭 조심해야 해요.",
    },
    stonewalling: {
      title: "담쌓기 (Stonewalling)",
      description:
        "대화가 너무 힘들면 입을 닫거나 자리를 피하고 싶어지죠? 하지만 침묵이 길어지면 상대방은 더 답답해할 수 있어요.",
    },
  };

  let title = "주의가 필요해요";
  let description = "";
  let tip = "";

  if (analysis.riskLevel === "caution") {
    title = "⚠️ 갈등 패턴 주의";
    description = "갈등 상황에서 조금은 날선 반응이 나올 수 있어요. ";
  } else {
    title = "🚨 갈등 패턴 위험";
    description = "갈등 상황에서 서로에게 상처 주는 패턴이 자주 나타날 수 있어요. ";
  }

  if (analysis.dominantPattern) {
    const pattern = patternDescriptions[analysis.dominantPattern];
    description += `특히 ${pattern.title} 패턴이 두드러져요. ${pattern.description}`;
    tip = "화가 날 땐 잠시 심호흡을 하고, 한 발짝 물러서서 생각해보세요. '잠깐 쉬었다가 이야기하자'고 타임아웃을 요청하는 것도 현명한 방법이에요.";
  }

  return {
    title,
    description,
    tip,
    teaserHint: "갈등 상황에서 조심해야 할 패턴이 보이는데요? ⚠️",
  };
}

// 전체 분석
export function analyzeSection2(scenarioId: string, choices: UserChoice[]): Section2Result {
  const tki = analyzeTKI(choices);
  const apology = analyzeApology(choices);
  const gottman = analyzeGottman(choices);

  const conflictInsight = generateTKIInsight(tki);
  const apologyInsight = generateApologyInsight(apology);
  const gottmanInsight = generateGottmanInsight(gottman);

  return {
    completed: true,
    completedAt: new Date().toISOString(),
    scenarioId,
    choices,
    analysis: {
      tki,
      apology,
      gottman,
    },
    insights: {
      conflict: conflictInsight,
      apology: apologyInsight,
      gottman: gottmanInsight,
    },
  };
}
