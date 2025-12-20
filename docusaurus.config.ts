import {themes as prismThemes} from 'prism-react-renderer';
import type {Config} from '@docusaurus/types';
import type * as Preset from '@docusaurus/preset-classic';

// This runs in Node.js - Don't use client-side code here (browser APIs, JSX...)

const config: Config = {
  title: 'WiseHealth – psychiatria i psychologia, Kraków',
  tagline: 'Psychiatra i psycholog w Krakowie – umów wizytę online',
  favicon: 'img/logo-icon.png',

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
        docs: false, // Disable docs, we're using pages only
        blog: false, // Disable blog
        pages: {
          // Enable pages plugin
        },
        theme: {
          customCss: './src/css/custom.css',
        },
      } satisfies Preset.Options,
    ],
  ],

  themeConfig: {
    // Replace with your project's social card
    image: 'img/docusaurus-social-card.jpg',
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
        {to: '/oferta', label: 'Oferta', position: 'left'},
        {to: '/zespol', label: 'Zespół', position: 'left'},
        {to: '/cennik', label: 'Cennik', position: 'left'},
        {to: '/faq', label: 'FAQ', position: 'left'},
        {to: '/kontakt', label: 'Kontakt', position: 'left'},
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
