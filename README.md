# Portfolio

Static portfolio site. Astro + MDX + Tailwind v4. Builds to plain HTML in
`dist/`, so it can be hosted anywhere with no server to maintain.

## Run it

```bash
npm install
npm run dev      # http://localhost:4321
npm run build    # -> dist/
npm run preview  # serve the built output
npm run check    # type + content schema check
```

## Adding a case study

1. `cp src/content/work/template.mdx src/content/work/my-project.mdx`
2. Put images in `src/assets/work/` (Astro optimises and serves WebP).
3. Fill in the frontmatter. The build fails if a required field is missing,
   including at least one entry under `outcomes`.
4. Set `draft: false` when it's ready. Drafts are excluded from the index,
   the sitemap, and route generation.

The filename becomes the URL: `my-project.mdx` -> `/work/my-project/`.

Read the comments in `template.mdx` before writing. The heading order is the
argument, not a suggestion.

## Before launch

- [ ] `src/consts.ts` — name, tagline, email, links
- [ ] `astro.config.mjs` — set `site` to the real domain (drives canonical
      URLs, sitemap and OG tags; wrong values fail silently)
- [ ] `public/og-default.png` — replace the grey placeholder, 1200x630
- [ ] `public/favicon.svg` — replace
- [ ] `src/pages/about.astro` — replace the TODOs
- [ ] delete `src/content/work/example-project.mdx`
- [ ] rename this repo from `git_test`

## Deploying

Cloudflare Pages: connect the repo, build command `npm run build`, output
directory `dist`. Add the custom domain in the Pages project. Netlify and
Vercel take the same two values.

The output is static HTML, so moving hosts later is a copy of `dist/`.
