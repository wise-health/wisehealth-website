import React from 'react';
import Layout from '@theme/Layout';
import Heading from '@theme/Heading';

// Uwaga: wszystkie dane osobowe są przykładowe.
// Zastąp je rzeczywistymi danymi personelu kliniki.

interface TeamMemberCardProps {
  name: string;
  title: string;
  description: string;
  tags?: string[];
}

function TeamMemberCard({ name, title, description, tags, photo }: TeamMemberCardProps & { photo?: string }) {
  return (
    <div className="card margin-bottom--lg" style={{height: '100%'}}>
      {photo && (
        <div className="card__image">
          <img 
            src={photo} 
            alt={`${name} - ${title}`}
            style={{
              width: '100%',
              height: '300px',
              objectFit: 'cover',
              borderRadius: 'var(--ifm-card-border-radius) var(--ifm-card-border-radius) 0 0'
            }}
          />
        </div>
      )}
      <div className="card__body">
        <Heading as="h3">{name}</Heading>
        <p><strong style={{color: 'var(--ifm-color-primary)'}}>{title}</strong></p>
        <p>{description}</p>
        {tags && tags.length > 0 && (
          <div style={{marginTop: '1rem'}}>
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
      </div>
    </div>
  );
}

export default function ZespolPage(): React.ReactNode {
  return (
    <Layout
      title="Zespół"
      description="Poznaj zespół specjalistów WiseHealth.">
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
                description="Zajmuje się diagnozowaniem i leczeniem zaburzeń nastroju, zaburzeń lękowych oraz innych trudności natury psychicznej u osób dorosłych. W pracy stawia na spokojne tłumaczenie możliwych opcji leczenia i wspólne podejmowanie decyzji z pacjentem."
                tags={[
                  'Psychiatria',
                  'Zaburzenia lękowe',
                  'Depresja',
                  'Farmakoterapia',
                ]}
              />
            </div>
            <div className="col col--6">
              <TeamMemberCard
                name="Marcin Pawlus"
                title="Współzałożyciel, mgr psychologii, psychoterapeuta"
                photo="/img/marcin_pawlus_img.jpg"
                description="Prowadzi konsultacje psychologiczne oraz psychoterapię indywidualną osób dorosłych. Pracuje z osobami w kryzysach życiowych, doświadczającymi lęku, obniżonego nastroju oraz trudności w relacjach."
                tags={[
                  'Psychoterapia',
                  'Kryzysy życiowe',
                  'Relacje',
                  'Rozwój osobisty',
                ]}
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
                <li>Skontaktować się z nami telefonicznie lub mailowo – chętnie pomożemy.</li>
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
      </main>
    </Layout>
  );
}
