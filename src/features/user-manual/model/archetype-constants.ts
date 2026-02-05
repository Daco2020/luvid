import {
  Shield,
  MessageCircle,
  HandHeart,
  Home,
  Waves,
  TreeDeciduous,
  Umbrella,
  Smile,
  Hammer,
  Sun,
  Flame,
  Map,
  Telescope,
  Feather,
  Footprints,
  Scale,
  Gift,
  Sparkles,
  type LucideIcon,
} from "lucide-react";

/**
 * Archetype Icon Mapping
 * Maps archetype IDs to their corresponding Lucide icon components
 */
export const ARCHETYPE_ICONS: Record<string, LucideIcon> = {
  honesty: Shield,
  communication: MessageCircle,
  respect: HandHeart,
  stability: Home,
  emotional_regulation: Waves,
  independence: TreeDeciduous,
  empathy: Umbrella,
  humor: Smile,
  diligence: Hammer,
  positivity: Sun,
  passion: Flame,
  planning: Map,
  intellectual_curiosity: Telescope,
  sensitivity: Feather,
  proactiveness: Footprints,
  self_control: Scale,
  acceptance: Waves,
  consideration: Gift,
  default: Sparkles,
};

/**
 * Archetype Gradient Color Mapping
 * Maps archetype IDs to Tailwind CSS gradient class strings
 */
export const ARCHETYPE_GRADIENTS: Record<string, string> = {
  honesty: "from-emerald-500 to-teal-400",
  communication: "from-sky-400 to-blue-400",
  respect: "from-violet-500 to-purple-400",
  stability: "from-green-600 to-emerald-400",
  emotional_regulation: "from-teal-500 to-emerald-400",
  independence: "from-indigo-500 to-blue-400",
  empathy: "from-rose-400 to-pink-300",
  humor: "from-amber-400 to-orange-300",
  diligence: "from-slate-600 to-gray-400",
  positivity: "from-yellow-400 to-amber-300",
  passion: "from-red-500 to-rose-400",
  planning: "from-blue-600 to-indigo-400",
  intellectual_curiosity: "from-purple-600 to-violet-400",
  sensitivity: "from-pink-400 to-rose-300",
  proactiveness: "from-orange-500 to-amber-400",
  self_control: "from-slate-700 to-slate-500",
  acceptance: "from-teal-600 to-cyan-500",
  consideration: "from-pink-500 to-rose-400",
  default: "from-primary to-purple-400",
};

/**
 * Archetype Descriptions
 * Short descriptions for each archetype to be displayed in tooltips
 */
export const ARCHETYPE_DESCRIPTIONS: Record<string, string> = {
  honesty: "솔직하고 투명한 관계를 최우선으로 생각해요.",
  communication: "대화를 통해 서로를 깊이 이해하는 것을 중요하게 여겨요.",
  respect: "서로의 다름을 인정하고 존중하는 배려심이 깊어요.",
  stability: "변함없는 마음으로 곁을 지켜주는 든든한 버팀목이에요.",
  emotional_regulation: "감정의 파도를 유연하게 타며 평온함을 유지해요.",
  independence: "혼자만의 시간도 소중히 여기며 건강한 거리를 유지해요.",
  empathy: "상대방의 마음에 깊이 공감하고 위로가 되어줘요.",
  humor: "유쾌한 에너지로 주변을 밝게 만드는 분위기 메이커예요.",
  diligence: "성실하고 책임감 있는 태도로 신뢰를 주는 사람이에요.",
  positivity: "어떤 상황에서도 희망을 잃지 않는 긍정의 아이콘이에요.",
  passion: "사랑에 있어서는 누구보다 뜨겁고 열정적이에요.",
  planning: "꼼꼼하게 미래를 그리며 체계적으로 관계를 쌓아가요.",
  intellectual_curiosity: "새로운 것을 배우고 함께 성장하는 것을 즐겨요.",
  sensitivity: "섬세한 감수성으로 상대의 작은 변화도 놓치지 않아요.",
  proactiveness: "먼저 다가가고 표현하는 용기 있는 사랑을 해요.",
  self_control: "감정에 휩쓸리지 않고 이성적으로 판단하려 노력해요.",
  acceptance: "있는 그대로의 모습을 사랑하고 받아들일 줄 알아요.",
  consideration: "상대방의 입장에서 먼저 생각하는 세심한 배려가 돋보여요.",
  default: "당신만의 특별한 매력이 빛나는 사람이에요.",
};
