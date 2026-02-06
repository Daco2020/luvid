"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { Sparkles, ArrowRight, Loader2 } from "lucide-react";
import { getOrCreateUserId } from "@/shared/utils/user-storage";
import { getUserManual } from "@/shared/utils/supabase-service";
import { createLuvIdFromReport } from "@/features/luvid/model/converter";
import { saveLuvId } from "@/features/luvid/utils/supabase-service";
import { saveMyLuvIdToStorage } from "@/features/luvid/utils/luvid-storage";
import { LuvIdProfile } from "@/features/luvid/model/types";

export default function CreateLuvIdPage() {
  const router = useRouter();
  const [loading, setLoading] = useState(true);
  const [profile, setProfile] = useState<LuvIdProfile | null>(null);
  const [nickname, setNickname] = useState("");
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function loadManualAndGenerateProfile() {
      try {
        const userId = getOrCreateUserId();
        
        // 1. 사용자의 최근 설명서 조회
        const { getLatestUserManual } = await import("@/shared/utils/supabase-service");
        const reportData = await getLatestUserManual(userId);
        
        if (!reportData || !reportData.data) {
          setError("설명서를 찾을 수 없습니다. 먼저 설명서를 작성해주세요.");
          return;
        }

        // 2. Luv ID 프로필 생성
        const generatedProfile = createLuvIdFromReport(
          userId,
          reportData.id,
          reportData.data,
          nickname || reportData.data.userName
        );

        setProfile(generatedProfile);
        setNickname(generatedProfile.nickname);
      } catch (err) {
        console.error("Profile generation failed:", err);
        setError("프로필 생성 중 오류가 발생했습니다.");
      } finally {
        setLoading(false);
      }
    }

    loadManualAndGenerateProfile();
  }, []);

  const handleConfirm = async () => {
    if (!profile) return;

    try {
      setLoading(true);
      
      // 닉네임 업데이트
      const updatedProfile = { ...profile, nickname };
      
      // Supabase에 저장
      await saveLuvId(updatedProfile);
      
      // LocalStorage에 내 Luv ID 저장
      saveMyLuvIdToStorage(updatedProfile.id);
      
      // 내 ID 페이지로 이동
      router.push("/luvid/my");
    } catch (err) {
      console.error("Failed to save Luv ID:", err);
      setError("Luv ID 저장에 실패했습니다.");
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <Loader2 className="w-12 h-12 text-primary animate-spin mx-auto mb-4" />
          <p className="text-slate-600">Luv ID를 생성하고 있어요...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center p-6">
        <div className="max-w-md w-full text-center">
          <div className="bg-red-50 border border-red-200 rounded-2xl p-6 mb-4">
            <p className="text-red-600">{error}</p>
          </div>
          <button
            onClick={() => router.push("/")}
            className="text-primary font-medium"
          >
            홈으로 돌아가기
          </button>
        </div>
      </div>
    );
  }

  if (!profile) return null;

  return (
    <div className="min-h-screen bg-background p-6">
      <div className="max-w-2xl mx-auto py-12">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 bg-primary/10 text-primary px-4 py-2 rounded-full mb-4">
            <Sparkles size={20} />
            <span className="font-bold">Luv ID 발급</span>
          </div>
          <h1 className="text-3xl font-bold text-slate-800 mb-2">
            당신만의 연애 프로필이<br />완성되었어요!
          </h1>
          <p className="text-slate-500">
            닉네임을 확인하고 Luv ID를 발급받으세요.
          </p>
        </div>

        {/* Profile Preview Card */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-gradient-to-br from-indigo-500 to-purple-600 rounded-3xl p-8 text-white mb-8 relative overflow-hidden"
        >
          {/* Holographic effect */}
          <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full blur-3xl"></div>
          <div className="absolute bottom-0 left-0 w-48 h-48 bg-white/5 rounded-full blur-2xl"></div>

          <div className="relative z-10">
            {/* ID */}
            <div className="text-white/60 text-sm mb-6">ID: {profile.id}</div>

            {/* Nickname Input */}
            <div className="mb-6">
              <label className="block text-white/80 text-sm mb-2">닉네임</label>
              <input
                type="text"
                value={nickname}
                onChange={(e) => setNickname(e.target.value)}
                className="w-full bg-white/20 border border-white/30 rounded-xl px-4 py-3 text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-white/50"
                placeholder="닉네임을 입력하세요"
              />
            </div>

            {/* Tagline */}
            <p className="text-lg mb-6 text-white/90">"{profile.tagline}"</p>

            {/* Archetype */}
            <div className="bg-white/10 rounded-2xl p-4 mb-4">
              <div className="text-white/60 text-xs mb-1">Love Style</div>
              <div className="font-bold text-lg">{profile.archetype}</div>
            </div>

            {/* Top Values */}
            <div className="bg-white/10 rounded-2xl p-4">
              <div className="text-white/60 text-xs mb-2">Top 3 Values</div>
              <div className="flex flex-wrap gap-2">
                {profile.topValues.map((value, idx) => (
                  <span
                    key={idx}
                    className="bg-white/20 px-3 py-1 rounded-full text-sm"
                  >
                    {value.label}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </motion.div>

        {/* Action Buttons */}
        <div className="flex gap-4">
          <button
            onClick={() => router.push("/")}
            className="flex-1 py-4 rounded-full border border-slate-200 text-slate-600 font-bold hover:bg-slate-50 transition-colors"
          >
            취소
          </button>
          <button
            onClick={handleConfirm}
            disabled={!nickname.trim()}
            className="flex-1 py-4 rounded-full bg-primary text-white font-bold hover:bg-primary/90 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
          >
            발급하기 <ArrowRight size={20} />
          </button>
        </div>
      </div>
    </div>
  );
}
