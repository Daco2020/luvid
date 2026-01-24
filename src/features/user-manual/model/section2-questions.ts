import { Question } from "./section2-schema";

/**
 * 섹션 2: 소통 및 갈등
 * 총 6개 질문
 * - 갈등 스타일 (TKI): Q1, Q2, Q3 
 * - 사과 언어: Q4, Q5, Q6
 */

export const section2Questions: Question[] = [
  // === TKI 갈등 스타일 측정 ===
  {
    id: 1,
    scenario: "연인과 데이트 장소를 정하는데 의견이 엇갈렸어요.\n당신은 카페를 가고 싶고, 상대방은 등산을 가고 싶어 해요.",
    question: "이런 상황에서 당신은 주로 어떻게 하나요?",
    choices: [
      {
        id: "1a",
        text: "내 의견을 설득력 있게 주장해요",
        description: "카페가 더 좋은 이유를 설명하고 상대를 설득해요",
        pattern: "competing"
      },
      {
        id: "1b",
        text: "상대방한테 맞춰줘요",
        description: "별로 가고 싶지 않아도 등산을 가요",
        pattern: "accommodating"
      },
      {
        id: "1c",
        text: "결정을 미루거나 애매하게 넘어가요",
        description: "\"나중에 정하자\" 또는 \"상관없어\" 하며 회피해요",
        pattern: "avoiding"
      },
      {
        id: "1d",
        text: "둘 다 조금씩 양보하는 걸 제안해요",
        description: "\"아침엔 등산하고 점심엔 카페 가자\"",
        pattern: "compromising"
      }
    ]
  },
  {
    id: 2,
    scenario: "중요한 기념일에 연인이 약속을 까먹어서 화가 났어요.",
    question: "당신은 어떻게 반응하나요?",
    choices: [
      {
        id: "2a",
        text: "솔직하게 화가 났다고 말하고 대화해요",
        description: "내 감정을 표현하면서도 해결책을 함께 찾아요",
        pattern: "collaborating"
      },
      {
        id: "2b",
        text: "화가 나지만 표현하지 않고 참아요",
        description: "관계가 안 좋아질까 봐 그냥 넘어가요",
        pattern: "accommodating"
      },
      {
        id: "2c",
        text: "연락을 끊고 혼자 있어요",
        description: "말하기 싫어서 자리를 피해요",
        pattern: "avoiding"
      },
      {
        id: "2d",
        text: "강하게 내 입장을 주장해요",
        description: "\"이게 얼마나 중요한 날인지 몰라?\" 감정을 쏟아내요",
        pattern: "competing"
      }
    ]
  },
  {
    id: 3,
    scenario: "연인과 주말 보내는 방식이 달라요.\n당신은 집에서 쉬고 싶은데, 상대는 밖에서 활동적으로 보내고 싶어 해요.",
    question: "갈등이 계속될 때 당신의 본능은?",
    choices: [
      {
        id: "3a",
        text: "즉시 풀고 넘어가야 직성이 풀려요",
        description: "불편한 감정을 빨리 해소하고 싶어요",
        pattern: "competing"
      },
      {
        id: "3b",
        text: "일단 자리를 피하고 혼자 생각할 시간이 필요해요",
        description: "감정이 가라앉을 때까지 거리를 두고 싶어요",
        pattern: "avoiding"
      },
      {
        id: "3c",
        text: "상대가 기분 나쁠까 봐 웬만하면 참아요",
        description: "평화를 유지하는 게 더 중요해요",
        pattern: "accommodating"
      },
      {
        id: "3d",
        text: "서로의 욕구를 모두 만족시킬 방법을 찾아요",
        description: "\"토요일은 집, 일요일은 외출\" 같은 해결책을 모색해요",
        pattern: "collaborating"
      }
    ]
  },

  // === 사과 언어 측정 ===
  {
    id: 4,
    scenario: "연인이 중요한 약속을 잊어버렸어요.",
    question: "상대방이 사과할 때, 어떤 말이 가장 듣고 싶나요?",
    choices: [
      {
        id: "4a",
        text: "\"정말 미안해, 내가 너를 속상하게 했구나\"",
        description: "내 감정에 공감해주는 표현",
        pattern: "expressing_regret"
      },
      {
        id: "4b",
        text: "\"내가 잘못했어. 변명의 여지가 없어\"",
        description: "명확한 잘못 인정",
        pattern: "accepting_responsibility"
      },
      {
        id: "4c",
        text: "\"어떻게 보상할 수 있을까? 내가 만회할게\"",
        description: "구체적인 보상 제안",
        pattern: "making_restitution"
      },
      {
        id: "4d",
        text: "\"다시는 이런 일이 없도록 알람을 설정해놨어\"",
        description: "행동 변화 약속",
        pattern: "genuinely_repenting"
      }
    ]
  },
  {
    id: 5,
    scenario: "당신이 연인에게 상처를 주는 말을 했어요.",
    question: "사과할 때 가장 먼저 하고 싶은 말은?",
    choices: [
      {
        id: "5a",
        text: "\"미안해, 그렇게 말할 생각은 아니었어\"",
        description: "후회와 감정 표현",
        pattern: "expressing_regret"
      },
      {
        id: "5b",
        text: "\"내 잘못이야. 내가 감정 조절을 못했어\"",
        description: "책임 인정",
        pattern: "accepting_responsibility"
      },
      {
        id: "5c",
        text: "\"앞으로는 말하기 전에 한 번 더 생각할게\"",
        description: "재발 방지 다짐",
        pattern: "genuinely_repenting"
      },
      {
        id: "5d",
        text: "\"나를 용서해줄 수 있어?\"",
        description: "용서 요청",
        pattern: "requesting_forgiveness"
      }
    ]
  },
  {
    id: 6,
    scenario: "말다툼 후 분위기가 어색해요.",
    question: "말로 사과하기 어색할 때, 화해 신호로 무엇이 좋을까요?",
    choices: [
      {
        id: "6a",
        text: "좋아하는 간식을 사다 줘요",
        description: "행동으로 보상하는 방식",
        pattern: "making_restitution"
      },
      {
        id: "6b",
        text: "\"미안해\"라고 메시지를 보내요",
        description: "감정을 직접 표현",
        pattern: "expressing_regret"
      },
      {
        id: "6c",
        text: "말없이 손을 잡아요",
        description: "비언어적 화해 제스처",
        pattern: "requesting_forgiveness"
      },
      {
        id: "6d",
        text: "\"앞으로 조심할게\"라고 말해요",
        description: "행동 개선 약속",
        pattern: "genuinely_repenting"
      }
    ]
  }
];
