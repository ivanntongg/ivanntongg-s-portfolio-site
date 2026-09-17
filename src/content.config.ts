import { defineCollection } from 'astro:content';
import { z } from 'zod';
import { glob } from 'astro/loaders';

/**
 * The schema is deliberately strict. Every field here exists because its
 * absence is a common reason a case study fails to land in a portfolio review.
 * If a project cannot fill these in, the project is not ready to publish.
 */
const work = defineCollection({
  loader: glob({ pattern: '**/*.mdx', base: './src/content/work' }),
  schema: ({ image }) =>
    z.object({
      title: z.string(),

      // The claim, not the topic. "Cut onboarding drop-off by half" beats
      // "Redesigning the onboarding flow". Kept short so it cannot become a
      // paragraph on the index page.
      summary: z.string().max(180),

      // What YOU did. Reviewers discount work where the role is vague, so the
      // schema asks for it separately from the team.
      role: z.string(),
      client: z.string().optional(),
      team: z.string().optional(),
      timeframe: z.string(),
      tools: z.array(z.string()).default([]),

      // At least one outcome is required. `value` is the number; it is
      // optional so a qualitative claim can be migrated now and quantified
      // later. An outcome with a value renders as a stat; one without renders
      // as a statement. Fill the values in: the stat row is what reviewers
      // actually stop on.
      outcomes: z
        .array(z.object({ label: z.string(), value: z.string().optional() }))
        .min(1, 'Every case study needs at least one outcome.'),

      cover: image(),
      coverAlt: z.string(),

      tags: z.array(z.string()).default([]),
      featured: z.boolean().default(false),
      order: z.number().default(999),
      draft: z.boolean().default(false),
    }),
});

export const collections = { work };
