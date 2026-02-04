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
        description: "사소한 일부터 중요한 문제까지, 숨기거나 축소하지 않고 저에게 있는 그대로 투명하게 공유해주는 모습이 중요해요.",
        type: "positive",
      },
      {
        id: "honesty_pos_2",
        label: "진실된 감정 표현",
        description: "좋은 척, 괜찮은 척 꾸미지 않고 지금 느끼는 감정을 솔직하고 담백하게 표현해줄 때 신뢰가 쌓여요.",
        type: "positive",
      },
      {
        id: "honesty_pos_3",
        label: "실수 인정",
        description: "실수를 했을 때 변명으로 상황을 모면하려 하기보다, 자신의 잘못을 깨끗하게 인정하고 사과하는 용기를 보여주세요.",
        type: "positive",
      },
      {
        id: "honesty_pos_4",
        label: "약속 이행",
        description: "지키지 못할 말은 하지 않고, 한번 내뱉은 말과 약속은 어떤 상황에서도 책임감을 가지고 반드시 지켜주세요.",
        type: "positive",
      },
    ],
    negativeAspects: [
      {
        id: "honesty_neg_1",
        label: "습관적 거짓말",
        description: "아무리 사소한 것이라도 습관적으로 거짓말을 하거나 상황을 꾸며내는 모습은 정말 견디기 힘들어요.",
        type: "negative",
      },
      {
        id: "honesty_neg_2",
        label: "이중생활",
        description: "저에게 말하지 않은 비밀스러운 취미나 복잡한 이성 관계 등 감추는 것이 있다면 신뢰하기 어려워요.",
        type: "negative",
      },
      {
        id: "honesty_neg_3",
        label: "변명과 회피",
        description: "잘못을 저질렀을 때 진심으로 인정하지 않고, 이런저런 핑계를 대며 상황을 회피하려는 태도는 실망스러워요.",
        type: "negative",
      },
      {
        id: "honesty_neg_4",
        label: "약속 파기",
        description: "약속을 기분에 따라 쉽게 어기거나, '그럴 수도 있지'라며 가볍게 여기는 태도는 저를 불안하게 해요.",
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
        description: "어떤 결정을 내리기 전에, 이 일이 저에게 어떤 영향을 미칠지 먼저 헤아려주는 세심함이 필요해요.",
        type: "positive",
      },
      {
        id: "consideration_pos_2",
        label: "따뜻한 말과 행동",
        description: "다정한 말투와 저를 챙겨주는 사소한 행동들 속에서 사랑받고 있음을 느끼고 마음이 따뜻해져요.",
        type: "positive",
      },
      {
        id: "consideration_pos_3",
        label: "희생적 태도",
        description: "때로는 자신의 편의보다 저를 위해 기꺼이 양보하고 희생해주는 모습에서 깊은 감동을 받아요.",
        type: "positive",
      },
      {
        id: "consideration_pos_4",
        label: "세심한 관찰",
        description: "제가 굳이 말하지 않아도 표정이나 분위기를 보고 제 기분을 세심하게 알아차려 줄 때 고마움을 느껴요.",
        type: "positive",
      },
    ],
    negativeAspects: [
      {
        id: "consideration_neg_1",
        label: "자기중심적",
        description: "상대방의 입장보다는 본인의 기분이나 편의만을 항상 최우선으로 생각하는 이기적인 태도는 섭섭해요.",
        type: "negative",
      },
      {
        id: "consideration_neg_2",
        label: "무관심",
        description: "제가 힘든 상황인데도 무관심하게 방치하거나, 대화하려 하지 않고 귀찮아하는 모습은 상처가 돼요.",
        type: "negative",
      },
      {
        id: "consideration_neg_3",
        label: "거친 태도",
        description: "상대방을 배려하지 않는 거친 말투나 무례한 행동을 보이면, 저를 존중하지 않는다고 느껴져요.",
        type: "negative",
      },
      {
        id: "consideration_neg_4",
        label: "둔감함",
        description: "제가 불편해하거나 싫어하는 기색을 보여도 전혀 눈치채지 못하고 제멋대로 행동하면 답답해요.",
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
        description: "자신의 생각과 감정을 돌려 말하거나 숨기지 않고, 오해가 생기지 않도록 분명하게 표현하는 것이 중요해요.",
        type: "positive",
      },
      {
        id: "communication_pos_2",
        label: "경청하는 자세",
        description: "제가 이야기할 때 딴청 피우지 않고 눈을 맞추며, 끝까지 진지하게 귀 기울여 들어주는 태도를 원해요.",
        type: "positive",
      },
      {
        id: "communication_pos_3",
        label: "건설적 대화",
        description: "갈등이 생겼을 때 감정적으로 싸우기보다는, 대화를 통해 서로 이해하고 해결책을 찾으려는 노력을 보여주세요.",
        type: "positive",
      },
      {
        id: "communication_pos_4",
        label: "적절한 타이밍",
        description: "서운하거나 중요한 이야기가 있다면 마음속에 쌓아두지 않고, 적절한 때에 꺼내어 풀어가는 현명함이 필요해요.",
        type: "positive",
      },
    ],
    negativeAspects: [
      {
        id: "communication_neg_1",
        label: "말 안 하기",
        description: "중요한 사실을 저에게만 쏙 빼놓고 말해주지 않거나, 물어봐도 대답을 회피하고 넘어가려는 모습은 싫어요.",
        type: "negative",
      },
      {
        id: "communication_neg_2",
        label: "말 자르기",
        description: "제가 한창 이야기하고 있는데 말을 뚝 끊고 자기 할 말만 하거나, 건성으로 듣는 태도는 정말 불쾌해요.",
        type: "negative",
      },
      {
        id: "communication_neg_3",
        label: "회피형 대화",
        description: "조금이라도 곤란하거나 진지한 상황이 되면 입을 다물어버리거나 대화 자체를 피하려는 모습은 저를 지치게 해요.",
        type: "negative",
      },
      {
        id: "communication_neg_4",
        label: "감정적 폭발",
        description: "대화 도중에 감정을 주체하지 못하고 소리를 지르거나 물건을 던지는 등 폭발적인 모습을 보이면 두려움을 느껴요.",
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
        description: "저와 생각이 다르더라도 틀렸다고 비난하지 않고, 제 가치관과 의견을 있는 그대로 인정하고 존중해주세요.",
        type: "positive",
      },
      {
        id: "respect_pos_2",
        label: "경계 인정",
        description: "연인 사이라도 혼자만의 시간이나 공간이 필요함을 이해하고, 저만의 영역을 소중하게 지켜주는 배려가 필요해요.",
        type: "positive",
      },
      {
        id: "respect_pos_3",
        label: "평등한 관계",
        description: "나이, 지위, 성별에 상관없이 저를 항상 동등한 인격체로 대우하며, 상호 존중하는 수평적인 관계를 원해요.",
        type: "positive",
      },
      {
        id: "respect_pos_4",
        label: "인격 존중",
        description: "아무리 화가 나고 다투는 상황이라도, 제 인격을 모독하거나 상처 주는 말은 삼가고 예의를 지켜주세요.",
        type: "positive",
      },
    ],
    negativeAspects: [
      {
        id: "respect_neg_1",
        label: "무시하는 태도",
        description: "제 의견을 듣지 않고 무시하거나, '네가 뭘 알아'라는 식으로 가볍게 여기는 태도는 자존감을 떨어뜨려요.",
        type: "negative",
      },
      {
        id: "respect_neg_2",
        label: "경계 침범",
        description: "허락 없이 제 핸드폰을 보거나 개인적인 약속에 간섭하는 등 사생활을 존중하지 않고 침범하는 건 싫어요.",
        type: "negative",
      },
      {
        id: "respect_neg_3",
        label: "우월감",
        description: "은연중에 저를 본인보다 아래로 보고 가르치려 하거나, 우월감을 느끼며 통제하려는 태도는 정말 불쾌해요.",
        type: "negative",
      },
      {
        id: "respect_neg_4",
        label: "인격 모독",
        description: "화가 나면 막말을 하거나 욕설, 인신공격 등 제 인격을 깎아내리는 모욕적인 행동은 절대 참을 수 없어요.",
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
        description: "마음의 중심이 단단해서 감정 기복이 크지 않고, 언제나 한결같이 평온함을 유지하는 안정적인 사람이 좋아요.",
        type: "positive",
      },
      {
        id: "emotional_regulation_pos_2",
        label: "분노 조절",
        description: "화가 나는 상황에서도 즉각적으로 반응하기보다, 감정을 잘 다스리고 차분하게 의사를 표현할 줄 아는 성숙함이 필요해요.",
        type: "positive",
      },
      {
        id: "emotional_regulation_pos_3",
        label: "스트레스 관리",
        description: "스트레스를 받을 때 저에게 짜증을 내기보다, 운동이나 취미 등 자신만의 건강한 방법으로 해소하는 모습이 멋져 보여요.",
        type: "positive",
      },
      {
        id: "emotional_regulation_pos_4",
        label: "냉정한 판단",
        description: "감정이 격해질 수 있는 갈등 상황에서도 이성을 잃지 않고, 객관적이고 냉정하게 상황을 판단하고 대화할 수 있어야 해요.",
        type: "positive",
      },
    ],
    negativeAspects: [
      {
        id: "emotional_regulation_neg_1",
        label: "극심한 기복",
        description: "하루에도 몇 번씩 기분이 천국과 지옥을 오가는 것처럼 변덕이 심하면, 저까지 불안해지고 맞추기 힘들어요.",
        type: "negative",
      },
      {
        id: "emotional_regulation_neg_2",
        label: "폭발적 분노",
        description: "화가 나면 물불 가리지 않고 소리를 지르거나 폭력적인 모습을 보이는 등 스스로를 통제하지 못하는 모습은 정말 무서워요.",
        type: "negative",
      },
      {
        id: "emotional_regulation_neg_3",
        label: "부정적 전이",
        description: "직장이나 밖에서 받은 스트레스를 죄 없는 저에게 풀거나, 예민하게 굴며 눈치를 보게 만드는 건 정말 싫어요.",
        type: "negative",
      },
      {
        id: "emotional_regulation_neg_4",
        label: "감정적 결정",
        description: "일시적인 감정에 휩쓸려 충동적으로 이별을 말하거나 중요한 결정을 번복하는 모습은 저를 불안하게 해요.",
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
        description: "타인에게 의존하기보다 자신의 인생을 스스로 결정하고 주체적으로 이끌어가는 강단 있는 모습이 멋져요.",
        type: "positive",
      },
      {
        id: "independence_pos_2",
        label: "경제적 자립",
        description: "미래를 위해 경제적으로 건실하게 준비되어 있고, 스스로의 삶을 책임질 수 있는 자립심이 든든해요.",
        type: "positive",
      },
      {
        id: "independence_pos_3",
        label: "개인 시간",
        description: "연인 사이라도 각만의 시간과 취미가 필요함을 이해하고, 서로의 독립적인 생활을 존중해 줄 수 있어야 해요.",
        type: "positive",
      },
      {
        id: "independence_pos_4",
        label: "자기 발전",
        description: "현실에 안주하지 않고 더 나은 자신이 되기 위해 끊임없이 배우고 성장하려는 열정이 빛나 보여요.",
        type: "positive",
      },
    ],
    negativeAspects: [
      {
        id: "independence_neg_1",
        label: "과도한 의존",
        description: "사소한 결정 하나도 스스로 내리지 못하고, 모든 것을 저에게 미루며 의존하려는 모습은 부담스러워요.",
        type: "negative",
      },
      {
        id: "independence_neg_2",
        label: "경제적 의존",
        description: "경제적인 부분이나 생활 전반을 전적으로 저에게 기대려고 하면, 관계의 균형이 무너지는 것 같아 곤란해요.",
        type: "negative",
      },
      {
        id: "independence_neg_3",
        label: "집착",
        description: "잠시도 떨어져 있지 못하고 연락에 집착하거나, 저의 모든 일상을 소유하려는 태도는 숨이 막혀요.",
        type: "negative",
      },
      {
        id: "independence_neg_4",
        label: "자기 방치",
        description: "발전하려는 의욕 없이 현실에 안주하며, 계획 없이 나태하게 하루하루를 보내는 모습은 실망스러워요.",
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
        description: "제가 표현하는 감정의 깊이를 이해해주고, '그랬구나' 하며 진심으로 공감해 줄 때 마음이 편안해져요.",
        type: "positive",
      },
      {
        id: "empathy_pos_2",
        label: "함께 느끼기",
        description: "저의 기쁜 일은 자신의 일처럼 축하해주고, 슬픈 일은 함께 아파해주는 따뜻한 마음씨에 위로를 받아요.",
        type: "positive",
      },
      {
        id: "empathy_pos_3",
        label: "위로와 지지",
        description: "제가 지치고 힘들 때 섣부른 조언보다, 그저 묵묵히 곁을 지켜주며 따뜻하게 안아주는 위로를 원해요.",
        type: "positive",
      },
      {
        id: "empathy_pos_4",
        label: "입장 바꿔 생각",
        description: "자기 생각만 고집하지 않고, '네 입장에서는 그럴 수 있겠다'며 제 마음을 먼저 헤아려주는 배려가 필요해요.",
        type: "positive",
      },
    ],
    negativeAspects: [
      {
        id: "empathy_neg_1",
        label: "감정 무시",
        description: "제가 느끼는 감정을 '별거 아닌 일'로 치부하거나 전혀 공감하지 못하는 무심한 태도는 저를 외롭게 해요.",
        type: "negative",
      },
      {
        id: "empathy_neg_2",
        label: "냉담한 반응",
        description: "제가 힘들다고 말할 때조차 무덤덤하고 냉정하게 반응하거나, 귀찮아하는 기색을 보이면 큰 상처를 받아요.",
        type: "negative",
      },
      {
        id: "empathy_neg_3",
        label: "공감 부족",
        description: "제가 처한 상황이나 어려움을 이해하려는 노력 없이, 기계적인 리액션만 하는 건 진심이 느껴지지 않아요.",
        type: "negative",
      },
      {
        id: "empathy_neg_4",
        label: "자기 관점만",
        description: "상대방의 기분은 아랑곳하지 않고 오직 본인의 입장과 논리만 내세우면, 대화가 통하지 않아 답답해요.",
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
        description: "센스 있는 유머와 재치로 평범한 일상 속에서도 저를 자주 웃게 만들어주는 즐거운 사람이 좋아요.",
        type: "positive",
      },
      {
        id: "humor_pos_2",
        label: "긍정적 분위기",
        description: "다소 어색하거나 무거워질 수 있는 분위기를 특유의 유쾌함으로 부드럽게 풀어주는 능력이 매력적이에요.",
        type: "positive",
      },
      {
        id: "humor_pos_3",
        label: "재치있는 대화",
        description: "대화하는 내내 핑퐁이 잘 되고 웃음이 끊이지 않는, 함께 있으면 시간 가는 줄 모르는 사람이 이상형이에요.",
        type: "positive",
      },
      {
        id: "humor_pos_4",
        label: "자기 비하 유머",
        description: "남을 깎아내리기보다 필요할 땐 자신을 낮춰서라도 상대를 웃게 만드는 여유와 배려가 돋보여요.",
        type: "positive",
      },
    ],
    negativeAspects: [
      {
        id: "humor_neg_1",
        label: "유머 없음",
        description: "유머 코드가 전혀 맞지 않아 농담을 해도 반응이 없고, 함께 있어도 웃을 일이 별로 없으면 지루해요.",
        type: "negative",
      },
      {
        id: "humor_neg_2",
        label: "무거운 분위기",
        description: "매사에 지나치게 진지하고 심각해서, 가벼운 농담조차 받아들이지 못하고 분위기를 무겁게 만들면 숨 막혀요.",
        type: "negative",
      },
      {
        id: "humor_neg_3",
        label: "지루한 대화",
        description: "대화 주제가 너무 한정적이거나 단조로워서, 이야기를 나눠도 흥미를 느끼기 어렵고 금방 지루해져요.",
        type: "negative",
      },
      {
        id: "humor_neg_4",
        label: "상처주는 농담",
        description: "농담이랍시고 툭 던진 말이 상처가 되거나, 은근히 저를 깎아내리며 비웃는 듯한 언행은 절대 사절이에요.",
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
        description: "한번 시작한 일은 책임감을 가지고 끝까지 해내며, 맡은 역할에 최선을 다하는 듬직한 모습이 신뢰가 가요.",
        type: "positive",
      },
      {
        id: "diligence_pos_2",
        label: "꾸준한 노력",
        description: "요행을 바라기보다 목표를 이루기 위해 매일매일 꾸준하게 노력하고 땀 흘릴 줄 아는 성실함이 멋져요.",
        type: "positive",
      },
      {
        id: "diligence_pos_3",
        label: "계획 실행",
        description: "말이나 생각에만 그치지 않고, 계획한 바를 구체적인 행동으로 옮겨서 하나씩 성취해 나가는 실행력이 좋아요.",
        type: "positive",
      },
      {
        id: "diligence_pos_4",
        label: "자기 관리",
        description: "자신의 건강과 시간, 생활 패턴을 소홀히 하지 않고 규칙적으로 관리하며 단정한 삶을 사는 사람이 좋아요.",
        type: "positive",
      },
    ],
    negativeAspects: [
      {
        id: "diligence_neg_1",
        label: "중도 포기",
        description: "이것저것 벌여놓기만 하고 끈기 없이 금방 싫증을 내며, 흐지부지 마무리를 짓지 못하는 모습은 싫어요.",
        type: "negative",
      },
      {
        id: "diligence_neg_2",
        label: "게으름",
        description: "미래에 대한 준비나 발전하려는 노력 없이, 매일 게으르고 무기력하게 시간을 허비하는 모습은 답답해요.",
        type: "negative",
      },
      {
        id: "diligence_neg_3",
        label: "계획만 세움",
        description: "항상 거창한 계획만 세워놓고 정작 실천은 하지 않거나, 말만 앞세우고 행동이 따르지 않으면 실망스러워요.",
        type: "negative",
      },
      {
        id: "diligence_neg_4",
        label: "자기 방치",
        description: "자기 관리에 전혀 신경 쓰지 않고, 밤낮이 바뀌거나 불규칙하고 무절제한 생활을 반복하는 건 곤란해요.",
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
        description: "힘들고 어려운 상황이 와도 쉽게 좌절하지 않고, 긍정적인 면을 보며 희망을 찾아내는 강한 멘탈이 좋아요.",
        type: "positive",
      },
      {
        id: "positivity_pos_2",
        label: "감사하는 마음",
        description: "당연해 보이는 일상의 소소한 행복에도 진심으로 감사할 줄 알고, 표현하는 긍정적인 마음씨가 예뻐요.",
        type: "positive",
      },
      {
        id: "positivity_pos_3",
        label: "밝은 에너지",
        description: "항상 밝고 쾌활한 웃음으로 주변 사람들까지 기분 좋게 만드는 '해피 바이러스' 같은 에너지를 원해요.",
        type: "positive",
      },
      {
        id: "positivity_pos_4",
        label: "문제 해결 지향",
        description: "위기를 단순히 불행으로 여기지 않고, 더 나은 방향으로 나아갈 수 있는 성장의 기회로 삼는 태도가 훌륭해요.",
        type: "positive",
      },
    ],
    negativeAspects: [
      {
        id: "positivity_neg_1",
        label: "비관적 태도",
        description: "매사에 '안 될 거야', '힘들어'라며 부정적으로만 생각하고 비관적인 태도를 보이면 저까지 지쳐요.",
        type: "negative",
      },
      {
        id: "positivity_neg_2",
        label: "불평불만",
        description: "입만 열면 남 탓, 세상 탓을 하며 습관적으로 불평불만을 늘어놓는 사람과는 대화하고 싶지 않아요.",
        type: "negative",
      },
      {
        id: "positivity_neg_3",
        label: "부정적 에너지",
        description: "우울하고 부정적인 감정을 숨기지 않고 뿜어내어, 주변 분위기까지 축 처지게 만드는 사람은 부담스러워요.",
        type: "negative",
      },
      {
        id: "positivity_neg_4",
        label: "포기 지향",
        description: "조그만 어려움에도 '못하겠어'라며 금방 좌절하고, 도전해보기도 전에 쉽게 포기해버리는 모습은 안타까워요.",
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
        description: "자신의 일을 단순히 돈 버는 수단이 아니라, 진심으로 사랑하고 열정적으로 몰입하는 프로페셔널한 모습이 존경스러워요.",
        type: "positive",
      },
      {
        id: "passion_pos_2",
        label: "관계에 진심",
        description: "우리 관계를 소중히 여기고, 더 깊은 사랑으로 발전시키기 위해 시간과 마음을 아끼지 않고 최선을 다하는 모습이 감동적이에요.",
        type: "positive",
      },
      {
        id: "passion_pos_3",
        label: "목표 지향",
        description: "삶의 뚜렷한 목표와 꿈이 있고, 그것을 이루기 위해 구체적인 계획을 세우며 적극적으로 나아가는 모습이 멋져요.",
        type: "positive",
      },
      {
        id: "passion_pos_4",
        label: "적극적 참여",
        description: "데이트를 하거나 함께 시간을 보낼 때, 수동적으로 따라오기보다 적극적이고 활기차게 참여하며 분위기를 주도하는 에너지가 좋아요.",
        type: "positive",
      },
    ],
    negativeAspects: [
      {
        id: "passion_neg_1",
        label: "무기력",
        description: "삶에 대한 의욕이나 목표 없이 하루하루를 무기력하게 흘려보내며, 아무것도 하고 싶어 하지 않는 모습은 매력 없어요.",
        type: "negative",
      },
      {
        id: "passion_neg_2",
        label: "관계에 무심",
        description: "우리 관계에 대해 아무런 열정이나 노력을 보이지 않고, \"알아서 되겠지\"라며 무관심하게 방치하는 태도는 슬퍼요.",
        type: "negative",
      },
      {
        id: "passion_neg_3",
        label: "목표 없음",
        description: "미래에 대한 꿈이나 목표 없이 현실에만 안주하며, 발전하려는 의지가 전혀 보이지 않으면 함께 성장하기 어려워요.",
        type: "negative",
      },
      {
        id: "passion_neg_4",
        label: "소극적 태도",
        description: "매사에 소극적으로 뒤로 물러나 있거나, 제가 하자고 하는 대로만 끌려오는 수동적인 태도는 답답하게 느껴져요.",
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
        description: "우리의 미래를 막연하게 생각하지 않고, 진지하게 고민하며 함께 구체적인 계획을 세우는 든든한 모습이 좋아요.",
        type: "positive",
      },
      {
        id: "planning_pos_2",
        label: "체계적 사고",
        description: "어떤 일이든 주먹구구식이 아니라 체계적인 순서를 정해 빈틈없이 처리하며, 실수를 줄이려는 꼼꼼함이 신뢰가 가요.",
        type: "positive",
      },
      {
        id: "planning_pos_3",
        label: "재정 관리",
        description: "자신의 수입과 지출을 명확하게 파악하고, 불필요한 낭비 없이 계획적으로 재정 관리를 하는 경제 관념이 중요해요.",
        type: "positive",
      },
      {
        id: "planning_pos_4",
        label: "시간 관리",
        description: "약속 시간은 물론이고 자신에게 주어진 시간을 소중히 여기며, 매 순간을 헛되이 쓰지 않고 효율적으로 사용하는 사람이 멋져요.",
        type: "positive",
      },
    ],
    negativeAspects: [
      {
        id: "planning_neg_1",
        label: "무계획",
        description: "미래에 대한 진지한 고민이나 계획이 전혀 없이 '어떻게든 되겠지'라는 태도로 일관하면 불안해서 견딜 수 없어요.",
        type: "negative",
      },
      {
        id: "planning_neg_2",
        label: "즉흥적",
        description: "매번 계획 없이 기분에 따라 즉흥적으로 행동하거나, 대책 없이 일을 벌여서 수습하지 못하는 건 곤란해요.",
        type: "negative",
      },
      {
        id: "planning_neg_3",
        label: "낭비",
        description: "자신의 재정 상태를 고려하지 않고 돈을 펑펑 쓰거나, 충동구매를 반복하는 등 경제 관념이 부족한 모습은 감당하기 힘들어요.",
        type: "negative",
      },
      {
        id: "planning_neg_4",
        label: "시간 낭비",
        description: "뚜렷한 목적 없이 멍하니 시간을 보내거나, 약속 시간을 매번 어기며 타인의 시간까지 낭비하게 만드는 행동은 아까워요.",
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
        description: "새로운 지식이나 경험을 배우는 것을 두려워하지 않고, 모르는 것이 있으면 겸손하게 배우려는 열린 자세가 존경스러워요.",
        type: "positive",
      },
      {
        id: "intellectual_curiosity_pos_2",
        label: "깊은 대화",
        description: "일상적인 가벼운 이야기뿐만 아니라, 서로의 가치관이나 생각에 대해 영감을 주고받을 수 있는 깊이 있는 대화를 좋아해요.",
        type: "positive",
      },
      {
        id: "intellectual_curiosity_pos_3",
        label: "독서/학습",
        description: "바쁜 와중에도 틈틈이 책을 읽거나 새로운 분야를 공부하며, 끊임없이 자신의 내면을 채우고 성장하는 모습이 멋져요.",
        type: "positive",
      },
      {
        id: "intellectual_curiosity_pos_4",
        label: "세상에 관심",
        description: "나만의 세계에 갇히지 않고, 사회 문제나 세상의 다양한 이슈에 관심을 가지며 넓은 시야로 세상을 바라보는 태도가 중요해요.",
        type: "positive",
      },
    ],
    negativeAspects: [
      {
        id: "intellectual_curiosity_neg_1",
        label: "배움 거부",
        description: "새로운 것을 배우려는 의지가 전혀 없거나, '몰라도 사는데 지장 없어'라며 호기심을 닫아버린 모습은 지루하게 느껴져요.",
        type: "negative",
      },
      {
        id: "intellectual_curiosity_neg_2",
        label: "얕은 대화",
        description: "대화의 주제가 연예 가십이나 신변잡기에만 머무르고, 조금만 깊은 이야기를 하려 하면 지루해하는 태도는 아쉬워요.",
        type: "negative",
      },
      {
        id: "intellectual_curiosity_neg_3",
        label: "무지",
        description: "기본적인 상식이 너무 부족해서 대화가 통하지 않거나, 알려고 노력조차 하지 않는 무지한 태도는 대화하기 힘들어요.",
        type: "negative",
      },
      {
        id: "intellectual_curiosity_neg_4",
        label: "세상에 무관심",
        description: "세상이 어떻게 돌아가는지 전혀 관심이 없고, 뉴스나 사회 이슈에 대해 너무 무지하면 답답함을 느껴요.",
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
        description: "제가 건넨 작은 배려나 선물에도 '고마워'라고 진심으로 표현하며, 크게 감동할 줄 아는 순수한 마음이 예뻐요.",
        type: "positive",
      },
      {
        id: "sensitivity_pos_2",
        label: "예술 감각",
        description: "음악, 미술, 영화 등 예술적인 아름다움을 느끼는 감수성이 풍부하고, 그 감동을 함께 나눌 줄 아는 사람이 좋아요.",
        type: "positive",
      },
      {
        id: "sensitivity_pos_3",
        label: "로맨틱함",
        description: "반복적인 일상 속에서도 낭만적인 분위기를 만들거나, 뜻밖의 이벤트로 저를 설레게 하는 로맨틱한 센스가 있어요.",
        type: "positive",
      },
      {
        id: "sensitivity_pos_4",
        label: "섬세한 표현",
        description: "투박한 말보다는 자신의 감정을 섬세하고 아름다운 언어로 표현할 줄 알며, 제 마음을 어루만져 주는 능력이 탁월해요.",
        type: "positive",
      },
    ],
    negativeAspects: [
      {
        id: "sensitivity_neg_1",
        label: "무감각",
        description: "제가 정성껏 준비한 노력에도 별 반응 없이 무덤덤하거나, 고마움을 표현할 줄 모르는 무뚝뚝함은 정말 서운해요.",
        type: "negative",
      },
      {
        id: "sensitivity_neg_2",
        label: "예술 무관심",
        description: "아름다운 풍경이나 예술 작품을 봐도 아무런 감흥을 느끼지 못하고, 감성이 메말라 있다면 함께 즐기기 아쉬워요.",
        type: "negative",
      },
      {
        id: "sensitivity_neg_3",
        label: "비로맨틱",
        description: "기념일조차 챙기지 않거나 로맨틱한 분위기를 전혀 이해하지 못하고, 오직 현실적으로만 따지는 건 낭만이 없어요.",
        type: "negative",
      },
      {
        id: "sensitivity_neg_4",
        label: "둔한 표현",
        description: "좋으면 좋다, 싫으면 싫다 표현을 해야 하는데, 감정 표현이 너무 서툴거나 투박해서 답답할 때가 많아요.",
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
        description: "기분에 따라 휘둘리지 않고, 언제나 한결같은 태도로 말과 행동이 일치하여 믿을 수 있는 사람이 좋아요.",
        type: "positive",
      },
      {
        id: "stability_pos_2",
        label: "책임감",
        description: "연애뿐만 아니라 자신의 삶과 일에 대해서도 깊은 책임감을 느끼고, 맡은 바를 끝까지 완수하는 모습이 든든해요.",
        type: "positive",
      },
      {
        id: "stability_pos_3",
        label: "믿음직함",
        description: "제가 힘들고 지칠 때 언제든 기댈 수 있는 든든한 버팀목이 되어주며, 묵묵히 곁을 지켜주는 믿음직함이 매력적이에요.",
        type: "positive",
      },
      {
        id: "stability_pos_4",
        label: "심리적 안정",
        description: "불안해하거나 초조해하지 않고, 함께 있으면 마음이 차분하고 편안해지는 안정감을 주는 사람이 이상형이에요.",
        type: "positive",
      },
    ],
    negativeAspects: [
      {
        id: "stability_neg_1",
        label: "말과 행동 불일치",
        description: "앞에서는 번지르르하게 말하고 뒤에서는 행동이 따르지 않는, 겉과 속이 다른 모습은 신뢰를 무너뜨려요.",
        type: "negative",
      },
      {
        id: "stability_neg_2",
        label: "무책임",
        description: "중요한 약속이나 일조차 대충 처리하고, 문제가 생기면 나 몰라라 하는 무책임한 태도는 정말 불안해요.",
        type: "negative",
      },
      {
        id: "stability_neg_3",
        label: "변덕스러움",
        description: "하루에도 수십 번씩 기분이 바뀌고 예측할 수 없는 행동을 해서, 저까지 눈치 보게 만드는 변덕스러움은 힘들어요.",
        type: "negative",
      },
      {
        id: "stability_neg_4",
        label: "의지하기 어려움",
        description: "제가 정말 힘들어서 도움이 필요할 때조차 의지할 수 없고, 오히려 저에게 기대려고만 하면 실망스러워요.",
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
        description: "제가 망설이고 있을 때 먼저 다가와 손 내밀어 주고, 관계를 리드해주는 적극적인 모습에 설렘을 느껴요.",
        type: "positive",
      },
      {
        id: "proactiveness_pos_2",
        label: "문제 해결 시도",
        description: "갈등이나 문제가 생겼을 때 뒤로 물러서지 않고, 먼저 대화를 시도하고 해결하려는 용기 있는 태도가 멋져요.",
        type: "positive",
      },
      {
        id: "proactiveness_pos_3",
        label: "계획 제안",
        description: "매번 \"뭐 할까?\" 묻기보다 데이트나 여행 계획을 먼저 찾아보고 제안해주는 센스 있는 모습이 좋아요.",
        type: "positive",
      },
      {
        id: "proactiveness_pos_4",
        label: "관심 표현",
        description: "사랑한다는 말이나 애정 표현을 아끼지 않고, 저에 대한 관심을 적극적으로 표현해 줄 때 사랑받고 있음을 느껴요.",
        type: "positive",
      },
    ],
    negativeAspects: [
      {
        id: "proactiveness_neg_1",
        label: "수동적",
        description: "먼저 연락하거나 데이트 신청을 하는 법이 없고, 항상 제가 먼저 움직이기를 기다리는 수동적인 태도는 지쳐요.",
        type: "negative",
      },
      {
        id: "proactiveness_neg_2",
        label: "문제 방치",
        description: "문제가 터져도 \"어떻게 되겠지\"라며 방관하거나 회피하고, 저 혼자 해결하게 만드는 건 무책임해 보여요.",
        type: "negative",
      },
      {
        id: "proactiveness_neg_3",
        label: "계획 안 함",
        description: "만나서도 \"아무거나\"만 반복하고, 아무런 계획이나 생각 없이 저에게 모든 결정을 미루면 김이 빠져요.",
        type: "negative",
      },
      {
        id: "proactiveness_neg_4",
        label: "관심 숨김",
        description: "좋아하는 마음을 표현하지 않고 자존심을 세우거나, 밀당하느라 미지근하게 굴면 진심을 알 수 없어 헷갈려요.",
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
        description: "순간적인 욕구나 충동에 휘둘리지 않고, 이성적으로 생각하며 적절히 조절할 줄 아는 성숙한 모습이 필요해요.",
        type: "positive",
      },
      {
        id: "self_control_pos_2",
        label: "건강한 습관",
        description: "술, 담배, 도박 등 건강이나 관계를 해치는 중독적인 것들을 멀리하고, 스스로 절제하는 건강한 습관을 가졌어요.",
        type: "positive",
      },
      {
        id: "self_control_pos_3",
        label: "소비 절제",
        description: "기분에 휩쓸려 충동구매를 하지 않고, 꼭 필요한 물건인지 한 번 더 생각하며 합리적으로 소비할 줄 알아요.",
        type: "positive",
      },
      {
        id: "self_control_pos_4",
        label: "시간 절제",
        description: "해야 할 일을 미루고 게임이나 SNS에 빠져 살기보다, 우선순위를 정해 자기 할 일을 챙기는 부지런함이 좋아요.",
        type: "positive",
      },
    ],
    negativeAspects: [
      {
        id: "self_control_neg_1",
        label: "욕구 불능",
        description: "식욕, 성욕 등 본능적인 욕구를 참지 못하고 그때그때 기분 내키는 대로 행동하면 신뢰하기 어려워요.",
        type: "negative",
      },
      {
        id: "self_control_neg_2",
        label: "중독",
        description: "술을 마시면 통제가 안 되거나 담배, 도박 등에 지나치게 의존하는 중독된 모습은 정말 받아주기 힘들어요.",
        type: "negative",
      },
      {
        id: "self_control_neg_3",
        label: "과소비",
        description: "수입에 비해 과도하게 명품을 밝히거나 스트레스를 쇼핑으로 푸는 등 절제 없는 소비 습관은 걱정돼요.",
        type: "negative",
      },
      {
        id: "self_control_neg_4",
        label: "시간 중독",
        description: "하루 종일 스마트폰 게임이나 영상만 들여다보며 시간을 허비하고, 정작 중요한 일은 뒷전인 모습은 한심해 보여요.",
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
        description: "저의 완벽하지 않은 모습이나 단점까지도 비난하지 않고, 있는 그대로 사랑하고 받아주는 넓은 마음이 필요해요.",
        type: "positive",
      },
      {
        id: "acceptance_pos_2",
        label: "실수 용서",
        description: "제가 실수를 하더라도 다그치거나 비난하기보다, \"누구나 그럴 수 있어\"라며 너그럽게 용서해 줄 때 감동받아요.",
        type: "positive",
      },
      {
        id: "acceptance_pos_3",
        label: "차이 인정",
        description: "서로 생각이나 취향이 다를 때, 틀렸다고 지적하기보다 '우리는 서로 다르구나'라고 쿨하게 인정해주는 태도가 좋아요.",
        type: "positive",
      },
      {
        id: "acceptance_pos_4",
        label: "성장 지지",
        description: "제가 지금의 모습에 안주하지 않고 더 나은 사람이 될 수 있도록, 옆에서 묵묵히 믿고 지지해주는 든든한 지원군이에요.",
        type: "positive",
      },
    ],
    negativeAspects: [
      {
        id: "acceptance_neg_1",
        label: "완벽주의 강요",
        description: "저에게 항상 완벽한 모습만을 기대하고 강요하며, 조금만 흐트러져도 실망하는 기색을 보이면 숨이 막혀요.",
        type: "negative",
      },
      {
        id: "acceptance_neg_2",
        label: "실수 비난",
        description: "이미 지난 작은 실수 하나도 용납하지 않고, 말끝마다 들추어내며 비난하고 몰아세우면 괴로워서 견딜 수 없어요.",
        type: "negative",
      },
      {
        id: "acceptance_neg_3",
        label: "차이 거부",
        description: "자신과 조금만 다른 생각이나 행동을 하면 도저히 이해하지 못하겠다는 듯이 반응하고, 본인 방식을 강요하면 대화가 안 돼요.",
        type: "negative",
      },
      {
        id: "acceptance_neg_4",
        label: "변화 거부",
        description: "제가 새로운 것을 시도하거나 변화하려고 할 때 응원해주지는 못할망정, '그냥 살던 대로 살아'라며 깎아내리면 답답해요.",
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
