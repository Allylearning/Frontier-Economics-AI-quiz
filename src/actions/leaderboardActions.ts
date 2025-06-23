'use server';

import { prisma } from '@/lib/prisma';
import type { LeaderboardEntry } from '@/types';

const LEADERBOARD_LIMIT = 10;

export async function savePlayerScore(playerData: {
  name: string;
  score: number;
  avatarId?: string;
}): Promise<void> {
  try {
    await prisma.leaderboardEntry.upsert({
      where: { name: playerData.name },
      update: {
        score: Math.max(playerData.score, (await prisma.leaderboardEntry.findUnique({ where: { name: playerData.name } }))?.score || 0),
        avatarId: playerData.avatarId,
        // date is automatically updated by @updatedAt
      },
      create: {
        name: playerData.name,
        score: playerData.score,
        avatarId: playerData.avatarId,
      },
    });
  } catch (error) {
    console.error('Failed to save player score:', error);
    // Consider more robust error handling or re-throwing for the client
    throw new Error('Could not save score to the leaderboard.');
  }
}

export async function getLeaderboard(): Promise<LeaderboardEntry[]> {
  try {
    const entries = await prisma.leaderboardEntry.findMany({
      take: LEADERBOARD_LIMIT,
      orderBy: {
        score: 'desc',
      },
    });
    // Convert Date objects to string to ensure serializability for client components
    return entries.map(entry => ({
      ...entry,
      date: entry.date.toLocaleDateString(), 
    }));
  } catch (error) {
    console.error('Failed to fetch leaderboard:', error);
    return []; // Return empty on error or throw
  }
}
