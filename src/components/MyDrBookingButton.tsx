import React, { useEffect, useRef, useState } from 'react';
import { createPortal } from 'react-dom';
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
  /** Show the phone/e-mail line under the button (a human fallback, always on by default). */
  showFallback?: boolean;
}

type BookingStatus = 'checking' | 'up' | 'down' | 'unknown';

/**
 * Is MyDr online booking usable right now? Asked once per page load and shared
 * by every button. `/api/mydr-status` (netlify/functions/mydr-status.mjs)
 * probes the exact MyDr endpoint the widget calls first — the browser cannot,
 * because mydr.pl/api sends no CORS headers.
 *   up      → MyDr accepts the token: load the widget as normal
 *   down    → MyDr rejects it (e.g. 401 on 2026-10-07): never open the blank
 *             widget; show our own dialog with phone + e-mail instead
 *   unknown → probe unavailable (local dev, function error): behave as before
 * Recovery is automatic: once MyDr answers 200 the widget comes back within
 * about a minute (CDN cache), with no redeploy.
 */
let statusPromise: Promise<BookingStatus> | null = null;
function getBookingStatus(token: string): Promise<BookingStatus> {
  if (!statusPromise) {
    statusPromise = (async (): Promise<BookingStatus> => {
      try {
        const ctrl = new AbortController();
        const timer = window.setTimeout(() => ctrl.abort(), 3500);
        const res = await fetch(`/api/mydr-status?token=${encodeURIComponent(token)}`, {
          signal: ctrl.signal,
        });
        window.clearTimeout(timer);
        if (!res.ok) return 'unknown';
        const body = (await res.json()) as { up?: boolean };
        return body.up === true ? 'up' : body.up === false ? 'down' : 'unknown';
      } catch {
        return 'unknown';
      }
    })();
  }
  return statusPromise;
}

const MYDR_SCRIPT = 'https://mydr.pl/static/mydr-pp.min.js';
const MYDR_APP = 'https://plugin.mydr.pl/patients_plugin';
const MYDR_STATIC = 'https://mydr.pl/static';

/**
 * One MyDr plugin instance per page, driven EXPLICITLY from our click handler.
 *
 * Why not let the plugin bind itself: its init() does `button.onclick =
 * openModal`, and React DOM overwrites `element.onclick` with a no-op whenever
 * a component re-renders with a new onClick (an iOS Safari workaround). The
 * old component never re-rendered so it happened to work; anything stateful
 * silently kills booking. So we set up only the plugin's root + styles and
 * call openModal() ourselves — one deterministic path, no stacked windows.
 */
let plugin: { openModal: (e: { target: HTMLElement }) => void } | null = null;
function ensurePlugin(): typeof plugin {
  if (plugin || typeof window.PatientsPlugin === 'undefined') return plugin;
  try {
    const pp = new window.PatientsPlugin();
    if (typeof pp.createStyles === 'function' && typeof pp.createRoot === 'function') {
      pp.appHost = MYDR_APP;
      pp.pluginHost = MYDR_STATIC;
      pp.createStyles();
      pp.createRoot();
    } else {
      // Plugin internals changed: fall back to its documented init().
      pp.init({ app: MYDR_APP, plugin: MYDR_STATIC });
    }
    plugin = typeof pp.openModal === 'function' ? pp : null;
  } catch (error) {
    console.error('Error initializing PatientsPlugin:', error);
    plugin = null;
  }
  return plugin;
}

/** Load the MyDr script once per page; onReady fires when it is usable. */
function loadPlugin(onReady: (ok: boolean) => void): void {
  if (typeof window.PatientsPlugin !== 'undefined') {
    onReady(!!ensurePlugin());
    return;
  }
  let script = document.querySelector<HTMLScriptElement>(`script[src="${MYDR_SCRIPT}"]`);
  if (!script) {
    script = document.createElement('script');
    script.src = MYDR_SCRIPT;
    script.async = true;
    document.head.appendChild(script);
  }
  script.addEventListener('load', () => onReady(!!ensurePlugin()));
  script.addEventListener('error', () => {
    console.error('Failed to load MyDr script');
    onReady(false);
  });
}

