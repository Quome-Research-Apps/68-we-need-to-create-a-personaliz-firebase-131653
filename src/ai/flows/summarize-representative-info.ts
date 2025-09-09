// Summarize representative information using generative AI.

'use server';

/**
 * @fileOverview An AI agent that summarizes a representative's information.
 *
 * - summarizeRepresentativeInfo - A function that summarizes a representative's information.
 * - SummarizeRepresentativeInfoInput - The input type for the summarizeRepresentativeInfo function.
 * - SummarizeRepresentativeInfoOutput - The return type for the summarizeRepresentativeInfo function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const SummarizeRepresentativeInfoInputSchema = z.object({
  name: z.string().describe("The representative's name."),
  party: z.string().describe("The representative's party."),
  biography: z.string().describe("The representative's biography."),
  contactInformation: z.string().describe("The representative's contact information."),
  policyPositions: z.string().describe("The representative's policy positions."),
  recentActivities: z.string().describe("The representative's recent activities."),
});

export type SummarizeRepresentativeInfoInput = z.infer<
  typeof SummarizeRepresentativeInfoInputSchema
>;

const SummarizeRepresentativeInfoOutputSchema = z.object({
  summary: z.string().describe("A concise summary of the representative's key policy positions and recent activities."),
});

export type SummarizeRepresentativeInfoOutput = z.infer<
  typeof SummarizeRepresentativeInfoOutputSchema
>;

export async function summarizeRepresentativeInfo(
  input: SummarizeRepresentativeInfoInput
): Promise<SummarizeRepresentativeInfoOutput> {
  return summarizeRepresentativeInfoFlow(input);
}

const summarizeRepresentativeInfoPrompt = ai.definePrompt({
  name: 'summarizeRepresentativeInfoPrompt',
  input: {schema: SummarizeRepresentativeInfoInputSchema},
  output: {schema: SummarizeRepresentativeInfoOutputSchema},
  prompt: `Summarize the following information about Representative {{name}} of the {{party}} party. Focus on their key policy positions and recent activities.\n\nBiography: {{{biography}}}\nContact Information: {{{contactInformation}}}\nPolicy Positions: {{{policyPositions}}}\nRecent Activities: {{{recentActivities}}}`,
});

const summarizeRepresentativeInfoFlow = ai.defineFlow(
  {
    name: 'summarizeRepresentativeInfoFlow',
    inputSchema: SummarizeRepresentativeInfoInputSchema,
    outputSchema: SummarizeRepresentativeInfoOutputSchema,
  },
  async input => {
    const {output} = await summarizeRepresentativeInfoPrompt(input);
    return output!;
  }
);
