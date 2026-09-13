import React from 'react';
import LandingPage from '@site/src/components/LandingPage';

/**
 * Target query: "psychiatra online" / "teleporada psychiatryczna" / "e-recepta
 * psychiatra online".
 *
 * Strategically the most important landing page: it is the only one whose
 * addressable market is not capped by the physical gabinet in Kraków.
 */
export default function PsychiatraOnline(): React.ReactNode {
  return (
    <LandingPage
      metaTitle="Psychiatra online – teleporada i e-recepta"
      metaDescription="Teleporada z lekarzem psychiatrą bez wychodzenia z domu. Możliwa e-recepta i e-zwolnienie. Pacjenci z całej Polski. Pierwsza wizyta 250 zł."
      path="/psychiatra-online"
      breadcrumbLabel="Psychiatra online"
      h1="Psychiatra online – konsultacja bez wychodzenia z domu"
      lead="Teleporady i konsultacje wideo z lekarzem psychiatrą oraz psychologiem, dla pacjentów z całej Polski. Ta sama opieka co w gabinecie – w miejscu, w którym czujesz się bezpiecznie."
      sections={[
        {
          heading: 'Dla kogo wizyta online sprawdza się najlepiej',
          bullets: [
            'Mieszkasz poza Krakowem lub za granicą i chcesz kontynuować leczenie po polsku',
            'Kontynuujesz rozpoczęte leczenie – wizyta kontrolna, ocena skuteczności, korekta dawki',
            'Masz ograniczoną mobilność, małe dziecko lub grafik, który nie pozwala na dojazd',
            'Lęk lub obniżony nastrój sprawiają, że wyjście z domu samo w sobie jest barierą',
            'Zależy Ci na dyskrecji i wolisz rozmawiać z własnego, znanego otoczenia',
          ],
        },
        {
          heading: 'Jak przebiega teleporada',
          body: [
            'Rezerwujesz termin w systemie rejestracji online, wybierając formę „online”. Po potwierdzeniu otrzymujesz link do bezpiecznej platformy wideo – nie musisz nic instalować ani zakładać dodatkowych kont.',
            'Sama wizyta wygląda jak rozmowa w gabinecie: pierwsza konsultacja psychiatryczna trwa ok. 45–60 minut, wizyta kontrolna ok. 15–30 minut. Dokumentacja prowadzona jest w systemie EDM MyDr.',
            'Przygotuj stabilne połączenie internetowe, działającą kamerę i mikrofon oraz spokojne miejsce, w którym nikt Ci nie przeszkodzi. Przydatna będzie też lista aktualnie przyjmowanych leków.',
          ],
        },
        {
          heading: 'E-recepta i e-zwolnienie przy wizycie online',
          body: [
            'Wystawienie e-recepty lub e-zwolnienia podczas teleporady jest możliwe, jeśli lekarz uzna to za zasadne i zgodne z obowiązującymi przepisami. E-receptę odbierasz jako kod SMS lub w Internetowym Koncie Pacjenta, a e-zwolnienie trafia do pracodawcy i ZUS elektronicznie.',
            'Ważne i mówimy to wprost: sam fakt umówienia teleporady nie gwarantuje wystawienia recepty ani zwolnienia. Decyzja zawsze należy do lekarza i zależy od Twojej sytuacji zdrowotnej.',
          ],
        },
        {
          heading: 'Kiedy wizyta online nie wystarczy',
          body: [
            'Ze względów bezpieczeństwa i obowiązujących przepisów nie każdą sytuację da się w pełni zaopiekować zdalnie. Przy pierwszej diagnozie o złożonym obrazie, nasilonych objawach lub konieczności badania fizykalnego lekarz może zaproponować wizytę stacjonarną w gabinecie przy ul. Szlak 38 w Krakowie.',
            'W sytuacji nagłego zagrożenia życia lub zdrowia teleporada nie jest właściwą drogą – zgłoś się na Szpitalny Oddział Ratunkowy lub zadzwoń pod numer 112. Całodobowy telefon zaufania dla osób w kryzysie psychicznym: 116 123.',
          ],
        },
      ]}
      faqs={[
        {
          question: 'Czy konsultacja psychiatryczna online jest tak samo skuteczna jak stacjonarna?',
          answer:
            'W wielu sytuacjach tak – szczególnie przy kontynuacji leczenia, wizytach kontrolnych i omawianiu bieżących trudności. Ostateczną decyzję o odpowiedniej formie wizyty podejmuje lekarz, który oceni, czy konsultacja online będzie w Twoim przypadku wystarczająca i bezpieczna.',
        },
        {
          question: 'Ile kosztuje wizyta psychiatryczna online?',
          answer:
            'Ceny są takie same jak w gabinecie: pierwsza wizyta psychiatryczna 250 zł (ok. 45 minut), kolejna wizyta 300 zł (50 minut), krótka konsultacja kontrolna 200 zł (15 minut), wizyta psychologiczna 200 zł (50 minut).',
        },
        {
          question: 'Czy mogę umówić się na teleporadę spoza Krakowa?',
          answer:
            'Tak. Wizyty online prowadzimy dla pacjentów z całej Polski. Gabinet stacjonarny znajduje się w Krakowie, ale do konsultacji online wystarczy komputer lub telefon z kamerą.',
        },
        {
          question: 'Jak zapłacę za wizytę online?',
          answer:
            'Płatność realizujesz przez system płatności online MyDr w momencie rezerwacji wizyty lub przelewem – dane do przelewu znajdziesz w potwierdzeniu.',
        },
        {
          question: 'Czy potrzebuję skierowania na teleporadę psychiatryczną?',
          answer:
            'Nie. Do psychiatry nie potrzebujesz skierowania – zarówno na wizytę stacjonarną, jak i online.',
        },
      ]}
      ctaHeading="Umów teleporadę psychiatryczną"
      ctaBody="Wybierz termin i formę „online” w kalendarzu rejestracji. Link do konsultacji dostaniesz razem z potwierdzeniem."
    />
  );
}
