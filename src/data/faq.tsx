/**
 * FAQ content, extracted so that the rendered page and the FAQPage JSON-LD are
 * generated from ONE source.
 *
 * Google penalises FAQ structured data whose answers do not appear verbatim in
 * the visible page copy. Keeping a single array makes that drift impossible.
 *
 * `answerText` is the plain-text form fed to schema.org; `answer` is the JSX
 * rendered to the user. Where an answer is plain prose the two are the same
 * string — the richer ones (lists, emergency numbers) supply both.
 */
import React from 'react';

export interface FaqItem {
  question: string;
  /** Plain-text answer for structured data. Must match the visible copy. */
  answerText: string;
  /** Rendered answer. Defaults to a <p> around answerText when omitted. */
  answer?: React.ReactNode;
  /** Shows the MyDr booking CTA under this answer. */
  withBooking?: boolean;
}

export interface FaqSection {
  title: string;
  items: FaqItem[];
}

export const FAQ_SECTIONS: FaqSection[] = [
  {
    title: 'Rejestracja i wizyty',
    items: [
      {
        question: 'Jak mogę umówić wizytę?',
        answerText:
          'Wizytę możesz umówić online, korzystając z systemu MyDr. Wybierasz specjalistę, rodzaj wizyty oraz odpowiadający Ci termin.',
        withBooking: true,
      },
      {
        question: 'Czy mogę odwołać lub przełożyć wizytę?',
        answerText:
          'Tak, możesz odwołać lub przełożyć wizytę z minimum 24-godzinnym wyprzedzeniem bez dodatkowych opłat. Odwołanie wizyty w krótszym terminie może wiązać się z opłatą zgodnie z regulaminem kliniki. Szczegółowe informacje znajdziesz w potwierdzeniu rezerwacji.',
      },
      {
        question: 'Czy przyjmujecie pacjentów niepełnoletnich?',
        answerText:
          'Zakres wiekowy pacjentów zależy od specjalistów współpracujących z kliniką. Obecnie skupiamy się głównie na pacjentach dorosłych. Przed umówieniem wizyty sprawdź informacje przy wybranym lekarzu lub terapeucie w systemie MyDr albo napisz do nas na kontakt@wisehealth.pl, aby dopytać o aktualne możliwości.',
      },
      {
        question: 'Czy mogę przyjść na wizytę bez skierowania?',
        answerText:
          'Tak, do WiseHealth nie potrzebujesz skierowania. Wystarczy umówić się na wizytę przez system rejestracji online.',
      },
      {
        question: 'Jak przygotować się do pierwszej wizyty?',
        answerText:
          'Przed pierwszą wizytą warto: zastanowić się nad obecnymi trudnościami i tym, co chciałbyś omówić; przygotować listę aktualnie przyjmowanych leków; zabrać ze sobą dokumentację medyczną, jeśli była wcześniejsza diagnostyka lub leczenie; przyjść kilka minut wcześniej, aby spokojnie wypełnić dokumenty.',
        answer: (
          <>
            <p>Przed pierwszą wizytą warto:</p>
            <ul>
              <li>Zastanowić się nad obecnymi trudnościami i tym, co chciałbyś omówić</li>
              <li>Przygotować listę aktualnie przyjmowanych leków (jeśli takie są)</li>
              <li>
                Zabrać ze sobą dokumentację medyczną, jeśli była wcześniejsza diagnostyka lub
                leczenie
              </li>
              <li>Przyjść kilka minut wcześniej, aby spokojnie wypełnić dokumenty</li>
            </ul>
          </>
        ),
      },
      {
        question: 'Jak szybko dostanę termin wizyty?',
        answerText:
          'Dostępne terminy widoczne są na bieżąco w kalendarzu rejestracji online MyDr. Jako niewielka poradnia zwykle proponujemy wizytę w ciągu kilku dni, a nie tygodni – aktualne wolne terminy najlepiej sprawdzić bezpośrednio w systemie rezerwacji.',
        withBooking: true,
      },
    ],
  },
  {
    title: 'Teleporady i konsultacje online',
    items: [
      {
        question: 'Czy mogę skorzystać z wizyty online?',
        answerText:
          'W wielu sytuacjach jest to możliwe, szczególnie jeśli chodzi o kontynuację leczenia czy omówienie bieżących trudności. Ostateczna decyzja należy jednak do lekarza lub terapeuty, który oceni, czy w danym przypadku konsultacja online będzie wystarczająca i bezpieczna.',
      },
      {
        question: 'Czy w trakcie teleporady mogę otrzymać e-receptę lub e-zwolnienie?',
        answerText:
          'Tak, wystawienie e-recepty lub e-zwolnienia jest możliwe podczas teleporady, jeśli lekarz uzna to za zasadne i zgodne z obowiązującymi przepisami. Sam fakt odbycia teleporady nie gwarantuje automatycznie wystawienia recepty czy zwolnienia – wszystko zależy od Twojej sytuacji zdrowotnej i oceny lekarza.',
      },
      {
        question: 'Jak przebiega wizyta online?',
        answerText:
          'Wizyta online odbywa się przez bezpieczną platformę wideo. Po zarezerwowaniu terminu otrzymasz link do konsultacji. Upewnij się, że masz stabilne połączenie internetowe, działającą kamerę i mikrofon oraz spokojne miejsce, gdzie nikt Ci nie przeszkodzi.',
        answer: (
          <>
            <p>
              Wizyta online odbywa się przez bezpieczną platformę wideo. Po zarezerwowaniu terminu
              otrzymasz link do konsultacji. Upewnij się, że masz:
            </p>
            <ul>
              <li>Stabilne połączenie internetowe</li>
              <li>Działającą kamerę i mikrofon</li>
              <li>Spokojne miejsce, gdzie nikt Ci nie przeszkodzi</li>
            </ul>
          </>
        ),
      },
      {
        question: 'Czy mogę skorzystać z konsultacji online spoza Krakowa?',
        answerText:
          'Tak. Teleporady i konsultacje wideo prowadzimy dla pacjentów z całej Polski. Gabinet stacjonarny znajduje się w Krakowie przy ul. Szlak 38/16, ale do wizyty online wystarczy komputer lub telefon z kamerą.',
      },
    ],
  },
  {
    title: 'Płatności i refundacje',
    items: [
      {
        question: 'Jak mogę zapłacić za wizytę?',
        answerText:
          'Płatność za wizytę możesz zrealizować poprzez system płatności online MyDr lub przelewem online – dane do przelewu znajdziesz w potwierdzeniu wizyty.',
        answer: (
          <>
            <p>Płatność za wizytę możesz dokonać:</p>
            <ul>
              <li>Poprzez system płatności online (MyDr)</li>
              <li>Przelewem online (dane do przelewu w potwierdzeniu wizyty)</li>
            </ul>
          </>
        ),
      },
      {
        question: 'Czy wizyty są refundowane przez NFZ?',
        answerText:
          'WiseHealth to prywatna poradnia, więc wizyty nie są refundowane przez NFZ. Po wizycie otrzymasz fakturę, którą możesz odliczyć od podatku w ramach ulgi rehabilitacyjnej lub przedstawić w prywatnym ubezpieczeniu zdrowotnym, jeśli Twoja polisa to obejmuje.',
      },
      {
        question: 'Ile kosztuje wizyta u psychiatry w WiseHealth?',
        answerText:
          'Pierwsza wizyta psychiatryczna (konsultacja diagnostyczna, ok. 45 minut) kosztuje 250 zł, kolejna wizyta psychiatryczna (50 minut) 300 zł, a krótka konsultacja kontrolna (15 minut) 200 zł. Wizyta psychologiczna lub sesja psychoterapii (50 minut) kosztuje 200 zł. Cennik ma charakter orientacyjny – aktualne ceny potwierdzisz w systemie rejestracji online.',
      },
    ],
  },
  {
    title: 'Bezpieczeństwo i sytuacje nagłe',
    items: [
      {
        question: 'Co zrobić w sytuacji nagłego zagrożenia życia lub zdrowia?',
        answerText:
          'W przypadku nasilonych myśli samobójczych, poczucia bezpośredniego zagrożenia życia lub zdrowia, gwałtownego pogorszenia stanu psychicznego lub innych nagłych objawów wymagających pilnej pomocy nie czekaj na wizytę w poradni. Zgłoś się bezpośrednio na najbliższy Szpitalny Oddział Ratunkowy lub zadzwoń pod numer alarmowy 112. Możesz też skorzystać z telefonu zaufania dla osób w kryzysie psychicznym 116 123 (całodobowo) lub telefonu zaufania dla młodzieży 116 111.',
        answer: (
          <>
            <p className="text--danger" style={{ fontWeight: 'bold', fontSize: '1.1rem' }}>
              W przypadku nasilonych myśli samobójczych, poczucia bezpośredniego zagrożenia życia
              lub zdrowia, gwałtownego pogorszenia stanu psychicznego lub innych nagłych objawów
              wymagających pilnej pomocy – nie czekaj na wizytę w poradni.
            </p>
            <p>
              Zgłoś się bezpośrednio na najbliższy Szpitalny Oddział Ratunkowy lub zadzwoń pod numer
              alarmowy <strong>112</strong>.
            </p>
            <p>Możesz również skorzystać z:</p>
            <ul>
              <li>
                <strong>Telefon zaufania dla osób w kryzysie psychicznym:</strong> 116 123
                (całodobowo)
              </li>
              <li>
                <strong>Telefon zaufania dla młodzieży:</strong> 116 111
              </li>
            </ul>
          </>
        ),
      },
      {
        question: 'Czy e-mail lub formularz kontaktowy mogą służyć do zgłaszania nagłych sytuacji?',
        answerText:
          'Nie. E-mail oraz formularz kontaktowy nie służą do udzielania pilnej pomocy medycznej. W sytuacji nagłej skorzystaj z numeru alarmowego 112 lub zgłoś się na SOR.',
        answer: (
          <p>
            <strong>Nie.</strong> E-mail oraz formularz kontaktowy nie służą do udzielania pilnej
            pomocy medycznej. W sytuacji nagłej skorzystaj z numeru alarmowego 112 lub zgłoś się na
            SOR.
          </p>
        ),
      },
    ],
  },
];

/** Flattened question/answer pairs for FAQPage structured data. */
export const FAQ_FLAT = FAQ_SECTIONS.flatMap((section) =>
  section.items.map((item) => ({ question: item.question, answer: item.answerText })),
);
