
"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { CompatibilityResultView } from "@/features/luvid/components/CompatibilityResult";
import { CompatibilityProfile, createProfileFromData } from "@/features/luvid/utils/compatibility-algorithm";
import { getLuvIdById } from "@/features/luvid/utils/supabase-service";
import { getUserManual } from "@/features/user-manual/utils/supabase-service";
import { UserManualReport } from "@/features/user-manual/model/report";

export default function CompatibilityPage() {
  const params = useParams();
  const router = useRouter();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [myProfile, setMyProfile] = useState<CompatibilityProfile | null>(null);
  const [partnerProfile, setPartnerProfile] = useState<CompatibilityProfile | null>(null);

  useEffect(() => {
    async function fetchData() {
      try {
        const idParam = decodeURIComponent(params.id as string);
        const [myId, partnerId] = idParam.split("_");

        if (!myId || !partnerId) {
          throw new Error("Invalid compatibility ID");
        }

        // 1. Fetch LuvProfiles
        const [myLuvProfile, partnerLuvProfile] = await Promise.all([
          getLuvIdById(myId),
          getLuvIdById(partnerId)
        ]);

        if (!myLuvProfile || !partnerLuvProfile) {
          throw new Error("One or both profiles not found");
        }

        // 2. Fetch User Manuals
        const [myManualData, partnerManualData] = await Promise.all([
          getUserManual(myLuvProfile.reportId),
          getUserManual(partnerLuvProfile.reportId)
        ]);

        if (!myManualData?.data || !partnerManualData?.data) {
          throw new Error("Unable to fetch user manuals");
        }

        // 3. Convert to CompatibilityProfile
        const profile1 = createProfileFromData(myLuvProfile, myManualData.data as UserManualReport);
        const profile2 = createProfileFromData(partnerLuvProfile, partnerManualData.data as UserManualReport);

        setMyProfile(profile1);
        setPartnerProfile(profile2);

      } catch (err) {
        console.error(err);
        setError("데이터를 불러오는 중 문제가 발생했습니다.");
      } finally {
        setLoading(false);
      }
    }

    if (params.id) {
      fetchData();
    }
  }, [params.id]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-black">
        <div className="text-white/50 animate-pulse">Loading data...</div>
      </div>
    );
  }

  if (error || !myProfile || !partnerProfile) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-slate-50 p-4">
        <h1 className="text-xl font-bold text-slate-800 mb-2">오류가 발생했습니다</h1>
        <p className="text-slate-500 mb-6">{error || "프로필을 찾을 수 없습니다."}</p>
        <button 
          onClick={() => router.push('/')}
          className="bg-primary text-white px-6 py-3 rounded-xl font-bold hover:bg-primary/90 transition-colors"
        >
          홈으로 돌아가기
        </button>
      </div>
    );
  }

  return (
    <CompatibilityResultView 
      myProfile={myProfile} 
      partnerProfile={partnerProfile} 
    />
  );
}
