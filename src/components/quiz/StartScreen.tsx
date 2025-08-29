
'use client';

import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { User, Image as ImageIcon } from 'lucide-react';
import Image from 'next/image';
import { avatarOptions } from '@/lib/avatars';
import type { AvatarOption } from '@/types';
import { cn } from '@/lib/utils';
import { useToast } from '@/hooks/use-toast';

interface StartScreenProps {
  onStartQuiz: (params: {
    numQuestions: number;
    playerName: string;
    avatarId: string;
    accentColor: string; // HSL string for theme
    accentForegroundColor: string; // HSL string for theme
  }) => void;
  totalQuestionsInPool: number;
}

const StartScreen: React.FC<StartScreenProps> = ({ onStartQuiz, totalQuestionsInPool }) => {
  const [playerName, setPlayerName] = useState('');
  const [selectedAvatar, setSelectedAvatar] = useState<AvatarOption | null>(null);
  const { toast } = useToast();

  const handleStartQuiz = () => {
    if (!playerName.trim()) {
      toast({ title: "Name Required", description: "Please enter your name.", variant: "destructive"});
      return;
    }
    if (!selectedAvatar) {
      toast({ title: "Avatar Required", description: "Please select an avatar.", variant: "destructive"});
      return;
    }
    onStartQuiz({
      numQuestions: totalQuestionsInPool,
      playerName,
      avatarId: selectedAvatar.id,
      accentColor: selectedAvatar.accentColor,
      accentForegroundColor: selectedAvatar.accentForegroundColor,
    });
  };

  const startButtonStyles: React.CSSProperties = {};
  if (selectedAvatar) {
    startButtonStyles.backgroundColor = `hsl(${selectedAvatar.accentColor})`;
    startButtonStyles.color = `hsl(${selectedAvatar.accentForegroundColor})`;
  }

  return (
    <Card className="w-full max-w-lg shadow-xl h-fit self-center">
      <CardHeader className="text-center pt-4 pb-2">
        <CardTitle className="text-3xl font-headline">AI Policy Awareness Assessment</CardTitle>
        <CardDescription className="text-base mt-2 px-4">
          Test your knowledge of our company's AI policy. You must answer at least 8 questions correctly to pass.
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-3 p-4">
        <div>
          <Label htmlFor="playerName" className="text-base flex items-center mb-1.5">
            <User className="mr-2 h-5 w-5 text-primary" /> Enter Your Name
          </Label>
          <Input
            id="playerName"
            type="text"
            value={playerName}
            onChange={(e) => setPlayerName(e.target.value)}
            placeholder="E.g., Alex Smith"
            className="text-base bg-card text-card-foreground"
          />
        </div>

        <div>
          <Label className="text-base flex items-center mb-2">
            <ImageIcon className="mr-2 h-5 w-5 text-primary" /> Choose Your Avatar
          </Label>
          <div className="flex flex-wrap justify-between gap-3">
            {avatarOptions.map((avatar: AvatarOption) => (
              <button
                key={avatar.id}
                onClick={() => setSelectedAvatar(avatar)}
                className={cn(
                  "rounded-full border-2 transition-all duration-150 ease-in-out focus:outline-none",
                  "w-[60px] h-[60px] p-0 overflow-hidden flex items-center justify-center",
                  selectedAvatar?.id === avatar.id ? "scale-110" : "border-border hover:border-primary/70"
                )}
                style={{
                  borderColor: selectedAvatar?.id === avatar.id ? avatar.selectedBorderColor : undefined,
                }}
                aria-label={`Select ${avatar.alt}`}
              >
                <Image
                  src={avatar.url}
                  alt={avatar.alt}
                  width={60}
                  height={60}
                  className="rounded-full object-cover"
                />
              </button>
            ))}
          </div>
        </div>
      </CardContent>
      <CardFooter className="flex flex-col space-y-2 p-4 pt-2">
        <Button
          size="lg"
          onClick={handleStartQuiz}
          className="w-full py-2.5 text-lg"
          aria-label="Start quiz"
          disabled={!playerName.trim() || !selectedAvatar}
          style={startButtonStyles}
        >
          Start
        </Button>
      </CardFooter>
    </Card>
  );
};

export default StartScreen;
