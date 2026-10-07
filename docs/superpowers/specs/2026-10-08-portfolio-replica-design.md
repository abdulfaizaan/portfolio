# Portfolio Replica — Design Spec

**Date:** 2026-10-08
**Status:** Approved (chat design, 3 parts)
**Source design:** https://portfolio-v1-html.netlify.app/
**Repo:** https://github.com/abdulfaizaan/portfolio.git

## Intent

Rebuild Abdul Faizaan's portfolio as a visual replica of the reference site (black / `#580EF6` purple, Poppins, bordered cards, slide-in project modal) while carrying over all of his real content and every section from the old React portfolio. The old files are deliberately deleted (staged, recoverable at `492885b`); the rebuild starts fresh on top.

**Success criteria:** side-by-side match with the reference at desktop and mobile widths, all sections present with real content, `npm run build` clean, one commit at the end.

## Decisions (from user)

| Question | Decision |
|---|---|
| Working tree (all files staged deleted) | Start fresh; keep the deletion |
| Replica scope | Reference design, Abdul's content |
| Stack | React + Vite + **Tailwind CSS v3** (reference markup is v3 utilities → near pixel-match) |
| Extra old sections | Carry over: Skills, Education, Languages, Contact — restyled |
| Contact | `mailto:` form + social links; EmailJS dropped (env keys lost) |
| Hero image | Abdul's GitHub avatar + reference's shapes and spinning badge |
| Project modal columns | Keep Software Used / Tech Stack / Project Date; dates are best-guess, corrected at review |
| Modal covers | One full-width cover per project (only 1 image exists each) |

## Architecture

```
portfolio/
├── index.html, package.json, vite.config.js
├── tailwind.config.js      # primary #580EF6, Poppins, container screens
├── postcss.config.js
└── src/
    ├── main.jsx, App.jsx, index.css
    ├── assets/             # shape PNGs, Abdul_Faizaan.pdf, circletype.min.js
    └── components/
        ├── Preloader.jsx   # 100% counter + purple corner brackets
        ├── Navbar.jsx      # Contact button → #contact
        ├── ProjectModal.jsx
        └── sections/       # Hero, About, Work, Skills, Education, Languages, Contact, Footer
```

- **Design tokens** (measured from reference CSS): `primary: #580EF6`, font Poppins (Google Fonts `@import`), custom `.container` breakpoints (375/640/768/1024/1280/1536).
- **Custom CSS ported verbatim** into `index.css`: `.bg-radial-blur` (radial purple glow), `vertical-move` keyframes + 4 delay variants, `.preloader-box-transition` (staged 750/1500/2250ms bracket growth).
- **`circletype.min.js` vendored** from the reference (not re-implemented) for the curved badge text.
- **No icon library** — the 2-3 SVGs (play, close ×, social icons) are inlined as the reference does.
- **No state library, no EmailJS, no `RevealOnScroll`** (reference has no scroll-reveal).
- Content stays inline in each section (the old repo's pattern); no data-layer abstraction.

## Page structure & content mapping

Order: Preloader → Navbar → Hero → About → Work (+Modal) → Skills → Education → Languages → Contact → Footer.

1. **Preloader** — counter 0→100% at 30ms/tick, corner brackets grow in 3 stages, fade out at 100%, body scroll lock (`useEffect` port of reference `script.js`).
2. **Navbar** — absolute header, right-aligned Contact button (white border → purple on hover, underline sweep).
3. **Hero** — "Hello, I'm Abdul Faizaan a `{ Web Developer }`" (braces hidden < `sm`), GitHub avatar in `.bg-radial-blur` glow, 4 floating shapes, spinning "OPEN • FOR • FREELANCE • WORK •" badge with play icon, "See my recent work" → `#work`.
4. **About** — "About Me 👨‍💻". Left: intro paragraph with `mailto:` links + Download CV (restored PDF). Right: 3 real paragraphs written from Abdul's background (web dev with React/Tailwind/Node, learning backend, clean code — replaces lorem ipsum).
5. **Work** — "What I've Done 📁" + real projects: **Todo App** (Vanilla JS, elegant-todolist.netlify.app), **Gig Shield** (Python/Node/TypeScript, guide-wire-dev-trail.vercel.app), **More Projects** (Node/React/Springboot, github.com/abdulfaizaan). Reference card structure: label, title, blurb, "See More" → modal; hover floods card purple. Card labels (demo's company slot): "Personal Project" / "AI Project" / "Open Source".
6. **Project modal** — full-screen slide-in from left (500ms), side rail with delayed purple border (300ms delay), close × rotates −90° on hover. Meta columns: Software Used / Tech Stack / Project Date, "Live Project" button, one full-width cover image.
7. **Skills** — React 90 / TailwindCSS 85 / Node 75, reference-style bordered card + purple bars.
8. **Education** — Chandigarh University BSCS (2024–2028), Full Stack self-directed (2023–present), certs: Dev Trails · GuideWire, Full Stack Web Dev · Coursera, Java · Coursera — reference card style.
9. **Languages** — English 95 / Hindi 70 / Urdu 90 / Telugu 50, purple bars.
10. **Contact** — reference heading style, form building a pre-filled `mailto:`, inline SVG GitHub/LinkedIn/Instagram links (abdulfaizaan accounts from the old site).
11. **Footer** — reference copyright bar: "Copyright © 2026 Design & Code By • Abdul Faizaan" + `hr`.

## Animation inventory

| Where | Behavior |
|---|---|
| Preloader | Staged bracket growth (750/1500/2250ms), 30ms counter, 1000ms fade-out |
| Hero shapes | `translateY(±1rem)` 6s loop, staggered delays (reference keyframes verbatim) |
| Badge | `animate-spin` + CircleType curved text |
| Hovers | Underline sweeps, purple border gain, card flood `#580EF6` |
| Modal | 500ms slide-in, delayed side-rail border, −90° close rotation |
| Reduced motion | One `prefers-reduced-motion` query disables float/spin loops |

## Assets

- **Download from reference:** `square.png`, `triangle.png`, `circle.png`, `x.png`, `circletype.min.js`.
- **Restore from git (`492885b`):** `src/assets/Abdul_Faizaan.pdf`.
- **Hotlinked (old code's pattern):** GitHub avatar (`avatars.githubusercontent.com/u/64828142`), 3 Unsplash project images.

## Verification

1. `npm run build` passes with no errors.
2. `npm run dev` → open in browser, screenshot side-by-side with the live reference at desktop + mobile widths; fix visual diffs until matched.
3. Exercise once: preloader cycle, modal open/close, hover states, `mailto:` form, nav scroll.
4. One commit delivering the rebuilt portfolio.

## Out of scope

EmailJS, scroll-reveal animations, sidebar navigation, deployment config changes, content beyond what the old repo held.
