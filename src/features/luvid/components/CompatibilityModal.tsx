"use client";

import { useState, useEffect } from "react";
import { useRef } from "react";
import { createPortal } from "react-dom";
import { useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { X, HeartHandshake, Loader2 } from "lucide-react";

const Portal = ({ children }: { children: React.ReactNode }) => {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    return () => setMounted(false);
  }, []);

  if (typeof window === "undefined" || !mounted) return null;

  return createPortal(children, document.body);
};
import { getMyLuvIdFromStorage } from "../utils/luvid-storage";
import { getLuvIdById } from "../utils/supabase-service";
import { useToast } from "@/shared/hooks/useToast";

interface CompatibilityModalProps {
  isOpen: boolean;
  onClose: () => void;
  /**
   * If true, this is the owner's card (My Luv ID page)
   * If false, this is a shared card (viewing someone else's card)
   */
  isOwner: boolean;
  /**
   * The Luv ID of the profile being viewed
   */
  viewedProfileId?: string;
  /**
   * Whether the current user has a report (manual)
   */
  hasReport: boolean;
}

export function CompatibilityModal({
  isOpen,
  onClose,
  isOwner,
  viewedProfileId,
  hasReport
}: CompatibilityModalProps) {
  const router = useRouter();
  const { showToast } = useToast();
  const [myLuvId, setMyLuvId] = useState("");
  const [partnerLuvId, setPartnerLuvId] = useState("");
  const [loading, setLoading] = useState(false);
  const [validationError, setValidationError] = useState<string | null>(null);

  useEffect(() => {
    if (isOpen) {
      // Load My Luv ID from localStorage
      const storedId = getMyLuvIdFromStorage();
      if (storedId) {
        setMyLuvId(storedId);
      }

      // If viewing someone else's card, auto-fill partner's ID
      if (!isOwner && viewedProfileId) {
        setPartnerLuvId(viewedProfileId);
      }
      
      // Clear error when modal opens
      setValidationError(null);
    }
  }, [isOpen, isOwner, viewedProfileId]);

  // Real-time validation for Same ID
  useEffect(() => {
    // Clear error on input change
    setValidationError(null);

    // Check for Same ID
    if (myLuvId && partnerLuvId && 
        myLuvId.replace(/\s/g, "").toUpperCase() === partnerLuvId.replace(/\s/g, "").toUpperCase()) {
      setValidationError("동일한 대상은 궁합을 볼 수 없어요");
    }
  }, [myLuvId, partnerLuvId]);

  const handleAnalyze = async () => {
    // Validation (Empty checks)
    if (!myLuvId.trim()) {
      setValidationError("나의 Luv ID를 확인할 수 없어요.");
      return;
    }

    if (!partnerLuvId.trim()) {
      setValidationError("상대방의 Luv ID를 입력해주세요.");
      return;
    }

    // Same ID check (Double check)
    if (myLuvId.replace(/\s/g, "").toUpperCase() === partnerLuvId.replace(/\s/g, "").toUpperCase()) {
      setValidationError("동일한 대상은 궁합을 볼 수 없어요");
      return;
    }

    // Check if user has created their manual
    if (!hasReport) {
      showToast({
        title: "사용 설명서 필요",
        description: "먼저 나 사용 설명서를 만들어야 해요!"
      });
      setTimeout(() => {
        router.push("/");
      }, 1500);
      return;
    }

    try {
      setLoading(true);

      // Verify if partner ID exists in DB
      const partnerProfile = await getLuvIdById(partnerLuvId);
      
      if (!partnerProfile) {
        setValidationError("존재하지 않는 ID입니다. 다시 확인 해주세요.");
        setLoading(false);
        return;
      }

      // TODO: Create/fetch compatibility record from DB
      // For now, generate a temporary compatibility ID
      const compatibilityId = `${myLuvId}_${partnerLuvId}`;

      // Navigate to compatibility page
      router.push(`/luvid/compatibility/${compatibilityId}`);
    } catch (error) {
      console.error("Compatibility check failed:", error);
      showToast({
        title: "오류 발생",
        description: "궁합 분석 중 문제가 발생했습니다."
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <Portal>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50"
          />

          {/* Modal */}
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 pointer-events-none">
            <motion.div
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 20 }}
              transition={{ type: "spring", duration: 0.5 }}
              className="bg-white rounded-3xl shadow-2xl max-w-md w-full pointer-events-auto overflow-hidden"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Header */}
              <div className="bg-gradient-to-r from-pink-500 to-purple-500 p-6 text-white relative">
                <button
                  onClick={onClose}
                  className="absolute top-4 right-4 p-2 hover:bg-white/20 rounded-full transition-colors"
                >
                  <X size={20} />
                </button>
                <div className="flex items-center gap-3 mb-2">
                  <HeartHandshake size={28} />
                  <h2 className="text-2xl font-bold">연애 궁합 분석</h2>
                </div>
                <p className="text-white/90 text-sm">
                  두 사람의 Luv ID로 궁합을 확인해보세요
                </p>
              </div>

              {/* Content */}
              <div className="p-6 space-y-4">
                {/* My Luv ID */}
                <div>
                  <label className="block text-sm font-semibold text-slate-700 mb-2">
                    나의 Luv ID
                  </label>
                  <input
                    type="text"
                    value={myLuvId}
                    readOnly
                    className="w-full px-4 py-3 bg-slate-100 border border-slate-200 rounded-xl text-slate-800 font-mono text-sm cursor-not-allowed"
                    placeholder="홈에서 Luv ID를 생성해주세요"
                  />
                </div>

                {/* Partner's Luv ID */}
                <div>
                  <label className="block text-sm font-semibold text-slate-700 mb-2">
                    상대방의 Luv ID
                  </label>
                  <input
                    type="text"
                    value={partnerLuvId}
                    onChange={(e) => setPartnerLuvId(e.target.value)}
                    readOnly={!isOwner}
                    className={`w-full px-4 py-3 border rounded-xl font-mono text-sm transition-colors ${
                      isOwner
                        ? "bg-white border-slate-300 focus:outline-none focus:ring-2 focus:ring-pink-500 focus:border-transparent"
                        : "bg-slate-100 border-slate-200 cursor-not-allowed"
                    }`}
                    placeholder={isOwner ? "상대방이 공유한 Luv ID를 입력하세요" : "자동으로 불러옵니다"}
                  />
                  <p className="text-xs text-slate-500 mt-2 text-center">
                    상대방은 궁합 결과를 알 수 없어요. 분석 후 결과를 공유해보세요.
                  </p>
                </div>

                {/* Error Message Space / Placeholder */}
                <div className="h-6 flex items-center justify-center">
                  {validationError && (
                    <motion.p
                      initial={{ opacity: 0, y: -5 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="text-red-500 text-sm font-medium"
                    >
                      {validationError}
                    </motion.p>
                  )}
                </div>

                {/* Analyze Button */}
                <button
                  onClick={handleAnalyze}
                  disabled={loading}
                  className="w-full bg-gradient-to-r from-pink-500 to-purple-500 text-white font-bold py-4 rounded-xl hover:from-pink-600 hover:to-purple-600 transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                >
                  {loading ? (
                    <>
                      <Loader2 size={20} className="animate-spin" />
                      <span>분석 중...</span>
                    </>
                  ) : (
                    <>
                      <HeartHandshake size={20} />
                      <span>궁합 분석 시작</span>
                    </>
                  )}
                </button>
              </div>
            </motion.div>
          </div>
        </Portal>
      )}
    </AnimatePresence>
  );
}
