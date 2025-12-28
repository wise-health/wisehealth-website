import React from 'react';
import Layout from '@theme/Layout';
import Link from '@docusaurus/Link';

export default function NotFound(): React.ReactNode {
    return (
        <Layout
            title="Nie znaleziono strony"
            description="Przepraszamy, ale strona której szukasz nie istnieje.">
            <main className="container margin-vert--xl">
                <div className="row">
                    <div className="col col--6 col--offset-3">
                        <h1 className="hero__title">Ups, strona nie znaleziona.</h1>
                        <p>
                            Przepraszamy, nie możemy znaleźć strony, której szukasz.
                            Możliwe, że zmieniła swoją lokalizację lub została usunięta.
                        </p>
                        <div className="margin-top--md">
                            <Link to="/" className="button button--primary button--lg">
                                Wróć na stronę główną
                            </Link>
                        </div>
                    </div>
                </div>
            </main>
        </Layout>
    );
}
