# 섹션 1 결과 집계 알고리즘

## 목표

8개 질문의 답변 패턴을 분석하여 사용자의 감정 패턴을 파악하고, 3가지 핵심 인사이트를 도출

---

## 1. 패턴 분류 체계

### 1.1 스트레스 반응 (stress_response)

**측정 질문**: Q1, Q2, Q5

**패턴 종류**:

- `acceptance` (수용형): 타인 배려 우선, 유연하게 대처
- `anxiety` (불안형): 확인 욕구 강함, 불안해하며 반복 확인
- `independence` (독립형): 감정 차단, 혼자 처리
- `avoidance` (회피형): 결정 회피, 문제 덮어두기

**집계 방식**:

```
Q1, Q2, Q5의 pattern을 모아서 가장 많이 나온 패턴 선택
동점일 경우: Q5 (vulnerability_sharing) 우선
```

---

### 1.2 불확실성 내성 (uncertainty_tolerance)

**측정 질문**: Q3

**패턴 종류**:

- `independence` → `high` (높음): 별로 신경 안 씀
- `anxiety` → `low` (낮음): 매우 불안해함
- `defensive` → `low` (낮음): 방어적으로 반응
- `strategic` → `medium` (중간): 전략적으로 대응

**집계 방식**:

```
Q3의 선택지에 따라 직접 매핑
```

---

### 1.3 갈등 해결 방식 (conflict_resolution)

**측정 질문**: Q4

**패턴 종류**:

- `quick_fix` (빠른 해결): 즉시 사과하고 풀고 싶음
- `standoff` (대치): 상대방이 먼저 연락하길 기다림
- `indirect` (간접적): 직접 사과는 어색, 우회적 접근
- `time_needed` (시간 필요): 시간이 지나면 자연스럽게 풀릴 것

**집계 방식**:

```
Q4의 선택지에 따라 직접 매핑
```

---

### 1.4 재충전 방식 (recharge_method)

**측정 질문**: Q6, Q8

**패턴 종류**:

- `solitude` (고독): 혼자 있는 시간 필요
- `close_friends` (친한 친구): 편한 사람과 소수 만남
- `social` (사회적): 많은 사람 만나야 에너지 충전
- `activity` (활동): 몸 움직이는 활동으로 충전

**집계 방식**:

```
Q6, Q8의 pattern을 모아서 가장 많이 나온 패턴 선택
동점일 경우: Q8 (energy_recharge) 우선
```

---

### 1.5 위로 언어 (comfort_language)

**측정 질문**: Q7

**패턴 종류**:

- `physical_touch` (스킨십): 안아주기, 손잡기
- `listening` (경청): 이야기 들어주기, 공감
- `distraction` (기분 전환): 맛있는 것, 재미있는 것
- `space` (공간): 혼자 내버려두기

**집계 방식**:

```
Q7의 선택지에 따라 직접 매핑
```

---

## 2. 인사이트 생성 알고리즘

### 인사이트 1: 재충전 방식

```typescript
if (recharge_method === "solitude") {
  title: "당신은 혼자만의 시간이 필요한 사람이에요";
  description: "당신은 스트레스를 받으면 에너지가 고갈되고, 혼자 있는 시간을 통해 다시 충전됩니다. 이건 나쁜 게 아니에요.";
  tip: '연인에게 "지금은 혼자 있고 싶어"라고 솔직하게 말하는 연습이 필요해요.';
} else if (recharge_method === "social") {
  title: "당신은 사람을 만나야 에너지가 생기는 사람이에요";
  description: "혼자 있으면 오히려 더 우울해지고, 사람들과 함께 있을 때 활력을 얻습니다.";
  tip: "연인이 혼자 있고 싶어할 때, 억지로 붙잡지 말고 친구들을 만나보세요.";
} else if (recharge_method === "close_friends") {
  title: "당신은 편한 사람과의 깊은 대화가 필요한 사람이에요";
  description: "많은 사람보다는 소수의 친한 사람과 진솔한 이야기를 나눌 때 회복됩니다.";
  tip: '연인에게 "오늘은 둘이서만 조용히 있고 싶어"라고 말해보세요.';
} else {
  // activity
  title: "당신은 몸을 움직여야 스트레스가 풀리는 사람이에요";
  description: "가만히 있으면 답답하고, 운동이나 활동을 통해 에너지를 발산해야 합니다.";
  tip: "연인과 함께 산책, 등산, 운동 같은 활동적인 데이트를 제안해보세요.";
}
```

### 인사이트 2: 불확실성 내성

