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
    *   Baner Cookies (zgodny z polskim prawem telekomunikacyjnym).
    *   Polityka Prywatności i RODO.
*   **SEO & AI**:
    *   `sitemap.xml` & `robots.txt`
    *   `llms.txt` dla crawlerów AI (ChatGPT, Claude).
    *   Mikrodane Schema.org (`MedicalBusiness`).
*   **Integracje**:
    *   Przycisk rezerwacji wizyt (MyDr).
    *   Mapy Google (iframe).

## 🛠️ Instalacja i Uruchomienie

Wymagany Node.js >= 18.0.

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

## 📂 Struktura Projektu

*   `/blog` - Artykuły blogowe (Markdown).
*   `/src/pages` - Główne podstrony (React Components).
*   `/src/css` - Style globalne.
*   `/static` - Pliki statyczne (obrazy, llms.txt, robots.txt).
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
© 2025 WiseHealth - Cereduo Sp. z o.o.
