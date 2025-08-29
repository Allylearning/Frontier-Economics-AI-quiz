'use client';

import React from 'react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Download, BarChart3, Award as AwardIcon, ShieldCheck, Scale, Copyright, Settings2, Zap, RotateCw } from 'lucide-react';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import type { LeaderboardEntry, Badge, BadgeIconName } from '@/types';
import type { LucideProps } from 'lucide-react';
import type { FunctionComponent } from 'react';
import Image from 'next/image';
import { avatarOptions } from '@/lib/avatars';


interface QuizSummaryProps {
  summaryText: string;
  score: number;
  earnedBadges: Badge[];
  onRestartQuiz: () => void;
  currentPlayer: Omit<LeaderboardEntry, 'id'>; 
  leaderboardData: LeaderboardEntry[];
  correctAnswersCount: number;
  totalQuestions: number;
}

const iconMap: Record<BadgeIconName, FunctionComponent<LucideProps>> = {
  Award: AwardIcon,
  ShieldCheck,
  Scale,
  Copyright,
  Settings2,
  Zap,
};


const QuizSummary: React.FC<QuizSummaryProps> = ({ 
  summaryText, 
  score, 
  earnedBadges, 
  onRestartQuiz, 
  currentPlayer,
  leaderboardData,
  correctAnswersCount,
  totalQuestions
}) => {
  const getAvatarUrl = (avatarId?: string) => {
    const avatar = avatarOptions.find(opt => opt.id === avatarId);
    return avatar ? avatar.url : 'https://placehold.co/64x64/ccc/FFFFFF.png?text=?'; 
  };

  const playerAvatarUrl = getAvatarUrl(currentPlayer.avatarId);
  const passedQuiz = correctAnswersCount >= 8;

  return (
    <div className="space-y-8 w-full max-w-3xl">
      <Card className="shadow-xl">
        <CardHeader className="text-center">
          <div className="mx-auto mb-4 flex justify-center items-center">
            <Image 
              src={playerAvatarUrl} 
              alt={`${currentPlayer.name}'s avatar`} 
              width={64} 
              height={64} 
              className="rounded-full shadow-md" 
            />
          </div>
          <CardTitle className="text-3xl font-headline">Quiz Completed, {currentPlayer.name}!</CardTitle>
          <CardDescription className="text-lg">
            You scored {score}.
          </CardDescription>
          <CardDescription className="text-base mt-2">
            You answered {correctAnswersCount} out of {totalQuestions} questions correctly.
            {passedQuiz ? (
              <span className="block text-green-500 font-semibold mt-1">Congratulations, you have passed!</span>
            ) : (
              <span className="block text-red-500 font-semibold mt-1">You need at least 8 correct answers to pass. Please try again.</span>
            )}
          </CardDescription>
        </CardHeader>
        <CardFooter className="flex flex-col sm:flex-row justify-center items-center gap-4 pt-2">
          <Button onClick={onRestartQuiz}>
            <RotateCw className="mr-2 h-4 w-4" /> Try Again
          </Button>
          <a
            href="/docs/Frontier%20Generative%20AI%20Policy%20v2.0.pdf"
            download="AI-Policy.pdf"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 bg-primary text-primary-foreground hover:bg-primary/90 h-10 px-4 py-2"
          >
            <Download className="mr-2 h-4 w-4" />
            Download AI Policy PDF
          </a>
        </CardFooter>
      </Card>

      <Card className="shadow-xl">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-2xl font-headline">
            <BarChart3 className="text-primary" /> Leaderboard
          </CardTitle>
          <CardDescription>See how you rank!</CardDescription>
        </CardHeader>
        <CardContent>
          {leaderboardData.length > 0 ? (
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="w-[50px]">Rank</TableHead>
                  <TableHead className="w-[80px]">Avatar</TableHead>
                  <TableHead>Name</TableHead>
                  <TableHead className="text-right">Score</TableHead>
                  <TableHead className="hidden sm:table-cell text-right">Date</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {leaderboardData.map((entry, index) => (
                  <TableRow key={entry.id || entry.name} className={entry.name === currentPlayer.name ? "bg-primary/10" : ""}>
                    <TableCell className="font-medium">{index + 1}</TableCell>
                    <TableCell>
                      <Image src={getAvatarUrl(entry.avatarId)} alt={`${entry.name}'s avatar`} width={32} height={32} className="rounded-full" />
                    </TableCell>
                    <TableCell>{entry.name}</TableCell>
                    <TableCell className="text-right">{entry.score}</TableCell>
                    <TableCell className="hidden sm:table-cell text-right">{entry.date}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          ) : (
            <p>The leaderboard is currently empty or loading. Play a game to see your name!</p>
          )}
        </CardContent>
      </Card>

      {earnedBadges && earnedBadges.length > 0 && (
        <Card className="shadow-xl">
          <CardHeader>
            <CardTitle className="text-xl font-headline flex items-center text-primary">
              <AwardIcon className="mr-2 h-6 w-6" /> You've Earned Badges!
            </CardTitle>
            <CardDescription>Congratulations on your achievements!</CardDescription>
          </CardHeader>
          <CardContent className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
            {earnedBadges.map((badge) => {
              const IconComponent = badge.icon ? iconMap[badge.icon] : Zap;
              return (
                <div key={badge.id} className="p-4 border rounded-lg bg-secondary/30 flex flex-col items-center text-center shadow-sm hover:shadow-md transition-shadow">
                  <IconComponent className="h-10 w-10 text-primary mb-2" />
                  <h3 className="font-semibold text-base mb-1 text-primary-foreground bg-primary px-2 py-0.5 rounded">{badge.name}</h3>
                  <p className="text-xs text-muted-foreground mt-1">{badge.description}</p>
                </div>
              );
            })}
          </CardContent>
        </Card>
      )}

      <Card className="shadow-xl">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-xl font-semibold font-headline" style={{ color: '#6e6eff' }}>
             AI Learning Insights
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="p-4 bg-secondary/30 rounded-md prose prose-sm max-w-none">
            {summaryText ? (
              <p className="whitespace-pre-line">{summaryText}</p>
            ) : (
              <p>Loading summary...</p>
            )}
          </div>
        </CardContent>
      </Card>

    </div>
  );
};

export default QuizSummary;
