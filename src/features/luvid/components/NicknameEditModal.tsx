"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, Check, Loader2 } from "lucide-react";
import { useToast } from "@/shared/hooks/useToast";
import { updateLuvIdNickname } from "../utils/supabase-service";

interface NicknameEditModalProps {
  isOpen: boolean;
  onClose: () => void;
  currentNickname: string;
  luvId: string; // profile.id
  onSuccess: (newNickname: string) => void;
}

export function NicknameEditModal({
  isOpen,
  onClose,
  currentNickname,
  luvId,
  onSuccess
}: NicknameEditModalProps) {
  const { showToast } = useToast();
  const [nickname, setNickname] = useState(currentNickname);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  // Validation function: Korean 2 points, English/Number/Symbol 1 point
  // Max 16 points (8 Korean or 16 English)
  const validateNickname = (value: string) => {
    let score = 0;
    for (let i = 0; i < value.length; i++) {
      const charCode = value.charCodeAt(i);
      // Korean characters (Hangul Syllables, Jamo, Compatibility Jamo)
      if (
        (charCode >= 0xAC00 && charCode <= 0xD7A3) || 
        (charCode >= 0x1100 && charCode <= 0x11FF) || 
        (charCode >= 0x3130 && charCode <= 0x318F)
      ) {
        score += 2;
      } else {
        score += 1;
      }
    }
    return score;
  };

  const score = validateNickname(nickname);

  const handleNicknameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newVal = e.target.value;
    const newScore = validateNickname(newVal);
    
    if (newScore > 16) {
      setError("한글 8자 또는 영문 16자 이내로 입력해주세요.");
    } else {
      setError("");
    }
    setNickname(newVal);
  };

  const handleSave = async () => {
    if (!nickname.trim()) {
      showToast({
        title: "입력 오류",
        description: "닉네임을 입력해주세요."
      });
      return;
    }

    if (score > 16) {
      showToast({
        title: "입력 오류",
        description: "글자 수 제한을 확인해주세요."
      });
      return;
    }

    if (nickname === currentNickname) {
      onClose();
      return;
    }

    try {
      setLoading(true);
      await updateLuvIdNickname(luvId, nickname);
      
      showToast({
        title: "닉네임 변경 완료",
        description: "닉네임이 성공적으로 변경되었습니다."
      });
      
      onSuccess(nickname);
      onClose();
    } catch (error) {
      console.error("Failed to update nickname:", error);
      showToast({
        title: "변경 실패",
        description: "닉네임 변경 중 오류가 발생했습니다."
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
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
              className="bg-white rounded-2xl shadow-2xl max-w-sm w-full pointer-events-auto overflow-hidden p-6"
            >
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-bold text-slate-800">닉네임 수정</h3>
                <button
                  onClick={onClose}
                  className="p-1 hover:bg-slate-100 rounded-full transition-colors text-slate-500"
                >
                  <X size={20} />
                </button>
              </div>

              <div className="mb-6">
                <input
                  type="text"
                  value={nickname}
                  onChange={handleNicknameChange}
                  className={`w-full px-4 py-3 bg-slate-50 border rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 transition-colors ${
                    error ? "border-red-300 focus:ring-red-200" : "border-slate-200"
                  } text-slate-800 placeholder-slate-400`}
                  placeholder="새로운 닉네임 입력"
                  autoFocus
                />
                
                <div className="flex justify-between items-center mt-2 px-1">
                  <span className={`text-xs ${error ? "text-red-500" : "text-slate-400"}`}>
                    {error || "한글 8자, 영문 16자 이내"}
                  </span>
                </div>
              </div>

              <div className="flex gap-2">
                <button
                  onClick={onClose}
                  disabled={loading}
                  className="flex-1 py-3 px-4 rounded-xl border border-slate-200 text-slate-600 font-bold hover:bg-slate-50 transition-colors"
                >
                  취소
                </button>
                <button
                  onClick={handleSave}
                  disabled={loading || !nickname.trim() || !!error || score > 16}
                  className="flex-1 py-3 px-4 rounded-xl bg-blue-500 text-white font-bold hover:bg-blue-600 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                >
                  {loading ? (
                    <Loader2 size={18} className="animate-spin" />
                  ) : (
                    <>
                      <Check size={18} />
                      <span>저장</span>
                    </>
                  )}
                </button>
              </div>
            </motion.div>
          </div>
        </>
      )}
    </AnimatePresence>
  );
}
