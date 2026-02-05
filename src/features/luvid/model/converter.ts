import { UserManualReport } from "../../user-manual/model/report";
import { LuvIdProfile, generateLuvId } from "../model/types";

/**
 * 나 사용 설명서 → Luv ID 프로필 변환
 */
export function createLuvIdFromReport(
  userId: string,
  reportId: string,
  report: UserManualReport,
  nickname?: string
): LuvIdProfile {
  // Tagline 자동 생성 (아키타입 설명 기반)
  const tagline = generateTagline(report);
  
  // 에너지 레벨 계산 (독립성 기반)
  const energyLevel = calculateEnergyLevel(report);
  
  return {
    id: generateLuvId(),
    userId,
    reportId,
    
    nickname: nickname || report.userName,
    tagline,
    
    archetype: report.identity.archetype,
    archetypeId: report.identity.archetypeId,
    themeColor: report.identity.themeColor,
    
    topValues: report.coreValues.slice(0, 3),
    
    loveStyle: report.identity.archetype,
    energyLevel,
    
    communicationStyle: {
      type: report.specs[1].value,
      description: report.specs[1].description
    },
    
    conflictStyle: {
      type: report.specs[1].value,
      description: report.specs[1].description
    },
    
    comfortNeeds: {
      type: report.details.section1.comfort.value,
      description: report.details.section1.comfort.description
    },
    
    apologyStyle: {
      primary: report.details.section2.apology.value,
      secondary: report.details.section2.apologySecondary?.value || report.details.section2.apology.value
    },
    
    dealbreakers: report.dealbreakers.slice(0, 3),
    
    createdAt: new Date(),
    updatedAt: new Date()
  };
}

/**
 * Tagline 자동 생성
 * 아키타입의 핵심 키워드를 활용한 한 줄 소개
 */
function generateTagline(report: UserManualReport): string {
  const keywords = report.identity.keywords;
  const archetype = report.identity.archetype;
  
  // 키워드 조합으로 자연스러운 문장 생성
  if (keywords.length >= 2) {
    return `${keywords[0]}과 ${keywords[1]}로 사랑하는 ${archetype}`;
  } else if (keywords.length === 1) {
    return `${keywords[0]}로 가득한 ${archetype}`;
  } else {
    return archetype;
  }
}

/**
 * 에너지 레벨 계산
 * 독립성 vs 친밀감 선호도 기반 (0-100)
 */
function calculateEnergyLevel(report: UserManualReport): number {
  const restType = report.specs[0].value;
  
  // "혼자서도 괜찮아! 독립형" → 낮은 에너지 (충전 필요)
  if (restType.includes('독립') || restType.includes('혼자')) {
    return 40;
  }
  // "함께 있을 때 힘이 나! 관계형" → 높은 에너지
  else if (restType.includes('함께') || restType.includes('관계')) {
    return 85;
  }
  // 기타
  return 60;
}
