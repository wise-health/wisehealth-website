# WiseHealth Website

Strona internetowa kliniki psychoterapii i psychiatrii **WiseHealth** w Krakowie.
Projekt oparty na [Docusaurus 3](https://docusaurus.io/), stworzony z myślą o wydajności, SEO i łatwości zarządzania treścią.

![WiseHealth Logo](./static/img/logo-no-background.png)

## 🚀 Technologie

*   **Framework**: [Docusaurus](https://docusaurus.io/) (React + Static Site Generator)
*   **Język**: TypeScript / TSX
*   **Style**: CSS Modules / Infima (Docusaurus Default)
*   **Hosting**: Static (kompatybilny z Netlify, Vercel, GitHub Pages)

## 🌟 Kluczowe Funkcjonalności

*   **Strony Informacyjne**: Oferta, Zespół, Cennik, FAQ.
*   **Blog**: Sekcja edukacyjna z artykułami medycznymi (SEO optimized).
*   **Legal Compliance**:
    *   Komunikat informacyjny o cookies (strona nie używa cookies analitycznych ani reklamowych).
    *   Polityka Prywatności i RODO.
*   **SEO & AI**:
    *   `sitemap.xml` & `robots.txt`
    *   `llms.txt` dla crawlerów AI (ChatGPT, Claude).
    *   Mikrodane Schema.org (`MedicalClinic`, `Physician`/`Person`, `FAQPage`, `BreadcrumbList`) – dane kliniki z jednego źródła: `src/data/clinic.ts`.
*   **Integracje**:
    *   Przycisk rezerwacji wizyt (MyDr) + funkcja `/api/mydr-status` – gdy MyDr odrzuca token, pacjent widzi okno „zadzwoń do recepcji” zamiast pustego okna.
    *   Link „Wyznacz trasę” do Map Google (bez osadzonej mapy – brak cookies Google przed zgodą).
    *   Plausible Analytics (bez cookies), włączane zmienną `PLAUSIBLE_DOMAIN` w Netlify.

## 🛠️ Instalacja i Uruchomienie

Wymagany Node.js >= 20 (tak jak w Netlify i CI). `npm install` instaluje też hook pre-commit (skan sekretów – wymaga [gitleaks](https://github.com/gitleaks/gitleaks#installing)).

```bash
# Instalacja zależności
npm install

# Uruchomienie serwera deweloperskiego (dostępny pod http://localhost:3000)
npm start
```

## 📦 Budowanie Produkcyjne

```bash
# Budowanie statycznej wersji strony do folderu /build
npm run build

# Podgląd zbudowanej wersji lokalnie
npm run serve
```

## ✅ Testy, CI i wdrożenie

```bash
npm run typecheck               # TypeScript
npm run build && npm test       # build + 109 kontroli SEO/NAP (scripts/verify-seo.py) + testy funkcji MyDr
scripts/test-secret-guard.sh    # samotest strażnika sekretów (hook + CI)
```

*   **CI** (`.github/workflows/ci.yml`): skan sekretów całej historii + build + testy. Gałąź `master` jest chroniona – zmiany tylko przez PR z zielonym `ci-ok`.
*   **Wdrożenie**: Netlify buduje automatycznie każdy push do `master`.
*   **Po każdym wdrożeniu**: `python3 scripts/smoke-prod.py` – sprawdza produkcję (statusy HTTP, prawdziwe 404, telefon w danych strukturalnych, funkcja `/api/mydr-status`, CSP). Wynik `failed: 0` = wdrożenie poprawne.
*   **Sekrety**: nigdy w repozytorium – zob. [SECURITY.md](./SECURITY.md).

## 📂 Struktura Projektu

*   `/blog` - Artykuły blogowe (Markdown).
*   `/src/pages` - Główne podstrony (React Components).
*   `/src/css` - Style globalne.
*   `/static` - Pliki statyczne (obrazy, llms.txt, robots.txt).
*   `/src/data/clinic.ts` - Jedno źródło danych kliniki (nazwa, adres, telefon, godziny, specjaliści).
*   `/netlify/functions` - Funkcje serwerowe Netlify (`mydr-status`).
*   `/scripts` - Testy SEO, smoke test produkcji, strażnik sekretów.
*   `docusaurus.config.ts` - Główna konfiguracja strony.

## 📝 Zarządzanie Treścią

### Dodawanie wpisu na bloga
Utwórz nowy plik `.md` w folderze `blog` o nazwie `RRRR-MM-DD-tytul-wpisu.md`.
Wymagany format nagłówka (frontmatter):

```markdown
---
slug: tytul-wpisu
title: Tytuł Wpisu
authors: [wisehealth]
tags: [tag1, tag2]
date: 2025-01-01
image: /img/cover-image.png
---
```

### Edycja Zespołu
Edytuj plik `src/pages/zespol.tsx`. Dane członków zespołu są renderowane komponentem `TeamMemberCard`.

---
© 2026 WiseHealth - CEREDUO Sp. z o.o.
