import type { Scenario } from "./section2-schema";

/**
 * 시나리오 B: 이성 친구 문제
 * 20대 후반 감성 - 경계선, 신뢰
 */

export const scenarioB: Scenario = {
  id: "scenario_b",
  title: "이성 친구 문제",
  description: "경계선과 신뢰 문제에 대한 갈등 대처",
  ageGroup: "late20s",
  branches: [
    // 분기 1: 초기 반응 (TKI)
    {
      id: 1,
      measurementType: "tki",
      situation:
        "상대방이 '오래된 친구'라는 이유로 이성 친구와 늦게까지 술자리를 갖거나 연락을 이어가는데, 내가 불편해하는 것을 알면서도 나에게 양보를 강요할 때.",
      choices: [
        {
          id: "b1_1",
          text: '네가 괜찮다면 나도 괜찮아 (하고 참는다)',
          patterns: {
            primary: { type: "accommodating", score: 3 },
            secondary: { type: "avoiding", score: 1 },
          },
        },
        {
          id: "b1_2",
          text: '솔직히 불편해. 이야기 좀 하자',
          patterns: {
            primary: { type: "collaborating", score: 3 },
            secondary: { type: "competing", score: 1 },
          },
        },
        {
          id: "b1_3",
          text: '그럼 나도 내 친구들 만나러 갈게',
          patterns: {
            primary: { type: "competing", score: 3 },
            secondary: { type: "avoiding", score: 1 },
          },
        },
        {
          id: "b1_4",
          text: "(아무 말 하지 않고 속으로 삭인다)",
          patterns: {
            primary: { type: "avoiding", score: 3 },
            secondary: { type: "accommodating", score: 1 },
          },
        },
        {
          id: "b1_5",
          text: '너무 늦게까지는 만나지 않았으면 좋겠어',
          patterns: {
            primary: { type: "compromising", score: 3 },
            secondary: { type: "collaborating", score: 1 },
          },
        },
      ],
    },
    // 분기 2: 갈등 표출 (TKI)
    {
      id: 2,
      measurementType: "tki",
      partnerDialogue: "친구일 뿐이야. 왜 그렇게 예민해?",
      situation: "연인이 말해요.",
      choices: [
        {
          id: "b2_1",
          text: '예민한 게 아니라 불편한 거야. 내 감정을 무시하지 마',
          patterns: {
            primary: { type: "competing", score: 3 },
            secondary: { type: "collaborating", score: 1 },
          },
        },
        {
          id: "b2_2",
          text: '그래, 내가 예민한가 봐 (하고 넘어간다)',
          patterns: {
            primary: { type: "accommodating", score: 3 },
            secondary: { type: "avoiding", score: 1 },
          },
        },
        {
          id: "b2_3",
          text: '그럼 연락 시간을 정하는 건 어때?',
          patterns: {
            primary: { type: "compromising", score: 3 },
            secondary: { type: "collaborating", score: 1 },
          },
        },
        {
          id: "b2_4",
          text: '우리 서로 경계선을 정해보자. 대화가 필요해',
          patterns: {
            primary: { type: "collaborating", score: 3 },
            secondary: { type: "compromising", score: 1 },
          },
        },
        {
          id: "b2_5",
          text: "(더 이상 말하지 않고 자리를 뜬다)",
          patterns: {
            primary: { type: "avoiding", score: 3 },
            secondary: { type: "competing", score: 1 },
          },
        },
      ],
    },
    // 분기 3: 사과 수용 (사과 언어)
    {
      id: 3,
      measurementType: "apology",
      partnerDialogue: "미안해. 네 기분을 생각 못 했어",
      situation: "얼마 후, 연인이 사과해요.",
      choices: [
        {
          id: "b3_1",
          text: '미안하다는 말을 들으니 좀 나아졌어',
          patterns: {
            primary: { type: "expressing_regret", score: 3 },
            secondary: { type: "requesting_forgiveness", score: 1 },
          },
        },
        {
          id: "b3_2",
          text: '왜 그랬는지 구체적으로 설명해줘',
          patterns: {
            primary: { type: "accepting_responsibility", score: 3 },
            secondary: { type: "genuinely_repenting", score: 1 },
          },
        },
        {
          id: "b3_3",
          text: '앞으로는 이런 일 없게 해줘',
          patterns: {
            primary: { type: "genuinely_repenting", score: 3 },
            secondary: { type: "accepting_responsibility", score: 1 },
          },
        },
        {
          id: "b3_4",
          text: '이번 주말에 우리끼리만 시간 보내자',
          patterns: {
            primary: { type: "making_restitution", score: 3 },
            secondary: { type: "expressing_regret", score: 1 },
          },
        },
        {
          id: "b3_5",
          text: '용서할게. 하지만 다시는 이러지 마',
          patterns: {
            primary: { type: "requesting_forgiveness", score: 3 },
            secondary: { type: "genuinely_repenting", score: 1 },
          },
        },
      ],
    },
    // 분기 4: 경계선 설정 (사과 언어)
    {
      id: 4,
      measurementType: "apology",
      partnerDialogue: "앞으로는 늦게까지 만나지 않을게",
      situation: "연인이 약속해요.",
      choices: [
        {
          id: "b4_1",
          text: '고마워. 그럼 10시 이후엔 연락 안 하는 걸로 하자',
          patterns: {
            primary: { type: "genuinely_repenting", score: 3 },
            secondary: { type: "accepting_responsibility", score: 1 },
          },
        },
        {
          id: "b4_2",
          text: '진심으로 미안하다는 말을 한 번 더 해줘',
          patterns: {
            primary: { type: "expressing_regret", score: 3 },
            secondary: { type: "requesting_forgiveness", score: 1 },
          },
        },
        {
          id: "b4_3",
          text: '왜 그런 행동을 했는지 이해하고 싶어',
          patterns: {
            primary: { type: "accepting_responsibility", score: 3 },
            secondary: { type: "genuinely_repenting", score: 1 },
          },
        },
        {
          id: "b4_4",
          text: '이번 주말에 둘이서만 데이트하자. 그럼 용서할게',
          patterns: {
            primary: { type: "making_restitution", score: 3 },
            secondary: { type: "expressing_regret", score: 1 },
          },
        },
        {
          id: "b4_5",
          text: '약속 지켜줄 거지? 용서할 테니까',
          patterns: {
            primary: { type: "requesting_forgiveness", score: 3 },
            secondary: { type: "genuinely_repenting", score: 1 },
          },
        },
      ],
    },
    // 분기 5: 재발 상황 (고트맨)
    {
      id: 5,
      measurementType: "gottman",
      situation: "일주일 후, 연인이 또 그 친구와 술자리를 갖는다는 연락이 왔어요.",
      choices: [
        {
          id: "b5_1",
          text: '또? 약속은 뭐였어?',
          patterns: {
            primary: { type: "criticism", score: 3 },
            secondary: { type: "contempt", score: 1 },
          },
        },
        {
          id: "b5_2",
          text: '나도 내 친구들 만나러 갈게',
          patterns: {
            primary: { type: "defensiveness", score: 3 },
            secondary: { type: "criticism", score: 1 },
          },
        },
        {
          id: "b5_3",
          text: '실망이야. 이야기 좀 하자',
          isHealthy: true,
          patterns: {
            primary: { type: "criticism", score: 0 },
          },
        },
        {
          id: "b5_4",
          text: "(답장하지 않는다)",
          patterns: {
            primary: { type: "stonewalling", score: 3 },
            secondary: { type: "defensiveness", score: 1 },
          },
        },
        {
          id: "b5_5",
          text: '어이없네. 너 진짜 그러는 거야?',
          patterns: {
            primary: { type: "contempt", score: 3 },
            secondary: { type: "criticism", score: 1 },
          },
        },
      ],
    },
    // 분기 6: 최종 대화 (고트맨)
    {
      id: 6,
      measurementType: "gottman",
      partnerDialogue: "너는 왜 이렇게 집착해?",
      situation: "만나서 이야기하는 중이에요.",
      choices: [
        {
          id: "b6_1",
          text: '집착이 아니라 존중의 문제야. 우리 대화가 필요해',
          isHealthy: true,
          patterns: {
            primary: { type: "criticism", score: 0 },
          },
        },
        {
          id: "b6_2",
          text: '집착? 너는 배려가 없는 거야',
          patterns: {
            primary: { type: "contempt", score: 3 },
            secondary: { type: "criticism", score: 1 },
          },
        },
        {
          id: "b6_3",
          text: '내가 집착하는 게 아니라 네가 문제야',
          patterns: {
            primary: { type: "criticism", score: 3 },
            secondary: { type: "defensiveness", score: 1 },
          },
        },
        {
          id: "b6_4",
          text: '알았어, 내가 잘못 생각했나 봐',
          patterns: {
            primary: { type: "defensiveness", score: 3 },
            secondary: { type: "criticism", score: 1 },
          },
        },
        {
          id: "b6_5",
          text: '이야기해도 소용없겠네 (한숨 쉬며)',
          patterns: {
            primary: { type: "stonewalling", score: 3 },
            secondary: { type: "contempt", score: 1 },
          },
        },
      ],
    },
  ],
};
