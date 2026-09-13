# WiseHealth – plan widoczności (SEO / local SEO)

Stan na: wrzesień 2026. Dokument operacyjny – kolejność zadań odpowiada
zwrotowi z włożonej pracy, a nie łatwości wykonania.

---

## Diagnoza (zweryfikowana, nie założona)

Sprawdzone bezpośrednio w wynikach wyszukiwania i na żywym serwisie:

| Obserwacja | Jak zweryfikowano |
|---|---|
| WiseHealth nie pojawia się w wynikach dla „poradnia zdrowia psychicznego Kraków” ani „psychiatra Kraków” | zapytania do wyszukiwarki – w top-10 wyłącznie konkurencja (PsychoMedic, MindHealth, PH Zdrowia, Centrum Dobrej Terapii) |
| Brak jakiejkolwiek analityki | brak `gtag`, `googletagmanager`, `plausible`, `umami`, `hotjar`, `clarity` w kodzie strony |
| Brak weryfikacji Google Search Console | brak metatagu `google-site-verification` |
| Structured data zawierało puste `"telephone": ""` | JSON-LD na stronie głównej – puste pole unieważnia rich result |
| Brak numeru telefonu w całym serwisie | `/kontakt`, `/faq`, strona główna – wyłącznie e-mail |
| Brak stron pod konkretne zapytania | sitemap: `/oferta`, `/cennik`, `/zespol` – nic pod „psychiatra Kraków” |
| FAQ bez schema FAQPage | 12 pytań na stronie, zero structured data |
| Profile ZnanyLekarz niepowiązane z marką | patrz niżej – to najważniejszy punkt |

### Najważniejsze pojedyncze odkrycie

Oboje założyciele mają profile w ZnanyLekarz z **kompletem piątek**:

- **Agnieszka Krawczyk** – ocena 5,0 / **20 opinii**.
  Profil wymienia adresy: Zabierzów, Dworska 13, Armii Krajowej 5.
  **Nie wymienia ul. Szlak ani WiseHealth.**
- **Marcin Pawlus** – ocena 5,0 / **8 opinii**.
  Profil **wymienia** Szlak 38/16 z aktywnym kalendarzem.
  **Nie wymienia nazwy WiseHealth.**

ZnanyLekarz to w Polsce podstawowy kanał, którym pacjenci szukają i rezerwują
wizyty u psychiatry – i jest to serwis, który realnie rankuje w Google na
zapytania typu „psychiatra Kraków”. Poradnia ma zatem 28 pięciogwiazdkowych
opinii, z których **marka nie czerpie żadnej korzyści**, bo nigdzie nie jest
powiązana. To zero złotych kosztu i największy pojedynczy lever.

---

## Zadania wymagające decyzji lub dostępów (priorytet 1–3)

Poniższych rzeczy nie da się zrobić z poziomu repozytorium.

### 1. Powiązać profile ZnanyLekarz z placówką WiseHealth

**Dlaczego:** przenosi istniejącą reputację (28 opinii, 5,0) na markę
i pod adres ul. Szlak 38/16, który ma rankować lokalnie.

**Co zrobić:**
1. Zalogować się na profil Agnieszki Krawczyk → *Moje adresy* → dodać nowy
   adres przyjęć: `WiseHealth, ul. Szlak 38/16, 31-153 Kraków`.
2. Upewnić się, że nazwa placówki wpisana jest **dokładnie** jako `WiseHealth`
   – identycznie jak na stronie i (docelowo) w Google Business Profile.
   Rozbieżność w nazwie = dwa różne byty dla Google.
3. To samo na profilu Marcina Pawlusa: adres już jest poprawny, należy
   uzupełnić/poprawić **nazwę placówki** na `WiseHealth`.
4. W opisie obu profili dodać zdanie z odnośnikiem do `wisehealth.pl`.

**Efekt uboczny:** strona już linkuje do obu profili (`/zespol`) wraz ze
structured data `sameAs`. Po uzupełnieniu profili powiązanie staje się
dwukierunkowe, co Google traktuje znacznie mocniej.

### 2. Google Business Profile

