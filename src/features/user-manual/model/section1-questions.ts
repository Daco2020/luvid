import { Question } from "./section1-schema";

export const section1Questions: Question[] = [
  // Part 1: 기준점 및 에너지 (Operating Environment)
  {
    id: 1,
    scenario: "당신이 가장 '나다운' 상태로 충전되는 순간은 언제인가요?\n ",
    question: "나의 에너지가 차오르는 순간은?",
    choices: [
      {
        id: "A",
        text: "혼자 조용한 공간에서 쉴 때",
        description: "아무 방해 없이 혼자만의 시간이 필요해요",
        pattern: "solitude",
      },
      {
        id: "B",
        text: "친한 친구 1-2명과 깊은 대화를 할 때",
        description: "소수의 편안한 사람과 있을 때 힘이 나요",
        pattern: "intimacy",
      },
      {
        id: "C",
        text: "밖에서 사람들과 어울리고 활동할 때",
        description: "새로운 사람과 활기찬 분위기가 좋아요",
        pattern: "social",
      },
      {
        id: "D",
        text: "좋아하는 취미나 몰입할 거리가 있을 때",
        description: "무언가에 푹 빠져서 성취감을 느낄 때",
        pattern: "activity",
      },
    ],
    measureTarget: "energy_source",
  },
  {
    id: 2,
    scenario: "중요한 대화를 하기에 가장 좋은, 당신의 '골든 타임'은?\n ",
    question: "가장 마음이 여유로운 시간대는?",
    choices: [
      {
        id: "A",
        text: "머리가 맑은 '오전 시간'",
        description: "일어나서 하루를 시작할 때가 가장 좋아요",
        pattern: "morning",
      },
      {
        id: "B",
        text: "일과를 마친 '저녁 시간'",
        description: "모든 일을 끝내고 긴장이 풀렸을 때",
        pattern: "evening",
      },
      {
        id: "C",
        text: "배부르고 여유로운 '식사 후'",
        description: "맛있는 걸 먹고 기분이 좋아졌을 때",
        pattern: "after_meal",
      },
      {
        id: "D",
        text: "주말이나 휴일 같은 '쉬는 날'",
        description: "시간에 쫓기지 않을 때 비로소 여유가 생겨요",
        pattern: "weekend",
      },
    ],
    measureTarget: "optimal_time",
  },

  // Part 2: 경고 신호 및 트리거 (Triggers & Warning Signs)
  {
    id: 3,
    scenario: "데이트 중, 당신의 기분을 순식간에 망치는 것은?\n ",
    question: "나를 가장 예민하게 만드는 것은?",
    choices: [
      {
        id: "A",
        text: "시끄러운 소음이나 복잡한 인파",
        description: "너무 시끄럽거나 정신없는 곳은 딱 질색이에요",
        pattern: "sensory_overload",
      },
      {
        id: "B",
        text: "배고픔이나 더위/추위",
        description: "몸이 힘들면 기분도 급격히 나빠져요",
        pattern: "physical_discomfort",
      },
      {
        id: "C",
        text: "계획이 틀어지거나 갑자기 변동될 때",
        description: "예상치 못한 상황이 닥치면 당황스러워요",
        pattern: "loss_of_control",
      },
      {
        id: "D",
        text: "상대방이 핸드폰만 볼 때",
        description: "내 말에 집중하지 않는 태도는 못 참아요",
        pattern: "feeling_neglected",
      },
    ],
    measureTarget: "external_trigger",
  },
  {
    id: 4,
    scenario: "스트레스를 받기 시작하면, 겉으로 드러나는 당신의 첫 반응은?\n ",
    question: "기분이 안 좋을 때 나의 모습은?",
    choices: [
      {
        id: "A",
        text: "말이 없어지고 표정이 굳는다",
        description: "일단 입을 닫고 생각할 시간이 필요해요",
        pattern: "shutdown",
      },
      {
        id: "B",
        text: "목소리가 커지거나 말이 빨라진다",
        description: "나도 모르게 흥분해서 말이 많아져요",
        pattern: "mobilization",
      },
      {
        id: "C",
        text: "한숨을 쉬거나 안절부절못한다",
        description: "불안한 마음이 행동으로 드러나요",
        pattern: "anxiety",
      },
      {
        id: "D",
        text: "냉소적이거나 비꼬는 말투가 나온다",
        description: "상처받지 않으려고 가시 돋친 말을 해요",
        pattern: "defensiveness",
      },
    ],
    measureTarget: "warning_sign",
  },

  // Part 3: 반응 패턴 (Fight, Flight, Freeze)
  {
    id: 5,
    scenario: "어제 데이트 후 \"즐거웠어\"라고 보냈는데, \n하루가 지나도 답장이 없습니다.",
    question: "이때 당신의 솔직한 심정은?",
    choices: [
      {
        id: "A",
        text: "\"바쁘겠지\" 하고 내 할 일 한다",
        description: "별일 없을 거라고 믿고 신경 끄는 편이에요",
        pattern: "secure",
      },
      {
        id: "B",
        text: "\"내가 뭐 실수했나?\" 계속 확인한다",
        description: "혹시 나 때문에 기분이 상한 건 아닌지 걱정돼요",
        pattern: "anxious",
      },
      {
        id: "C",
        text: "\"답장 안 하면 나도 안 해\" 하고 지운다",
        description: "자존심 상해서 더 이상 연락하고 싶지 않아요",
        pattern: "avoidant",
      },
      {
        id: "D",
        text: "\"왜 답장이 없어?\"라고 바로 물어본다",
        description: "답답한 건 못 참아서 이유를 들어야 해요",
        pattern: "protest",
      },
    ],
    measureTarget: "uncertainty_response",
  },
  {
    id: 6,
    scenario: "연인과 말다툼 중, 감정이 주체할 수 없이 격해졌습니다. \n이때 당신의 충동은?",
    question: "너무 화가 났을 때 하고 싶은 행동은?",
    choices: [
      {
        id: "A",
        text: "상대방을 이기기 위해 논리적으로 따진다",
        description: "누가 옳고 그른지 끝까지 따져야 해요",
        pattern: "fight",
      },
      {
        id: "B",
        text: "화를 참지 못하고 소리를 지르고 싶다",
        description: "감정을 쏟아내야 속이 시원할 것 같아요",
        pattern: "explosion",
      },
      {
        id: "C",
        text: "\"그만해!\"라고 외치고 나가고 싶다",
        description: "이 상황에서 빨리 벗어나고 싶어요",
        pattern: "flight",
      },
      {
        id: "D",
        text: "눈물이 터져서 아무 말도 못 한다",
        description: "너무 억울하고 슬퍼서 말문이 막혀요",
        pattern: "flood",
      },
    ],
    measureTarget: "hyperarousal_response",
  },
  {
    id: 7,
    scenario: "너무 지치고 힘들어서 에너지가 바닥났을 때, \n당신의 모습은?",
    question: "완전히 지쳤을 때 나는?",
    choices: [
      {
        id: "A",
        text: "아무것도 안 하고 하루 종일 누워만 있는다",
        description: "손가락 하나 까딱할 힘도 없어요",
        pattern: "freeze",
      },
      {
        id: "B",
        text: "누가 말 거는 것조차 귀찮다",
        description: "그냥 아무도 없는 곳에 숨고 싶어요",
        pattern: "withdrawal",
      },
      {
        id: "C",
        text: "멍하니 있거나 현실감이 없어진다",
        description: "머릿속이 하얘지고 멍해져요",
        pattern: "dissociation",
      },
      {
        id: "D",
        text: "무조건적인 지지와 응원만 받고 싶다",
        description: "어린아이처럼 징징대고 싶을 때가 있어요",
        pattern: "regression",
      },
    ],
    measureTarget: "hypoarousal_response",
  },

  // Part 4: 회복 매뉴얼 (Regulation & Recovery)
  {
    id: 8,
    scenario: "격해진 감정을 스스로 진정시키는 가장 효과적인 방법은?\n ",
    question: "스스로 마음을 다스리는 방법은?",
    choices: [
      {
        id: "A",
        text: "혼자만의 시간을 가지며 동굴로 들어간다",
        description: "잠시 떨어져서 감정을 가라앉힐 시간이 필요해요",
        pattern: "space",
      },
      {
        id: "B",
        text: "심호흡을 하거나 찬물로 세수한다",
        description: "몸을 움직여서 분위기를 환기해요",
        pattern: "physiological",
      },
      {
        id: "C",
        text: "맛있는 걸 먹거나 좋아하는 영상을 본다",
        description: "다른 즐거운 일로 관심을 돌려요",
        pattern: "sensory",
      },
      {
        id: "D",
        text: "감정을 글로 쓰거나 친구에게 털어놓는다",
        description: "누군가에게 털어놓아야 마음이 풀려요",
        pattern: "expression",
      },
    ],
    measureTarget: "self_regulation",
  },
  {
    id: 9,
    scenario: "당신이 힘들 때, 연인이 해주길 바라는 '최고의 위로'는?\n ",
    question: "연인에게 바라는 위로 방식은?",
    choices: [
      {
        id: "A",
        text: "\"무슨 일이야?\" 하고 끝까지 들어주기",
        description: "해결책보다는 내 편이 되어 들어주길 바라요",
        pattern: "listening",
      },
      {
        id: "B",
        text: "아무 말 없이 꽉 안아주기",
        description: "따뜻한 스킨십이 말보다 큰 위로가 돼요",
        pattern: "physical_touch",
      },
      {
        id: "C",
        text: "\"내가 해결해줄게\" 하고 문제 처리해주기",
        description: "실질적으로 도움을 줄 때 사랑을 느껴요",
        pattern: "act_of_service",
      },
      {
        id: "D",
        text: "\"잠시 혼자 쉴래?\" 하고 배려해주기",
        description: "혼자 정리할 시간을 주는 게 가장 고마워요",
        pattern: "respecting_space",
      },
    ],
    measureTarget: "co_regulation",
  },
  {
    id: 10,
    scenario: "당신이 기분이 안 좋을 때, 연인이 안했으면 하는 것은?\n ",
    question: "이것만은 제발 하지 말아줘!",
    choices: [
      {
        id: "A",
        text: "\"왜 그래?\" 하고 계속 이유 캐묻기",
        description: "말하고 싶지 않은데 억지로 물어보면 더 화나요",
        pattern: "intrusion",
      },
      {
        id: "B",
        text: "\"별거 아니네\" 하고 내 감정 축소하기",
        description: "내 힘든 마음을 별거 아닌 일로 취급하지 마세요",
        pattern: "dismissal",
      },
      {
        id: "C",
        text: "\"나랑 놀래?\" 하고 분위기 띄우려 하기",
        description: "지금 당장 기분을 억지로 바꿀 순 없어요",
        pattern: "invalidation",
      },
      {
        id: "D",
        text: "논리적으로 따지거나 조언하기",
        description: "지금은 옳고 그름을 따지기보다 공감이 필요해요",
        pattern: "lecturing",
      },
    ],
    measureTarget: "do_not_disturb",
  },
];
