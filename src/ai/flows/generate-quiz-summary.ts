
'use server';

/**
 * @fileOverview Generates a personalized quiz summary for the user, 
 * focusing on areas for improvement based on incorrect answers regarding our AI policy.
 *
 * - generateQuizSummary - A function that generates the quiz summary.
 * - GenerateQuizSummaryInput - The input type for the generateQuizSummary function.
 * - GenerateQuizSummaryOutput - The return type for the generateQuizSummary function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const IncorrectAttemptSchema = z.object({
  questionText: z.string().describe("The text of the question."),
  userAnswer: z.string().describe("The answer provided by the user."),
  correctAnswer: z.string().describe("The correct answer to the question."),
  detailedFeedback: z.string().describe("The detailed feedback/explanation for this question, relating to our policy.")
});
export type IncorrectAttempt = z.infer<typeof IncorrectAttemptSchema>;

const GenerateQuizSummaryInputSchema = z.object({
  quizTaker: z.string().describe('The name of the quiz taker.'),
  incorrectAttempts: z.array(IncorrectAttemptSchema).describe('An array of questions the user answered incorrectly. If empty, the user answered all questions correctly.'),
  overallScore: z.number().describe('The user\'s overall score (number of correct answers).'),
  totalQuestions: z.number().describe('The total number of questions in the quiz.'),
});
export type GenerateQuizSummaryInput = z.infer<typeof GenerateQuizSummaryInputSchema>;

const GenerateQuizSummaryOutputSchema = z.object({
  summary: z.string().describe('A personalized summary of the user\'s quiz performance, focusing on areas for review regarding our AI policy, or congratulations if all correct. The summary should be in formal UK English.'),
});
export type GenerateQuizSummaryOutput = z.infer<typeof GenerateQuizSummaryOutputSchema>;

export async function generateQuizSummary(input: GenerateQuizSummaryInput): Promise<GenerateQuizSummaryOutput> {
  return generateQuizSummaryFlow(input);
}

const prompt = ai.definePrompt({
  name: 'generateQuizSummaryPrompt',
  input: {schema: GenerateQuizSummaryInputSchema},
  output: {schema: GenerateQuizSummaryOutputSchema},
  prompt: `You are an AI policy expert providing a summary of a quiz on our AI policy. A user, {{quizTaker}}, has just completed this quiz.
They scored {{overallScore}}.
Ensure all generated text is in formal UK English. Bear in mind that the maximum score achievable is 2080, so don't tell them they did perfect if they scored much lower.

{{#if incorrectAttempts}}
Your summary should focus on the areas where {{quizTaker}} made mistakes. For each incorrect answer, explain the core principle of our policy they might have missed, using the provided policy detail. The tone should be encouraging and constructive.

Here are the questions {{quizTaker}} answered incorrectly:
{{#each incorrectAttempts}}
- Regarding the question "{{questionText}}", your answer was "{{userAnswer}}".
  The correct policy principle is: "{{detailedFeedback}}"
{{/each}}

To reinforce your understanding, we recommend reviewing our AI policy document.
{{else}}
Congratulations, {{quizTaker}}! You have answered all questions correctly and demonstrated a strong understanding of our AI policy. Keep up the great work and continue to apply these principles.
{{/if}}

The summary should be concise and easy-to-digest.
`,
});

const generateQuizSummaryFlow = ai.defineFlow(
  {
    name: 'generateQuizSummaryFlow',
    inputSchema: GenerateQuizSummaryInputSchema,
    outputSchema: GenerateQuizSummaryOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
