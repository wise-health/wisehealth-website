import React from 'react';
import LandingPage from '@site/src/components/LandingPage';

/**
 * Target query: "psycholog Kraków" / "psychoterapia Kraków".
 * Paired with /psychiatra-krakow — the two roles are searched separately and
 * by different people, so they need separate pages.
 */
export default function PsychologKrakow(): React.ReactNode {
  return (
    <LandingPage
      metaTitle="Psycholog i psychoterapeuta Kraków"
      metaDescription="Psycholog w Krakowie, ul. Szlak 38. Konsultacje i psychoterapia dorosłych – lęk, obniżony nastrój, kryzysy, relacje. Stacjonarnie i online. Wizyta 200 zł."
      path="/psycholog-krakow"
      breadcrumbLabel="Psycholog Kraków"
      h1="Psycholog i psychoterapeuta w Krakowie"
      lead="Konsultacje psychologiczne i psychoterapia indywidualna dla osób dorosłych – w gabinecie przy ul. Szlak 38 w centrum Krakowa lub online. Prowadzi mgr Marcin Pawlus, psycholog i psychoterapeuta."
      sections={[
        {
          heading: 'Z czym można przyjść do psychologa',
          body: [
            'Nie trzeba mieć diagnozy ani „wystarczająco poważnego” problemu, żeby skorzystać z konsultacji psychologicznej. Wystarczy, że coś w Twoim życiu przestało działać tak, jak chcesz.',
          ],
          bullets: [
            'Lęk, napięcie, zamartwianie się, trudność z wyciszeniem',
            'Obniżony nastrój, brak energii, utrata sensu i motywacji',
            'Kryzysy życiowe: rozstanie, żałoba, utrata pracy, wypalenie zawodowe',
            'Trudności w relacjach – konflikty w związku, samotność, problemy w komunikacji',
            'Niskie poczucie własnej wartości, samokrytyka, perfekcjonizm',
            'Potrzeba lepszego rozumienia siebie i swoich reakcji',
          ],
        },
        {
          heading: 'Konsultacja psychologiczna a psychoterapia',
          body: [
            'Pierwsze spotkanie to konsultacja: rozmowa o Twojej sytuacji, oczekiwaniach i o tym, czy dana forma pracy będzie dla Ciebie odpowiednia. Zwykle potrzeba jednej do trzech takich rozmów, żeby wspólnie ustalić cele i sposób pracy.',
            'Psychoterapia to regularne spotkania – najczęściej raz w tygodniu lub co dwa tygodnie, po 50–60 minut – ukierunkowane na konkretny obszar: nastrój, lęk, relacje, stres czy poczucie własnej wartości. Czas trwania zależy od celu; ustalamy go wspólnie i weryfikujemy po drodze.',
            'Jeśli w trakcie okaże się, że pomocna byłaby także konsultacja psychiatryczna – na przykład przy nasilonych objawach lub rozważaniu farmakoterapii – możemy ją zaproponować wewnątrz poradni, bez szukania specjalisty od nowa.',
          ],
        },
        {
          heading: 'Psycholog czy psychiatra – od czego zacząć',
          body: [
            'Ogólna zasada: psychiatra to lekarz – potrzebny, gdy rozważasz leczenie farmakologiczne, potrzebujesz recepty, zwolnienia lub diagnozy medycznej. Psycholog i psychoterapeuta pracują z emocjami, myślami i zachowaniami – bez leków lub równolegle z leczeniem.',
            'Te ścieżki się nie wykluczają, a często najlepiej działają razem. Jeśli nie masz pewności, od czego zacząć, umów ogólną konsultację wstępną – wspólnie ustalimy dalsze kroki.',
          ],
        },
      ]}
      faqs={[
        {
          question: 'Ile kosztuje wizyta u psychologa w Krakowie?',
          answer:
            'W WiseHealth konsultacja psychologiczna oraz sesja psychoterapii indywidualnej (ok. 50 minut) kosztuje 200 zł. Cennik jest orientacyjny – aktualne ceny potwierdzisz przy rezerwacji online.',
        },
        {
          question: 'Ile trwa psychoterapia?',
          answer:
            'To zależy od celu pracy. Terapia skupiona na konkretnym problemie może zająć kilkanaście spotkań, praca nad głębszymi wzorcami trwa dłużej. Ramy ustalamy wspólnie na początku i weryfikujemy w trakcie.',
        },
        {
          question: 'Czy sesje psychoterapii mogą odbywać się online?',
          answer:
            'Tak. Konsultacje i sesje online prowadzimy przez bezpieczną platformę wideo, dla pacjentów z całej Polski. Potrzebujesz stabilnego internetu, kamery, mikrofonu i miejsca, w którym nikt Ci nie przeszkodzi.',
        },
        {
          question: 'Czy to, o czym mówię, pozostaje poufne?',
          answer:
            'Tak. Psychologa i psychoterapeutę obowiązuje tajemnica zawodowa. Wyjątki są ściśle określone przepisami i dotyczą przede wszystkim bezpośredniego zagrożenia życia lub zdrowia.',
        },
      ]}
      ctaHeading="Umów konsultację psychologiczną"
      ctaBody="Pierwszy krok to zwykła rozmowa. Wybierz termin w kalendarzu online – stacjonarnie w Krakowie lub online."
    />
  );
}
