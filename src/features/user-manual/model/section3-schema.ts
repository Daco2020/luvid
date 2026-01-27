/**
 * Section 3: 가치관 토너먼트 (Value Tournament)
 * 연인 관계에서 중요한 가치를 토너먼트 방식으로 선별하여 우선순위를 파악합니다.
 */

import { z } from "zod";

// 가치 항목 (긍정 또는 부정)
export const valueAspectSchema = z.object({
  id: z.string(), // "honesty_positive_1"
  label: z.string(), // "투명한 소통"
  description: z.string(), // "중요한 일은 숨기지 않고 공유한다"
  type: z.enum(["positive", "negative"]), // 긍정(추구) vs 부정(거부)
});

export type ValueAspect = z.infer<typeof valueAspectSchema>;

// 핵심 가치 (20개)
export const coreValueSchema = z.object({
  id: z.string(), // "honesty"
  name: z.string(), // "정직성"
  nameEn: z.string(), // "Honesty"
  positiveAspects: z.array(valueAspectSchema).length(4), // 추구하는 가치 4개
  negativeAspects: z.array(valueAspectSchema).length(4), // 거부하는 가치 4개
});

export type CoreValue = z.infer<typeof coreValueSchema>;

// 토너먼트 매치
export interface TournamentMatch {
  id: string; // "match_1"
  round: number; // 1(준결승), 2(결승)
  aspectA: ValueAspect;
  aspectB: ValueAspect;
  winner?: string; // 선택된 aspect의 id
}

// 토너먼트 결과
export interface TournamentResult {
  type: "positive" | "negative"; // 긍정 토너먼트 vs 부정 토너먼트
  matches: TournamentMatch[]; // 모든 매치 기록
  winner: ValueAspect; // 최종 우승
  runnerUp: ValueAspect; // 준우승
}

// Section 3 사용자 선택
export const section3SelectionsSchema = z.object({
  selectedCoreValues: z.array(z.string()).length(8), // 선택한 8개 핵심 가치 ID
  positiveTournament: z.object({
    matches: z.array(
      z.object({
        id: z.string(),
        round: z.number(),
        aspectAId: z.string(),
        aspectBId: z.string(),
        winnerId: z.string(),
      })
    ),
    winnerId: z.string(), // 최종 우승 aspect ID
    runnerUpId: z.string(), // 준우승 aspect ID
  }),
  negativeTournament: z.object({
    matches: z.array(
      z.object({
        id: z.string(),
        round: z.number(),
        aspectAId: z.string(),
        aspectBId: z.string(),
        winnerId: z.string(),
      })
    ),
    winnerId: z.string(), // 최종 우승 aspect ID
    runnerUpId: z.string(), // 준우승 aspect ID
  }),
});

export type Section3Selections = z.infer<typeof section3SelectionsSchema>;

// Section 3 분석 결과
export const section3ResultSchema = z.object({
  completed: z.boolean(),
  completedAt: z.string().optional(),
  selectedCoreValues: z.array(z.string()).length(8), // 선택한 8개 핵심 가치 ID
  topPositiveValue: z.object({
    // 가장 중요한 가치
    coreValueId: z.string(), // 어느 핵심 가치에서 나왔는지
    aspect: valueAspectSchema, // 구체적인 항목
  }),
  topNegativeValue: z.object({
    // 가장 큰 딜브레이커
    coreValueId: z.string(),
    aspect: valueAspectSchema,
  }),
  insight: z.string(), // 분석 결과 인사이트
  teaserHint: z.string(), // 티저 힌트 (다음 섹션 유도)
});

export type Section3Result = z.infer<typeof section3ResultSchema>;

// Storage에 저장될 Section 3 데이터
export const section3StorageSchema = z.object({
  selections: section3SelectionsSchema.optional(),
  result: section3ResultSchema.optional(),
});

export type Section3Storage = z.infer<typeof section3StorageSchema>;
