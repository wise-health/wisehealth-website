// DRAFT: Example Docusaurus config snippet for WiseHealth.
// Copy relevant parts into your real docusaurus.config.ts and adjust as needed.

import type {Config} from '@docusaurus/types';

const config: Config = {
  title: 'WiseHealth – psychiatria i psychologia w Krakowie',
  tagline: 'Psychiatra i psycholog w Krakowie – umów wizytę online',
  url: 'https://wisehealth.pl',
  baseUrl: '/',
  favicon: 'img/favicon.ico',
  organizationName: 'wisehealth', // GitHub org/user, to change
  projectName: 'wisehealth-website',

  i18n: {
    defaultLocale: 'pl',
    locales: ['pl'],
  },

  presets: [
    [
      'classic',
      ({
        docs: false,
        blog: false,
        pages: {},
        theme: {
          customCss: require.resolve('./src/css/custom.css'),
        },
      }) as any,
    ],
  ],

  themeConfig: {
    navbar: {
      title: 'WiseHealth',
      items: [
        {to: '/', label: 'Strona główna', position: 'left'},
        {to: '/oferta', label: 'Oferta', position: 'left'},
        {to: '/zespol', label: 'Zespół', position: 'left'},
        {to: '/cennik', label: 'Cennik', position: 'left'},
        {to: '/faq', label: 'FAQ', position: 'left'},
        {to: '/kontakt', label: 'Kontakt', position: 'left'},
        {
          type: 'custom-cta',
          position: 'right',
          'aria-label': 'Umów wizytę',
        },
      ],
    },
    footer: {
      style: 'dark',
      copyright: `© ${new Date().getFullYear()} WiseHealth. Wszelkie prawa zastrzeżone.`,
    },
  },
};

export default config;
