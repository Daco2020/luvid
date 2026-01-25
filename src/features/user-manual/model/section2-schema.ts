/**
 * Section 2: 소통 및 갈등 (Conflict) - 분기 스토리
 * TKI 갈등 스타일, 사과 언어, 고트맨 패턴을 진단합니다.
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

// 고트맨의 4가지 파멸의 기사
export type GottmanPattern =
  | "criticism"      // 비난: 상대의 성격이나 인격을 공격
  | "defensiveness"  // 방어: 자신을 정당화하고 상대를 역공격
  | "contempt"       // 경멸: 상대를 무시하거나 조롱
  | "stonewalling";  // 담쌓기: 대화를 거부하고 회피

// 측정 타입
export type MeasurementType = "tki" | "apology" | "gottman";

// 패턴 점수
export interface PatternScore {
  primary: {
    type: ConflictStyle | ApologyLanguage | GottmanPattern;
    score: number; // 주 패턴: 3점
  };
  secondary?: {
    type: ConflictStyle | ApologyLanguage | GottmanPattern;
    score: number; // 부 패턴: 1점
  };
}

// 선택지
export interface Choice {
  id: string;
  text: string;
  patterns: PatternScore;
  isHealthy?: boolean; // 고트맨 패턴에서 건강한 반응인 경우
}

// 분기
export interface Branch {
  id: number;
  measurementType: MeasurementType;
  situation: string;
  choices: Choice[];
}

// 시나리오
export interface Scenario {
  id: string;
  title: string;
  description: string;
  ageGroup: "early20s" | "late20s" | "early30s" | "late30s"; // 내부용
  branches: Branch[];
}

// 사용자 선택 기록
export interface UserChoice {
  branchId: number;
  choiceId: string;
  patterns: PatternScore;
}

// 분석 결과 - TKI
export interface TKIAnalysis {
  scores: Record<ConflictStyle, number>;
  primaryStyle: ConflictStyle;
  secondaryStyle?: ConflictStyle;
}

// 분석 결과 - 사과 언어
export interface ApologyAnalysis {
  scores: Record<ApologyLanguage, number>;
  primaryLanguage: ApologyLanguage;
  secondaryLanguage?: ApologyLanguage;
}

// 분석 결과 - 고트맨
export interface GottmanAnalysis {
  scores: Record<GottmanPattern, number>;
  totalScore: number;
  riskLevel: "healthy" | "caution" | "danger"; // 0-2점, 3-5점, 6점 이상
  dominantPattern?: GottmanPattern;
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
  scenarioId: string;
  choices: UserChoice[];
  analysis: {
    tki: TKIAnalysis;
    apology: ApologyAnalysis;
    gottman: GottmanAnalysis;
  };
  insights: {
    conflict: Insight;
    apology: Insight;
    gottman?: Insight; // 위험 수준에 따라 선택적
  };
}
