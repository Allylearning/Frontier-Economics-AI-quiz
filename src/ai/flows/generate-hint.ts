'use server';

/**
 * @fileOverview AI-powered hint generation for quiz questions.
 *
 * - generateHint - A function that generates a hint for a given question.
 * - GenerateHintInput - The input type for the generateHint function.
 * - GenerateHintOutput - The return type for the generateHint function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const GenerateHintInputSchema = z.object({
  question: z.string().describe('The quiz question to generate a hint for.'),
  approvedAnswers: z
    .string()
    .array()
    .describe('The list of approved answers for the question.'),
});
export type GenerateHintInput = z.infer<typeof GenerateHintInputSchema>;

const GenerateHintOutputSchema = z.object({
  hint: z.string().describe('The generated hint for the question.'),
});
export type GenerateHintOutput = z.infer<typeof GenerateHintOutputSchema>;

export async function generateHint(input: GenerateHintInput): Promise<GenerateHintOutput> {
  return generateHintFlow(input);
}

const prompt = ai.definePrompt({
  name: 'generateHintPrompt',
  input: {schema: GenerateHintInputSchema},
  output: {schema: GenerateHintOutputSchema},
  prompt: `You are an AI assistant providing hints for quiz questions about our company's AI policy.
Ensure all generated text is in formal UK English.

Your goal is to help the user better understand our policy and answer the question correctly without giving away the answer.

Generate a hint for the following question:
Question: {{{question}}}

Approved Answers: {{{approvedAnswers}}}

Focus on clarifying aspects of the question and our policy without revealing the direct answer.
Keep the hint concise and helpful.
The hint should be no more than two sentences long.
`,
});

const generateHintFlow = ai.defineFlow(
  {
    name: 'generateHintFlow',
    inputSchema: GenerateHintInputSchema,
    outputSchema: GenerateHintOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
