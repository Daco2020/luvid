"use client";

import { motion, AnimatePresence } from "framer-motion";
import { ReactNode } from "react";

interface GlassTooltipProps {
  isVisible: boolean;
  title: string;
  description: ReactNode;
  /**
   * Position relative to the trigger element.
   * 'top': Tooltip appears ABOVE the trigger (arrow at bottom).
   * 'bottom': Tooltip appears BELOW the trigger (arrow at top).
   */
  position?: "top" | "bottom";
  /**
   * Horizontal alignment relative to the trigger.
   * 'center': Centered (requires trigger to be relative).
   * 'left': Aligned to left edge of trigger.
   * 'right': Aligned to right edge of trigger.
   */
  align?: "center" | "left" | "right";
  className?: string;
  width?: string;
}

export function GlassTooltip({
  isVisible,
  title,
  description,
  position = "top",
  align = "center",
  className = "",
  width = "w-48 sm:w-56"
}: GlassTooltipProps) {
  // Positioning logic
  const positionClasses = {
    top: "bottom-full mb-2",
    bottom: "top-full mt-2"
  };

  const alignClasses = {
    center: "left-1/2 -translate-x-1/2 origin-center",
    left: "left-0 origin-top-left",
    right: "right-0 origin-top-right"
  };

  const originClass = position === "top" ? "origin-bottom" : "origin-top";
  
  // Arrow positioning
  const arrowPositionClasses = {
    top: "top-full -mt-px border-t-[6px] border-t-slate-900/95 border-b-0",
    bottom: "bottom-full -mb-px border-b-[6px] border-b-slate-900/95 border-t-0"
  };

  const arrowAlignClasses = {
    center: "left-1/2 -translate-x-1/2",
    left: "left-4",
    right: "right-4"
  };

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ opacity: 0, y: position === "top" ? 10 : -10, scale: 0.9 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: position === "top" ? 10 : -10, scale: 0.9 }}
          transition={{ duration: 0.2 }}
          className={`absolute pointer-events-none ${positionClasses[position]} ${alignClasses[align]} ${width} ${originClass} ${className}`}
          style={{ zIndex: 9999 }}
        >
          <div className="bg-slate-900/95 backdrop-blur-md text-white text-sm p-3 rounded-xl shadow-2xl border border-white/10 text-left">
            <div className="font-bold mb-1">{title}</div>
            <div className="text-white/80 leading-relaxed text-xs break-keep">
              {description}
            </div>
            
            {/* Arrow */}
            <div className={`absolute w-0 h-0 border-l-[6px] border-l-transparent border-r-[6px] border-r-transparent ${arrowPositionClasses[position]} ${arrowAlignClasses[align]}`}></div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
