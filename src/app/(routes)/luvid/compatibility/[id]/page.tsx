"use client";

import { useParams, useRouter } from "next/navigation";
import { ArrowLeft } from "lucide-react";

export default function CompatibilityPage() {
  const params = useParams();
  const router = useRouter();
  const compatibilityId = params.id as string;

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="sticky top-0 bg-background/80 backdrop-blur-lg border-b border-slate-100 z-10">
        <div className="max-w-2xl mx-auto px-6 py-4 flex items-center justify-between">
          <button
            onClick={() => router.back()}
            className="flex items-center gap-2 text-slate-600 hover:text-slate-800"
          >
            <ArrowLeft size={20} />
            <span className="font-medium">뒤로</span>
          </button>
        </div>
      </div>

      <div className="max-w-2xl mx-auto px-6 py-12">
        <div className="text-center">
          <h1 className="text-3xl font-bold text-slate-800 mb-4">
            연애 궁합 분석
          </h1>
          <p className="text-slate-500 mb-8">
            Compatibility ID: {compatibilityId}
          </p>
          
          <div className="bg-slate-100 rounded-2xl p-12">
            <p className="text-slate-600">
              궁합 분석 페이지는 현재 개발 중입니다.
            </p>
            <p className="text-slate-500 text-sm mt-2">
              곧 두 사람의 궁합을 자세히 분석해드릴게요!
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
