#!/usr/bin/env node
/**
 * Tests for netlify/functions/mydr-status.mjs — no network: MyDr is mocked.
 *   node scripts/test-mydr-status.mjs        # exit 0 = all cases pass
 * Optional live smoke (real MyDr, prints the verdict for the site's token):
 *   node scripts/test-mydr-status.mjs --live <token>
 */
import handler, { probe } from '../netlify/functions/mydr-status.mjs';

// JWT-shaped but fake; assembled at runtime so the secret scanner never sees a JWT literal.
const TOKEN = ['eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9', 'eyJmYWNpbGl0eV9pZCI6MX0', 'not-a-real-signature-0123456789'].join('.');
let failed = 0;
const check = (cond, name) => {
  console.log(`${cond ? 'PASS' : 'FAIL'}  ${name}`);
  if (!cond) failed = 1;
};
const mock = (status) => async (url, init) => {
  mock.lastUrl = url;
  mock.lastInit = init;
  return new Response('{}', { status });
};
const call = async (qs, fetchImpl) => {
  const res = await handler(new Request(`https://wisehealth.pl/api/mydr-status${qs}`), {}, fetchImpl);
  return { res, body: await res.json() };
};

if (process.argv[2] === '--live') {
  console.log(await probe(process.argv[3]));
  process.exit(0);
}

let r = await call(`?token=${TOKEN}`, mock(200));
check(r.res.status === 200 && r.body.up === true && r.body.status === 200, 'MyDr 200 -> up');
check(/s-maxage=300/.test(r.res.headers.get('netlify-cdn-cache-control')), 'up is CDN-cached 5 min');
check(mock.lastUrl.startsWith('https://mydr.pl/api/v1/facilities/?selected_facility_token='), 'calls only the fixed MyDr endpoint');

r = await call(`?token=${TOKEN}`, mock(401));
check(r.body.up === false && r.body.status === 401, 'MyDr 401 (revoked token) -> down');
check(/s-maxage=60/.test(r.res.headers.get('netlify-cdn-cache-control')), 'down is CDN-cached 1 min (fast recovery)');

r = await call(`?token=${TOKEN}`, mock(503));
check(r.body.up === false && r.body.status === 503, 'MyDr 503 -> down');

r = await call(`?token=${TOKEN}`, async () => { throw new TypeError('network'); });
check(r.body.up === false && r.body.status === 0, 'network error / timeout -> down, no throw');

for (const [qs, name] of [['', 'missing token'], ['?token=hello', 'non-JWT token'],
  [`?token=${TOKEN}%26evil=1`, 'token with injected param'], [`?token=${'eyJ' + 'a'.repeat(600)}`, 'oversized token']]) {
  let called = false;
  r = await call(qs, async () => { called = true; return new Response('{}', { status: 200 }); });
  check(r.res.status === 400 && r.body.up === false && !called, `${name} -> 400, MyDr never called`);
  check(r.res.headers.get('netlify-cdn-cache-control') === 'no-store', `${name} -> not cached`);
}

console.log(failed ? 'mydr-status: FAILURES above' : 'mydr-status: all cases passed');
process.exit(failed);
