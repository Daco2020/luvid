import {
  ConflictStyle,
  ApologyLanguage,
  UserAnswer,
  Section2Result,
  ConflictPattern,
  Insight
} from "../model/section2-schema";

/**
 * 가장 많이 선택된 패턴 찾기 (동점일 경우 첫 번째)
 */
function getMostFrequent(patterns: string[]): string {
  const counts: Record<string, number> = {};
  
  patterns.forEach(pattern => {
    counts[pattern] = (counts[pattern] || 0) + 1;
  });

  let maxCount = 0;
  let mostFrequent = patterns[0];

  Object.entries(counts).forEach(([pattern, count]) => {
    if (count > maxCount) {
      maxCount = count;
      mostFrequent = pattern;
    }
  });

  return mostFrequent;
}

/**
 * TKI 갈등 스타일 분석
 */
function analyzeConflictStyle(answers: UserAnswer[]): ConflictStyle {
  // Q1, Q2, Q3의 패턴 수집
  const conflictAnswers = answers.filter(a => a.questionId >= 1 && a.questionId <= 3);
  const patterns = conflictAnswers.map(a => a.pattern);
  
  return getMostFrequent(patterns) as ConflictStyle;
}

/**
 * 사과 언어 분석
 */
function analyzeApologyLanguage(answers: UserAnswer[]): ApologyLanguage {
  // Q4, Q5, Q6의 패턴 수집
  const apologyAnswers = answers.filter(a => a.questionId >= 4 && a.questionId <= 6);
  const patterns = apologyAnswers.map(a => a.pattern);
  
  return getMostFrequent(patterns) as ApologyLanguage;
}

/**
 * 갈등 스타일별 인사이트 생성
 */
function generateConflictInsight(style: ConflictStyle): Insight {
  const insights: Record<ConflictStyle, Insight> = {
    competing: {
      title: "💥 추격자형 (Competing)",
      description: "갈등이 생기면 즉시 해결하고 싶어하는 당신. 감정을 빨리 풀고 넘어가는 편이에요. 하지만 상대방이 '회피형'이라면 당신이 쫓아갈수록 더 도망가는 악순환에 빠질 수 있어요.",
      tip: "상대가 거리를 두려 할 때는 '20분 후 다시 이야기하자'는 타임아웃 룰을 정해보세요."
    },
    avoiding: {
      title: "🚪 회피형 (Avoiding)",
      description: "갈등 상황에서 자리를 피하고 혼자 생각할 시간이 필요한 당신. 감정이 격해지면 말을 아끼는 편이에요. 하지만 중요한 문제를 계속 덮어두면 언젠가 한계에 도달할 수 있어요.",
      tip: "타임아웃은 좋지만, 반드시 '24시간 이내에는 다시 대화하자'는 약속을 지키세요."
    },
    accommodating: {
      title: "🕊️ 수용형 (Accommodating)",
      description: "관계의 평화를 위해 자신의 욕구를 뒤로 미루는 당신. 배려심이 깊지만, 장기적으로는 억울함이 쌓일 수 있어요. 당신의 감정도 관계에서 중요한 부분이에요.",
      tip: "'나'를 주어로 하는 화법을 연습해보세요. '나는 ~해서 속상했어' 같은 표현이요."
    },
    collaborating: {
      title: "🤝 협력형 (Collaborating)",
      description: "서로의 욕구를 모두 충족시키는 해결책을 찾으려는 당신. 가장 이상적이지만, 모든 문제에 협력형을 적용하면 지칠 수 있어요. 사소한 일은 양보나 타협으로 빠르게 넘어가는 것도 필요해요.",
      tip: "중요한 문제와 사소한 문제를 구분하는 기준을 파트너와 함께 정해보세요."
    },
    compromising: {
      title: "⚖️ 타협형 (Compromising)",
      description: "서로 조금씩 양보해서 적당한 합의점을 찾는 당신. 빠르고 실용적인 해결책을 선호하지만, 가끔은 근본적인 불만이 해소되지 않을 수 있어요.",
      tip: "정기적으로 '진짜 원하는 게 뭐야?'를 묻는 깊은 대화 시간을 가져보세요."
    }
  };

  return insights[style];
}

/**
 * 사과 언어별 인사이트 생성
 */
function generateApologyInsight(language: ApologyLanguage): Insight {
  const insights: Record<ApologyLanguage, Insight> = {
    expressing_regret: {
      title: "💬 후회 표현형",
      description: "\"미안해\"라는 말 속에서 진심을 느끼는 당신. 감정적 공감이 사과의 핵심이에요. 하지만 상대가 '책임 인정형'이라면 감정 표현만으로는 부족하게 느껴질 수 있어요.",
      tip: "파트너에게 \"내가 사과할 때 어떤 말이 듣고 싶어?\"라고 직접 물어보세요."
    },
    accepting_responsibility: {
      title: "✋ 책임 인정형",
      description: "변명하지 않고 깔끔하게 잘못을 인정하는 말을 원하는 당신. '내가 잘못했어'라는 명확한 표현이 중요해요. 감정보다는 사실 확인이 우선이에요.",
      tip: "상대가 감정 표현형이라면, '미안해'라는 감정 표현도 함께 해주세요."
    },
    making_restitution: {
      title: "🎁 보상형",
      description: "말보다 행동으로 보여주는 게 더 와닿는 당신. 구체적인 보상이나 만회 행동이 사과의 진정성을 증명한다고 느껴요.",
      tip: "작은 일에는 말로 사과하고, 큰 일에만 보상을 제안하는 균형감을 가져보세요."
    },
    genuinely_repenting: {
      title: "🔄 행동 변화형",
      description: "\"다시는 안 그럴게\"라는 다짐이 가장 중요한 당신. 재발 방지 계획이 없으면 사과가 공허하게 느껴져요. 행동의 변화가 진짜 사과라고 믿어요.",
      tip: "완벽한 변화를 기대하기보다, 노력하는 과정도 인정해주는 연습을 해보세요."
    },
    requesting_forgiveness: {
      title: "🙏 용서 요청형",
      description: "\"나를 용서해줄 수 있어?\"라는 관계 회복 요청이 중요한 당신. 사과는 상대에게 선택권을 주는 것이라고 생각해요.",
      tip: "용서를 구하기 전에, 먼저 구체적인 잘못을 인정하는 단계를 거쳐보세요."
    }
  };

  return insights[language];
}

/**
 * 섹션 2 통합 분석
 */
export function analyzeSection2(answers: UserAnswer[]): Section2Result {
  const conflictStyle = analyzeConflictStyle(answers);
  const apologyLanguage = analyzeApologyLanguage(answers);

  const patterns: ConflictPattern = {
    conflict_style: conflictStyle,
    apology_language: apologyLanguage
  };

  const insights: Insight[] = [
    generateConflictInsight(conflictStyle),
    generateApologyInsight(apologyLanguage)
  ];

  return {
    completed: true,
    completedAt: new Date().toISOString(),
    answers,
    patterns,
    insights
  };
}
