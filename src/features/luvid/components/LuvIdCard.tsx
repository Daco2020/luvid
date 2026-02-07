"use client";

import { useState } from "react";
import { Copy, Pencil, BookOpen, HeartHandshake, Info } from "lucide-react"; // Info & HeartHandshake might be used if needed
import { LuvIdProfile } from "@/features/luvid/model/types";
import { ARCHETYPE_ICONS, ARCHETYPE_GRADIENTS, ARCHETYPE_DESCRIPTIONS } from "@/features/user-manual/model/archetype-constants";
import { GlassTooltip } from "@/shared/components/ui/GlassTooltip";
import { ShimmerEffect } from "@/shared/components/ui/ShimmerEffect";
import { CompatibilityFeature } from "@/features/luvid/components/CompatibilityFeature";
import { useRouter } from "next/navigation";

interface LuvIdCardProps {
  profile: LuvIdProfile;
  isOwner?: boolean;
  flipped: boolean;
  setFlipped: (flipped: boolean) => void;
  onCopyId?: (e: React.MouseEvent) => void;
  onEditNickname?: (e: React.MouseEvent) => void;
}

export function LuvIdCard({ 
  profile, 
  isOwner = false, 
  flipped, 
  setFlipped,
  onCopyId,
  onEditNickname
}: LuvIdCardProps) {
  const router = useRouter();
  const [activeTooltip, setActiveTooltip] = useState<number | null>(null);
  const [showArchetypeTooltip, setShowArchetypeTooltip] = useState(false);
  const [showIdTooltip, setShowIdTooltip] = useState(false);

  const gradientClass = ARCHETYPE_GRADIENTS[profile.archetypeId] || ARCHETYPE_GRADIENTS.default;
  const ArchetypeIcon = ARCHETYPE_ICONS[profile.archetypeId] || ARCHETYPE_ICONS.default;

  return (
    <div className="perspective-1000 mb-12 w-full mx-auto">
      {/* 3D Flip Card - Credit Card Ratio (85.6mm x 54mm = 1.586:1) */}
      <div 
         className="relative w-full mx-auto transition-transform duration-600 transform-style-3d"
         style={{ 
           maxWidth: "500px",
           aspectRatio: "1.586",
           transformStyle: "preserve-3d",
           transform: flipped ? "rotateY(180deg)" : "rotateY(0deg)",
           cursor: flipped ? "default" : "pointer"
         }}
         onClick={(e) => {
           // Only flip if not clicking on interactive elements
           if ((e.target as HTMLElement).tagName !== 'BUTTON' && 
               !(e.target as HTMLElement).closest('button')) {
             setFlipped(!flipped);
           }
         }}
      >
        {/* Front Side */}
        <div
          className="absolute inset-0 backface-hidden"
          style={{ 
            backfaceVisibility: "hidden",
            WebkitBackfaceVisibility: "hidden",
            pointerEvents: flipped ? "none" : "auto",
            zIndex: flipped ? 0 : 10
          }}
        >
          {/* Main Card Container */}
          <div className="w-full h-full rounded-3xl relative shadow-2xl">
            
            {/* Background & Holographic Effects - Clipped */}
            <div className={`absolute inset-0 rounded-3xl overflow-hidden pointer-events-none bg-gradient-to-br ${gradientClass}`}>
              <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full blur-3xl"></div>
              <div className="absolute bottom-0 left-0 w-48 h-48 bg-white/5 rounded-full blur-2xl"></div>
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-gradient-to-r from-white/10 to-white/5 rounded-full blur-3xl"></div>
            </div>
            {/* Shimmer Effect - Wrapped to prevent overflow */}
            <div className="absolute inset-0 rounded-3xl overflow-hidden pointer-events-none z-20">
              <ShimmerEffect />
            </div>

            {/* Content Layer - Unclipped */}
            <div className="relative z-10 h-full flex flex-col justify-between py-6 px-6 sm:py-7 sm:px-7 md:py-8 md:px-8 text-white">
              {/* Top - ID & Icon */}
              <div className="flex items-center justify-between">
                <div className="relative">
                  <div 
                    className="text-white/70 text-xs sm:text-[13px] md:text-sm font-mono font-semibold truncate pr-2 flex items-center gap-1.5 cursor-pointer hover:text-white transition-colors group pointer-events-auto"
                    onClick={isOwner ? onCopyId : undefined}
                    onMouseEnter={() => setShowIdTooltip(true)}
                    onMouseLeave={() => setShowIdTooltip(false)}
                  >
                    <span>{profile.id}</span>
                    {isOwner && <Copy size={10} className="sm:w-[11px] sm:h-[11px] md:w-3 md:h-3 opacity-0 group-hover:opacity-100 transition-opacity" />}
                  </div>
                  
                  <GlassTooltip
                    isVisible={showIdTooltip}
                    title="Luv ID"
                    description="Luv ID를 상대방과 주고 받으면 서로의 궁합을 볼 수 있어요."
                    position="bottom"
                    align="left"
                    width="w-56 md:w-64"
                  />
                </div>
                
                <div className="relative pointer-events-auto">
                  <ArchetypeIcon 
                    size={20} 
                    className="sm:w-[22px] sm:h-[22px] md:w-6 md:h-6 text-white/70 shrink-0 cursor-pointer hover:text-white hover:scale-110 transition-all duration-300" 
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
                    width="w-48 md:w-56"
                  />
                </div>
              </div>

              {/* Middle - Main Info */}
              <div className="flex-1 flex flex-col justify-center">
                <div 
                  className="group flex items-center gap-2 mb-1 cursor-pointer w-fit"
                  onClick={(e) => {
                    e.stopPropagation();
                    if (isOwner && onEditNickname) onEditNickname(e);
                  }}
                >
                  <h2 className="text-white text-[22px] sm:text-2xl md:text-3xl font-bold decoration-white/30 underline-offset-4 transition-all leading-tight">
                    {profile.nickname}
                  </h2>
                  {isOwner && <Pencil size={12} className="sm:w-[13px] sm:h-[13px] md:w-3.5 md:h-3.5 opacity-0 group-hover:opacity-100 transition-opacity" />}
                </div>
                <p className="text-[12px] sm:text-[13px] md:text-[16px] lg:text-[16px] text-white/90 italic mb-4 md:mb-6 lg:mb-8 line-clamp-2">
                  "{profile.tagline}"
                </p>
              </div>

              {/* Bottom - Top 3 Values with Tooltips */}
              <div className="space-y-2">
                <div className="flex flex-wrap gap-1.5 md:gap-2 justify-center">
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
                      <span className="bg-white/15 backdrop-blur-sm px-2.5 py-1 sm:px-[11px] sm:py-[5px] md:px-3 md:py-1.5 rounded-full text-[10px] sm:text-[11px] md:text-xs font-semibold border border-white/60 cursor-pointer hover:bg-white/40 transition-colors inline-block whitespace-nowrap">
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
            WebkitBackfaceVisibility: "hidden",
            transform: "rotateY(180deg)",
            pointerEvents: flipped ? "auto" : "none",
            zIndex: flipped ? 10 : 0
          }}
        >
          <div className="w-full h-full rounded-3xl relative shadow-2xl">
            {/* Background & Holographic Effects - Clipped */}
            <div className={`absolute inset-0 rounded-3xl overflow-hidden pointer-events-none bg-gradient-to-br ${gradientClass}`}>
              <div className="absolute top-0 left-0 w-64 h-64 bg-white/10 rounded-full blur-3xl"></div>
              <div className="absolute bottom-0 right-0 w-48 h-48 bg-white/5 rounded-full blur-2xl"></div>
            </div>

            <div className="relative z-10 h-full flex flex-col items-center justify-center gap-3 md:gap-4 p-5 sm:p-6 md:p-8">
              {/* Enhanced Manual Button */}
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  router.push("/report/" + profile.reportId);
                }}
                className="group relative overflow-hidden bg-white/10 backdrop-blur-md border border-white/20 text-white font-bold py-2.5 px-5 sm:py-3 sm:px-6 md:py-4 md:px-8 rounded-2xl transition-all duration-300 hover:scale-105 hover:bg-white/20 hover:border-white/40 shadow-[0_8px_32px_0_rgba(31,38,135,0.15)] hover:shadow-[0_8px_32px_0_rgba(31,38,135,0.25)] flex items-center justify-center gap-2 md:gap-3 text-xs sm:text-[13px] md:text-sm lg:text-base pointer-events-auto w-full max-w-[240px] md:max-w-[280px]"
              >
                <div className="absolute inset-0 bg-gradient-to-tr from-white/10 via-transparent to-transparent opacity-50 transition-opacity duration-300" />
                
                {/* Shimmer Effect */}
                <ShimmerEffect className="group-hover:animate-none" />

                <BookOpen size={16} className="sm:w-[18px] sm:h-[18px] md:w-5 md:h-5 shrink-0 relative z-10 group-hover:rotate-12 transition-transform duration-300" />
                <span className="whitespace-nowrap relative z-10">{profile.nickname}님의 사용 설명서</span>
              </button>

              {/* Compatibility Button */}
              <CompatibilityFeature
                isOwner={isOwner}
                viewedProfileId={profile.id}
                hasReport={!!profile.reportId}
                nickname={profile.nickname}
              />
            </div>
          </div>
        </div>
      </div>
      
      {/* CSS for 3D effect */}
      <style jsx global>{`
        .perspective-1000 {
          perspective: 1000px;
        }
        .transform-style-3d {
          transform-style: preserve-3d;
        }
        .backface-hidden {
          backface-visibility: hidden;
          -webkit-backface-visibility: hidden;
        }
      `}</style>
    </div>
  );
}