**Dlaczego:** bez GBP placówka nie ma prawa pojawić się w mapce lokalnej
(„local pack”) – czyli w trzech wynikach z mapą, które zbierają największy
ruch przy zapytaniach typu „psychiatra Kraków”.

**Co zrobić:**
1. Założyć profil na `business.google.com` dla:
   - Nazwa: `WiseHealth` (dokładnie tak, bez dopisków)
   - Kategoria główna: *Psychiatra* · dodatkowe: *Psycholog*, *Poradnia zdrowia psychicznego*
   - Adres: `ul. Szlak 38/16, 31-153 Kraków`
   - Godziny: pn–pt 9:00–20:00 (zgodnie ze structured data na stronie)
   - Strona: `https://wisehealth.pl`
2. Przejść weryfikację (pocztówka na adres lub telefon/wideo).
3. Dodać zdjęcia gabinetu i wejścia do budynku – realnie podnoszą konwersję
   przy wizytach stacjonarnych.
4. Po weryfikacji: poprosić pierwszych pacjentów o opinię w Google.

**Uwaga:** NAP (nazwa, adres, telefon) w GBP musi być **identyczny** jak na
stronie. Dane źródłowe do skopiowania: `src/data/clinic.ts`.

### 3. Decyzja: numer telefonu

**Obecny stan:** świadomy brak. `static/llms.txt` stwierdza wprost
„Brak infolinii telefonicznej”, a `/kontakt` obiecuje odpowiedź mailową
w ciągu 24–48 h.

**Problem:** cała konkurencja w wynikach prowadzi numerem (PsychoMedic
12 889 99 99, PH Zdrowia +48 571 940 842, MindHealth 22 566 22 24). Osoba
w kryzysie psychicznym nie wypełnia formularza i nie czeka dwóch dni.
Google Business Profile też działa wyraźnie lepiej z numerem.

**Opcje:**
- **(a)** Numer komórkowy z jasno zakomunikowanymi godzinami rejestracji.
- **(b)** Tani numer wirtualny / IVR przekierowujący na komórkę, z zapowiedzią
  „w sprawach nagłych – 112”.
- **(c)** Świadomie pozostać bez telefonu i mocniej eksponować, że rejestracja
  idzie wyłącznie online (wtedy warto skrócić deklarowany czas odpowiedzi
  mailowej z 24–48 h do np. 24 h w dni robocze).

**Gdy numer będzie znany:** wpisać go w JEDNYM miejscu – pole `telephone`
w `src/data/clinic.ts`. Strona kontaktu, structured data i wszystkie landingi
podchwycą go automatycznie. Dopóki pole jest puste, `telephone` jest
**pomijane** w JSON-LD (puste `""` unieważniałoby rich result).

---

## Co zostało już wdrożone w repozytorium

Branch: `seo/visibility-foundation`

### Strony pod konkretne zapytania

Strona rankuje na to, **o czym jest**. `/oferta` jest o wszystkim, więc nie
rankuje na nic. Każdy z poniższych landingów celuje w jedno zapytanie:

| Adres | Zapytanie docelowe | Uzasadnienie |
|---|---|---|
| `/psychiatra-krakow` | „psychiatra Kraków” | najwyższa intencja komercyjna lokalnie |
| `/psycholog-krakow` | „psycholog Kraków”, „psychoterapia Kraków” | szuka inna osoba niż psychiatry – wymaga osobnej strony |
| `/psychiatra-online` | „psychiatra online”, „teleporada psychiatryczna” | **jedyna strona, której rynek nie jest ograniczony wielkością gabinetu** |
| `/leczenie-depresji-krakow` | „leczenie depresji Kraków” | najwyższy wolumen wyszukiwań ze wszystkich haseł |

Każdy landing zawiera FAQPage schema, własne breadcrumbs i wskazuje na ten sam
identyfikator placówki (`#clinic`), więc strony wzmacniają jeden byt w Google
zamiast konkurować ze sobą.

**Dyscyplina treści (obowiązuje przy każdej nowej stronie medycznej):**
nie obiecujemy efektów leczenia, nie zachęcamy do autodiagnozy, zawsze
podajemy numery kryzysowe (112, 116 123, 116 111). Treści medyczne są
oceniane przez Google surowiej (YMYL) – i po prostu tak należy.

