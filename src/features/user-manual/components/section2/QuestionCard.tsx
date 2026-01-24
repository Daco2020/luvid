"use client";

import { motion } from "framer-motion";
import { Question, AnswerChoice } from "../../model/section2-schema";

interface QuestionCardProps {
  question: Question;
  onAnswer: (choice: AnswerChoice) => void;
  selectedChoiceId?: string;
  disabled?: boolean;
}

export function QuestionCard({
  question,
  onAnswer,
  selectedChoiceId,
  disabled = false,
}: QuestionCardProps) {
  return (
    <div className="glass-card p-6 md:p-8 space-y-6">
      {/* Scenario */}
      {question.scenario && (
        <div className="bg-rose-50 border border-rose-100 rounded-lg p-4">
          <p className="text-sm text-gray-700 leading-relaxed whitespace-pre-line">
            {question.scenario}
          </p>
        </div>
      )}

      {/* Question */}
      <h2 className="text-xl md:text-2xl font-bold text-gray-900 leading-tight">
        {question.question}
      </h2>

      {/* Choices */}
      <div className="space-y-3">
        {question.choices.map((choice) => {
          const isSelected = selectedChoiceId === choice.id;

          return (
            <motion.button
              key={choice.id}
              onClick={() => !disabled && onAnswer(choice)}
              disabled={disabled}
              whileHover={!disabled ? { scale: 1.02 } : {}}
              whileTap={!disabled ? { scale: 0.98 } : {}}
              className={`
                w-full text-left p-4 rounded-xl border-2 transition-all
                ${
                  isSelected
                    ? "border-rose-500 bg-rose-50"
                    : "border-gray-200 bg-white hover:border-rose-300 hover:bg-rose-50/50"
                }
                ${disabled ? "opacity-50 cursor-not-allowed" : "cursor-pointer"}
              `}
            >
              <div className="flex items-start gap-3">
                <div
                  className={`
                    flex-shrink-0 w-5 h-5 rounded-full border-2 mt-0.5
                    ${
                      isSelected
                        ? "border-rose-500 bg-rose-500"
                        : "border-gray-300"
                    }
                  `}
                >
                  {isSelected && (
                    <div className="w-full h-full flex items-center justify-center">
                      <div className="w-2 h-2 bg-white rounded-full" />
                    </div>
                  )}
                </div>
                <div className="flex-1 space-y-1">
                  <p className="font-medium text-gray-900">{choice.text}</p>
                  {choice.description && (
                    <p className="text-sm text-gray-600">
                      {choice.description}
                    </p>
                  )}
                </div>
              </div>
            </motion.button>
          );
        })}
      </div>
    </div>
  );
}