```typescript
if (uncertainty_tolerance === "low") {
  title: "당신은 불확실성에 약한 편이에요";
  description: "답장이 늦으면 불안해지고, 상대방의 마음을 확인하고 싶어집니다. 이건 당연한 감정이에요.";
  tip: '하지만 매번 확인하려 들면 상대방이 부담스러울 수 있어요. "불안한 건 내 감정이지, 상대방 잘못이 아니야"라고 스스로에게 말해보세요.';
} else if (uncertainty_tolerance === "high") {
  title: "당신은 불확실성을 잘 견디는 사람이에요";
  description: "답장이 늦어도 크게 신경 쓰지 않고, 상대방을 믿고 기다릴 수 있습니다.";
  tip: '하지만 상대방이 불안형이라면? 가끔은 "잘 지내고 있어"라는 짧은 연락이 큰 도움이 돼요.';
} else {
  // medium
  title: "당신은 상황에 따라 불안도가 달라지는 사람이에요";
  description: "평소엔 괜찮지만, 관계 초반이나 불안정할 때는 확인하고 싶어집니다.";
  tip: '"지금 나 좀 불안해"라고 솔직하게 말하는 게 도움이 될 수 있어요.';
}
```

### 인사이트 3: 갈등 해결 방식

```typescript
if (conflict_resolution === "quick_fix") {
  title: "당신은 빨리 화해하고 싶어하는 사람이에요";
  description: "갈등이 생기면 불편해서 빨리 풀고 싶어집니다. 하지만 상대방은 생각할 시간이 필요할 수도 있어요.";
  tip: '"20분 후에 다시 이야기하자"처럼 타임아웃 규칙을 미리 정해두면 좋아요.';
} else if (conflict_resolution === "time_needed") {
  title: "당신은 갈등 후 생각할 시간이 필요한 사람이에요";
  description: "감정이 격해진 상태에서는 대화가 어렵고, 시간을 두고 정리해야 합니다.";
  tip: '상대방에게 "지금은 대화하기 힘들어. 내일 이야기하자"라고 명확히 말해주세요.';
} else if (conflict_resolution === "indirect") {
  title: "당신은 직접적인 사과가 어색한 사람이에요";
  description: '"미안해"라고 말하기보다는 행동으로 보여주거나 우회적으로 접근합니다.';
  tip: '하지만 상대방은 명확한 사과를 원할 수 있어요. 가끔은 "미안해"라고 직접 말하는 연습이 필요해요.';
} else {
  // standoff
  title: "당신은 먼저 연락하기 싫어하는 사람이에요";
  description: '"내가 왜 먼저?"라는 생각이 들고, 상대방이 먼저 연락하길 기다립니다.';
  tip: "하지만 둘 다 기다리면 관계가 멀어질 수 있어요. 자존심보다 관계가 더 중요하다면, 먼저 손 내미는 용기가 필요해요.";
}
```

---

## 3. 구현 예시 (TypeScript)

```typescript
function analyzeSection1(answers: UserAnswer[]): Section1Result {
  // 1. 패턴 카운팅
  const stressPatterns = [
    answers.find((a) => a.questionId === 1)?.pattern,
    answers.find((a) => a.questionId === 2)?.pattern,
    answers.find((a) => a.questionId === 5)?.pattern,
  ].filter(Boolean);

  const rechargePatterns = [
    answers.find((a) => a.questionId === 6)?.pattern,
    answers.find((a) => a.questionId === 8)?.pattern,
  ].filter(Boolean);

  // 2. 가장 많이 나온 패턴 찾기
  const stress_response = getMostFrequent(stressPatterns, answers[4]?.pattern);
  const recharge_method = getMostFrequent(
    rechargePatterns,
    answers[7]?.pattern
  );

  // 3. 직접 매핑
  const uncertainty_tolerance = mapUncertaintyTolerance(answers[2]?.pattern);
  const conflict_resolution = answers[3]?.pattern;
  const comfort_language = answers[6]?.pattern;

  // 4. 인사이트 생성
  const insights = [
    generateRechargeInsight(recharge_method),
    generateUncertaintyInsight(uncertainty_tolerance),
    generateConflictInsight(conflict_resolution),
  ];

  return {
    completed: true,
    completedAt: new Date().toISOString(),
    answers,
    patterns: {
      stress_response,
      uncertainty_tolerance,
      conflict_resolution,
      recharge_method,
      comfort_language,
    },
    insights,
  };
}
```

---

## 4. 핵심 포인트

1. **패턴 우선순위**: 동점일 경우 더 중요한 질문(Q5, Q8) 우선
2. **3가지 인사이트**: 재충전, 불확실성, 갈등 해결 (가장 실용적)
3. **따뜻한 톤**: 판단하지 않고 격려하는 메시지
4. **실용적 팁**: 구체적인 행동 제안

---

이 알고리즘은 심리학적 근거(폴리베이갈 이론, 애착 이론)를 바탕으로 하되,
사용자가 쉽게 이해하고 실생활에 적용할 수 있도록 단순화했습니다.
