"use client";

import { motion } from "framer-motion";
import { Question, AnswerChoice } from "@/features/user-manual/model/section1-schema";

interface QuestionCardProps {
  question: Question;
  onAnswer: (choice: AnswerChoice) => void;
  isExiting: boolean;
}

export function QuestionCard({ question, onAnswer, isExiting }: QuestionCardProps) {
  return (
    <div className="w-full max-w-2xl mx-auto px-4">
      {/* Scenario Text */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -10 }}
        transition={{ duration: 0.3 }}
        className="mb-8 text-center md:text-left"
      >
        <div className="text-xl md:text-2xl text-slate-800 font-medium leading-relaxed whitespace-pre-wrap break-keep">
          {question.scenario}
        </div>
        <div className="mt-6 text-primary font-bold text-lg md:text-xl">
          Q. {question.question}
        </div>
      </motion.div>

      {/* Choices */}
      <div className="space-y-3">
        {question.choices.map((choice, index) => (
          <motion.button
            key={choice.id}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.2, delay: index * 0.05 }}
            onClick={() => !isExiting && onAnswer(choice)}
            disabled={isExiting}
            className="w-full text-left p-5 rounded-xl bg-white border border-slate-200 hover:border-primary/50 hover:bg-slate-50 hover:shadow-md transition-all duration-200 group relative overflow-hidden active:scale-[0.99]"
          >
            <div className="relative z-10 flex flex-col items-start">
              <span className="text-base md:text-lg font-semibold text-slate-700 group-hover:text-slate-900 transition-colors">
                {choice.text}
              </span>
              {choice.description && (
                <span className="text-sm text-slate-500 mt-1group-hover:text-slate-600 transition-colors font-normal">
                  {choice.description}
                </span>
              )}
            </div>
            
            {/* Hover Effect Background */}
            <div className="absolute inset-0 bg-primary/5 opacity-0 group-hover:opacity-100 transition-opacity duration-200" />
          </motion.button>
        ))}
      </div>
    </div>
  );
}
