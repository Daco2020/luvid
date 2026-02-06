"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { CompatibilityResultView } from "@/features/luvid/components/CompatibilityResult";
import { CompatibilityLoading } from "@/features/luvid/components/CompatibilityLoading";
import { getCompatibilityResult } from "@/features/luvid/utils/compatibility-service";
import { CompatibilityResult } from "@/features/luvid/utils/compatibility-algorithm";

export default function CompatibilityPage() {
  const params = useParams();
  const router = useRouter();
  const [mounted, setMounted] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [result, setResult] = useState<CompatibilityResult | null>(null);

  // Fix hydration issue
  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    async function fetchData() {
      console.log("🔍 [Compatibility] Starting data fetch...");
      console.log("🔍 [Compatibility] ID:", params.id);
      console.log("🔍 [Compatibility] Loading state:", loading);
      
      try {
        const id = decodeURIComponent(params.id as string);
        console.log("🔍 [Compatibility] Decoded ID:", id);

        // Fetch compatibility result from DB
        console.log("🔍 [Compatibility] Fetching from DB...");
        const record = await getCompatibilityResult(id);
        console.log("🔍 [Compatibility] Record:", record);

        if (!record) {
          throw new Error("Compatibility result not found");
        }

        // Simulate loading screen for at least 5 seconds to show full animation
        console.log("🔍 [Compatibility] Starting 5 second delay...");
        await new Promise(resolve => setTimeout(resolve, 5000));
        console.log("🔍 [Compatibility] Delay complete!");

        setResult(record.data);
        console.log("🔍 [Compatibility] Result set:", record.data);
      } catch (err) {
        console.error("❌ [Compatibility] Error:", err);
        setError("데이터를 불러오는 중 문제가 발생했습니다.");
      } finally {
        console.log("🔍 [Compatibility] Setting loading to false");
        setLoading(false);
      }
    }

    if (params.id && mounted) {
      fetchData();
    }
  }, [params.id, mounted]);

  console.log("🎨 [Compatibility] Render - Mounted:", mounted, "Loading:", loading, "Error:", error, "Result:", !!result);

  // Prevent hydration mismatch by not rendering until mounted
  if (!mounted) {
    return null;
  }

  if (loading) {
    console.log("✅ [Compatibility] Rendering CompatibilityLoading component");
    return <CompatibilityLoading />;
  }

  if (error || !result) {
    console.log("❌ [Compatibility] Rendering error screen");
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-slate-50 p-4">
        <h1 className="text-xl font-bold text-slate-800 mb-2">오류가 발생했습니다</h1>
        <p className="text-slate-500 mb-6">{error || "결과를 찾을 수 없습니다."}</p>
        <button 
          onClick={() => router.push('/')}
          className="bg-primary text-white px-6 py-3 rounded-xl font-bold hover:bg-primary/90 transition-colors"
        >
          홈으로 돌아가기
        </button>
      </div>
    );
  }

  console.log("✅ [Compatibility] Rendering result view");
  return <CompatibilityResultView result={result} />;
}

