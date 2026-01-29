import { UserManualStorage } from "./section1-schema";

// 리포트 데이터 구조
export interface PsychologicalSpec {
  label: string; 
  value: string; 
  description: string;
  icon: "battery" | "wifi" | "cpu" | "shield" | "star";
}

export interface DetailSpec {
  title: string;
  value: string;
  description: string;
}

export interface UserGuideItem {
  title: string;
  detailedExample: string;
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
  details: {
    section1: {
      stress: DetailSpec;
      comfort: DetailSpec;
    };
    section2: {
      apology: DetailSpec;
      conflictSecondary?: DetailSpec; 
    };
  };
  dealbreakers: {
    label: string;
    description: string;
  }[];
  userGuide: {
    dos: UserGuideItem[]; // 객체 배열로 변경
    donts: UserGuideItem[];
  };
}

// 아키타입 매핑 (감성적)
const ARCHETYPES: Record<string, string> = {
  trust: "흔들리지 않는 믿음의 닻",
  honesty: "투명한 진심의 전달자",
  growth: "끊임없이 피어나는 성장가",
  commitment: "변치 않는 약속의 수호자",
  communication: "마음과 마음을 잇는 가교",
  respect: "있는 그대로를 비추는 거울",
  stablility: "편안한 휴식 같은 안식처",
  default: "고유한 빛을 지닌 영혼",
};

