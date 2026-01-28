"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { ProductManual } from "@/features/user-manual/components/report/ProductManual";
import { generateUserManual, UserManualReport } from "@/features/user-manual/model/report";
import { loadUserManual } from "@/features/user-manual/utils/storage";

export default function ReportPage() {
  const router = useRouter();
  const [report, setReport] = useState<UserManualReport | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // 1. Load Data
    const data = loadUserManual();

    if (!data || !data.section1 || !data.section2 || !data.section3) {
      // 데이터가 없거나 불완전하면 홈으로 리다이렉트 (또는 안내)
      // 개발 중에는 편의를 위해 일단 콘솔 경고만 하고 리턴
      console.warn("Insufficient data for report generation", data);
      
      // 실제 배포 시에는 아래 주석 해제
      // alert("분석 데이터가 부족합니다. 처음부터 다시 진행해주세요.");
      // router.replace("/user-manual/maintenance"); 
      
      setLoading(false);
      return;
    }

    // 2. Generate Report
    const generated = generateUserManual(data);
    setReport(generated);
    setLoading(false);
  }, [router]);

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-background">
        <div className="animate-pulse flex flex-col items-center gap-4">
          <div className="w-12 h-12 border-4 border-primary border-t-transparent rounded-full animate-spin" />
          <p className="text-slate-500 font-medium">매뉴얼 제작 중...</p>
        </div>
      </div>
    );
  }

  if (!report) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen bg-background p-6 text-center">
        <h2 className="text-2xl font-bold text-slate-800 mb-2">데이터가 부족합니다</h2>
        <p className="text-slate-500 mb-6">모든 섹션을 완료해야 최종 리포트를 볼 수 있습니다.</p>
        <button 
          onClick={() => router.push("/user-manual/maintenance")}
          className="px-6 py-3 bg-primary text-white rounded-xl font-bold"
        >
          테스트 시작하기
        </button>
      </div>
    );
  }

  return <ProductManual report={report} />;
}
