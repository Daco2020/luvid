import { UserManualStorage } from "./section1-schema";
import { TKI_DESCRIPTIONS, APOLOGY_DESCRIPTIONS } from "./section2-analyzer";
import { BASELINE_INSIGHTS, STRESS_INSIGHTS, RECOVERY_INSIGHTS } from "./section1-analyzer";
import { ConflictStyle, ApologyLanguage } from "./section2-schema";

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
    description: string; // Top Value 설명 + Vision
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
      apologySecondary?: DetailSpec; 
    };
  };
  dealbreakers: {
    label: string;
    description: string;
    rank: number;
  }[];
  coreValues: {
    label: string;
    description: string;
    rank: number;
  }[];
  userGuide: {
    dos: UserGuideItem[]; 
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
  stability: "편안한 휴식 같은 안식처",
  emotional_regulation: "고요한 내면의 항해사",
  independence: "단단한 뿌리를 내린 나무",
  empathy: "마음에 스며드는 다정한 비",
  humor: "미소를 피워내는 햇살",
  diligence: "변치 않는 성실함의 정원사",
  positivity: "희망을 노래하는 새",
  passion: "타오르는 열정의 불꽃",
  planning: "미래를 그리는 건축가",
  intellectual_curiosity: "깊은 지혜의 탐험가",
  sensitivity: "섬세한 감성의 시인",
  proactiveness: "먼저 손 내미는 용기",
  self_control: "균형 잡힌 삶의 조율사",
  acceptance: "넓은 바다 같은 포용자",
  consideration: "따뜻한 배려의 수호천사",
  default: "고유한 빛을 지닌 영혼",
};