export function generateUserManual(data: UserManualStorage): UserManualReport | null {
  if (!data.section1 || !data.section2 || !data.section3) {
    return null; 
  }

  const s1 = data.section1;
  const s2 = data.section2;
  const s3 = data.section3;

  // 1. Identity
  const coreValueKey = s3.topPositiveValue.aspect.id.split('_')[0]; 
  const archetype = ARCHETYPES[coreValueKey] || ARCHETYPES.default;
  const themeColor = s1.patterns.recharge_method === "solitude" ? "indigo" : "orange"; 

  const keywords = [
    s3.topPositiveValue.aspect.label,
    s2.analysis?.tki?.primaryStyle === "competing" ? "솔직함" : 
    s2.analysis?.tki?.primaryStyle === "collaborating" ? "함께 성장" : "다정한 배려",
  ];

  // 2. Specs Mapping (요약)
  const specs: PsychologicalSpec[] = [];

  // [Spec 1] Energy
  const rechargeMap: Record<string, string> = {
    solitude: "나만의 동굴이 필요한 사람 (고독형)",
    intimacy: "깊은 대화가 필요한 사람 (친밀형)",
    close_friends: "소수 정예와 함께할 때 (친밀형)",
    expression: "속마음을 털어놓아야 하는 사람 (표현형)",
    social: "사람들 속에서 빛나는 사람 (사교형)",
    activity: "몸을 움직여야 살아나는 사람 (활동형)",
    physiological: "감각적인 환기가 필요한 사람 (신체형)",
    sensory: "편안한 감각에 머물고픈 사람 (감각형)",
    space: "혼자만의 공간이 필수인 사람 (독립형)",
  };
  
  specs.push({
    label: "마음의 휴식처",
    value: rechargeMap[s1.patterns.recharge_method] || "나만의 고유한 충전 방식",
    description: "지친 하루 끝에 배터리를 다시 채우는 가장 확실한 방법이에요.",
    icon: "battery",
  });

  // [Spec 2] Conflict
  const conflictMap: Record<string, string> = {
    competing: "피하지 않고 직면하는 용기",
    avoiding: "평화를 위해 잠시 물러나는 신중함",
    accommodating: "상대를 위해 먼저 맞춰주는 다정함",
    collaborating: "함께 더 나은 답을 찾는 지혜",
    compromising: "적절한 균형을 찾는 유연함",
  };
  const conflictDescMap: Record<string, string> = {
    competing: "자신의 의견을 솔직하게 말하는 것이 문제 해결의 시작이라고 믿어요.",
    avoiding: "갈등이 격해지기 전에 잠시 멈춰서 생각할 시간을 갖는 편이에요.",
    accommodating: "관계의 평화를 위해서라면 내가 조금 양보하는 게 낫다고 생각해요.",
    collaborating: "서로가 모두 만족할 수 있는 최선의 방법을 찾기 위해 끝까지 대화해요.",
    compromising: "서로 한 발자국씩 물러나서 타협점을 찾는 것이 가장 현실적이라고 생각해요.",
  };
  
  const conflictStyle = s2.analysis?.tki?.primaryStyle || "compromising";
  
  specs.push({
    label: "갈등을 대하는 태도",
    value: conflictMap[conflictStyle] || "유연한 대처 방식",
    description: "미래의 연인과 다툴 때, 무의식적으로 나오게 되는 태도랍니다.",
    icon: "wifi",
  });

  // [Spec 3] Core Value
  specs.push({
    label: "가장 소중한 가치",
    value: s3.topPositiveValue.aspect.label,
    description: "미래의 연애에서 이것만큼은 절대적으로 지켜지길 바라는 기준이에요.",
    icon: "cpu",
  });

  // 3. Details Mapping (심층 분석)
  
  // Stress Response
  const stressMap: Record<string, string> = {
    acceptance: "있는 그대로 받아들여요",
    anxiety: "조금 불안해하며 확인받고 싶어 해요",
    independence: "혼자서 해결하려고 해요",
    avoidance: "잠시 상황을 피하고 싶어 해요",
    withdrawal: "마음의 문을 닫고 숨고 싶어 해요",
    shutdown: "생각이 멈추고 얼어붙어요",
    mobilization: "해결하기 위해 에너지를 쏟아요",
    defensiveness: "자신을 보호하려고 방어적으로 변해요",
  };
  const stressDescMap: Record<string, string> = {
    acceptance: "상황을 부정하기보다는, '그럴 수도 있지' 하고 차분하게 현실을 바라보는 편이에요.",
    anxiety: "혹시 내가 실수한 건 아닐까 걱정하며, 그 사람의 마음이 변치 않았는지 확인받고 싶어 한답니다.",
    independence: "누군가에게 기대기보다는, 스스로 상황을 통제하고 해결할 때 마음이 편안해져요.",
    avoidance: "감당하기 힘든 감정이 몰려오면, 일단 잠시 스위치를 끄고 거리를 두고 싶어져요.",
    withdrawal: "상처받지 않기 위해 마음 깊은 곳 안전한 동굴로 숨어버리는 경향이 있어요.",
    shutdown: "너무 큰 스트레스 앞에서는 머릿속이 하얗게 되고, 아무 말도 할 수 없게 되어버려요.",
  };

  const stressVal = s1.patterns.stress_response || "acceptance";

  // Comfort Language
  const comfortMap: Record<string, string> = {
    listening: "조용히 내 편이 되어 들어주기",
    physical_touch: "따뜻한 온기로 안아주기",
    distraction: "맛있는 거 먹으러 가기",
    space: "혼자만의 시간 존중해주기",
    act_of_service: "내가 힘든 일을 대신 해결해주기",
    respecting_space: "재촉하지 않고 기다려주기",
  };
  const comfortDescMap: Record<string, string> = {
    listening: "해결책을 주지 않아도 괜찮아요. 그저 끄덕이며 '그랬구나' 하고 내 편이 되어줄 때 가장 위로받아요.",
    physical_touch: "백 마디 말보다, 조용히 손을 잡아주거나 안아주는 행동이 불안했던 마음을 녹여줘요.",
    distraction: "우울한 기분에서 억지로 끄집어내기보다, 맛있는 걸 먹거나 산책하며 기분을 환기시켜 주는 게 좋아요.",
    space: "스스로 감정을 정리할 때까지 재촉하지 않고 기다려주는 것이, 저에게는 최고의 위로랍니다.",
    act_of_service: "말보다 행동으로! 내가 짊어진 짐을 대신 덜어주고 문제를 해결해줄 때 깊은 사랑을 느껴요.",
  };

  const comfortVal = s1.patterns.comfort_language || "listening";

  // Conflict Secondary (2순위)
  let conflictSecondarySpec: DetailSpec | undefined;
  if (s2.analysis?.tki?.secondaryStyle) {
    const secondaryStyle = s2.analysis.tki.secondaryStyle;
    conflictSecondarySpec = {
      title: "상황에 따라서는",
      value: conflictMap[secondaryStyle],
      description: conflictDescMap[secondaryStyle] || "이런 모습도 보일 수 있어요.",
    };
  }

  // Apology Language
  const apologyInsight = s2.insights?.apology;
  const apologyTitle = apologyInsight?.title || "진심이 담긴 사과";
  const apologyDesc = apologyInsight?.description 
    ? apologyInsight.description.replace(/입니다\./g, "이에요.").replace(/합니다\./g, "해요.") 
    : "상처받은 마음을 어루만져주는 진솔한 대화가 필요해요.";

  
  // 4. Dealbreakers
  const dealbreakers = [
    {
      label: s3.topNegativeValue.aspect.label,
      description: `미래의 연인에게 마음이 가장 차갑게 식어버리는 순간이에요. ${s3.topNegativeValue.aspect.description?.replace(/합니다\./g, "해요.") || ""}`,
    },
  ];

  // 5. User Guide (Dos & Donts) - Future Oriented + Scenario Based
  const guideDos: UserGuideItem[] = [];
  const guideDonts: UserGuideItem[] = [];

  // [Do 1] Comfort
  guideDos.push({
    title: "힘들어보일 땐 이렇게 해주세요",
    detailedExample: comfortDescMap[comfortVal] || "따뜻하게 위로해주세요.",
  });

  // [Do 2] Apology
  guideDos.push({
    title: "사과할 상황이 생긴다면",
    detailedExample: `변명보다는 진심을 담아 이야기해주세요. ${apologyTitle} 방식의 사과라면 저는 금방 마음을 열 거예요.`,
  });

  // [Do 3] Core Value Positive
  guideDos.push({
    title: "가장 사랑받는다고 느낄 때",
    detailedExample: `평소에 "${s3.topPositiveValue.aspect.label}"라는 가치를 소중히 여기는 모습을 보여주세요. 그럴 때 저는 당신에게 깊은 신뢰를 느껴요.`,
  });

  // [Dont 1] Core Value Negative
  guideDonts.push({
    title: "이것만큼은 정말 참을 수 없어요",
    detailedExample: `"${s3.topNegativeValue.aspect.label}" 같은 행동은 제 신뢰를 한순간에 무너뜨릴 수 있어요. 아무리 화가 나도 이것만은 지켜주세요.`,
  });

  // [Dont 2] Stress Response
  if (s1.patterns.stress_response === "avoidance" || s1.patterns.stress_response === "withdrawal") {
    guideDonts.push({
      title: "혼자 있고 싶어 할 때",
      detailedExample: "제가 동굴로 들어갔을 때 억지로 대화를 시도하거나 문을 두드리지 말아주세요. 잠시 기다려주시면 스스로 충전하고 웃으며 나올 거예요.",
    });
  } else if (s1.patterns.stress_response === "anxiety") {
    guideDonts.push({
      title: "연락이 닿지 않을 때",
      detailedExample: "제가 불안해할 때 연락을 뚝 끊거나 잠수를 타버리는 건 정말 힘들어요. 바쁘다면 '바빠서 나중에 연락할게' 한 마디면 충분해요.",
    });
  } else {
    guideDonts.push({
      title: "제가 예민해져 있을 때",
      detailedExample: "스트레스를 받을 때 저를 다그치거나 논리적으로 분석하려 하지 말아주세요. 지금은 해결책보다 공감이 필요한 순간이에요.",
    });
  }

  // [Dont 3] Conflict Caution (Gottman or Primary Style Caution)
  const conflictCautionMap: Record<string, string> = {
    competing: "제 의견이 강해 보일 때, 무조건 맞서 싸우려 하기보다는 '너는 그렇게 생각하는구나' 하고 한 템포 쉬어가주세요. 불같이 화냈다가도 금방 가라앉을 거예요.",
    avoiding: "제가 갈등을 피하려고 할 때, 비겁하다며 몰아붙이지 말아주세요. 저는 관계가 깨지는 게 두려워서 그러는 거랍니다.",
    accommodating: "제가 '다 괜찮아'라고 할 때, 정말 괜찮은지 한 번 더 물어봐주세요. 참고 있다가 나중에 터질 수도 있거든요.",
    collaborating: "모든 문제를 완벽하게 해결해야 한다고 압박하지 말아주세요. 가끔은 그냥 넘어가주는 여유도 필요해요.",
    compromising: "애매하게 대충 합의하고 끝내려 하지 말아주세요. 확실한 결론이 나지 않으면 저는 계속 찜찜해할 수 있어요.",
  };
  
  if (s2.analysis?.gottman?.riskLevel === "danger" || s2.analysis?.gottman?.riskLevel === "caution") {
    guideDonts.push({
      title: "싸움이 격해질 때",
      detailedExample: "제가 감정적으로 반응하더라도 비난이나 경멸의 말로 상처 주지 말아주세요. 화가 난 게 아니라 마음이 다친 거랍니다.",
    });
  } else {
    guideDonts.push({
      title: "우리가 다툴 때",
      detailedExample: conflictCautionMap[conflictStyle] || "제가 고집을 부리더라도 조금만 너그럽게 이해해주세요.",
    });
  }

  return {
    userName: "User",
    identity: {
      archetype,
      catchphrase: `"${s3.topPositiveValue.aspect.label}"에서 시작되는 사랑`,
      description: s3.insight ? s3.insight.replace(/입니다\./g, "이에요.").replace(/합니다\./g, "해요.") : "당신은 당신 그대로 충분히 사랑받을 자격이 있는 사람이에요.",
      keywords,
      themeColor,
    },
    specs,
    details: {
      section1: {
        stress: {
          title: "스트레스가 찾아오면",
          value: stressMap[stressVal] || stressVal,
          description: stressDescMap[stressVal] || "나도 모르게 스스로를 보호하려는 본능적인 반응이 튀어나와요.",
        },
        comfort: {
          title: "가장 필요한 위로",
          value: comfortMap[comfortVal] || comfortVal,
          description: comfortDescMap[comfortVal] || "당신의 언어로 위로받을 때 얼어붙은 마음이 사르르 녹아내려요.",
        }
      },
      section2: {
        apology: {
          title: "마음이 풀리는 사과",
          value: apologyTitle,
          description: apologyDesc,
        },
        conflictSecondary: conflictSecondarySpec,
      }
    },
    dealbreakers,
    userGuide: {
      dos: guideDos,
      donts: guideDonts,
    },
  };
}
