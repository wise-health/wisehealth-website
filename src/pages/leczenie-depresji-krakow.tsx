import React from 'react';
import LandingPage from '@site/src/components/LandingPage';

/**
 * Target query: "leczenie depresji Kraków" / "depresja psychiatra Kraków".
 *
 * Condition-level page. Highest search volume of any mental-health term in
 * Polish, and the intent is squarely commercial ("gdzie się leczyć").
 *
 * COPY DISCIPLINE: this page must never promise outcomes, never suggest
 * self-diagnosis, and must always surface crisis numbers. Medical YMYL content
 * is held to a higher factual bar by both Google and common decency.
 */
export default function LeczenieDepresjiKrakow(): React.ReactNode {
  return (
    <LandingPage
      metaTitle="Leczenie depresji Kraków – psychiatra i terapia"
      metaDescription="Leczenie depresji w Krakowie – konsultacja psychiatryczna, farmakoterapia i psychoterapia w jednym miejscu. Gabinet Szlak 38 i online."
      path="/leczenie-depresji-krakow"
      breadcrumbLabel="Leczenie depresji"
      h1="Leczenie depresji w Krakowie"
      lead="W WiseHealth leczenie depresji prowadzimy dwutorowo: konsultacja i opieka lekarza psychiatry oraz psychoterapia – w jednym miejscu, bez odsyłania Cię do kolejnych placówek. Stacjonarnie przy ul. Szlak 38 w Krakowie lub online."
      sections={[
        {
          heading: 'Objawy, z którymi warto się zgłosić',
          body: [
            'Depresja to coś innego niż gorszy tydzień. Kluczowe są czas trwania i wpływ na codzienne funkcjonowanie – jeśli poniższe objawy utrzymują się przez większość dnia, przez co najmniej dwa tygodnie, warto umówić konsultację.',
          ],
          bullets: [
            'Obniżony nastrój, smutek, przygnębienie lub uczucie wewnętrznej pustki',
            'Utrata zainteresowań i zdolności odczuwania przyjemności z rzeczy, które wcześniej cieszyły',
            'Zmęczenie i brak energii nieproporcjonalny do wysiłku',
            'Zaburzenia snu – bezsenność, wczesne wybudzanie lub nadmierna senność',
            'Zmiany apetytu i masy ciała',
            'Trudności z koncentracją, pamięcią i podejmowaniem decyzji',
            'Poczucie winy, bezwartościowości, nadmierna samokrytyka',
            'Myśli o śmierci lub samobójstwie',
          ],
        },
        {
          heading: 'Jeśli pojawiają się myśli samobójcze',
          body: [
            'Nie czekaj na termin wizyty. Zgłoś się na najbliższy Szpitalny Oddział Ratunkowy lub zadzwoń pod numer alarmowy 112.',
            'Możesz też skorzystać z całodobowego telefonu zaufania dla osób w kryzysie psychicznym: 116 123. Dla dzieci i młodzieży: 116 111. Te numery są bezpłatne.',
          ],
        },
        {
          heading: 'Jak wygląda proces leczenia',
          body: [
            'Zaczynamy od konsultacji diagnostycznej (ok. 45–60 minut). Rozmawiamy o objawach, ich nasileniu i czasie trwania, o historii leczenia oraz sytuacji życiowej. Depresja bywa też skutkiem lub elementem innych stanów – dlatego wywiad obejmuje szerszy obraz, a w razie potrzeby lekarz zleca badania dodatkowe.',
            'Następnie wspólnie ustalamy plan. W zależności od obrazu może to być psychoterapia, farmakoterapia, obie te drogi równolegle albo – przy łagodnym nasileniu – obserwacja i praca nad czynnikami podtrzymującymi. Jasno omawiamy możliwe opcje wraz z ich wadami i zaletami; decyzja należy do Ciebie.',
            'Leczenie wymaga kontroli. Przy farmakoterapii pierwsze wizyty kontrolne odbywają się zwykle częściej, żeby ocenić skuteczność i działania niepożądane, a gdy stan się stabilizuje – rzadziej.',
          ],
        },
        {
          heading: 'Farmakoterapia i psychoterapia – co wybrać',
          body: [
            'To nie jest wybór „albo–albo”. Leki przeciwdepresyjne pomagają wyjść ze stanu, w którym na jakąkolwiek pracę nad sobą po prostu brakuje zasobów. Psychoterapia pracuje nad tym, co podtrzymuje objawy i co pomoże zmniejszyć ryzyko nawrotu.',
            'Przy nasileniu łagodnym psychoterapia często wystarcza. Przy umiarkowanym i ciężkim standardem jest połączenie obu podejść. Dobór zależy od obrazu klinicznego, Twoich preferencji i dotychczasowych doświadczeń z leczeniem – i jest przedmiotem rozmowy, nie odgórnej decyzji.',
          ],
        },
        {
          heading: 'Wsparcie po hospitalizacji',
          body: [
            'Prowadzimy również kontynuację leczenia po pobycie w szpitalu psychiatrycznym lub na oddziale dziennym. Warto zabrać ze sobą kartę informacyjną z leczenia szpitalnego – pozwala to płynnie przejąć opiekę bez zaczynania diagnostyki od zera.',
          ],
        },
      ]}
      faqs={[
        {
          question: 'Czy na leczenie depresji potrzebne jest skierowanie?',
          answer:
            'Nie. Do psychiatry nie jest wymagane skierowanie. W WiseHealth wystarczy umówić termin przez system rejestracji online – wizyta może być stacjonarna lub online.',
        },
        {
          question: 'Czy leczenie depresji zawsze oznacza leki?',
          answer:
            'Nie. Przy łagodnym nasileniu często wystarcza psychoterapia. Decyzja o farmakoterapii zależy od obrazu klinicznego, Twoich preferencji i wcześniejszych doświadczeń z leczeniem, i jest podejmowana wspólnie z lekarzem po konsultacji.',
        },
        {
          question: 'Czy leki przeciwdepresyjne uzależniają?',
          answer:
            'Leki przeciwdepresyjne nie powodują uzależnienia w rozumieniu, w jakim mówi się o nim przy substancjach uzależniających. Nie należy ich jednak odstawiać nagle ani samodzielnie – zakończenie leczenia planuje się stopniowo, razem z lekarzem prowadzącym.',
        },
        {
          question: 'Jak długo trwa leczenie depresji?',
          answer:
            'To zależy od nasilenia objawów, odpowiedzi na leczenie i tego, czy epizod jest pierwszy, czy kolejny. Pierwsze efekty farmakoterapii ocenia się zwykle po kilku tygodniach. Konkretne ramy lekarz omawia z Tobą po konsultacji diagnostycznej – nie da się ich rzetelnie określić z góry.',
        },
        {
          question: 'Czy leczenie depresji może odbywać się online?',
          answer:
            'W wielu sytuacjach tak, szczególnie przy kontynuacji leczenia i wizytach kontrolnych. Przy pierwszej diagnozie o złożonym obrazie lub nasilonych objawach lekarz może zaproponować wizytę stacjonarną.',
        },
      ]}
      ctaHeading="Umów konsultację w sprawie leczenia depresji"
      ctaBody="Pierwszy krok to rozmowa i diagnoza – dopiero na jej podstawie ustalamy plan. Wybierz termin w kalendarzu online."
    />
  );
}
