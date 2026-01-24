/**
 * Section 2: 소통 및 갈등 (Conflict)
 * TKI 갈등 모드와 사과 언어를 진단합니다.
 */

// TKI 갈등 스타일 5가지
export type ConflictStyle =
  | "competing"      // 경쟁형: 높은 자기주장, 낮은 협조성
  | "avoiding"       // 회피형: 낮은 자기주장, 낮은 협조성
  | "accommodating"  // 수용형: 낮은 자기주장, 높은 협조성
  | "collaborating"  // 협력형: 높은 자기주장, 높은 협조성
  | "compromising";  // 타협형: 중간 정도의 자기주장과 협조성

// 사과 언어 5가지
export type ApologyLanguage =
  | "expressing_regret"      // 후회 표현: "미안해"라는 감정적 표현
  | "accepting_responsibility"  // 책임 인정: 자신의 잘못을 명확히 시인
  | "making_restitution"     // 보상: 실질적인 대가를 치르거나 상황을 바로잡는 행동
  | "genuinely_repenting"    // 진심 어린 뉘우침: 행동의 변화를 약속
  | "requesting_forgiveness"; // 용서 구하기: 관계의 회복을 상대에게 정중히 요청

// 질문 타입
export interface Question {
  id: number;
  scenario: string;      // 상황 설명
  question: string;      // 질문
  choices: AnswerChoice[];
}

export interface AnswerChoice {
  id: string;
  text: string;
  description?: string;
  pattern: string; // conflict_style 또는 apology_language에 매핑
}

// 사용자 답변
export interface UserAnswer {
  questionId: number;
  selectedChoiceId: string;
  pattern: string;
}

// 분석 결과 패턴
export interface ConflictPattern {
  conflict_style: ConflictStyle;
  apology_language: ApologyLanguage;
}

// 인사이트
export interface Insight {
  title: string;
  description: string;
  tip: string;
}

// 섹션 2 최종 결과
export interface Section2Result {
  completed: boolean;
  completedAt: string;
  answers: UserAnswer[];
  patterns: ConflictPattern;
  insights: Insight[]; // 갈등 스타일 + 사과 언어 인사이트 2개
}
