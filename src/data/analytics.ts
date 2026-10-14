/**
 * Site analytics: self-hosted Umami (WiseHealth's IT provider, EU server).
 *
 * Why Umami and not Google Analytics: this is a mental-health clinic. Pages
 * like /leczenie-depresji-krakow reveal sensitive information about the
 * reader. Umami is cookieless, stores no personal data and no cross-site
 * identifiers (visitor hash with a daily-rotating salt), so no consent banner
 * is required and we never build a profile of who read what about their health.
 *
 * The website id is public by design (it ships in every page). The script and
 * endpoint use neutral names (/wh-insights/insights.js, /api/event) because
 * ad-blockers match "umami" paths and would hide most of the signal.
 *
 * Events (goals the content planner optimises for):
 *   Booking Click        online booking opened (MyDr up)
 *   Booking Unavailable  booking clicked while MyDr was down (lost online booking)
 *   Phone Click          a call started from the site
 */
export const ANALYTICS = {
  scriptSrc: 'https://recipes.wisechef.ai/wh-insights/insights.js',
  origin: 'https://recipes.wisechef.ai',
  websiteId: '7b08ed61-2c47-4b40-b67c-d78d356837a7',
} as const;

export type AnalyticsEvent = 'Booking Click' | 'Booking Unavailable' | 'Phone Click';

declare global {
  interface Window {
    umami?: { track: (event: string, data?: Record<string, string | number>) => void };
  }
}

/** Fire-and-forget; analytics must never break booking. */
export function track(event: AnalyticsEvent): void {
  try {
    window.umami?.track(event);
  } catch {
    /* ignore */
  }
}
