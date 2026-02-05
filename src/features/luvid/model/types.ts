import { UserManualReport } from "@/features/user-manual/model/report";

/**
 * Luv ID Profile - 사용자의 연애 프로필 카드
 */
export interface LuvIdProfile {
  id: string;                    // Luv ID (예: LUV-A8F2E9)
  userId: string;                // 브라우저 user_id
  reportId: string;              // 원본 설명서 ID
  
  // 기본 정보
  nickname: string;              // 사용자 닉네임
  tagline: string;               // 한 줄 소개 (자동 생성)
  
  // Identity
  archetype: string;             // 아키타입 이름
  archetypeId: string;           // 아키타입 ID
  themeColor: string;            // 테마 색상
  
  // 핵심 지표 (카드 앞면)
  topValues: Array<{             // Top 3 핵심 가치
    rank: number;
    label: string;
    description: string;
  }>;
  
  loveStyle: string;             // 연애 스타일 (아키타입 기반)
  energyLevel: number;           // 에너지 레벨 (0-100)
  
  // 상세 분석 (카드 뒷면)
  communicationStyle: {
    type: string;                // 소통 스타일 유형
    description: string;
  };
  
  conflictStyle: {
    type: string;                // 갈등 대처 방식
    description: string;
  };
  
  comfortNeeds: {
    type: string;                // 위로 방식
    description: string;
  };
  
  apologyStyle: {
    primary: string;             // 주요 사과 방식
    secondary: string;           // 보조 사과 방식
  };
  
  dealbreakers: Array<{          // 절대 안 되는 것들
    rank: number;
    label: string;
    description: string;
  }>;
  
  // 메타데이터
  createdAt: Date;
  updatedAt: Date;
}

/**
 * 궁합 점수 상세 분석
 */
export interface CompatibilityScore {
  // 종합 점수
  total: number;                 // 0-100
  grade: CompatibilityGrade;     // 등급
  
  // 세부 점수
  breakdown: {
    values: {                    // 핵심 가치 일치도 (30점)
      score: number;
      details: string;
    };
    communication: {             // 소통 스타일 궁합 (25점)
      score: number;
      details: string;
    };
    conflict: {                  // 갈등 해결 방식 (20점)
      score: number;
      details: string;
    };
    lifestyle: {                 // 생활 패턴 조화 (15점)
      score: number;
      details: string;
    };
    energy: {                    // 에너지 레벨 균형 (10점)
      score: number;
      details: string;
    };
  };
  
  // 분석 결과
  strengths: Array<{             // 잘 맞는 부분
    category: string;
    percentage: number;
    description: string;
    tip?: string;
  }>;
  
  growthAreas: Array<{           // 조율 필요한 부분
    category: string;
    percentage: number;
    description: string;
    tip: string;                 // 실천 가능한 조언
  }>;
  
  dealbreakerCheck: {            // Dealbreaker 체크
    safe: boolean;
    warnings: string[];
  };
}

/**
 * 궁합 등급
 */
export type CompatibilityGrade = 
  | 'perfect'      // 🔥 90-100: 천생연분
  | 'great'        // 💖 75-89: 찰떡궁합
  | 'good'         // 💕 60-74: 좋은 인연
  | 'growth'       // 💛 45-59: 성장 파트너
  | 'challenging'  // 💙 30-44: 도전적 관계
  | 'friend';      // 🤝 0-29: 친구 추천

/**
 * 궁합 등급 정보
 */
export const COMPATIBILITY_GRADES: Record<CompatibilityGrade, {
  emoji: string;
  label: string;
  description: string;
  color: string;
}> = {
  perfect: {
    emoji: '🔥',
    label: '천생연분',
    description: '거의 완벽한 궁합',
    color: '#ef4444'
  },
  great: {
    emoji: '💖',
    label: '찰떡궁합',
    description: '매우 좋은 매칭',
    color: '#ec4899'
  },
  good: {
    emoji: '💕',
    label: '좋은 인연',
    description: '노력하면 잘 맞음',
    color: '#f97316'
  },
  growth: {
    emoji: '💛',
    label: '성장 파트너',
    description: '서로 배울 점 많음',
    color: '#eab308'
  },
  challenging: {
    emoji: '💙',
    label: '도전적 관계',
    description: '많은 조율 필요',
    color: '#3b82f6'
  },
  friend: {
    emoji: '🤝',
    label: '친구 추천',
    description: '연인보단 친구가 나음',
    color: '#6b7280'
  }
};

/**
 * Luv ID 생성 함수
 */
export function generateLuvId(): string {
  const prefix = 'LUV';
  const randomPart = Math.random().toString(36).substring(2, 8).toUpperCase();
  return `${prefix}-${randomPart}`;
}

/**
 * 궁합 등급 계산
 */
export function getCompatibilityGrade(score: number): CompatibilityGrade {
  if (score >= 90) return 'perfect';
  if (score >= 75) return 'great';
  if (score >= 60) return 'good';
  if (score >= 45) return 'growth';
  if (score >= 30) return 'challenging';
  return 'friend';
}