/** Shown instead of the MyDr window whenever online booking cannot work. */
function BookingUnavailableDialog({ reason, onClose }: { reason: 'down' | 'loading'; onClose: () => void }) {
  const closeRef = useRef<HTMLButtonElement>(null);
  useEffect(() => {
    closeRef.current?.focus();
    const onKey = (e: KeyboardEvent) => e.key === 'Escape' && onClose();
    document.addEventListener('keydown', onKey);
    return () => document.removeEventListener('keydown', onKey);
  }, [onClose]);
  return (
    <div className="booking-dialog__overlay" onClick={onClose}>
      <div
        className="booking-dialog"
        role="dialog"
        aria-modal="true"
        aria-labelledby="booking-dialog-title"
        onClick={(e) => e.stopPropagation()}>
        <h2 id="booking-dialog-title" className="booking-dialog__title">
          {reason === 'down' ? 'Rejestracja online jest chwilowo niedostępna' : 'Rejestracja online jeszcze się ładuje'}
        </h2>
        <p>
          {reason === 'down'
            ? 'Przepraszamy – system rejestracji MyDr nie odpowiada. Umówimy Cię telefonicznie:'
            : 'Spróbuj ponownie za chwilę albo umów wizytę telefonicznie:'}
        </p>
        <a
          className="button button--primary button--lg booking-dialog__call plausible-event-name=Phone+Click"
          href={`tel:${CLINIC.telephone}`}>
          Zadzwoń: {CLINIC.telephoneDisplay}
        </a>
        <p className="booking-dialog__meta">
          Recepcja: {CLINIC.openingHours.display}
          <br />
          lub napisz: <a href={`mailto:${CLINIC.email}`}>{CLINIC.email}</a>
        </p>
        <p className="booking-dialog__emergency">
          W sytuacji zagrożenia życia dzwoń na 112.
        </p>
        <button ref={closeRef} type="button" className="button button--link booking-dialog__close" onClick={onClose}>
          Zamknij
        </button>
      </div>
    </div>
  );
}

/**
 * MyDrBookingButton – przycisk rezerwacji wizyt w systemie MyDr.
 * Token widgetu (facility_id 26915) jest publiczny z założenia – widget nie
 * działa bez niego w HTML strony. To NIE jest client_secret API MyDr.
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
  const openingRef = useRef(false);
  const [status, setStatus] = useState<BookingStatus>('checking');
  const [pluginReady, setPluginReady] = useState(false);
  const [dialog, setDialog] = useState<null | 'down' | 'loading'>(null);

  const variantClass = variant === 'primary'
    ? 'button--primary'
    : variant === 'secondary'
    ? 'button--secondary'
    : 'button--outline';

  useEffect(() => {
    let alive = true;
    const token = buttonRef.current?.dataset.token ?? '';
    getBookingStatus(token).then((s) => {
      if (!alive) return;
      setStatus(s);
      if (s !== 'down') loadPlugin((ok) => alive && setPluginReady(ok));
    });
    return () => {
      alive = false;
    };
  }, []);

  const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    if (status === 'down') {
      setDialog('down');
      return;
    }
    const pp = pluginReady ? plugin : null;
    if (!pp) {
      setDialog('loading');
      return;
    }
    // One MyDr window at a time: ignore clicks while one is open or opening
    // (previously 3 quick clicks stacked 3 windows that kept reappearing).
    if (openingRef.current || document.querySelector('.mydr-pp-modal')) return;
    openingRef.current = true;
    window.setTimeout(() => {
      openingRef.current = false;
    }, 1500);
    pp.openModal({ target: e.currentTarget });
  };

  const eventClass = status === 'down'
    ? 'plausible-event-name=Booking+Unavailable'
    : 'plausible-event-name=Booking+Click';

  return (
    // display:contents keeps layout identical; the status lives here because
    // MyDr copies every data-* attribute of the button into its booking URL.
    <span className="booking-cta" data-booking-status={status} style={{ display: 'contents' }}>
    <button
      ref={buttonRef}
      type="button"
      className={`wh-booking-button ${eventClass} button button--lg ${variantClass} ${className}`.trim()}
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
    {/*
      Portal to <body>: the dialog must never live inside page layout. A
      transformed ancestor (e.g. `.card:hover { transform }`) turns
      position:fixed into "fixed to that card", so the overlay snapped between
      card-size and full-screen as the cursor moved — the 2026-10-08 flicker.
    */}
    {dialog && createPortal(
      <BookingUnavailableDialog reason={dialog} onClose={() => setDialog(null)} />,
      document.body,
    )}
    </span>
  );
};

// Rozszerzenie typu Window o PatientsPlugin
declare global {
  interface Window {
    PatientsPlugin: any;
  }
}

export default MyDrBookingButton;
