# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

```bash
npm run dev      # Start dev server at localhost:3000
npm run build    # Production build
npm run lint     # ESLint (note: lint errors are ignored during builds per next.config.js)
```

No test suite is configured.

## Architecture

Next.js 13 (Pages Router) personal portfolio site styled with Tailwind CSS. No TypeScript — all files are `.js`/`.jsx`.

**Routing**: Each file in `pages/` maps to a route. Currently:

- `/` → `pages/index.js` — main portfolio (Header, Persona, Projects, Skills sections)
- `/VC` → `pages/VC.js` — work/experience page
- `/Volunteering` → `pages/Volunteering.js` — volunteer page

**Global wrapper**: `pages/_app.js` wraps every page in `components/Layout.js`, which injects `<Meta>` (SEO tags) and `<Nav>` around all page content.

**Component organization**: Components are grouped by page under `components/`:

- `components/mainPage/` — sections for the home page (Header, Persona, Projects, Skills)
  - `components/mainPage/helpers/` — `Widget.js` used by Projects
- `components/battery/` — work experience cards for the VC page
  - `components/battery/helper/` — `Card.js` used by Work
- `components/volunteer/` — volunteering content
  - `components/volunteer/helper/`

**Data**: Page content (project list, work history, skills) is defined as inline `const data = [...]` arrays at the bottom of each component file — there is no external CMS or data layer.

**Styling**: Tailwind utility classes are the primary styling approach. CSS Modules (`styles/*.module.css`) are used for the Layout wrapper only. Global styles in `styles/globals.css`.

**Images**: All images live in `public/` and are imported directly as static assets (not via `next/image`).

## Adding Content

To add a new project: append an object to the `data` array in `components/mainPage/Projects.js`.  
To add a work entry: append to the `data` array in `components/battery/Work.js`.  
Each entry follows the existing shape in those files (id, name, ref, descript, src, etc.).
