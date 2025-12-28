You are an expert full-stack developer and DevOps engineer. Your task is to create a new production-ready website for WiseHealth (psychology/psychiatry clinic in Kraków, Poland) using **Docusaurus** and deploy it to **Netlify** with best practices.

Use current Docusaurus and Netlify documentation and recommended patterns. :contentReference[oaicite:1]{index=1}

========================
HIGH-LEVEL GOAL
========================

Build a small, fast, accessible marketing site for WiseHealth that:

1. Replaces an old WordPress site completely (domain: `wisehealth.pl`).
2. Is built with **Docusaurus “classic” template** as a static site. :contentReference[oaicite:2]{index=2}  
3. Is deployed to **Netlify** with CI/CD from GitHub.
4. Has a **single, obvious CTA**: “Umów wizytę online”, wired to **MyDr** (external EDM / booking).
5. Uses a simple “docs-as-code” model: content in Markdown/MDX in the repo.
6. Keeps everything cheap or free: Docusaurus + Netlify free tier.

Assume the user is a proficient developer who can provide:
- MyDr clinic booking URL or API keys later.
- Netlify + GitHub accounts.
- DNS access for `wisehealth.pl`.

========================
TECH STACK & CONSTRAINTS
========================

- Static site generator: **Docusaurus 3 (current stable)**, classic template. :contentReference[oaicite:3]{index=3}  
- Language: **Polish** (design content and UI in PL, keep code ready for future i18n).
- Hosting: **Netlify** (continuous deployment from GitHub). :contentReference[oaicite:4]{index=4}  
- Node: use a recent LTS compatible with Docusaurus (e.g. Node 18+). :contentReference[oaicite:5]{index=5}  
- Styling: Docusaurus theme with **light customization only** (colors, fonts, spacing); keep it minimal and clean, medical/clinic-style.
- Forms / data: no own backend; use MyDr as system of record via link or API.

========================
SITE STRUCTURE & IA
========================

Create a Docusaurus site with the following top-level navigation (header navbar):

1. **Strona główna** (`/`)
2. **Oferta** (`/oferta`)
3. **Zespół** (`/zespol`)
4. **Cennik** (`/cennik`)
5. **FAQ** (`/faq`)
6. **Kontakt** (`/kontakt`)
7. Primary button in navbar: **“Umów wizytę”** (opens MyDr booking).

Use **pages**, not docs sidebar, for these marketing pages (via `@docusaurus/plugin-content-pages`). :contentReference[oaicite:6]{index=6}  

Structure pages roughly as:

- `/` (Home)
  - Hero: nagłówek, krótki opis, główny CTA “Umów wizytę online”.
  - Sekcja “W czym pomagamy” – 3–4 kart usługi (np. psychiatra, psychoterapia indywidualna, terapia par, konsultacja online).
  - Sekcja “Dlaczego WiseHealth” – 3–4 bulletów (bezpieczeństwo, doświadczenie, komfort, szybkie terminy).
  - Mini sekcja “Jak to działa?” – 3 kroki: wybierz specjalistę → wybierz termin → potwierdź dane.
  - CTA na dole: “Umów wizytę” (drugi raz).

- `/oferta`
  - Dokładniejszy opis usług.
  - Dla każdej usługi: nazwa, krótki opis, dla kogo, czas trwania, czy online/stacjonarnie.
  - Na końcu sekcji – CTA do MyDr.

- `/zespol`
  - Kafelki lekarzy / terapeutów: imię i nazwisko, tytuł, specjalizacja, krótkie bio, info o przyjeciu online/stacjonarnie.
  - Możliwość rozszerzenia o osobne podstrony lekarzy w przyszłości (zostaw strukturę komponentów pod to).

- `/cennik`
  - Tabela usług (kolumny: Usługa, Czas, Cena orientacyjna, Uwagi).
  - Widoczny disclaimer: “Cennik orientacyjny, aktualne ceny potwierdzane przy rejestracji”.

- `/faq`
  - Typowe pytania: pierwsza wizyta, recepty, zwolnienia, terminy, odwołania, teleporada vs. wizyta stacjonarna.

