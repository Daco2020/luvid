"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { ArrowRight, BookHeart, Sparkles, Lock } from "lucide-react";
import { motion } from "framer-motion";
import { getUserManual } from "@/features/user-manual/utils/supabase-service";
import { getOrCreateUserId } from "@/features/user-manual/utils/user-storage";
import { checkLuvIdExists } from "@/features/luvid/utils/supabase-service";


const CARD_STATUS = {
  LOCKED: "LOCKED",
  READY: "READY",
  COMPLETED: "COMPLETED",
} as const;

type CardStatus = typeof CARD_STATUS[keyof typeof CARD_STATUS];

const getStatusConfig = (status: CardStatus) => {
  switch (status) {
    case CARD_STATUS.LOCKED:
      return {
        badge: "잠김",
        badgeClass: "bg-slate-100 text-slate-500",
        dotClass: "bg-slate-400",
        ping: false,
        iconColor: "text-slate-400",
      };
    case CARD_STATUS.READY:
      return {
        badge: "준비",
        badgeClass: "bg-yellow-50 text-yellow-600",
        dotClass: "bg-yellow-400",
        ping: true,
        iconColor: "text-yellow-500",
      };
    case CARD_STATUS.COMPLETED:
      return {
        badge: "완료",
        badgeClass: "bg-emerald-50 text-emerald-600",
        dotClass: "bg-emerald-500",
        ping: false,
        iconColor: "text-emerald-500",
      };
  }
};

