/**
 * Single source of truth for WiseHealth NAP (Name / Address / Phone) data,
 * specialist profiles and structured-data identity.
 *
 * WHY THIS FILE EXISTS
 * --------------------
 * Local SEO ranking depends on NAP consistency: the name, address and phone
 * must be byte-identical across the website, Google Business Profile,
 * ZnanyLekarz and every other directory. Previously this data was duplicated
 * inline in index.tsx, kontakt.tsx, zespol.tsx and static/llms.txt, which had
 * already drifted. Import from here instead of retyping.
 */

export const CLINIC = {
  /** Display name used on the site, ZnanyLekarz and in copy. */
  name: 'WiseHealth',
  /**
   * The name on the Google Business Profile. Kept as schema `alternateName`
   * so Google reconciles the site with the GBP listing without renaming the
   * GBP (a rename can trigger re-verification).
   */
  alternateName: 'WiseHealth Gabinet Psychiatryczno-Psychologiczny',
  legalName: 'CEREDUO Sp. z o.o.',
  krs: '0001042565',
  url: 'https://wisehealth.pl',
  logo: 'https://wisehealth.pl/img/logo-icon.png',
  email: 'kontakt@wisehealth.pl',

  /**
   * Reception phone (owner-confirmed 2026-10-07). E.164 for schema + tel:
   * links, display form for humans. Online booking (MyDr) stays the PRIMARY
   * path — render the phone as a secondary option, never as the main CTA.
   * Change it here only; schema, /kontakt, footer, landings and the SEO
   * checks all derive from these two values.
   */
  telephone: '+48459160431',
  telephoneDisplay: '+48 459 160 431',

  address: {
    streetAddress: 'ul. Szlak 38/16',
    addressLocality: 'Kraków',
    postalCode: '31-153',
    addressRegion: 'małopolskie',
    addressCountry: 'PL',
  },

  /**
   * Building at ul. Szlak 38: OpenStreetMap geocode and the Google Business
   * Profile pin agree (50.071587, 19.938935). The previous value
   * (50.0694, 19.9385) was ~240 m south. Pinned here, verified in CI.
   */
  geo: {
    latitude: 50.07155,
    longitude: 19.93889,
  },

  openingHours: {
    days: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'] as const,
    opens: '09:00',
    closes: '20:00',
    /** Human form, owner-confirmed 2026-10-07 (reception answers the phone). */
    display: 'pn–pt 9:00–20:00',
  },

  /** Directions without a third-party embed (no Google iframe, no CSP hole). */
  mapsUrl:
    'https://www.google.com/maps/search/?api=1&query=WiseHealth%2C+ul.+Szlak+38%2F16%2C+31-153+Krak%C3%B3w',

  priceRange: '200–300 PLN',
  currency: 'PLN',
} as const;

export interface Specialist {
  /**
   * schema.org type. `Physician` only for licensed physicians (lek. med.);
   * psychologists/psychotherapists are `Person` — labelling them Physician
   * is a false medical claim in structured data.
   */
  schemaType: 'Physician' | 'Person';
  /** Full name as it appears on external directories — keep consistent. */
  name: string;
  /** Schema.org honorific/title prefix used in the rendered heading. */
  displayName: string;
  jobTitle: string;
  /** schema.org MedicalSpecialty-ish label, Polish. */
  specialty: string;
  image?: string;
  /**
   * Verified external profiles. These become schema.org `sameAs`, which is how
   * Google reconciles "the Marcin Pawlus on wisehealth.pl" with "the Marcin
   * Pawlus with 8 five-star reviews on ZnanyLekarz". Only ever list URLs that
   * have been opened and confirmed to be this person.
   */
  sameAs: string[];
}

export const SPECIALISTS: Specialist[] = [
  {
    name: 'Agnieszka Krawczyk',
    schemaType: 'Physician',
    displayName: 'lek. med. Agnieszka Krawczyk',
    jobTitle: 'Współzałożycielka, lekarz, specjalista psychiatra',
    specialty: 'Psychiatria',
    image: 'https://wisehealth.pl/img/agnieszka-krawczyk.jpg',
    sameAs: [
      'https://www.znanylekarz.pl/agnieszka-aleksandra-krawczyk/psychiatra-psychoterapeuta/zabierzow',
    ],
  },
  {
    name: 'Marcin Pawlus',
    schemaType: 'Person',
    displayName: 'mgr Marcin Pawlus',
    jobTitle: 'Współzałożyciel, psycholog, psychoterapeuta',
    specialty: 'Psychologia i psychoterapia',
    image: 'https://wisehealth.pl/img/marcin_pawlus_img.jpg',
    sameAs: ['https://www.znanylekarz.pl/marcin-pawlus/psycholog/krakow'],
  },
];

