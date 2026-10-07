import React from 'react';
import Layout from '@theme/Layout';
import Heading from '@theme/Heading';
import MyDrBookingButton from '@site/src/components/MyDrBookingButton';
import ClinicPhone from '@site/src/components/ClinicPhone';
import JsonLd from '@site/src/components/JsonLd';
import {
  CLINIC,
  buildBreadcrumbSchema,
  buildLocalBusinessSchema,
  buildFaqSchema,
} from '@site/src/data/clinic';

export interface LandingSection {
  heading: string;
  /** Paragraphs of body copy. */
  body?: string[];
  /** Optional bullet list rendered after the paragraphs. */
  bullets?: string[];
}

export interface LandingPageProps {
  /** <title> — this is the primary ranking signal. Lead with the keyword. */
  metaTitle: string;
  metaDescription: string;
  /** Path of this page, e.g. '/psychiatra-krakow'. Used for breadcrumbs. */
  path: string;
  /** Breadcrumb label. */
  breadcrumbLabel: string;
  /** Visible <h1>. Should contain the target keyword naturally. */
  h1: string;
  /** Short lead paragraph under the h1. */
  lead: string;
  sections: LandingSection[];
  /**
   * Page-specific FAQs. Emitted as FAQPage structured data AND rendered, so
   * the page can win an expandable rich result for long-tail queries.
   */
  faqs?: { question: string; answer: string }[];
  /** CTA heading at the bottom of the page. */
  ctaHeading?: string;
  ctaBody?: string;
}

/**
 * Shared template for intent-targeted landing pages.
 *
 * Each landing page targets one commercial query ("psychiatra Kraków",
 * "psychiatra online") that the generic /oferta page cannot rank for, because
 * a page ranks for what it is *about*, and /oferta is about everything.
 *
 * Every instance references the same clinic `@id`, so these pages reinforce a
 * single Google entity instead of competing with each other.
 */
export default function LandingPage({
  metaTitle,
  metaDescription,
  path,
  breadcrumbLabel,
  h1,
  lead,
  sections,
  faqs,
  ctaHeading = 'Umów wizytę w WiseHealth',
  ctaBody = 'Wybierz specjalistę i termin w systemie rejestracji online. Bez skierowania, bez kolejek.',
}: LandingPageProps): React.ReactNode {
  const schema: Record<string, unknown>[] = [
    buildLocalBusinessSchema(),
    buildBreadcrumbSchema([
      { name: 'Strona główna', path: '/' },
      { name: breadcrumbLabel, path },
    ]),
  ];
  if (faqs?.length) {
    schema.push(buildFaqSchema(faqs));
  }

  return (
    <Layout title={metaTitle} description={metaDescription}>
      <JsonLd schema={schema} />
      <main className="container margin-vert--lg">
        <Heading as="h1">{h1}</Heading>
        <p className="margin-bottom--lg" style={{ fontSize: '1.15rem', lineHeight: 1.7 }}>
          {lead}
        </p>

        <div className="margin-bottom--xl">
          <MyDrBookingButton />
        </div>

        {sections.map((section) => (
          <section key={section.heading} className="margin-top--xl">
            <Heading as="h2">{section.heading}</Heading>
            {section.body?.map((paragraph, index) => (
              <p key={index} style={{ lineHeight: 1.7 }}>
                {paragraph}
              </p>
            ))}
            {section.bullets && (
              <ul style={{ lineHeight: 1.8 }}>
                {section.bullets.map((bullet) => (
                  <li key={bullet}>{bullet}</li>
                ))}
              </ul>
            )}
          </section>
        ))}

        {faqs?.length ? (
          <section className="margin-top--xl">
            <Heading as="h2">Najczęstsze pytania</Heading>
            {faqs.map((faq) => (
              <div key={faq.question} className="card margin-bottom--md">
                <div className="card__header">
                  <Heading as="h3">{faq.question}</Heading>
                </div>
                <div className="card__body">
                  <p>{faq.answer}</p>
                </div>
              </div>
            ))}
          </section>
        ) : null}

        <section className="margin-top--xl margin-bottom--xl">
          <div className="card" style={{ padding: '2rem' }}>
            <div className="card__body text--center">
              <Heading as="h2">{ctaHeading}</Heading>
              <p style={{ fontSize: '1.1rem', marginBottom: '1.5rem' }}>{ctaBody}</p>
              <MyDrBookingButton />
              <p style={{ fontSize: '0.9rem', marginTop: '1.5rem', opacity: 0.8 }}>
                Gabinet: {CLINIC.address.streetAddress}, {CLINIC.address.postalCode}{' '}
                {CLINIC.address.addressLocality} · Recepcja: <ClinicPhone /> · E-mail:{' '}
                <a href={`mailto:${CLINIC.email}`}>{CLINIC.email}</a>
              </p>
              <p style={{ fontSize: '0.9rem', color: '#ff6b6b', fontWeight: 'bold' }}>
                W sytuacji nagłego zagrożenia życia lub zdrowia zgłoś się na SOR lub zadzwoń pod
                numer 112.
              </p>
            </div>
          </div>
        </section>
      </main>
    </Layout>
  );
}
