import { motion, AnimatePresence } from "framer-motion";
import { useState, useEffect } from "react";

interface TransitionScreenProps {
  type: "positive" | "negative";
  onComplete: () => void;
}

export function TransitionScreen({ type, onComplete }: TransitionScreenProps) {
  const [showButton, setShowButton] = useState(false);

  // 설정
  const config = {
    positive: {
      bgColor: "#EEF0FC",       // 시작: 기본 배경
      targetColor: "#547AB3",      // 끝: Primary (파랑)
      messages: [
        "선택해주신 가치들을 바탕으로,",
        "당신이 가장 중요하게 생각하는 것을",
        "찾아보겠습니다."
      ],
      buttonText: "시작하기",
      textColor: "text-white", // Primary 위 텍스트
      accentColor: "text-white font-bold",
    },
    negative: {
      bgColor: "#EEF0FC",       // 시작: 기본 배경
      targetColor: "#232931",   // 끝: Foreground (검정)
      messages: [
        "지금까지 당신이 사랑하는 것들을 알아보았습니다.",
        "", 
        "이제 반대로,",
        "절대 참을 수 없는 것들을 확인해보겠습니다."
      ],
      buttonText: "계속하기",
      textColor: "text-background",       // Foreground 위 텍스트
      accentColor: "text-red-500 font-bold",
    },
  };

  const currentConfig = config[type];

  // 버튼 표시 타이머
  useEffect(() => {
    const timer = setTimeout(() => {
      setShowButton(true);
    }, type === "positive" ? 2500 : 3500); 
    return () => clearTimeout(timer);
  }, [type]);

  // 컨테이너 애니메이션
  const containerVariants = {
    initial: { 
      opacity: 0,
      backgroundColor: currentConfig.bgColor 
    },
    animate: { 
      opacity: 1,
      backgroundColor: currentConfig.targetColor,
      transition: { duration: 1.5, ease: "easeInOut" as const }
    },
    exit: { opacity: 0, transition: { duration: 0.5 } }
  };

  return (
    <motion.div
      variants={containerVariants}
      initial="initial"
      animate="animate"
      exit="exit"
      className="fixed inset-0 z-50 flex flex-col items-center justify-center p-6 text-center"
    >
      <div className="max-w-2xl w-full space-y-2 md:space-y-4">
        {currentConfig.messages.map((msg, index) => (
          <motion.p
            key={index}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ 
              delay: 0.5 + (index * 0.8), // 순차적 등장
              duration: 0.8,
              ease: "easeOut" 
            }}
            className={`
              text-lg md:text-3xl font-medium leading-relaxed
              ${msg.includes("반대로") || msg.includes("절대") ? currentConfig.accentColor : currentConfig.textColor}
              ${msg === "" ? "h-2 md:h-4" : ""} 
            `}
          >
            {msg}
          </motion.p>
        ))}
      </div>

      <button
        onClick={onComplete}
        className={`
          absolute bottom-24 md:bottom-32
          px-10 py-3 md:px-12 md:py-4 
          rounded-full text-base md:text-xl font-bold 
          shadow-lg transition-all duration-1000 ease-out transform
          ${showButton ? "opacity-100 translate-y-0" : "opacity-0 translate-y-12 pointer-events-none"}
          hover:scale-105 active:scale-95
          bg-background
          ${type === "positive" ? "text-primary" : "text-foreground"}
        `}
      >
        {currentConfig.buttonText}
      </button>
    </motion.div>
  );
}
