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
          initial={{ y: 100, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: 100, opacity: 0 }}
          transition={{ type: "spring", damping: 25, stiffness: 300 }}
          className="fixed bottom-8 left-1/2 -translate-x-1/2 z-50 px-6 py-4 bg-primary text-white rounded-2xl shadow-2xl flex items-center gap-3 max-w-sm"
        >
          <CheckCircle size={20} className="shrink-0" />
          <div className="text-sm font-medium">
            <p className="font-bold">{message.title}</p>
            {message.description && (
              <p className="text-white/90 text-xs mt-0.5">{message.description}</p>
            )}
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
