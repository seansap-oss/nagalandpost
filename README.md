# Sangai Express v1.3.0

Client presentation React/Vite website, preserving v1.2.0 editorial content, with social-sharing and a private analytics viewer.

## Windows VS Code

```powershell
cd D:\Nagalandpost\nagaland-post-v1.3.0
npm install
npm run dev
# Separate terminal: npm run build
```

## GitHub / Vercel

Vercel project should be configured with framework **Vite**, build `npm run build`, output `dist`, root `/` and auto-deploy from `main`. Do not upload `node_modules` or `dist`.

## Private analytics — REQUIRED deployment setup

1. Create an Upstash Redis database that supports REST commands (e.g., Upstash Console / Vercel Marketplace Upstash).
2. In **Vercel project → Settings → Environment Variables**, configure `UPSTASH_REDIS_REST_URL`, `UPSTASH_REDIS_REST_TOKEN`, `ANALYTICS_SALT` (a unique random string), and `ADMIN_PASSWORD` (your private password). For initial testing, use your chosen admin password, but rotate it before sharing with customers.
3. Redeploy after adding variables.
4. On the published website, press and hold the footer **©** for **5 seconds** (desktop or touch); enter the `ADMIN_PASSWORD`. Analytics appear within a private overlay. No password is hard-coded in the React bundle.
5. In local `npm run dev` mode, the Vite dev server does not run `/api` serverless routes; analytics require a Vercel deployment or `vercel dev` with environment credentials. If credentials are missing, analytics returns an explicit configuration error. Tracking begins after setup, not retroactively.

Tracked: page/article visits, anonymized visitor ID, approximate country/region/city based on Vercel geolocation headers, time on visible page (approximate), PDF open/download actions, and share-button clicks. Individual raw visitor IP addresses are not stored. Records are capped at 20,000 events; admin totals are over that rolling retention window, not all-time. Because analytics uses browser local storage and client events, ad blockers, private browsing, and disabled JS may reduce counts. Consent/notice should be reviewed before real-client production use. User authentication to news website is not implemented.

## Social sharing and publishing

Article pages include Facebook and X share links, Instagram copy-link guidance, copy-link, and print. Header social links currently point to each platform's generic homepage: replace `socialLinks` in `src/main.jsx` with official publisher accounts before launch. Instagram does not have a normal browser article URL-share endpoint. Editorial publishing drawer is a UI and manual workflow. **Automatic posting is NOT implemented**; requires Meta app review, Facebook Page and Instagram professional account connections, permissions and secure OAuth token storage, plus a separately configured X API integration. Never put platform access tokens in Vite public variables.

## Editorial disclaimer

Current written articles, translated text and PDF are illustrative presentation material; not confirmed as live news. Review content and Nagamese translations with client before publicizing as official reporting.
