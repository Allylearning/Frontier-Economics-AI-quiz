
'use client';

import React, { useState, useEffect, useCallback } from 'react';
import { generateHint } from '@/ai/flows/generate-hint';
import { generateQuizSummary } from '@/ai/flows/generate-quiz-summary';
import { savePlayerScore, getLeaderboard } from '@/actions/leaderboardActions';
import { questionPool } from '@/lib/questions';
import { badgeDefinitions } from '@/lib/badges';
import type { QuizQuestion, UserAnswer, Hint as HintType, AnswerEvaluation, IncorrectAttempt, Badge, LeaderboardEntry } from '@/types';
import { useToast } from '@/hooks/use-toast';

import StartScreen from './StartScreen';
import QuestionCard from './QuestionCard';
import QuizProgress from './QuizProgress';
import QuizSummary from './QuizSummary';
import Confetti from './Confetti';
import { Button } from '@/components/ui/button';
import { Loader2 } from 'lucide-react';

const QuizClient: React.FC = () => {
  const [quizState, setQuizState] = useState<'idle' | 'active' | 'finished'>('idle');
  const [currentQuestions, setCurrentQuestions] = useState<QuizQuestion[]>([]);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [userAnswers, setUserAnswers] = useState<Record<string, UserAnswer>>({});
  const [hints, setHints] = useState<Record<string, HintType | null>>({});
  const [isLoadingHint, setIsLoadingHint] = useState(false);
  const [isLoadingEvaluation, setIsLoadingEvaluation] = useState(false);
  const [isLoadingSummary, setIsLoadingSummary] = useState(false);
  const [quizSummaryText, setQuizSummaryText] = useState<string>('');
  const [score, setScore] = useState(0);
  const [streak, setStreak] = useState(0);
  const [hasUsedGlobalHint, setHasUsedGlobalHint] = useState(false);
  const [showConfetti, setShowConfetti] = useState(false);
  const [confettiSuccess, setConfettiSuccess] = useState(false);
  const [earnedBadges, setEarnedBadges] = useState<Badge[]>([]);
  const [playerName, setPlayerName] = useState<string>('');
  const [avatarId, setAvatarId] = useState<string>('');
  const [selectedThemeColor, setSelectedThemeColor] = useState<string | null>(null);
  const [selectedThemeForegroundColor, setSelectedThemeForegroundColor] = useState<string | null>(null);
  const [leaderboardData, setLeaderboardData] = useState<LeaderboardEntry[]>([]);
  const [correctAnswersCount, setCorrectAnswersCount] = useState(0);


  const { toast } = useToast();

  useEffect(() => {
    const root = document.documentElement;
    if (selectedThemeColor && selectedThemeForegroundColor) {
      root.style.setProperty('--primary', selectedThemeColor);
      root.style.setProperty('--primary-foreground', selectedThemeForegroundColor);
      root.style.setProperty('--accent', selectedThemeColor); 
      root.style.setProperty('--accent-foreground', selectedThemeForegroundColor); 
      root.style.setProperty('--ring', selectedThemeColor); 
      root.style.setProperty('--chart-1', selectedThemeColor); 
      root.style.setProperty('--chart-2', selectedThemeColor); 
    } else {
      
      root.style.removeProperty('--primary');
      root.style.removeProperty('--primary-foreground');
      root.style.removeProperty('--accent');
      root.style.removeProperty('--accent-foreground');
      root.style.removeProperty('--ring');
      root.style.removeProperty('--chart-1');
      root.style.removeProperty('--chart-2');
    }
  }, [selectedThemeColor, selectedThemeForegroundColor]);
  
  const startQuiz = useCallback(({ 
    numQuestions, 
    playerName: name, 
    avatarId: avId,
    accentColor, 
    accentForegroundColor 
  }: { 
    numQuestions: number; 
    playerName: string; 
    avatarId: string;
    accentColor: string;
    accentForegroundColor: string;
  }) => {
    setPlayerName(name);
    setAvatarId(avId);
    setSelectedThemeColor(accentColor);
    setSelectedThemeForegroundColor(accentForegroundColor);

    setCurrentQuestions([]);
    setCurrentQuestionIndex(0);
    setUserAnswers({});
    setHints({});
    setEarnedBadges([]);
    setIsLoadingHint(false);
    setIsLoadingEvaluation(false);
    setIsLoadingSummary(false);
    setQuizSummaryText('');
    setScore(0);
    setStreak(0);
    setHasUsedGlobalHint(false);
    setShowConfetti(false);
    setLeaderboardData([]);
    setCorrectAnswersCount(0);

    let selectedQuestions: QuizQuestion[];
    if (numQuestions >= questionPool.length) {
      selectedQuestions = [...questionPool];
    } else {
      const shuffled = [...questionPool].sort(() => 0.5 - Math.random());
      selectedQuestions = shuffled.slice(0, numQuestions);
    }
    setCurrentQuestions(selectedQuestions);

    const initialAnswers: Record<string, UserAnswer> = {};
    selectedQuestions.forEach(q => {
      initialAnswers[q.id] = { 
        answer: q.questionType === 'multi-select' ? [] : '', 
        isEvaluated: false 
      };
    });
    setUserAnswers(initialAnswers);

    setQuizState('active');
  }, []);

  const resetForNewPlayer = useCallback(() => {
    setQuizState('idle');
    setCurrentQuestions([]);
    setCurrentQuestionIndex(0);
    setUserAnswers({});
    setHints({});
    setEarnedBadges([]);
    setIsLoadingHint(false);
    setIsLoadingEvaluation(false);
    setIsLoadingSummary(false);
    setQuizSummaryText('');
    setScore(0);
    setStreak(0);
    setHasUsedGlobalHint(false);
    setShowConfetti(false);
    setSelectedThemeColor(null);
    setSelectedThemeForegroundColor(null);
    setLeaderboardData([]);
    setCorrectAnswersCount(0);
    setPlayerName('');
    setAvatarId('');
  }, []);
  
  const restartQuizForCurrentPlayer = useCallback(() => {
    if (!playerName || !avatarId || !selectedThemeColor || !selectedThemeForegroundColor) {
      resetForNewPlayer();
      return;
    }
    
    startQuiz({
      numQuestions: currentQuestions.length > 0 ? currentQuestions.length : questionPool.length,
      playerName,
      avatarId,
      accentColor: selectedThemeColor,
      accentForegroundColor: selectedThemeForegroundColor
    });
  }, [playerName, avatarId, selectedThemeColor, selectedThemeForegroundColor, resetForNewPlayer, startQuiz, currentQuestions.length]);


  const handleAnswerChange = (questionId: string, changedAnswer: string) => {
    const question = currentQuestions.find(q => q.id === questionId);
    if (!question) return;
  
    if (question.questionType === 'multi-select') {
      setUserAnswers(prev => {
        const currentAnswerArray = (prev[questionId]?.answer as string[] | undefined) || [];
        const newAnswerArray = currentAnswerArray.includes(changedAnswer)
          ? currentAnswerArray.filter(a => a !== changedAnswer)
          : [...currentAnswerArray, changedAnswer];
        return {
          ...prev,
          [questionId]: { ...prev[questionId], answer: newAnswerArray },
        };
      });
    } else {
      // Logic for single-choice questions ('multiple-choice', 'scenario-buttons')
      setUserAnswers(prev => ({
        ...prev,
        [questionId]: { ...prev[questionId], answer: changedAnswer },
      }));
    }
  };

  const handleGetHint = async (questionId: string) => {
    if (hasUsedGlobalHint) return;
    if (hints[questionId]) return;
    setIsLoadingHint(true);
    try {
      const question = currentQuestions.find(q => q.id === questionId);
      if (!question) throw new Error("Question not found");

      const originalQuestionText = questionPool.find(q => q.id === questionId)?.text || question.text;
      const result = await generateHint({ question: originalQuestionText.replace(/{{playerName}}/g, playerName.split(' ')[0] || 'User'), approvedAnswers: question.approvedAnswers });
      setHints(prev => ({ ...prev, [questionId]: { text: result.hint } }));
      
      setHasUsedGlobalHint(true);

      setUserAnswers(prev => {
        const currentAnswerState = prev[questionId] || { answer: '', isEvaluated: false };
        return {
          ...prev,
          [questionId]: { ...currentAnswerState, hintUsed: true },
        };
      });

    } catch (error) {
      console.error("Error getting hint:", error);
      toast({ title: "Error", description: "Could not fetch hint. Please try again.", variant: "destructive" });
    } finally {
      setIsLoadingHint(false);
    }
  };

  const handleSubmitAnswer = async (questionId: string) => {
    setIsLoadingEvaluation(true);

    const question = currentQuestions.find(q => q.id === questionId);
    const userAnswerObj = userAnswers[questionId];

    if (!question || !userAnswerObj) {
      toast({ title: "Error", description: "Question or answer not found.", variant: "destructive" });
      setIsLoadingEvaluation(false);
      setUserAnswers(prev => ({
        ...prev,
        [questionId]: { ...prev[questionId], isEvaluated: true, evaluation: { isCorrect: false, feedback: "Error: Could not find question data." } },
      }));
      return;
    }
    
    let isCorrect = false;
    if (question.questionType === 'multi-select' && Array.isArray(userAnswerObj.answer) && Array.isArray(question.correctAnswer)) {
      const userAnswersSorted = [...userAnswerObj.answer].sort();
      const correctAnswersSorted = [...question.correctAnswer].sort();
      isCorrect = JSON.stringify(userAnswersSorted) === JSON.stringify(correctAnswersSorted);
    } else {
      isCorrect = userAnswerObj.answer === question.correctAnswer;
    }

    const feedbackText = question.detailedFeedback;
    const evaluationResult: AnswerEvaluation = { isCorrect, feedback: feedbackText };

    await new Promise(resolve => setTimeout(resolve, 100)); 

    if (isCorrect) {
      const basePoints = 100;
      const newStreak = streak + 1;
      const streakBonus = (newStreak > 1) ? (newStreak -1) * 10 : 0;
      const pointsAwarded = basePoints + streakBonus;
      
      setScore(s => s + pointsAwarded);
      setStreak(newStreak);
      evaluationResult.pointsAwarded = pointsAwarded;
    } else {
      setStreak(0);
    }

    setUserAnswers(prev => ({
      ...prev,
      [questionId]: { ...prev[questionId], evaluation: evaluationResult, isEvaluated: true },
    }));

    setIsLoadingEvaluation(false);
  };

  const handleNextQuestion = () => {
    if (currentQuestionIndex < currentQuestions.length - 1) {
      setCurrentQuestionIndex(prev => prev + 1);
    }
  };

  const finishQuiz = async () => {
    setQuizState('finished');
    setIsLoadingSummary(true);
    
    const finalCorrectAnswersCount = currentQuestions.filter(q => userAnswers[q.id]?.evaluation?.isCorrect).length;
    setCorrectAnswersCount(finalCorrectAnswersCount);
    const pass = finalCorrectAnswersCount >= 8;

    setConfettiSuccess(pass);
    setShowConfetti(true);
    setTimeout(() => setShowConfetti(false), 4000);

    if (window.parent && window.parent !== window) {
      if (pass) {
        window.parent.postMessage('complete', '*');
      } else {
        window.parent.postMessage("QUIZ_COMPLETED_FAIL", "*");
      }
    }

    const newEarnedBadges: Badge[] = badgeDefinitions.filter(badge => {
      return badge.questionIds.every(qId => {
        const uAnswer = userAnswers[qId];
        return uAnswer?.evaluation?.isCorrect === true;
      });
    });
    setEarnedBadges(newEarnedBadges);

    const incorrectAttempts: IncorrectAttempt[] = [];
    currentQuestions.forEach(q => {
      const userAnswer = userAnswers[q.id];
      const originalQuestionData = questionPool.find(poolQ => poolQ.id === q.id);
      const questionTextForSummary = originalQuestionData ? originalQuestionData.text.replace(/{{playerName}}/g, playerName.split(' ')[0] || 'User') : q.text;

      if (userAnswer && userAnswer.evaluation && !userAnswer.evaluation.isCorrect) {
        incorrectAttempts.push({
          questionText: questionTextForSummary,
          userAnswer: Array.isArray(userAnswer.answer) ? userAnswer.answer.join(', ') : userAnswer.answer,
          correctAnswer: Array.isArray(q.correctAnswer) ? q.correctAnswer.join(', ') : q.correctAnswer as string,
          detailedFeedback: q.detailedFeedback,
        });
      }
    });
    
    try {
      await savePlayerScore({ name: playerName, score, avatarId });
      const fetchedLeaderboard = await getLeaderboard(playerName);
      setLeaderboardData(fetchedLeaderboard);

      const summaryResult = await generateQuizSummary({
        quizTaker: playerName.split(' ')[0] || "User",
        incorrectAttempts: incorrectAttempts,
        overallScore: score,
        totalQuestions: currentQuestions.length,
      });
      setQuizSummaryText(summaryResult.summary);
    } catch (error) {
      console.error("Error finishing quiz:", error);
      setQuizSummaryText("Could not generate your personalized summary or update leaderboard at this time. Please check your score above.");
      toast({ title: "Error", description: "Failed to finalize quiz. Please try again.", variant: "destructive" });
    } finally {
      setIsLoadingSummary(false);
    }
  };


  if (quizState === 'idle') {
    return <StartScreen onStartQuiz={startQuiz} totalQuestionsInPool={questionPool.length} />;
  }

  const originalQuestion = currentQuestions[currentQuestionIndex];
  let questionForDisplay = originalQuestion;
  if (originalQuestion && playerName) {
    questionForDisplay = {
      ...originalQuestion,
      text: originalQuestion.text.replace(/{{playerName}}/g, playerName.split(' ')[0] || 'Quiz Taker'),
    };
  }


  return (
    <div className="flex flex-col items-center w-full flex-grow py-8 px-4">
      <Confetti 
        active={showConfetti} 
        isSuccess={confettiSuccess} 
        dynamicThemeColorHslString={selectedThemeColor || undefined} 
      />
      {quizState === 'active' && questionForDisplay && (
        <div className="w-full max-w-3xl space-y-6">
          <QuizProgress 
            current={currentQuestionIndex + 1} 
            total={currentQuestions.length} 
            avatarId={avatarId}
            playerName={playerName}
            streak={streak}
          />
          <QuestionCard
            question={questionForDisplay}
            questionNumber={currentQuestionIndex + 1}
            totalQuestions={currentQuestions.length}
            userAnswer={userAnswers[questionForDisplay.id]?.answer || []}
            onAnswerChange={(answer) => handleAnswerChange(questionForDisplay.id, answer)}
            onSubmitAnswer={() => handleSubmitAnswer(questionForDisplay.id)}
            onGetHint={() => handleGetHint(questionForDisplay.id)}
            hint={hints[questionForDisplay.id]}
            evaluation={userAnswers[questionForDisplay.id]?.evaluation}
            isLoadingHint={isLoadingHint}
            isLoadingEvaluation={isLoadingEvaluation}
            isEvaluated={userAnswers[questionForDisplay.id]?.isEvaluated || false}
            hintUsedThisQuestion={userAnswers[questionForDisplay.id]?.hintUsed || false}
            hasUsedGlobalHint={hasUsedGlobalHint}
            onNextQuestion={handleNextQuestion}
            isLastQuestion={currentQuestionIndex === currentQuestions.length - 1}
            onFinishQuiz={finishQuiz}
            avatarId={avatarId}
            playerName={playerName.split(' ')[0] || 'Player'}
            streak={streak}
          />
        </div>
      )}
      {quizState === 'finished' && (
        isLoadingSummary ? (
          <div className="flex flex-col items-center justify-center space-y-4 p-8">
            <Loader2 className="h-12 w-12 animate-spin text-primary" />
            <p className="text-lg text-white">Generating your quiz summary...</p>
          </div>
        ) : (
          <QuizSummary
            summaryText={quizSummaryText}
            score={score}
            earnedBadges={earnedBadges}
            onRestartQuiz={restartQuizForCurrentPlayer}
            currentPlayer={{ name: playerName, score, date: new Date().toLocaleDateString(), avatarId }}
            leaderboardData={leaderboardData}
            correctAnswersCount={correctAnswersCount}
            totalQuestions={currentQuestions.length}
          />
        )
      )}
    </div>
  );
};

export default QuizClient;
