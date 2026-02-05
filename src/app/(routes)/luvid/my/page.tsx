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
  HeartHandshake
} from "lucide-react";
import { getOrCreateUserId } from "@/features/user-manual/utils/user-storage";
import { getLuvIdByUserId } from "@/features/luvid/utils/supabase-service";
import { LuvIdProfile } from "@/features/luvid/model/types";
import { ARCHETYPE_ICONS, ARCHETYPE_GRADIENTS, ARCHETYPE_DESCRIPTIONS } from "@/features/user-manual/model/archetype-constants";
import { useToast } from "@/shared/hooks/useToast";
import { Toast } from "@/shared/components/Toast";
import { GlassTooltip } from "@/shared/components/ui/GlassTooltip";

export default function MyLuvIdPage() {
  const router = useRouter();
  const { toast, showToast } = useToast();
  const [profile, setProfile] = useState<LuvIdProfile | null>(null);
  const [loading, setLoading] = useState(true);
  const [flipped, setFlipped] = useState(false);
  const [activeTooltip, setActiveTooltip] = useState<number | null>(null);
  const [showArchetypeTooltip, setShowArchetypeTooltip] = useState(false);
  const [showCompatTooltip, setShowCompatTooltip] = useState(false);
  
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
        title: "Luv ID 복사 완료!",
        description: "클립보드에 복사되었어요."
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
            카드를 클릭하면 뒤집을 수 있어요
          </p>
        </div>

        {/* 3D Flip Card - Credit Card Ratio (85.6mm x 54mm = 1.586:1) */}
        <div className="perspective-1000 mb-12">
          <motion.div
            className="relative w-full mx-auto"
            style={{ 
              maxWidth: "500px",
              aspectRatio: "1.586",
              transformStyle: "preserve-3d",
              cursor: flipped ? "default" : "pointer"
            }}
            onClick={(e) => {
              // Only flip if not clicking on interactive elements
              if ((e.target as HTMLElement).tagName !== 'BUTTON' && 
                  !(e.target as HTMLElement).closest('button')) {
                setFlipped(!flipped);
              }
            }}
            animate={{ rotateY: flipped ? 180 : 0 }}
            transition={{ duration: 0.6, type: "spring", stiffness: 100 }}
          >
            {/* Front Side */}
            <div
              className="absolute inset-0 backface-hidden"
              style={{ 
                backfaceVisibility: "hidden",
                pointerEvents: flipped ? "none" : "auto",
                zIndex: flipped ? 0 : 10
              }}
            >
              {/* Main Card Container - Visible Overflow for Tooltips */}
              <div className="w-full h-full rounded-3xl relative shadow-2xl">
                
                {/* Background & Holographic Effects - Clipped */}
                <div className={`absolute inset-0 rounded-3xl overflow-hidden pointer-events-none bg-gradient-to-br ${gradientClass}`}>
                  <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full blur-3xl"></div>
                  <div className="absolute bottom-0 left-0 w-48 h-48 bg-white/5 rounded-full blur-2xl"></div>
                  <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-gradient-to-r from-white/10 to-white/5 rounded-full blur-3xl"></div>
                </div>

                {/* Content Layer - Unclipped */}
                <div className="relative z-10 h-full flex flex-col justify-between py-8 px-8 text-white">
                  {/* Top - ID & Icon */}
                  <div className="flex items-center justify-between">
                    <div 
                      className="text-white/60 text-sm font-mono truncate pr-2 flex items-center gap-1.5 cursor-pointer hover:text-white transition-colors group pointer-events-auto"
                      onClick={copyLuvId}
                      title="클릭하여 Luv ID 복사"
                    >
                      <span>{profile.id}</span>
                      <Copy size={12} className="opacity-0 group-hover:opacity-100 transition-opacity" />
                    </div>
                    
                    <div className="relative pointer-events-auto">
                      <ArchetypeIcon 
                        size={24} 
                        className="text-white/70 shrink-0 cursor-pointer hover:text-white hover:scale-110 transition-all duration-300" 
                        onClick={(e) => {
                          e.stopPropagation();
                          setShowArchetypeTooltip(!showArchetypeTooltip);
                        }}
                        onMouseEnter={() => !('ontouchstart' in window) && setShowArchetypeTooltip(true)}
                        onMouseLeave={() => !('ontouchstart' in window) && setShowArchetypeTooltip(false)}
                      />
                      
                      <GlassTooltip
                        isVisible={showArchetypeTooltip && !!ARCHETYPE_DESCRIPTIONS[profile.archetypeId]}
                        title={profile.archetype}
                        description={ARCHETYPE_DESCRIPTIONS[profile.archetypeId]}
                        position="bottom"
                        align="right"
                        width="w-56"
                      />
                    </div>
                  </div>

                  {/* Middle - Main Info */}
                  <div className="flex-1 flex flex-col justify-center">
                    <h2 className="text-white text-[26px] md:text-3xl font-bold mb-1 md:mb-2">{profile.nickname}</h2>
                    <p className="text-[14px] md:text-[16px] text-white/90 italic mb-6 md:mb-8">"{profile.tagline}"</p>
                  </div>

                  {/* Bottom - Top 3 Values with Tooltips */}
                  <div className="space-y-2">
                    <div className="flex flex-wrap gap-2 justify-center">
                      {profile.topValues.map((value, idx) => (
                        <div
                          key={idx}
                          className="relative pointer-events-auto"
                          onMouseEnter={() => setActiveTooltip(idx)}
                          onMouseLeave={() => setActiveTooltip(null)}
                          onClick={(e) => {
                            e.stopPropagation();
                            setActiveTooltip(activeTooltip === idx ? null : idx);
                          }}
                        >
                          <span className="bg-white/15 backdrop-blur-sm px-3 py-1.5 rounded-full text-xs font-semibold border border-white/60 cursor-pointer hover:bg-white/40 transition-colors inline-block">
                            {value.label}
                          </span>
                          
                          <GlassTooltip
                            isVisible={activeTooltip === idx}
                            title={value.label}
                            description={value.description}
                            position="top"
                            align="center"
                          />
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Back Side */}
            <div
              className="absolute inset-0 backface-hidden"
              style={{ 
                backfaceVisibility: "hidden",
                transform: "rotateY(180deg)",
                pointerEvents: flipped ? "auto" : "none",
                zIndex: flipped ? 10 : 0
              }}
            >
              <div className={`w-full h-full bg-gradient-to-br ${gradientClass} rounded-3xl p-5 sm:p-6 md:p-8 text-white relative overflow-visible shadow-2xl`}>
                {/* Holographic effects */}
                <div className="absolute top-0 left-0 w-64 h-64 bg-white/10 rounded-full blur-3xl"></div>
                <div className="absolute bottom-0 right-0 w-48 h-48 bg-white/5 rounded-full blur-2xl"></div>

                <div className="relative z-10 h-full flex flex-col items-center justify-center gap-4">
                  {/* Enhanced Manual Button with Apple-style Glass Effect */}
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      router.push("/report/" + profile.reportId);
                    }}
                    className="group relative overflow-hidden bg-white/10 backdrop-blur-md border border-white/20 text-white font-bold py-3 px-6 md:py-4 md:px-8 rounded-2xl transition-all duration-300 hover:scale-105 hover:bg-white/20 hover:border-white/40 shadow-[0_8px_32px_0_rgba(31,38,135,0.15)] hover:shadow-[0_8px_32px_0_rgba(31,38,135,0.25)] flex items-center justify-center gap-3 text-sm md:text-base pointer-events-auto w-full max-w-[280px]"
                  >
                    <div className="absolute inset-0 bg-gradient-to-tr from-white/10 via-transparent to-transparent opacity-50 transition-opacity duration-300" />
                    
                    {/* Shimmer Effect */}
                    <div className="absolute inset-0 -translate-x-[150%] skew-x-12 bg-gradient-to-r from-transparent via-white/40 to-transparent group-hover:animate-shimmer" />

                    <BookOpen size={22} className="shrink-0 relative z-10 group-hover:rotate-12 transition-transform duration-300" />
                    <span className="whitespace-nowrap relative z-10">{profile.nickname}님의 사용 설명서</span>
                  </button>

                  {/* Compatibility Button (Conditional) */}
                  <div 
                    className="relative group/compat pointer-events-auto w-full max-w-[280px]"
                    onMouseEnter={() => isOwner && setShowCompatTooltip(true)}
                    onMouseLeave={() => isOwner && setShowCompatTooltip(false)}
                  >
                    <button
                      disabled={isOwner}
                      onClick={(e) => {
                        e.stopPropagation();
                        if (isOwner) return;
                        
                        // Logic for shared card view:
                        // if (hasReport) router.push(`/luvid/compatibility?target=${profile.id}`);
                        // else { showToast(...); router.push("/"); }
                      }}
                      className={`
                        w-full relative overflow-hidden border font-bold py-3 px-6 md:py-3.5 md:px-8 rounded-2xl transition-all duration-300 flex items-center justify-center gap-2 text-sm
                        ${isOwner 
                          ? "bg-white/5 border-white/10 text-white/40 cursor-not-allowed" 
                          : "bg-white/20 border-white/40 text-white hover:bg-white/30 hover:scale-105 shadow-[0_4px_16px_0_rgba(31,38,135,0.1)]"
                        }
                      `}
                    >
                      <HeartHandshake size={20} className={isOwner ? "opacity-50" : ""} />
                      <span>연애 궁합 보러가기</span>
                    </button>

                    {/* Disabled Info Tooltip (Only for Owner) */}
                    {isOwner && (
                      <GlassTooltip
                        isVisible={showCompatTooltip}
                        title="궁합 보는 방법"
                        description={<span>상대방의 카드를 공유받으면 궁합을 볼 수 있어요. 상대에게 먼저 내 카드를 공유해보세요.</span>}
                        position="bottom"
                        align="center"
                        width="w-64"
                      />
                    )}
                  </div>
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
