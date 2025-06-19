import { config } from 'dotenv';
config();

import '@/ai/flows/generate-quiz-summary.ts';
// import '@/ai/flows/evaluate-open-text-answer.ts'; // Removed as it's no longer used
import '@/ai/flows/generate-hint.ts';
