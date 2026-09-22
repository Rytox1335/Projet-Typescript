import React, { useEffect, useState, useCallback } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { getQuestions } from '../services/api';
import { FormattedQuestion } from '../types/quiz';
import { ProgressBar } from '../components/ProgressBar';
import { Timer } from '../components/Timer';
import { QuestionCard } from '../components/QuestionCard';
import { AlertCircle, RefreshCw } from 'lucide-react';
import { Button } from '../components/Button';

export const Quiz: React.FC = () => {
  const { categoryId } = useParams<{ categoryId: string }>();
  const navigate = useNavigate();

  const decodedCategory = categoryId ? decodeURIComponent(categoryId) : 'Culture Générale';

  const [questions, setQuestions] = useState<FormattedQuestion[]>([]);
  const [currentIndex, setCurrentIndex] = useState<number>(0);
  const [score, setScore] = useState<number>(0);
  const [selectedAnswer, setSelectedAnswer] = useState<string | null>(null);
  const [isAnswered, setIsAnswered] = useState<boolean>(false);
  const [seconds, setSeconds] = useState<number>(30);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const loadQuestions = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const data = await getQuestions(decodedCategory);
      if (data.length === 0) {
        setError("Aucune question trouvée pour cette catégorie.");
      } else {
        setQuestions(data);
        setCurrentIndex(0);
        setScore(0);
        setSeconds(30);
        setIsAnswered(false);
        setSelectedAnswer(null);
      }
    } catch (err) {
      console.error(err);
      setError("Erreur lors de la récupération des questions.");
    } finally {
      setLoading(false);
    }
  }, [decodedCategory]);

  useEffect(() => {
    loadQuestions();
  }, [loadQuestions]);

  const currentQuestion = questions[currentIndex];

  const handleNextQuestion = useCallback((finalScore?: number) => {
    const currentScore = finalScore !== undefined ? finalScore : score;
    if (currentIndex + 1 < questions.length) {
      setCurrentIndex(prev => prev + 1);
      setSelectedAnswer(null);
      setIsAnswered(false);
      setSeconds(30);
    } else {
      navigate('/results', {
        state: {
          score: currentScore,
          totalQuestions: questions.length,
          category: decodedCategory
        }
      });
    }
  }, [currentIndex, questions.length, score, decodedCategory, navigate]);

  const handleSelectAnswer = (answerText: string) => {
    if (isAnswered || !currentQuestion) return;

    setSelectedAnswer(answerText);
    setIsAnswered(true);

    const isCorrect = answerText === currentQuestion.correctAnswer;
    const newScore = isCorrect ? score + 1 : score;

    if (isCorrect) {
      setScore(newScore);
    }

    setTimeout(() => {
      handleNextQuestion(newScore);
    }, 1000);
  };

  const handleTimeUp = useCallback(() => {
    if (isAnswered) return;
    setIsAnswered(true);

    setTimeout(() => {
      handleNextQuestion();
    }, 1000);
  }, [isAnswered, handleNextQuestion]);

  if (loading) {
    return (
      <div className="loading-container" id="quiz-loading">
        <div className="spinner" />
        <p style={{ color: 'var(--text-muted)' }}>Préparation du quiz ({decodedCategory})...</p>
      </div>
    );
  }

  if (error || !currentQuestion) {
    return (
      <div className="error-container" id="quiz-error">
        <AlertCircle size={48} color="#EF4444" />
        <p style={{ color: 'var(--text-main)', fontSize: '1.1rem' }}>{error || "Une erreur est survenue."}</p>
        <Button
          id="retry-quiz-btn"
          onClick={loadQuestions}
          variant="secondary"
          icon={<RefreshCw size={18} />}
        >
          Recharger les questions
        </Button>
      </div>
    );
  }

  return (
    <div className="quiz-page" id="quiz-page">
      <div className="quiz-topbar">
        <ProgressBar
          currentQuestion={currentIndex + 1}
          totalQuestions={questions.length}
        />
        <Timer
          seconds={seconds}
          onTimeUp={handleTimeUp}
          isPaused={isAnswered}
          setSeconds={setSeconds}
        />
      </div>

      <QuestionCard
        question={currentQuestion}
        selectedAnswer={selectedAnswer}
        isAnswered={isAnswered}
        onSelectAnswer={handleSelectAnswer}
      />
    </div>
  );
};