### Structured data

- Wspólny węzeł `MedicalClinic` + `LocalBusiness` z jednym `@id`.
- `Physician` dla obojga założycieli z `sameAs` → zweryfikowane profile ZnanyLekarz.
- `FAQPage` na `/faq` (15 pytań) i na każdym landingu.
- `BreadcrumbList` na podstronach.
- Puste `telephone` jest pomijane, nie emitowane jako `""`.

### Analityka – Plausible, nie Google Analytics

Świadomy wybór. To poradnia zdrowia psychicznego: wejście na
`/leczenie-depresji-krakow` to dana wrażliwa o osobie odwiedzającej.
Plausible nie używa cookies, nie zbiera danych osobowych ani identyfikatorów
międzywitrynowych – dzięki czemu:

1. nie wymaga zgody (RODO), więc **dane widzimy od 100% odwiedzających**, a nie
   tylko od tych, którzy kliknęli „Akceptuję”;
2. nigdy nie budujemy profilu tego, kto czytał co o własnym zdrowiu.

GA4 wymagałoby zgody (którą większość odrzuca – czyli i tak bylibyśmy ślepi)
i wysyłałoby te dane do kraju trzeciego.

**Włączenie** – zmienne środowiskowe w panelu Netlify:

```
PLAUSIBLE_DOMAIN          = wisehealth.pl
GOOGLE_SITE_VERIFICATION  = <token z Google Search Console>
```

Dopóki nie są ustawione, tagi nie są w ogóle emitowane (czyste buildy lokalne).
`plausible.io` jest już dopisane do CSP w `netlify.toml` – bez tego przeglądarka
po cichu zablokowałaby skrypt.

### Higiena techniczna

- `sitemap.xml`: 16 realnych adresów; wycięte cienkie listingi (tagi, autorzy,
  archiwum, `/markdown-page`, `/404`).
- `robots.txt`: deklaruje sitemap, blokuje listingi.
- Tytuły stron skrócone do budżetu ~65 znaków. Wcześniej do każdego tytułu
  doklejał się 47-znakowy tytuł serwisu, przez co w wynikach ucinało
  najważniejszą część (np. 119 znaków na stronie głównej).
- Poprawiona literówka w treści na żywo („myśliami” → „myślami”).

### Test regresji: `scripts/verify-seo.py`

```bash
npm run build && python3 scripts/verify-seo.py build
```

Sprawdza **wygenerowany HTML** (a nie kod źródłowy): długości tytułów
i opisów, dokładnie jeden `<h1>`, canonical, poprawność i kompletność
structured data, higienę sitemap. Obecnie **63 testy, wszystkie przechodzą**.

Ten test istnieje, bo regresje SEO są ciche – nic się nie wywala, gdy schema
się zepsuje, strony po prostu przestają rankować. Podczas wdrożenia wykrył
realny błąd (zdublowany sufiks tytułu), który build przepuścił bez słowa.

---

## Następne kroki (po wdrożeniu powyższego)

1. **Google Search Console** – zgłosić `sitemap.xml`, śledzić, na jakie
   zapytania strona zaczyna się wyświetlać. To zamyka pętlę: dziś decyzje
   podejmujemy bez żadnych danych.
2. **Treści blogowe w rytmie** – są 3 dobre wpisy. Warto dojść do ~2 wpisów
   miesięcznie, pisanych pod realne pytania pacjentów (np. „ile czeka się na
   psychiatrę”, „czy psychiatra powie mojemu pracodawcy”, „jak wygląda
   e-recepta na leki psychiatryczne”). Każdy wpis linkuje do właściwego
   landinga.
3. **Kolejne landingi po walidacji pierwszych czterech** – kandydaci:
   leczenie zaburzeń lękowych, bezsenność, wypalenie zawodowe, wsparcie po
   hospitalizacji.
4. **Zdjęcia gabinetu** – do GBP i na stronę kontaktu. Przy usłudze opartej
   na zaufaniu realnie wpływają na konwersję.
5. **Mierzyć rezerwacje, nie ruch** – ruch bez rezerwacji to próżność.
   Docelowo: zdarzenie w Plausible na kliknięcie „Umów wizytę online”.
