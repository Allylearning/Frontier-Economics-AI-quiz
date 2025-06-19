
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
  const [showConfetti, setShowConfetti] = useState(false);
  const [confettiSuccess, setConfettiSuccess] = useState(false);
  const [earnedBadges, setEarnedBadges] = useState<Badge[]>([]);
  const [playerName, setPlayerName] = useState<string>('');
  const [avatarId, setAvatarId] = useState<string>('');
  const [selectedThemeColor, setSelectedThemeColor] = useState<string | null>(null);
  const [selectedThemeForegroundColor, setSelectedThemeForegroundColor] = useState<string | null>(null);
  const [hintUsedThisAttempt, setHintUsedThisAttempt] = useState<boolean>(false);
  const [leaderboardData, setLeaderboardData] = useState<LeaderboardEntry[]>([]);


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

  const resetQuizState = useCallback(() => {
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
    setShowConfetti(false);
    setSelectedThemeColor(null);
    setSelectedThemeForegroundColor(null);
    setHintUsedThisAttempt(false);
    setLeaderboardData([]);
    
  }, []);

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
    setShowConfetti(false);
    setHintUsedThisAttempt(false);
    setLeaderboardData([]);

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
      initialAnswers[q.id] = { answer: '', isEvaluated: false };
    });
    setUserAnswers(initialAnswers);

    setQuizState('active');
  }, []);

  const handleAnswerChange = (questionId: string, answer: string) => {
    setUserAnswers(prev => ({
      ...prev,
      [questionId]: { ...prev[questionId], answer },
    }));
  };

  const handleGetHint = async (questionId: string) => {
    if (hintUsedThisAttempt) {
      toast({ title: "Hint Limit Reached", description: "You can only use one hint per quiz attempt.", variant: "default" });
      return;
    }
    if (hints[questionId]) return;
    setIsLoadingHint(true);
    try {
      const question = currentQuestions.find(q => q.id === questionId);
      if (!question) throw new Error("Question not found");

      const originalQuestionText = questionPool.find(q => q.id === questionId)?.text || question.text;
      const result = await generateHint({ question: originalQuestionText.replace(/{{playerName}}/g, playerName.split(' ')[0] || 'User'), approvedAnswers: question.approvedAnswers });
      setHints(prev => ({ ...prev, [questionId]: { text: result.hint } }));
      setHintUsedThisAttempt(true);
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

    const isCorrect = userAnswerObj.answer === question.correctAnswer;
    const feedbackText = question.detailedFeedback;

    const evaluationResult: AnswerEvaluation = { isCorrect, feedback: feedbackText };

    await new Promise(resolve => setTimeout(resolve, 100)); 

    setUserAnswers(prev => ({
      ...prev,
      [questionId]: { ...prev[questionId], evaluation: evaluationResult, isEvaluated: true },
    }));

    if (isCorrect) {
      setScore(s => s + 1);
    }

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

    const pass = score / currentQuestions.length >= 0.7;
    setConfettiSuccess(pass);
    setShowConfetti(true);
    setTimeout(() => setShowConfetti(false), 4000);

    if (window.parent && window.parent !== window) {
      window.parent.postMessage(pass ? "QUIZ_COMPLETED_SUCCESS" : "QUIZ_COMPLETED_FAIL", "*");
    }

    const newEarnedBadges: Badge[] = [];
    badgeDefinitions.forEach(badge => {
      const allCriteriaMet = badge.questionIds.every(qId => {
        const uAnswer = userAnswers[qId];
        return uAnswer?.evaluation?.isCorrect === true;
      });
      if (allCriteriaMet) {
        newEarnedBadges.push(badge);
      }
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
          userAnswer: userAnswer.answer,
          correctAnswer: q.correctAnswer,
          detailedFeedback: q.detailedFeedback,
        });
      }
    });
    
    try {
      await savePlayerScore({ name: playerName, score, avatarId });
      const fetchedLeaderboard = await getLeaderboard();
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
          />
          <QuestionCard
            question={questionForDisplay}
            questionNumber={currentQuestionIndex + 1}
            totalQuestions={currentQuestions.length}
            userAnswer={userAnswers[questionForDisplay.id]?.answer || ''}
            onAnswerChange={(answer) => handleAnswerChange(questionForDisplay.id, answer)}
            onSubmitAnswer={() => handleSubmitAnswer(questionForDisplay.id)}
            onGetHint={() => handleGetHint(questionForDisplay.id)}
            hint={hints[questionForDisplay.id]}
            evaluation={userAnswers[questionForDisplay.id]?.evaluation}
            isLoadingHint={isLoadingHint}
            isLoadingEvaluation={isLoadingEvaluation}
            isEvaluated={userAnswers[questionForDisplay.id]?.isEvaluated || false}
            hintUsedThisAttempt={hintUsedThisAttempt}
            onNextQuestion={handleNextQuestion}
            isLastQuestion={currentQuestionIndex === currentQuestions.length - 1}
            onFinishQuiz={finishQuiz}
            avatarId={avatarId}
            playerName={playerName.split(' ')[0] || 'Player'}
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
            totalQuestions={currentQuestions.length}
            earnedBadges={earnedBadges}
            onRestartQuiz={() => { 
                setPlayerName(''); 
                setAvatarId('');
                resetQuizState();
            }}
            currentPlayer={{ name: playerName, score, date: new Date().toLocaleDateString(), avatarId }}
            leaderboardData={leaderboardData}
          />
        )
      )}
    </div>
  );
};

export default QuizClient;
