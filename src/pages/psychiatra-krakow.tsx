import React from 'react';
import LandingPage from '@site/src/components/LandingPage';

/**
 * Target query: "psychiatra Kraków" / "psychiatra Kraków prywatnie".
 * The highest-commercial-intent local query for the clinic.
 */
export default function PsychiatraKrakow(): React.ReactNode {
  return (
    <LandingPage
      metaTitle="Psychiatra Kraków – wizyta bez skierowania"
      metaDescription="Psychiatra w Krakowie, ul. Szlak 38. Konsultacja bez skierowania – depresja, lęk, bezsenność, wypalenie. Stacjonarnie i online. Pierwsza wizyta 250 zł."
      path="/psychiatra-krakow"
      breadcrumbLabel="Psychiatra Kraków"
      h1="Psychiatra w Krakowie – prywatna wizyta bez skierowania"
      lead="WiseHealth to niewielka prywatna poradnia zdrowia psychicznego w centrum Krakowa, przy ul. Szlak 38. Przyjmujemy osoby dorosłe – bez skierowania, w spokojnym gabinecie lub online. Konsultacje prowadzi lek. med. Agnieszka Krawczyk, specjalista psychiatra."
      sections={[
        {
          heading: 'Kiedy warto umówić się do psychiatry',
          body: [
            'Do psychiatry nie trzeba trafiać „w ostateczności”. Wizyta ma sens także wtedy, gdy trudności trwają od kilku tygodni, utrudniają pracę, naukę lub relacje, a własne sposoby radzenia sobie przestały wystarczać.',
          ],
          bullets: [
            'Obniżony nastrój, utrata energii i motywacji, poczucie pustki lub beznadziei',
            'Lęk uogólniony, napady paniki, ciągłe napięcie, zamartwianie się',
            'Bezsenność, wybudzanie się w nocy, zaburzony rytm snu i czuwania',
            'Wypalenie zawodowe, przeciążenie, kryzys życiowy, żałoba, rozstanie',
            'Potrzeba kontynuacji leczenia po hospitalizacji psychiatrycznej lub oddziale dziennym',
            'Chęć weryfikacji dotychczasowego leczenia lub omówienia działań niepożądanych leków',
          ],
        },
        {
          heading: 'Jak wygląda pierwsza wizyta u psychiatry',
          body: [
            'Pierwsza konsultacja trwa ok. 45–60 minut. Rozmawiamy o tym, co dzieje się teraz, o historii zdrowia psychicznego, dotychczasowym leczeniu i sytuacji życiowej. To rozmowa, nie egzamin – nie musisz przygotowywać się w żaden szczególny sposób.',
            'Na tej podstawie lekarz proponuje dalsze kroki. To może być obserwacja, leczenie farmakologiczne, skierowanie na psychoterapię, badania dodatkowe lub inna forma wsparcia. Decyzję podejmujemy wspólnie – jasno omawiamy dostępne opcje wraz z ich wadami i zaletami.',
            'Warto zabrać listę aktualnie przyjmowanych leków oraz wcześniejszą dokumentację medyczną, jeśli taka istnieje.',
          ],
        },
        {
          heading: 'Wizyty kontrolne i prowadzenie leczenia',
          body: [
            'Kolejne wizyty są krótsze i służą monitorowaniu samopoczucia, ocenie skuteczności leczenia oraz ewentualnym modyfikacjom terapii. Przy leczeniu farmakologicznym pierwsze kontrole odbywają się zwykle częściej, a gdy stan się stabilizuje – rzadziej.',
            'Krótka konsultacja kontrolna (ok. 15 minut) wystarcza zazwyczaj do omówienia kuracji lub przedłużenia recepty. Jeśli sytuacja wymaga dłuższej rozmowy, lepszym wyborem jest pełna wizyta psychiatryczna.',
          ],
        },
        {
          heading: 'Gdzie nas znajdziesz',
          body: [
            'Gabinet mieści się przy ul. Szlak 38/16 w Krakowie, wejście od ulicy, pierwsze piętro. To spokojna okolica blisko Plant, ok. 3 minuty pieszo od przystanku tramwajowego „Nowy Kleparz” (linie 18, 50) oraz „Pędzichów” (linia 18). W pobliżu kursują także autobusy 124, 152, 164, 169, 179, 192, 424 i 503.',
            'Parking: w okolicy dostępne są miejsca w Strefie Płatnego Parkowania.',
          ],
        },
      ]}
      faqs={[
        {
          question: 'Czy do psychiatry w Krakowie potrzebne jest skierowanie?',
          answer:
            'Nie. Do psychiatry nie jest wymagane skierowanie – dotyczy to zarówno wizyt prywatnych, jak i w ramach NFZ. W WiseHealth wystarczy umówić termin przez system rejestracji online.',
        },
        {
          question: 'Ile kosztuje prywatna wizyta u psychiatry w Krakowie?',
          answer:
            'W WiseHealth pierwsza wizyta psychiatryczna (konsultacja diagnostyczna, ok. 45 minut) kosztuje 250 zł, kolejna wizyta psychiatryczna (50 minut) 300 zł, a krótka konsultacja kontrolna (15 minut) 200 zł. Cennik jest orientacyjny – aktualne ceny potwierdzisz przy rezerwacji.',
        },
        {
          question: 'Czy psychiatra może wystawić e-receptę i e-zwolnienie?',
          answer:
            'Tak, jeśli lekarz uzna to za zasadne i zgodne z obowiązującymi przepisami. Dotyczy to również teleporad. Sam fakt odbycia wizyty nie gwarantuje automatycznie wystawienia recepty ani zwolnienia – zależy to od Twojej sytuacji zdrowotnej i oceny lekarza.',
        },
        {
          question: 'Jak szybko dostanę termin?',
          answer:
            'Dostępne terminy widoczne są na bieżąco w kalendarzu rejestracji online. Jako niewielka poradnia zwykle proponujemy wizytę w ciągu kilku dni, a nie tygodni.',
        },
        {
          question: 'Czy przyjmujecie dzieci i młodzież?',
          answer:
            'Obecnie skupiamy się na pacjentach dorosłych. Przed umówieniem wizyty warto sprawdzić informacje przy wybranym specjaliście w systemie rejestracji lub napisać do nas na kontakt@wisehealth.pl.',
        },
      ]}
      ctaHeading="Umów wizytę u psychiatry w Krakowie"
      ctaBody="Wybierz termin w kalendarzu online. Wizyta stacjonarna przy ul. Szlak 38 lub teleporada – decydujesz sam."
    />
  );
}
