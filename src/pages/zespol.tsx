import React from 'react';
import Layout from '@theme/Layout';
import Heading from '@theme/Heading';
import MyDrBookingButton from '@site/src/components/MyDrBookingButton';
import JsonLd from '@site/src/components/JsonLd';
import {
  CLINIC,
  SPECIALISTS,
  buildBreadcrumbSchema,
} from '@site/src/data/clinic';

/**
 * Structured data for the founders.
 *
 * `sameAs` points at each specialist's verified ZnanyLekarz profile. This is
 * how Google reconciles the person described here with the same person's
 * review history on the directory — without it, the site and the profiles are
 * two unrelated entities and the clinic gets no credit for either.
 */
function buildTeamSchema(): Record<string, unknown>[] {
  return SPECIALISTS.map((specialist) => ({
    '@context': 'https://schema.org',
    '@type': specialist.schemaType,
    name: specialist.displayName,
    jobTitle: specialist.jobTitle,
    // medicalSpecialty is only defined on Physician; a Person gets knowsAbout.
    ...(specialist.schemaType === 'Physician'
      ? { medicalSpecialty: specialist.specialty }
      : { knowsAbout: specialist.specialty }),
    ...(specialist.image ? { image: specialist.image } : {}),
    sameAs: specialist.sameAs,
    worksFor: { '@id': `${CLINIC.url}/#clinic` },
    workLocation: {
      '@type': 'Place',
      name: CLINIC.name,
      address: {
        '@type': 'PostalAddress',
        streetAddress: CLINIC.address.streetAddress,
        addressLocality: CLINIC.address.addressLocality,
        postalCode: CLINIC.address.postalCode,
        addressCountry: CLINIC.address.addressCountry,
      },
    },
  }));
}

interface TeamMemberCardProps {
  name: string;
  title: string;
  description: string;
  tags?: string[];
  imagePosition?: string;
  /** Verified external profile, rendered as a visible link. */
  profileUrl?: string;
}

function TeamMemberCard({ name, title, description, tags, photo, imagePosition, profileUrl }: TeamMemberCardProps & { photo?: string }) {
  return (
    <div className="card margin-bottom--lg" style={{
      height: '100%',
      display: 'flex',
      flexDirection: 'column'
    }}>
      {photo && (
        <div className="card__image">
          <img
            src={photo}
            alt={`${name} - ${title}`}
            style={{
              width: '100%',
              height: '350px',
              objectFit: 'cover',
              objectPosition: imagePosition || 'center',
              borderRadius: 'var(--ifm-card-border-radius) var(--ifm-card-border-radius) 0 0',
              display: 'block'
            }}
          />
        </div>
      )}
      <div className="card__body" style={{ flex: 1, display: 'flex', flexDirection: 'column' }}>
        <Heading as="h3">{name}</Heading>
        <p><strong style={{ color: 'var(--ifm-color-primary)' }}>{title}</strong></p>
        <p style={{ flex: 1 }}>{description}</p>
        {tags && tags.length > 0 && (
          <div style={{ marginTop: '1rem' }}>
            {tags.map((tag, idx) => (
              <span
                key={idx}
                className="badge badge--secondary"
                style={{
                  marginRight: '0.5rem',
                  marginBottom: '0.5rem',
                  display: 'inline-block'
                }}
              >
                {tag}
              </span>
            ))}
          </div>
        )}
        {profileUrl && (
          <p style={{ marginTop: '1rem', marginBottom: 0, fontSize: '0.9rem' }}>
            <a href={profileUrl} target="_blank" rel="noopener">
              Profil i opinie pacjentów w ZnanyLekarz →
            </a>
          </p>
        )}
      </div>
    </div>
  );
}

