import { defineConfig } from 'astro/config';
import mdx from '@astrojs/mdx';
import sitemap from '@astrojs/sitemap';
import tailwindcss from '@tailwindcss/vite';

// Update this to your real domain before launch. It drives canonical URLs,
// the sitemap and OG tags, and is the one value that breaks silently if wrong.
export default defineConfig({
  site: 'https://example.com',
  integrations: [mdx(), sitemap()],
  vite: { plugins: [tailwindcss()] },
  build: { format: 'directory' },
});
