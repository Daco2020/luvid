"use client";

import { useEffect, useState, use } from "react";
import { useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import {
  ArrowLeft,
  Loader2,
  BookOpen,
  Copy,
  HeartHandshake,
  Info,
  Pencil,
  Share2
} from "lucide-react";
import { getLuvIdById } from "@/features/luvid/utils/supabase-service";
import { LuvIdProfile } from "@/features/luvid/model/types";
import { ARCHETYPE_ICONS, ARCHETYPE_GRADIENTS, ARCHETYPE_DESCRIPTIONS } from "@/features/user-manual/model/archetype-constants";
import { useToast } from "@/shared/hooks/useToast";
import { Toast } from "@/shared/components/Toast";
import { GlassTooltip } from "@/shared/components/ui/GlassTooltip";
import { CompatibilityFeature } from "@/features/luvid/components/CompatibilityFeature";
import { ShimmerEffect } from "@/shared/components/ui/ShimmerEffect";
import { LuvIdCard } from "@/features/luvid/components/LuvIdCard";

// Viewer Page for Luv ID
export default function SharedLuvIdPage({ params }: { params: Promise<{ id: string }> }) {
  const router = useRouter();
  const resolvedParams = use(params);
  const { toast, showToast } = useToast();
  
  const [profile, setProfile] = useState<LuvIdProfile | null>(null);
  const [loading, setLoading] = useState(true);
  const [flipped, setFlipped] = useState(false);
  const [activeTooltip, setActiveTooltip] = useState<number | null>(null);
  const [showArchetypeTooltip, setShowArchetypeTooltip] = useState(false);
  const [showIdTooltip, setShowIdTooltip] = useState(false);
  
  // This page is for viewing OTHER's Luv ID.
  const isOwner = false;

  useEffect(() => {
    async function loadProfile() {
      try {
        const id = resolvedParams.id;
        if (!id) {
          router.push("/");
          return;
        }

        const luvIdProfile = await getLuvIdById(id);

        if (!luvIdProfile) {
          showToast({
            title: "프로필을 찾을 수 없어요",
            description: "존재하지 않거나 삭제된 Luv ID입니다."
          });
          router.push("/");
          return;
        }

        setProfile(luvIdProfile);
      } catch (err) {
        console.error("Failed to load Luv ID:", err);
        showToast({
            title: "오류 발생",
            description: "프로필을 불러오는 중 문제가 발생했습니다."
        });
      } finally {
        setLoading(false);
      }
    }

    loadProfile();
  }, [resolvedParams.id, router, showToast]);

  // const copyLuvId = async (e: React.MouseEvent) => {
  //   e.stopPropagation();
  //   if (!profile) return;
  //   try {
  //     await navigator.clipboard.writeText(profile.id);
  //     showToast({
  //       title: "Luv ID가 복사되었어요!",
  //       description: "ID를 상대방에게 전달하면 당신과의 궁합을 볼 수 있어요."
  //     });
  //   } catch (err) {
  //     console.error("Failed to copy ID:", err);
  //   }
  // };

  if (loading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <Loader2 className="w-12 h-12 text-primary animate-spin mx-auto mb-4" />
          <p className="text-slate-600">Luv ID를 불러오는 중...</p>
        </div>
      </div>
    );
  }

  if (!profile) return null;

  if (!profile) return null;

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="sticky top-0 bg-background/80 backdrop-blur-lg border-b border-slate-100 z-10">
        <div className="max-w-2xl mx-auto px-6 py-4 flex items-center justify-between">
          <button
            onClick={() => router.push("/")}
            className="flex items-center gap-2 text-slate-600 hover:text-slate-800"
          >
            <ArrowLeft size={20} />
            <span className="font-medium">홈</span>
          </button>
          <button
            // onClick={handleShare}
            className="flex items-center gap-2 px-4 py-2 bg-slate-900 text-white rounded-full font-medium hover:bg-slate-800 transition-colors"
            style={{ visibility: "hidden" }}
          >
            <Share2 size={18} />
            <span>공유하기</span>
          </button>
          {/* Share Button Removed for Viewer */}
        </div>
      </div>

      <div className="max-w-2xl mx-auto px-6 py-12">
        {/* Title */}
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-slate-800 mb-2">
            {profile.nickname}님의<br />연애 프로필 카드
          </h1>
          <p className="text-slate-500">
            카드를 클릭하면 뒤집을 수 있어요
          </p>
        </div>

        <LuvIdCard
          profile={profile}
          isOwner={isOwner}
          flipped={flipped}
          setFlipped={setFlipped}
        />

        {/* Info Text */}
        <div className="text-center text-slate-500 text-sm">
          <p>이 카드는 {profile.nickname}님의 연애 정체성을 나타냅니다.</p>
          <p className="mt-1">{profile.nickname}님과 얼마나 잘 맞는지 확인해보세요.</p>
        </div>
      </div>

      {/* Toast */}
      <Toast message={toast} />

    </div>
  );
}
