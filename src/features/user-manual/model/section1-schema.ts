import { z } from "zod";

// 답변 선택지 타입
export const answerChoiceSchema = z.object({
  id: z.string(), // "A", "B", "C", "D"
  text: z.string(), // 선택지 텍스트
  description: z.string().optional(), // 부가 설명
  pattern: z.string(), // 측정하는 패턴 (예: "acceptance", "anxiety", "independence", "avoidance")
});

export type AnswerChoice = z.infer<typeof answerChoiceSchema>;

// 질문 타입
export const questionSchema = z.object({
  id: z.number(), // 질문 번호 (1-8)
  scenario: z.string(), // 상황 설명
  question: z.string(), // 질문 텍스트
  choices: z.array(answerChoiceSchema), // 선택지 배열
  measureTarget: z.string(), // 측정 목표 (예: "conflict_response", "uncertainty_tolerance")
});

export type Question = z.infer<typeof questionSchema>;

// 사용자 답변 타입
export const userAnswerSchema = z.object({
  questionId: z.number(),
  selectedChoiceId: z.string(), // "A", "B", "C", "D"
  pattern: z.string(), // 선택한 답변의 패턴
});

export type UserAnswer = z.infer<typeof userAnswerSchema>;

// 감정 패턴 분석 결과
export const emotionalPatternSchema = z.object({
  stress_response: z.enum([
    "acceptance",
    "anxiety",
    "independence",
    "avoidance",
  ]),
  uncertainty_tolerance: z.enum(["high", "medium", "low"]),
  conflict_resolution: z.enum([
    "quick_fix",
    "time_needed",
    "avoidance",
    "strategic",
  ]),
  recharge_method: z.enum(["solitude", "close_friends", "social", "activity"]),
  comfort_language: z.enum([
    "physical_touch",
    "listening",
    "distraction",
    "space",
  ]),
});

export type EmotionalPattern = z.infer<typeof emotionalPatternSchema>;

// 인사이트 타입
export const insightSchema = z.object({
  title: z.string(), // "당신은 혼자만의 시간이 필요한 사람이에요"
  description: z.string(), // 상세 설명
  tip: z.string().optional(), // 실용적인 팁
});

export type Insight = z.infer<typeof insightSchema>;

// 섹션 1 결과 타입
export const section1ResultSchema = z.object({
  completed: z.boolean(),
  completedAt: z.string().optional(), // ISO 8601 timestamp
  answers: z.array(userAnswerSchema),
  patterns: emotionalPatternSchema,
  insights: z.array(insightSchema), // 배열에 순차적으로 담김
});

export type Section1Result = z.infer<typeof section1ResultSchema>;

// 전체 로컬스토리지 데이터 구조
export const userManualStorageSchema = z.object({
  version: z.literal("1.0"),
  userId: z.string(), // anonymous UUID
  startedAt: z.string(), // ISO 8601 timestamp
  section1: section1ResultSchema.optional(),
  // section2, section3는 나중에 추가
});

export type UserManualStorage = z.infer<typeof userManualStorageSchema>;
