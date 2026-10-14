import React from 'react';
import clsx from 'clsx';
import { CLINIC } from '@site/src/data/clinic';

/**
 * The clinic phone as a tel: link. Deliberately a plain text link, never a
 * button: online booking (MyDr) is the primary path and the phone is the
 * secondary, human fallback. `data-umami-event` counts calls started from the
 * site (cookieless analytics, no personal data — see src/data/analytics.ts).
 */
export default function ClinicPhone({ className }: { className?: string }): React.ReactNode {
  return (
    <a
      href={`tel:${CLINIC.telephone}`}
      className={clsx(className)}
      data-umami-event="Phone Click"
      style={{ whiteSpace: 'nowrap' }}>
      {CLINIC.telephoneDisplay}
    </a>
  );
}