- `/kontakt`
  - Dane adresowe (Kraków), godziny przyjęć (jeśli dostępne), formularz kontaktowy *bez* backendu (na razie tylko mailto link) i widoczny przycisk “Umów wizytę online”.
  - Wklej mapę (np. iframe Google Maps) jeśli dostępny adres, lub placeholder komponent z miejscem na mapę.

- Dodatkowo statyczne strony:
  - `/polityka-prywatnosci`
  - `/regulamin` (jeśli potrzebne)
  - `/rodo` (informacja dla pacjentów)

Użyj MDX dla części stron, żeby łatwo mieszać tekst + React komponenty (np. MyDr CTA).

========================
MYDR INTEGRATION (PHASE 1)
========================

Goal: simple, robust **“book now”** flow that delegates booking to MyDr.

1. Study available MyDr integration options:
   - Public info: MyDr EDM + external API for checking free slots, creating visits, etc. :contentReference[oaicite:7]{index=7}  
   - Assume that for now, the clinic will provide:
     - Either a **direct booking URL** (e.g. clinic link on MyDr),
     - Or a small **widget snippet** (script / iframe).

2. Implement a reusable React component `MyDrBookingButton` in `src/components/MyDrBookingButton.tsx` that:
   - Reads a `MYDR_BOOKING_URL` from environment (e.g. `process.env.MYDR_BOOKING_URL` via Netlify env vars).
   - Renders a styled button (primary clinic color).
   - On click:
     - If `MYDR_BOOKING_URL` is defined: `window.open(MYDR_BOOKING_URL, '_blank', 'noopener')`.
     - Otherwise: shows a friendly console warning and falls back to `https://mydr.pl/welcome/` until configured. :contentReference[oaicite:8]{index=8}  

3. Use `MyDrBookingButton`:
   - In the hero on `/`.
   - In navbar as a CTA (custom item).
   - At the bottom of `/oferta`, `/cennik`, `/kontakt`.

4. Prepare for future **API-based integration**:
   - Create a placeholder service module, e.g. `src/services/mydrApi.ts`, with typed functions:
     - `getAvailableSlots(params)` – calls MyDr API to fetch free terms.
     - `createVisit(payload)` – creates a visit.
   - For now, stub these with mock implementations and TODO comments referencing MyDr external API docs. :contentReference[oaicite:9]{index=9}  
   - Do NOT commit real keys; assume keys will be provided as Netlify environment variables (`MYDR_API_KEY`, `MYDR_API_BASE_URL`, etc.).

========================
DOCUSAURUS SETUP & CONFIG
========================

1. **Project scaffold**

   - Initialize the project using the latest Docusaurus classic template:

     - `npx create-docusaurus@latest wisehealth-website classic` :contentReference[oaicite:10]{index=10}  

   - Use **TypeScript** support (enable in Docusaurus according to docs, or set up manually).
   - Add ESLint + Prettier with a basic config.

2. **Configuration**

   In `docusaurus.config.(ts|js)`:

   - Set site metadata:
     - `title: 'WiseHealth – psychiatria i psychologia, Kraków'`
     - `tagline: 'Psychiatra i psycholog w Krakowie – umów wizytę online'`
   - Configure production URL and base URL for Netlify:
     - `url: 'https://wisehealth.pl'` (later confirm exact Netlify domain / custom domain).
     - `baseUrl: '/'`. :contentReference[oaicite:11]{index=11}  
   - Navbar:
     - Items: { to: '/', label: 'Strona główna' }, `/oferta`, `/zespol`, `/cennik`, `/faq`, `/kontakt`.
     - Right side: `MyDrBookingButton` as a custom navbar item (link/button).
   - Footer:
     - Include contact info, emergency disclaimer (“W sytuacji zagrożenia życia dzwoń na 112 / 999”), social links if available.

   Ensure the `@docusaurus/plugin-content-pages` plugin is enabled (it is by default in classic template). :contentReference[oaicite:12]{index=12}  

3. **Pages**

   - Create React/MDX pages under `src/pages/` for `/`, `/oferta`, `/zespol`, `/cennik`, `/faq`, `/kontakt`, `/polityka-prywatnosci`, `/rodo`.
   - Use semantic HTML (section, header, main, footer).
   - Make sure content is easy to edit in Markdown/MDX.

