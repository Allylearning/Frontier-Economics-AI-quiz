
import { Progress } from "@/components/ui/progress";
import Image from 'next/image';
import { avatarOptions } from '@/lib/avatars';

interface QuizProgressProps {
  current: number;
  total: number;
  avatarId?: string;
  playerName?: string;
  streak: number;
}

const QuizProgress: React.FC<QuizProgressProps> = ({ current, total, avatarId, playerName, streak }) => {
  const progressPercentage = total > 0 ? (current / total) * 100 : 0;

  const getAvatarUrl = (avId?: string) => {
    const avatar = avatarOptions.find(opt => opt.id === avId);
    return avatar ? avatar.url : 'https://placehold.co/40x40/ccc/FFFFFF.png?text=?'; // Default placeholder
  };

  const avatarUrl = getAvatarUrl(avatarId);

  return (
    <div className="w-full mb-6 flex items-center gap-4">
      {avatarId && playerName && (
        <Image 
          src={avatarUrl} 
          alt={`${playerName}'s avatar`} 
          width={40} 
          height={40} 
          className="rounded-full shadow-md" 
          priority // Prioritize loading avatar as it's visible early
        />
      )}
      <div className="flex-grow">
        <div className="flex justify-between text-sm text-white mb-1">
          <span className="font-headline">Question {Math.min(current, total)} of {total}</span>
          <span className="font-headline">{Math.round(progressPercentage)}% Complete</span>
        </div>
        <Progress value={progressPercentage} aria-label={`Quiz progress: ${current} of ${total} questions answered`} />
      </div>
      {streak > 1 && (
        <div className="text-center ml-4">
          <div className="font-bold text-lg text-orange-400">{streak}x</div>
          <div className="text-xs text-white uppercase">Streak 🔥</div>
        </div>
      )}
    </div>
  );
};

export default QuizProgress;
