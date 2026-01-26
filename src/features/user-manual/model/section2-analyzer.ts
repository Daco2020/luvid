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

// 인사이트 생성 - TKI
export function generateTKIInsight(analysis: TKIAnalysis): Insight {
  const styleDescriptions: Record<ConflictStyle, { title: string; description: string; tip: string; teaserHint: string }> = {
    competing: {
      title: "경쟁형 (Competing)",
      description:
        "당신은 갈등 상황에서 자신의 의견을 강하게 주장하는 경향이 있습니다. 자기주장이 높고, 상대방과의 협조보다는 자신의 목표 달성을 우선시합니다.",
      tip: '연인에게 이렇게 말하세요: "나는 내 생각을 솔직하게 말하는 편이야. 하지만 네 의견도 듣고 싶어."',
      teaserHint: "자기 주장을 강하게 하는 타입이시군요... 💪",
    },
    avoiding: {
      title: "회피형 (Avoiding)",
      description:
        "당신은 갈등 상황을 피하거나 뒤로 미루는 경향이 있습니다. 자기주장과 협조성이 모두 낮으며, 갈등 자체를 불편해합니다.",
      tip: '연인에게 이렇게 말하세요: "갈등이 생기면 일단 시간이 필요해. 하지만 나중에 꼭 이야기하자."',
      teaserHint: "갈등 상황에서 한 발 물러서는 타입이네요... 🚶",
    },
    accommodating: {
      title: "수용형 (Accommodating)",
      description:
        "당신은 갈등 상황에서 상대방을 배려하며 양보하는 경향이 있습니다. 협조성이 높고, 관계 유지를 위해 자신의 의견을 접을 수 있습니다.",
      tip: '연인에게 이렇게 말하세요: "나는 네 의견을 존중해. 하지만 내 생각도 들어줬으면 좋겠어."',
      teaserHint: "상대방을 배려하며 양보하는 타입이시군요... 🤝",
    },
    collaborating: {
      title: "협력형 (Collaborating)",
      description:
        "당신은 갈등 상황에서 서로 win-win할 수 있는 해결책을 찾으려 합니다. 자기주장과 협조성이 모두 높으며, 대화를 통한 문제 해결을 선호합니다.",
      tip: '연인에게 이렇게 말하세요: "우리 둘 다 만족할 수 있는 방법을 찾아보자. 함께 이야기하면 해결할 수 있어."',
      teaserHint: "Win-win 해결책을 찾으려는 타입이네요... 🤝",
    },
    compromising: {
      title: "타협형 (Compromising)",
      description:
        "당신은 갈등 상황에서 중간 지점을 찾으려 합니다. 자기주장과 협조성이 중간 정도이며, 빠른 해결을 위해 서로 양보하는 것을 선호합니다.",
      tip: '연인에게 이렇게 말하세요: "우리 서로 조금씩 양보하면 어떨까? 중간에서 만나자."',
      teaserHint: "중간 지점을 찾으려는 타입이시군요... ⚖️",
    },
  };

  const primary = styleDescriptions[analysis.primaryStyle];
  let description = primary.description;

  if (analysis.secondaryStyle) {
    const secondary = styleDescriptions[analysis.secondaryStyle];
    description += ` 하지만 동시에 ${secondary.title.split(" ")[0]} 성향도 보입니다.`;
  }

  return {
    title: primary.title,
    description,
    tip: primary.tip,
    teaserHint: primary.teaserHint,
  };
}

