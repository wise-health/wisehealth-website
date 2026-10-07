/**
 * GET /api/mydr-status?token=<MyDr widget token>
 *
 * Tells the site whether MyDr online booking can actually work right now, so a
 * patient never gets the blank booking window the widget shows when MyDr
 * rejects the facility token (2026-10-07: HTTP 401 for WiseHealth's token
 * while other clinics' tokens returned 200).
 *
 * The browser cannot ask MyDr itself (no CORS on mydr.pl/api), so this probe
 * runs server-side. It calls exactly the endpoint the MyDr widget calls first.
 * The token is the PUBLIC widget token already shipped in every page; nothing
 * secret passes through here. Only well-formed JWTs are forwarded, and only to
 * one fixed MyDr URL, so this cannot be used as an open proxy.
 *
 * Response: {"up": boolean, "status": <MyDr HTTP status | 0 on network error>}
 * CDN-cached (5 min when up, 1 min when down) so MyDr sees at most a handful
 * of requests regardless of traffic, and recovery is picked up within a minute.
 */
const TOKEN_RE = /^eyJ[\w-]{10,}\.eyJ[\w-]{4,}\.[\w-]{16,}$/;
const MYDR_FACILITIES = 'https://mydr.pl/api/v1/facilities/';
const TIMEOUT_MS = 4000;

function json(body, status, cdnSeconds) {
  return new Response(JSON.stringify(body), {
    status,
    headers: {
      'content-type': 'application/json; charset=utf-8',
      'cache-control': 'public, max-age=0, must-revalidate',
      'netlify-cdn-cache-control': cdnSeconds
        ? `public, s-maxage=${cdnSeconds}, stale-while-revalidate=${cdnSeconds}`
        : 'no-store',
    },
  });
}

export async function probe(token, fetchImpl = fetch) {
  const url = `${MYDR_FACILITIES}?selected_facility_token=${encodeURIComponent(token)}&remote_app=drw`;
  try {
    const res = await fetchImpl(url, {
      headers: {
        Origin: 'https://plugin.mydr.pl',
        Referer: 'https://plugin.mydr.pl/',
        'User-Agent': 'wisehealth-booking-status/1.0 (+https://wisehealth.pl)',
      },
      signal: AbortSignal.timeout(TIMEOUT_MS),
    });
    return { up: res.status === 200, status: res.status };
  } catch {
    return { up: false, status: 0 };
  }
}

export default async function handler(req, _context, fetchImpl = fetch) {
  const token = new URL(req.url).searchParams.get('token') ?? '';
  if (token.length > 512 || !TOKEN_RE.test(token)) {
    return json({ up: false, status: 400, error: 'invalid token' }, 400, 0);
  }
  const result = await probe(token, fetchImpl);
  return json(result, 200, result.up ? 300 : 60);
}

export const config = { path: '/api/mydr-status' };
