// Single source of truth for anything that appears in more than one place.
export const SITE = {
  name: 'Ivan Tong',
  role: 'Product Designer',
  // One sentence. What you do and who for. This is the hardest line on the
  // site to write and the one most people skip.
  tagline: 'Product designer working on TODO, for TODO.',
  email: 'ivanntongg@gmail.com',
  url: 'https://example.com',
  links: [
    { label: 'Email', href: 'mailto:ivanntongg@gmail.com' },
    { label: 'LinkedIn', href: 'https://linkedin.com/in/TODO' },
    { label: 'Read.cv', href: 'https://read.cv/TODO' },
  ],
} as const;
