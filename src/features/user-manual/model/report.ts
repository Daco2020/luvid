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
        description: item.aspect.description,
        rank: item.rank
      }))
    : [
        {
          label: s3.topPositiveValue.aspect.label,
          description: s3.topPositiveValue.aspect.description,
          rank: 1
        }
      ];

  // 4b. Dealbreakers
  const dealbreakers = (s3.top4NegativeValues && s3.top4NegativeValues.length > 0)
    ? s3.top4NegativeValues.map((item: any) => ({
        label: item.aspect.label,
        description: item.aspect.description,
        rank: item.rank
      }))
    : [
        {
          label: s3.topNegativeValue.aspect.label,
          description: s3.topNegativeValue.aspect.description,
          rank: 1
        },
      ];

  // 5. User Guide (Dos & Donts)
  const guideDos: UserGuideItem[] = [];
  const guideDonts: UserGuideItem[] = [];


  // [Map 1] Comfort NVC Map
  const comfortNVC: Record<string, string> = {
    space: `"지금 감정이 벅차서 정리가 필요해. 여기서 재촉하면 더 힘들어질 것 같아. 조금만 기다려주면 내가 먼저 다가갈게."`,
    connection: `"지금 마음이 너무 힘들어... 해결책을 찾기보다 그냥 따뜻하게 안아줬으면 좋겠어. 네 품에 있으면 안심이 될 것 같아."`,
    sensory: `"기분이 가라앉아서 몸도 무거운 것 같아. 맛있는 거 먹거나 바람 쐬러 갈까? 감각이 편안해지면 기분도 나아질 거야."`,
    solution: `"이 문제 때문에 머리가 너무 복잡하고 답답해. 막연한 위로보다는 현실적인 해결책을 같이 찾아줄래? 그래야 안심할 수 있어."`,
  };

  // [Map 2] Apology NVC Map
  const apologyNVC: Record<string, string> = {
    expressing_regret: `"변명부터 들으면 내 마음이 풀리지 않아. 진심으로 '미안해'라고 먼저 말해줘. 그 한마디면 충분해."`,
    accepting_responsibility: `"잘못을 모호하게 넘기면 나를 이해 못 하는 것 같아 답답해. 구체적으로 뭘 잘못했는지 인정해줘. 그래야 네가 내 마음을 안다고 느낄 수 있어."`,
    making_restitution: `"말뿐인 사과는 진심이 느껴지지 않아서 서운해. 행동으로 보여주거나 내 기분을 풀어주려는 노력을 해줘."`,
    genuinely_repenting: `"같은 일이 반복될까 봐 불안해... 다시는 그러지 않겠다는 확실한 약속을 해줘. 너의 의지를 보여줘야 다시 믿을 수 있어."`,
    requesting_forgiveness: `"사과가 충분했다면, 이제 나에게 용서를 구하고 기다려줘. 내가 마음을 열 때까지 재촉하지 말아줘."`,
  };

  // [Map 3] Core Value NVC Map (18 Match IDs)
  type ValueGuide = { do: string; dont: string };
  const valueGuideMap: Record<string, ValueGuide> = {
    honesty: {
      do: `"네가 솔직하게 모든 걸 이야기해줄 때, 우리가 정말 연결되어 있다고 느껴. 숨김없이 투명하게 대해줘."`,
      dont: `"거짓말을 알게 되면 신뢰가 무너져서 너무 불안해... 제발 작은 거라도 나한테는 솔직해줘."`
    },
    consideration: {
      do: `"네가 나를 먼저 배려해서 챙겨줄 때, 내가 소중한 존재라고 느껴. 그 따뜻한 마음 항상 간직해줘."`,
      dont: `"나를 배려하지 않고 행동하면, 내가 존중받지 못하는 것 같아 상처받아. 내 입장을 한 번만 더 생각해줄래?"`
    },
    communication: {
      do: `"대화가 잘 통하는 너와 있을 때 정말 행복해. 우리 사이에 오해가 없도록 항상 많이 이야기하자."`,
      dont: `"대화를 피하거나 입을 닫아버리면, 벽이랑 이야기하는 것 같아 너무 답답해. 문제가 생기면 꼭 대화로 풀자."`
    },
    respect: {
      do: `"나를 깊이 존중해주는 너의 태도에서 큰 사랑을 느껴. 서로를 귀하게 여기는 마음 변치 말자."`,
      dont: `"나를 무시하거나 함부로 대하면, 마음이 닫혀버려. 서로에 대한 존중은 꼭 지켜줘."`
    },
    emotional_regulation: {
      do: `"네가 감정을 차분하게 다스릴 때, 나도 덩달아 마음이 편안해져. 너의 그 안정감이 참 좋아."`,
      dont: `"감정을 주체하지 못하고 폭발하면, 나는 너무 불안하고 무서워... 화가 나도 조금만 차분하게 말해줘."`
    },
    independence: {
      do: `"서로의 독립성을 인정해줄 때, 우리 관계가 더 건강하다고 느껴. 각자의 시간도 소중히 여기자."`,
      dont: `"나에게 지나치게 의존하거나 집착하면 숨이 막혀... 가끔은 혼자만의 시간도 필요해."`
    },
    empathy: {
      do: `"내 감정에 깊이 공감해줄 때 정말 큰 위로를 받아. 앞으로도 내 마음을 잘 알아줘."`,
      dont: `"내 이야기에 무관심하거나 감정을 무시하면, 혼자 있는 기분이 들어. 내 마음을 조금만 더 헤아려줄래?"`
    },
    humor: {
      do: `"너랑 있으면 웃음이 끊이질 않아서 너무 행복해. 유머 감각 넘치는 네가 참 좋아."`,
      dont: `"너무 진지해서 농담도 안 통하면 숨이 막혀... 가끔은 가볍게 웃어넘길 줄도 알았으면 해."`
    },
    diligence: {
      do: `"맡은 일을 성실하게 해내는 네 모습이 정말 존경스러워. 꾸준히 노력하는 널 항상 응원할게."`,
      dont: `"게으르거나 무책임한 모습을 보면 실망하게 돼... 성실한 태도를 보여줬으면 좋겠어."`
    },
    positivity: {
      do: `"너의 긍정적인 에너지가 나를 힘나게 해. 힘들 때마다 밝은 웃음으로 나를 비춰줘."`,
      dont: `"매사에 부정적이거나 불평만 하면 나까지 힘이 빠져... 우리 밝은 면을 보려고 노력하자."`
    },
    passion: {
      do: `"무언가에 열중하는 네 눈빛이 정말 섹시해. 꿈을 향해 달려가는 너의 열정을 사랑해."`,
      dont: `"무기력하게 하루하루를 보내는 모습은 매력 없어... 네가 좋아하는 일에 더 몰입했으면 해."`
    },
    planning: {
      do: `"미래를 계획하고 준비하는 네가 참 듬직해. 우리 함께 멋진 미래를 그려나가자."`,
      dont: `"아무런 계획 없이 즉흥적으로만 행동하면 불안해... 최소한의 계획은 같이 세워줘."`
    },
    intellectual_curiosity: {
      do: `"새로운 것을 배우고 탐구하는 네 모습이 멋져. 우리 깊이 있는 대화를 많이 나누자."`,
      dont: `"배움에 관심이 없고 대화가 통하지 않으면 지루해... 우리 서로 성장할 수 있는 관계가 되자."`
    },
    sensitivity: {
      do: `"나의 감성을 이해해주고 함께 느껴줄 때 행복해. 예쁜 것들 많이 보고 느끼며 살자."`,
      dont: `"내 감성을 이해하지 못하고 핀잔을 주면 서운해... 나의 이런 점도 사랑해줄래?"`
    },
    stability: {
      do: `"변함없이 내 곁을 지켜주는 너에게서 큰 안정을 얻어. 흔들리지 않는 나무처럼 늘 그 자리에 있어줘."`,
      dont: `"감정 기복이 심하거나 불안정한 모습은 나를 힘들게 해... 내가 기댈 수 있게 든든한 버팀목이 되어줘."`
    },
    proactiveness: {
      do: `"먼저 다가와주고 이끌어주는 네 적극성이 좋아. 사랑 앞에서도 망설이지 말고 직진해줘."`,
      dont: `"항상 내가 먼저 하기를 기다리는 수동적인 태도는 지쳐... 네가 먼저 표현해주면 좋겠어."`
    },
    self_control: {
      do: `"자신을 잘 통제하고 절제하는 어른스러운 네가 좋아. 흔들리지 않는 그 모습 계속 지켜줘."`,
      dont: `"욕구를 참지 못하고 충동적으로 행동하면 믿음이 안 가... 조금만 더 자제력을 발휘해줘."`
    },
    acceptance: {
      do: `"나를 있는 그대로 받아주는 너의 넓은 마음이 고마워. 너 앞에선 내가 온전해지는 기분이야."`,
      dont: `"내 모습을 있는 그대로 봐주지 않고 바꾸려 하면 힘들어... 나를 있는 그대로 이해하고 안아줘."`
    }
  };

  // [Do 1] Comfort
  guideDos.push({
    title: "내가 힘들어 보일 땐",
    detailedExample: comfortNVC[comfortVal] || comfortNVC.connection,
  });

  // [Do 2] Apology
  const apologyText = apologyNVC[apologyPrimaryVal] || apologyNVC.expressing_regret;
  guideDos.push({
    title: "사과할 상황이 생긴다면",
    detailedExample: apologyText,
  });

  // [Do 3] Core Value Positive
  const topPosId = s3.topPositiveValue.coreValueId;
  const posGuide = valueGuideMap[topPosId];

  guideDos.push({
    title: "이럴 때 사랑받는다고 느껴",
    detailedExample: posGuide.do,
  });

  // [Dont 1] Core Value Negative
  const topNegId = s3.topNegativeValue.coreValueId;
  const negGuide = valueGuideMap[topNegId];

  guideDonts.push({
    title: "이것만큼은 참기 힘들어",
    detailedExample: negGuide.dont,
  });

  // [Dont 2] Stress Response (NVC + Casual)
  if (s1.patterns.stress_response === "flight" || s1.patterns.stress_response === "freeze") {
    guideDonts.push({
      title: "내가 혼자 있고 싶어 할 때",
      detailedExample: `"내가 동굴로 들어가면 걱정되겠지만, 혼자만의 시간이 조금 필요할 뿐이야. 충전하고 웃으면서 돌아올 테니까 기다려줘."`,
    });
  } else if (s1.patterns.stress_response === "anxious") {
    guideDonts.push({
      title: "내가 연락이 닿지 않을 때",
      detailedExample: `"연락이 안 되면 나쁜 상상이 들어서 너무 불안해... 아무리 바빠도 '바빠'라고 짧게라도 카톡 하나만 남겨줘."`,
    });
  } else if (s1.patterns.stress_response === "fight") {
    guideDonts.push({
      title: "내가 흥분했을 때",
      detailedExample: `"내가 흥분해서 목소리가 커지면, 같이 화내지 말고 잠시만 멈춰줘. 나도 마음을 진정시키고 차분하게 얘기하고 싶어."`,
    });
  } else {
    guideDonts.push({
      title: "내가 예민해져 있을 때",
      detailedExample: `"내가 예민할 땐 논리적으로 따지기보다 내 마음을 먼저 읽어줘. 지금 나한테 필요한 건 해결책이 아니라 너의 공감이야."`,
    });
  }

  // [Dont 3] Conflict Caution (NVC + Casual)
  const conflictCautionMap: Record<string, string> = {
    competing: `"내 말이 날카롭게 들릴 땐 공격받는다고 느끼지 말고, '너는 그렇게 생각하는구나' 하고 한 번만 받아줘. 그러면 나도 금방 진정될 거야."`,
    avoiding: `"내가 입을 다물고 피하면 답답하겠지만, 싸워서 우리 사이가 나빠질까 봐 겁이 나서 그래. 비겁하다고 몰아세우지 말고 조금만 기다려줘."`,
    accommodating: `"내가 무조건 '괜찮아'라고 하면, 정말 괜찮은 건지 한 번 더 물어봐줘. 너를 배려하느라 꾹 참고 있는 걸 수도 있어."`,
    collaborating: `"모든 걸 완벽하게 풀려고 하면 내가 너무 지쳐... 가끔은 '대충 넘어가도 괜찮아'라고 말해줘. 그런 여유가 필요해."`,
    compromising: `"적당히 얼버무리고 끝내면, 나중에 또 문제가 될까 봐 찝찝해. 확실하게 매듭을 짓고 넘어가도록 도와줘."`,
  };
  
  // [Gottman NVC Map]
  const gottmanNVC: Record<string, string> = {
    criticism: `"네가 나를 비난하거나 공격적인 말투로 대하면 마음이 너무 아파. 부드럽게 말해줘도 충분히 알아들을 수 있으니까, 조금만 더 존중해줘."`,
    defensiveness: `"내 말을 듣지 않고 변명부터 하면, 내 마음이 받아들여지지 않는 것 같아서 답답해. 억울하더라도 일단은 '그랬구나' 하고 내 얘기를 먼저 들어줄래?"`,
    contempt: `"나를 무시하거나 비웃는 태도를 볼 때면, 나 자신이 하찮게 느껴져서 정말 큰 상처를 받아. 우리 서로를 소중한 존재로 존중해줬으면 좋겠어."`,
    stonewalling: `"아무 말 없이 대화를 끊어버리면, 거절당하는 기분이 들어서 너무 불안해. 힘들면 그냥 무시하지 말고 '생각할 시간이 필요해'라고 말해줄래?"`,
  };

  if (s2.analysis?.gottman?.riskLevel === "danger" || s2.analysis?.gottman?.riskLevel === "caution") {
    const pattern = s2.analysis.gottman.dominantPattern;
    guideDonts.push({
      title: "우리의 싸움이 격해질 때",
      detailedExample: gottmanNVC[pattern],
    });
  } else {
    guideDonts.push({
      title: "우리가 다툴 때",
      detailedExample: conflictCautionMap[conflictStyle],
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
