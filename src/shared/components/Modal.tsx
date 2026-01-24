"use client";

import { useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import { motion, AnimatePresence } from "framer-motion";
import { X } from "lucide-react";

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  title?: string;
  description?: string;
  confirmLabel?: string;
  cancelLabel?: string;
  onConfirm?: () => void;
  children?: React.ReactNode;
  variant?: "default" | "danger" | "info";
}

export function Modal({
  isOpen,
  onClose,
  title,
  description,
  confirmLabel = "확인",
  cancelLabel = "취소",
  onConfirm,
  children,
  variant = "default",
}: ModalProps) {
  // ESC 키로 닫기
  useEffect(() => {
    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    if (isOpen) window.addEventListener("keydown", handleEsc);
    return () => window.removeEventListener("keydown", handleEsc);
  }, [isOpen, onClose]);

  // 스크롤 방지
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isOpen]);

  const confirmButtonClass = variant === "danger" 
    ? "bg-error hover:bg-red-400 text-white" 
    : "bg-primary hover:bg-primary/90 text-white";

  // SSR issues prevention
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);

  if (!mounted) return null;

  return createPortal(
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-[9999] flex items-center justify-center p-4">
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="absolute inset-0 bg-black/40 backdrop-blur-[2px]"
          />

          {/* Modal Content */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 10 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 10 }}
            className="relative w-full max-w-sm bg-white rounded-2xl shadow-xl overflow-hidden glass-card p-6"
            onClick={(e) => e.stopPropagation()} // 클릭 버블링 방지
          >
            <div className="flex flex-col gap-4">
              <div className="flex justify-between items-start">
                {title && (
                  <h3 className="text-lg font-bold text-slate-800 break-keep">
                    {title}
                  </h3>
                )}
                {/* 닫기 버튼은 선택사항이지만 편의를 위해 추가 */}
                <button 
                  onClick={onClose}
                  className="p-1 rounded-full text-slate-400 hover:bg-slate-100 hover:text-slate-600 transition-colors -mr-2 -mt-2"
                >
                  <X size={20} />
                </button>
              </div>

              {description && (
                <p className="text-slate-600 text-sm leading-relaxed break-keep whitespace-pre-wrap">
                  {description}
                </p>
              )}

              {children}

              <div className="flex gap-3 justify-end mt-2">
                {onConfirm ? (
                  <>
                    <button
                      onClick={onClose}
                      className="flex-1 py-3 px-4 rounded-xl text-slate-500 font-medium hover:bg-slate-50 transition-colors text-sm"
                    >
                      {cancelLabel}
                    </button>
                    <button
                      onClick={onConfirm}
                      className={`flex-1 py-3 px-4 rounded-xl font-bold shadow-sm transition-all text-sm ${confirmButtonClass}`}
                    >
                      {confirmLabel}
                    </button>
                  </>
                ) : (
                   <button
                      onClick={onClose}
                      className="flex-1 py-3 px-4 rounded-xl bg-primary text-white font-bold shadow-sm hover:bg-primary/90 transition-all text-sm"
                    >
                      {confirmLabel}
                    </button>
                )}
              </div>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>,
    document.body
  );
}
