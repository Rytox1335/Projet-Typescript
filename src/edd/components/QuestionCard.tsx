import React from 'react';
import { FormattedQuestion } from '../types/quiz';
import { AnswerButton } from './AnswerButton';

interface QuestionCardProps {
  question: FormattedQuestion;
  selectedAnswer: string | null;
  isAnswered: boolean;
  onSelectAnswer: (answerText: string) => void;
}

export const QuestionCard: React.FC<QuestionCardProps> = ({
  question,
  selectedAnswer,
  isAnswered,
  onSelectAnswer
}) => {
  return (
    <div className="glass-card question-card" id="question-card">
      <h2 className="question-text" id="question-title">
        {question.questionText}
      </h2>

      <div className="answers-grid" id="answers-container">
        {question.options.map((option, idx) => {
          const isSelected = selectedAnswer === option;
          const isCorrect = option === question.correctAnswer;

          return (
            <AnswerButton
              key={`${question.id}-opt-${idx}`}
              id={`answer-option-${idx + 1}`}
              answerText={option}
              index={idx}
              isSelected={isSelected}
              isCorrect={isCorrect}
              isAnswered={isAnswered}
              correctAnswerText={question.correctAnswer}
              onSelectAnswer={onSelectAnswer}
            />
          );
        })}
      </div>
    </div>
  );
};
