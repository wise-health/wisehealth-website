import React, { useState, useEffect } from 'react';
import Link from '@docusaurus/Link';

export default function CookieBanner() {
    const [isVisible, setIsVisible] = useState(false);

    useEffect(() => {
        const consent = localStorage.getItem('cookie-consent');
        if (!consent) {
            setIsVisible(true);
        }
    }, []);

    const handleAccept = () => {
        localStorage.setItem('cookie-consent', 'true');
        setIsVisible(false);
    };

    if (!isVisible) {
        return null;
    }

    return (
        <div className="cookie-banner">
            <div className="cookie-banner__content">
                <p>
                    Ta strona używa plików cookies w celu świadczenia usług na najwyższym poziomie.
                    Dalsze korzystanie ze strony oznacza, że zgadzasz się na ich użycie.
                </p>
            </div>
            <div className="cookie-banner__actions">
                <Link to="/polityka-prywatnosci" className="button button--link button--sm">
                    Polityka Prywatności
                </Link>
                <button className="button button--primary button--sm" onClick={handleAccept}>
                    Akceptuję
                </button>
            </div>
        </div>
    );
}
