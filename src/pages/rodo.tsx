import React from 'react';
import Layout from '@theme/Layout';
import Heading from '@theme/Heading';

export default function RODOPage(): React.ReactNode {
  return (
    <Layout
      title="Informacje RODO dla pacjentów"
      description="Informacje o przetwarzaniu danych osobowych zgodnie z RODO">
      <main className="container margin-vert--lg">
        <Heading as="h1">Klauzula informacyjna RODO dla pacjentów</Heading>
        <p className="text--secondary margin-bottom--lg">
          Informacje o przetwarzaniu danych osobowych zgodnie z Rozporządzeniem Parlamentu Europejskiego
          i Rady (UE) 2016/679 z dnia 27 kwietnia 2016 r. (RODO)
        </p>

        <section className="margin-top--lg">
          <Heading as="h2">1. Administrator danych osobowych</Heading>
          <div className="card">
            <div className="card__body">
              <p>
                Administratorem Twoich danych osobowych jest:
              </p>
              <p>
                <strong>CEREDUO Sp. z o.o.</strong><br />
                ul. Dajwór 14/19, 31-052 Kraków<br />
                KRS: 0001042565<br />
                <br />
                <strong>Gabinet WiseHealth:</strong><br />
                ul. Szlak 38/16, 31-153 Kraków<br />
                E-mail: <a href="mailto:kontakt@wisehealth.pl">kontakt@wisehealth.pl</a>
              </p>
            </div>
          </div>
        </section>

        <section className="margin-top--lg">
          <Heading as="h2">2. Cele i podstawy prawne przetwarzania</Heading>
          <div className="card">
            <div className="card__body">
              <p>
                Twoje dane osobowe, w tym dane dotyczące zdrowia, przetwarzamy w następujących celach:
              </p>
              
              <Heading as="h4">a) Udzielanie świadczeń zdrowotnych</Heading>
              <ul>
                <li><strong>Podstawa prawna:</strong> Art. 9 ust. 2 lit. h) RODO w zw. z ustawą o prawach pacjenta i Rzeczniku Praw Pacjenta</li>
                <li>Przeprowadzenie badania, postawienie diagnozy, udzielenie pomocy medycznej</li>
              </ul>

              <Heading as="h4">b) Prowadzenie dokumentacji medycznej</Heading>
              <ul>
                <li><strong>Podstawa prawna:</strong> Art. 6 ust. 1 lit. c) RODO – obowiązek prawny wynikający z przepisów o prawach pacjenta</li>
                <li>Sporządzanie i przechowywanie dokumentacji medycznej zgodnie z obowiązującymi przepisami</li>
              </ul>

              <Heading as="h4">c) Wykonanie umowy o świadczenie usług medycznych</Heading>
              <ul>
                <li><strong>Podstawa prawna:</strong> Art. 6 ust. 1 lit. b) RODO</li>
                <li>Umówienie wizyty, potwierdzenie terminu, rozliczenie finansowe</li>
              </ul>

              <Heading as="h4">d) Marketing usług medycznych (opcjonalnie)</Heading>
              <ul>
                <li><strong>Podstawa prawna:</strong> Art. 6 ust. 1 lit. a) RODO – Twoja dobrowolna zgoda</li>
                <li>Informowanie o nowościach, promocjach, organizowanych wydarzeniach</li>
                <li>Możesz w każdej chwili wycofać zgodę bez wpływu na legalność przetwarzania przed jej cofnięciem</li>
              </ul>
            </div>
          </div>
        </section>

        <section className="margin-top--lg">
          <Heading as="h2">3. Kategorie danych osobowych</Heading>
          <div className="card">
            <div className="card__body">
              <p>Przetwarzamy następujące kategorie danych:</p>
              <ul>
                <li><strong>Dane identyfikacyjne:</strong> imię, nazwisko, PESEL, adres zamieszkania</li>
                <li><strong>Dane kontaktowe:</strong> numer telefonu, adres e-mail</li>
                <li><strong>Dane dotyczące zdrowia:</strong> rozpoznanie, przebieg leczenia, wyniki badań, wystawione recepty i zwolnienia</li>
                <li><strong>Dane finansowe:</strong> informacje o płatnościach za świadczone usługi</li>
              </ul>
            </div>
          </div>
        </section>

        <section className="margin-top--lg">
          <Heading as="h2">4. Odbiorcy danych</Heading>
          <div className="card">
            <div className="card__body">
              <p>
                Twoje dane mogą być przekazywane następującym kategoriom odbiorców:
              </p>
              <ul>
                <li>Personelowi medycznemu biorącemu udział w udzielaniu świadczeń zdrowotnych</li>
                <li>Dostawcom systemów IT (platforma MyDr, hosting dokumentacji medycznej)</li>
                <li>Podmiotom świadczącym usługi księgowe i prawne</li>
                <li>Instytucjom ubezpieczeniowym – na Twoje żądanie</li>
                <li>Organom państwowym – w zakresie wymaganym przepisami prawa (NFZ, Sanepid, sądy, prokuratura)</li>
              </ul>
              <p>
                Wszystkie podmioty przetwarzające dane w naszym imieniu działają na podstawie umowy
                powierzenia przetwarzania danych i są zobowiązane do zapewnienia odpowiednich środków
                bezpieczeństwa.
              </p>
            </div>
          </div>
        </section>

        <section className="margin-top--lg">
          <Heading as="h2">5. Okres przechowywania danych</Heading>
          <div className="card">
            <div className="card__body">
              <p>
                Twoje dane będą przechowywane przez okres:
              </p>
              <ul>
                <li>
                  <strong>Dokumentacja medyczna:</strong> 20 lat licząc od końca roku kalendarzowego,
                  w którym dokonano ostatniego wpisu (zgodnie z art. 29 ustawy o prawach pacjenta)
                </li>
                <li>
                  <strong>Dokumentacja obrazowa (zdjęcia RTG, wyniki badań):</strong> 10 lat
                </li>
                <li>
                  <strong>Skierowania:</strong> 5 lat
                </li>
                <li>
                  <strong>Zgody marketingowe:</strong> do momentu wycofania zgody
                </li>
              </ul>
              <p>
                Po upływie powyższych okresów dokumentacja jest archiwizowana lub niszczona zgodnie
                z obowiązującymi przepisami.
              </p>
            </div>
          </div>
        </section>

        <section className="margin-top--lg">
          <Heading as="h2">6. Twoje prawa jako osoby, której dane dotyczą</Heading>
          <div className="card">
            <div className="card__body">
              <p>
                Masz prawo do:
              </p>
              <ul>
                <li>
                  <strong>Dostępu do swoich danych</strong> – możesz uzyskać informację, jakie dane
                  przetwarzamy oraz otrzymać kopię danych
                </li>
                <li>
                  <strong>Sprostowania danych</strong> – jeśli Twoje dane są nieprawidłowe lub niekompletne
                </li>
                <li>
                  <strong>Usunięcia danych („prawo do bycia zapomnianym")</strong> – w zakresie, w jakim
                  nie istnieje obowiązek prawny ich przechowywania (np. dokumentacja medyczna musi być
                  przechowywana przez 20 lat)
                </li>
                <li>
                  <strong>Ograniczenia przetwarzania</strong> – w sytuacjach określonych w RODO
                </li>
                <li>
                  <strong>Przenoszenia danych</strong> – otrzymania danych w ustrukturyzowanym,
                  powszechnie używanym formacie
                </li>
                <li>
                  <strong>Sprzeciwu wobec przetwarzania</strong> – w szczególności wobec przetwarzania
                  do celów marketingowych
                </li>
                <li>
                  <strong>Cofnięcia zgody</strong> – w dowolnym momencie, bez wpływu na zgodność z prawem
                  przetwarzania przed cofnięciem
                </li>
                <li>
                  <strong>Wniesienia skargi do organu nadzorczego</strong> – Prezesa Urzędu Ochrony
                  Danych Osobowych (ul. Stawki 2, 00-193 Warszawa)
                </li>
              </ul>
            </div>
          </div>
        </section>

        <section className="margin-top--lg">
          <Heading as="h2">7. Wymóg podania danych</Heading>
          <div className="card">
            <div className="card__body">
              <p>
                Podanie danych osobowych, w tym danych dotyczących zdrowia, jest:
              </p>
              <ul>
                <li>
                  <strong>Wymogiem ustawowym</strong> – wynikającym z przepisów o prawach pacjenta
                  (prowadzenie dokumentacji medycznej)
                </li>
                <li>
                  <strong>Warunkiem zawarcia umowy</strong> o świadczenie usług medycznych
                </li>
              </ul>
              <p>
                Niepodanie danych uniemożliwi nam udzielenie świadczenia zdrowotnego i prawidłowe
                prowadzenie dokumentacji medycznej.
              </p>
            </div>
          </div>
        </section>

        <section className="margin-top--lg">
          <Heading as="h2">8. Zautomatyzowane podejmowanie decyzji i profilowanie</Heading>
          <div className="card">
            <div className="card__body">
              <p>
                Twoje dane nie są przetwarzane w sposób zautomatyzowany (w tym profilowanie) w celu
                podejmowania decyzji wywołujących skutki prawne lub w podobny sposób istotnie wpływających
                na Twoją sytuację.
              </p>
            </div>
          </div>
        </section>

        <section className="margin-top--lg margin-bottom--xl">
          <Heading as="h2">9. Kontakt w sprawach ochrony danych osobowych</Heading>
          <div className="card">
            <div className="card__body">
              <p>
                W celu skorzystania ze swoich praw lub uzyskania dodatkowych informacji na temat
                przetwarzania danych osobowych skontaktuj się z nami:
              </p>
              <p>
                <strong>E-mail:</strong> <a href="mailto:kontakt@wisehealth.pl">kontakt@wisehealth.pl</a><br />
                <strong>Telefon:</strong> <a href="tel:+48123456789">+48 123 456 789</a><br />
                <strong>Adres:</strong> [do uzupełnienia]
              </p>
              <p className="margin-top--md">
                <em>
                  Potwierdzam, że zapoznałem/am się z powyższą klauzulą informacyjną i rozumiem sposób
                  przetwarzania moich danych osobowych.
                </em>
              </p>
            </div>
          </div>
        </section>
      </main>
    </Layout>
  );
}
