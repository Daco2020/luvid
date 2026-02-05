"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { ArrowRight, BookHeart, Sparkles, Lock } from "lucide-react";
import { motion } from "framer-motion";
import { getUserManual } from "@/features/user-manual/utils/supabase-service";
import { getOrCreateUserId } from "@/features/user-manual/utils/user-storage";
import { checkLuvIdExists } from "@/features/luvid/utils/supabase-service";

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
            연애가 서툴러도<br/>
            <span className="text-primary">괜찮아요</span>
          </h1>
          <p className="text-slate-500 text-base font-normal leading-relaxed">
            천천히, 나를 알아가는 것부터 시작해요.<br className="hidden md:block"/>
            당신의 마음이 더 선명해지도록 Luvid가 도와드릴게요.
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
                <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-primary/10 text-primary text-xs font-bold mb-4">
                  <span className="relative flex h-2 w-2">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary/40 opacity-75"></span>
                    <span className="relative inline-flex rounded-full h-2 w-2 bg-primary"></span>
                  </span>
                  Level 1
                </div>
                
                <h2 className="text-xl font-bold text-slate-800 mb-2 group-hover:text-primary transition-colors">
                  나 사용 설명서 만들기
                </h2>
                <p className="text-slate-500 text-sm leading-relaxed mb-6 max-w-[85%]">
                  내 감정은 언제 편안한지, 스트레스 받을 땐 어떻게 해야 하는지.<br/>
                  나만의 마음 작동법을 정리해보세요.
                </p>
                
                <div className="flex items-center gap-2 text-sm font-bold text-primary">
                  시작하기 <ArrowRight size={16} />
                </div>
              </div>
            </motion.div>
          </Link>

          {/* Luv ID Card - 상태별 분기 */}
          {loading ? (
            <div className="bg-slate-50 p-6 rounded-3xl border border-slate-100 relative overflow-hidden opacity-80">
              <div className="animate-pulse">
                <div className="h-6 bg-slate-200 rounded w-1/3 mb-4"></div>
                <div className="h-4 bg-slate-200 rounded w-2/3"></div>
              </div>
            </div>
          ) : !hasManual ? (
            // 설명서 없음 - 잠금 상태
            <div className="bg-slate-50 p-6 rounded-3xl border border-slate-100 relative overflow-hidden opacity-60">
              <div className="flex items-center justify-between mb-4">
                <div className="bg-slate-200/50 p-2 rounded-xl text-slate-400">
                  <Lock size={24} />
                </div>
                <span className="text-xs font-bold text-slate-400 bg-slate-200/50 px-3 py-1 rounded-full">잠김</span>
              </div>
              
              <h2 className="text-lg font-bold text-slate-400 mb-1">
                Luv ID 발급
              </h2>
              <p className="text-slate-400 text-sm">
                설명서를 먼저 완성해주세요.<br/> 
                그러면 Luv ID를 발급받을 수 있어요.
              </p>
            </div>
          ) : !hasLuvId ? (
            // 설명서 있음 + ID 없음 - 발급 가능
            <Link href="/luvid/create">
              <motion.div 
                whileHover={{ y: -2 }}
                whileTap={{ scale: 0.98 }}
                className="bg-gradient-to-br from-pink-50 to-purple-50 p-6 rounded-3xl border border-pink-100 relative overflow-hidden group cursor-pointer"
              >
                <div className="flex items-center justify-between mb-4">
                  <div className="bg-primary/10 p-2 rounded-xl text-primary">
                    <Sparkles size={24} />
                  </div>
                  <span className="text-xs font-bold text-primary bg-primary/10 px-3 py-1 rounded-full">발급 가능</span>
                </div>
                
                <h2 className="text-lg font-bold text-slate-800 mb-1 group-hover:text-primary transition-colors">
                  Luv ID 발급하기
                </h2>
                <p className="text-slate-600 text-sm mb-4">
                  설명서를 바탕으로 당신만의<br/> 
                  연애 프로필 ID를 만들어보세요!
                </p>
                
                <div className="flex items-center gap-2 text-sm font-bold text-primary">
                  발급하기 <ArrowRight size={16} />
                </div>
              </motion.div>
            </Link>
          ) : (
            // 설명서 + ID 모두 있음 - ID 보기
            <Link href="/luvid/my">
              <motion.div 
                whileHover={{ y: -2 }}
                whileTap={{ scale: 0.98 }}
                className="bg-gradient-to-br from-indigo-500 to-purple-600 p-6 rounded-3xl border border-indigo-400 relative overflow-hidden group cursor-pointer text-white"
              >
                <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full blur-2xl"></div>
                
                <div className="flex items-center justify-between mb-4 relative z-10">
                  <div className="bg-white/20 p-2 rounded-xl">
                    <Sparkles size={24} />
                  </div>
                  <span className="text-xs font-bold bg-white/20 px-3 py-1 rounded-full">활성화</span>
                </div>
                
                <h2 className="text-lg font-bold mb-1 relative z-10">
                  내 Luv ID 보기
                </h2>
                <p className="text-white/90 text-sm mb-4 relative z-10">
                  나의 연애 프로필 카드를<br/> 
                  확인하고 공유해보세요!
                </p>
                
                <div className="flex items-center gap-2 text-sm font-bold relative z-10">
                  보러가기 <ArrowRight size={16} />
                </div>
              </motion.div>
            </Link>
          )}
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
