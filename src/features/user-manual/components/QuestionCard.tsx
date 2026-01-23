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
        className="w-full"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1 }}
      >
        <div className="text-lg md:text-xl text-slate-800 font-medium leading-relaxed whitespace-normal break-keep w-full">
          {question.scenario.split('\n').map((line, i) => (
            <span key={i}>
              {line}
              <br />
            </span>
          ))}
        </div>
        <div className="mt-8 text-primary font-bold text-lg md:text-xl">
          Q. {question.question}
        </div>

          {/* 여백 추가 */}
          <div className="h-4" />
      {/* Choices - Grid for better spacing */}
      <div className="w-full flex flex-col gap-3">
        {question.choices.map((choice, index) => (
          <motion.button
            key={choice.id}
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
      </motion.div>
    </div>
  );
}
