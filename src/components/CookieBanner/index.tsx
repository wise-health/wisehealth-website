import React, { useState, useEffect } from 'react';
import Link from '@docusaurus/Link';

/**
 * Informational notice, NOT a consent banner.
 *
 * Storage inventory (clean browser, 2026-10-07): the site sets no cookies and
 * no local/session storage before interaction, and opening the MyDr booking
 * window added none on wisehealth.pl. Nothing here requires consent, so the
 * old "dalsze korzystanie oznacza zgodę" wording (not valid consent under
 * RODO art. 7 / PKE art. 399, and untrue) is gone. If a consent-requiring
 * vendor is ever added, replace this with equal-prominence Accept/Reject and
 * do not load that vendor before consent.
 */
const KEY = 'wh-notice-dismissed';

export default function CookieBanner() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    try {
      localStorage.removeItem('cookie-consent'); // legacy key from the old banner
      if (!localStorage.getItem(KEY)) setIsVisible(true);
    } catch {
      /* storage blocked: just don't show the notice */
    }
  }, []);

  if (!isVisible) return null;

  const dismiss = () => {
    try {
      localStorage.setItem(KEY, '1');
    } catch {
      /* ignore */
    }
    setIsVisible(false);
  };

  return (
    <div className="cookie-banner" role="region" aria-label="Informacja o plikach cookies">
      <p className="cookie-banner__content">
        Nie używamy cookies analitycznych ani reklamowych – tylko mechanizmów niezbędnych do
        działania strony i rezerwacji online.{' '}
        <Link to="/polityka-prywatnosci">Szczegóły</Link>
      </p>
      <button className="button button--primary button--sm cookie-banner__button" onClick={dismiss}>
        Rozumiem
      </button>
    </div>
  );
}
