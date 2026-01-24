"use client";

import Link from "next/link";
import { ArrowRight, BookHeart, Sparkles } from "lucide-react";
import { motion } from "framer-motion";

export default function Home() {
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

          {/* Coming Soon: Love ID */}
          <div className="bg-slate-50 p-6 rounded-3xl border border-slate-100 relative overflow-hidden opacity-80">
            <div className="flex items-center justify-between mb-4">
              <div className="bg-slate-200/50 p-2 rounded-xl text-slate-400">
                <Sparkles size={24} />
              </div>
              <span className="text-xs font-bold text-slate-400 bg-slate-200/50 px-3 py-1 rounded-full">Coming Soon</span>
            </div>
            
            <h2 className="text-lg font-bold text-slate-400 mb-1">
              Love ID 카드 발급
            </h2>
            <p className="text-slate-400 text-sm">
              설명서를 완성하면 당신만의<br/> 
              연애 프로필 카드가 발급돼요.
            </p>
          </div>
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
