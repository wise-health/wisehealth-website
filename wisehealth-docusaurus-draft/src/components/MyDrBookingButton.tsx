// DRAFT: Example MyDr booking button component for WiseHealth.
// Verify and adapt before using in production.

import React from 'react';

export interface MyDrBookingButtonProps {
  label?: string;
  className?: string;
}

const MyDrBookingButton: React.FC<MyDrBookingButtonProps> = ({
  label = 'Umów wizytę online',
  className = '',
}) => {
  const handleClick = () => {
    const url =
      (typeof process !== 'undefined' &&
        process.env &&
        (process.env.MYDR_BOOKING_URL as string)) ||
      'https://mydr.pl/welcome';

    if (typeof window !== 'undefined') {
      window.open(url, '_blank', 'noopener,noreferrer');
    } else {
      console.warn('[MyDrBookingButton] window is not defined; cannot open booking URL.');
    }
  };

  return (
    <button
      type="button"
      onClick={handleClick}
      className={`button button--primary ${className}`.trim()}
    >
      {label}
    </button>
  );
};

export default MyDrBookingButton;
