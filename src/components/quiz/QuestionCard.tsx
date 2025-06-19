
'use client';

import React, { useState, useRef, useEffect } from 'react';
import type { QuizQuestion, AnswerEvaluation, Hint } from '@/types';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { PlayCircle, PauseCircle, AlertCircle, CheckCircle2, Info } from 'lucide-react';
import { Skeleton } from '@/components/ui/skeleton';
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import Image from 'next/image';
import { cn } from '@/lib/utils';
import { avatarOptions } from '@/lib/avatars';

interface QuestionCardProps {
  question: QuizQuestion;
  questionNumber: number;
  totalQuestions: number;
  userAnswer: string;
  onAnswerChange: (answer: string) => void;
  onSubmitAnswer: () => Promise<void>;
  onGetHint: () => Promise<void>;
  hint?: Hint | null;
  evaluation?: AnswerEvaluation | null;
  isLoadingHint: boolean;
  isLoadingEvaluation: boolean;
  isEvaluated: boolean;
  hintUsedThisAttempt: boolean;
  onNextQuestion: () => void;
  isLastQuestion: boolean;
  onFinishQuiz: () => void;
  avatarId?: string;
  playerName?: string;
}

const QuestionCard: React.FC<QuestionCardProps> = ({
  question,
  questionNumber,
  totalQuestions,
  userAnswer,
  onAnswerChange,
  onSubmitAnswer,
  onGetHint,
  hint,
  evaluation,
  isLoadingHint,
  isLoadingEvaluation,
  isEvaluated,
  hintUsedThisAttempt,
  onNextQuestion,
  isLastQuestion,
  onFinishQuiz,
  avatarId,
  playerName,
}) => {
  const [isPlayingVoiceover, setIsPlayingVoiceover] = useState(false);
  const audioRef = useRef<HTMLAudioElement>(null);
  const [showHintAlert, setShowHintAlert] = useState(false);

  useEffect(() => {
    setShowHintAlert(false); 
  }, [question.id]);

  useEffect(() => {
    const audioElement = audioRef.current;
    if (audioElement && question.voiceoverUrl) {
      audioElement.load(); // Explicitly tell the audio element to load the new source.
      const playPromise = audioElement.play();
      if (playPromise !== undefined) {
        playPromise
          .then(() => {
            setIsPlayingVoiceover(true);
          })
          .catch((error) => {
            console.warn('Voiceover autoplay prevented:', error);
            setIsPlayingVoiceover(false);
          });
      }
    } else {
      setIsPlayingVoiceover(false); 
    }

    return () => {
      if (audioElement) {
        audioElement.pause(); 
      }
    };
  }, [question.id, question.voiceoverUrl]);

  const toggleVoiceover = () => {
    const audioElement = audioRef.current;
    if (audioElement) {
      if (isPlayingVoiceover) {
        audioElement.pause();
        setIsPlayingVoiceover(false);
      } else {
        const playPromise = audioElement.play();
        if (playPromise !== undefined) {
          playPromise
            .then(() => {
              setIsPlayingVoiceover(true);
            })
            .catch(error => {
              console.warn("Manual voiceover play prevented:", error);
              setIsPlayingVoiceover(false);
            });
        }
      }
    }
  };

  const handleAudioEnd = () => {
    setIsPlayingVoiceover(false);
  };
  
  const handleGetHint = async () => {
    if (hintUsedThisAttempt) return;
    await onGetHint();
    setShowHintAlert(true);
  }

  const scenarioParts = question.questionType === 'scenario-buttons' ? question.text.split('---') : [];
  const messageContent = scenarioParts[0]?.trim() || '';
  const scenarioPrompt = scenarioParts[1]?.trim() || '';

  const getAvatarUrl = (avId?: string) => {
    const avatar = avatarOptions.find(opt => opt.id === avId);
    return avatar ? avatar.url : 'https://placehold.co/40x40.png'; 
  };

  return (
    <Card className="w-full shadow-lg">
      <CardHeader>
        <div className="flex justify-between items-start">
          <CardTitle className="text-xl md:text-2xl font-headline mb-1">Question {questionNumber}</CardTitle>
          {question.voiceoverUrl && (
            <Button variant="ghost" size="icon" onClick={toggleVoiceover} aria-label={isPlayingVoiceover ? "Pause voiceover" : "Play voiceover"} className="group">
              {isPlayingVoiceover ? <PauseCircle className="h-6 w-6 text-primary group-hover:text-white" /> : <PlayCircle className="h-6 w-6 text-primary group-hover:text-white" />}
            </Button>
          )}
        </div>
        {question.questionType !== 'scenario-buttons' && (
          <CardDescription className="text-base md:text-lg leading-relaxed">{question.text}</CardDescription>
        )}
        {question.voiceoverUrl && (
          <audio ref={audioRef} src={question.voiceoverUrl} onEnded={handleAudioEnd} className="hidden" />
        )}
      </CardHeader>
      <CardContent>
        {question.questionType === 'scenario-buttons' ? (
          <div className="space-y-4">
            {question.id === 'q9' && playerName && avatarId ? (
              <div className="flex items-start space-x-3">
                <Image
                  src={getAvatarUrl(avatarId)}
                  alt={playerName ? `${playerName}'s avatar` : 'Avatar'}
                  width={40}
                  height={40}
                  className="rounded-full flex-shrink-0 mt-1 shadow-md"
                />
                <div className="flex-1">
                  <div className="bg-card border border-border p-3 rounded-xl rounded-tl-sm shadow-sm">
                    <p className="font-semibold text-sm text-primary mb-1">{playerName}</p>
                    <pre className="whitespace-pre-wrap font-sans text-sm text-card-foreground">{messageContent}</pre>
                  </div>
                </div>
              </div>
            ) : (
              <div className="p-4 border rounded-md bg-secondary/20 shadow prose prose-sm max-w-none dark:prose-invert">
                <pre className="whitespace-pre-wrap font-sans text-sm bg-transparent p-0">{messageContent}</pre>
              </div>
            )}
            {scenarioPrompt && (
                <p className="text-base md:text-lg leading-relaxed mt-2">{scenarioPrompt}</p>
            )}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
              {question.options.map((option, index) => {
                const isSelected = userAnswer === option;
                return (
                  <button
                    key={index}
                    onClick={() => onAnswerChange(option)}
                    disabled={isEvaluated}
                    className={cn(
                      "rounded-md border p-3 text-left text-base whitespace-normal h-auto transition-colors",
                      "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2",
                      isSelected
                        ? "border-primary bg-primary/10 text-primary font-medium"
                        : "border-border bg-card text-card-foreground hover:bg-accent/80 hover:text-accent-foreground",
                      isEvaluated && !isSelected ? "opacity-50" : "",
                      isEvaluated ? "cursor-not-allowed" : "cursor-pointer"
                    )}
                    aria-pressed={isSelected}
                  >
                    {option}
                  </button>
                );
              })}
            </div>
          </div>
        ) : (
          <RadioGroup
            value={userAnswer}
            onValueChange={onAnswerChange}
            disabled={isEvaluated}
            className="space-y-2"
            aria-label={`Options for question ${questionNumber}`}
          >
            {question.options.map((option, index) => (
              <div key={index} className="flex items-center space-x-2 p-3 rounded-md border border-border has-[[data-state=checked]]:border-primary has-[[data-state=checked]]:bg-primary/10">
                <RadioGroupItem value={option} id={`${question.id}-option-${index}`} />
                <Label htmlFor={`${question.id}-option-${index}`} className="flex-1 text-base cursor-pointer">{option}</Label>
              </div>
            ))}
          </RadioGroup>
        )}

        {showHintAlert && hint && (
          <Alert variant="default" className="mt-4 bg-secondary/50">
            <Info className="h-4 w-4" />
            <AlertTitle>Hint</AlertTitle>
            <AlertDescription>{hint.text}</AlertDescription>
          </Alert>
        )}
        {isEvaluated && evaluation && (
          <Alert variant={evaluation.isCorrect ? "default" : "destructive"} className={`mt-4 border-2 ${evaluation.isCorrect ? 'border-green-500 bg-green-500/10' : 'border-red-500 bg-red-500/10'}`}>
            {evaluation.isCorrect ? <CheckCircle2 className="h-4 w-4" /> : <AlertCircle className="h-4 w-4" />}
            <AlertTitle>{evaluation.isCorrect ? "That's Right!" : 'Not quite right'}</AlertTitle>
            <AlertDescription>
              {evaluation.feedback}
              {!evaluation.isCorrect && question.correctAnswer && question.questionType === 'multiple-choice' && (
                <p className="mt-2"><strong>Correct Answer:</strong> {question.correctAnswer}</p>
              )}
            </AlertDescription>
          </Alert>
        )}
         {isLoadingEvaluation && !isEvaluated && ( 
           <div className="mt-4 space-y-2">
            <Skeleton className="h-4 w-1/4" />
            <Skeleton className="h-4 w-full" />
            <Skeleton className="h-4 w-3/4" />
          </div>
        )}
      </CardContent>
      <CardFooter className="flex flex-col sm:flex-row justify-between items-center gap-2 pt-4">
         <Button 
            variant="ghost" 
            onClick={handleGetHint}
            disabled={isLoadingHint || isEvaluated || hintUsedThisAttempt}
            aria-label="Get a hint"
            className="text-foreground hover:text-foreground hover:bg-transparent flex items-center space-x-2 group p-0"
          >
            <div className="p-0.5 border-2 border-transparent group-hover:border-[#6e6eff] rounded-full transition-all">
              <Image src="/images/AI Avatar.svg" alt="AI Hint Avatar" width={40} height={40} className="rounded-full" />
            </div>
            <span>{isLoadingHint ? 'Getting Hint...' : hintUsedThisAttempt ? 'Hint Used' : 'Get Hint'}</span>
          </Button>
        
        {isEvaluated ? (
          isLastQuestion ? (
            <Button onClick={onFinishQuiz} className="bg-accent hover:bg-accent/90 text-accent-foreground">
              Finish Quiz
            </Button>
          ) : (
            <Button onClick={onNextQuestion}>
              Next Question
            </Button>
          )
        ) : (
          <Button onClick={onSubmitAnswer} disabled={isLoadingEvaluation || !userAnswer.trim()}>
            {isLoadingEvaluation ? 'Submitting...' : 'Submit Answer'}
          </Button>
        )}
      </CardFooter>
    </Card>
  );
};

export default QuestionCard;
