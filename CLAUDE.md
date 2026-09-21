# CLAUDE.md

Personal portfolio for Ivan Tong, UI/UX designer. Astro 5 + MDX + Tailwind v4,
static output, content in git.

## Commands

```bash
npm run dev      # http://localhost:4321
npm run build    # -> dist/ (plain HTML, hostable anywhere)
npm run preview
npm run check    # astro check: types + content schema
```

Run `npm run build && npx astro check` before claiming anything works. Both must
be clean.

## Structure

```
src/
  consts.ts              name, tagline, email, links
  content.config.ts      typed schema for case studies
  content/work/*.mdx     the case studies; template.mdx explains the structure
  assets/work/<slug>/    images, named 01..NN in document order
public/
  work/<slug>/           screen recordings, vNN.mp4, in document order
  layouts/Base.astro     head, OG tags, skip link, in-view video observer
  components/            Figure, Video, Outcomes, WorkCard, Nav, Footer
  pages/                 index, work/[...slug], about, 404
  styles/global.css      every design token
```

Filename becomes the URL: `geareach.mdx` -> `/work/geareach/`.

## Content rules

- Every case study needs at least one entry in `outcomes` or the build fails.
  `value` is the number and is optional: with a value it renders as a stat, without
  one as a statement. **Getting real numbers into these is the highest-value
  outstanding work on this project.** Do not quietly remove the constraint.
- `draft: true` excludes an entry from the index, the sitemap and route
  generation entirely. No unlisted URL is left behind.
- Read `src/content/work/template.mdx` before writing or editing a case study.
  Its heading order is the argument, not a suggestion.

## Design system

All tokens live in one `@theme` block in `src/styles/global.css`. Change them
there, never at a call site.

- **Colour:** warm neutrals only, every hue between 45 and 80, so a warm ink
  never sits against a cool border. Never `#000` or `#FFF`.
- **Type:** one ratio (1.25) from a 17px base: 17 · 21 · 27 · 33 · 42 · 52 · 65.
  Use the named registers (`t-display`, `t-title`, `t-lead`, `t-label`,
  `t-meta`). If a component needs a size that is not in the scale, the scale is
  wrong, not the component.
- **Spacing:** 8px grid. Internal spacing is always less than external.
- **Contrast allocation:** high size contrast, low colour contrast. This is the
  main thing separating this from a generic portfolio. Do not narrow the size
  range or raise the colour contrast.

Every text colour is verified against both grounds. Lowest text pairing is
4.9:1. Re-verify with a contrast script if you change a token.

<frontend_aesthetics>
You tend to converge toward generic, "on distribution" outputs. In frontend design, this creates what users call the "AI slop" aesthetic. Avoid this: make creative, distinctive frontends that surprise and delight. Focus on:

Typography: Choose fonts that are beautiful, unique, and interesting. Avoid generic fonts like Arial and Inter; opt instead for distinctive choices that elevate the frontend's aesthetics.

Color & Theme: Commit to a cohesive aesthetic. Use CSS variables for consistency. Dominant colors with sharp accents outperform timid, evenly-distributed palettes. Draw from IDE themes and cultural aesthetics for inspiration.

Motion: Use animations for effects and micro-interactions. Prioritize CSS-only solutions for HTML. Use Motion library for React when available. Focus on high-impact moments: one well-orchestrated page load with staggered reveals (animation-delay) creates more delight than scattered micro-interactions.

Backgrounds: Create atmosphere and depth rather than defaulting to solid colors. Layer CSS gradients, use geometric patterns, or add contextual effects that match the overall aesthetic.

Avoid generic AI-generated aesthetics:
- Overused font families (Inter, Roboto, Arial, system fonts)
- Clichéd color schemes (particularly purple gradients on white backgrounds)
- Predictable layouts and component patterns
- Cookie-cutter design that lacks context-specific character

