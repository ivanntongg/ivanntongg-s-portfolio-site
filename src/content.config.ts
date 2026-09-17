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
      team: z.string().optional(),
      timeframe: z.string(),

      // At least one outcome is required. This is the single most common gap
      // in designer portfolios and the fastest thing to fix.
      outcomes: z
        .array(z.object({ label: z.string(), value: z.string() }))
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