// 미래 비전 매핑 (18개 가치관별 은유적 설명 + 미래상)
const VISION_MAP: Record<string, string> = {
  trust: "세상이 흔들려도 우리 둘 사이의 연결고리만큼은 절대 끊어지지 않는 단단함을 의미해요. 당신은 연인과 말하지 않아도 믿을 수 있는, 서로에게 가장 안전한 기지를 만들어가는 사람이에요.",
  honesty: "가면을 쓰고 애쓰기보다는, 솔직한 마음으로 마주 볼 때 가장 깊은 연결이 완성되는 법이죠. 당신은 사랑하는 연인과 어떤 순간에도 숨김없이, 있는 그대로의 모습을 아껴주는 진실된 관계를 경험할 거라 확신해요.",
  growth: "멈춰있는 관계보다는, 함께 손을 잡고 더 넓은 세상으로 나아갈 때 가슴이 뛰는 여정이에요. 당신은 연인과 서로의 꿈을 응원하며, 어제보다 더 나은 우리가 되는 멋진 팀을 만들어갈 거예요.",
  commitment: "비가 오나 눈이 오나 내 곁을 지켜줄 거라는 확신이야말로 마음의 평안을 주는 열쇠랍니다. 당신은 시간이 지날수록 더 깊어지는 신뢰 속에서, 연인에게 든든한 버팀목이 되어줄 수 있을 거예요.",
  communication: "마음에 담아둔 이야기들을 꺼내어 놓을 때마다 둘 사이의 거리가 한 뼘씩 가까워지는 마법과도 같아요. 당신은 연인과 대화할수록 서로를 더 깊이 이해하는 소울메이트로서 깊은 교감을 나누는 사람이에요.",
  respect: "서로를 소유하려 하기보다, 각자의 색깔을 있는 그대로 인정할 때 진정한 편안함이 깃들게 됩니다. 당신은 연인과 서로의 다름을 존중하고, 나답게 있을 때 가장 사랑받는 편안한 관계를 가꿔갈 것이라 믿어요.",
  stability: "밖에서 치열한 하루를 보내고 돌아왔을 때, 아무 말 없이 쉴 수 있는 안식처가 되어주는 것이 가장 중요해요. 당신은 연인에게 불안함 없이, 언제 돌아와도 따뜻하게 반겨주며 서로를 품어주는 쉼터가 되어줄 수 있어요.",
  emotional_regulation: "화가 나는 순간에도 나를 함부로 대하지 않는다는 믿음은 관계를 지탱하는 가장 큰 힘이 있어요. 당신은 연인과 어떤 상황에서도 서로의 상처를 따뜻하게 감싸주는 단단한 사랑을 할 수 있을 거예요.",
  independence: "서로에게 기대기만 하기보다는, 각자의 삶을 멋지게 가꾸며 서로를 빛내주는 것이 건강한 관계의 본질이에요. 당신은 연인과 따로 또 같이, 둘이 함께할 때 더 큰 시너지를 내는 멋진 파트너로서 서로의 성장을 이끌어줄 수 있어요.",
  empathy: "논리적인 해결책보다, '많이 힘들었지'라는 진심 어린 말 한마디가 하루를 구원하는 기적을 만들어요. 당신은 연인에게 말하지 않아도 마음을 알아주고, 슬픔은 나누고 기쁨은 배가 되는 따뜻한 사랑을 하게 될 거예요.",
  humor: "힘든 일이 있어도 가벼운 농담 한 마디로 툭툭 털어낼 수 있는 유쾌함은 삶의 큰 활력소가 되어줍니다. 당신은 매일 즐거운 친구 같은 연인으로서, 사랑하는 사람에게 웃음을 선물할 수 있어요.",
  diligence: "차곡차곡 쌓아올린 시간들이야말로 가장 단단한 사랑을 증명하는 확실한 증거예요. 당신은 연인과 한결같은 마음으로 서로를 아끼며, 시간이 흐를수록 더 깊어지는 신뢰를 쌓아갈 수 있는 사람이에요.",
  positivity: "불평보다는 감사를, 걱정보다는 희망을 이야기하는 태도는 주변을 밝게 비추는 빛과 같아요. 당신은 연인에게 어떤 어려움이 와도 웃음을 잃지 않고, 비타민 같은 존재로서 서로의 삶을 밝혀줄 거예요.",
  passion: "시간이 지나도 무뎌지지 않고, 매 순간 서로에게 설렘을 느끼며 살아있음을 확인하는 과정이에요. 당신은 연인과 식지 않는 열정으로, 늘 다채롭고 뜨거운 사랑을 만들어갈 수 있는 사람이에요.",
  planning: "같은 곳을 바라보며 발걸음을 맞추어 나가는 여정 그 자체가 사랑을 완성하는 길이라고 볼 수 있어요. 당신은 연인과 서로의 꿈을 현실로 만들어주며, 내일이 더 기대되는 든든한 파트너로서 꿈을 함께 이뤄갈 거예요.",
  intellectual_curiosity: "새로운 대화 주제가 샘솟고, 서로의 지적 세계를 넓혀줄 때 깊은 충만함이 차오르는 순간이에요. 당신은 마르지 않는 대화로 연인의 세상을 넓혀주고, 뮤즈가 되어 끊임없이 영감을 불어넣을 거예요.",
  sensitivity: "스쳐 지나갈 수 있는 찰나들도 소중하게 간직하며, 아름다운 추억으로 만드는 특별한 능력이나 다름없어요. 당신은 연인과 평범한 하루도 영화처럼 로맨틱하게, 서로의 감성을 채워주는 예술 같은 사랑을 하게 될 거예요.",
  proactiveness: "사랑 앞에서는 계산 없이 솔직하게 마음을 표현하는 용기가 마음을 가장 크게 움직이는 동력이 됩니다. 당신은 연인에게 먼저 다가가 사랑을 표현하며, 매일매일 확신을 주는 뜨거운 로맨스를 만들어가는 사람이에요.",
  self_control: "절제된 태도 속에 숨겨진 깊은 사려깊음은 관계에 가장 편안한 공기를 불어넣어 줘요. 당신은 연인과 서로의 삶을 존중하며 선을 지키는, 성숙하고 균형 잡힌 어른스러운 연애를 함께 해나갈 거예요.",
  acceptance: "비현실적인 완벽함을 강요받기보다, 있는 그대로의 나로 사랑받을 때 가장 큰 자유를 느끼게 마련이에요. 당신은 연인을 어떤 모습이든 판단하지 않고 품어주며, 든든한 내 편이 되어 언제나 지지해 줄 수 있어요.",
  consideration: "말하지 않아도 필요한 것을 먼저 알아채주는 다정한 배려에는 마음을 무장해제 시키는 힘이 있어요. 당신은 연인에게 사소한 부분까지 놓치지 않고 챙겨주며, 사랑받고 있음을 매 순간 느끼게 해 줄 거예요."
};