Interpret creatively and make unexpected choices that feel genuinely designed for the context. Vary between light and dark themes, different fonts, different aesthetics. You still tend to converge on common choices (Space Grotesk, for example) across generations. Avoid this: it is critical that you think outside the box!
</frontend_aesthetics>

<use_interesting_fonts>
Typography instantly signals quality. Avoid using boring, generic fonts.

**Never use:** Inter, Roboto, Open Sans, Lato, default system fonts

**Impact choices:**
- Code aesthetic: JetBrains Mono, Fira Code, Space Grotesk
- Editorial: Playfair Display, Crimson Pro, Fraunces
- Startup: Clash Display, Satoshi, Cabinet Grotesk
- Technical: IBM Plex family, Source Sans 3
- Distinctive: Bricolage Grotesque, Obviously, Newsreader

**Pairing principle:** High contrast = interesting. Display + monospace, serif + geometric sans, variable font across weights.

**Use extremes:** 100/200 weight vs 800/900, not 400 vs 600. Size jumps of 3x+, not 1.5x.

Pick one distinctive font, use it decisively. Load from Google Fonts. State your choice before coding.
</use_interesting_fonts>

### Resolving the conflict between the two blocks above

They disagree, and the disagreement will produce inconsistent results unless it
is settled here.

- `frontend_aesthetics` names **Space Grotesk** as a convergence trap to avoid.
  `use_interesting_fonts` lists it under "Impact choices". **The avoid wins.**
  Same for Satoshi. Both are as on-distribution in 2026 as Inter was in 2021.
- "Load from Google Fonts" conflicts with this site being self-hosted and
  portable. **Self-host the font files** (`public/fonts/`, `@font-face`,
  `font-display: swap`). No third-party request, no layout shift, no dependency
  on a CDN staying up. Google Fonts is fine for picking; not for shipping.
- "Size jumps of 3x+" and the 1.25 ratio are compatible: the *scale* is 1.25 per
  step, and the *range in use* is 65px display against 17px body, which is 3.8x.
  Keep the ratio, keep the range. Do not widen the ratio itself.
- "Weight extremes 100/200 vs 800/900" is landing-page advice. On long-form
  editorial text a 200 weight at 17px is genuinely hard to read and a 900 display
  reads as shouting. This site gets its contrast from **size**, not weight.
  Current weights are 400 and 560; leave them unless the chosen face needs
  otherwise.

**Settled.** Two self-hosted faces, both OFL, both in `public/fonts/`:

- **Newsreader** (Production Type) is the editorial voice: hero, case study
  titles, project titles on the index, section headings, and long-form body.
  Variable, with weight *and* optical-size axes, so one file serves a 65px hero
  and 19px body with the drawing adjusted for each. `font-optical-sizing: auto`
  is set on `body`; do not disable it.
- **IBM Plex Sans** is the interface voice: nav, tags, metadata, card
  summaries, the deck under a case study title.

The split is content versus chrome, and it maps to the work: serif for the
writing, sans for the system. Anything that is a *title* is serif, even in a
card; anything that is a *label* is sans. Keeping that line clean is what stops
the two faces reading as an accident.

`--text-read` (19px) is the body size for Newsreader. A serif sets optically
smaller than a sans at the same px, so this is a compensation, not a second
scale. Do not add more off-scale sizes.

Only the two latin files are preloaded in `Base.astro`. latin-ext and italic sit
behind `unicode-range` and must stay lazy.

### How that applies to this site specifically

The guidance above is right about the failure mode and needs translating for this
project, because a portfolio is an editorial document, not a landing page.

- **Typography is where to spend the distinctiveness budget.** The site is type,
  images and space; there is almost no UI. The display face currently resolves
  from a system stack (Iowan Old Style / Palatino / Georgia), which renders
  differently per platform and is the single biggest unresolved decision.
  Self-host one real face. Candidates that are not the usual suspects: Signifier,
  Editorial New, Söhne Breit, GT Alpina, Tiempos Text, Redaction, Lyon.
  Do not reach for Space Grotesk, Satoshi, General Sans, Inter, or any
  variable-grotesk of the month.
