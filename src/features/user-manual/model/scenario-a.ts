import type { Scenario } from "./section2-schema";

/**
 * 시나리오 A: 갑자기 연락이 끊긴 연인
 * 20대 초반 감성 - 연락 두절, 불확실성
 */

export const scenarioA: Scenario = {
  id: "scenario_a",
  title: "갑자기 연락이 끊긴 연인",
  description: "연락 두절 상황에서의 갈등 대처",
  ageGroup: "early20s",
  branches: [
    // 분기 1: 초기 반응 (TKI)
    {
      id: 1,
      measurementType: "tki",
      situation: '어제 데이트 후 "즐거웠어"라고 보냈는데, 하루가 지나도 답장이 없어요. (읽음 표시 없음)',
      choices: [
        {
          id: "a1_1",
          text: '바쁘겠지 (하고 내 할 일을 한다)',
          patterns: {
            primary: { type: "accommodating", score: 3 },
            secondary: { type: "avoiding", score: 1 },
          },
        },
        {
          id: "a1_2",
          text: '내가 뭐 실수했나? (계속 대화창을 확인한다)',
          patterns: {
            primary: { type: "avoiding", score: 3 },
            secondary: { type: "accommodating", score: 1 },
          },
        },
        {
          id: "a1_3",
          text: '답장 안 하면 나도 안 해 (더 이상 연락하지 않는다)',
          patterns: {
            primary: { type: "competing", score: 3 },
            secondary: { type: "avoiding", score: 1 },
          },
        },
        {
          id: "a1_4",
          text: '왜 답장이 없어? (문자나 전화를 바로 한다)',
          patterns: {
            primary: { type: "competing", score: 3 },
            secondary: { type: "collaborating", score: 1 },
          },
        },
        {
          id: "a1_5",
          text: '괜찮아? 바쁜가봐 (적당한 시간 후 연락한다)',
          patterns: {
            primary: { type: "compromising", score: 3 },
            secondary: { type: "collaborating", score: 1 },
          },
        },
      ],
    },
    // 분기 2: 상대 반응 대처 (TKI)
    {
      id: 2,
      measurementType: "tki",
      partnerDialogue: "미안, 바빴어",
      situation: "이틀째 되는 날, 연인에게서 짧은 답장이 왔어요.",
      choices: [
        {
          id: "a2_1",
          text: '괜찮아, 무슨 일 있었어?',
          patterns: {
            primary: { type: "collaborating", score: 3 },
            secondary: { type: "accommodating", score: 1 },
          },
        },
        {
          id: "a2_2",
          text: '그래, 알았어',
          patterns: {
            primary: { type: "accommodating", score: 3 },
            secondary: { type: "avoiding", score: 1 },
          },
        },
        {
          id: "a2_3",
          text: '이틀이나 걸렸네. 다음엔 미리 말해줘',
          patterns: {
            primary: { type: "compromising", score: 3 },
            secondary: { type: "competing", score: 1 },
          },
        },
        {
          id: "a2_4",
          text: "(답장하지 않고 시간을 갖는다)",
          patterns: {
            primary: { type: "avoiding", score: 3 },
            secondary: { type: "competing", score: 1 },
          },
        },
        {
          id: "a2_5",
          text: '바빴다는 건 알겠는데, 한 줄이라도 보내줬으면 좋았을 것 같아',
          patterns: {
            primary: { type: "competing", score: 3 },
            secondary: { type: "collaborating", score: 1 },
          },
        },
      ],
    },
    // 분기 3: 사과 수용 (사과 언어)
    {
      id: 3,
      measurementType: "apology",
      partnerDialogue: "정말 미안해. 일이 너무 많아서 정신이 없었어",
      situation: "연인이 사과해요.",
      choices: [
        {
          id: "a3_1",
          text: '미안하다는 말만 들으면 돼',
          patterns: {
            primary: { type: "expressing_regret", score: 3 },
            secondary: { type: "requesting_forgiveness", score: 1 },
          },
        },
        {
          id: "a3_2",
          text: '왜 연락 못 했는지 구체적으로 설명해줘',
          patterns: {
            primary: { type: "accepting_responsibility", score: 3 },
            secondary: { type: "genuinely_repenting", score: 1 },
          },
        },
        {
          id: "a3_3",
          text: '다음엔 이런 일 없게 해줘. 약속할 수 있어?',
          patterns: {
            primary: { type: "genuinely_repenting", score: 3 },
            secondary: { type: "accepting_responsibility", score: 1 },
          },
        },
        {
          id: "a3_4",
          text: '오늘 만나서 이야기하자',
          patterns: {
            primary: { type: "making_restitution", score: 3 },
            secondary: { type: "expressing_regret", score: 1 },
          },
        },
        {
          id: "a3_5",
          text: '용서할게. 하지만 앞으로는 조심해줘',
          patterns: {
            primary: { type: "requesting_forgiveness", score: 3 },
            secondary: { type: "genuinely_repenting", score: 1 },
          },
        },
      ],
    },
    // 분기 4: 화해 방식 (사과 언어)
    {
      id: 4,
      measurementType: "apology",
      partnerDialogue: "오늘 저녁에 네가 좋아하는 식당 갈까?",
      situation: "연인이 제안해요.",
      choices: [
        {
          id: "a4_1",
          text: '좋아, 만나서 이야기하자',
          patterns: {
            primary: { type: "making_restitution", score: 3 },
            secondary: { type: "expressing_regret", score: 1 },
          },
        },
        {
          id: "a4_2",
          text: '식사보다 진심 어린 사과가 먼저야',
          patterns: {
            primary: { type: "genuinely_repenting", score: 3 },
            secondary: { type: "expressing_regret", score: 1 },
          },
        },
        {
          id: "a4_3",
          text: '이번만 용서할게. 다음엔 정말 안 돼',
          patterns: {
            primary: { type: "requesting_forgiveness", score: 3 },
            secondary: { type: "genuinely_repenting", score: 1 },
          },
        },
        {
          id: "a4_4",
          text: '앞으로 이런 일 없게 약속해줘. 그럼 괜찮아',
          patterns: {
            primary: { type: "accepting_responsibility", score: 3 },
            secondary: { type: "genuinely_repenting", score: 1 },
          },
        },
        {
          id: "a4_5",
          text: '미안하다는 말을 직접 들으면 좋겠어',
          patterns: {
            primary: { type: "expressing_regret", score: 3 },
            secondary: { type: "making_restitution", score: 1 },
          },
        },
      ],
    },
    // 분기 5: 갈등 후 소통 (고트맨)
    {
      id: 5,
      measurementType: "gottman",
      partnerDialogue: "너도 이해해줘야지. 나도 힘들었어",
      situation: "식당에 도착한 후, 상대가 먼저 말을 꺼내요.",
      choices: [
        {
          id: "a5_1",
          text: '나는 이해받고 싶은데 왜 네 얘기만 해?',
          patterns: {
            primary: { type: "criticism", score: 3 },
            secondary: { type: "defensiveness", score: 1 },
          },
        },
        {
          id: "a5_2",
          text: '나도 힘든 건 마찬가지야',
          patterns: {
            primary: { type: "defensiveness", score: 3 },
            secondary: { type: "criticism", score: 1 },
          },
        },
        {
          id: "a5_3",
          text: '그래, 네 입장도 이해해. 우리 둘 다 힘들었네',
          isHealthy: true,
          patterns: {
            primary: { type: "criticism", score: 0 },
          },
        },
        {
          id: "a5_4",
          text: "(아무 말 없이 고개만 끄덕이고 대화를 회피한다)",
          patterns: {
            primary: { type: "stonewalling", score: 3 },
            secondary: { type: "defensiveness", score: 1 },
          },
        },
        {
          id: "a5_5",
          text: '하, 그렇게 생각하는구나 (냉소적 톤)',
          patterns: {
            primary: { type: "contempt", score: 3 },
            secondary: { type: "stonewalling", score: 1 },
          },
        },
      ],
    },
    // 분기 6: 재발 방지 약속 (고트맨)
    {
      id: 6,
      measurementType: "gottman",
      partnerDialogue: "다음부터는 바빠도 꼭 연락할게",
      situation: "대화를 마무리하며 연인이 약속해요.",
      choices: [
        {
          id: "a6_1",
          text: '진짜? 또 그러면 어쩔 건데?',
          patterns: {
            primary: { type: "contempt", score: 3 },
            secondary: { type: "criticism", score: 1 },
          },
        },
        {
          id: "a6_2",
          text: '말만 그렇게 하지 말고 행동으로 보여줘',
          patterns: {
            primary: { type: "criticism", score: 3 },
            secondary: { type: "defensiveness", score: 1 },
          },
        },
        {
          id: "a6_3",
          text: '알았어, 믿을게',
          isHealthy: true,
          patterns: {
            primary: { type: "criticism", score: 0 },
          },
        },
        {
          id: "a6_4",
          text: '그래, 고마워. 앞으로 잘 지내보자',
          patterns: {
            primary: { type: "defensiveness", score: 3 },
            secondary: { type: "criticism", score: 1 },
          },
        },
        {
          id: "a6_5",
          text: "(답장하지 않고 자리를 뜬다)",
          patterns: {
            primary: { type: "stonewalling", score: 3 },
            secondary: { type: "contempt", score: 1 },
          },
        },
      ],
    },
  ],
};