function StatusBadge({ status }: { status: CardStatus }) {
  const config = getStatusConfig(status);
  
  return (
    <div className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold mb-4 ${config.badgeClass}`}>
      <span className="relative flex h-2 w-2">
        {config.ping && <span className={`animate-ping absolute inline-flex h-full w-full rounded-full opacity-75 ${config.dotClass}`}></span>}
        <span className={`relative inline-flex rounded-full h-2 w-2 ${config.dotClass}`}></span>
      </span>
      {config.badge}
    </div>
  );
}

export default function Home() {
  const [hasManual, setHasManual] = useState(false);
  const [hasLuvId, setHasLuvId] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function checkStatus() {
      try {
        const userId = getOrCreateUserId();
        
        // 설명서 존재 여부 확인 (Supabase에서 조회)
        const { checkUserManualExists } = await import("@/features/user-manual/utils/supabase-service");
        const manualExists = await checkUserManualExists(userId);
        setHasManual(manualExists);
        
        // Luv ID 존재 여부 확인
        const luvIdExists = await checkLuvIdExists(userId);
        setHasLuvId(luvIdExists);
      } catch (err) {
        console.error('Status check failed:', err);
      } finally {
        setLoading(false);
      }
    }

    checkStatus();
  }, []);
  return (
    <div className="min-h-screen bg-background flex flex-col items-center justify-center p-6 relative overflow-hidden">
      
      {/* Background Decor */}
      <div className="absolute top-[-10%] right-[-10%] w-[50%] h-[50%] bg-primary/5 rounded-full blur-3xl animate-pulse" />
      <div className="absolute bottom-[-10%] left-[-10%] w-[50%] h-[50%] bg-secondary/10 rounded-full blur-3xl animate-pulse delay-700" />

      <main className="w-full max-w-2xl z-10">
        
        {/* Text-Only Logo */}
        <header className="mb-10 text-center">
          <div className="mb-4">
            <span className="text-2xl font-display font-bold tracking-tight text-primary">Luvid</span>
          </div>
          
          <h1 className="text-3xl md:text-4xl font-bold text-slate-800 mb-4 leading-tight tracking-tight">
            나와 꼭 맞는 연인을<br/>
            <span className="text-primary">찾고 있나요?</span>
          </h1>
          <p className="text-slate-500 text-sm md:text-base font-normal leading-relaxed">
            천천히, 나를 알아가는 것부터 시작해요.<br/>
            당신의 마음이 더 선명해지도록 우리가 도와드릴게요.
          </p>
        </header>

        {/* Action Cards */}
        <div className="grid gap-4 w-full">
          
          {/* Main Feature: User Manual */}
          <Link href="/user-manual/emotional-patterns">
            <motion.div 
              whileHover={{ y: -2 }}
              whileTap={{ scale: 0.98 }}
              className="bg-white p-6 rounded-3xl shadow-sm border border-slate-100 relative overflow-hidden group"
            >
              <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-20 transition-opacity">
                <BookHeart size={80} className="text-primary" />
              </div>
              
              <div className="relative z-10">
                <StatusBadge status={hasManual ? CARD_STATUS.COMPLETED : CARD_STATUS.READY} />
                
                <h2 className="text-xl font-bold text-slate-800 mb-2 group-hover:text-primary transition-colors">
                  나 사용 설명서 만들기
                </h2>
                <p className="text-slate-500 text-sm leading-relaxed mb-6 max-w-[85%]">
                  나는 어떤 가치를 추구하고 갈등을 어떻게 해결하는지.<br/>
                  나의 마음 작동법을 확인하고 자신을 탐구해보세요.
                </p>
                
                <div className="flex items-center gap-2 text-sm font-bold text-primary">
                  시작하기 <ArrowRight size={16} />
                </div>
              </div>
            </motion.div>
          </Link>

          {/* Luv ID Card - 상태별 분기 */}
          {/* Luv ID Card - 상태별 분기 */}
          {(() => {
            if (loading) {
              return (
                <div className="bg-slate-50 p-6 rounded-3xl border border-slate-100 relative overflow-hidden opacity-80 h-[220px]">
                  <div className="animate-pulse">
                    <div className="h-6 bg-slate-200 rounded w-1/3 mb-4"></div>
                    <div className="h-4 bg-slate-200 rounded w-2/3"></div>
                  </div>
                </div>
              );
            }

            const status = !hasManual ? CARD_STATUS.LOCKED : !hasLuvId ? CARD_STATUS.READY : CARD_STATUS.COMPLETED;
            const config = getStatusConfig(status);
            
            const cardConfig = {
              [CARD_STATUS.LOCKED]: {
                href: null,
                desc: <>내 Luv ID를 발급받고 연애 프로필을 완성해보세요.<br/>프로필을 공유하여 서로의 궁합을 확인해 볼 수 있어요.</>,
                actionText: "나 사용 설명서를 먼저 완성해주세요",
                actionIcon: <Lock size={16} />,
                actionClass: "text-slate-400/70",
                containerClass: "opacity-70 select-none grayscale",
                titleClass: "text-slate-400"
              },
              [CARD_STATUS.READY]: {
                href: "/luvid/create",
                desc: <>내 Luv ID를 발급받고 연애 프로필을 완성해보세요.<br/>프로필을 공유하여 서로의 궁합을 확인해 볼 수 있어요.</>,
                actionText: "발급하기",
                actionIcon: <ArrowRight size={16} />,
                actionClass: "text-primary",
                containerClass: "group",
                titleClass: "text-slate-800 group-hover:text-primary transition-colors"
              },
              [CARD_STATUS.COMPLETED]: {
                href: "/luvid/my",
                desc: <>내 Luv ID를 발급받고 연애 프로필을 완성해보세요.<br/>프로필을 공유하여 서로의 궁합을 확인해 볼 수 있어요.</>,
                actionText: "보러가기",
                actionIcon: <ArrowRight size={16} />,
                actionClass: "text-primary",
                containerClass: "group",
                titleClass: "text-slate-800 group-hover:text-primary transition-colors"
              }
            }[status];

            const CardContent = (
              <div className={`bg-white p-6 rounded-3xl shadow-sm border border-slate-100 relative overflow-hidden ${cardConfig.containerClass}`}>
                <div className={`absolute top-0 right-0 p-4 opacity-10 ${status === CARD_STATUS.LOCKED ? '' : 'group-hover:opacity-20 transition-opacity'}`}>
                  <Sparkles size={80} className={config.iconColor} />
                </div>
                
                <div className="relative z-10">
                  <StatusBadge status={status} />
                  
                  <h2 className={`text-xl font-bold mb-2 ${cardConfig.titleClass}`}>
                    Luv ID 카드 발급받기
                  </h2>
                  <p className="text-slate-500 text-sm leading-relaxed mb-6 max-w-[85%]">
                    {cardConfig.desc}
                  </p>
                  
                  <div className={`flex items-center gap-2 text-sm font-bold ${cardConfig.actionClass}`}>
                    {cardConfig.actionText} {cardConfig.actionIcon}
                  </div>
                </div>
              </div>
            );

            return cardConfig.href ? (
              <Link href={cardConfig.href}>
                <motion.div whileHover={{ y: -2 }} whileTap={{ scale: 0.98 }}>
                  {CardContent}
                </motion.div>
              </Link>
            ) : (
              <div>{CardContent}</div>
            );
          })()}
        </div>

        {/* Footer Text */}
        <div className="mt-8 text-center">
          <p className="text-xs text-slate-400 font-medium">
            "가장 중요한 관계는 바로<br className="md:hidden"/> 나 자신과의 관계입니다."
          </p>
        </div>
      </main>
    </div>
  );
}
