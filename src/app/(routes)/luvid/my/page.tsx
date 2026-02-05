"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { 
  ArrowLeft, 
  Share2, 
  Loader2,
  BookOpen
} from "lucide-react";
import { getOrCreateUserId } from "@/features/user-manual/utils/user-storage";
import { getLuvIdByUserId } from "@/features/luvid/utils/supabase-service";
import { LuvIdProfile } from "@/features/luvid/model/types";
import { ARCHETYPE_ICONS, ARCHETYPE_GRADIENTS } from "@/features/user-manual/model/archetype-constants";
import { useToast } from "@/shared/hooks/useToast";
import { Toast } from "@/shared/components/Toast";

export default function MyLuvIdPage() {
  const router = useRouter();
  const { toast, showToast } = useToast();
  const [profile, setProfile] = useState<LuvIdProfile | null>(null);
  const [loading, setLoading] = useState(true);
  const [flipped, setFlipped] = useState(false);

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

  const gradientClass = ARCHETYPE_GRADIENTS[profile.archetypeId] || ARCHETYPE_GRADIENTS.default;
  const ArchetypeIcon = ARCHETYPE_ICONS[profile.archetypeId] || ARCHETYPE_ICONS.default;

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
            카드를 클릭하면 뒷면을 볼 수 있어요
          </p>
        </div>

        {/* 3D Flip Card - Credit Card Ratio (85.6mm x 54mm = 1.586:1) */}
        <div className="perspective-1000 mb-12">
          <motion.div
            className="relative w-full cursor-pointer mx-auto"
            style={{ 
              maxWidth: "500px",
              aspectRatio: "1.586",
              transformStyle: "preserve-3d" 
            }}
            onClick={() => setFlipped(!flipped)}
            animate={{ rotateY: flipped ? 180 : 0 }}
            transition={{ duration: 0.6, type: "spring", stiffness: 100 }}
          >
            <div
              className="absolute inset-0 backface-hidden"
              style={{ backfaceVisibility: "hidden" }}
            >
              <div className={`w-full h-full bg-gradient-to-br ${gradientClass} rounded-3xl p-5 sm:p-6 md:p-8 text-white relative overflow-hidden shadow-2xl`}>
                {/* Holographic effects */}
                <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full blur-3xl"></div>
                <div className="absolute bottom-0 left-0 w-48 h-48 bg-white/5 rounded-full blur-2xl"></div>
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-gradient-to-r from-white/10 to-white/5 rounded-full blur-3xl"></div>

                <div className="relative z-10 h-full flex flex-col justify-between">
                  {/* Top - ID */}
                  <div className="flex items-center justify-between">
                    <div className="text-white/60 text-[10px] sm:text-xs font-mono truncate pr-2">
                      {profile.id}
                    </div>
                    <ArchetypeIcon size={20} className="text-white/40 shrink-0" />
                  </div>

                  {/* Middle - Main Info */}
                  <div>
                    <h2 className="text-2xl sm:text-3xl font-bold mb-1 sm:mb-2">{profile.nickname}</h2>
                    <p className="text-base sm:text-lg text-white/90 italic mb-4 sm:mb-6">"{profile.tagline}"</p>

                    {/* Top 3 Values - Compact */}
                    <div className="flex flex-wrap gap-1.5 sm:gap-2">
                      {profile.topValues.map((value, idx) => (
                        <span
                          key={idx}
                          className="bg-white/20 backdrop-blur-sm px-2 sm:px-3 py-0.5 sm:py-1 rounded-full text-xs sm:text-sm font-medium border border-white/20"
                        >
                          {value.label}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Bottom - Love Style */}
                  <div>
                    <div className="text-white/60 text-[10px] sm:text-xs mb-1">Love Style</div>
                    <div className="font-bold text-base sm:text-lg">{profile.archetype}</div>
                  </div>
                </div>
              </div>
            </div>

            {/* Back Side */}
            <div
              className="absolute inset-0 backface-hidden"
              style={{ 
                backfaceVisibility: "hidden",
                transform: "rotateY(180deg)"
              }}
            >
              <div className={`w-full h-full bg-gradient-to-br ${gradientClass} rounded-3xl p-5 sm:p-6 md:p-8 text-white relative overflow-hidden shadow-2xl`}>
                {/* Holographic effects */}
                <div className="absolute top-0 left-0 w-64 h-64 bg-white/10 rounded-full blur-3xl"></div>
                <div className="absolute bottom-0 right-0 w-48 h-48 bg-white/5 rounded-full blur-2xl"></div>

                <div className="relative z-10 h-full flex items-center justify-center">
                  {/* Centered Manual Button */}
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      router.push("/report/" + profile.reportId);
                    }}
                    className="bg-white/20 backdrop-blur-sm hover:bg-white/30 border border-white/30 text-white font-bold py-3 px-6 md:py-4 md:px-8 rounded-xl transition-all hover:scale-105 flex items-center justify-center gap-2 text-sm md:text-base"
                  >
                    <BookOpen size={20} className="shrink-0" />
                    <span className="whitespace-nowrap">{profile.nickname}님의 사용 설명서</span>
                  </button>
                </div>
              </div>
            </div>
          </motion.div>
        </div>

        {/* Info Text */}
        <div className="text-center text-slate-500 text-sm">
          <p>이 카드는 당신의 연애 정체성을 나타냅니다.</p>
          <p className="mt-1">공유 버튼을 눌러 소중한 사람에게 나를 알려보세요.</p>
        </div>
      </div>

      {/* Toast */}
      <Toast message={toast} />

      {/* CSS for 3D effect */}
      <style jsx global>{`
        .perspective-1000 {
          perspective: 1000px;
        }
        .backface-hidden {
          backface-visibility: hidden;
          -webkit-backface-visibility: hidden;
        }
      `}</style>
    </div>
  );
}
