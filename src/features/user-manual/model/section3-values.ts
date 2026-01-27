/**
 * Section 3: 20개 핵심 가치 데이터
 * 각 가치는 긍정 4개 + 부정 4개 = 총 8개 세부 항목을 가집니다.
 */

import { CoreValue } from "./section3-schema";

export const CORE_VALUES: CoreValue[] = [
  // 1. 정직성
  {
    id: "honesty",
    name: "정직성",
    nameEn: "Honesty",
    positiveAspects: [
      {
        id: "honesty_pos_1",
        label: "투명한 소통",
        description: "중요한 일은 숨기지 않고 공유한다",
        type: "positive",
      },
      {
        id: "honesty_pos_2",
        label: "진실된 감정 표현",
        description: "거짓 없이 솔직하게 감정을 말한다",
        type: "positive",
      },
      {
        id: "honesty_pos_3",
        label: "실수 인정",
        description: "잘못했을 때 변명 없이 인정한다",
        type: "positive",
      },
      {
        id: "honesty_pos_4",
        label: "약속 이행",
        description: "한 말은 반드시 지킨다",
        type: "positive",
      },
    ],
    negativeAspects: [
      {
        id: "honesty_neg_1",
        label: "습관적 거짓말",
        description: "크고 작은 거짓을 자주 한다",
        type: "negative",
      },
      {
        id: "honesty_neg_2",
        label: "이중생활",
        description: "나에게 숨기는 관계나 일이 있다",
        type: "negative",
      },
      {
        id: "honesty_neg_3",
        label: "변명과 회피",
        description: "잘못을 인정하지 않고 핑계를 댄다",
        type: "negative",
      },
      {
        id: "honesty_neg_4",
        label: "약속 파기",
        description: "한 말을 쉽게 어긴다",
        type: "negative",
      },
    ],
  },

  // 2. 배려심
  {
    id: "consideration",
    name: "배려심",
    nameEn: "Consideration",
    positiveAspects: [
      {
        id: "consideration_pos_1",
        label: "먼저 생각하기",
        description: "내 입장을 먼저 고려해준다",
        type: "positive",
      },
      {
        id: "consideration_pos_2",
        label: "작은 관심",
        description: "사소한 것도 챙겨준다",
        type: "positive",
      },
      {
        id: "consideration_pos_3",
        label: "희생적 태도",
        description: "필요하면 자기 것을 양보한다",
        type: "positive",
      },
      {
        id: "consideration_pos_4",
        label: "세심한 관찰",
        description: "내가 말하지 않아도 눈치챈다",
        type: "positive",
      },
    ],
    negativeAspects: [
      {
        id: "consideration_neg_1",
        label: "자기중심적",
        description: "항상 자기 편의만 생각한다",
        type: "negative",
      },
      {
        id: "consideration_neg_2",
        label: "무관심",
        description: "내 상황에 관심이 없다",
        type: "negative",
      },
      {
        id: "consideration_neg_3",
        label: "이기적 결정",
        description: "나를 배려하지 않고 결정한다",
        type: "negative",
      },
      {
        id: "consideration_neg_4",
        label: "둔감함",
        description: "내 불편함을 전혀 눈치채지 못한다",
        type: "negative",
      },
    ],
  },

  // 3. 소통능력
  {
    id: "communication",
    name: "소통능력",
    nameEn: "Communication",
    positiveAspects: [
      {
        id: "communication_pos_1",
        label: "명확한 표현",
        description: "생각과 감정을 분명히 말한다",
        type: "positive",
      },
      {
        id: "communication_pos_2",
        label: "경청하는 자세",
        description: "내 말을 끝까지 듣는다",
        type: "positive",
      },
      {
        id: "communication_pos_3",
        label: "건설적 대화",
        description: "문제를 해결하려고 대화한다",
        type: "positive",
      },
      {
        id: "communication_pos_4",
        label: "적절한 타이밍",
        description: "중요한 이야기를 적절한 때 한다",
        type: "positive",
      },
    ],
    negativeAspects: [
      {
        id: "communication_neg_1",
        label: "말 안 하기",
        description: "중요한 것도 말하지 않는다",
        type: "negative",
      },
      {
        id: "communication_neg_2",
        label: "말 자르기",
        description: "내 말을 끝까지 듣지 않는다",
        type: "negative",
      },
      {
        id: "communication_neg_3",
        label: "회피형 대화",
        description: "어려운 대화를 피한다",
        type: "negative",
      },
      {
        id: "communication_neg_4",
        label: "감정적 폭발",
        description: "대화 중 감정을 조절하지 못한다",
        type: "negative",
      },
    ],
  },

  // 4. 신뢰성
  {
    id: "reliability",
    name: "신뢰성",
    nameEn: "Reliability",
    positiveAspects: [
      {
        id: "reliability_pos_1",
        label: "일관된 행동",
        description: "말과 행동이 일치한다",
        type: "positive",
      },
      {
        id: "reliability_pos_2",
        label: "책임감",
        description: "맡은 일을 끝까지 해낸다",
        type: "positive",
      },
      {
        id: "reliability_pos_3",
        label: "예측 가능성",
        description: "행동 패턴이 일정하다",
        type: "positive",
      },
      {
        id: "reliability_pos_4",
        label: "의지할 수 있음",
        description: "어려울 때 믿고 기댈 수 있다",
        type: "positive",
      },
    ],
    negativeAspects: [
      {
        id: "reliability_neg_1",
        label: "말과 행동 불일치",
        description: "말만 하고 행동하지 않는다",
        type: "negative",
      },
      {
        id: "reliability_neg_2",
        label: "무책임",
        description: "중요한 일도 대충 한다",
        type: "negative",
      },
      {
        id: "reliability_neg_3",
        label: "변덕스러움",
        description: "기분에 따라 태도가 달라진다",
        type: "negative",
      },
      {
        id: "reliability_neg_4",
        label: "믿을 수 없음",
        description: "중요한 순간에 의지할 수 없다",
        type: "negative",
      },
    ],
  },

  // 5. 존중
  {
    id: "respect",
    name: "존중",
    nameEn: "Respect",
    positiveAspects: [
      {
        id: "respect_pos_1",
        label: "의견 존중",
        description: "내 생각을 인정하고 존중한다",
        type: "positive",
      },
      {
        id: "respect_pos_2",
        label: "경계 인정",
        description: "내 개인 공간을 존중한다",
        type: "positive",
      },
      {
        id: "respect_pos_3",
        label: "평등한 관계",
        description: "나를 동등하게 대한다",
        type: "positive",
      },
      {
        id: "respect_pos_4",
        label: "인격 존중",
        description: "화가 나도 인격을 존중한다",
        type: "positive",
      },
    ],
    negativeAspects: [
      {
        id: "respect_neg_1",
        label: "무시하는 태도",
        description: "내 의견을 무시한다",
        type: "negative",
      },
      {
        id: "respect_neg_2",
        label: "경계 침범",
        description: "내 사생활을 침해한다",
        type: "negative",
      },
      {
        id: "respect_neg_3",
        label: "우월감",
        description: "나를 아래로 본다",
        type: "negative",
      },
      {
        id: "respect_neg_4",
        label: "인격 모독",
        description: "화나면 인격을 공격한다",
        type: "negative",
      },
    ],
  },

  // 6. 감정 조절
  {
    id: "emotional_regulation",
    name: "감정 조절",
    nameEn: "Emotional Regulation",
    positiveAspects: [
      {
        id: "emotional_regulation_pos_1",
        label: "안정적 기분",
        description: "감정 기복이 크지 않다",
        type: "positive",
      },
      {
        id: "emotional_regulation_pos_2",
        label: "분노 조절",
        description: "화가 나도 조절한다",
        type: "positive",
      },
      {
        id: "emotional_regulation_pos_3",
        label: "스트레스 관리",
        description: "스트레스를 건강하게 푼다",
        type: "positive",
      },
      {
        id: "emotional_regulation_pos_4",
        label: "냉정한 판단",
        description: "감정적일 때도 이성을 유지한다",
        type: "positive",
      },
    ],
    negativeAspects: [
      {
        id: "emotional_regulation_neg_1",
        label: "극심한 기복",
        description: "감정 변화가 예측 불가능하다",
        type: "negative",
      },
      {
        id: "emotional_regulation_neg_2",
        label: "폭발적 분노",
        description: "화나면 통제 불능이 된다",
        type: "negative",
      },
      {
        id: "emotional_regulation_neg_3",
        label: "부정적 전이",
        description: "다른 스트레스를 나에게 푼다",
        type: "negative",
      },
      {
        id: "emotional_regulation_neg_4",
        label: "감정적 결정",
        description: "화난 상태에서 중요한 결정을 한다",
        type: "negative",
      },
    ],
  },

  // 7. 독립성
  {
    id: "independence",
    name: "독립성",
    nameEn: "Independence",
    positiveAspects: [
      {
        id: "independence_pos_1",
        label: "자기 주도성",
        description: "스스로 결정하고 행동한다",
        type: "positive",
      },
      {
        id: "independence_pos_2",
        label: "경제적 자립",
        description: "경제적으로 독립적이다",
        type: "positive",
      },
      {
        id: "independence_pos_3",
        label: "개인 시간",
        description: "혼자만의 시간을 가진다",
        type: "positive",
      },
      {
        id: "independence_pos_4",
        label: "자기 발전",
        description: "스스로 성장하려 노력한다",
        type: "positive",
      },
    ],
    negativeAspects: [
      {
        id: "independence_neg_1",
        label: "과도한 의존",
        description: "모든 결정을 나에게 맡긴다",
        type: "negative",
      },
      {
        id: "independence_neg_2",
        label: "경제적 의존",
        description: "경제적으로 전적으로 의존한다",
        type: "negative",
      },
      {
        id: "independence_neg_3",
        label: "집착",
        description: "항상 붙어있으려 한다",
        type: "negative",
      },
      {
        id: "independence_neg_4",
        label: "자기 방치",
        description: "스스로를 발전시키지 않는다",
        type: "negative",
      },
    ],
  },

  // 8. 공감능력
  {
    id: "empathy",
    name: "공감능력",
    nameEn: "Empathy",
    positiveAspects: [
      {
        id: "empathy_pos_1",
        label: "감정 이해",
        description: "내 감정을 이해하려 노력한다",
        type: "positive",
      },
      {
        id: "empathy_pos_2",
        label: "함께 느끼기",
        description: "내 기쁨과 슬픔을 함께 느낀다",
        type: "positive",
      },
      {
        id: "empathy_pos_3",
        label: "위로와 지지",
        description: "힘들 때 위로해준다",
        type: "positive",
      },
      {
        id: "empathy_pos_4",
        label: "입장 바꿔 생각",
        description: "내 입장에서 생각한다",
        type: "positive",
      },
    ],
    negativeAspects: [
      {
        id: "empathy_neg_1",
        label: "감정 무시",
        description: "내 감정을 이해하지 못한다",
        type: "negative",
      },
      {
        id: "empathy_neg_2",
        label: "냉담한 반응",
        description: "내 고통에 무덤덤하다",
        type: "negative",
      },
      {
        id: "empathy_neg_3",
        label: "공감 부족",
        description: "내 상황을 이해하지 못한다",
        type: "negative",
      },
      {
        id: "empathy_neg_4",
        label: "자기 관점만",
        description: "자기 입장만 생각한다",
        type: "negative",
      },
    ],
  },

  // 9. 유머감각
  {
    id: "humor",
    name: "유머감각",
    nameEn: "Humor",
    positiveAspects: [
      {
        id: "humor_pos_1",
        label: "웃음 선물",
        description: "자주 웃게 만든다",
        type: "positive",
      },
      {
        id: "humor_pos_2",
        label: "긍정적 분위기",
        description: "무거운 분위기를 풀어준다",
        type: "positive",
      },
      {
        id: "humor_pos_3",
        label: "재치있는 대화",
        description: "대화가 즐겁다",
        type: "positive",
      },
      {
        id: "humor_pos_4",
        label: "자기 비하 유머",
        description: "자신을 웃음거리로 만들 수 있다",
        type: "positive",
      },
    ],
    negativeAspects: [
      {
        id: "humor_neg_1",
        label: "유머 없음",
        description: "전혀 웃기지 않다",
        type: "negative",
      },
      {
        id: "humor_neg_2",
        label: "무거운 분위기",
        description: "항상 진지하고 무겁다",
        type: "negative",
      },
      {
        id: "humor_neg_3",
        label: "지루한 대화",
        description: "대화가 재미없다",
        type: "negative",
      },
      {
        id: "humor_neg_4",
        label: "상처주는 농담",
        description: "나를 비하하는 농담을 한다",
        type: "negative",
      },
    ],
  },

  // 10. 성실함
  {
    id: "diligence",
    name: "성실함",
    nameEn: "Diligence",
    positiveAspects: [
      {
        id: "diligence_pos_1",
        label: "끝까지 완수",
        description: "시작한 일을 끝낸다",
        type: "positive",
      },
      {
        id: "diligence_pos_2",
        label: "꾸준한 노력",
        description: "매일 조금씩 노력한다",
        type: "positive",
      },
      {
        id: "diligence_pos_3",
        label: "계획 실행",
        description: "계획한 것을 실천한다",
        type: "positive",
      },
      {
        id: "diligence_pos_4",
        label: "자기 관리",
        description: "건강과 생활을 관리한다",
        type: "positive",
      },
    ],
    negativeAspects: [
      {
        id: "diligence_neg_1",
        label: "중도 포기",
        description: "시작만 하고 끝내지 않는다",
        type: "negative",
      },
      {
        id: "diligence_neg_2",
        label: "게으름",
        description: "노력하지 않는다",
        type: "negative",
      },
      {
        id: "diligence_neg_3",
        label: "계획만 세움",
        description: "실천하지 않는다",
        type: "negative",
      },
      {
        id: "diligence_neg_4",
        label: "자기 방치",
        description: "자기 관리를 하지 않는다",
        type: "negative",
      },
    ],
  },

  // 11. 긍정성
  {
    id: "positivity",
    name: "긍정성",
    nameEn: "Positivity",
    positiveAspects: [
      {
        id: "positivity_pos_1",
        label: "희망적 태도",
        description: "어려워도 희망을 찾는다",
        type: "positive",
      },
      {
        id: "positivity_pos_2",
        label: "감사하는 마음",
        description: "작은 것에도 감사한다",
        type: "positive",
      },
      {
        id: "positivity_pos_3",
        label: "밝은 에너지",
        description: "주변을 밝게 만든다",
        type: "positive",
      },
      {
        id: "positivity_pos_4",
        label: "문제 해결 지향",
        description: "문제를 기회로 본다",
        type: "positive",
      },
    ],
    negativeAspects: [
      {
        id: "positivity_neg_1",
        label: "비관적 태도",
        description: "모든 것을 부정적으로 본다",
        type: "negative",
      },
      {
        id: "positivity_neg_2",
        label: "불평불만",
        description: "항상 불평한다",
        type: "negative",
      },
      {
        id: "positivity_neg_3",
        label: "부정적 에너지",
        description: "주변을 우울하게 만든다",
        type: "negative",
      },
      {
        id: "positivity_neg_4",
        label: "포기 지향",
        description: "쉽게 포기한다",
        type: "negative",
      },
    ],
  },

  // 12. 열정
  {
    id: "passion",
    name: "열정",
    nameEn: "Passion",
    positiveAspects: [
      {
        id: "passion_pos_1",
        label: "일에 대한 열정",
        description: "자기 일을 사랑한다",
        type: "positive",
      },
      {
        id: "passion_pos_2",
        label: "관계에 진심",
        description: "우리 관계에 진심이다",
        type: "positive",
      },
      {
        id: "passion_pos_3",
        label: "목표 지향",
        description: "이루고 싶은 것이 있다",
        type: "positive",
      },
      {
        id: "passion_pos_4",
        label: "적극적 참여",
        description: "함께하는 일에 적극적이다",
        type: "positive",
      },
    ],
    negativeAspects: [
      {
        id: "passion_neg_1",
        label: "무기력",
        description: "아무것도 하고 싶어하지 않는다",
        type: "negative",
      },
      {
        id: "passion_neg_2",
        label: "관계에 무심",
        description: "우리 관계에 관심이 없다",
        type: "negative",
      },
      {
        id: "passion_neg_3",
        label: "목표 없음",
        description: "이루고 싶은 것이 없다",
        type: "negative",
      },
      {
        id: "passion_neg_4",
        label: "소극적 태도",
        description: "함께하는 일에 소극적이다",
        type: "negative",
      },
    ],
  },

  // 13. 계획성
  {
    id: "planning",
    name: "계획성",
    nameEn: "Planning",
    positiveAspects: [
      {
        id: "planning_pos_1",
        label: "미래 준비",
        description: "미래를 함께 계획한다",
        type: "positive",
      },
      {
        id: "planning_pos_2",
        label: "체계적 사고",
        description: "일을 체계적으로 처리한다",
        type: "positive",
      },
      {
        id: "planning_pos_3",
        label: "재정 관리",
        description: "돈을 계획적으로 관리한다",
        type: "positive",
      },
      {
        id: "planning_pos_4",
        label: "시간 관리",
        description: "시간을 효율적으로 쓴다",
        type: "positive",
      },
    ],
    negativeAspects: [
      {
        id: "planning_neg_1",
        label: "무계획",
        description: "미래를 전혀 생각하지 않는다",
        type: "negative",
      },
      {
        id: "planning_neg_2",
        label: "즉흥적",
        description: "모든 것을 즉흥적으로 한다",
        type: "negative",
      },
      {
        id: "planning_neg_3",
        label: "낭비",
        description: "돈을 무계획적으로 쓴다",
        type: "negative",
      },
      {
        id: "planning_neg_4",
        label: "시간 낭비",
        description: "시간을 허비한다",
        type: "negative",
      },
    ],
  },

  // 14. 친절함
  {
    id: "kindness",
    name: "친절함",
    nameEn: "Kindness",
    positiveAspects: [
      {
        id: "kindness_pos_1",
        label: "따뜻한 말",
        description: "따뜻한 말을 자주 한다",
        type: "positive",
      },
      {
        id: "kindness_pos_2",
        label: "작은 배려",
        description: "작은 것도 챙겨준다",
        type: "positive",
      },
      {
        id: "kindness_pos_3",
        label: "타인에게 친절",
        description: "다른 사람들에게도 친절하다",
        type: "positive",
      },
      {
        id: "kindness_pos_4",
        label: "부드러운 태도",
        description: "항상 부드럽게 대한다",
        type: "positive",
      },
    ],
    negativeAspects: [
      {
        id: "kindness_neg_1",
        label: "차가운 말투",
        description: "말이 차갑고 날카롭다",
        type: "negative",
      },
      {
        id: "kindness_neg_2",
        label: "무신경",
        description: "작은 것을 챙기지 않는다",
        type: "negative",
      },
      {
        id: "kindness_neg_3",
        label: "타인에게 무례",
        description: "다른 사람들에게 무례하다",
        type: "negative",
      },
      {
        id: "kindness_neg_4",
        label: "거친 태도",
        description: "태도가 거칠다",
        type: "negative",
      },
    ],
  },

  // 15. 지적 호기심
  {
    id: "intellectual_curiosity",
    name: "지적 호기심",
    nameEn: "Intellectual Curiosity",
    positiveAspects: [
      {
        id: "intellectual_curiosity_pos_1",
        label: "배우려는 자세",
        description: "새로운 것을 배우려 한다",
        type: "positive",
      },
      {
        id: "intellectual_curiosity_pos_2",
        label: "깊은 대화",
        description: "의미있는 대화를 나눈다",
        type: "positive",
      },
      {
        id: "intellectual_curiosity_pos_3",
        label: "독서/학습",
        description: "책을 읽거나 공부한다",
        type: "positive",
      },
      {
        id: "intellectual_curiosity_pos_4",
        label: "세상에 관심",
        description: "세상 일에 관심이 많다",
        type: "positive",
      },
    ],
    negativeAspects: [
      {
        id: "intellectual_curiosity_neg_1",
        label: "배움 거부",
        description: "새로운 것을 배우지 않는다",
        type: "negative",
      },
      {
        id: "intellectual_curiosity_neg_2",
        label: "얕은 대화",
        description: "깊이 있는 대화를 못한다",
        type: "negative",
      },
      {
        id: "intellectual_curiosity_neg_3",
        label: "무지",
        description: "아는 것이 없다",
        type: "negative",
      },
      {
        id: "intellectual_curiosity_neg_4",
        label: "세상에 무관심",
        description: "세상 일에 관심이 없다",
        type: "negative",
      },
    ],
  },

  // 16. 감성
  {
    id: "sensitivity",
    name: "감성",
    nameEn: "Sensitivity",
    positiveAspects: [
      {
        id: "sensitivity_pos_1",
        label: "감동하는 마음",
        description: "작은 것에도 감동한다",
        type: "positive",
      },
      {
        id: "sensitivity_pos_2",
        label: "예술 감각",
        description: "예술을 즐기고 이해한다",
        type: "positive",
      },
      {
        id: "sensitivity_pos_3",
        label: "로맨틱함",
        description: "로맨틱한 순간을 만든다",
        type: "positive",
      },
      {
        id: "sensitivity_pos_4",
        label: "섬세한 표현",
        description: "감정을 섬세하게 표현한다",
        type: "positive",
      },
    ],
    negativeAspects: [
      {
        id: "sensitivity_neg_1",
        label: "무감각",
        description: "아무것도 감동하지 않는다",
        type: "negative",
      },
      {
        id: "sensitivity_neg_2",
        label: "예술 무관심",
        description: "예술에 전혀 관심이 없다",
        type: "negative",
      },
      {
        id: "sensitivity_neg_3",
        label: "비로맨틱",
        description: "로맨틱함이 전혀 없다",
        type: "negative",
      },
      {
        id: "sensitivity_neg_4",
        label: "둔한 표현",
        description: "감정 표현이 서툴다",
        type: "negative",
      },
    ],
  },

  // 17. 안정감
  {
    id: "stability",
    name: "안정감",
    nameEn: "Stability",
    positiveAspects: [
      {
        id: "stability_pos_1",
        label: "편안한 존재",
        description: "함께 있으면 편하다",
        type: "positive",
      },
      {
        id: "stability_pos_2",
        label: "일관된 태도",
        description: "태도가 일정하다",
        type: "positive",
      },
      {
        id: "stability_pos_3",
        label: "믿음직함",
        description: "든든하고 믿음직하다",
        type: "positive",
      },
      {
        id: "stability_pos_4",
        label: "심리적 안정",
        description: "불안하지 않게 만든다",
        type: "positive",
      },
    ],
    negativeAspects: [
      {
        id: "stability_neg_1",
        label: "불편한 존재",
        description: "함께 있으면 긴장된다",
        type: "negative",
      },
      {
        id: "stability_neg_2",
        label: "변덕",
        description: "태도가 자주 바뀐다",
        type: "negative",
      },
      {
        id: "stability_neg_3",
        label: "불안정",
        description: "의지할 수 없다",
        type: "negative",
      },
      {
        id: "stability_neg_4",
        label: "심리적 불안",
        description: "불안하게 만든다",
        type: "negative",
      },
    ],
  },

  // 18. 적극성
  {
    id: "proactiveness",
    name: "적극성",
    nameEn: "Proactiveness",
    positiveAspects: [
      {
        id: "proactiveness_pos_1",
        label: "먼저 다가옴",
        description: "관계에 먼저 다가온다",
        type: "positive",
      },
      {
        id: "proactiveness_pos_2",
        label: "문제 해결 시도",
        description: "문제를 먼저 해결하려 한다",
        type: "positive",
      },
      {
        id: "proactiveness_pos_3",
        label: "계획 제안",
        description: "데이트나 활동을 제안한다",
        type: "positive",
      },
      {
        id: "proactiveness_pos_4",
        label: "관심 표현",
        description: "관심을 적극적으로 표현한다",
        type: "positive",
      },
    ],
    negativeAspects: [
      {
        id: "proactiveness_neg_1",
        label: "수동적",
        description: "항상 나를 기다린다",
        type: "negative",
      },
      {
        id: "proactiveness_neg_2",
        label: "문제 방치",
        description: "문제를 해결하지 않는다",
        type: "negative",
      },
      {
        id: "proactiveness_neg_3",
        label: "계획 안 함",
        description: "아무것도 제안하지 않는다",
        type: "negative",
      },
      {
        id: "proactiveness_neg_4",
        label: "관심 숨김",
        description: "관심을 표현하지 않는다",
        type: "negative",
      },
    ],
  },

  // 19. 절제력
  {
    id: "self_control",
    name: "절제력",
    nameEn: "Self-Control",
    positiveAspects: [
      {
        id: "self_control_pos_1",
        label: "욕구 조절",
        description: "욕구를 적절히 조절한다",
        type: "positive",
      },
      {
        id: "self_control_pos_2",
        label: "건강한 습관",
        description: "술, 담배 등을 절제한다",
        type: "positive",
      },
      {
        id: "self_control_pos_3",
        label: "소비 절제",
        description: "충동구매를 하지 않는다",
        type: "positive",
      },
      {
        id: "self_control_pos_4",
        label: "시간 절제",
        description: "게임, SNS 등을 적당히 한다",
        type: "positive",
      },
    ],
    negativeAspects: [
      {
        id: "self_control_neg_1",
        label: "욕구 불능",
        description: "욕구를 전혀 조절하지 못한다",
        type: "negative",
      },
      {
        id: "self_control_neg_2",
        label: "중독",
        description: "술, 담배 등에 중독되어 있다",
        type: "negative",
      },
      {
        id: "self_control_neg_3",
        label: "과소비",
        description: "충동구매를 자주 한다",
        type: "negative",
      },
      {
        id: "self_control_neg_4",
        label: "시간 중독",
        description: "게임, SNS에 과도하게 빠진다",
        type: "negative",
      },
    ],
  },

  // 20. 포용력
  {
    id: "acceptance",
    name: "포용력",
    nameEn: "Acceptance",
    positiveAspects: [
      {
        id: "acceptance_pos_1",
        label: "있는 그대로 수용",
        description: "나의 부족함을 받아들인다",
        type: "positive",
      },
      {
        id: "acceptance_pos_2",
        label: "실수 용서",
        description: "실수를 너그럽게 용서한다",
        type: "positive",
      },
      {
        id: "acceptance_pos_3",
        label: "차이 인정",
        description: "나와 다른 점을 인정한다",
        type: "positive",
      },
      {
        id: "acceptance_pos_4",
        label: "성장 지지",
        description: "내가 성장하도록 지지한다",
        type: "positive",
      },
    ],
    negativeAspects: [
      {
        id: "acceptance_neg_1",
        label: "완벽주의 강요",
        description: "완벽하기를 요구한다",
        type: "negative",
      },
      {
        id: "acceptance_neg_2",
        label: "실수 비난",
        description: "실수를 용서하지 않는다",
        type: "negative",
      },
      {
        id: "acceptance_neg_3",
        label: "차이 거부",
        description: "나와 다른 것을 받아들이지 못한다",
        type: "negative",
      },
      {
        id: "acceptance_neg_4",
        label: "변화 거부",
        description: "내가 변하는 것을 싫어한다",
        type: "negative",
      },
    ],
  },
];

// 헬퍼 함수: ID로 핵심 가치 찾기
export function getCoreValueById(id: string): CoreValue | undefined {
  return CORE_VALUES.find((value) => value.id === id);
}

// 헬퍼 함수: ID로 가치 항목 찾기
export function getValueAspectById(aspectId: string): {
  coreValue: CoreValue;
  aspect: typeof CORE_VALUES[0]["positiveAspects"][0];
} | undefined {
  for (const coreValue of CORE_VALUES) {
    const positiveAspect = coreValue.positiveAspects.find(
      (a) => a.id === aspectId
    );
    if (positiveAspect) {
      return { coreValue, aspect: positiveAspect };
    }

    const negativeAspect = coreValue.negativeAspects.find(
      (a) => a.id === aspectId
    );
    if (negativeAspect) {
      return { coreValue, aspect: negativeAspect };
    }
  }
  return undefined;
}
