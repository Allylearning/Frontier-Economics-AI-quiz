
import type { LucideIcon } from 'lucide-react';

export interface QuizQuestion {
  id: string;
  text: string;
  questionType: 'multiple-choice' | 'scenario-buttons' | 'multi-select';
  options: string[];
  correctAnswer: string | string[];
  approvedAnswers: string[];
  detailedFeedback: string;
  voiceoverUrl?: string;
}

export interface AnswerEvaluation {
  isCorrect: boolean;
  feedback: string;
  pointsAwarded?: number;
}

export interface Hint {
  text: string;
}

export interface UserAnswer {
  answer: string | string[];
  evaluation?: AnswerEvaluation;
  isEvaluated: boolean;
  hintUsed?: boolean;
}

export interface LeaderboardEntry {
  id: string;
  name: string;
  score: number;
  date: string;
  avatarId?: string; 
}

// For generateQuizSummary flow input
export interface IncorrectAttempt {
  questionText: string;
  userAnswer: string;
  correctAnswer: string;
  detailedFeedback: string;
}

export interface GenerateQuizSummaryInput {
  quizTaker: string;
  incorrectAttempts: IncorrectAttempt[];
  overallScore: number;
  totalQuestions: number;
}

// For Badge System
export type BadgeIconName = 'Award' | 'ShieldCheck' | 'Scale' | 'Copyright' | 'Settings2' | 'Zap';

export interface Badge {
  id: string;
  name: string;
  description: string;
  icon?: BadgeIconName;
  questionIds: string[]; // Question IDs that contribute to this badge
}

export interface AvatarOption {
  id: string;
  url: string;
  alt: string;
  selectedBorderColor?: string; // For the selection border on StartScreen
  accentColor: string; // HSL string, e.g., "16 98% 61%"
  accentForegroundColor: string; // HSL string e.g., "0 0% 98%"
}
