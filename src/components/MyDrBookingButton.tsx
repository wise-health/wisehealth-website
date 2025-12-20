import React, { useEffect, useRef } from 'react';

export interface MyDrBookingButtonProps {
  label?: string;
  className?: string;
  variant?: 'primary' | 'secondary' | 'outline';
  doctor?: string;
  speciality?: string;
  visitKind?: string;
  evisit?: boolean;
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
      if (window.PatientsPlugin) {
        try {
          const PatientsPlugin = new window.PatientsPlugin();
          PatientsPlugin.init({
            app: 'https://mydr.pl/patients_plugin',
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
      if (window.PatientsPlugin) {
        try {
          const PatientsPlugin = new window.PatientsPlugin();
          PatientsPlugin.init({
            app: 'https://mydr.pl/patients_plugin',
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

  return (
    <button
      ref={buttonRef}
      type="button"
      className={`btn-mydr-pp button button--lg ${variantClass} ${className}`.trim()}
      data-doctor={doctor}
      data-speciality={speciality}
      data-visitkind={visitKind}
      data-evisit={evisit ? 'true' : 'false'}
      data-appname="drw"
      data-token="eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJmYWNpbGl0eV9pZCI6MjY5MTV9.AkNeyST-oY_lzpL9AXCtwaauKJb3AVPFiUU7BxWLH2s"
      aria-label={label}
      style={{ cursor: 'pointer' }}
    >
      {label}
    </button>
  );
};

// Rozszerzenie typu Window o PatientsPlugin
declare global {
  interface Window {
    PatientsPlugin: any;
  }
}

export default MyDrBookingButton;
