"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import {
  ArrowLeft,
  Share2,
  Loader2,
  BookOpen,
  Copy,
  HeartHandshake,
  Info,
  Pencil
} from "lucide-react";
import { getOrCreateUserId } from "@/shared/utils/user-storage";
import { getLuvIdByUserId } from "@/features/luvid/utils/supabase-service";
import { LuvIdProfile } from "@/features/luvid/model/types";
import { ARCHETYPE_ICONS, ARCHETYPE_GRADIENTS, ARCHETYPE_DESCRIPTIONS } from "@/features/user-manual/model/archetype-constants";
import { useToast } from "@/shared/hooks/useToast";
import { Toast } from "@/shared/components/Toast";
import { GlassTooltip } from "@/shared/components/ui/GlassTooltip";
import { CompatibilityFeature } from "@/features/luvid/components/CompatibilityFeature";
import { NicknameEditModal } from "@/features/luvid/components/NicknameEditModal";
import { saveMyLuvIdToStorage } from "@/features/luvid/utils/luvid-storage";
import { ShimmerEffect } from "@/shared/components/ui/ShimmerEffect";
import { LuvIdCard } from "@/features/luvid/components/LuvIdCard";

export default function MyLuvIdPage() {
  const router = useRouter();
  const { toast, showToast } = useToast();
  const [profile, setProfile] = useState<LuvIdProfile | null>(null);
  const [loading, setLoading] = useState(true);
  const [flipped, setFlipped] = useState(false);
  const [activeTooltip, setActiveTooltip] = useState<number | null>(null);
  const [showArchetypeTooltip, setShowArchetypeTooltip] = useState(false);
  const [showNicknameModal, setShowNicknameModal] = useState(false);
  const [showIdTooltip, setShowIdTooltip] = useState(false);
  
  // This page is for "My" Luv ID, so it's always the owner viewing their own card.
  // In a future "View" page for other users, we would set this to false.
  const isOwner = true;

  useEffect(() => {
    async function loadProfile() {
      try {
        const userId = getOrCreateUserId();
        const luvIdProfile = await getLuvIdByUserId(userId);

        if (!luvIdProfile) {
          router.push("/luvid/create");
          return;
        }

        setProfile(luvIdProfile);
        
        // Save Luv ID to localStorage for compatibility modal
        saveMyLuvIdToStorage(luvIdProfile.id);
      } catch (err) {
        console.error("Failed to load Luv ID:", err);
      } finally {
        setLoading(false);
      }
    }

    loadProfile();
  }, [router]);

  const handleShare = async () => {
    if (!profile) return;

    try {
      const shareUrl = `${window.location.origin}/luvid/view/${profile.id}`;
      await navigator.clipboard.writeText(shareUrl);
      showToast({
        title: "링크가 복사되었어요!",
        description: "이 링크를 공유하면 상대방이 당신의 Luv ID를 볼 수 있어요."
      });
    } catch (err) {
      console.error("Failed to copy:", err);
    }
  };

  const copyLuvId = async (e: React.MouseEvent) => {
    e.stopPropagation();
    if (!profile) return;
    try {
      await navigator.clipboard.writeText(profile.id);
      showToast({
        title: "Luv ID가 복사되었어요!",
        description: "ID를 상대방에게 전달하면 당신과의 궁합을 볼 수 있어요."
      });
    } catch (err) {
      console.error("Failed to copy ID:", err);
    }
  };

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
            onClick={handleShare}
            className="flex items-center gap-2 px-4 py-2 bg-slate-900 text-white rounded-full font-medium hover:bg-slate-800 transition-colors"
          >
            <Share2 size={18} />
            <span>공유하기</span>
          </button>
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
          onCopyId={copyLuvId}
          onEditNickname={() => setShowNicknameModal(true)}
        />

        {/* Info Text */}
        <div className="text-center text-slate-500 text-sm">
          <p>이 카드는 당신의 연애 정체성을 나타냅니다.</p>
          <p className="mt-1">공유 버튼을 눌러 소중한 사람에게 나를 알려보세요.</p>
        </div>
      </div>

      {/* Toast */}
      <Toast message={toast} />

       {/* Nickname Edit Modal */}
      {profile && (
        <NicknameEditModal
          isOpen={showNicknameModal}
          onClose={() => setShowNicknameModal(false)}
          currentNickname={profile.nickname}
          luvId={profile.id}
          onSuccess={(newNickname) => {
            setProfile(prev => prev ? ({ ...prev, nickname: newNickname }) : null);
          }}
        />
      )}
    </div>
  );
}
