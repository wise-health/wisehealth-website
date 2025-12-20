import React from 'react';
import Layout from '@theme/Layout';
import Heading from '@theme/Heading';
import MyDrBookingButton from '@site/src/components/MyDrBookingButton';

export default function OfertaPage(): React.ReactNode {
  return (
    <Layout
      title="Oferta"
      description="Oferta usług psychiatrycznych i psychologicznych WiseHealth w Krakowie.">
      <main className="container margin-vert--lg">
        <Heading as="h1">Oferta</Heading>
        <p className="margin-bottom--lg">
          Poniżej znajdziesz przykładowe kategorie wizyt i konsultacji dostępnych w WiseHealth.
          Traktuj to jako punkt wyjścia – zakres usług może się zmieniać w zależności od
          dostępności specjalistów. Przed pierwszą wizytą zawsze warto sprawdzić aktualne informacje
          w kalendarzu online MyDr.
        </p>

        <section className="margin-top--xl">
          <Heading as="h2">Konsultacje psychiatryczne</Heading>
          
          <div className="card margin-bottom--md">
            <div className="card__header">
              <Heading as="h3">Pierwsza konsultacja psychiatryczna</Heading>
            </div>
            <div className="card__body">
              <p>
                Rozszerzona wizyta, podczas której omawiamy Twoje obecne trudności, historię zdrowia
                psychicznego, dotychczasowe leczenie oraz sytuację życiową. Na tej podstawie lekarz
                proponuje dalsze kroki – może to być obserwacja, leczenie farmakologiczne, skierowanie
                na psychoterapię, badania dodatkowe lub inna forma wsparcia.
              </p>
              <p><strong>Czas trwania:</strong> ok. 60 minut</p>
              <p><strong>Forma:</strong> stacjonarna lub online</p>
            </div>
          </div>

          <div className="card margin-bottom--md">
            <div className="card__header">
              <Heading as="h3">Wizyta kontrolna u psychiatry</Heading>
            </div>
            <div className="card__body">
              <p>
                Krótsza wizyta służąca monitorowaniu samopoczucia, ocenie skuteczności leczenia,
                omówieniu działań niepożądanych oraz ewentualnym modyfikacjom terapii.
              </p>
              <p><strong>Czas trwania:</strong> ok. 30 minut</p>
              <p><strong>Forma:</strong> stacjonarna lub online</p>
            </div>
          </div>
        </section>

        <section className="margin-top--xl">
          <Heading as="h2">Konsultacje psychologiczne i psychoterapeutyczne</Heading>
          
          <div className="card margin-bottom--md">
            <div className="card__header">
              <Heading as="h3">Pierwsza konsultacja psychologiczna</Heading>
            </div>
            <div className="card__body">
              <p>
                Spotkanie wstępne, którego celem jest zrozumienie Twojej sytuacji, oczekiwań oraz
                tego, czy dana forma terapii będzie dla Ciebie odpowiednia. Wspólnie ustalacie cele
                i możliwy sposób pracy.
              </p>
              <p><strong>Czas trwania:</strong> ok. 50–60 minut</p>
              <p><strong>Forma:</strong> stacjonarna lub online</p>
            </div>
          </div>

          <div className="card margin-bottom--md">
            <div className="card__header">
              <Heading as="h3">Sesje psychoterapeutyczne</Heading>
            </div>
            <div className="card__body">
              <p>
                Regularne spotkania (najczęściej 50–60 minut), ukierunkowane na pracę nad konkretnymi
                obszarami: nastrojem, lękiem, relacjami, stresem, poczuciem własnej wartości lub innymi
                trudnościami, które wpływają na Twoje życie.
              </p>
              <p><strong>Czas trwania:</strong> ok. 50–60 minut</p>
              <p><strong>Forma:</strong> stacjonarna lub online</p>
              <p><strong>Częstotliwość:</strong> zazwyczaj raz w tygodniu lub co dwa tygodnie</p>
            </div>
          </div>
        </section>

        <section className="margin-top--xl">
          <Heading as="h2">Teleporady / konsultacje online</Heading>
          <div className="card margin-bottom--md">
            <div className="card__body">
              <p>
                W wielu sytuacjach istnieje możliwość odbycia wizyty online (w formie teleporady lub
                wideokonsultacji). To rozwiązanie szczególnie wygodne, jeśli mieszkasz poza Krakowem,
                masz ograniczoną mobilność lub po prostu czujesz się bezpieczniej w znanym otoczeniu.
              </p>
              <p>
                Ze względów bezpieczeństwa i obowiązujących przepisów nie każdą sytuację da się w pełni
                zaopiekować zdalnie. Ostateczną decyzję co do formy wizyty podejmuje lekarz/terapeuta.
              </p>
            </div>
          </div>
        </section>

        <section className="margin-top--xl">
          <Heading as="h2">Współpraca długoterminowa</Heading>
          <div className="card margin-bottom--md">
            <div className="card__body">
              <p>
                W przypadku przewlekłych trudności (np. zaburzeń nastroju, zaburzeń lękowych)
                optymalne wsparcie często wymaga połączenia konsultacji psychiatrycznych, psychoterapii
                oraz regularnego monitorowania stanu zdrowia. W WiseHealth staramy się, aby plan
                leczenia był dla Ciebie zrozumiały i możliwy do realizacji.
              </p>
            </div>
          </div>
        </section>

        <section className="margin-top--xl margin-bottom--xl">
          <div className="card">
            <div className="card__body text--center">
              <Heading as="h2">Umów wizytę online</Heading>
              <p>
                Jeśli chcesz umówić pierwszą konsultację lub kontynuację leczenia, skorzystaj z
                rejestracji online w systemie MyDr. Wybierzesz specjalistę, termin i formę wizyty.
              </p>
              <MyDrBookingButton className="margin-top--md" />
            </div>
          </div>
        </section>
      </main>
    </Layout>
  );
}
