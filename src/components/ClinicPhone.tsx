import React from 'react';
import clsx from 'clsx';
import { CLINIC } from '@site/src/data/clinic';

/**
 * The clinic phone as a tel: link. Deliberately a plain text link, never a
 * button: online booking (MyDr) is the primary path and the phone is the
 * secondary, human fallback. The `plausible-event-name=Phone+Click` class is
 * Plausible's tagged-event hook — it counts calls started from the site
 * without sending any personal data.
 */
export default function ClinicPhone({ className }: { className?: string }): React.ReactNode {
  return (
    <a
      href={`tel:${CLINIC.telephone}`}
      className={clsx('plausible-event-name=Phone+Click', className)}
      style={{ whiteSpace: 'nowrap' }}>
      {CLINIC.telephoneDisplay}
    </a>
  );
}
