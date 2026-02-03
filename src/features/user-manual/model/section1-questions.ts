import { Question } from "./section1-schema";

export const section1Questions: Question[] = [
  // =================================================================================
  // Part 1: 기저 상태 및 민감도 (Baseline & Sensitivity)
  // 목표: 나의 '운영 체제(OS)'가 어디에 기반을 두고 있는지 파악 (4 Types)
  // Consolidated Keys: 'independent', 'relational', 'physical', 'emotional'
  // =================================================================================
  {
    id: 1,
    scenario: "당신을 가장 '나다운' 상태로 만드는 순간은?\n ",
    question: "나의 에너지가 차오르는 순간은?",
    choices: [
      {
        id: "A",
        text: "혼자 조용한 공간에서 쉴 때",
        description: "아무 방해 없이 혼자만의 시간이 필요해요",
        pattern: "independent", // [근거] 고독 및 자율성 (Solitude)
      },
      {
        id: "B",
        text: "친한 친구 1-2명과 깊은 대화를 할 때",
        description: "소수의 편안한 사람과 있을 때 힘이 나요",
        pattern: "emotional", // [근거] 정서적 유대감 및 깊이 (Intimacy)
      },
      {
        id: "C",
        text: "밖에서 사람들과 어울리고 활동할 때",
        description: "새로운 사람과 활기찬 분위기가 좋아요",
        pattern: "relational", // [근거] 사회적 상호작용 및 폭넓은 관계 (Social)
      },
      {
        id: "D",
        text: "몸을 움직이거나 땀 흘리고 났을 때",
        description: "신체적 활동을 통해 활력을 얻어요",
        pattern: "physical", // [근거] 신체 활동 및 감각 자극 (Activity)
      },
    ],
    measureTarget: "energy_source",
  },
  {
    id: 2,
    scenario: "당신의 하루 중, 가장 좋아하는 '골든 타임'은?\n ",
    question: "가장 마음이 여유로운 시간대는?",
    choices: [
      {
        id: "A",
        text: "머리가 맑은 '오전 시간'",
        description: "혼자 깨어있는 오전이 가장 편해요",
        pattern: "independent", // [근거] 방해받지 않는 명료한 시간 (Morning -> Independent/Clarity)
      },
      {
        id: "B",
        text: "감성이 풍부해지는 '늦은 밤'",
        description: "밤에 긴장이 풀리고 감성이 풍부해져요",
        pattern: "emotional", // [근거] 정서적 이완 및 무드 (Night -> Emotional)
      },
      {
        id: "C",
        text: "배부르고 여유로운 '식사 후'",
        description: "밥을 배부르게 먹고나면 기분이 좋아요",
        pattern: "physical", // [근거] 신체적 포만감 (Satiety -> Physical)
      },
      {
        id: "D",
        text: "친구들과 만나는 '저녁/주말'",
        description: "친한 사람들과 어울릴 때 활력이 넘쳐요",
        pattern: "relational", // [근거] 사회적 교류 시간 (Social Time -> Relational)
      },
    ],
    measureTarget: "optimal_time",
  },
  {
    id: 3,
    scenario: "다음 중 당신을 기분을 순식간에 망치는 것은?\n ",
    question: "나를 가장 예민하게 만드는 것은?",
    choices: [
      {
        id: "A",
        text: "계획이 틀어지거나 갑자기 변동될 때",
        description: "상황을 통제할 수 없으면 불안해져요",
        pattern: "independent", // [근거] 통제감 상실 및 예측 불가능성 (Control -> Independent)
      },
      {
        id: "B",
        text: "시끄러운 소음이나 불편한 주변 환경",
        description: "감각적으로 압도되는 상황이 힘들어요",
        pattern: "emotional", // [근거] 정서적/감각적 예민함 (Sensitive -> Emotional)
      },
      {
        id: "C",
        text: "상대방의 무관심한 태도",
        description: "내 존재가 무시당하는 기분이 들어요",
        pattern: "relational", // [근거] 관계적 거부 (Rejection -> Relational)
      },
      {
        id: "D",
        text: "배고픔, 더위, 피곤함 등",
        description: "몸이 힘들면 기분도 급격히 나빠져요",
        pattern: "physical", // [근거] 생리적 불쾌감 (Physiological -> Physical)
      },
    ],
    measureTarget: "external_trigger",
  },

  // =================================================================================
  // Part 2: 스트레스 반응 (Stress Response - Polyvagal States)
  // Consolidated Keys: 'fight', 'flight', 'freeze', 'anxious', 'secure'
  // (No changes to keys here, but ensuring choices are consistent with previous updates)
  // =================================================================================
  {
    id: 4,
    scenario: "스트레스를 받기 시작하면, 겉으로 드러나는 당신의 첫 반응은?\n ",
    question: "기분이 안 좋을 때 나의 모습은?",
    choices: [
      {
        id: "A",
        text: "말이 없어지고 표정이 굳는다",
        description: "일단 입을 닫고 생각할 시간이 필요해요",
        pattern: "freeze",
      },
      {
        id: "B",
        text: "짜증이 늘고 말투가 날카로워진다",
        description: "나도 모르게 예민하게 반응해요",
        pattern: "fight",
      },
      {
        id: "C",
        text: "안절부절못하고 한숨을 쉰다",
        description: "불안한 마음이 행동으로 드러나요",
        pattern: "anxious",
      },
      {
        id: "D",
        text: "자리를 피하거나 딴청을 피운다",
        description: "일단 지금 상황을 넘기고 싶어져요",
        pattern: "flight",
      },
    ],
    measureTarget: "warning_sign",
  },
  {
    id: 5,
    scenario: "썸타는 상대와 연락이 잘 안될 때, 당신의 반응은?\n ",
    question: "당신의 솔직한 심정은?",
    choices: [
      {
        id: "A",
        text: "\"관심 끄자\" 하고 내 할 일 한다",
        description: "신경 쓰기 싫어서 관심을 끄는 편이에요",
        pattern: "flight",
      },
      {
        id: "B",
        text: "\"내가 뭐 실수했나?\" 계속 확인한다",
        description: "혹시 나 때문에 기분이 상한 건 아닌지 걱정돼요",
        pattern: "anxious",
      },
      {
        id: "C",
        text: "지난 연락을 되짚어보며 원인을 분석한다",
        description: "현재 상황을 파악하기 위해 원인을 분석해요",
        pattern: "freeze",
      },
      {
        id: "D",
        text: "\"왜 답장이 없어?\"라고 바로 물어본다",
        description: "답답한 건 못 참아서 이유를 들어야 해요",
        pattern: "fight",
      },
    ],
    measureTarget: "uncertainty_response",
  },
  {
    id: 6,
    scenario: "연인과 말다툼 중, 감정이 주체할 수 없이 격해졌습니다.\n이때 당신의 충동은?",
    question: "너무 화가 났을 때 하게 되는 행동은?",
    choices: [
      {
        id: "A",
        text: "끝까지 논리적으로 따져서 이겨야 한다",
        description: "누가 옳은지 결판을 내야 직성이 풀려요",
        pattern: "fight",
      },
      {
        id: "B",
        text: "아무 생각도 안 나고 머릿속이 하얘진다",
        description: "너무 당황해서 얼어붙어 버려요",
        pattern: "freeze",
      },
      {
        id: "C",
        text: "그 자리를 박차고 나가버린다",
        description: "일단 이 숨 막히는 상황에서 벗어나고 싶어요",
        pattern: "flight",
      },
      {
        id: "D",
        text: "너무 억울하고 분해서 눈물만 난다",
        description: "감정이 북받쳐 올라서 눈물이 나요",
        pattern: "anxious",
      },
    ],
    measureTarget: "hyperarousal_response",
  },
  {
    id: 7,
    scenario: "에너지가 완전히 고갈되어 번아웃이 왔을 때,\n당신의 모습은?",
    question: "완전히 지쳤을 때 나는?",
    choices: [
      {
         id: "A",
         text: "아무것도 안 하고 시체처럼 누워만 있는다",
         description: "손가락 하나 까딱할 힘도 없어요",
         pattern: "freeze", // [근거] 신체적 마비/동결
      },
      {
         id: "B",
         text: "동굴로 들어가서 누구와도 연락하기 싫다",
         description: "철저히 혼자가 되어 에너지를 아껴요",
         pattern: "flight", // [근거] 관계 회피/철수
      },
      {
         id: "C",
         text: "어린아이처럼 응석 부리고 의지하고 싶다",
         description: "누군가 나를 전적으로 케어해주길 바라요",
         pattern: "anxious", // [근거] 애착 욕구/퇴행
      },
      {
         id: "D",
         text: "평소보다 예민해져서 짜증이 잘 난다",
         description: "건드리면 폭발할 것 같은 상태예요",
         pattern: "fight", // [근거] 과민성(Irritability) 상태
      }
    ],
    measureTarget: "hypoarousal_response",
  },

  // =================================================================================
  // Part 3: 회복 및 위로 (Recovery & Regulation)
  // 목표: 가장 효과적인 진정(Soothing) 및 회복 방식 파악 (4 Types)
  // Consolidated Keys: 'space', 'connection', 'sensory', 'solution'
  // =================================================================================
  {
    id: 8,
    scenario: "격해진 감정을 가라앉히기 위한 나만의 방법은?\n ",
    question: "스스로 마음을 다스리는 방법은?",
    choices: [
      {
        id: "A",
        text: "혼자만의 시간을 가지며 감정을 식힌다",
        description: "잠시 떨어져서 감정을 가라앉힐 시간이 필요해요",
        pattern: "space", // [근거] 공간 및 거리두기 (Space)
      },
      {
        id: "B",
        text: "친구에게 털어놓거나 글을 쓴다",
        description: "감정을 표현하고 공감받아야 풀려요",
        pattern: "connection", // [근거] 정서적 연결/표현 (Connection)
      },
      {
        id: "C",
        text: "상황을 분석하고 해결책을 계획한다",
        description: "문제가 해결되어야 마음이 편해져요",
        pattern: "solution", // [근거] 인지적 해결/계획 (Solution)
      },
      {
        id: "D",
        text: "맛있는 걸 먹거나 푹 자고 일어난다",
        description: "기분 전환이나 신체 컨디션 회복이 우선이에요",
        pattern: "sensory", // [근거] 감각적 조절 (Sensory)
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
        text: "\"그랬구나, 정말 힘들었겠다\" 내 얘기 들어주기",
        description: "해결책보다는 내 감정을 알아주길 바라요",
        pattern: "connection", // [근거] 정서적 확인 (Validation -> Connection)
      },
      {
        id: "B",
        text: "말없이 꽉 안아주거나 손 잡아주기",
        description: "백 마디 말보다 따뜻한 온기가 필요해요",
        pattern: "sensory", // [근거] 신체적 접촉/안정 (Touch -> Sensory)
      },
      {
        id: "C",
        text: "\"내가 해결해줄게\" 하고 문제 처리해주기",
        description: "실질적으로 도움을 줄 때 사랑을 느껴요",
        pattern: "solution", // [근거] 도구적 지원 (Instrumental -> Solution)
      },
      {
        id: "D",
        text: "\"잠시 혼자 쉴래?\" 하고 배려해주기",
        description: "혼자 정리할 시간을 주는 게 가장 고마워요",
        pattern: "space", // [근거] 자율성 존중 (Space)
      },
    ],
    measureTarget: "co_regulation",
  },
  {
    id: 10,
    scenario: "당신이 기분이 안 좋을 때, 연인이 안했으면 하는 행동은?\n ",
    question: "이것만은 제발 하지 말아줘!",
    choices: [
      {
        id: "A",
        text: "\"왜 그래? 무슨 일이야?\" 계속 캐묻기",
        description: "말하고 싶지 않을 때 닥달하면 폭발해요",
        pattern: "space", // [근거] 공간 침범
      },
      {
        id: "B",
        text: "\"별거 아니네\" 하고 자기 할 일 하기",
        description: "내 힘듦을 별거 아닌 일로 취급하면 상처받아요",
        pattern: "connection", // [근거] 정서적 연결 회피
      },
      {
        id: "C",
        text: "논리적으로 따지거나 가르치려 들기",
        description: "지금은 옳고 그름을 따지기보다 공감이 필요해요",
        pattern: "sensory", // [근거] 인지적 과부하/감각적 피로 회피
      },
      {
        id: "D",
        text: "장난치거나 농담으로 상황 넘기려 하기",
        description: "문제를 해결하지 않고 넘어가면 답답해요",
        pattern: "solution", // [근거] 문제 해결 회피
      },
    ],
    measureTarget: "do_not_disturb",
  },
];
