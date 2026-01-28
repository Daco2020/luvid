import { UserManualStorage } from "./section1-schema";

// 리포트 데이터 구조
export interface PsychologicalSpec {
  label: string; 
  value: string; 
  description: string;
  icon: "battery" | "wifi" | "cpu" | "shield" | "star";
}

export interface UserManualReport {
  userName: string;
  identity: {
    archetype: string;
    catchphrase: string;
    description: string;
    keywords: string[];
    themeColor: string; 
  };
  specs: PsychologicalSpec[];
  dealbreakers: {
    label: string;
    description: string;
  }[];
  userGuide: {
    dos: string[];
    donts: string[];
  };
}

// 아키타입 매핑 (더 감성적인 표현)
const ARCHETYPES: Record<string, string> = {
  trust: "흔들리지 않는 믿음의 닻",
  honesty: "투명한 진심의 전달자",
  growth: "끊임없이 피어나는 성장가",
  commitment: "변치 않는 약속의 수호자",
  communication: "마음과 마음을 잇는 가교",
  respect: "있는 그대로를 비추는 거울",
  stablility: "편안한 휴식 같은 안식처",
  // Fallback
  default: "고유한 빛을 지닌 영혼",
};

/**
 * 3개 섹션의 결과를 종합하여 최종 리포트 생성
 */
export function generateUserManual(data: UserManualStorage): UserManualReport | null {
  if (!data.section1 || !data.section2 || !data.section3) {
    return null; 
  }

  const s1 = data.section1;
  const s2 = data.section2;
  const s3 = data.section3;

  // 1. Identity Derivation
  const coreValueKey = s3.topPositiveValue.aspect.id.split('_')[0]; 
  const archetype = ARCHETYPES[coreValueKey] || ARCHETYPES.default;
  const themeColor = s1.patterns.recharge_method === "solitude" ? "indigo" : "orange"; 

  // 키워드 생성
  const keywords = [
    s3.topPositiveValue.aspect.label,
    s2.analysis?.tki?.primaryStyle === "competing" ? "주도적 해결" : 
    s2.analysis?.tki?.primaryStyle === "collaborating" ? "함께 만드는 답" : "배려와 조화",
  ];

  // 2. Specs Mapping
  const specs: PsychologicalSpec[] = [];

  // Spec 1: Energy Source (Section 1)
  const rechargeMap: Record<string, string> = {
    solitude: "고요한 내면의 안식처 (고독형)",
    intimacy: "깊고 진한 소울 커넥션 (친밀형)",
    close_friends: "소수의 깊은 유대 (친밀형)",
    expression: "솔직한 감정의 발산 (표현형)",
    social: "활기찬 에너지 교환소 (사교형)",
    activity: "생동감 넘치는 운동 에너지 (활동형)",
    physiological: "감각적 환기와 리셋 (신체형)",
    sensory: "편안한 감각의 몰입 (감각형)",
    space: "온전한 단절과 휴식 (독립형)",
  };
  
  specs.push({
    label: "Energy Source (충전 방식)",
    value: rechargeMap[s1.patterns.recharge_method] || "나만의 고유한 충전 방식",
    description: s1.insights.find(i => i.title.includes("재충전") || i.title.includes("충전"))?.description || "에너지를 얻는 당신만의 특별한 방식입니다.",
    icon: "battery",
  });

  // Spec 2: Conflict Protocol (Section 2)
  const conflictMap: Record<string, string> = {
    competing: "직면 돌파형 프로토콜",
    avoiding: "평화 유지 프로토콜",
    accommodating: "배려와 수용 프로토콜",
    collaborating: "상생과 통합 프로토콜",
    compromising: "조율과 타협 프로토콜",
  };
  
  const conflictStyle = s2.analysis?.tki?.primaryStyle || "compromising";
  
  specs.push({
    label: "Conflict Protocol (갈등 해결)",
    value: conflictMap[conflictStyle] || "유연한 대처 방식",
    description: s2.insights?.conflict?.description || "갈등 상황에서 관계를 지키는 당신만의 알고리즘입니다.",
    icon: "wifi",
  });

  // Spec 3: Core Engine (Section 3)
  specs.push({
    label: "Core Engine (핵심 가치)",
    value: s3.topPositiveValue.aspect.label,
    description: s3.topPositiveValue.aspect.description,
    icon: "cpu",
  });

  // 3. Dealbreakers
  const dealbreakers = [
    {
      label: s3.topNegativeValue.aspect.label,
      description: `이것만큼은 절대 타협할 수 없는 '시스템 오류' 요인입니다. ${s3.topNegativeValue.aspect.description || ""}`,
    },
  ];

  // 4. User Guide (Dos & Donts)
  const dos = [
    s1.insights[0]?.tip || "혼자만의 시간을 충분히 가질 수 있도록 존중해주세요.",
    s2.insights?.apology?.tip || "미안하다는 말보다는 달라진 행동을 보여주는 것이 중요합니다.",
    `"${s3.topPositiveValue.aspect.label}"의 가치를 지켜줄 때 가장 큰 사랑을 느낍니다.`,
  ].filter(Boolean);

  const donts = [
    `"${s3.topNegativeValue.aspect.label}" 행동은 신뢰를 무너뜨리는 가장 빠른 길입니다.`,
    s1.patterns.stress_response === "avoidance" || s1.patterns.stress_response === "withdrawal" || s1.patterns.stress_response === "shutdown"
      ? "갈등 상황에서 억지로 대화를 강요하거나 재촉하지 마세요." 
      : "문제를 회피하거나 덮어두려고 하지 말고 솔직하게 이야기해주세요.",
  ];

  return {
    userName: "User",
    identity: {
      archetype,
      catchphrase: `"${s3.topPositiveValue.aspect.label}" 기반의 고성능 운영체제`,
      description: s3.insight || "당신은 당신 그대로 충분히 사랑받을 자격이 있습니다.",
      keywords,
      themeColor,
    },
    specs,
    dealbreakers,
    userGuide: {
      dos,
      donts,
    },
  };
}
