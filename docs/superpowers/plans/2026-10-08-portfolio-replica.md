# Portfolio Replica Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Rebuild Abdul Faizaan's portfolio as a React + Vite replica of https://portfolio-v1-html.netlify.app/ with his real content and all sections from the old portfolio.

**Architecture:** Static single-page React app. Reference markup (already Tailwind v3 utility classes) is ported into JSX with content swapped; custom reference CSS (purple `#580EF6` token, float keyframes, preloader bracket timing, container breakpoints) lives in `tailwind.config.js` + `src/index.css`. Section components are presentational; one piece of shared state (which project modal is open) lives in `App.jsx`.

**Tech Stack:** React 18, Vite 5, Tailwind CSS 3.4, PostCSS, Autoprefixer. No other runtime dependencies (no icon lib, no state lib, no EmailJS, no test framework — verification is `npm run build` + browser checks per spec §Verification).

**Spec:** `docs/superpowers/specs/2026-10-08-portfolio-replica-design.md` (the plan argues from the spec; read both)

## Global Constraints

- Tailwind **v3 (3.4.x)** — never v4; reference markup is v3 utilities.
- `primary` = `#580EF6`; font = Poppins (reference Google Fonts `@import URL`, kept verbatim).
- Email for all mailto links: `faizaanoffice@gmail.com`.
- Project date for all 3 projects: `12 May 2026` (portfolio git provenance, user-approved).
- Real content only — no lorem ipsum anywhere; no invented facts (emails, dates, features).
- Dependencies limited to: `react`, `react-dom`, `vite`, `@vitejs/plugin-react`, `tailwindcss`, `postcss`, `autoprefixer`.
- Reference class strings are copied **verbatim** into JSX (className, self-closing tags, `{'{'}` for braces) — no class renaming or restyling.
- Conditional class conflicts must be resolved by whole-string swap (e.g. `${open ? 'left-0' : '-left-full'}` — never emit `left-0` and `-left-full` together; CSS order decides otherwise).
- No `React.StrictMode` in `main.jsx` (double-invoked effects would race the preloader interval).
- One commit per task; `npm run build` must pass before every commit.
- `.gitignore` must exist before `npm install` runs (node_modules/dist/.env never committed).

## Review Focus

Failure modes the spec implies but no automated test covers (no test framework by design) — each line is tested by the step named in its owning task:

1. **CircleType UMD import fails under Vite/ESM** → badge silently renders as flat text. *(Task 4: inspect chars for inline transform styles.)*
2. **Preloader never releases scroll lock** (interval/timeout error) → whole site unusable. *(Task 3: after 100%, `document.body.style.overflow` is `''` and page scrolls.)*
3. **mailto body not URL-encoded** → contact form opens broken link. *(Task 10: submit with spaces/newlines → console launch URL contains `%20`/`%0A`.)*
4. **Modal state race** → content swaps while sliding out, or first open doesn't animate (mounted open). *(Task 6: shell mounts closed; content persists during 500ms slide-out; reopen shows new project.)*
5. **Tailwind purge drops conditional/utility classes** (`-left-full`, `after:h-full`, `animate-vertical-move-*`, `sm:inline hidden`) → broken layout at some breakpoint. *(Task 6 + Task 12: grep built CSS for these selectors; mobile screenshot shows braces hidden.)*

---

### Task 1: Scaffold Vite + React + Tailwind v3

**Files:**
- Create: `package.json`, `vite.config.js`, `postcss.config.js`, `tailwind.config.js`, `index.html`, `.gitignore`
- Create: `src/main.jsx`, `src/App.jsx`, `src/index.css`

**Interfaces:**
- Produces: project runs on `npm run dev` (Vite default port 5173); `src/App.jsx` exports default `App`; all later tasks add sections under `<App>`.

- [ ] **Step 1: Confirm tooling is present**

Run: `node -v; npm -v`
Expected: node ≥ 18, npm ≥ 9 (install Node if missing — stop and ask).

- [ ] **Step 2: Write config and entry files**

`package.json`:
```json
{
  "name": "abdul-faizaan-portfolio",
  "private": true,
  "version": "1.0.0",
  "type": "module",
  "scripts": {
    "dev": "vite",
    "build": "vite build",
    "preview": "vite preview"
  },
  "dependencies": {
    "react": "^18.3.1",
    "react-dom": "^18.3.1"
  },
  "devDependencies": {
    "@vitejs/plugin-react": "^4.3.3",
    "autoprefixer": "^10.4.20",
    "postcss": "^8.4.47",
    "tailwindcss": "^3.4.14",
    "vite": "^5.4.10"
  }
}
```

`vite.config.js`:
```js
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
})
```

`postcss.config.js`:
```js
export default {
  plugins: {
    tailwindcss: {},
    autoprefixer: {},
  },
}
```

`tailwind.config.js`:
```js
/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      colors: { primary: '#580EF6' },
      fontFamily: { sans: ['Poppins', 'sans-serif'] },
      container: {
        padding: '1rem',
        screens: {
          '375px': '375px',
          sm: '640px',
          md: '768px',
          lg: '1024px',
          xl: '1280px',
          '2xl': '1536px',
        },
      },
    },
  },
  plugins: [],
}
```

`index.html`:
```html
<!doctype html>
<html lang="en" class="scroll-smooth">
  <head>
    <meta charset="UTF-8" />
    <meta http-equiv="X-UA-Compatible" content="IE=edge" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Abdul Faizaan | Portfolio</title>
  </head>
  <body class="bg-black text-white">
    <div id="root"></div>
    <script type="module" src="/src/main.jsx"></script>
  </body>
</html>
```

`.gitignore`:
```
node_modules
dist
.env
.env.local
*.local
```

`src/index.css` (font import first — CSS `@import` must precede `@tailwind` rules):
```css
@import url('https://fonts.googleapis.com/css2?family=Poppins:ital,wght@0,100;0,200;0,300;0,400;0,500;0,600;0,700;0,800;0,900;1,100;1,200;1,300;1,400;1,500;1,600;1,700;1,800;1,900&display=swap');

@tailwind base;
@tailwind components;
@tailwind utilities;

.bg-radial-blur {
  background: rgb(88, 14, 246);
  background: radial-gradient(circle, rgba(88, 14, 246, 1) 0%, rgba(255, 255, 255, 0) 60%);
}

.preloader-box-transition::before {
  transition: width 750ms linear, height 750ms linear 750ms;
}
.preloader-box-transition::after {
  transition: width 750ms linear 1500ms, height 750ms linear 2250ms;
}

@keyframes vertical-move {
  0%, 100% { transform: translateY(-1rem); }
  50% { transform: translateY(1rem); }
}
.animate-vertical-move-1 { animation: vertical-move 6s 1s linear infinite; }
.animate-vertical-move-2 { animation: vertical-move 6s 3s linear infinite; }
.animate-vertical-move-3 { animation: vertical-move 6s 2s linear infinite; }
.animate-vertical-move-4 { animation: vertical-move 6s 4s linear infinite; }

@media (prefers-reduced-motion: reduce) {
  .animate-vertical-move-1,
  .animate-vertical-move-2,
  .animate-vertical-move-3,
  .animate-vertical-move-4,
  .animate-spin {
    animation: none !important;
  }
}
```

