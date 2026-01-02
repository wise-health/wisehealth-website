import React from 'react';
import Layout from '@theme/Layout';
import Heading from '@theme/Heading';
import MyDrBookingButton from '@site/src/components/MyDrBookingButton';

export default function KontaktPage(): React.ReactNode {
  return (
    <Layout
      title="Kontakt"
      description="Dane kontaktowe WiseHealth w Krakowie.">
      <main className="container margin-vert--lg">
        <Heading as="h1">Kontakt</Heading>

        <section className="margin-top--lg">
          <div className="row">
            <div className="col col--6">
              <div className="card">
                <div className="card__header">
                  <Heading as="h3">Dane kontaktowe</Heading>
                </div>
                <div className="card__body">
                  <p>
                    <strong>Nazwa placówki:</strong><br />
                    WiseHealth – Twoja droga do lepszego samopoczucia
                  </p>
                  <p>
                    <strong>Prowadzący:</strong><br />
                    CEREDUO Sp. z o.o.<br />
                    KRS: 0001042565
                  </p>
                  <p>
                    <strong>Adres gabinetu:</strong><br />
                    ul. Szlak 38/16<br />
                    31-153 Kraków
                  </p>
                  <p>
                    <strong>E-mail:</strong><br />
                    <a href="mailto:kontakt@wisehealth.pl">kontakt@wisehealth.pl</a>
                  </p>
                  <p className="text--secondary">
                    Godziny pracy mogą się różnić w zależności od grafiku poszczególnych specjalistów.
                    Aktualne dostępne terminy znajdziesz w kalendarzu rejestracji online.
                  </p>
                </div>
              </div>
            </div>

            <div className="col col--6">
              <div className="card">
                <div className="card__header">
                  <Heading as="h3" id="booking">Umów wizytę online</Heading>
                </div>
                <div className="card__body">
                  <p>
                    Najszybszym sposobem umówienia wizyty jest skorzystanie z systemu rejestracji online
                    MyDr. W kilka minut wybierzesz specjalistę, termin i formę konsultacji.
                  </p>
                  <MyDrBookingButton className="margin-top--md" />
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="margin-top--xl">
          <Heading as="h2">Jak do nas trafić</Heading>
          <div className="card">
            <div className="card__body">
              <p>
                Nasz gabinet znajduje się w centrum Krakowa, przy ul. Szlak 38/16, w spokojnej okolicy blisko Planty Krakowskie.
              </p>
              <p>
                <strong>Komunikacja miejska:</strong>
              </p>
              <ul>
                <li>Tramwaj: przystanek "Nowy Kleparz" (linie: 18, 50) lub "Pędzichów" (linia 18) - ok. 3 min spacerem</li>
                <li>Autobus: linie 124, 152, 164, 169, 179, 192, 424, 503, przystanek "Nowy Kleparz"</li>
              </ul>
              <p>
                <strong>Parking:</strong><br />
                W pobliżu dostępne są miejsca parkingowe w Strefie Płatnego Parkowania. Najbliższy parking podziemny: Parking Warszawskie.
              </p>

              <div className="margin-top--lg">
                <iframe
                  src="https://www.google.com/maps?q=Szlak+38,+31-153+Kraków,+Poland&output=embed&z=17"
                  width="100%"
                  height="400"
                  style={{ border: 0, borderRadius: '1rem' }}
                  allowFullScreen
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  title="Mapa dojazdu do WiseHealth">
                </iframe>
                <p className="text--secondary margin-top--sm">
                  <small>Dokładna lokalizacja gabinetu: ul. Szlak 38/16, Kraków (wejście od ulicy, 1 piętro)</small>
                </p>
              </div>
            </div>
          </div>
        </section>

        <section className="margin-top--xl">
          <Heading as="h2">Formularz kontaktowy</Heading>
          <div className="card">
            <div className="card__body">
              <p>
                Jeśli masz pytania dotyczące naszych usług lub chcesz uzyskać więcej informacji,
                napisz do nas na adres <a href="mailto:kontakt@wisehealth.pl">kontakt@wisehealth.pl</a>.
              </p>
              <p className="text--secondary">
                Odpowiadamy na wiadomości w godzinach pracy, zazwyczaj w ciągu 24-48 godzin.
              </p>
              {/* 
                TODO: Możesz dodać formularz kontaktowy używając Netlify Forms
                lub innej usługi formularzy bez backendu.
                Przykład Netlify Forms: https://docs.netlify.com/forms/setup/
              */}
            </div>
          </div>
        </section>

        <section className="margin-top--xl margin-bottom--xl">
          <div className="card card--danger">
            <div className="card__header">
              <Heading as="h3">Ważne informacje</Heading>
            </div>
            <div className="card__body">
              <ul>
                <li>
                  <strong>W sytuacji nagłego zagrożenia życia lub zdrowia zgłoś się na Szpitalny Oddział
                    Ratunkowy lub zadzwoń pod numer alarmowy 112.</strong>
                </li>
                <li>
                  E-mail i formularz kontaktowy nie służą do zgłaszania pilnych stanów zagrożenia
                  życia – w takich sytuacjach zawsze dzwoń na 112.
                </li>
                <li>
                  Telefon zaufania dla osób w kryzysie psychicznym: <strong>116 123</strong> (całodobowo)
                </li>
              </ul>
            </div>
          </div>
        </section>
      </main>
    </Layout>
  );
}
