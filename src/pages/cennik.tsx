import React from 'react';
import Layout from '@theme/Layout';
import Heading from '@theme/Heading';
import MyDrBookingButton from '@site/src/components/MyDrBookingButton';

interface PriceRowProps {
  name: string;
  duration: string;
  price: string;
  notes: string;
}

function PriceRow({ name, duration, price, notes }: PriceRowProps) {
  return (
    <tr>
      <td>{name}</td>
      <td>{duration}</td>
      <td>{price}</td>
      <td>{notes}</td>
    </tr>
  );
}

export default function CennikPage(): React.ReactNode {
  return (
    <Layout
      title="Cennik"
      description="Cennik usług WiseHealth – psychiatria i psychologia Kraków">
      <main className="container margin-vert--lg">
        <Heading as="h1">Cennik</Heading>
        <p className="margin-bottom--lg">
          Poniższy cennik ma charakter orientacyjny i stanowi punkt wyjścia do ustalenia kosztów
          wizyt. Ostateczna cena może zależeć od rodzaju wizyty, czasu trwania oraz indywidualnych
          ustaleń z pacjentem.
        </p>

        <div className="card margin-bottom--lg">
          <div className="card__header">
            <Heading as="h2">Cennik wizyt</Heading>
          </div>
          <div className="card__body">
            <table className="table">
              <thead>
                <tr>
                  <th>Usługa</th>
                  <th>Czas trwania</th>
                  <th>Cena (PLN)</th>
                  <th>Uwagi</th>
                </tr>
              </thead>
              <tbody>
                <PriceRow
                  name="🩺 Pierwsza wizyta (konsultacja diagnostyczna + pierwsza wizyta)"
                  duration="ok. 45 min"
                  price="250 zł"
                  notes="kompleksowa ocena, ustalenie planu terapii"
                />
                <PriceRow
                  name="💊 Wizyta psychiatryczna"
                  duration="50 min"
                  price="300 zł"
                  notes="konsultacja z lekarzem psychiatrą, farmakoterapia"
                />
                <PriceRow
                  name="⏱️ Krótka konsultacja psychiatryczna"
                  duration="15 min"
                  price="200 zł"
                  notes="wizyta kontrolna, omówienie kuracji, przedłużenie recepty"
                />
                <PriceRow
                  name="🧠 Wizyta psychologiczna"
                  duration="50 min"
                  price="200 zł"
                  notes="sesja psychoterapeutyczna indywidualna"
                />
                <PriceRow
                  name="🏠 Wizyta domowa"
                  duration="wg. ustaleń"
                  price="+ 100 zł"
                  notes="dodatkowo do ceny wizyty, dojazd do pacjenta"
                />
              </tbody>
            </table>
          </div>
        </div>

        <section className="margin-top--lg">
          <div className="card">
            <div className="card__body">
              <Heading as="h3">Informacje dodatkowe</Heading>
              <ul>
                <li>Płatność za wizytę następuje w momencie rezerwacji wizyty.</li>
                <li>W przypadku wizyty domowej doliczana jest opłata za dojazd (100 zł w obrębie Krakowa).</li>
                <li>Wizyty można odwołać lub przełożyć z minimum 24-godzinnym wyprzedzeniem bez dodatkowych opłat.</li>
                <li>Odwołanie wizyty w krótszym terminie może wiązać się z opłatą zgodnie z regulaminem.</li>
                <li>Aktualne ceny oraz dostępność wizyt znajdziesz w systemie rejestracji online MyDr.</li>
              </ul>
            </div>
          </div>
        </section>

        <section className="margin-top--xl margin-bottom--xl">
          <div className="card">
            <div className="card__body text--center">
              <Heading as="h2">Umów wizytę</Heading>
              <p>
                Aby poznać dostępne terminy i potwierdzić aktualne ceny, przejdź do rejestracji online.
              </p>
              <MyDrBookingButton className="margin-top--md" />
            </div>
          </div>
        </section>
      </main>
    </Layout>
  );
}
