#!/usr/bin/env python3
"""
Post-deploy smoke test against PRODUCTION (https://wisehealth.pl by default).

verify-seo.py proves the BUILD is right; this proves what patients actually
get from Netlify: real status codes (404s are not soft-404s), the phone in the
served JSON-LD, no template leftovers, the CSP header, and — once enabled —
analytics and the branded share card.

Usage:
  python3 scripts/smoke-prod.py                      # core checks
  python3 scripts/smoke-prod.py --expect-og          # + branded og:image everywhere
  python3 scripts/smoke-prod.py --expect-analytics   # + Plausible script live
  python3 scripts/smoke-prod.py --base https://deploy-preview-3--<site>.netlify.app
Exit: 0 = all checks passed, 1 = at least one failure.
Stdlib only.
"""
from __future__ import annotations

import argparse
import json
import re
import sys
import urllib.error
import urllib.request

EXPECTED_PHONE = "+48459160431"
FORBIDDEN = ["123 456 789", "+48123456789", "[do uzupełnienia]", "brak infolinii",
             "docusaurus-social-card"]
CLINIC_PAGES = ["/", "/kontakt", "/psychiatra-krakow", "/psycholog-krakow",
                "/psychiatra-online", "/leczenie-depresji-krakow"]
MUST_404 = ["/nie-istnieje-smoke-test", "/test-mydr.html", "/test-widget-debug.html"]
UA = "wisehealth-smoke/1.0 (+https://wisehealth.pl)"

failures: list[str] = []


def check(cond: bool, msg: str) -> None:
    print(f"  {'ok  ' if cond else 'FAIL'}  {msg}")
    if not cond:
        failures.append(msg)


def fetch(url: str) -> tuple[int, dict, str]:
    req = urllib.request.Request(url, headers={"User-Agent": UA})
    try:
        with urllib.request.urlopen(req, timeout=20) as r:
            return r.status, dict(r.headers), r.read().decode("utf-8", "replace")
    except urllib.error.HTTPError as e:
        return e.code, dict(e.headers or {}), e.read().decode("utf-8", "replace")


def jsonld(html: str) -> list[dict]:
    out: list[dict] = []
    for raw in re.findall(r'<script[^>]*type="application/ld\+json"[^>]*>(.*?)</script>', html, re.DOTALL):
        try:
            d = json.loads(raw)
        except json.JSONDecodeError:
            continue
        out.extend(d if isinstance(d, list) else [d])
    return out


def main() -> int:
    ap = argparse.ArgumentParser()
    ap.add_argument("--base", default="https://wisehealth.pl")
    ap.add_argument("--expect-og", action="store_true")
    ap.add_argument("--expect-analytics", action="store_true")
    a = ap.parse_args()
    base = a.base.rstrip("/")

    print(f"smoke: {base}\n\nsitemap")
    st, _, sm = fetch(f"{base}/sitemap.xml")
    urls = re.findall(r"<loc>([^<]+)</loc>", sm) if st == 200 else []
    check(st == 200 and len(urls) > 0, f"sitemap.xml 200 with {len(urls)} URLs")
    # Sitemap holds canonical prod URLs; map them onto --base (deploy previews).
    paths = sorted({re.sub(r"^https?://[^/]+", "", u) or "/" for u in urls})

    print("\nevery sitemap URL")
    for path in paths:
        st, hdr, html = fetch(base + path)
        check(st == 200, f"{path} → {st}")
        if st != 200:
            continue
        bad = [s for s in FORBIDDEN if s in html and (a.expect_og or s != "docusaurus-social-card")]
        check(not bad, f"{path} free of {bad or 'forbidden strings'}")
        if a.expect_og:
            og = re.search(r'property="og:image"[^>]*content="([^"]+)"|content="([^"]+)"[^>]*property="og:image"', html)
            check(bool(og), f"{path} has og:image")
        if a.expect_analytics:
            check("plausible.io/js/" in html, f"{path} loads Plausible")

    print("\nclinic entity (served JSON-LD)")
    for path in CLINIC_PAGES:
        st, _, html = fetch(base + path)
        clinic = next((n for n in jsonld(html) if "MedicalClinic" in (n.get("@type") or [])), None)
        check(bool(clinic) and clinic.get("telephone") == EXPECTED_PHONE,
              f"{path} MedicalClinic.telephone = {clinic.get('telephone') if clinic else None}")
        check(f'href="tel:{EXPECTED_PHONE}"' in html, f"{path} has tel: link")

    print("\nreal 404s (no soft-404)")
    for path in MUST_404:
        st, _, _ = fetch(base + path)
        check(st == 404, f"{path} → {st} (want 404)")

    print("\nbooking status function (netlify/functions/mydr-status.mjs)")
    st, _, home = fetch(base + "/kontakt")
    tok = re.search(r'data-token="([^"]+)"', home)
    if not tok:
        check(False, "booking button with data-token on /kontakt")
    else:
        st, _, body = fetch(f"{base}/api/mydr-status?token={tok.group(1)}")
        try:
            verdict = json.loads(body)
        except json.JSONDecodeError:
            verdict = {}
        check(st == 200 and "up" in verdict,
              f"/api/mydr-status deployed and answering ({st}, {verdict or body[:60]!r})")
        # Informational: whether MyDr currently accepts the widget token.
        print(f"  info  MyDr booking currently {'UP' if verdict.get('up') else 'DOWN'} "
              f"(MyDr HTTP {verdict.get('status')}) — DOWN = patients see the call-reception dialog")
    st, _, _ = fetch(base + "/api/mydr-status?token=not-a-token")
    check(st == 400, f"/api/mydr-status rejects malformed tokens ({st})")

    print("\nheaders + llms.txt")
    st, hdr, _ = fetch(base + "/")
    csp = {k.lower(): v for k, v in hdr.items()}.get("content-security-policy", "")
    check("frame-src" in csp and "plugin.mydr.pl" in csp, "CSP present and allows the MyDr widget frame")
    st, _, llms = fetch(base + "/llms.txt")
    check(st == 200 and "459 160 431" in llms and "brak infolinii" not in llms, "llms.txt has the phone")

    print(f"\n{'=' * 50}\nfailed: {len(failures)}")
    for f in failures:
        print(f"  - {f}")
    return 1 if failures else 0


if __name__ == "__main__":
    sys.exit(main())