4. **Styling**

   - Customize theme via:
     - `src/css/custom.css` for global adjustments.
     - Use CSS variables where possible (primary color, accent color).
   - Keep typography large, spacious, and accessible.
   - Test dark mode and ensure it still looks acceptable, or disable dark mode if not desired.

========================
NETLIFY DEPLOYMENT
========================

Goal: CI/CD from GitHub to Netlify.

1. **Repository setup**

   - Initialize Git repo in the project.
   - Use a clean main branch, add `.gitignore` (Node, build artifacts).

2. **Netlify configuration**

   - Follow Netlify docs for linking a Git repo:  
     - In Netlify UI: **Add new site → Import an existing project → GitHub → select repo**. :contentReference[oaicite:13]{index=13}  
   - Build settings:
     - Build command: `npm run build` (or `yarn build` depending on chosen package manager).
     - Publish directory: `build` (Docusaurus build output). :contentReference[oaicite:14]{index=14}  
   - Environment variables in Netlify:
     - `NODE_VERSION` (e.g. `18`).
     - `MYDR_BOOKING_URL` (to be filled in later by the user).
     - OPTIONAL (for future API integration): `MYDR_API_KEY`, `MYDR_API_BASE_URL`.

   Refer to Netlify docs for build configuration and env vars best practices. :contentReference[oaicite:15]{index=15}  

3. **Custom domain**

   - Once the site builds successfully on the Netlify default URL:
     - Add custom domain `wisehealth.pl` in Netlify.
     - Configure DNS (CNAME / A records) at the registrar to point to Netlify, as per their docs. :contentReference[oaicite:16]{index=16}  
   - Ensure `url` in `docusaurus.config` matches the production domain.

4. **Redirect from old WordPress**

   - Old site is currently WordPress-based.
   - Plan:
     - Option A: change DNS of `wisehealth.pl` directly to Netlify and decommission old hosting.
     - Option B (optional): move old WordPress to `old.wisehealth.pl` temporarily and set 301 redirects to new pages via the old hosting’s .htaccess / plugin.
   - At minimum, ensure:
     - `/` -> new homepage,
     - `/kontakt` and `/cennik` exist to satisfy existing links.

========================
BEST PRACTICES & QA
========================

1. **Performance & accessibility**
   - Use Lighthouse or similar to verify:
     - Performance >= 90,
     - Accessibility >= 90.
   - Images: compress, set width/height, use modern formats where possible.

2. **SEO**
   - Add meta title and description per page (via front matter or `<Head>` usage in Docusaurus). :contentReference[oaicite:17]{index=17}  
   - Human-readable URLs (`/oferta`, not `/offer-123`).
   - Open Graph tags for main pages (social share card).

3. **Content editing UX**
   - Organize content in a clear way:
     - `content/oferta/*.mdx`
     - `content/zespol/*.mdx`
   - Create minimal README explaining how to:
     - Run site locally (`npm run start`).
     - Edit text for main pages.
     - Update `MYDR_BOOKING_URL` in Netlify.

4. **Testing booking flow**
   - In staging (Netlify preview URL), test:
     - All “Umów wizytę” buttons open the correct MyDr page or widget.
     - On mobile, the tap target is large enough and visible.
   - Add a small text near the CTA:  
     “Rejestracja i wizyty obsługiwane są przez system MyDr (bezpieczny system EDM).”

========================
OUTPUT EXPECTATIONS
========================

At the end, produce:

1. A ready-to-run Docusaurus project with:
   - All pages and layout as described.
   - Working `MyDrBookingButton` component using env variable.
   - Proper Docusaurus config with navbar/footer, SEO basics.

2. Netlify-ready setup:
   - Build command and publish directory verified in `netlify.toml` (optional but recommended).
   - Short instructions (in English or Polish) in `README.md` describing:
     - Local development.
     - Deployment via Netlify.
     - Env vars (`MYDR_BOOKING_URL` etc.).
     - How to add/edit pages.

3. A short list of TODOs for the human owner:
   - Provide final MyDr booking URL and update Netlify env.
   - Provide final clinic logo and colors, if different from current placeholders.
   - Connect domain `wisehealth.pl` in Netlify and update DNS.
   - Write/verify final Polish copy for each page (placeholder text can be generic but realistic).

Act autonomously and implement everything end-to-end according to these instructions.
