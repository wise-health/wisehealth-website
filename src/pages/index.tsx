import React from 'react';
import clsx from 'clsx';
import Link from '@docusaurus/Link';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';
import Layout from '@theme/Layout';
import Heading from '@theme/Heading';
import MyDrBookingButton from '@site/src/components/MyDrBookingButton';

import styles from './index.module.css';

function HomepageHeader() {
  const { siteConfig } = useDocusaurusContext();
  return (
    <header className={clsx('hero hero--primary', styles.heroBanner)}>
      <script type="application/ld+json">
        {JSON.stringify({
          "@context": "https://schema.org",
          "@type": "MedicalBusiness",
          "name": "WiseHealth",
          "image": "https://wisehealth.pl/img/logo-icon.png",
          "@id": "https://wisehealth.pl",
          "url": "https://wisehealth.pl",
          "telephone": "",
          "address": {
            "@type": "PostalAddress",
            "streetAddress": "ul. Szlak 38/16",
            "addressLocality": "Kraków",
            "postalCode": "31-153",
            "addressCountry": "PL"
          },
          "geo": {
            "@type": "GeoCoordinates",
            "latitude": 50.0694,
            "longitude": 19.9385
          },
          "openingHoursSpecification": {
            "@type": "OpeningHoursSpecification",
            "dayOfWeek": [
              "Monday",
              "Tuesday",
              "Wednesday",
              "Thursday",
              "Friday"
            ],
            "opens": "09:00",
            "closes": "20:00"
          },
          "priceRange": "$$"
        })}
      </script>

      <div className="container">
        <div className="row">
          <div className="col col--7">
            <Heading as="h1" className="hero__title">
              Twoja droga do lepszego samopoczucia zaczyna się tutaj
            </Heading>
            <p className="hero__subtitle">
              <strong>Profesjonalna opieka psychiatryczna i psychologiczna w Krakowie</strong> –
              bez długiego czekania, w atmosferze pełnej dyskrecji i zrozumienia.
            </p>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem', marginBottom: '1.5rem' }}>
              <div style={{
                background: 'linear-gradient(135deg, rgba(255,255,255,0.15) 0%, rgba(255,255,255,0.05) 100%)',
                padding: '1.25rem',
                borderRadius: '0.75rem',
                borderLeft: '4px solid var(--ifm-color-primary-lightest)',
                backdropFilter: 'blur(10px)'
              }}>
                <div style={{ display: 'flex', alignItems: 'flex-start', gap: '1rem' }}>
                  <div style={{ fontSize: '2rem', lineHeight: 1 }}>👨‍⚕️</div>
                  <div style={{ flex: 1 }}>
                    <h4 style={{ margin: 0, fontSize: '1.1rem', fontWeight: 700, lineHeight: 1.3 }}>Doświadczeni specjaliści</h4>
                    <p style={{ margin: '0.25rem 0 0 0', opacity: 0.9, fontSize: '0.95rem', lineHeight: 1.4 }}>Psychiatra i psycholog z wieloletnim doświadczeniem</p>
                  </div>
                </div>
              </div>
              <div style={{
                background: 'linear-gradient(135deg, rgba(255,255,255,0.15) 0%, rgba(255,255,255,0.05) 100%)',
                padding: '1.25rem',
                borderRadius: '0.75rem',
                borderLeft: '4px solid var(--ifm-color-primary-lightest)',
                backdropFilter: 'blur(10px)'
              }}>
                <div style={{ display: 'flex', alignItems: 'flex-start', gap: '1rem' }}>
                  <div style={{ fontSize: '2rem', lineHeight: 1 }}>💻</div>
                  <div style={{ flex: 1 }}>
                    <h4 style={{ margin: 0, fontSize: '1.1rem', fontWeight: 700, lineHeight: 1.3 }}>Elastyczne formy wizyty</h4>
                    <p style={{ margin: '0.25rem 0 0 0', opacity: 0.9, fontSize: '0.95rem', lineHeight: 1.4 }}>Wizyty online, stacjonarne lub domowe – wybierz wygodną formę</p>
                  </div>
                </div>
              </div>
              <div style={{
                background: 'linear-gradient(135deg, rgba(255,255,255,0.15) 0%, rgba(255,255,255,0.05) 100%)',
                padding: '1.25rem',
                borderRadius: '0.75rem',
                borderLeft: '4px solid var(--ifm-color-primary-lightest)',
                backdropFilter: 'blur(10px)'
              }}>
                <div style={{ display: 'flex', alignItems: 'flex-start', gap: '1rem' }}>
                  <div style={{ fontSize: '2rem', lineHeight: 1 }}>🏛️</div>
                  <div style={{ flex: 1 }}>
                    <h4 style={{ margin: 0, fontSize: '1.1rem', fontWeight: 700, lineHeight: 1.3 }}>Dyskrecja i profesjonalizm</h4>
                    <p style={{ margin: '0.25rem 0 0 0', opacity: 0.9, fontSize: '0.95rem', lineHeight: 1.4 }}>Komfortowy gabinet w centrum Krakowa</p>
                  </div>
                </div>
              </div>
            </div>
            <div className={styles.buttons}>
              <MyDrBookingButton className="margin-top--md" />
            </div>
            <p style={{ fontSize: '0.9rem', marginTop: '1rem', opacity: 0.9 }}>
              Rejestracja i prowadzenie dokumentacji odbywa się w bezpiecznym systemie MyDr.
            </p>
          </div>
          <div className="col col--5">
            <div className="card" style={{ height: '100%' }}>
              <div className="card__body">
                <h3>Jak wygląda pierwsza wizyta?</h3>
                <ol>
                  <li>Rezerwujesz termin online przez przycisk „Umów wizytę".</li>
                  <li>Otrzymujesz potwierdzenie terminu oraz instrukcję przygotowania.</li>
                  <li>Podczas wizyty omawiasz swoje trudności i otrzymujesz wstępny plan dalszych kroków.</li>
                </ol>
                <p style={{ fontSize: '0.9rem', marginTop: '1rem', color: '#ff6b6b', fontWeight: 'bold' }}>
                  W sytuacji nagłego zagrożenia życia lub zdrowia zawsze zgłoś się na SOR lub zadzwoń pod numer alarmowy 112.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}

function ServiceCard({ title, description, image }: { title: string; description: string; image?: string }) {
  return (
    <div className="col col--4 margin-bottom--lg">
      <div className="card service-card-with-bg" style={{
        height: '100%',
        overflow: 'hidden',
        position: 'relative'
      }}>
        {image && (
          <div className="service-card-bg" style={{
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            height: '150px',
            backgroundImage: `url(${image})`,
            backgroundSize: 'cover',
            backgroundPosition: 'center top',
            zIndex: 0
          }} />
        )}
        <div className="card__body" style={{
          position: 'relative',
          zIndex: 1
        }}>
          <h3>{title}</h3>
          <p>{description}</p>
        </div>
      </div>
    </div>
  );
}

function WhyWiseHealth() {
  return (
    <section className="container margin-vert--xl">
      <Heading as="h2" className="text--center margin-bottom--lg">
        W czym pomagamy
      </Heading>
      <div className="row">
        <ServiceCard
          title="Zaburzenia nastroju"
          description="Obniżony nastrój, depresja, chwiejność emocjonalna, utrata energii i motywacji."
          image="/img/service-illustration-1.webp"
        />
        <ServiceCard
          title="Zaburzenia lękowe"
          description="Lęk uogólniony, napady paniki, fobie, napięcie, trudności z zasypianiem."
          image="/img/service-illustration-4.webp"
        />
        <ServiceCard
          title="Stres i wypalenie"
          description="Przeciążenie pracą, wypalenie zawodowe, kryzysy życiowe, żałoba, rozstanie."
          image="/img/service-illustration-7.webp"
        />
        <ServiceCard
          title="Trudności w relacjach"
          description="Konflikty w związku, poczucie osamotnienia, problemy komunikacyjne."
          image="/img/service-illustration-2.webp"
        />
        <ServiceCard
          title="Problemy ze snem"
          description="Bezsenność, wybudzanie się, niepokojące sny, zaburzony rytm snu i czuwania."
          image="/img/service-illustration-5.webp"
        />
        <ServiceCard
          title="Wsparcie po hospitalizacji"
          description="Kontynuacja leczenia po pobycie w szpitalu psychiatrycznym lub oddziale dziennym."
          image="/img/service-illustration-6.webp"
        />
      </div>
    </section>
  );
}

function WhyChooseUs() {
  return (
    <section className="container margin-vert--xl" style={{ background: 'var(--ifm-color-emphasis-100)', padding: '3rem', borderRadius: '1rem' }}>
      <Heading as="h2" className="text--center margin-bottom--lg">
        Dlaczego WiseHealth
      </Heading>
      <div className="row">
        <div className="col col--6">
          <ul style={{ fontSize: '1.1rem', lineHeight: '1.8' }}>
            <li>Skupienie na komforcie i bezpieczeństwie pacjenta</li>
            <li>Indywidualne podejście – wspólnie planujemy dalsze kroki</li>
            <li>Możliwość łączenia konsultacji stacjonarnych i online</li>
            <li>Przejrzysta komunikacja – jasno omawiamy możliwe opcje</li>
          </ul>
        </div>
        <div className="col col--6">
          <ul style={{ fontSize: '1.1rem', lineHeight: '1.8' }}>
            <li>Nowoczesny system EDM MyDr do obsługi wizyt i dokumentacji</li>
            <li>Przyjazna, nieoceniająca atmosfera</li>
            <li>Doświadczeni specjaliści z empatią</li>
            <li>Szybkie terminy wizyt</li>
          </ul>
        </div>
      </div>
    </section>
  );
}

function HowItWorks() {
  return (
    <section className="container margin-vert--xl">
      <Heading as="h2" className="text--center margin-bottom--lg">
        Jak to działa?
      </Heading>
      <div className="row">
        <div className="col col--4 text--center">
          <div style={{ fontSize: '3rem', fontWeight: 'bold', color: 'var(--ifm-color-primary)' }}>1</div>
          <h3>Wybierz specjalistę</h3>
          <p>Wybierz psychiatrę lub psychologa w systemie online</p>
        </div>
        <div className="col col--4 text--center">
          <div style={{ fontSize: '3rem', fontWeight: 'bold', color: 'var(--ifm-color-primary)' }}>2</div>
          <h3>Wybierz termin</h3>
          <p>Zarezerwuj wygodny dla siebie termin wizyty</p>
        </div>
        <div className="col col--4 text--center">
          <div style={{ fontSize: '3rem', fontWeight: 'bold', color: 'var(--ifm-color-primary)' }}>3</div>
          <h3>Potwierdź dane</h3>
          <p>Wypełnij formularz i otrzymaj potwierdzenie</p>
        </div>
      </div>
    </section>
  );
}

function FinalCTA() {
  return (
    <section className="container margin-vert--xl text--center">
      <div className="card" style={{ padding: '2rem' }}>
        <div className="card__body">
          <Heading as="h2">Gotowy na pierwszą wizytę?</Heading>
          <p style={{ fontSize: '1.2rem', marginBottom: '2rem' }}>
            Zacznij swoją drogę do lepszego samopoczucia. Umów się na konsultację online już dziś.
          </p>
          <MyDrBookingButton />
        </div>
      </div>
    </section>
  );
}

export default function Home(): React.ReactNode {
  const { siteConfig } = useDocusaurusContext();
  return (
    <Layout
      title="Strona główna"
      description="WiseHealth – prywatna klinika zdrowia psychicznego w Krakowie. Psychiatria, psychologia, terapia i konsultacje online.">
      <HomepageHeader />
      <main>
        <WhyWiseHealth />
        <WhyChooseUs />
        <HowItWorks />
        <FinalCTA />
      </main>
    </Layout>
  );
}
