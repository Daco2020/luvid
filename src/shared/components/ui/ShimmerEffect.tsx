"use client";

import { motion } from "framer-motion";

interface ShimmerEffectProps {
  className?: string;
  duration?: number;
  repeatDelay?: number;
  delay?: number;
}

export function ShimmerEffect({
  className,
  duration = 1.5,
  repeatDelay = 5,
  delay = 0
}: ShimmerEffectProps) {
  return (
    <motion.div
      initial={{ x: "-100%", opacity: 0 }}
      animate={{ x: "100%", opacity: [0, 1, 0] }}
      transition={{
        repeat: Infinity,
        duration: duration,
        repeatDelay: repeatDelay,
        ease: "easeInOut",
        delay: delay
      }}
      className={`absolute inset-0 w-full h-full bg-gradient-to-r from-transparent via-white/20 to-transparent -skew-x-20 pointer-events-none z-20 ${className || ""}`}
    />
  );
}
