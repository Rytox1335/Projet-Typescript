import React from 'react';
import { Check, X } from 'lucide-react';

interface AnswerButtonProps {
  answerText: string;
  index: number;
  isSelected: boolean;
  isCorrect: boolean;
  isAnswered: boolean;
  correctAnswerText: string;
  onSelectAnswer: (answerText: string) => void;
  id?: string;
}

const BADGES = ['A', 'B', 'C', 'D'];

export const AnswerButton: React.FC<AnswerButtonProps> = ({
  answerText,
  index,
  isSelected,
  isCorrect,
  isAnswered,
  correctAnswerText,
  onSelectAnswer,
  id
}) => {
  let statusClass = '';
  let IconElement = null;

  if (isAnswered) {
    if (answerText === correctAnswerText) {
      statusClass = 'correct';
      IconElement = <Check size={20} color="#10B981" />;
    } else if (isSelected && !isCorrect) {
      statusClass = 'wrong';
      IconElement = <X size={20} color="#EF4444" />;
    }
  }

  return (
    <button
      id={id || `answer-btn-${index}`}
      className={`answer-btn ${statusClass}`.trim()}
      onClick={() => !isAnswered && onSelectAnswer(answerText)}
      disabled={isAnswered}
    >
      <div style={{ display: 'flex', alignItems: 'center', gap: '0.875rem' }}>
        <span className="answer-badge">{BADGES[index] || index + 1}</span>
        <span>{answerText}</span>
      </div>
      {IconElement}
    </button>
  );
};
