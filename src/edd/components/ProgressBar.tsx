import React from 'react';

interface ProgressBarProps {
  currentQuestion: number;
  totalQuestions: number;
}

export const ProgressBar: React.FC<ProgressBarProps> = ({ currentQuestion, totalQuestions }) => {
  const percentage = Math.min(100, Math.max(0, (currentQuestion / totalQuestions) * 100));

  return (
    <div className="progress-bar-container" id="quiz-progress-bar">
      <div className="progress-header">
        <span>Progression</span>
        <span id="question-count-text">
          Question {currentQuestion} / {totalQuestions}
        </span>
      </div>
      <div className="progress-track">
        <div className="progress-fill" style={{ width: `${percentage}%` }} />
      </div>
    </div>
  );
};
