import React from 'react';
import Layout from '@theme/Layout';
import Heading from '@theme/Heading';
import MyDrBookingButton from '@site/src/components/MyDrBookingButton';
import ClinicPhone from '@site/src/components/ClinicPhone';
import { CLINIC } from '@site/src/data/clinic';
import JsonLd from '@site/src/components/JsonLd';
import { FAQ_SECTIONS, FAQ_FLAT } from '@site/src/data/faq';
import { buildBreadcrumbSchema, buildFaqSchema } from '@site/src/data/clinic';

export default function FAQPage(): React.ReactNode {
  return (
    <Layout
      title="Pytania o wizytę u psychiatry i psychologa"
      description="Odpowiedzi na najczęstsze pytania: jak umówić wizytę, ile kosztuje konsultacja psychiatryczna, czy możliwa jest teleporada, e-recepta i refundacja NFZ.">
      <JsonLd
        schema={[
          buildFaqSchema(FAQ_FLAT),
          buildBreadcrumbSchema([
            { name: 'Strona główna', path: '/' },
            { name: 'FAQ', path: '/faq' },
          ]),
        ]}
      />
      <main className="container margin-vert--lg">
        <Heading as="h1">Najczęściej zadawane pytania</Heading>
        <p className="margin-bottom--lg">
          Zebraliśmy pytania, które najczęściej słyszymy przed pierwszą wizytą – o rejestrację,
          koszty, teleporady i sytuacje nagłe. Jeśli czegoś tu brakuje, napisz do nas.
        </p>

        {FAQ_SECTIONS.map((section) => (
          <section key={section.title} className="margin-top--xl">
            <Heading as="h2">{section.title}</Heading>

            {section.items.map((item) => (
              <div key={item.question} className="card margin-bottom--md">
                <div className="card__header">
                  <Heading as="h3">{item.question}</Heading>
                </div>
                <div className="card__body">
                  {item.answer ?? <p>{item.answerText}</p>}
                  {item.withBooking && <MyDrBookingButton className="margin-top--md" />}
                </div>
              </div>
            ))}
          </section>
        ))}

        <section className="margin-top--xl margin-bottom--xl">
          <div className="card wh-cta">
            <div className="card__body text--center">
              <Heading as="h2">Masz inne pytanie?</Heading>
              <p>
                Jeśli nie znalazłeś odpowiedzi na swoje pytanie, napisz do nas na{' '}
                <a href="mailto:kontakt@wisehealth.pl">kontakt@wisehealth.pl</a> (odpowiadamy zwykle
                w ciągu 24–48 godzin w dni robocze) lub zadzwoń do recepcji: <ClinicPhone />{' '}
                ({CLINIC.openingHours.display}).
              </p>
              <a href="/kontakt" className="button button--secondary button--lg margin-top--md">
                Przejdź do kontaktu
              </a>
            </div>
          </div>
        </section>
      </main>
    </Layout>
  );
}
