# A Beautiful Collaboration

A personal Creative Head invitation for Aamu, Meemu, and Meems, from Kunjuoo.
An editorial love letter with ten chapters, a 22-photo collection, creative autonomy, and a celebratory appointment.

## Run locally

Requires Node.js 22.12+ (or 20.19+) and npm. From the workspace root:

```sh
cd invitation
npm ci
npm run dev
```

Open the URL printed by Vite. It chooses another port if the default is occupied.

```sh
npm run build
npm run lint
npx playwright install chromium
npm test
npm run preview
```

Run `npm run build` before browser tests: they test the actual production build on port 5174.
Tests cover six viewport sizes, all photos, keyboard-operated story tabs and lightbox,
both acceptance buttons, reset on refresh, reduced motion, rendered confetti pixels,
no third-party runtime requests, and automated WCAG AA checks before/after acceptance.
Screenshots are written to the ignored `.preview/` directory.

## Project structure

```text
src/
  App.jsx                       Page composition and navigation
  main.jsx                      React entry point and local font imports
  content.js                    Letter, story, nicknames, photos, benefits, audio
  invitation.css                Theme, responsive layouts, reduced-motion styles
  components/
    InvitationSections.jsx      Hero, story, evidence, role, trust, letter, offer, epilogue
    Primitives.jsx              Reusable reveals, headings, photos, hover tilt
    PhotoGallery.jsx            Gallery and native, focus-trapped photo dialog
    Acceptance.jsx              Acceptance, congratulations, confetti, replay
    Ambient.jsx                 Subtle floating hearts and sparkles
    MusicToggle.jsx             Explicit opt-in audio, disabled until supplied
public/
  images/                       Optimized WebP photo copies
  heart.svg                     Favicon
  robots.txt                    Crawling discouraged
scripts/prepare-images.mjs       Repeatable asset optimization
tests/invitation.spec.js         Production browser and accessibility checks
playwright.config.js            Test server configuration
vite.config.js                  React, Tailwind, relative asset base
```

## Personalize

Edit `src/content.js` for the letter, story chapters, photo order/captions, and benefits.
Section headings and appointment details live in `src/components/InvitationSections.jsx`.
Nicknames are varied deliberately rather than changing randomly during reading.
The letter values her creativity without inventing dates, shared incidents, or project names.
Acceptance is local to the current page, sends nothing, and resets on refresh.

### Photos

All 22 supplied photos are included, with factual alt text and no invented memories.
Original photos in the workspace's `images/` directory remain untouched.
The optimizer applies orientation, strips source metadata, and creates WebP copies
with a maximum 1400px dimension; the original folder is not needed to run or deploy.

To regenerate after updating the original collection:

```sh
npm run images
```

Add corresponding photo entries to `src/content.js` when adding new images.
Review every included photo with her and confirm consent before publishing.

### Optional soundtrack

No track is bundled or invented. Audio is off by default, with no autoplay or preloading.
To enable it, place a track you have permission to use at `public/audio/our-song.mp3`
and change the music entry in `src/content.js`:

```js
music: { src: 'audio/our-song.mp3', title: 'Our soundtrack' }
```

Use a relative path without a leading slash so GitHub Pages repository paths work.
The icon control supports play/pause and disables gracefully if loading fails.
Actual audio playback still needs verification once your track is supplied.

## Styling and animation

Tailwind CSS 4 uses `@tailwindcss/vite` in `vite.config.js` and `@import 'tailwindcss'`
in `src/invitation.css`. No Tailwind 3 configuration or PostCSS setup is needed.
Theme tokens are defined with `@theme`; component classes provide the editorial layouts.
Cormorant Garamond, DM Sans, and Nothing You Could Do are bundled locally via Fontsource.

Framer Motion powers viewport reveals, spring-based pointer tilt, scroll parallax,
floating details, story transitions, and the acceptance animation.
`MotionConfig` and `useReducedMotion` honor system preferences; CSS stops decorative
animation and smooth scrolling, and reduced-motion acceptance skips confetti/hearts.
`canvas-confetti` is loaded only when accepting with motion enabled.

## GitHub Pages

The workspace root contains `.github/workflows/pages.yml`. Keep that workflow at
the repository root and the app at `invitation/` when uploading this workspace.
It is manual-only: pushing files does not publish the invitation automatically.

1. Create your GitHub repository and push the workspace when you are ready.
2. In repository Settings > Pages, select **GitHub Actions** as the source.
3. In Actions, choose **Publish invitation** and select **Run workflow**.
4. The workflow installs dependencies, builds, lints, tests, and deploys `invitation/dist`.

No router rewrites or backend are required. `base: './'` keeps JS, fonts, photos,
and optional audio working under a repository URL such as `/creative-invitation/`.
If you make `invitation/` itself the repository root, move the workflow into its
`.github/workflows/` directory and remove the `invitation/` path prefixes in the workflow.
No repository was created, no commit was made, and nothing has been published by this setup.

**Privacy:** `noindex` and `robots.txt` discourage indexing, but do not provide access control.
A standard GitHub Pages URL and its bundled photos are publicly accessible to anyone with
the URL, even when the source repository is private. Use authenticated hosting instead
if the invitation or photos must truly be private. There is no analytics, remote image
hosting, external font request, acceptance notification, or persistent browser storage.

## Approved build checklist

- Personalize for Aamu / Meemu / Meems and sign as Kunjuoo.
- Create all ten chapters with the approved cream, blush, lavender, and plum palette.
- Preserve original photos; bundle optimized copies and local typography.
- Implement responsive motion, keyboard controls, optional audio, and both yes buttons.
- Verify production build, lint, responsive screenshots, and accessible workflows.
- Document setup and manual Pages deployment; keep publishing under your control.