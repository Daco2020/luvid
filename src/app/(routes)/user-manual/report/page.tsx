"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { generateUserManual, UserManualReport } from "@/features/user-manual/model/report";
import { loadUserManual } from "@/features/user-manual/utils/storage";
import { generateReportId } from "@/features/user-manual/utils/id-generator";
import { getOrCreateUserId } from "@/features/user-manual/utils/user-storage";
import { saveUserManual } from "@/features/user-manual/utils/supabase-service";

export default function ReportPage() {
  const router = useRouter();
  const [status, setStatus] = useState<"loading" | "saving" | "error" | "done">("loading");

  useEffect(() => {
    async function processReport() {
      try {
        // 1. Load Data
        const data = loadUserManual();

        if (!data || !data.section1 || !data.section2 || !data.section3) {
          console.warn("Insufficient data for report generation", data);
          // router.replace("/user-manual/maintenance"); 
          setStatus("error");
          return;
        }

        // 2. Generate Report
        const generated = generateUserManual(data);
        if (!generated) {
          setStatus("error");
          return;
        }

        // 3. Prepare IDs
        setStatus("saving");
        const reportId = generateReportId();
        const userId = getOrCreateUserId();

        // 4. Save to Supabase
        await saveUserManual(reportId, userId, generated);

        // 5. Redirect to Result Page (id 기반)
        router.replace(`/report/${reportId}`);

      } catch (err) {
        console.error("Failed to save report:", err);
        setStatus("error");
      }
    }

    processReport();
  }, [router]);

  if (status === "loading" || status === "saving") {
    return (
      <div className="flex items-center justify-center min-h-screen bg-background">
        <div className="flex flex-col items-center gap-4">
          <div className="w-12 h-12 border-4 border-primary border-t-transparent rounded-full animate-spin" />
          <p className="text-slate-500 font-medium">
            {status === "loading" ? "데이터 분석 중..." : "설명서를 저장하고 있어요..."}
          </p>
        </div>
      </div>
    );
  }

  if (status === "error") {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen bg-background p-6 text-center">
        <h2 className="text-2xl font-bold text-slate-800 mb-2">데이터가 부족합니다</h2>
        <p className="text-slate-500 mb-6">모든 섹션을 완료해야 최종 리포트를 볼 수 있습니다.</p>
        <button 
          onClick={() => router.push("/")}
          className="px-6 py-3 bg-primary text-white rounded-xl font-bold"
        >
          처음으로 돌아가기
        </button>
      </div>
    );
  }

  return null; // Redirecting...
}
