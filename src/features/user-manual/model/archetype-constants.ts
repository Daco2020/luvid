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
