import React from 'react';
import Layout from '@theme/Layout';
import Heading from '@theme/Heading';
import ClinicPhone from '@site/src/components/ClinicPhone';
import { CLINIC } from '@site/src/data/clinic';

export default function PolitykaPrywatnosciPage(): React.ReactNode {
  return (
    <Layout
      title="Polityka prywatności"
      description="Polityka prywatności WiseHealth">
      <main className="container margin-vert--lg">
        <Heading as="h1">Polityka prywatności</Heading>
        <p className="text--secondary margin-bottom--lg">
          Ostatnia aktualizacja: 7 października 2026 r.
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
                <strong>CEREDUO SPÓŁKA Z OGRANICZONĄ ODPOWIEDZIALNOŚCIĄ</strong><br />
                Adres: Dajwór 14 / 19, 31-052 Kraków, Polska<br />
                KRS: 0001042565; NIP:6762645282<br />
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
                <li>Dane techniczne (adres IP, typ przeglądarki, system operacyjny) – zapisywane automatycznie w logach serwera przez dostawcę hostingu (Netlify) w celu wyświetlenia strony i zapewnienia jej bezpieczeństwa</li>
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
                  (zapewnienie bezpieczeństwa strony, obsługa zapytań, dochodzenie i obrona przed roszczeniami)
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
                  <strong>Dokumentacja medyczna:</strong> 20 lat, licząc od końca roku kalendarzowego,
                  w którym dokonano ostatniego wpisu, z wyjątkami przewidzianymi w art. 29 ust. 1 ustawy
                  o prawach pacjenta i Rzeczniku Praw Pacjenta (np. skierowania niezrealizowane – 5 lat).
                </li>
                <li>
                  <strong>Dane dotyczące rezerwacji i rozliczeń:</strong> 5 lat, licząc od końca roku
                  kalendarzowego, w którym upłynął termin płatności podatku, oraz do czasu przedawnienia
                  ewentualnych roszczeń.
                </li>
                <li>
                  <strong>Korespondencja (e-mail, telefon):</strong> do czasu załatwienia sprawy,
                  a następnie do upływu terminu przedawnienia roszczeń.
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
                Strona nie używa plików cookies analitycznych ani reklamowych. Korzystamy wyłącznie
                z mechanizmów niezbędnych do jej działania:
              </p>
              <ul>
                <li>
                  <code>wh-notice-dismissed</code> (pamięć lokalna przeglądarki) – zapamiętuje, że
                  zamknięto komunikat informacyjny na dole strony;
                </li>
                <li>
                  moduł rezerwacji MyDr – okno rezerwacji wyświetlane jest z serwisu MyDr
                  (plugin.mydr.pl); po jego otwarciu i zalogowaniu MyDr może zapisywać na urządzeniu
                  dane niezbędne do założenia konta i umówienia wizyty, zgodnie z polityką prywatności MyDr.
                </li>
              </ul>
              <p>
                Możesz usunąć te dane w ustawieniach przeglądarki; może to uniemożliwić umówienie
                wizyty online.
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
                <strong>Telefon (recepcja):</strong> <ClinicPhone /> ({CLINIC.openingHours.display})
              </p>
              <p>
                Prawo do wniesienia skargi przysługuje do Prezesa Urzędu Ochrony Danych Osobowych
                (ul. Stawki 2, 00-193 Warszawa). Szczegółowe informacje dla pacjentów, w tym o obowiązku
                podania danych i braku profilowania, znajdziesz w <a href="/rodo">klauzuli informacyjnej RODO</a>.
              </p>
            </div>
          </div>
        </section>
      </main>
    </Layout>
  );
}
