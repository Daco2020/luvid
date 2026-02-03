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
        description: "중요한 일은 숨기지 않고 솔직하게 공유해요",
        type: "positive",
      },
      {
        id: "honesty_pos_2",
        label: "진실된 감정 표현",
        description: "가식 없이 제 감정을 솔직하게 표현해요",
        type: "positive",
      },
      {
        id: "honesty_pos_3",
        label: "실수 인정",
        description: "실수했을 땐 변명하기보단 깨끗이 인정해요",
        type: "positive",
      },
      {
        id: "honesty_pos_4",
        label: "약속 이행",
        description: "제가 뱉은 말은 책임지고 반드시 지켜요",
        type: "positive",
      },
    ],
    negativeAspects: [
      {
        id: "honesty_neg_1",
        label: "습관적 거짓말",
        description: "사소한 거짓말이라도 습관적으로 하는 건 싫어요",
        type: "negative",
      },
      {
        id: "honesty_neg_2",
        label: "이중생활",
        description: "저에게 숨기는 비밀이나 관계가 있는 건 원치 않아요",
        type: "negative",
      },
      {
        id: "honesty_neg_3",
        label: "변명과 회피",
        description: "잘못을 인정하지 않고 상황을 회피하는 건 힘들어요",
        type: "negative",
      },
      {
        id: "honesty_neg_4",
        label: "약속 파기",
        description: "약속한 말을 가볍게 여기고 쉽게 어기는 건 싫어요",
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
        description: "제 입장을 먼저 헤아리고 배려해줘요",
        type: "positive",
      },
      {
        id: "consideration_pos_2",
        label: "따뜻한 말과 행동",
        description: "따뜻한 말 한마디와 사소한 배려를 잊지 않아요",
        type: "positive",
      },
      {
        id: "consideration_pos_3",
        label: "희생적 태도",
        description: "필요하다면 저를 위해 기꺼이 양보해줘요",
        type: "positive",
      },
      {
        id: "consideration_pos_4",
        label: "세심한 관찰",
        description: "말하지 않아도 제 마음을 세심하게 알아차려요",
        type: "positive",
      },
    ],
    negativeAspects: [
      {
        id: "consideration_neg_1",
        label: "자기중심적",
        description: "항상 본인의 편의만 우선시하는 건 섭섭해요",
        type: "negative",
      },
      {
        id: "consideration_neg_2",
        label: "무관심",
        description: "제 상황에 무관심하고 대화를 피하는 건 싫어요",
        type: "negative",
      },
      {
        id: "consideration_neg_3",
        label: "거친 태도",
        description: "배려 없는 거친 언행은 저에게 상처가 돼요",
        type: "negative",
      },
      {
        id: "consideration_neg_4",
        label: "둔감함",
        description: "저의 불편함을 전혀 눈치채지 못하면 답답해요",
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
        description: "생각과 감정을 오해 없이 분명하게 표현해요",
        type: "positive",
      },
      {
        id: "communication_pos_2",
        label: "경청하는 자세",
        description: "제 이야기에 귀 기울이고 끝까지 들어줘요",
        type: "positive",
      },
      {
        id: "communication_pos_3",
        label: "건설적 대화",
        description: "갈등이 생기면 대화를 통해 해결하려고 노력해요",
        type: "positive",
      },
      {
        id: "communication_pos_4",
        label: "적절한 타이밍",
        description: "중요한 이야기는 피하지 않고 적절한 때에 꺼내요",
        type: "positive",
      },
    ],
    negativeAspects: [
      {
        id: "communication_neg_1",
        label: "말 안 하기",
        description: "중요한 사실을 말해주지 않고 넘어가는 건 싫어요",
        type: "negative",
      },
      {
        id: "communication_neg_2",
        label: "말 자르기",
        description: "제 말을 중간에 끊거나 건성으로 듣는 건 싫어요",
        type: "negative",
      },
      {
        id: "communication_neg_3",
        label: "회피형 대화",
        description: "곤란한 상황에서 대화를 회피하는 건 답답해요",
        type: "negative",
      },
      {
        id: "communication_neg_4",
        label: "감정적 폭발",
        description: "대화 중에 감정을 주체하지 못하고 폭발하는 건 무서워요",
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
        description: "제 생각과 가치관을 있는 그대로 인정하고 존중해줘요",
        type: "positive",
      },
      {
        id: "respect_pos_2",
        label: "경계 인정",
        description: "저만의 개인적인 공간과 시간을 소중하게 지켜줘요",
        type: "positive",
      },
      {
        id: "respect_pos_3",
        label: "평등한 관계",
        description: "어떤 상황에서도 저를 동등한 인격체로 대우해줘요",
        type: "positive",
      },
      {
        id: "respect_pos_4",
        label: "인격 존중",
        description: "화가 나는 순간에도 인격적인 존중을 잃지 않아요",
        type: "positive",
      },
    ],
    negativeAspects: [
      {
        id: "respect_neg_1",
        label: "무시하는 태도",
        description: "제 의견을 무시하거나 가볍게 여기는 태도는 싫어요",
        type: "negative",
      },
      {
        id: "respect_neg_2",
        label: "경계 침범",
        description: "허락 없이 제 사생활이나 개인 영역을 침범하는 건 싫어요",
        type: "negative",
      },
      {
        id: "respect_neg_3",
        label: "우월감",
        description: "저를 본인보다 아래로 보거나 우월감을 느끼는 건 불쾌해요",
        type: "negative",
      },
      {
        id: "respect_neg_4",
        label: "인격 모독",
        description: "화가 나면 인신공격이나 모욕적인 말을 하는 건 못 참아요",
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
        description: "감정 기복이 크지 않고 언제나 평온함을 유지해요",
        type: "positive",
      },
      {
        id: "emotional_regulation_pos_2",
        label: "분노 조절",
        description: "화가 나더라도 감정을 잘 다스리고 차분하게 표현해요",
        type: "positive",
      },
      {
        id: "emotional_regulation_pos_3",
        label: "스트레스 관리",
        description: "스트레스를 쌓아두지 않고 건강한 방법으로 해소해요",
        type: "positive",
      },
      {
        id: "emotional_regulation_pos_4",
        label: "냉정한 판단",
        description: "감정이 격해질 때도 이성을 잃지 않고 대화해요",
        type: "positive",
      },
    ],
    negativeAspects: [
      {
        id: "emotional_regulation_neg_1",
        label: "극심한 기복",
        description: "하루에도 몇 번씩 감정이 롤러코스터처럼 변하면 힘들어요",
        type: "negative",
      },
      {
        id: "emotional_regulation_neg_2",
        label: "폭발적 분노",
        description: "화가 나면 물불 가리지 않고 통제 불능이 되는 건 무서워요",
        type: "negative",
      },
      {
        id: "emotional_regulation_neg_3",
        label: "부정적 전이",
        description: "밖에서 받은 스트레스를 저에게 푸는 건 정말 싫어요",
        type: "negative",
      },
      {
        id: "emotional_regulation_neg_4",
        label: "감정적 결정",
        description: "감정에 휩쓸려 충동적으로 중요한 결정을 내리는 건 불안해요",
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
        description: "타인에게 의존하지 않고 주체적으로 결정하고 행동해요",
        type: "positive",
      },
      {
        id: "independence_pos_2",
        label: "경제적 자립",
        description: "경제적으로 건실하게 독립된 기반을 가지고 있어요",
        type: "positive",
      },
      {
        id: "independence_pos_3",
        label: "개인 시간",
        description: "때로는 각자의 시간을 가지며 서로의 독립성을 존중해요",
        type: "positive",
      },
      {
        id: "independence_pos_4",
        label: "자기 발전",
        description: "현실에 안주하지 않고 끊임없이 자기 발전을 위해 노력해요",
        type: "positive",
      },
    ],
    negativeAspects: [
      {
        id: "independence_neg_1",
        label: "과도한 의존",
        description: "사소한 결정조차 저에게 미루고 의존하는 건 부담스러워요",
        type: "negative",
      },
      {
        id: "independence_neg_2",
        label: "경제적 의존",
        description: "경제적인 부분을 전적으로 저에게 의존하는 건 곤란해요",
        type: "negative",
      },
      {
        id: "independence_neg_3",
        label: "집착",
        description: "잠시도 떨어져 있지 못하고 과도하게 집착하는 건 숨 막혀요",
        type: "negative",
      },
      {
        id: "independence_neg_4",
        label: "자기 방치",
        description: "발전 없이 현실에 안주하고 나태하게 지내는 건 싫어요",
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
        description: "제가 느끼는 감정을 깊이 이해하고 공감하려고 노력해요",
        type: "positive",
      },
      {
        id: "empathy_pos_2",
        label: "함께 느끼기",
        description: "저의 기쁨과 슬픔을 마치 자신의 일처럼 함께해줘요",
        type: "positive",
      },
      {
        id: "empathy_pos_3",
        label: "위로와 지지",
        description: "제가 지치고 힘들 때 곁에서 따뜻한 위로가 되어줘요",
        type: "positive",
      },
      {
        id: "empathy_pos_4",
        label: "입장 바꿔 생각",
        description: "자기 입장만 고집하지 않고 제 입장에서 한 번 더 생각해요",
        type: "positive",
      },
    ],
    negativeAspects: [
      {
        id: "empathy_neg_1",
        label: "감정 무시",
        description: "제 감정에 전혀 공감하지 못하고 무관심하면 외로워요",
        type: "negative",
      },
      {
        id: "empathy_neg_2",
        label: "냉담한 반응",
        description: "제가 힘들 때조차 무덤덤하고 냉정하게 반응하면 상처받아요",
        type: "negative",
      },
      {
        id: "empathy_neg_3",
        label: "공감 부족",
        description: "제가 처한 상황이나 어려움을 이해하려는 노력이 없어요",
        type: "negative",
      },
      {
        id: "empathy_neg_4",
        label: "자기 관점만",
        description: "상대방의 기분은 아랑곳않고 본인 입장만 내세우면 대화가 안 돼요",
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
        description: "센스 있는 유머로 저를 자주 웃게 만들어요",
        type: "positive",
      },
      {
        id: "humor_pos_2",
        label: "긍정적 분위기",
        description: "어색하거나 무거운 분위기를 유쾌하게 풀어줘요",
        type: "positive",
      },
      {
        id: "humor_pos_3",
        label: "재치있는 대화",
        description: "대화하는 내내 웃음이 끊이지 않고 즐거워요",
        type: "positive",
      },
      {
        id: "humor_pos_4",
        label: "자기 비하 유머",
        description: "자신을 낮춰서 남을 웃길 줄 아는 여유가 있어요",
        type: "positive",
      },
    ],
    negativeAspects: [
      {
        id: "humor_neg_1",
        label: "유머 없음",
        description: "유머 코드가 전혀 맞지 않아 함께 있어도 웃을 일이 없어요",
        type: "negative",
      },
      {
        id: "humor_neg_2",
        label: "무거운 분위기",
        description: "지나치게 진지하고 무거워서 대화가 숨 막혀요",
        type: "negative",
      },
      {
        id: "humor_neg_3",
        label: "지루한 대화",
        description: "대화가 지루하고 단조로워서 흥미를 느끼기 어려워요",
        type: "negative",
      },
      {
        id: "humor_neg_4",
        label: "상처주는 농담",
        description: "농담이랍시고 깎아내리거나 상처 주는 말을 하는 건 싫어요",
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
        description: "한번 시작한 일은 책임감을 갖고 끝까지 완수해요",
        type: "positive",
      },
      {
        id: "diligence_pos_2",
        label: "꾸준한 노력",
        description: "목표를 위해 매일 꾸준히 노력하는 모습이 멋져요",
        type: "positive",
      },
      {
        id: "diligence_pos_3",
        label: "계획 실행",
        description: "생각에만 그치지 않고 계획한 바를 행동으로 옮겨요",
        type: "positive",
      },
      {
        id: "diligence_pos_4",
        label: "자기 관리",
        description: "자신의 건강과 생활 패턴을 흐트러짐 없이 관리해요",
        type: "positive",
      },
    ],
    negativeAspects: [
      {
        id: "diligence_neg_1",
        label: "중도 포기",
        description: "일을 벌여놓기만 하고 마무리를 짓지 못하는 건 싫어요",
        type: "negative",
      },
      {
        id: "diligence_neg_2",
        label: "게으름",
        description: "발전하려는 노력 없이 게으르게 시간을 보내는 건 답답해요",
        type: "negative",
      },
      {
        id: "diligence_neg_3",
        label: "계획만 세움",
        description: "말만 앞세우고 정작 실천하지 않는 모습은 실망스러워요",
        type: "negative",
      },
      {
        id: "diligence_neg_4",
        label: "자기 방치",
        description: "자기 관리에 소홀하고 무절제한 생활을 하는 건 곤란해요",
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
        description: "어려운 상황에서도 긍정적인 면을 보고 희망을 찾아요",
        type: "positive",
      },
      {
        id: "positivity_pos_2",
        label: "감사하는 마음",
        description: "일상의 사소한 행복에도 진심으로 감사할 줄 알아요",
        type: "positive",
      },
      {
        id: "positivity_pos_3",
        label: "밝은 에너지",
        description: "밝고 긍정적인 에너지로 주변 사람들까지 기분 좋게 만들어요",
        type: "positive",
      },
      {
        id: "positivity_pos_4",
        label: "문제 해결 지향",
        description: "위기를 성장의 기회로 삼는 긍정적인 마인드를 가졌어요",
        type: "positive",
      },
    ],
    negativeAspects: [
      {
        id: "positivity_neg_1",
        label: "비관적 태도",
        description: "매사에 부정적이고 비관적인 태도는 저까지 지치게 해요",
        type: "negative",
      },
      {
        id: "positivity_neg_2",
        label: "불평불만",
        description: "입만 열면 불평불만을 늘어놓는 사람과는 함께하기 힘들어요",
        type: "negative",
      },
      {
        id: "positivity_neg_3",
        label: "부정적 에너지",
        description: "부정적인 에너지를 뿜어내어 주변 분위기를 가 쳐지게 해요",
        type: "negative",
      },
      {
        id: "positivity_neg_4",
        label: "포기 지향",
        description: "조그만 어려움에도 금방 좌절하고 쉽게 포기하면 안타까워요",
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
        description: "자신의 일을 진심으로 사랑하고 열정적으로 몰입해요",
        type: "positive",
      },
      {
        id: "passion_pos_2",
        label: "관계에 진심",
        description: "우리 관계를 소중히 여기고 최선을 다하는 게 느껴져요",
        type: "positive",
      },
      {
        id: "passion_pos_3",
        label: "목표 지향",
        description: "삶의 뚜렷한 목표가 있고 그것을 향해 나아가요",
        type: "positive",
      },
      {
        id: "passion_pos_4",
        label: "적극적 참여",
        description: "함께하는 모든 일에 적극적이고 활기차게 참여해요",
        type: "positive",
      },
    ],
    negativeAspects: [
      {
        id: "passion_neg_1",
        label: "무기력",
        description: "삶에 대한 의욕이 없고 무기력한 모습은 매력 없어요",
        type: "negative",
      },
      {
        id: "passion_neg_2",
        label: "관계에 무심",
        description: "우리 관계에 대해 무관심하고 노력을 안 하는 건 슬퍼요",
        type: "negative",
      },
      {
        id: "passion_neg_3",
        label: "목표 없음",
        description: "꿈도 목표도 없이 하루하루 흘러가는 대로 사는 건 싫어요",
        type: "negative",
      },
      {
        id: "passion_neg_4",
        label: "소극적 태도",
        description: "매사에 소극적이고 수동적인 태도는 답답해요",
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
        description: "우리의 미래를 진지하게 고민하고 함께 계획을 세워요",
        type: "positive",
      },
      {
        id: "planning_pos_2",
        label: "체계적 사고",
        description: "어떤 일이든 체계적인 순서를 정해 빈틈없이 처리해요",
        type: "positive",
      },
      {
        id: "planning_pos_3",
        label: "재정 관리",
        description: "자신의 수입과 지출을 계획적으로 꼼꼼하게 관리해요",
        type: "positive",
      },
      {
        id: "planning_pos_4",
        label: "시간 관리",
        description: "시간의 소중함을 알고 매 순간을 효율적으로 사용해요",
        type: "positive",
      },
    ],
    negativeAspects: [
      {
        id: "planning_neg_1",
        label: "무계획",
        description: "미래에 대한 진지한 고민이나 계획이 전혀 없으면 불안해요",
        type: "negative",
      },
      {
        id: "planning_neg_2",
        label: "즉흥적",
        description: "지나치게 즉흥적이고 대책 없이 행동하는 건 곤란해요",
        type: "negative",
      },
      {
        id: "planning_neg_3",
        label: "낭비",
        description: "경제관념 없이 돈을 펑펑 쓰는 낭비벽은 감당하기 힘들어요",
        type: "negative",
      },
      {
        id: "planning_neg_4",
        label: "시간 낭비",
        description: "뚜렷한 목적 없이 시간을 무의미하게 흘려보내는 건 아까워요",
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
        description: "새로운 지식이나 경험을 배우는 것을 즐기고 두려워하지 않아요",
        type: "positive",
      },
      {
        id: "intellectual_curiosity_pos_2",
        label: "깊은 대화",
        description: "서로에게 영감을 주는 깊이 있고 의미 있는 대화를 좋아해요",
        type: "positive",
      },
      {
        id: "intellectual_curiosity_pos_3",
        label: "독서/학습",
        description: "틈틈이 독서나 공부를 하며 내면을 채우는 모습이 좋아요",
        type: "positive",
      },
      {
        id: "intellectual_curiosity_pos_4",
        label: "세상에 관심",
        description: "세상의 다양한 이슈에 관심을 갖고 넓은 시야를 가졌어요",
        type: "positive",
      },
    ],
    negativeAspects: [
      {
        id: "intellectual_curiosity_neg_1",
        label: "배움 거부",
        description: "새로운 것을 배우려는 의지나 호기심이 전혀 없으면 지루해요",
        type: "negative",
      },
      {
        id: "intellectual_curiosity_neg_2",
        label: "얕은 대화",
        description: "대화의 주제가 가십거리에만 머무르고 깊이가 없으면 아쉬워요",
        type: "negative",
      },
      {
        id: "intellectual_curiosity_neg_3",
        label: "무지",
        description: "아는 것이 너무 없고 상식이 부족하면 대화하기 힘들어요",
        type: "negative",
      },
      {
        id: "intellectual_curiosity_neg_4",
        label: "세상에 무관심",
        description: "세상이 어떻게 돌아가는지 전혀 관심이 없고 무지하면 답답해요",
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
        description: "작은 배려나 선물에도 크게 감동하고 고마워해요",
        type: "positive",
      },
      {
        id: "sensitivity_pos_2",
        label: "예술 감각",
        description: "예술적인 감수성이 풍부하고 함께 즐길 줄 알아요",
        type: "positive",
      },
      {
        id: "sensitivity_pos_3",
        label: "로맨틱함",
        description: "일상 속에서 로맨틱한 순간을 만들어 저를 설레게 해요",
        type: "positive",
      },
      {
        id: "sensitivity_pos_4",
        label: "섬세한 표현",
        description: "자신의 감정을 섬세하고 아름답게 표현할 줄 알아요",
        type: "positive",
      },
    ],
    negativeAspects: [
      {
        id: "sensitivity_neg_1",
        label: "무감각",
        description: "어떤 노력에도 무덤덤하고 감동이 없으면 서운해요",
        type: "negative",
      },
      {
        id: "sensitivity_neg_2",
        label: "예술 무관심",
        description: "예술이나 아름다움에 전혀 관심이 없고 메마른 감성은 아쉬워요",
        type: "negative",
      },
      {
        id: "sensitivity_neg_3",
        label: "비로맨틱",
        description: "로맨틱한 분위기를 전혀 모르고 낭만이 없으면 재미없어요",
        type: "negative",
      },
      {
        id: "sensitivity_neg_4",
        label: "둔한 표현",
        description: "감정 표현이 너무 서툴거나 투박해서 답답할 때가 있어요",
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
        label: "일관된 태도",
        description: "언제나 한결같은 태도로 말과 행동이 일치해요",
        type: "positive",
      },
      {
        id: "stability_pos_2",
        label: "책임감",
        description: "자신이 맡은 일은 책임감을 가지고 끝까지 완수해요",
        type: "positive",
      },
      {
        id: "stability_pos_3",
        label: "믿음직함",
        description: "제가 힘들고 지칠 때 믿고 의지할 수 있는 든든한 버팀목이에요",
        type: "positive",
      },
      {
        id: "stability_pos_4",
        label: "심리적 안정",
        description: "함께 있으면 마음이 편안하고 불안하지 않게 해줘요",
        type: "positive",
      },
    ],
    negativeAspects: [
      {
        id: "stability_neg_1",
        label: "말과 행동 불일치",
        description: "말만 앞세우고 행동이 따르지 않아 신뢰가 안 가요",
        type: "negative",
      },
      {
        id: "stability_neg_2",
        label: "무책임",
        description: "중요한 일조차 대충 처리하고 책임감이 부족하면 불안해요",
        type: "negative",
      },
      {
        id: "stability_neg_3",
        label: "변덕스러움",
        description: "기분에 따라 태도가 수시로 변해서 종잡을 수 없어요",
        type: "negative",
      },
      {
        id: "stability_neg_4",
        label: "의지하기 어려움",
        description: "정작 중요한 순간에 의지할 수 없어 저를 불안하게 해요",
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
        description: "저에게 먼저 다가와 손을 내밀어 주는 적극적인 모습이 좋아요",
        type: "positive",
      },
      {
        id: "proactiveness_pos_2",
        label: "문제 해결 시도",
        description: "문제가 생기면 피하지 않고 먼저 해결하려고 나서요",
        type: "positive",
      },
      {
        id: "proactiveness_pos_3",
        label: "계획 제안",
        description: "데이트나 여행 계획을 먼저 제안하고 리드해줘요",
        type: "positive",
      },
      {
        id: "proactiveness_pos_4",
        label: "관심 표현",
        description: "저에 대한 사랑과 관심을 아낌없이 적극적으로 표현해요",
        type: "positive",
      },
    ],
    negativeAspects: [
      {
        id: "proactiveness_neg_1",
        label: "수동적",
        description: "먼저 다가오지 않고 항상 제가 먼저 하기를 기다리면 지쳐요",
        type: "negative",
      },
      {
        id: "proactiveness_neg_2",
        label: "문제 방치",
        description: "문제 앞에 나서지 않고 방관하거나 회피하는 건 싫어요",
        type: "negative",
      },
      {
        id: "proactiveness_neg_3",
        label: "계획 안 함",
        description: "만나서 뭘 할지 아무런 계획도 제안도 없으면 김빠져요",
        type: "negative",
      },
      {
        id: "proactiveness_neg_4",
        label: "관심 숨김",
        description: "좋아하는 마음을 표현하지 않고 미지근하게 굴면 헷갈려요",
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
        description: "순간적인 욕구에 휘둘리지 않고 적절히 조절할 줄 알아요",
        type: "positive",
      },
      {
        id: "self_control_pos_2",
        label: "건강한 습관",
        description: "술, 담배 등 건강을 해치는 것들을 스스로 절제해요",
        type: "positive",
      },
      {
        id: "self_control_pos_3",
        label: "소비 절제",
        description: "필요 없는 물건을 충동적으로 사지 않고 합리적으로 소비해요",
        type: "positive",
      },
      {
        id: "self_control_pos_4",
        label: "시간 절제",
        description: "게임이나 SNS에 빠지지 않고 할 일을 챙겨요",
        type: "positive",
      },
    ],
    negativeAspects: [
      {
        id: "self_control_neg_1",
        label: "욕구 불능",
        description: "본능적인 욕구를 참지 못하고 제멋대로 행동하면 곤란해요",
        type: "negative",
      },
      {
        id: "self_control_neg_2",
        label: "중독",
        description: "술이나 담배 등에 지나치게 의존하고 중독된 모습은 싫어요",
        type: "negative",
      },
      {
        id: "self_control_neg_3",
        label: "과소비",
        description: "기분에 따라 충동적으로 쇼핑하고 과소비하는 건 걱정돼요",
        type: "negative",
      },
      {
        id: "self_control_neg_4",
        label: "시간 중독",
        description: "하루 종일 게임이나 스마트폰만 들여다보고 있으면 답답해요",
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
        description: "저의 부족한 점까지도 있는 그대로 사랑하고 받아줘요",
        type: "positive",
      },
      {
        id: "acceptance_pos_2",
        label: "실수 용서",
        description: "제가 실수하더라도 비난하기보단 너그럽게 용서해줘요",
        type: "positive",
      },
      {
        id: "acceptance_pos_3",
        label: "차이 인정",
        description: "서로 다른 점을 틀린 게 아니라 다름으로 인정해줘요",
        type: "positive",
      },
      {
        id: "acceptance_pos_4",
        label: "성장 지지",
        description: "제가 더 나은 사람이 될 수 있도록 묵묵히 지지해줘요",
        type: "positive",
      },
    ],
    negativeAspects: [
      {
        id: "acceptance_neg_1",
        label: "완벽주의 강요",
        description: "저에게 항상 완벽하기를 강요하고 숨 막히게 하면 힘들어요",
        type: "negative",
      },
      {
        id: "acceptance_neg_2",
        label: "실수 비난",
        description: "작은 실수 하나도 용납하지 않고 두고두고 비난하면 괴로워요",
        type: "negative",
      },
      {
        id: "acceptance_neg_3",
        label: "차이 거부",
        description: "자신과 다른 생각이나 행동을 전혀 이해하지 못하면 대화가 안 돼요",
        type: "negative",
      },
      {
        id: "acceptance_neg_4",
        label: "변화 거부",
        description: "제가 성장하고 변하는 것을 싫어하고 현재에 머물길 원하면 답답해요",
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
