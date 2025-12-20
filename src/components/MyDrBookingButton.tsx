import React, { useEffect } from 'react';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';

export interface MyDrBookingButtonProps {
  label?: string;
  className?: string;
  variant?: 'primary' | 'secondary' | 'outline';
}

/**
 * MyDrBookingButton - przycisk do rezerwacji wizyt w systemie MyDr
 * 
 * Komponent otwiera stronę rezerwacji MyDr w nowej karcie.
 * Token i facility_id (26915) są zakodowane w JWT token.
 */
const MyDrBookingButton: React.FC<MyDrBookingButtonProps> = ({
  label = 'Umów wizytę online',
  className = '',
  variant = 'primary',
}) => {
  const { siteConfig } = useDocusaurusContext();
  
  const variantClass = variant === 'primary' 
    ? 'button--primary' 
    : variant === 'secondary'
    ? 'button--secondary'
    : 'button--outline';

  // Pobierz booking URL z customFields
  const customFields = siteConfig.customFields as { mydrBookingUrl?: string };
  const bookingUrl = customFields?.mydrBookingUrl || 'https://mydr.pl';

  const handleClick = () => {
    // Otwórz MyDr w nowej karcie z bezpiecznymi parametrami
    window.open(bookingUrl, '_blank', 'noopener,noreferrer');
  };

  return (
    <button
      type="button"
      onClick={handleClick}
      className={`button button--lg ${variantClass} ${className}`.trim()}
      aria-label={label}
    >
      {label}
    </button>
  );
};

export default MyDrBookingButton;
