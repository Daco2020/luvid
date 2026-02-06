"use client";

import { useState } from "react";
import { HeartHandshake } from "lucide-react";
import { GlassTooltip } from "@/shared/components/ui/GlassTooltip";
import { ShimmerEffect } from "@/shared/components/ui/ShimmerEffect";
import { CompatibilityModal } from "./CompatibilityModal";

interface CompatibilityFeatureProps {
  isOwner: boolean;
  viewedProfileId?: string;
  hasReport: boolean;
  nickname: string;
}

export function CompatibilityFeature({
  isOwner,
  viewedProfileId,
  hasReport,
  nickname
}: CompatibilityFeatureProps) {
  const [showCompatTooltip, setShowCompatTooltip] = useState(false);
  const [showCompatModal, setShowCompatModal] = useState(false);

  return (
    <>
      <div 
        className="relative group/compat pointer-events-auto w-full max-w-[280px]"
        onMouseEnter={() => setShowCompatTooltip(true)}
        onMouseLeave={() => setShowCompatTooltip(false)}
      >
        <button
          onClick={(e) => {
            e.stopPropagation();
            setShowCompatModal(true);
          }}
          className="group relative overflow-hidden bg-white/10 backdrop-blur-md border border-white/20 text-white font-bold py-3 px-6 md:py-4 md:px-8 rounded-2xl transition-all duration-300 hover:scale-105 hover:bg-white/20 hover:border-white/40 shadow-[0_8px_32px_0_rgba(31,38,135,0.15)] hover:shadow-[0_8px_32px_0_rgba(31,38,135,0.25)] flex items-center justify-center gap-3 text-sm md:text-base pointer-events-auto w-full max-w-[280px]"
        >
          <HeartHandshake size={20} className="shrink-0 relative z-10 group-hover:rotate-12 transition-transform duration-300" />
          <span className="whitespace-nowrap relative z-10 text-sm">연애 궁합 보러가기</span>
          
          {/* Shimmer Effect */}
          <ShimmerEffect className="group-hover:animate-none" delay={2.5} />
        </button>

        {/* Guidance Tooltip */}
        <GlassTooltip
          isVisible={showCompatTooltip}
          title="궁합 보는 방법"
          description={
            isOwner ? (
                <span>상대방의 카드를 공유받거나 Luv ID 를 입력하면 궁합을 확인할 수 있어요. 상대에게 먼저 내 카드를 공유해보세요.</span>
            ) : (
                <span>나의 Luv ID를 입력하여<br/> {nickname}님과의 궁합을 확인해보세요.</span>
            )
          }
          position="bottom"
          align="center"
          width="w-64"
        />
      </div>

      <CompatibilityModal
        isOpen={showCompatModal}
        onClose={() => setShowCompatModal(false)}
        isOwner={isOwner}
        viewedProfileId={viewedProfileId}
        hasReport={hasReport}
      />
    </>
  );
}
