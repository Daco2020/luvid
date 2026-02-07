"use client";

import { motion, AnimatePresence } from "framer-motion";
import { CheckCircle } from "lucide-react";
import { ToastMessage } from "../hooks/useToast";

interface ToastProps {
  message: ToastMessage | null;
}

export function Toast({ message }: ToastProps) {
  return (
    <AnimatePresence>
      {message && (
        <motion.div
          initial={{ y: 100, opacity: 0, scale: 0.9 }}
          animate={{ y: 0, opacity: 1, scale: 1 }}
          exit={{ y: 100, opacity: 0, scale: 0.9 }}
          transition={{ type: "spring", damping: 25, stiffness: 300 }}
          className="fixed bottom-6 w-[calc(100%-3rem)] sm:w-auto sm:max-w-sm sm:bottom-8 left-1/2 -translate-x-1/2 z-50 px-4 py-3 sm:px-6 sm:py-4 bg-primary text-white rounded-xl sm:rounded-2xl shadow-2xl flex items-center gap-3"
        >
          <CheckCircle size={18} className="shrink-0 sm:w-5 sm:h-5" />
          <div className="text-xs sm:text-sm font-medium">
            <p className="font-bold leading-tight sm:leading-normal">{message.title}</p>
            {message.description && (
              <p className="text-white/90 text-[10px] sm:text-xs mt-0.5 sm:mt-1 leading-tight sm:leading-normal">{message.description}</p>
            )}
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