/** Services offered, used for schema.org `hasOfferCatalog` and landing pages. */
export const SERVICES = [
  {
    name: 'Pierwsza wizyta psychiatryczna',
    description:
      'Konsultacja diagnostyczna: omówienie trudności, historii leczenia i sytuacji życiowej oraz ustalenie planu dalszych kroków.',
    durationMinutes: 45,
    price: 250,
  },
  {
    name: 'Wizyta psychiatryczna',
    description:
      'Konsultacja z lekarzem psychiatrą, prowadzenie i modyfikacja farmakoterapii.',
    durationMinutes: 50,
    price: 300,
  },
  {
    name: 'Krótka konsultacja psychiatryczna',
    description:
      'Wizyta kontrolna: omówienie kuracji, ocena skuteczności leczenia, przedłużenie recepty.',
    durationMinutes: 15,
    price: 200,
  },
  {
    name: 'Wizyta psychologiczna',
    description: 'Konsultacja psychologiczna lub sesja psychoterapii indywidualnej.',
    durationMinutes: 50,
    price: 200,
  },
] as const;

const postalAddress = {
  '@type': 'PostalAddress',
  streetAddress: CLINIC.address.streetAddress,
  addressLocality: CLINIC.address.addressLocality,
  postalCode: CLINIC.address.postalCode,
  addressRegion: CLINIC.address.addressRegion,
  addressCountry: CLINIC.address.addressCountry,
};

/**
 * The canonical LocalBusiness/MedicalClinic node for the whole site.
 *
 * Every page references this same `@id` so Google builds ONE entity for the
 * clinic rather than a separate weakly-linked entity per page.
 */
export function buildLocalBusinessSchema(): Record<string, unknown> {
  const schema: Record<string, unknown> = {
    '@context': 'https://schema.org',
    '@type': ['MedicalClinic', 'LocalBusiness'],
    '@id': `${CLINIC.url}/#clinic`,
    name: CLINIC.name,
    alternateName: CLINIC.alternateName,
    legalName: CLINIC.legalName,
    telephone: CLINIC.telephone,
    hasMap: CLINIC.mapsUrl,
    url: CLINIC.url,
    image: CLINIC.logo,
    logo: CLINIC.logo,
    email: CLINIC.email,
    description:
      'WiseHealth – prywatna poradnia zdrowia psychicznego w Krakowie. Konsultacje psychiatryczne, psychologiczne i psychoterapia, stacjonarnie i online.',
    medicalSpecialty: ['Psychiatric', 'Psychiatry'],
    address: postalAddress,
    geo: {
      '@type': 'GeoCoordinates',
      latitude: CLINIC.geo.latitude,
      longitude: CLINIC.geo.longitude,
    },
    openingHoursSpecification: {
      '@type': 'OpeningHoursSpecification',
      dayOfWeek: [...CLINIC.openingHours.days],
      opens: CLINIC.openingHours.opens,
      closes: CLINIC.openingHours.closes,
    },
    priceRange: CLINIC.priceRange,
    currenciesAccepted: CLINIC.currency,
    // Serves the whole country because teleporady are offered nationwide,
    // while the physical gabinet anchors the local pack in Kraków.
    areaServed: [
      { '@type': 'City', name: 'Kraków' },
      { '@type': 'Country', name: 'Polska' },
    ],
    availableService: SERVICES.map((s) => ({
      '@type': 'MedicalTherapy',
      name: s.name,
      description: s.description,
    })),
    employee: SPECIALISTS.map((s) => ({
      '@type': s.schemaType,
      name: s.displayName,
      jobTitle: s.jobTitle,
      sameAs: s.sameAs,
    })),
  };

  return schema;
}

/** Breadcrumb trail helper. Improves SERP presentation on every subpage. */
export function buildBreadcrumbSchema(
  trail: { name: string; path?: string }[],
): Record<string, unknown> {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: trail.map((item, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: item.name,
      ...(item.path ? { item: `${CLINIC.url}${item.path}` } : {}),
    })),
  };
}

/** FAQPage schema — drives the expandable FAQ rich result in Google. */
export function buildFaqSchema(
  faqs: { question: string; answer: string }[],
): Record<string, unknown> {
  return {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: faqs.map((faq) => ({
      '@type': 'Question',
      name: faq.question,
      acceptedAnswer: { '@type': 'Answer', text: faq.answer },
    })),
  };
}
