#!/usr/bin/env node
/**
 * Tests for config/mydr-widget-token.mjs — the token comes from the
 * environment only, and every misconfiguration that would break booking in
 * production fails the build instead of shipping.
 *   node scripts/test-mydr-widget-token.mjs   # exit 0 = all cases pass
 */
import { readFileSync } from 'node:fs';
import { resolveMydrWidgetToken } from '../config/mydr-widget-token.mjs';

// JWT-shaped but fake; assembled at runtime so the secret scanner never sees a JWT literal.
const FAKE = ['eyJ' + 'hbGciOiJIUzI1NiJ9', 'eyJ' + 'mYWNpbGl0eV9pZCI6MX0', 'not-a-real-signature-0123456789'].join('.');
let failed = 0;
const check = (cond, name) => {
  console.log(`${cond ? 'PASS' : 'FAIL'}  ${name}`);
  if (!cond) failed = 1;
};
const throws = (fn) => {
  try {
    fn();
    return false;
  } catch {
    return true;
  }
};
const warnings = [];
const warn = (m) => warnings.push(m);

check(resolveMydrWidgetToken({ MYDR_WIDGET_TOKEN: FAKE }, warn) === FAKE, 'well-formed token is used');
check(resolveMydrWidgetToken({ MYDR_WIDGET_TOKEN: `  ${FAKE}\n` }, warn) === FAKE, 'surrounding whitespace (copy-paste) is trimmed');
check(resolveMydrWidgetToken({ MYDR_WIDGET_TOKEN: FAKE, CONTEXT: 'production' }, warn) === FAKE, 'production with token builds');
check(throws(() => resolveMydrWidgetToken({ MYDR_WIDGET_TOKEN: 'abc' }, warn)), 'malformed token fails the build');
check(throws(() => resolveMydrWidgetToken({ MYDR_WIDGET_TOKEN: `"${FAKE}"` }, warn)), 'token pasted with quotes fails the build');
check(throws(() => resolveMydrWidgetToken({ MYDR_WIDGET_TOKEN: `${FAKE}x`.repeat(20) }, warn)), 'oversized value fails the build');
check(throws(() => resolveMydrWidgetToken({ CONTEXT: 'production' }, warn)), 'production WITHOUT token fails the build');
check(throws(() => resolveMydrWidgetToken({ MYDR_WIDGET_TOKEN: '   ', CONTEXT: 'production' }, warn)), 'production with blank token fails the build');
warnings.length = 0;
check(resolveMydrWidgetToken({ CONTEXT: 'deploy-preview' }, warn) === '' && warnings.length === 1, 'deploy preview without token: empty + one warning');
check(resolveMydrWidgetToken({}, warn) === '', 'CI / local without token: empty');

// The component must take the token from config, never from a literal.
const src = readFileSync(new URL('../src/components/MyDrBookingButton.tsx', import.meta.url), 'utf8');
check(!/eyJ[\w-]{10,}\.eyJ[\w-]{4,}\.[\w-]{16,}/.test(src), 'no JWT literal in MyDrBookingButton.tsx');
check(/data-token=\{token\}/.test(src), 'button data-token is bound to the configured token');
const cfg = readFileSync(new URL('../docusaurus.config.ts', import.meta.url), 'utf8');
check(/mydrWidgetToken:\s*resolveMydrWidgetToken\(\)/.test(cfg), 'docusaurus.config.ts resolves the token from the environment');

process.exit(failed);
