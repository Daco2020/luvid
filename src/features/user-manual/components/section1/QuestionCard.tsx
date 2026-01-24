"use client";

import { motion } from "framer-motion";
import { Question, AnswerChoice } from "@/features/user-manual/model/section1-schema";

interface QuestionCardProps {
  question: Question;
  onAnswer: (choice: AnswerChoice) => void;
  isExiting: boolean;
  selectedChoiceId?: string;
}

export function QuestionCard({ question, onAnswer, isExiting, selectedChoiceId }: QuestionCardProps) {
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
        <div className="mt-4 text-primary font-bold text-lg md:text-xl">
          Q. {question.question}
        </div>

          {/* 여백 추가 */}
          <div className="h-4" />
      {/* Choices - Grid for better spacing */}
      <div className="w-full flex flex-col gap-3">
        {question.choices.map((choice, index) => {
          const isSelected = selectedChoiceId === choice.id;
          return (
            <button
              key={choice.id}
              onClick={() => !isExiting && onAnswer(choice)}
              disabled={isExiting}
              className={`w-full text-left p-5 rounded-xl border transition-all duration-200 group relative overflow-hidden ${
                isSelected 
                  ? "bg-primary/5 border-primary shadow-sm" 
                  : "bg-white border-slate-200 hover:border-primary/50 hover:bg-slate-50 hover:shadow-md"
              }`}
            >
              <div className="relative z-10">
                <span className={`text-base font-semibold transition-colors block mb-1 ${
                  isSelected ? "text-primary" : "text-slate-700 group-hover:text-slate-900"
                }`}>
                  {choice.text}
                </span>
                {choice.description && (
                  <span className={`text-sm font-normal block ${
                    isSelected ? "text-primary/70" : "text-slate-500"
                  }`}>
                    {choice.description}
                  </span>
                )}
              </div>
            </button>
          );
        })}
      </div>
      </motion.div>
    </div>
  );
}
