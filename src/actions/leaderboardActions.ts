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
    const existingEntry = await prisma.leaderboardEntry.findUnique({ where: { name: playerData.name } });

    await prisma.leaderboardEntry.upsert({
      where: { name: playerData.name },
      update: {
        score: Math.max(playerData.score, existingEntry?.score || 0),
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

export async function getLeaderboard(currentPlayerName?: string): Promise<LeaderboardEntry[]> {
  try {
    const topEntries = await prisma.leaderboardEntry.findMany({
      take: LEADERBOARD_LIMIT,
      orderBy: {
        score: 'desc',
      },
    });

    let entries = topEntries;
    
    if (currentPlayerName) {
      const currentPlayerInTop = topEntries.some(entry => entry.name === currentPlayerName);
      
      if (!currentPlayerInTop) {
        const currentPlayerEntry = await prisma.leaderboardEntry.findUnique({
          where: { name: currentPlayerName },
        });

        if (currentPlayerEntry) {
          // To maintain a semblance of order, we could fetch players around the user,
          // but for simplicity and performance, we'll just add the user to the list
          // and re-sort. The UI will highlight them.
          entries = [...topEntries, currentPlayerEntry].sort((a, b) => b.score - a.score);
        }
      }
    }

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