export default function ZespolPage(): React.ReactNode {
  return (
    <Layout
      title="Zespół – psychiatra i psychoterapeuta"
      description="Założyciele WiseHealth: lek. med. Agnieszka Krawczyk (psychiatra) i mgr Marcin Pawlus (psycholog, psychoterapeuta). Gabinet Szlak 38, Kraków.">
      <JsonLd
        schema={[
          ...buildTeamSchema(),
          buildBreadcrumbSchema([
            { name: 'Strona główna', path: '/' },
            { name: 'Zespół', path: '/zespol' },
          ]),
        ]}
      />
      <main className="container margin-vert--lg">
        <Heading as="h1">Założyciele</Heading>
        <p className="margin-bottom--lg">
          WiseHealth został założony przez dwoje specjalistów, którzy łączą medyczne i psychologiczne podejście do zdrowia psychicznego.
        </p>

        <section className="margin-top--lg">
          <div className="row">
            <div className="col col--6">
              <TeamMemberCard
                name="Agnieszka Krawczyk"
                title="Współzałożycielka, lek. med., specjalista psychiatra"
                photo="/img/agnieszka-krawczyk.jpg"
                imagePosition="top"
                description="Zajmuje się diagnozowaniem i leczeniem zaburzeń nastroju, zaburzeń lękowych oraz innych trudności natury psychicznej u osób dorosłych. W pracy stawia na spokojne tłumaczenie możliwych opcji leczenia i wspólne podejmowanie decyzji z pacjentem."
                tags={[
                  'Psychiatria',
                  'Zaburzenia lękowe',
                  'Depresja',
                  'Farmakoterapia',
                ]}
                profileUrl="https://www.znanylekarz.pl/agnieszka-aleksandra-krawczyk/psychiatra-psychoterapeuta/zabierzow"
              />
            </div>
            <div className="col col--6">
              <TeamMemberCard
                name="Marcin Pawlus"
                title="Współzałożyciel, mgr psychologii, psychoterapeuta"
                photo="/img/marcin_pawlus_img.jpg"
                imagePosition="center"
                description="Prowadzi konsultacje psychologiczne oraz psychoterapię indywidualną osób dorosłych. Pracuje z osobami w kryzysach życiowych, doświadczającymi lęku, obniżonego nastroju oraz trudności w relacjach."
                tags={[
                  'Psychoterapia',
                  'Kryzysy życiowe',
                  'Relacje',
                  'Rozwój osobisty',
                ]}
                profileUrl="https://www.znanylekarz.pl/marcin-pawlus/psycholog/krakow"
              />
            </div>
          </div>
        </section>



        <section className="margin-top--xl margin-bottom--xl">
          <Heading as="h2">Jak dobrać specjalistę?</Heading>
          <div className="card">
            <div className="card__body">
              <p>
                Jeśli nie jesteś pewien, czy lepszym pierwszym krokiem będzie konsultacja psychiatryczna
                czy psychologiczna, możesz:
              </p>
              <ul>
                <li>Umówić ogólną konsultację wstępną i wspólnie omówić możliwe dalsze kroki.</li>
                <li>Skorzystać z informacji w opisach usług oraz w kalendarzu rejestracji online.</li>
                <li>Napisać do nas na kontakt@wisehealth.pl – chętnie pomożemy dobrać specjalistę.</li>
              </ul>
              <p>
                W razie potrzeby specjalista może zaproponować zmianę formy dalszego leczenia (np.
                dołączenie psychoterapii lub konsultacji z innym lekarzem).
              </p>
              <p className="margin-top--md">
                <strong>Ogólna zasada:</strong>
              </p>
              <ul>
                <li>
                  <strong>Psychiatra</strong> – gdy rozważasz leczenie farmakologiczne, potrzebujesz
                  recepty, zwolnienia lub diagnozy medycznej.
                </li>
                <li>
                  <strong>Psycholog/psychoterapeuta</strong> – gdy chcesz pracować nad swoimi emocjami,
                  myślami i zachowaniami bez lub równolegle z leczeniem farmakologicznym.
                </li>
              </ul>
            </div>
          </div>
        </section>
        <section className="margin-top--xl margin-bottom--xl">
          <div className="card" style={{ padding: '2rem' }}>
            <div className="card__body text--center">
              <Heading as="h2">Gotowy, żeby umówić wizytę?</Heading>
              <p style={{ fontSize: '1.1rem', marginBottom: '1.5rem' }}>
                Wybierz specjalistę i termin w kalendarzu rejestracji online – stacjonarnie przy
                ul. Szlak 38 w Krakowie lub online.
              </p>
              <MyDrBookingButton />
            </div>
          </div>
        </section>
      </main>
    </Layout>
  );
}