// 캐치프레이즈 매핑 (18개 가치관별 감성적 한 줄 카피)
const CATCHPHRASE_MAP: Record<string, string> = {
  trust: "시간이 흐를수록 깊이를 더해가는 단단한 마음",
  honesty: "가면 없이 마주할 때 비로소 완성되는 진심",
  growth: "함께 걷는 걸음마다 더 근사해지는 우리",
  commitment: "계절이 바뀌어도 변치 않는 온기",
  communication: "말보다 깊은 이해로 서로를 감싸 안는 순간",
  respect: "서로의 색깔을 있는 그대로 아껴주는 다정한 거리",
  stability: "가장 따뜻한 품에서 느끼는 완전한 평온",
  emotional_regulation: "폭풍우 속에서도 서로를 지키는 고요한 등대처럼",
  independence: "따로 또 같이, 서로를 더 빛나게 하는 완벽한 조화",
  empathy: "당신의 마음결을 가장 먼저 읽어주는 섬세한 사랑",
  humor: "함께 마주 보는 눈빛 속에 피어나는 유쾌한 웃음",
  diligence: "매일매일 더 깊어지는 정성으로 빚어낸 사랑",
  positivity: "어두운 밤에도 서로의 별이 되어주는 찬란한 빛",
  passion: "식지 않는 온도로 매 순간 서로를 설레게 하는 열정",
  planning: "같은 곳을 바라보며 함께 그려가는 설레는 내일",
  intellectual_curiosity: "대화할수록 더 넓어지는 우리라는 우주",
  sensitivity: "일상의 작은 틈새까지 낭만으로 채우는 마법. 당신의 섬세함은 세상을 더 아름답게 만들어요.", // sensitivity는 약간 길게, 아방가르드하게
  proactiveness: "망설임 없이 당신에게 닿는 가장 확실한 직진",
  self_control: "서로를 위해 기꺼이 맞추어가는 성숙한 배려",
  acceptance: "있는 그대로의 당신을 가장 따뜻하게 안아주는 품",
  consideration: "나보다 당신의 행복을 먼저 생각하는 마음",
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
  // independent, solitude check -> independent
  const themeColor = s1.patterns.recharge_method === "independent" ? "indigo" : "orange"; 

  const keywords = [
    s3.topPositiveValue.aspect.label,
    s2.analysis?.tki?.primaryStyle === "competing" ? "솔직함" : 
    s2.analysis?.tki?.primaryStyle === "collaborating" ? "함께 성장" : "다정한 배려",
  ];

  // Identity Description 생성
  const vision = VISION_MAP[coreValueKey] || "서로의 고유한 빛을 알아봐주며, 함께 있을 때 가장 나다워지는 사랑을 할 거예요.";
  const catchphrase = CATCHPHRASE_MAP[coreValueKey] || "당신만의 고유한 빛으로 물드는 사랑";
  const identityDescription = vision;

  // 2. Specs Mapping (요약)
  const specs: PsychologicalSpec[] = [];

  // [Spec 1] Energy
  specs.push({
    label: "마음의 휴식처",
    value: BASELINE_INSIGHTS[s1.patterns.recharge_method]?.title.replace("당신은 ", "").replace(" 사람이에요", "") || "나만의 고유한 충전 방식",
    description: BASELINE_INSIGHTS[s1.patterns.recharge_method]?.description || "지친 하루 끝에 배터리를 다시 채우는 가장 확실한 방법이에요.",
    icon: "battery",
  });

  // [Spec 2] Conflict
  const conflictStyle = (s2.analysis?.tki?.primaryStyle || "compromising") as ConflictStyle;
  
  specs.push({
    label: "갈등을 대하는 태도",
    value: TKI_DESCRIPTIONS[conflictStyle]?.title || "유연한 대처 방식",
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
    // Consolidated logic used in analyzer, so report uses analyzer's insights directly for title/desc.
    // However, guideDonts (line 270) uses raw pattern CHECK.


  const stressValRaw = s1.patterns.stress_response || "secure";
  const stressVal = (stressValRaw in STRESS_INSIGHTS) ? stressValRaw : "secure";

  // Comfort Language
  const comfortValRaw = s1.patterns.comfort_language || "connection";
  const comfortVal = (comfortValRaw in RECOVERY_INSIGHTS) ? comfortValRaw : "connection";

  // Coping Secondary Logic is removed as per user request
  // Instead, we use Apology Secondary
  
  // Apology Language
  const apologyPrimaryVal = s2.analysis!.apology!.primaryLanguage as ApologyLanguage;
  const apologyTitle = APOLOGY_DESCRIPTIONS[apologyPrimaryVal].title;
  const apologyDesc = APOLOGY_DESCRIPTIONS[apologyPrimaryVal].description;

  const apologySecondaryVal = s2.analysis?.apology?.secondaryLanguage as ApologyLanguage | undefined;


  // 4a. Core Values (Positive)
  const coreValues = (s3.top4PositiveValues && s3.top4PositiveValues.length > 0)
    ? s3.top4PositiveValues.map((item: any) => ({
        label: item.aspect.label,
        description: item.aspect.description || "당신이 가장 중요하게 생각하는 가치예요.",
        rank: item.rank
      }))
    : [
        {
          label: s3.topPositiveValue.aspect.label,
          description: s3.topPositiveValue.aspect.description || "당신이 가장 중요하게 생각하는 가치예요.",
          rank: 1
        }
      ];

  // 4b. Dealbreakers
  const dealbreakers = (s3.top4NegativeValues && s3.top4NegativeValues.length > 0)
    ? s3.top4NegativeValues.map((item: any) => ({
        label: item.aspect.label,
        description: `미래의 연인에게 마음이 가장 차갑게 식어버리는 순간이에요. ${item.aspect.description || ""}`,
        rank: item.rank
      }))
    : [
        {
          label: s3.topNegativeValue.aspect.label,
          description: `미래의 연인에게 마음이 가장 차갑게 식어버리는 순간이에요. ${s3.topNegativeValue.aspect.description || ""}`,
          rank: 1
        },
      ];

  // 5. User Guide (Dos & Donts)
  const guideDos: UserGuideItem[] = [];
  const guideDonts: UserGuideItem[] = [];

  // [Do 1] Comfort
  guideDos.push({
    title: "힘들어보일 땐 이렇게 해주세요",
    detailedExample: RECOVERY_INSIGHTS[comfortVal].description,
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
  if (s1.patterns.stress_response === "flight" || s1.patterns.stress_response === "freeze") {
    guideDonts.push({
      title: "혼자 있고 싶어 할 때",
      detailedExample: "제가 동굴로 들어갔을 때 억지로 대화를 시도하거나 문을 두드리지 말아주세요. 잠시 기다려주시면 스스로 충전하고 웃으며 나올 거예요.",
    });
  } else if (s1.patterns.stress_response === "anxious") {

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
      catchphrase,
      description: identityDescription,
      keywords,
      themeColor,
    },
    specs,
    details: {
      section1: {
        stress: {
          title: "스트레스가 찾아오면",
          value: STRESS_INSIGHTS[stressVal].title,
          description: STRESS_INSIGHTS[stressVal].description,
        },
        comfort: {
          title: "가장 필요한 위로",
          value: RECOVERY_INSIGHTS[comfortVal].title,
          description: RECOVERY_INSIGHTS[comfortVal].description,
        }
      },
      section2: {
        apology: {
          title: "마음이 풀리는 사과",
          value: apologyTitle,
          description: apologyDesc,
        },
        apologySecondary: apologySecondaryVal ? {
          title: "이런 사과도 좋아요",
          value: APOLOGY_DESCRIPTIONS[apologySecondaryVal].title,
          description: APOLOGY_DESCRIPTIONS[apologySecondaryVal].description,
        } : undefined,
      }
    },
    dealbreakers,
    coreValues,
    userGuide: {
      dos: guideDos,
      donts: guideDonts,
    },
  };
}
