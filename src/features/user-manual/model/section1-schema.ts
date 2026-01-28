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
  stress_response: z.string(),
  uncertainty_tolerance: z.enum(["high", "medium", "low"]),
  conflict_resolution: z.string(),
  recharge_method: z.string(),
  comfort_language: z.string(),
});

export type EmotionalPattern = z.infer<typeof emotionalPatternSchema>;

// 인사이트 타입
export const insightSchema = z.object({
  title: z.string(), // "당신은 혼자만의 시간이 필요한 사람이에요"
  description: z.string(), // 상세 설명
  tip: z.string().optional(), // 실용적인 팁
  teaserHint: z.string().optional(), // 결과 페이지용 재치있는 한 줄 힌트
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
  section2: z.any().optional(), // Section2Result
  section3: z.any().optional(), // Section3Result
});

// 순환 참조 및 복잡성 방지를 위해 Section 2, 3 타입은 직접 import 하여 확장
import { Section2Result } from "./section2-schema";
import { Section3Result } from "./section3-schema";

export type UserManualStorage = z.infer<typeof userManualStorageSchema> & {
  section2?: Section2Result;
  section3?: Section3Result;
};
