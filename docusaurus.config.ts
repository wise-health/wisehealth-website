import { themes as prismThemes } from 'prism-react-renderer';
import type { Config } from '@docusaurus/types';
import {CLINIC} from './src/data/clinic';
import type * as Preset from '@docusaurus/preset-classic';

// This runs in Node.js - Don't use client-side code here (browser APIs, JSX...)

const config: Config = {
  /**
   * Brand-only site title.
   *
   * Docusaurus appends ` | <title>` to every page's title, so this string is
   * charged against Google's ~60-65 character SERP cutoff on EVERY page. It
   * previously read 'WiseHealth – psychiatria i psychologia, Kraków' (47
   * chars), which truncated the meaningful, keyword-bearing part of every
   * title. Keep it short; per-page titles carry the keywords.
   */
  title: 'WiseHealth',
  tagline: 'Psychiatra i psycholog w Krakowie – umów wizytę online',
  favicon: 'img/logo-icon.png',

  /**
   * Separator between page title and site title.
   * `scripts/verify-seo.py` enforces the resulting length budget against the
   * built HTML, so a regression here fails the build check rather than
   * silently costing click-through rate.
   */
  titleDelimiter: '|',

  // Future flags, see https://docusaurus.io/docs/api/docusaurus-config#future
  future: {
    v4: true, // Improve compatibility with the upcoming Docusaurus v4
  },

  // Set the production url of your site here
  url: 'https://wisehealth.pl',
  // Set the /<baseUrl>/ pathname under which your site is served
  // For GitHub pages deployment, it is often '/<projectName>/'
  baseUrl: '/',

  // GitHub pages deployment config.
  // If you aren't using GitHub pages, you don't need these.
  organizationName: 'wisehealth', // Usually your GitHub org/user name.
  projectName: 'wisehealth-website', // Usually your repo name.

  onBrokenLinks: 'throw',

  /**
   * Site-wide <head> tags.
   *
   * ANALYTICS CHOICE — deliberate. We use Plausible, not Google Analytics.
   * This is a mental-health clinic: pages like /leczenie-depresji-krakow reveal
   * extremely sensitive information about the visitor. Plausible is cookieless,
   * stores no personal data and no cross-site identifiers, so:
   *   1. no consent banner is legally required for it (RODO/GDPR), and
   *   2. we never build a profile of who read what about their own health.
   * GA4 would put that data in a third country and require explicit consent,
   * which most visitors decline — leaving us blind anyway.
   *
   * Both tags are opt-in via environment variables so the repo carries no
   * account identifiers and local builds stay clean. Set in Netlify UI:
   *   PLAUSIBLE_DOMAIN            e.g. wisehealth.pl
   *   GOOGLE_SITE_VERIFICATION    token from Google Search Console
   */
  headTags: [
    ...(process.env.PLAUSIBLE_DOMAIN
      ? [
          {
            tagName: 'script',
            attributes: {
              defer: 'true',
              'data-domain': process.env.PLAUSIBLE_DOMAIN,
              src: 'https://plausible.io/js/script.js',
            },
          },
        ]
      : []),
    ...(process.env.GOOGLE_SITE_VERIFICATION
      ? [
          {
            tagName: 'meta',
            attributes: {
              name: 'google-site-verification',
              content: process.env.GOOGLE_SITE_VERIFICATION,
            },
          },
        ]
      : []),
  ],

  // Custom fields for MyDr integration
  customFields: {
    // MyDr booking - patients will be directed to MyDr portal where they can find WiseHealth (facility_id: 26915)
    // Note: MyDr widget.js doesn't work (returns 302), using main portal instead
    mydrBookingUrl: process.env.MYDR_BOOKING_URL || 'https://mydr.pl/patient',
  },

  // Even if you don't use internationalization, you can use this field to set
  // useful metadata like html lang. For example, if your site is Chinese, you
  // may want to replace "en" with "zh-Hans".
  i18n: {
    defaultLocale: 'pl',
    locales: ['pl'],
  },

  presets: [
    [
      'classic',
      {
        docs: false,
        blog: {
          showReadingTime: true,
          blogSidebarTitle: 'Najnowsze wpisy',
          blogSidebarCount: 'ALL',
          blogTitle: 'Blog WiseHealth – o zdrowiu psychicznym bez żargonu',
          blogDescription:
            'Rzetelne, przystępne artykuły o psychiatrii, psychoterapii i zdrowiu psychicznym, pisane przez specjalistów WiseHealth.',
        },
        pages: {
          // Enable pages plugin
        },
        theme: {
          customCss: './src/css/custom.css',
        },
        sitemap: {
          changefreq: 'weekly',
          priority: 0.5,
          // Tag/author/archive listing pages are thin, near-duplicate content.
          // Excluding them concentrates crawl budget on pages that can rank
          // and keeps the sitemap an honest signal of what matters.
          ignorePatterns: [
            '/blog/tags/**',
            '/blog/authors/**',
            '/blog/archive',
            '/404',
          ],
          filename: 'sitemap.xml',
        },
      } satisfies Preset.Options,
    ],
  ],

  themeConfig: {
    // Replace with your project's social card
    image: 'img/wisehealth-social-card.jpg',
    colorMode: {
      defaultMode: 'light',
      disableSwitch: false,
      respectPrefersColorScheme: true,
    },
    navbar: {
      title: '',
      logo: {
        alt: 'WiseHealth - Twoja droga do lepszego samopoczucia',
        src: 'img/logo-no-background.png',
        srcDark: 'img/logo-no-background.png',
      },
      items: [
        { to: '/oferta', label: 'Oferta', position: 'left' },
        {
          type: 'dropdown',
          label: 'Pomoc',
          position: 'left',
          items: [
            { to: '/psychiatra-krakow', label: 'Psychiatra Kraków' },
            { to: '/psycholog-krakow', label: 'Psycholog i psychoterapia' },
            { to: '/psychiatra-online', label: 'Konsultacja online' },
            { to: '/leczenie-depresji-krakow', label: 'Leczenie depresji' },
          ],
        },
        { to: '/zespol', label: 'Zespół', position: 'left' },
        { to: '/cennik', label: 'Cennik', position: 'left' },
        { to: '/blog', label: 'Blog', position: 'left' },
        { to: '/faq', label: 'FAQ', position: 'left' },
        { to: '/kontakt', label: 'Kontakt', position: 'left' },
        {
          label: 'Umów wizytę',
          position: 'right',
          className: 'navbar-booking-button',
          to: '/kontakt#booking',
        },
      ],
    },
    footer: {
      style: 'dark',
      links: [
        {
          title: 'Strony',
          items: [
            {
              label: 'Strona główna',
              to: '/',
            },
            {
              label: 'Oferta',
              to: '/oferta',
            },
            {
              label: 'Zespół',
              to: '/zespol',
            },
            {
              label: 'Cennik',
              to: '/cennik',
            },
          ],
        },
        {
          title: 'Pomoc',
          items: [
            {
              label: 'Psychiatra Kraków',
              to: '/psychiatra-krakow',
            },
            {
              label: 'Psycholog Kraków',
              to: '/psycholog-krakow',
            },
            {
              label: 'Konsultacja online',
              to: '/psychiatra-online',
            },
            {
              label: 'Leczenie depresji',
              to: '/leczenie-depresji-krakow',
            },
            {
              label: 'FAQ',
              to: '/faq',
            },
            {
              label: 'Kontakt',
              to: '/kontakt',
            },
          ],
        },
        {
          title: 'Informacje prawne',
          items: [
            {
              label: 'Polityka prywatności',
              to: '/polityka-prywatnosci',
            },
            {
              label: 'RODO',
              to: '/rodo',
            },
          ],
        },
      ],
      copyright: `
        <div>
          WiseHealth · ${CLINIC.address.streetAddress}, ${CLINIC.address.postalCode} ${CLINIC.address.addressLocality}
          · Recepcja: <a href="tel:${CLINIC.telephone}" class="plausible-event-name=Phone+Click" style="color: inherit; white-space: nowrap;">${CLINIC.telephoneDisplay}</a>
          (${CLINIC.openingHours.display})
          <br />
          © ${new Date().getFullYear()} WiseHealth. Wszystkie prawa zastrzeżone.
          <br />
          <strong style="color: #ff6b6b;">W sytuacji zagrożenia życia dzwoń na 112 / 999</strong>
        </div>
      `,
    },
    prism: {
      theme: prismThemes.github,
      darkTheme: prismThemes.dracula,
    },
  } satisfies Preset.ThemeConfig,
};

export default config;
