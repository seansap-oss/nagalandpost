# Nagaland Post — Editorial Website Concept v1.2.0

Premium newspaper-style React/Vite presentation website, designed for client review and deployment on Vercel.

## Features
- v1.2.0: the homepage PDF front page now matches the actual downloadable PDF, article browser titles, Escape to close overlays, improved keyboard focus visibility

- v1.2.0: improved offline image fallback, article print button, share confirmation, localized lead label and story count, Vercel deployment configuration
- All 11 existing editorial categories, homepage news grid and filtering
- 14 clickable original editorial article write-ups with featured images
- English and Nagamese language toggle: headlines, story copy and interface switch together
- E-paper modal with embedded real PDF viewer, open and download actions
- Responsive desktop/tablet/phone layouts, search and category navigation
- App promotion and newsletter UI
- Client-side article URLs (`?story=ID`) which remain directly loadable on Vercel

## Windows / VS Code setup

```powershell
cd D:\
Expand-Archive -Path "$env:USERPROFILE\Downloads\nagaland-post-v1.2.0.zip" -DestinationPath "D:\" -Force
cd D:\nagaland-post-v1.2.0
npm install
npm run dev
```

Open http://localhost:5173

## GitHub and Vercel

```powershell
git init
git add .
git commit -m "Nagaland Post website concept v1.2.0"
git branch -M main
git remote add origin https://github.com/YOUR-USERNAME/YOUR-REPO.git
git push -u origin main
```

On Vercel choose **Add New → Project → Import Git Repository**. Framework should auto-detect Vite. Build command `npm run build`; output folder `dist`.

## Editorial, photography and deployment notes

This is **an independent client presentation concept, not the publisher's official website or live publication**. Story topics and dates were selected from the Nagaland Post site on 20 October 2026. All body copy is newly written editorial summary/feature-style copy; it does not reproduce full copyrighted news articles and should be replaced with licensed newsroom text before launch. Headlines are adaptation of public story themes. Illustrative photography is loaded from Unsplash CDN (external connection required); images are not claimed to be actual event photographs. Image subjects may not match the news events. Replace with licensed, properly credited editorial photography for publication. The PDF is a designed concept edition based on this presentation, **not an actual Nagaland Post print edition**. The Nagamese translations are draft Roman-script localization and must be checked by a fluent editor before publication, especially sensitive reporting. Newsletter shows an integration-required message rather than collecting addresses. Mobile apps and hybrid PDF article linking are future-phase ideas, not built or claimed operational.

## Handoff

Versions are tracked in package.json and visible in footer. Built-in route is plain browser history with query links, so Vercel static deploy works without additional routing config.

## Updating an existing VS Code folder
If you already extracted v1.0.0, back up any edits and extract this release into a fresh `D:\nagaland-post-v1.2.0` folder. Test it before replacing the GitHub branch.
