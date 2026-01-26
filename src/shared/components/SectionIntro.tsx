"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

interface SectionIntroProps {
  sectionNumber: number;
  title: string;
  onComplete: () => void;
  duration?: number;
}

export function SectionIntro({
  sectionNumber,
  title,
  onComplete,
  duration = 1000,
}: SectionIntroProps) {
  const [displayedText, setDisplayedText] = useState("");
  const fullText = `섹션 ${sectionNumber}\n${title}`;

  useEffect(() => {
    let currentIndex = 0;
    const typingInterval = setInterval(() => {
      if (currentIndex <= fullText.length) {
        setDisplayedText(fullText.slice(0, currentIndex));
        currentIndex++;
      } else {
        clearInterval(typingInterval);
        // 타이핑 완료 후 잠시 대기했다가 완료 처리
        setTimeout(onComplete, duration);
      }
    }, 100); // 타이핑 속도

    return () => clearInterval(typingInterval);
  }, [fullText, onComplete, duration]);

  return (
    <motion.div
      className="fixed inset-0 z-50 flex items-center justify-center bg-background w-screen h-screen"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0, transition: { duration: 0.8 } }}
    >
      <h1 className="text-3xl md:text-5xl font-bold text-slate-800 text-center leading-tight whitespace-pre-wrap">
        {displayedText}
        <motion.span
          animate={{ opacity: [0, 1, 0] }}
          transition={{ repeat: Infinity, duration: 0.8 }}
          className="inline-block w-1 h-8 md:h-12 bg-primary ml-1 align-middle"
        />
      </h1>
    </motion.div>
  );
}