// 인사이트 생성 - 사과 언어
export function generateApologyInsight(analysis: ApologyAnalysis): Insight {
  const languageDescriptions: Record<
    ApologyLanguage,
    { title: string; description: string; tip: string; teaserHint: string }
  > = {
    expressing_regret: {
      title: "후회 표현형",
      description:
        '당신에게는 "미안해"라는 감정적 표현이 가장 중요합니다. 진심 어린 사과의 말을 듣는 것이 화해의 시작입니다.',
      tip: '연인에게 이렇게 말하세요: "나한테는 \'미안해\'라는 말을 직접 듣는 게 정말 중요해."',
      teaserHint: "\"미안해\"라는 말을 듣고 싶어하는 타입이시군요... 💬",
    },
    accepting_responsibility: {
      title: "책임 인정형",
      description:
        "당신은 상대방이 자신의 잘못을 명확히 인정하는 것을 중요하게 생각합니다. 무엇이 잘못되었는지 구체적으로 설명해주길 원합니다.",
      tip: '연인에게 이렇게 말하세요: "왜 그랬는지, 무엇이 잘못됐는지 솔직하게 말해줘."',
      teaserHint: "명확한 책임 인정을 원하는 타입이네요... 📋",
    },
    making_restitution: {
      title: "보상형",
      description:
        "당신은 말보다 행동으로 보여주는 사과를 중요하게 생각합니다. 실질적인 보상이나 상황을 바로잡는 행동이 필요합니다.",
      tip: '연인에게 이렇게 말하세요: "말보다는 행동으로 보여줘. 함께 시간을 보내거나 뭔가 해주면 좋겠어."',
      teaserHint: "말보다 행동으로 보여주길 원하는 타입이시군요... 🎁",
    },
    genuinely_repenting: {
      title: "진심 어린 뉘우침형",
      description:
        "당신은 상대방이 진심으로 뉘우치고 변화를 약속하는 것을 중요하게 생각합니다. 앞으로 이런 일이 없을 거라는 확신이 필요합니다.",
      tip: '연인에게 이렇게 말하세요: "다음엔 이런 일 없게 해줘. 약속할 수 있어?"',
      teaserHint: "진심 어린 뉘우침과 변화를 원하는 타입이네요... 🙏",
    },
    requesting_forgiveness: {
      title: "용서 구하기형",
      description:
        "당신은 상대방이 정중하게 용서를 구하는 것을 중요하게 생각합니다. 관계 회복을 위한 노력과 용서를 구하는 태도가 필요합니다.",
      tip: '연인에게 이렇게 말하세요: "용서해달라고 진심으로 말해줘. 그럼 용서할게."',
      teaserHint: "정중한 용서 요청을 원하는 타입이시군요... 🤲",
    },
  };

  const primary = languageDescriptions[analysis.primaryLanguage];
  let description = primary.description;

  if (analysis.secondaryLanguage) {
    const secondary = languageDescriptions[analysis.secondaryLanguage];
    description += ` 또한 ${secondary.title}의 요소도 중요하게 생각합니다.`;
  }

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
        "상대방의 성격이나 인격을 공격하는 경향이 있습니다. '너는 항상~', '너는 절대~' 같은 표현을 조심하세요.",
    },
    defensiveness: {
      title: "방어 (Defensiveness)",
      description:
        "자신을 정당화하고 상대를 역공격하는 경향이 있습니다. '나도 마찬가지야', '내 잘못이 아니야' 같은 반응을 줄여보세요.",
    },
    contempt: {
      title: "경멸 (Contempt)",
      description:
        "상대방을 무시하거나 조롱하는 경향이 있습니다. 냉소, 비꼬기, 눈 굴리기 같은 행동은 관계에 가장 치명적입니다.",
    },
    stonewalling: {
      title: "담쌓기 (Stonewalling)",
      description:
        "대화를 거부하고 회피하는 경향이 있습니다. 침묵, 무시, 자리 뜨기 같은 행동은 문제를 더 악화시킵니다.",
    },
  };

  let title = "주의가 필요합니다";
  let description = "";
  let tip = "";

  if (analysis.riskLevel === "caution") {
    title = "⚠️ 갈등 패턴 주의";
    description = "갈등 상황에서 부정적인 패턴이 일부 나타납니다. ";
  } else {
    title = "🚨 갈등 패턴 위험";
    description = "갈등 상황에서 부정적인 패턴이 자주 나타납니다. ";
  }

  if (analysis.dominantPattern) {
    const pattern = patternDescriptions[analysis.dominantPattern];
    description += `특히 ${pattern.title} 패턴이 두드러집니다. ${pattern.description}`;
    tip = "갈등 상황에서 한 발 물러서서 심호흡을 하고, 상대방의 입장에서 생각해보세요. 필요하다면 '타임아웃'을 요청하는 것도 좋습니다.";
  }

  return {
    title,
    description,
    tip,
    teaserHint: "갈등 상황에서 주의가 필요한 패턴이 보이네요... ⚠️",
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