- **Colour is already committed**, warm and low-contrast, and the accent is
  deliberately rationed to near zero. That is not timidity, it is a decision:
  the case study screenshots are full of saturated product UI, and a competing
  accent would fight them. If you want more colour, take it from the work, not
  from the chrome.
- **Motion: be sparing here.** A staggered page-load reveal on a portfolio
  delays a reviewer who is scanning six tabs. Animate what the reader initiates
  (hover, focus, navigation), not their arrival. `prefers-reduced-motion` is
  already honoured and must stay honoured.
- **Backgrounds: atmosphere goes behind the work, not over it.** The sunk beds
  behind screenshots are the depth mechanism on this site. A gradient field
  behind a page of UI screenshots makes them harder to read. Texture at very low
  amplitude is fine; anything that competes with a screenshot is not.

The honest risk on this project is not purple-gradient slop. It is the *other*
attractor: tasteful-minimal-portfolio, which is equally on-distribution. The
defence is the same in both cases, and it is not decoration. It is that the
content is specific: internal B2B systems for construction, distribution and
retail in Hong Kong, from an architecture background. Let the specificity carry
the character.

## Gotchas

These have all bitten already. Do not rediscover them.

- **Tailwind v4 hoists `@theme` to the top level and drops any media query around
  it.** A dark palette nested in `@media (prefers-color-scheme: dark) { @theme
  {...} }` silently overwrites the light palette unconditionally. Dark mode is
  plain custom-property overrides on `:root` inside the media query. Keep it
  that way.
- **`--color-ink-faint` is decorative only.** Rules, list markers, underline
  colour. It does not pass AA for text at any size. Never set it on a string.
- **Animated GIFs must bypass `astro:assets`.** Sharp reads only the first frame,
  so optimising one turns a prototype recording into a still, and on these files
  produced a *larger* output than the source. `Figure.astro` branches on
  `src.format === 'gif'`.
- **One left edge.** Prose spans the wide container; its text children clamp to
  the measure. Do not centre a measure column inside a wide container, that
  gives the page two left edges.
- **Full-page screenshots miss lazy images.** A `fullPage` capture never scrolls,
  so `loading="lazy"` figures render as empty beds. Force them eager and scroll
  before capturing, or you will "fix" a bug that does not exist.
- **Framer serves screen recordings as `<video>`, not `<img>`.** The first
  migration scraped only `framerusercontent.com/images/` and silently dropped
  26 `.mp4` walkthroughs, more than half the media on the site. If anything is
  ever re-pulled from a Framer page, extract media in document order and count
  `<video>` as well as `<img>`, then check the count against the number of
  captions on the page. A caption with no media beside it means something was
  missed.
- **This container cannot decode H.264.** Its ffmpeg (Playwright's build) and
  its Chromium both lack the decoder, so video playback and poster-frame
  generation cannot be verified or produced here. Video dimensions come from
  parsing the MP4 `tkhd` box directly. Do not read a blank video in a headless
  screenshot as a bug in the page.
- **The artifact service reserves paths starting with `_`.** Publishing `dist/`
  as a preview needs `_astro` renamed and every reference rewritten.

## Before launch

- [ ] `src/consts.ts` — tagline is a placeholder
- [ ] `astro.config.mjs` — `site` is still `https://example.com`; it drives
      canonical URLs, sitemap and OG tags and fails silently when wrong
- [ ] `public/og-default.png` and `public/favicon.svg` — both placeholders
- [ ] `src/pages/about.astro` — TODOs
- [x] self-host the display face (Newsreader + IBM Plex Sans)
- [ ] self-host the resume PDF instead of the Google Drive link
- [ ] generate video poster frames (see the note in `Video.astro`); without
      them a reduced-motion reader sees an empty bed
- [ ] rename the repo from `git_test`
