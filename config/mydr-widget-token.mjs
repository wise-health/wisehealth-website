/**
 * MyDr booking-widget token — read from the environment, NEVER from git.
 *
 * The MyDr PatientsPlugin reads `data-token` from the button in the visitor's
 * browser, so the token is necessarily present in the deployed HTML. It is not
 * a secret in the cryptographic sense, but this repo is public: keeping the
 * value out of git means it is not indexed/scraped from GitHub and can be
 * rotated in Netlify without a commit.
 *
 * Set it in Netlify → Site configuration → Environment variables:
 *   MYDR_WIDGET_TOKEN = <data-token value from the MyDr EDM panel>
 *
 * Rules (one decision point, here):
 *   - set + well-formed  → used as-is
 *   - set + malformed    → build FAILS (a typo must never ship silently)
 *   - unset, production  → build FAILS (Netlify keeps the last good deploy;
 *                          a token-less production build = broken booking)
 *   - unset, elsewhere   → '' + warning; buttons show the call-reception
 *                          dialog (CI, local dev, deploy previews)
 */
export const MYDR_TOKEN_RE = /^eyJ[\w-]{10,}\.eyJ[\w-]{4,}\.[\w-]{16,}$/;

export function resolveMydrWidgetToken(env = process.env, warn = console.warn) {
  const token = (env.MYDR_WIDGET_TOKEN ?? '').trim();
  if (token) {
    if (token.length > 512 || !MYDR_TOKEN_RE.test(token)) {
      throw new Error(
        'MYDR_WIDGET_TOKEN is set but is not a MyDr widget token (expected a JWT: eyJ….eyJ….signature). ' +
          'Copy the data-token value from the MyDr EDM panel exactly.',
      );
    }
    return token;
  }
  if (env.CONTEXT === 'production') {
    throw new Error(
      'MYDR_WIDGET_TOKEN is not set for the production build — online booking would not work. ' +
        'Set it in Netlify → Site configuration → Environment variables, then redeploy.',
    );
  }
  warn('[mydr] MYDR_WIDGET_TOKEN not set — booking buttons will show the call-reception dialog.');
  return '';
}
