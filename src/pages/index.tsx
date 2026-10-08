import React from 'react';
import clsx from 'clsx';
import Link from '@docusaurus/Link';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';
import Layout from '@theme/Layout';
import Heading from '@theme/Heading';
import MyDrBookingButton from '@site/src/components/MyDrBookingButton';
import JsonLd from '@site/src/components/JsonLd';
import { buildLocalBusinessSchema } from '@site/src/data/clinic';

import styles from './index.module.css';

/** Decorative line icons for the hero points (aria-hidden, 24px grid). */
const ICONS = {
  specialist: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" focusable="false">
      <circle cx="12" cy="8" r="3.5" />
      <path d="M5 20c.8-3.6 3.6-5.5 7-5.5s6.2 1.9 7 5.5" />
    </svg>
  ),
  flexible: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" focusable="false">
      <rect x="3" y="4.5" width="18" height="12" rx="2" />
      <path d="M9 20h6M12 16.5V20" />
    </svg>
  ),
  discreet: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" focusable="false">
      <path d="M12 3.5 5 6v5.5c0 4.2 2.9 7.6 7 9 4.1-1.4 7-4.8 7-9V6l-7-2.5Z" />
      <path d="m9.2 12 2 2 3.8-4" />
    </svg>
  ),
};

function HomepageHeader() {
  return (
    <header className={clsx('hero wh-hero', styles.heroBanner)}>
      <div className="container">
        <div className="row">
          <div className="col col--7 wh-hero__intro">
            <Heading as="h1" className="hero__title">
              Twoja droga do lepszego samopoczucia zaczyna się tutaj
            </Heading>
            <p className="hero__subtitle">
              <strong>Profesjonalna opieka psychiatryczna i psychologiczna w Krakowie</strong> –
              bez długiego czekania, w atmosferze pełnej dyskrecji i zrozumienia.
            </p>
            <ul className="wh-points">
              <li>
                {ICONS.specialist}
                <div>
                  <h4>Doświadczeni specjaliści</h4>
                  <p>Psychiatra i psycholog z wieloletnim doświadczeniem</p>
                </div>
              </li>
              <li>
                {ICONS.flexible}
                <div>
                  <h4>Elastyczne formy wizyty</h4>
                  <p>Wizyty online, stacjonarne lub domowe – wybierz wygodną formę</p>
                </div>
              </li>
              <li>
                {ICONS.discreet}
                <div>
                  <h4>Dyskrecja i profesjonalizm</h4>
                  <p>Komfortowy gabinet w centrum Krakowa</p>
                </div>
              </li>
            </ul>
            <div className={styles.buttons}>
              <MyDrBookingButton className="margin-top--md" />
            </div>
            <p className="wh-hero__note">
              Rejestracja i prowadzenie dokumentacji odbywa się w bezpiecznym systemie MyDr.
            </p>
          </div>
          <div className="col col--5">
            <aside className="wh-hero__aside">
              <h3>Jak wygląda pierwsza wizyta?</h3>
              <ol>
                <li>Rezerwujesz termin online przez przycisk „Umów wizytę".</li>
                <li>Otrzymujesz potwierdzenie terminu oraz instrukcję przygotowania.</li>
                <li>Podczas wizyty omawiasz swoje trudności i otrzymujesz wstępny plan dalszych kroków.</li>
              </ol>
              <p className="wh-emergency">
                W sytuacji nagłego zagrożenia życia lub zdrowia zawsze zgłoś się na SOR lub zadzwoń pod numer alarmowy 112.
              </p>
            </aside>
          </div>
        </div>
      </div>
    </header>
  );
}

function ServiceCard({ title, description, image }: { title: string; description: string; image?: string }) {
  return (
    <div className="wh-service">
      {image && (
        <img className="wh-service__art" src={image} alt="" width={88} height={88} decoding="async" />
      )}
      <h3>{title}</h3>
      <p>{description}</p>
    </div>
  );
}

function WhyWiseHealth() {
  return (
    <section className="container margin-vert--xl">
      <Heading as="h2" className="wh-section-title">
        W czym pomagamy
      </Heading>
      <div className="wh-services">
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
    <section className="container margin-vert--xl wh-why">
      <Heading as="h2" className="wh-section-title">
        Dlaczego WiseHealth
      </Heading>
      <div className="row">
        <div className="col col--6">
          <ul>
            <li>Skupienie na komforcie i bezpieczeństwie pacjenta</li>
            <li>Indywidualne podejście – wspólnie planujemy dalsze kroki</li>
            <li>Możliwość łączenia konsultacji stacjonarnych i online</li>
            <li>Przejrzysta komunikacja – jasno omawiamy możliwe opcje</li>
          </ul>
        </div>
        <div className="col col--6">
          <ul>
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
    <section className="container margin-vert--xl wh-steps">
      <Heading as="h2" className="wh-section-title">
        Jak to działa?
      </Heading>
      <div className="row">
        <div className="col col--4">
          <div className="wh-step">
            <div className="wh-step__num">1</div>
            <h3>Wybierz specjalistę</h3>
            <p>Wybierz psychiatrę lub psychologa w systemie online</p>
          </div>
        </div>
        <div className="col col--4">
          <div className="wh-step">
            <div className="wh-step__num">2</div>
            <h3>Wybierz termin</h3>
            <p>Zarezerwuj wygodny dla siebie termin wizyty</p>
          </div>
        </div>
        <div className="col col--4">
          <div className="wh-step">
            <div className="wh-step__num">3</div>
            <h3>Potwierdź dane</h3>
            <p>Wypełnij formularz i otrzymaj potwierdzenie</p>
          </div>
        </div>
      </div>
    </section>
  );
}

function FinalCTA() {
  return (
    <section className="container margin-vert--xl text--center">
      <div className="card wh-cta">
        <div className="card__body">
          <Heading as="h2">Gotowy na pierwszą wizytę?</Heading>
          <p style={{ fontSize: '1.15rem', marginBottom: '2rem' }}>
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
      title="Psychiatra i psycholog Kraków – poradnia zdrowia"
      description="Prywatna poradnia zdrowia psychicznego w Krakowie. Psychiatra, psycholog i psychoterapia – przy ul. Szlak 38 oraz online. Bez skierowania.">
      <JsonLd schema={buildLocalBusinessSchema()} />
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
