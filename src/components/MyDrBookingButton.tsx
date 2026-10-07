import React, { useEffect, useRef } from 'react';
import ClinicPhone from '@site/src/components/ClinicPhone';
import { CLINIC } from '@site/src/data/clinic';

export interface MyDrBookingButtonProps {
  label?: string;
  className?: string;
  variant?: 'primary' | 'secondary' | 'outline';
  doctor?: string;
  speciality?: string;
  visitKind?: string;
  evisit?: boolean;
  /**
   * Show the phone/e-mail line under the button. On by default: the widget
   * runs inside a cross-origin iframe, so the page cannot detect when it fails
   * (2026-10-07 it rendered blank on a MyDr 401) — a visible human fallback is
   * the only reliable one.
   */
  showFallback?: boolean;
}

/**
 * MyDrBookingButton - przycisk do rezerwacji wizyt w systemie MyDr
 * 
 * Komponent integruje widget MyDr do rezerwacji wizyt.
 * Token i facility_id (26915) są zakodowane w JWT token.
 */
const MyDrBookingButton: React.FC<MyDrBookingButtonProps> = ({
  label = 'Umów wizytę online',
  className = '',
  variant = 'primary',
  doctor = '',
  speciality = '',
  visitKind = 'Prywatna',
  evisit = true,
  showFallback = true,
}) => {
  const buttonRef = useRef<HTMLButtonElement>(null);
  const scriptLoadedRef = useRef(false);

  const variantClass = variant === 'primary' 
    ? 'button--primary' 
    : variant === 'secondary'
    ? 'button--secondary'
    : 'button--outline';

  useEffect(() => {
    // Załaduj skrypt MyDr tylko raz
    if (scriptLoadedRef.current || typeof window === 'undefined') {
      return;
    }

    const existingScript = document.querySelector('script[src="https://mydr.pl/static/mydr-pp.min.js"]');
    if (existingScript) {
      scriptLoadedRef.current = true;
      // Jeśli skrypt już istnieje, zainicjalizuj plugin
      if (typeof window.PatientsPlugin !== 'undefined') {
        try {
          new window.PatientsPlugin().init({
            app: 'https://plugin.mydr.pl/patients_plugin',
            plugin: 'https://mydr.pl/static',
          });
        } catch (error) {
          console.error('Error initializing PatientsPlugin:', error);
        }
      }
      return;
    }

    const script = document.createElement('script');
    script.src = 'https://mydr.pl/static/mydr-pp.min.js';
    script.async = true;

    script.onload = () => {
      scriptLoadedRef.current = true;
      if (typeof window.PatientsPlugin !== 'undefined') {
        try {
          new window.PatientsPlugin().init({
            app: 'https://plugin.mydr.pl/patients_plugin',
            plugin: 'https://mydr.pl/static',
          });
          console.log('MyDr PatientsPlugin initialized successfully');
        } catch (error) {
          console.error('Error initializing PatientsPlugin:', error);
        }
      } else {
        console.error('PatientsPlugin not found after script load');
      }
    };

    script.onerror = () => {
      console.error('Failed to load MyDr script');
    };

    const firstScript = document.getElementsByTagName('script')[0];
    if (firstScript && firstScript.parentNode) {
      firstScript.parentNode.insertBefore(script, firstScript);
    }

    return () => {
      // Cleanup not needed
    };
  }, []);

  const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    // Rapid repeat clicks stacked one MyDr modal per click (E0 recon: 3 clicks
    // = 3 iframes, the hidden ones reappearing later). Disabling the button
    // briefly stops the follow-up clicks reaching the plugin at all; the
    // current click has already been dispatched.
    const btn = e.currentTarget;
    btn.disabled = true;
    window.setTimeout(() => {
      btn.disabled = false;
    }, 2000);

    // Fallback: if widget doesn't work, open MyDr directly
    if (!scriptLoadedRef.current || typeof window.PatientsPlugin === 'undefined') {
      e.preventDefault();
      window.open('https://mydr.pl/placowka/wisehealth-twoja-droga-do-lepszego-samopoczucia-26915', '_blank');
    }
  };

  return (
    <>
    <button
      ref={buttonRef}
      type="button"
      className={`btn-mydr-pp button button--lg plausible-event-name=Booking+Click ${variantClass} ${className}`.trim()}
      data-doctor={doctor}
      data-speciality={speciality}
      data-visitkind={visitKind}
      data-evisit={evisit ? 'true' : 'false'}
      data-appname="drw"
      data-token="eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJmYWNpbGl0eV9pZCI6MjY5MTV9.AkNeyST-oY_lzpL9AXCtwaauKJb3AVPFiUU7BxWLH2s"
      onClick={handleClick}
      aria-label={label}
      style={{ cursor: 'pointer' }}
    >
      {label}
    </button>
    {showFallback && (
      <p className="booking-fallback">
        Problem z rejestracją online? Zadzwoń: <ClinicPhone /> lub napisz:{' '}
        <a href={`mailto:${CLINIC.email}`}>{CLINIC.email}</a>
      </p>
    )}
    </>
  );
};

// Rozszerzenie typu Window o PatientsPlugin
declare global {
  interface Window {
    PatientsPlugin: any;
  }
}

export default MyDrBookingButton;
