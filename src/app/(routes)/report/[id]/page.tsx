"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { ProductManual } from "@/features/user-manual/components/report/ProductManual";
import { UserManualReport } from "@/features/user-manual/model/report";
import { getUserManual } from "@/features/user-manual/utils/supabase-service";
import { getOrCreateUserId } from "@/features/user-manual/utils/user-storage";

export default function ResultPage() {
  const params = useParams();
  const router = useRouter();
  const id = params.id as string;
  
  const [report, setReport] = useState<UserManualReport | null>(null);
  const [isOwner, setIsOwner] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchData() {
      if (!id) return;

      try {
        setLoading(true);
        // 1. Fetch Report
        const data = await getUserManual(id);
        
        if (!data) {
          setError("리포트를 찾을 수 없습니다.");
          setLoading(false);
          return;
        }

        setReport(data.data as UserManualReport);
        
        // 2. Check Ownership
        const currentUserId = getOrCreateUserId();
        
        console.log("🔍 Ownership Check Debug:");
        console.log("👉 DB Report User ID:", data.user_id);
        console.log("👉 Browser Local Storage ID:", currentUserId);
        console.log("👉 Match Result:", data.user_id === currentUserId);

        // Supabase에서 가져온 데이터의 user_id와 현재 브라우저의 user_id 비교
        if (data.user_id === currentUserId) {
          setIsOwner(true);
        } else {
          setIsOwner(false);
        }
      } catch (err) {
        console.error(err);
        setError("데이터를 불러오는 중 오류가 발생했습니다.");
      } finally {
        setLoading(false);
      }
    }

    fetchData();
  }, [id]);

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-background">
        <div className="animate-pulse flex flex-col items-center gap-4">
          <div className="w-12 h-12 border-4 border-primary border-t-transparent rounded-full animate-spin" />
          <p className="text-slate-500 font-medium">답변을 분석하고 있어요!</p>
        </div>
      </div>
    );
  }

  if (error || !report) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen bg-background p-6 text-center">
        <h2 className="text-2xl font-bold text-slate-800 mb-2">페이지를 찾을 수 없어요</h2>
        <p className="text-slate-500 mb-6">{error || "잘못된 접근입니다."}</p>
        <button 
          onClick={() => router.push("/")}
          className="px-6 py-3 bg-primary text-white rounded-xl font-bold"
        >
          홈으로 돌아가기
        </button>
      </div>
    );
  }

  return <ProductManual report={report} isOwner={isOwner} />;
}
