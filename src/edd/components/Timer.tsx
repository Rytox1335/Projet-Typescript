import React, { useEffect } from 'react';
import { Clock } from 'lucide-react';

interface TimerProps {
  seconds: number;
  onTimeUp: () => void;
  isPaused: boolean;
  setSeconds: React.Dispatch<React.SetStateAction<number>>;
}

export const Timer: React.FC<TimerProps> = ({
  seconds,
  onTimeUp,
  isPaused,
  setSeconds
}) => {
  useEffect(() => {
    if (isPaused) return;

    if (seconds <= 0) {
      onTimeUp();
      return;
    }

    const timerId = setInterval(() => {
      setSeconds(prev => {
        if (prev <= 1) {
          clearInterval(timerId);
          onTimeUp();
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timerId);
  }, [seconds, isPaused, onTimeUp, setSeconds]);

  let timerClass = 'timer-normal';
  if (seconds <= 5) {
    timerClass = 'timer-danger';
  } else if (seconds <= 10) {
    timerClass = 'timer-warning';
  }

  return (
    <div className={`timer-container ${timerClass}`} id="quiz-timer">
      <Clock size={18} />
      <span>{seconds}s</span>
    </div>
  );
};
