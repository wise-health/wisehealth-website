import React from 'react';
import Layout from '@theme/Layout';
import Heading from '@theme/Heading';
import MyDrBookingButton from '@site/src/components/MyDrBookingButton';

export default function FAQPage(): React.ReactNode {
  return (
    <Layout
      title="Najczęściej zadawane pytania"
      description="FAQ WiseHealth – pytania i odpowiedzi.">
      <main className="container margin-vert--lg">
        <Heading as="h1">Najczęściej zadawane pytania</Heading>

        <section className="margin-top--lg">
          <Heading as="h2">Rejestracja i wizyty</Heading>

          <div className="card margin-bottom--md">
            <div className="card__header">
              <Heading as="h3">Jak mogę umówić wizytę?</Heading>
            </div>
            <div className="card__body">
              <p>
                Wizytę możesz umówić online, korzystając z systemu MyDr. Wybierasz specjalistę, rodzaj
                wizyty oraz odpowiadający Ci termin.
              </p>
              <MyDrBookingButton className="margin-top--md" />
            </div>
          </div>

          <div className="card margin-bottom--md">
            <div className="card__header">
              <Heading as="h3">Czy mogę odwołać lub przełożyć wizytę?</Heading>
            </div>
            <div className="card__body">
              <p>
                Tak, możesz odwołać lub przełożyć wizytę z minimum 24-godzinnym wyprzedzeniem bez dodatkowych opłat.
                Odwołanie wizyty w krótszym terminie może wiązać się z opłatą zgodnie z regulaminem kliniki. 
                Szczegółowe informacje znajdziesz w potwierdzeniu rezerwacji.
              </p>
            </div>
          </div>

          <div className="card margin-bottom--md">
            <div className="card__header">
              <Heading as="h3">Czy przyjmujecie pacjentów niepełnoletnich?</Heading>
            </div>
            <div className="card__body">
              <p>
                Zakres wiekowy pacjentów zależy od specjalistów współpracujących z kliniką. 
                Obecnie skupiamy się głównie na pacjentach dorosłych. Przed umówieniem wizyty 
                sprawdź informacje przy wybranym lekarzu/terapeucie w systemie MyDr lub skontaktuj 
                się z nami telefonicznie/mailowo, aby dopytać o aktualne możliwości.
              </p>
            </div>
          </div>

          <div className="card margin-bottom--md">
            <div className="card__header">
              <Heading as="h3">Czy mogę przyjść na wizytę bez skierowania?</Heading>
            </div>
            <div className="card__body">
              <p>
                Tak, do WiseHealth nie potrzebujesz skierowania. Wystarczy umówić się na wizytę 
                przez system rejestracji online.
              </p>
            </div>
          </div>

          <div className="card margin-bottom--md">
            <div className="card__header">
              <Heading as="h3">Jak przygotować się do pierwszej wizyty?</Heading>
            </div>
            <div className="card__body">
              <p>
                Przed pierwszą wizytą warto:
              </p>
              <ul>
                <li>Zastanowić się nad obecnymi trudnościami i tym, co chciałbyś omówić</li>
                <li>Przygotować listę aktualnie przyjmowanych leków (jeśli takie są)</li>
                <li>Zabrać ze sobą dokumentację medyczną, jeśli była wcześniejsza diagnostyka lub leczenie</li>
                <li>Przyjść kilka minut wcześniej, aby spokojnie wypełnić dokumenty</li>
              </ul>
            </div>
          </div>
        </section>

        <section className="margin-top--xl">
          <Heading as="h2">Teleporady i konsultacje online</Heading>

          <div className="card margin-bottom--md">
            <div className="card__header">
              <Heading as="h3">Czy mogę skorzystać z wizyty online?</Heading>
            </div>
            <div className="card__body">
              <p>
                W wielu sytuacjach jest to możliwe, szczególnie jeśli chodzi o kontynuację leczenia czy
                omówienie bieżących trudności. Ostateczna decyzja należy jednak do lekarza/terapeuty,
                który oceni, czy w danym przypadku konsultacja online będzie wystarczająca i bezpieczna.
              </p>
            </div>
          </div>

          <div className="card margin-bottom--md">
            <div className="card__header">
              <Heading as="h3">Czy w trakcie teleporady mogę otrzymać e-receptę lub e-zwolnienie?</Heading>
            </div>
            <div className="card__body">
              <p>
                Tak, wystawienie e-recepty lub e-zwolnienia jest możliwe podczas teleporady, jeśli lekarz 
                uzna to za zasadne i zgodne z obowiązującymi przepisami. Sam fakt odbycia teleporady nie 
                gwarantuje automatycznie wystawienia recepty czy zwolnienia – wszystko zależy od Twojej 
                sytuacji zdrowotnej i oceny lekarza.
              </p>
            </div>
          </div>

          <div className="card margin-bottom--md">
            <div className="card__header">
              <Heading as="h3">Jak przebiega wizyta online?</Heading>
            </div>
            <div className="card__body">
              <p>
                Wizyta online odbywa się przez bezpieczną platformę wideo. Po zarezerwowaniu terminu 
                otrzymasz link do konsultacji. Upewnij się, że masz:
              </p>
              <ul>
                <li>Stabilne połączenie internetowe</li>
                <li>Działającą kamerę i mikrofon</li>
                <li>Spokojne miejsce, gdzie nikt Ci nie przeszkodzi</li>
              </ul>
            </div>
          </div>
        </section>

        <section className="margin-top--xl">
          <Heading as="h2">Płatności i refundacje</Heading>

          <div className="card margin-bottom--md">
            <div className="card__header">
              <Heading as="h3">Jak mogę zapłacić za wizytę?</Heading>
            </div>
            <div className="card__body">
              <p>
                Płatność za wizytę możesz dokonać:
              </p>
              <ul>
                <li>Poprzez system płatności online (MyDr)</li>
                <li>Przelewem online (dane do przelewu w potwierdzeniu wizyty)</li>
              </ul>
            </div>
          </div>

          <div className="card margin-bottom--md">
            <div className="card__header">
              <Heading as="h3">Czy wizyty są refundowane przez NFZ?</Heading>
            </div>
            <div className="card__body">
              <p>
                WiseHealth to klinika prywatna, więc wizyty nie są refundowane przez NFZ. 
                Po wizycie otrzymasz fakturę, którą możesz odliczyć od podatku w ramach 
                ulgi rehabilitacyjnej lub przedstawić w prywatnym ubezpieczeniu zdrowotnym 
                (jeśli Twoja polisa to obejmuje).
              </p>
            </div>
          </div>
        </section>

        <section className="margin-top--xl">
          <Heading as="h2">Bezpieczeństwo i sytuacje nagłe</Heading>

          <div className="card margin-bottom--md">
            <div className="card__header">
              <Heading as="h3">Co zrobić w sytuacji nagłego zagrożenia życia lub zdrowia?</Heading>
            </div>
            <div className="card__body">
              <p className="text--danger" style={{ fontWeight: 'bold', fontSize: '1.1rem' }}>
                W przypadku nasilonych myśli samobójczych, poczucia bezpośredniego zagrożenia życia lub
                zdrowia, gwałtownego pogorszenia stanu psychicznego lub innych nagłych objawów
                wymagających pilnej pomocy – nie czekaj na wizytę w poradni.
              </p>
              <p>
                Zgłoś się bezpośrednio na najbliższy Szpitalny Oddział Ratunkowy lub zadzwoń pod numer
                alarmowy <strong>112</strong>.
              </p>
              <p>
                Możesz również skorzystać z:
              </p>
              <ul>
                <li><strong>Telefon zaufania dla osób w kryzysie psychicznym:</strong> 116 123 (całodobowo)</li>
                <li><strong>Telefon zaufania dla młodzieży:</strong> 116 111</li>
              </ul>
            </div>
          </div>

          <div className="card margin-bottom--md">
            <div className="card__header">
              <Heading as="h3">Czy e-mail lub formularz kontaktowy mogą służyć do zgłaszania nagłych sytuacji?</Heading>
            </div>
            <div className="card__body">
              <p>
                <strong>Nie.</strong> E-mail oraz formularz kontaktowy nie służą do udzielania pilnej pomocy medycznej.
                W sytuacji nagłej skorzystaj z numeru alarmowego 112 lub zgłoś się na SOR.
              </p>
            </div>
          </div>
        </section>

        <section className="margin-top--xl margin-bottom--xl">
          <div className="card">
            <div className="card__body text--center">
              <Heading as="h2">Masz inne pytanie?</Heading>
              <p>
                Jeśli nie znalazłeś odpowiedzi na swoje pytanie, możesz skontaktować się z nami
                telefonicznie lub mailowo. Dane kontaktowe znajdziesz na stronie „Kontakt".
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
