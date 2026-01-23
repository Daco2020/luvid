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
    <div className="w-full flex flex-col gap-8">
      {/* Scenario Text */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -10 }}
        transition={{ duration: 0.3 }}
        className="w-full"
      >
        <div className="text-xl md:text-2xl text-slate-800 font-medium leading-relaxed whitespace-pre-wrap break-keep">
          {question.scenario}
        </div>
        <div className="mt-4 text-primary font-bold text-lg md:text-xl">
          Q. {question.question}
        </div>
      </motion.div>

      {/* Choices - Grid for better spacing */}
      <div className="w-full flex flex-col gap-3">
        {question.choices.map((choice, index) => (
          <motion.button
            key={choice.id}
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.2, delay: index * 0.05 }}
            onClick={() => !isExiting && onAnswer(choice)}
            disabled={isExiting}
            className="w-full text-left p-5 rounded-xl bg-white border border-slate-200 hover:border-primary/50 hover:bg-slate-50 hover:shadow-md transition-all duration-200 group relative overflow-hidden"
          >
            <div className="relative z-10">
              <span className="text-base font-semibold text-slate-700 group-hover:text-slate-900 transition-colors block mb-1">
                {choice.text}
              </span>
              {choice.description && (
                <span className="text-sm text-slate-500 font-normal block">
                  {choice.description}
                </span>
              )}
            </div>
          </motion.button>
        ))}
      </div>
    </div>
  );
}