`src/main.jsx` (no StrictMode — see Global Constraints):
```jsx
import { createRoot } from 'react-dom/client'
import App from './App.jsx'
import './index.css'

createRoot(document.getElementById('root')).render(<App />)
```

`src/App.jsx`:
```jsx
export default function App() {
  return (
    <>
      <main />
    </>
  )
}
```

- [ ] **Step 3: Install dependencies**

Run: `npm install`
Expected: completes with no errors; `node_modules/` created; `git status` shows node_modules NOT listed (gitignore works).

- [ ] **Step 4: Verify dev server and build**

Run: `npm run dev` (background), then open `http://localhost:5173`
Expected: black page renders, no console errors. Run `npm run build` → `dist/` created, exit 0.

- [ ] **Step 5: Verify Tailwind pipeline (Review Focus #5 first evidence)**

Run: `Select-String -Path dist/assets/*.css -Pattern 'bg-radial-blur','vertical-move','\.container'`
Expected: all three selectors present in built CSS.

- [ ] **Step 6: Commit**

```bash
git add -A
git commit -m "feat: scaffold Vite + React + Tailwind v3 portfolio"
```

---

### Task 2: Fetch assets (shapes, CircleType, resume PDF)

**Files:**
- Create: `src/assets/shapes/{square,triangle,circle,x}.png`, `src/assets/circletype.min.js`, `src/assets/Abdul_Faizaan.pdf`

**Interfaces:**
- Produces: exact asset paths imported by Task 4 (`../assets/shapes/square.png` …), Task 5 (`../assets/Abdul_Faizaan.pdf`), Task 4 (`../assets/circletype.min.js` side-effect import exposing `window.CircleType`).

- [ ] **Step 1: Download reference assets**

```powershell
$base = 'https://portfolio-v1-html.netlify.app'
New-Item -ItemType Directory -Force src/assets/shapes | Out-Null
foreach ($f in 'square','triangle','circle','x') {
  Invoke-WebRequest "$base/img/illustrations/$f.png" -OutFile "src/assets/shapes/$f.png" -UseBasicParsing
}
Invoke-WebRequest "$base/circletype.min.js" -OutFile src/assets/circletype.min.js -UseBasicParsing
```

- [ ] **Step 2: Restore resume from git history**

```powershell
git restore --source=492885b -- src/assets/Abdul_Faizaan.pdf
```

- [ ] **Step 3: Verify all five files are real**

```powershell
Get-ChildItem src/assets/shapes/*.png, src/assets/circletype.min.js | Select-Object Name, Length
$pdf = [System.IO.File]::ReadAllBytes('src/assets/Abdul_Faizaan.pdf')[0..3]
-join [char[]]$pdf
```
Expected: each PNG ≥ 1000 bytes, `circletype.min.js` ≥ 5000 bytes, PDF check prints `%PDF` (if `git restore` fails due to the legacy invalid path in that commit, use `git archive 492885b src/assets/Abdul_Faizaan.pdf -o tmp.zip`, expand, copy file out, delete zip).

- [ ] **Step 4: Commit**

```bash
git add src/assets
git commit -m "feat: add illustration shapes, CircleType lib, resume PDF"
```

---

### Task 3: Preloader + Navbar

**Files:**
- Create: `src/components/Preloader.jsx`, `src/components/Navbar.jsx`
- Modify: `src/App.jsx`

**Interfaces:**
- Consumes: `src/index.css` classes (`.preloader-box-transition`), `primary` color token.
- Produces: `<Preloader />` and `<Navbar />` rendered by `App` as first children; preloader self-removes (hidden) after ~4s.

- [ ] **Step 1: Write `src/components/Preloader.jsx`**

```jsx
import { useEffect, useState } from 'react'

export default function Preloader() {
  const [count, setCount] = useState(0)
  const [grow, setGrow] = useState(false)
  const [fading, setFading] = useState(false)
  const [done, setDone] = useState(false)

  useEffect(() => {
    document.body.style.overflow = 'hidden'
    const raf = requestAnimationFrame(() => setGrow(true))

    let counter = 0
    let fadeTimer
    const interval = setInterval(() => {
      setCount(counter++)
      if (counter > 100) {
        clearInterval(interval)
        setFading(true)
        fadeTimer = setTimeout(() => {
          setDone(true)
          document.body.style.overflow = ''
        }, 1000)
      }
    }, 30)

    return () => {
      cancelAnimationFrame(raf)
      clearInterval(interval)
      clearTimeout(fadeTimer)
      document.body.style.overflow = ''
    }
  }, [])

  if (done) return null

  return (
    <section
      id="preloader"
      className={`transition-all duration-1000 ${fading ? 'opacity-0' : ''}`}
    >
      <div
        className={`fixed top-0 left-0 flex justify-center items-center w-screen h-screen bg-black z-50 before:content-[''] before:absolute before:top-0 before:left-0 before:block before:border-t-4 before:border-r-4 before:border-primary after:content-[''] after:absolute after:bottom-0 after:right-0 after:block after:border-b-4 after:border-l-4 after:border-primary preloader-box-transition ${
          grow ? 'before:w-full before:h-full after:w-full after:h-full' : 'before:w-0 before:h-0 after:w-0 after:h-0'
        }`}
      >
        <h5 className="text-2xl tracking-widest">{count}%</h5>
      </div>
    </section>
  )
}
```

- [ ] **Step 2: Write `src/components/Navbar.jsx`**

```jsx
export default function Navbar() {
  return (
    <header className="absolute top-0 left-0 w-full">
      <nav className="container flex justify-end mx-auto py-7">
        <a href="#contact" className="group md:text-lg text-base border-2 border-white px-8 py-3 hover:border-primary">
          <span className="relative after:content-[''] after:absolute after:block after:w-0 after:border-t-2 after:border-white after:top-1/2 after:left-0 after:-translate-y-1/2 after:transition-all after:duration-300 after:ease-out group-hover:after:w-full">Contact</span>
        </a>
      </nav>
    </header>
  )
}
```

- [ ] **Step 3: Wire into `src/App.jsx`**

```jsx
import Preloader from './components/Preloader.jsx'
import Navbar from './components/Navbar.jsx'

export default function App() {
  return (
    <>
      <Preloader />
      <Navbar />
      <main />
    </>
  )
}
```

- [ ] **Step 4: Verify in browser (Review Focus #2)**

Run `npm run dev`, open `http://localhost:5173`. Expected: purple corner brackets grow in 3 stages, counter ticks 0%→100% (~3s), overlay fades and unmounts; **then scroll the page** and check `document.body.style.overflow` in console → `''` (empty). During preloader, scrolling is locked. Hover the Contact button → border turns purple, underline sweeps.

- [ ] **Step 5: Build + Commit**

Run: `npm run build` → exit 0.
```bash
git add src/components/Preloader.jsx src/components/Navbar.jsx src/App.jsx
git commit -m "feat: add preloader and navbar"
```

---

### Task 4: Hero section (avatar, shapes, spinning badge)

**Files:**
- Create: `src/components/sections/Hero.jsx`
- Modify: `src/App.jsx`

**Interfaces:**
- Consumes: assets from Task 2 (4 shape PNGs, `circletype.min.js`), `.bg-radial-blur` + `.animate-vertical-move-*` from Task 1.
- Produces: `<Hero />` rendered inside `<main>` in App.

- [ ] **Step 1: Write `src/components/sections/Hero.jsx`**

```jsx
import { useEffect, useRef } from 'react'
import '../../assets/circletype.min.js'
import square from '../../assets/shapes/square.png'
import triangle from '../../assets/shapes/triangle.png'
import circle from '../../assets/shapes/circle.png'
import x from '../../assets/shapes/x.png'

const AVATAR = 'https://avatars.githubusercontent.com/u/64828142?s=400&v=4'

export default function Hero() {
  const badgeRef = useRef(null)

  useEffect(() => {
    if (!badgeRef.current || !window.CircleType) return
    const ct = new window.CircleType(badgeRef.current)
    return () => ct.destroy()
  }, [])

  return (
    <section id="hero">
      <div className="container flex items-center lg:min-h-screen mx-auto py-24">
        <div className="flex flex-wrap items-center h-full">
          <div className="lg:w-7/12 lg:order-1 order-2">
            <h1 className="font-bold xl:text-7xl md:text-6xl text-5xl xl:leading-tight md:leading-tight sm:leading-tight leading-tight mb-14">
              Hello, I'm Abdul Faizaan a<br />
              <span className="text-primary sm:inline hidden">{'{'}</span>
              <span className="text-slate-400">Web Developer</span>
              <span className="text-primary sm:inline hidden">{'}'}</span>
            </h1>
            <a href="#work" className="inline-block relative md:text-xl text-lg pb-3 before:content-[''] before:absolute before:w-full before:border-b-2 before:border-white before:left-0 before:bottom-0 after:content-[''] after:absolute after:w-0 after:border-b-2 after:border-primary after:left-0 after:bottom-0 hover:after:w-full after:transition-all after:duration-300 after:ease-out">
              See my recent work
            </a>
          </div>
          <div className="lg:w-5/12 lg:order-2 order-1 relative bg-radial-blur lg:mb-0 md:mb-16 mb-10">
            <img src={AVATAR} className="relative xl:w-10/12 lg:w-11/12 sm:w-3/4 w-full m-auto z-[1] rounded-full border-4 border-white" alt="Abdul Faizaan" />
            <div className="absolute top-3/4 sm:left-1/4 left-[15%] -translate-y-1/2 -translate-x-1/2 z-0">
              <div className="animate-vertical-move-1 -translate-y-4">
                <img src={square} className="-rotate-[30deg] sm:w-16 w-12" alt="" />
              </div>
            </div>
            <div className="absolute top-1/4 sm:left-1/4 left-[15%] -translate-y-1/2 -translate-x-1/2 z-0">
              <div className="animate-vertical-move-2 -translate-y-4">
                <img src={triangle} className="-rotate-[30deg] sm:w-20 w-16" alt="" />
              </div>
            </div>
            <div className="absolute top-1/4 sm:left-3/4 left-[85%] -translate-y-1/2 -translate-x-1/2 z-0">
              <div className="animate-vertical-move-3 -translate-y-4">
                <img src={circle} className="rotate-[30deg] sm:w-16 w-12" alt="" />
              </div>
            </div>
            <div className="absolute top-3/4 sm:left-3/4 left-[85%] -translate-y-1/2 -translate-x-1/2 z-0">
              <div className="animate-vertical-move-4 -translate-y-4">
                <img src={x} className="rotate-[30deg] sm:w-16 w-12" alt="" />
              </div>
            </div>
            <div className="absolute bottom-0 lg:left-0 md:left-16 sm:left-5 left-12 z-[1] md:block hidden">
              <p ref={badgeRef} className="tracking-wide animate-spin circle-text sm:text-base text-sm">
                OPEN • FOR • FREELANCE • WORK •
              </p>
              <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#580EF6" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <polygon points="5 3 19 12 5 21 5 3"></polygon>
                </svg>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
```

Note: the avatar is the user's GitHub photo in a circle (`rounded-full border-4 border-white`) inside the reference glow — the user-approved hero choice, loaded from a plain string constant (Vite does not import remote URLs).

- [ ] **Step 2: Render in `src/App.jsx`**

Add `import Hero from './components/sections/Hero.jsx'` and place `<Hero />` inside `<main>`.

- [ ] **Step 3: Verify in browser (Review Focus #1 + #5)**

Open `http://localhost:5173`. Expected:
- Heading shows name + purple braces only ≥640px (inspect: braces `display: none` below `sm`) — Review Focus #5.
- Avatar circular in purple radial glow; 4 shapes float with staggered offsets.
- Badge: in DevTools, `p.circle-text` children are per-character `<span>`s with inline `transform` styles (CircleType ran) **and** the block rotates (`animate-spin`). If spans are absent → `window.CircleType` was undefined: verify `src/assets/circletype.min.js` starts with a UMD wrapper and, if the global branch didn't fire, add `window.CircleType = window.CircleType || window.circletype` after the import — re-test.
- Console: no errors.
- Responsive: at 390px width, image stacks above text (order swap) and heading has no braces.

- [ ] **Step 4: Build + Commit**

Run: `npm run build` → exit 0; `Select-String -Path dist/assets/*.css -Pattern 'vertical-move','sm\\:inline'` → matches found (purge check).
```bash
git add src/components/sections/Hero.jsx src/App.jsx
git commit -m "feat: add hero section with avatar, floating shapes, spinning badge"
```

---

### Task 5: About section

**Files:**
- Create: `src/components/sections/About.jsx`
- Modify: `src/App.jsx`

**Interfaces:**
- Consumes: `src/assets/Abdul_Faizaan.pdf` (Task 2).
- Produces: `<About />` inside `<main>`; `#work` anchor (Task 6) referenced by hero link, About is scroll target `#about`.

- [ ] **Step 1: Write `src/components/sections/About.jsx`**

```jsx
import cv from '../../assets/Abdul_Faizaan.pdf'

const inlineLink =
  'relative text-primary after:content-[\'\'] after:absolute after:left-0 after:top-1/2 after:-translate-y-1/2 after:block after:w-0 after:border-t-[1.5px] after:border-white after:transition-all after:duration-300 after:ease-out hover:after:w-full'

export default function About() {
  return (
    <section id="about">
      <div className="container mx-auto md:py-24 py-16">
        <div className="flex flex-wrap items-start">
          <div className="lg:w-5/12 w-full">
            <h1 className="font-bold xl:text-7xl md:text-6xl text-5xl xl:leading-tight md:leading-tight sm:leading-tight leading-tight md:mb-12 mb-10">
              About Me 👨‍💻
            </h1>
            <p className="md:text-xl text-base text-white md:leading-relaxed leading-relaxed md:mb-16 mb-12">
              Interested To Work With Me? You can reach out by sending an{' '}
              <a href="mailto:faizaanoffice@gmail.com" className={inlineLink}>e-mail</a>
              {' '}or connect with me on{' '}
              <a href="https://www.linkedin.com/in/abdul-faizaan" target="_blank" rel="noreferrer" className={inlineLink}>LinkedIn</a>
            </p>
            <a href={cv} download="Abdul_Faizaan.pdf" className="group inline-block md:text-lg text-base border-2 border-white px-8 py-3 hover:border-primary md:mb-16 mb-12">
              <span className="relative after:content-[''] after:absolute after:block after:w-0 after:border-t-2 after:border-white after:top-1/2 after:left-0 after:-translate-y-1/2 after:transition-all after:duration-300 after:ease-out group-hover:after:w-full">Download CV</span>
            </a>
          </div>
          <div className="lg:w-6/12 w-full ml-auto">
            <p className="md:text-xl text-base md:leading-relaxed leading-relaxed mb-4">
              I'm a web developer who enjoys turning ideas into clean, responsive interfaces.
              Most of my day-to-day work is{' '}
              <a href="https://react.dev" target="_blank" rel="noreferrer" className={inlineLink}>React</a>{' '}
              and Tailwind CSS on the front end, with Node.js on the server when a project
              needs one. I care about code that is easy to read, easy to extend, and fast for
              the person using it.
            </p>
            <p className="md:text-xl text-base md:leading-relaxed leading-relaxed mb-4">
              Recently I've been building full-stack projects — from a{' '}
              <a href="https://elegant-todolist.netlify.app/" target="_blank" rel="noreferrer" className={inlineLink}>
                vanilla JavaScript todo app
              </a>{' '}
              to an{' '}
              <a href="https://guide-wire-dev-trail.vercel.app" target="_blank" rel="noreferrer" className={inlineLink}>
                AI-powered insurance claim prediction system
              </a>{' '}
              — while deepening my backend skills. I'm currently pursuing a Bachelor of
              Computer Science at Chandigarh University (2024–2028), alongside project work
              and certifications like the GuideWire Dev Trails program and Coursera's Full
              Stack Web Development course.
            </p>
            <p className="md:text-xl text-base md:leading-relaxed leading-relaxed">
              When I'm not shipping features, I'm usually exploring a new technology,
              contributing to{' '}
              <a href="https://github.com/abdulfaizaan" target="_blank" rel="noreferrer" className={inlineLink}>
                open source
              </a>
              , or refining the details that make an interface feel polished.
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}
```

- [ ] **Step 2: Render in App**

Add import and `<About />` after `<Hero />` inside `<main>`.

- [ ] **Step 3: Verify in browser**

Expected: two-column layout ≥1024px, single column below; purple inline links with underline-sweep hover; **Download CV** downloads `Abdul_Faizaan.pdf` (click → download starts, filename correct).

- [ ] **Step 4: Build + Commit**

Run: `npm run build` → exit 0.
```bash
git add src/components/sections/About.jsx src/App.jsx
git commit -m "feat: add about section with CV download"
```

---

### Task 6: Work cards + Project modal

**Files:**
- Create: `src/components/sections/Work.jsx`, `src/components/ProjectModal.jsx`
- Modify: `src/App.jsx`

**Interfaces:**
- Produces: `Work` default export, props: `{ onSelect: (project: Object) => void }`. `ProjectModal` default export, props: `{ project: Object | null, open: boolean, onClose: () => void }`. `App` holds `{ open, project }` state. Project object shape (used by both):
  `{ label, title, summary, description, software, tech, date, link, image }` (all strings).

- [ ] **Step 1: Write `src/components/sections/Work.jsx`**

```jsx
const PROJECTS = [
  {
    label: 'Personal Project',
    title: 'Todo App',
    summary: 'An elegant todo app built with HTML, CSS, and JavaScript.',
    description:
      'An elegant todo app built with HTML, CSS, and JavaScript. With a clean and intuitive interface, it allows users to easily manage their tasks and stay organized. It shows how far plain HTML, CSS, and JavaScript can take a project without a framework.',
    software: 'Visual Studio Code, Git, Chrome DevTools',
    tech: 'HTML, CSS, Vanilla JavaScript',
    date: '12 May 2026',
    link: 'https://elegant-todolist.netlify.app/',
    image: 'https://images.unsplash.com/photo-1484480974693-6ca0a78fb36b?q=80&w=2072&auto=format&fit=crop',
  },
  {
    label: 'AI Project',
    title: 'Gig Shield',
    summary: 'AI/ML-powered insurance claim prediction for accurate risk assessment and fraud detection.',
    description:
      'An AI/ML-powered insurance claim prediction system built for accurate risk assessment and fraud detection. The project pairs a machine learning model with a web interface, turning claim data into a clear risk verdict.',
    software: 'Visual Studio Code, GitHub, Postman',
    tech: 'Python, Node, TypeScript',
    date: '12 May 2026',
    link: 'https://guide-wire-dev-trail.vercel.app',
    image: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?q=80&w=2070&auto=format&fit=crop',
  },
  {
    label: 'Open Source',
    title: 'More Projects',
    summary: 'Explore a variety of projects showcasing my skills in web development on GitHub.',
    description:
      "A collection of everything else I've built — web apps, experiments, and contributions. Browse the repositories to see the code behind my work, including projects built with Node, React, and Spring Boot.",
    software: 'Visual Studio Code, GitHub',
    tech: 'Node, React, Springboot',
    date: '12 May 2026',
    link: 'https://github.com/abdulfaizaan',
    image: 'https://images.unsplash.com/photo-1555066931-4365d14bab8c?q=80&w=2070&auto=format&fit=crop',
  },
]

export default function Work({ onSelect }) {
  return (
    <section id="work">
      <div className="container mx-auto md:py-24 py-16">
        <h1 className="font-bold xl:text-7xl md:text-6xl text-5xl xl:leading-tight md:leading-tight sm:leading-tight leading-tight md:mb-12 mb-10">
          What I've Done 📁
        </h1>
        <p className="md:text-xl text-base text-white md:leading-relaxed leading-relaxed md:mb-16 mb-8">
          These are a selection of my recent works.
        </p>
        <div className="flex flex-wrap -mx-5">
          {PROJECTS.map((project) => (
            <div key={project.title} className="xl:w-4/12 md:w-1/2 w-full px-5 mb-8">
              <div className="flex flex-col justify-between items-start relative border-2 border-white w-full h-full md:pl-12 md:pt-12 pl-8 pt-8 pb-6 pr-6 z-[1] hover:bg-primary hover:border-primary">
                <div className="grow">
                  <p className="inline-block text-base relative pb-1 md:mb-12 mb-8 after:content-[''] after:block after:absolute after:bottom-0 after:left-0 after:w-full after:border-b-[1.5px] after:border-white">
                    {project.label}
                  </p>
                  <h3 className="md:text-4xl text-3xl font-bold md:leading-snug leading-snug mb-5">
                    {project.title}
                  </h3>
                  <p className="text-base text-white md:mb-12 mb-8">{project.summary}</p>
                </div>
                <button
                  type="button"
                  onClick={() => onSelect(project)}
                  className="group inline-block text-base border-[1.5px] border-white px-8 py-3 mt-auto"
                >
                  <span className="relative after:content-[''] after:absolute after:block after:w-0 after:border-t-[1.5px] after:border-white after:top-1/2 after:left-0 after:-translate-y-1/2 after:transition-all after:duration-300 after:ease-out group-hover:after:w-full">
                    See More
                  </span>
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
```

- [ ] **Step 2: Write `src/components/ProjectModal.jsx`**

```jsx
import { useEffect, useRef } from 'react'

export default function ProjectModal({ project, open, onClose }) {
  const closeRef = useRef(null)
  const openerRef = useRef(null)

  useEffect(() => {
    if (open) {
      openerRef.current = document.activeElement
      closeRef.current?.focus()
    } else {
      openerRef.current?.focus?.()
    }
  }, [open])

  useEffect(() => {
    if (!open) return
    const onKey = (e) => e.key === 'Escape' && onClose()
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [open, onClose])

  return (
    <section id="modal" aria-hidden={!open}>
      <div
        role="dialog"
        aria-modal="true"
        aria-label={project ? project.title : 'Project details'}
        className={`modal-content fixed top-0 w-screen h-screen bg-black overflow-auto z-40 transition-all duration-500 ease-in-out ${
          open ? 'left-0' : '-left-full after:delay-300'
        }`}
      >
        <div
          className={`modal-side md:fixed top-0 flex md:justify-center justify-end items-center bg-black z-10 md:h-full md:w-36 w-full md:p-0 p-8 after:content-[''] after:absolute after:right-0 after:top-0 after:h-0 md:after:border-r-2 after:border-primary after:transition-all after:duration-500 after:ease-in-out ${
            open ? 'left-0 after:delay-300 after:h-full' : '-left-full after:h-0'
          }`}
        >
          <button
            ref={closeRef}
            type="button"
            onClick={onClose}
            aria-label="Close project details"
            className="group inline-block border-0 bg-transparent hover:-rotate-90 transition-all duration-300 ease-out"
          >
            <svg
              className="group-hover:stroke-primary"
              xmlns="http://www.w3.org/2000/svg"
              width="28"
              height="28"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <line x1="18" y1="6" x2="6" y2="18"></line>
              <line x1="6" y1="6" x2="18" y2="18"></line>
            </svg>
          </button>
        </div>
        <div className="md:ml-36">
          <div className="container md:px-20 md:py-16">
            {project && (
              <>
                <div className="lg:w-3/4 mb-24">
                  <h1 className="font-bold xl:text-7xl md:text-6xl text-5xl xl:leading-tight md:leading-tight sm:leading-tight leading-tight lg:w-11/12 md:w-full sm:w-10/12 md:mb-12 mb-10">
                    {project.title}
                  </h1>
                  <p className="md:text-xl text-base text-white md:leading-relaxed leading-relaxed md:mb-10 mb-8">
                    {project.description}
                  </p>
                  <div className="flex flex-wrap items-start -mx-4">
                    <div className="lg:w-4/12 sm:w-1/2 px-4">
                      <p className="inline-block text-base relative pb-1 mb-4 after:content-[''] after:block after:absolute after:bottom-0 after:left-0 after:w-full after:border-b-[1.5px] after:border-white">
                        Software Used
                      </p>
                      <p className="text-base text-slate-400 leading-relaxed mb-6">{project.software}</p>
                    </div>
                    <div className="lg:w-4/12 sm:w-1/2 px-4">
                      <p className="inline-block text-base relative pb-1 mb-4 after:content-[''] after:block after:absolute after:bottom-0 after:left-0 after:w-full after:border-b-[1.5px] after:border-white">
                        Tech Stack
                      </p>
                      <p className="text-base text-slate-400 leading-relaxed mb-6">{project.tech}</p>
                    </div>
                    <div className="lg:w-4/12 sm:w-1/2 px-4">
                      <p className="inline-block text-base relative pb-1 mb-4 after:content-[''] after:block after:absolute after:bottom-0 after:left-0 after:w-full after:border-b-[1.5px] after:border-white">
                        Project Date
                      </p>
                      <p className="text-base text-slate-400 leading-relaxed mb-6">{project.date}</p>
                    </div>
                  </div>
                  <a
                    href={project.link}
                    target="_blank"
                    rel="noreferrer"
                    className="group inline-block md:text-lg text-base border-2 border-white px-8 py-3 hover:border-primary mt-12"
                  >
                    <span className="relative after:content-[''] after:absolute after:block after:w-0 after:border-t-2 after:border-white after:top-1/2 after:left-0 after:-translate-y-1/2 after:transition-all after:duration-300 after:ease-out group-hover:after:w-full">
                      Live Project
                    </span>
                  </a>
                </div>
                <img src={project.image} className="w-full md:mb-16 mb-8" alt={`${project.title} cover`} />
              </>
            )}
          </div>
        </div>
      </div>
    </section>
  )
}
```

- [ ] **Step 3: Wire state in `src/App.jsx`**

```jsx
import { useState } from 'react'
import Work from './components/sections/Work.jsx'
import ProjectModal from './components/ProjectModal.jsx'

export default function App() {
  const [modal, setModal] = useState({ open: false, project: null })

  return (
    <>
      <Preloader />
      <Navbar />
      <main>
        <Hero />
        <About />
        <Work onSelect={(project) => setModal({ open: true, project })} />
      </main>
      <ProjectModal
        project={modal.project}
        open={modal.open}
        onClose={() => setModal((m) => ({ ...m, open: false }))}
      />
    </>
  )
}
```
(`Navbar`, `Hero`, `About` imports from earlier tasks stay; `<main />` placeholder is replaced by the real children.)

- [ ] **Step 4: Verify in browser (Review Focus #4 + #5)**

Expected checklist:
- Page load: no modal visible; modal shell **is** in DOM (`#modal .modal-content` exists with `-left-full`) — this is what lets the first open animate.
- Click Todo App "See More" → content slides in from left over 500ms, side rail's purple border grows after delay, close × gets focus.
- **Open Gig Shield, then press Escape / click ×** → while it slides out (500ms), the visible content is still *Gig Shield* (project is kept when closing — no content swap mid-animation).
- Reopen Todo App → content correctly shows Todo App again.
- Hover close button → rotates −90°; hover card → floods purple.
- Scroll inside modal: it scrolls independently (`overflow-auto`).
- Purge check: `Select-String -Path dist/assets/*.css -Pattern '-left-full','after\\:h-full'` after `npm run build` → matches.

- [ ] **Step 5: Build + Commit**

Run: `npm run build` → exit 0.
```bash
git add src/components/sections/Work.jsx src/components/ProjectModal.jsx src/App.jsx
git commit -m "feat: add work cards and full-screen project modal"
```

---

### Task 7: Skills section

**Files:**
- Create: `src/components/sections/Skills.jsx`
- Modify: `src/App.jsx`

**Interfaces:**
- Produces: `<Skills />` rendered after `<Work />` inside `<main>`.

- [ ] **Step 1: Write `src/components/sections/Skills.jsx`**

```jsx
const SKILLS = [
  { name: 'React', level: 90 },
  { name: 'TailwindCSS', level: 85 },
  { name: 'Node.js', level: 75 },
]

export default function Skills() {
  return (
    <section id="skills">
      <div className="container mx-auto md:py-24 py-16">
        <h1 className="font-bold xl:text-7xl md:text-6xl text-5xl xl:leading-tight md:leading-tight sm:leading-tight leading-tight md:mb-12 mb-10">
          My Skills 💡
        </h1>
        <p className="md:text-xl text-base text-white md:leading-relaxed leading-relaxed md:mb-16 mb-8">
          Passionate web developer with expertise in building scalable web applications.
          Currently learning backend development and exploring new technologies to deliver
          exceptional user experiences.
        </p>
        <div className="border-2 border-white p-8 md:p-12">
          {SKILLS.map((skill) => (
            <div key={skill.name} className="mb-8 last:mb-0">
              <div className="flex justify-between items-center mb-3">
                <span className="md:text-xl text-base font-medium">{skill.name}</span>
                <span className="md:text-xl text-base font-bold text-primary">{skill.level}%</span>
              </div>
              <div className="w-full border-2 border-white h-4">
                <div className="bg-primary h-full" style={{ width: `${skill.level}%` }}></div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
```

- [ ] **Step 2: Render after `<Work />` in App** (import + placement).

- [ ] **Step 3: Verify in browser**

Expected: heading + intro, bordered card with 3 purple bars at 90/85/75% widths; responsive at 390px.

- [ ] **Step 4: Build + Commit**

Run: `npm run build` → exit 0.
```bash
git add src/components/sections/Skills.jsx src/App.jsx
git commit -m "feat: add skills section in replica style"
```

---

### Task 8: Education section

**Files:**
- Create: `src/components/sections/Education.jsx`
- Modify: `src/App.jsx`

**Interfaces:**
- Produces: `<Education />` rendered after `<Skills />`.

- [ ] **Step 1: Write `src/components/sections/Education.jsx`**

```jsx
const ENTRIES = [
  {
    label: 'Education',
    title: 'Bachelor of Computer Science',
    org: 'Chandigarh University',
    date: '2024 - 2028',
    text: 'Focusing on core computer science principles, software engineering, and modern web technologies while participating in technical clubs.',
  },
  {
    label: 'Experience',
    title: 'Full Stack Development',
    org: 'Self-Directed Learning',
    date: '2023 - Present',
    text: 'Building personal projects and contributing to open-source communities to master full-stack development.',
  },
  {
    label: 'Certification',
    title: 'Dev Trails',
    org: 'GuideWire',
    date: '2026',
    text: 'Industry program focused on practical development skills.',
  },
  {
    label: 'Certification',
    title: 'Full Stack Web Development',
    org: 'Coursera',
    date: '2026',
    text: 'End-to-end web development coursework covering front-end and back-end fundamentals.',
  },
  {
    label: 'Certification',
    title: 'Java',
    org: 'Coursera',
    date: '2026',
    text: 'Core Java programming coursework.',
  },
]

export default function Education() {
  return (
    <section id="education">
      <div className="container mx-auto md:py-24 py-16">
        <h1 className="font-bold xl:text-7xl md:text-6xl text-5xl xl:leading-tight md:leading-tight sm:leading-tight leading-tight md:mb-12 mb-10">
          Education & Certifications 🎓
        </h1>
        <p className="md:text-xl text-base text-white md:leading-relaxed leading-relaxed md:mb-16 mb-8">
          My learning journey and credentials.
        </p>
        <div className="flex flex-wrap -mx-5">
          {ENTRIES.map((entry) => (
            <div key={entry.title + entry.org} className="xl:w-4/12 md:w-1/2 w-full px-5 mb-8">
              <div className="flex flex-col items-start relative border-2 border-white w-full h-full md:pl-12 md:pt-12 pl-8 pt-8 pb-6 pr-6 hover:bg-primary hover:border-primary">
                <p className="inline-block text-base relative pb-1 md:mb-8 mb-6 after:content-[''] after:block after:absolute after:bottom-0 after:left-0 after:w-full after:border-b-[1.5px] after:border-white">
                  {entry.label}
                </p>
                <h3 className="md:text-3xl text-2xl font-bold md:leading-snug leading-snug mb-2">
                  {entry.title}
                </h3>
                <p className="text-base mb-1">{entry.org}</p>
                <p className="text-base text-slate-400 mb-5">{entry.date}</p>
                <p className="text-base">{entry.text}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
```

- [ ] **Step 2: Render after `<Skills />` in App.**

- [ ] **Step 3: Verify in browser**

Expected: 5 bordered cards (3+2 wrap at xl), hover floods purple, content matches spec (Chandigarh University 2024-2028, 3 certs, dates 2026).

- [ ] **Step 4: Build + Commit**

Run: `npm run build` → exit 0.
```bash
git add src/components/sections/Education.jsx src/App.jsx
git commit -m "feat: add education and certifications section"
```

---

### Task 9: Languages section

**Files:**
- Create: `src/components/sections/Languages.jsx`
- Modify: `src/App.jsx`

**Interfaces:**
- Produces: `<Languages />` rendered after `<Education />`.

- [ ] **Step 1: Write `src/components/sections/Languages.jsx`**

```jsx
const LANGUAGES = [
  { name: 'English', level: 95, status: 'Native/Fluent' },
  { name: 'Hindi', level: 70, status: 'Intermediate' },
  { name: 'Urdu', level: 90, status: 'Intermediate' },
  { name: 'Telugu', level: 50, status: 'Basic' },
]

export default function Languages() {
  return (
    <section id="languages">
      <div className="container mx-auto md:py-24 py-16">
        <h1 className="font-bold xl:text-7xl md:text-6xl text-5xl xl:leading-tight md:leading-tight sm:leading-tight leading-tight md:mb-12 mb-10">
          Languages 🌐
        </h1>
        <p className="md:text-xl text-base text-white md:leading-relaxed leading-relaxed md:mb-16 mb-8">
          The languages I speak and my proficiency level in each.
        </p>
        <div className="border-2 border-white p-8 md:p-12">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-10">
            {LANGUAGES.map((lang) => (
              <div key={lang.name}>
                <div className="flex justify-between items-end mb-3">
                  <div>
                    <span className="md:text-2xl text-xl font-bold block">{lang.name}</span>
                    <span className="text-xs text-primary uppercase tracking-widest font-bold">
                      {lang.status}
                    </span>
                  </div>
                  <span className="text-slate-400">{lang.level}%</span>
                </div>
                <div className="w-full border-2 border-white h-4">
                  <div className="bg-primary h-full" style={{ width: `${lang.level}%` }}></div>
                </div>
              </div>
            ))}
          </div>
          <div className="mt-16 pt-8 border-t-2 border-white text-center">
            <p className="text-slate-400 text-sm">
              Always learning and improving my language skills to connect with people globally.
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}
```

- [ ] **Step 2: Render after `<Education />` in App.**

- [ ] **Step 3: Verify in browser**

Expected: 2×2 bar grid ≥768px, single column below; purple fills at 95/70/90/50%.

- [ ] **Step 4: Build + Commit**

Run: `npm run build` → exit 0.
```bash
git add src/components/sections/Languages.jsx src/App.jsx
git commit -m "feat: add languages section"
```

---

### Task 10: Contact section

**Files:**
- Create: `src/components/sections/Contact.jsx`
- Modify: `src/App.jsx`

**Interfaces:**
- Produces: `<Contact />` rendered after `<Languages />`; provides the `#contact` anchor targeted by Navbar. Form field names: `name`, `email`, `message` (used in mailto body).

- [ ] **Step 1: Write `src/components/sections/Contact.jsx`**

```jsx
const inlineLink =
  'relative text-primary after:content-[\'\'] after:absolute after:left-0 after:top-1/2 after:-translate-y-1/2 after:block after:w-0 after:border-t-[1.5px] after:border-white after:transition-all after:duration-300 after:ease-out hover:after:w-full'

const social = [
  {
    name: 'GitHub',
    href: 'https://github.com/abdulfaizaan',
    path: 'M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22',
  },
  {
    name: 'LinkedIn',
    href: 'https://www.linkedin.com/in/abdul-faizaan',
    path: 'M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6zM2 9h4v12H2zM4 2a2 2 0 1 1 0 4 2 2 0 0 1 0-4z',
  },
  {
    name: 'Instagram',
    href: 'https://www.instagram.com/abdulfaizaan._7/',
    path: 'M7 2h10a5 5 0 0 1 5 5v10a5 5 0 0 1-5 5H7a5 5 0 0 1-5-5V7a5 5 0 0 1 5-5zM12 8a4 4 0 1 0 0 8 4 4 0 0 0 0-8zM17.5 6.5h.01',
  },
]

export default function Contact() {
  const handleSubmit = (e) => {
    e.preventDefault()
    const data = new FormData(e.target)
    const subject = encodeURIComponent(`Portfolio contact from ${data.get('name')}`)
    const body = encodeURIComponent(`${data.get('message')}\n\n— ${data.get('name')} (${data.get('email')})`)
    window.location.href = `mailto:faizaanoffice@gmail.com?subject=${subject}&body=${body}`
  }

  return (
    <section id="contact">
      <div className="container mx-auto md:py-24 py-16">
        <h1 className="font-bold xl:text-7xl md:text-6xl text-5xl xl:leading-tight md:leading-tight sm:leading-tight leading-tight md:mb-12 mb-10">
          Get In Touch 📬
        </h1>
        <p className="md:text-xl text-base text-white md:leading-relaxed leading-relaxed md:mb-16 mb-8">
          Feel free to reach out for collaborations or just a friendly chat — send an{' '}
          <a href="mailto:faizaanoffice@gmail.com" className={inlineLink}>e-mail</a> or use the form below.
        </p>
        <div className="flex flex-wrap -mx-5">
          <div className="lg:w-7/12 w-full px-5 mb-10">
            <form onSubmit={handleSubmit} className="border-2 border-white p-8 md:p-12">
              <input
                type="text"
                name="name"
                required
                placeholder="Your Name"
                className="w-full bg-white/5 border-2 border-white/20 px-4 py-3 text-white mb-5 focus:outline-none focus:border-primary"
              />
              <input
                type="email"
                name="email"
                required
                placeholder="example@gmail.com"
                className="w-full bg-white/5 border-2 border-white/20 px-4 py-3 text-white mb-5 focus:outline-none focus:border-primary"
              />
              <textarea
                name="message"
                required
                rows="5"
                placeholder="Your Message..."
                className="w-full bg-white/5 border-2 border-white/20 px-4 py-3 text-white mb-6 focus:outline-none focus:border-primary"
              ></textarea>
              <button
                type="submit"
                className="group inline-block md:text-lg text-base border-2 border-white px-8 py-3 hover:border-primary"
              >
                <span className="relative after:content-[''] after:absolute after:block after:w-0 after:border-t-2 after:border-white after:top-1/2 after:left-0 after:-translate-y-1/2 after:transition-all after:duration-300 after:ease-out group-hover:after:w-full">
                  Send Message
                </span>
              </button>
            </form>
          </div>
          <div className="lg:w-5/12 w-full px-5">
            <div className="border-2 border-white p-8 md:p-12 h-full">
              <p className="inline-block text-base relative pb-1 mb-8 after:content-[''] after:block after:absolute after:bottom-0 after:left-0 after:w-full after:border-b-[1.5px] after:border-white">
                Find me online
              </p>
              <div className="flex gap-6">
                {social.map((s) => (
                  <a
                    key={s.name}
                    href={s.href}
                    target="_blank"
                    rel="noreferrer"
                    aria-label={s.name}
                    className="border-2 border-white p-4 hover:border-primary hover:text-primary transition-colors duration-300"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="24"
                      height="24"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <path d={s.path} />
                    </svg>
                  </a>
                ))}
              </div>
              <p className="text-slate-400 text-base mt-8 leading-relaxed">
                Prefer email? Write to{' '}
                <a href="mailto:faizaanoffice@gmail.com" className={inlineLink}>faizaanoffice@gmail.com</a>
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
```

- [ ] **Step 2: Render after `<Languages />` in App.**

- [ ] **Step 3: Verify in browser (Review Focus #3)**

- Fill form with: name `Test User`, email `test@example.com`, message `Hello with spaces` (multi-line if possible), submit.
- Expected: DevTools console shows an attempt to launch `mailto:faizaanoffice@gmail.com?subject=Portfolio%20contact%20from%20Test%20User&body=Hello%20with%20spaces...` (spaces encoded `%20`, newline `%0A`; Windows may open a mail client or show a "no app" dialog — either proves the encoding).
- Required-field validation blocks empty submit (browser tooltip).
- Navbar "Contact" click scrolls to this section; social links open correct profiles.

- [ ] **Step 4: Build + Commit**

Run: `npm run build` → exit 0.
```bash
git add src/components/sections/Contact.jsx src/App.jsx
git commit -m "feat: add contact section with mailto form and social links"
```

---

### Task 11: Footer

**Files:**
- Create: `src/components/sections/Footer.jsx`
- Modify: `src/App.jsx`

**Interfaces:**
- Produces: `<Footer />` rendered after `</main>` (sibling of ProjectModal).

- [ ] **Step 1: Write `src/components/sections/Footer.jsx`**

```jsx
export default function Footer() {
  return (
    <footer id="footer">
      <div className="container py-10">
        <div className="flex items-center">
          <p className="md:text-sm text-xs uppercase md:whitespace-nowrap">
            Copyright © 2026 Design & Code By &#8226;{' '}
            <a
              href="https://github.com/abdulfaizaan"
              target="_blank"
              rel="noreferrer"
              className="relative text-primary after:content-[''] after:absolute after:left-0 after:top-1/2 after:-translate-y-1/2 after:block after:w-0 after:border-t-[1.5px] after:border-white after:transition-all after:duration-300 after:ease-out hover:after:w-full"
            >
              Abdul Faizaan
            </a>
          </p>
          <hr className="md:block hidden border-white w-full mx-6" />
        </div>
      </div>
    </footer>
  )
}
```

- [ ] **Step 2: Render in App** — `<Footer />` after the `</main>` closing tag (after `<ProjectModal />`).

- [ ] **Step 3: Verify in browser**

Expected: copyright bar matches reference layout (uppercase text + horizontal rule extending right); link sweeps underline on hover.

- [ ] **Step 4: Build + Commit**

Run: `npm run build` → exit 0.
```bash
git add src/components/sections/Footer.jsx src/App.jsx
git commit -m "add: footer copyright bar"
```

---

### Task 12: Final side-by-side verification and fixes

**Files:**
- Modify: any file with visual diffs found

**Interfaces:**
- Consumes: all tasks 1–11.

- [ ] **Step 1: Full build + purge sanity**

Run: `npm run build`
Expected: exit 0. Then:
```powershell
Select-String -Path dist/assets/*.css -Pattern '-left-full','after\:h-full','vertical-move','bg-radial-blur','hover\:bg-primary' | Measure-Object | Select-Object Count
```
Expected: Count ≥ 5 (all present — Review Focus #5).

- [ ] **Step 2: Side-by-side desktop comparison**

Open `http://localhost:5173` and `https://portfolio-v1-html.netlify.app/` in separate tabs at 1440×900. Screenshot both, section by section (hero, about, work, footer). Expected: layout, spacing, colors, typography match; differences limited to intentional content swaps (name, avatar, real text, extra sections after Work). Fix any unintentional diff (wrong breakpoint, missing hover, spacing), rebuild, re-screenshot.

- [ ] **Step 3: Side-by-side mobile comparison**

Repeat both tabs at 390×844. Expected: hero stacks image-first, braces hidden (<640px), cards full-width, modal side rail becomes top bar with close at right (`justify-end p-8`).

- [ ] **Step 4: Full interaction pass**

On the local site run through once: preloader cycle → nav scroll → hero hover → CV download → all 3 modals open/close (mouse + Escape) → skill/education/language hover states → contact form submit (encoded mailto) → footer. Expected: no console errors, everything functions.

- [ ] **Step 5: Reduced-motion check**

Run: `npm run build`, then with browser emulation of `prefers-reduced-motion: reduce` reload — Expected: shapes/badge do not animate (media query from Task 1 applies).

- [ ] **Step 6: Final commit**

```bash
git add -A
git commit -m "feat: complete portfolio replica — visual fixes from side-by-side review"
```
