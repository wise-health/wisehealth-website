import React from 'react';
import Layout from '@theme/Layout';
import Heading from '@theme/Heading';

export default function PolitykaPrywatnosciPage(): React.ReactNode {
  return (
    <Layout
      title="Polityka prywatności"
      description="Polityka prywatności WiseHealth">
      <main className="container margin-vert--lg">
        <Heading as="h1">Polityka prywatności</Heading>
        <p className="text--secondary margin-bottom--lg">
          Ostatnia aktualizacja: {new Date().toLocaleDateString('pl-PL')}
        </p>

        <section className="margin-top--lg">
          <Heading as="h2">1. Informacje ogólne</Heading>
          <div className="card">
            <div className="card__body">
              <p>
                Niniejsza Polityka prywatności określa zasady przetwarzania i ochrony danych osobowych
                przekazanych przez Użytkowników w związku z korzystaniem ze strony internetowej
                <strong> wisehealth.pl</strong> oraz usług świadczonych przez WiseHealth.
              </p>
              <p>
                Administratorem danych osobowych jest:<br />
                <strong>WiseHealth – klinika zdrowia psychicznego</strong><br />
                Adres: [do uzupełnienia]<br />
                E-mail: <a href="mailto:kontakt@wisehealth.pl">kontakt@wisehealth.pl</a>
              </p>
            </div>
          </div>
        </section>

        <section className="margin-top--lg">
          <Heading as="h2">2. Zakres zbieranych danych</Heading>
          <div className="card">
            <div className="card__body">
              <p>
                W związku z korzystaniem z naszej strony internetowej oraz systemu rezerwacji wizyt
                możemy zbierać następujące dane:
              </p>
              <ul>
                <li>Imię i nazwisko</li>
                <li>Adres e-mail</li>
                <li>Numer telefonu</li>
                <li>Dane dotyczące rezerwacji wizyt (termin, rodzaj wizyty, wybrany specjalista)</li>
                <li>Dane techniczne (adres IP, typ przeglądarki, system operacyjny)</li>
                <li>Dane medyczne – w zakresie niezbędnym do świadczenia usług medycznych (zbierane w systemie MyDr)</li>
              </ul>
            </div>
          </div>
        </section>

        <section className="margin-top--lg">
          <Heading as="h2">3. Cel przetwarzania danych</Heading>
          <div className="card">
            <div className="card__body">
              <p>Dane osobowe są przetwarzane w następujących celach:</p>
              <ul>
                <li>Rejestracja i umówienie wizyty</li>
                <li>Świadczenie usług medycznych</li>
                <li>Kontakt z pacjentem (potwierdzenia wizyt, przypomnienia)</li>
                <li>Prowadzenie dokumentacji medycznej zgodnie z obowiązującymi przepisami</li>
                <li>Rozpatrywanie reklamacji i zapytań</li>
                <li>Analiza statystyczna ruchu na stronie (dane anonimowe)</li>
                <li>Realizacja obowiązków prawnych ciążących na administratorze</li>
              </ul>
            </div>
          </div>
        </section>

        <section className="margin-top--lg">
          <Heading as="h2">4. Podstawa prawna przetwarzania</Heading>
          <div className="card">
            <div className="card__body">
              <p>Dane osobowe przetwarzamy na podstawie:</p>
              <ul>
                <li>
                  <strong>Art. 6 ust. 1 lit. b) RODO</strong> – przetwarzanie jest niezbędne do wykonania
                  umowy (świadczenia usług medycznych)
                </li>
                <li>
                  <strong>Art. 6 ust. 1 lit. c) RODO</strong> – przetwarzanie jest niezbędne do wypełnienia
                  obowiązku prawnego (prowadzenie dokumentacji medycznej)
                </li>
                <li>
                  <strong>Art. 9 ust. 2 lit. h) RODO</strong> – przetwarzanie danych medycznych w celach
                  związanych z profilaktyką zdrowotną, diagnostyką medyczną i opieką zdrowotną
                </li>
                <li>
                  <strong>Art. 6 ust. 1 lit. a) RODO</strong> – zgoda użytkownika (np. na marketing)
                </li>
                <li>
                  <strong>Art. 6 ust. 1 lit. f) RODO</strong> – prawnie uzasadniony interes administratora
                  (np. analiza statystyczna)
                </li>
              </ul>
            </div>
          </div>
        </section>

        <section className="margin-top--lg">
          <Heading as="h2">5. Udostępnianie danych</Heading>
          <div className="card">
            <div className="card__body">
              <p>
                Dane osobowe mogą być przekazywane następującym odbiorcom:
              </p>
              <ul>
                <li>Dostawcy systemów IT i hostingu (w tym platforma MyDr)</li>
                <li>Dostawcy usług płatności (w zakresie niezbędnym do realizacji płatności)</li>
                <li>Podmioty świadczące usługi księgowe i prawne</li>
                <li>Organy publiczne – w zakresie wymaganym przepisami prawa</li>
              </ul>
              <p>
                Dane nie są przekazywane do państw trzecich poza Europejski Obszar Gospodarczy,
                chyba że jest to konieczne ze względu na korzystanie z określonych narzędzi
                (np. usługi chmurowe) – w takim przypadku zapewniamy odpowiedni poziom ochrony.
              </p>
            </div>
          </div>
        </section>

        <section className="margin-top--lg">
          <Heading as="h2">6. Okres przechowywania danych</Heading>
          <div className="card">
            <div className="card__body">
              <p>
                Dane osobowe przechowujemy przez okres:
              </p>
              <ul>
                <li>
                  <strong>Dokumentacja medyczna:</strong> 20 lat od ostatniego wpisu (zgodnie z ustawą
                  o prawach pacjenta i Rzeczniku Praw Pacjenta)
                </li>
                <li>
                  <strong>Dane dotyczące rezerwacji i płatności:</strong> 5 lat (dla celów podatkowych
                  i rachunkowych)
                </li>
                <li>
                  <strong>Dane w celach marketingowych:</strong> do czasu wycofania zgody lub sprzeciwu
                </li>
              </ul>
            </div>
          </div>
        </section>

        <section className="margin-top--lg">
          <Heading as="h2">7. Prawa użytkownika</Heading>
          <div className="card">
            <div className="card__body">
              <p>
                Przysługują Ci następujące prawa:
              </p>
              <ul>
                <li><strong>Prawo dostępu</strong> do swoich danych osobowych</li>
                <li><strong>Prawo do sprostowania</strong> danych</li>
                <li><strong>Prawo do usunięcia</strong> danych („prawo do bycia zapomnianym")</li>
                <li><strong>Prawo do ograniczenia przetwarzania</strong></li>
                <li><strong>Prawo do przenoszenia</strong> danych</li>
                <li><strong>Prawo do sprzeciwu</strong> wobec przetwarzania</li>
                <li><strong>Prawo do cofnięcia zgody</strong> w dowolnym momencie</li>
                <li><strong>Prawo do wniesienia skargi</strong> do Prezesa Urzędu Ochrony Danych Osobowych</li>
              </ul>
              <p>
                Aby skorzystać ze swoich praw, skontaktuj się z nami pod adresem:{' '}
                <a href="mailto:kontakt@wisehealth.pl">kontakt@wisehealth.pl</a>
              </p>
            </div>
          </div>
        </section>

        <section className="margin-top--lg">
          <Heading as="h2">8. Pliki cookies</Heading>
          <div className="card">
            <div className="card__body">
              <p>
                Nasza strona wykorzystuje pliki cookies w celu:
              </p>
              <ul>
                <li>Zapewnienia prawidłowego działania strony</li>
                <li>Zapamiętywania preferencji użytkownika</li>
                <li>Analizy ruchu na stronie (np. Google Analytics)</li>
              </ul>
              <p>
                Możesz zarządzać ustawieniami plików cookies w swojej przeglądarce. Wyłączenie cookies
                może wpłynąć na funkcjonalność strony.
              </p>
            </div>
          </div>
        </section>

        <section className="margin-top--lg margin-bottom--xl">
          <Heading as="h2">9. Kontakt w sprawach ochrony danych</Heading>
          <div className="card">
            <div className="card__body">
              <p>
                W przypadku pytań dotyczących przetwarzania danych osobowych, skontaktuj się z nami:
              </p>
              <p>
                <strong>E-mail:</strong> <a href="mailto:kontakt@wisehealth.pl">kontakt@wisehealth.pl</a><br />
                <strong>Telefon:</strong> <a href="tel:+48123456789">+48 123 456 789</a>
              </p>
            </div>
          </div>
        </section>
      </main>
    </Layout>
  );
}
