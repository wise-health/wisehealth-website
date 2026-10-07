#!/usr/bin/env python3
"""
Verify the built site's SEO fundamentals against the real generated HTML.

This is a build-output test, not a source-code test: it parses the files that
Netlify will actually serve. It exists because SEO regressions are silent —
nothing crashes when a JSON-LD block is malformed or a <title> drifts, the
pages just quietly stop ranking.

Usage:  python3 scripts/verify-seo.py [build_dir]
Exit:   0 = all checks passed, 1 = at least one failure
"""
from __future__ import annotations

import json
import re
import sys
from html import unescape
from pathlib import Path

BUILD = Path(sys.argv[1] if len(sys.argv) > 1 else "build")

# Pages that must exist and carry full SEO treatment.
REQUIRED_PAGES = [
    "",  # homepage
    "psychiatra-krakow",
    "psycholog-krakow",
    "psychiatra-online",
    "leczenie-depresji-krakow",
    "faq",
    "zespol",
    "cennik",
    "kontakt",
    "oferta",
    "blog",  # list page: upstream Docusaurus renders no <h1> (swizzled fix)
]

# --- Clinic identity (NAP). Single truth lives in src/data/clinic.ts; these
# pins make CI fail if the rendered site ever drifts from it.
EXPECTED_PHONE = "+48459160431"           # E.164, owner-confirmed 2026-10-07
EXPECTED_GEO = (50.07155, 19.93889)       # OSM + GBP pin for ul. Szlak 38
MAX_GEO_DRIFT_M = 30
REPO = Path(__file__).resolve().parent.parent

# Strings that must never ship anywhere in the build: the template's fake
# phone, unfilled legal placeholders, "no phone" copy that contradicts the
# real number.
FORBIDDEN_STRINGS = [
    "123 456 789",
    "+48123456789",
    "[do uzupełnienia]",
    "brak infolinii",
]

# Pages that must carry the clinic entity, so Google builds ONE business node.
NEEDS_CLINIC_SCHEMA = [
    "",
    "kontakt",
    "psychiatra-krakow",
    "psycholog-krakow",
    "psychiatra-online",
    "leczenie-depresji-krakow",
]

NEEDS_FAQ_SCHEMA = [
    "faq",
    "psychiatra-krakow",
    "psycholog-krakow",
    "psychiatra-online",
    "leczenie-depresji-krakow",
]

# Every page a patient can land on must offer a way to book. A page that
# convinces someone and then gives them nothing to click is a dead end — this
# caught /zespol shipping with zero booking CTA.
NEEDS_BOOKING_CTA = [
    "",
    "psychiatra-krakow",
    "psycholog-krakow",
    "psychiatra-online",
    "leczenie-depresji-krakow",
    "faq",
    "zespol",
    "cennik",
    "oferta",
    "kontakt",
]

# Pages where a patient must be able to reach a human: tel: link present.
NEEDS_PHONE_LINK = [
    "kontakt",
    "faq",
    "psychiatra-krakow",
    "psycholog-krakow",
    "psychiatra-online",
    "leczenie-depresji-krakow",
]

# Medical (YMYL) pages must always surface the emergency route. Non-negotiable:
# someone in crisis may land here from a search for their own symptoms.
NEEDS_CRISIS_INFO = [
    "psychiatra-krakow",
    "psycholog-krakow",
    "psychiatra-online",
    "leczenie-depresji-krakow",
    "faq",
]

MIN_LANDING_WORDS = 400

MAX_TITLE = 65
MAX_DESCRIPTION = 165

failures: list[str] = []
passes: list[str] = []


def fail(msg: str) -> None:
    failures.append(msg)
    print(f"  FAIL  {msg}")


def ok(msg: str) -> None:
    passes.append(msg)
    print(f"  ok    {msg}")


def page_path(slug: str) -> Path:
    return BUILD / "index.html" if slug == "" else BUILD / slug / "index.html"


def extract_jsonld(html: str) -> list[dict]:
    """Return every parsed application/ld+json block on the page.

    NOTE: the opening tag is matched attribute-order agnostically. Docusaurus
    renders head tags via react-helmet, which injects `data-rh="true"` BEFORE
    the type attribute (`<script data-rh="true" type="application/ld+json">`).
    A naive `<script type="application/ld+json">` regex silently matches
    nothing and reports every page as missing its schema.
    """
    blocks = re.findall(
        r'<script[^>]*type="application/ld\+json"[^>]*>(.*?)</script>', html, re.DOTALL
    )
    parsed = []
    for raw in blocks:
        try:
            data = json.loads(raw)
        except json.JSONDecodeError as exc:
            fail(f"malformed JSON-LD: {exc}")
            continue
        parsed.extend(data if isinstance(data, list) else [data])
    return parsed


def types_of(node: dict) -> set[str]:
    raw = node.get("@type", [])
    return set(raw) if isinstance(raw, list) else {raw}


def meta(html: str, name: str) -> str | None:
    m = re.search(
        rf'<meta[^>]+(?:name|property)="{re.escape(name)}"[^>]+content="([^"]*)"',
        html,
    )
    if m:
        return m.group(1)
    m = re.search(
        rf'<meta[^>]+content="([^"]*)"[^>]+(?:name|property)="{re.escape(name)}"',
        html,
    )
    return m.group(1) if m else None


def distance_m(a: tuple[float, float], b: tuple[float, float]) -> float:
    from math import asin, cos, radians, sin, sqrt
    lat1, lon1, lat2, lon2 = map(radians, (*a, *b))
    h = sin((lat2 - lat1) / 2) ** 2 + cos(lat1) * cos(lat2) * sin((lon2 - lon1) / 2) ** 2
    return 2 * 6_371_000 * asin(sqrt(h))


def visible_text(html: str) -> str:
    """Approximate the copy a human actually reads, from <main>.

    Checking rendered text rather than source guards against the failure mode
    where a page builds and returns 200 but ships an empty or stub body.
    """
    stripped = re.sub(r"<script.*?</script>", " ", html, flags=re.DOTALL)
    stripped = re.sub(r"<style.*?</style>", " ", stripped, flags=re.DOTALL)
    main = re.search(r"<main.*?</main>", stripped, re.DOTALL)
    body = main.group(0) if main else stripped
    return re.sub(r"\s+", " ", unescape(re.sub(r"<[^>]+>", " ", body))).strip()


print(f"Verifying build output in: {BUILD.resolve()}\n")

if not BUILD.is_dir():
    print(f"FATAL: build directory {BUILD} does not exist. Run `npm run build`.")
    sys.exit(1)

for slug in REQUIRED_PAGES:
    label = f"/{slug}" if slug else "/"
    path = page_path(slug)
    print(f"{label}")

    if not path.is_file():
        fail(f"{label} was not generated at {path}")
        continue

    html = path.read_text(encoding="utf-8")

    # --- title -------------------------------------------------------------
    title_match = re.search(r"<title[^>]*>(.*?)</title>", html, re.DOTALL)
    if not title_match:
        fail(f"{label} has no <title>")
    else:
        title = re.sub(r"\s+", " ", title_match.group(1)).strip()
        if len(title) > MAX_TITLE:
            fail(f"{label} title is {len(title)} chars (>{MAX_TITLE}), will truncate in SERP: {title!r}")
        else:
            ok(f"title ({len(title)} chars)")

    # --- meta description --------------------------------------------------
    description = meta(html, "description")
    if not description:
        fail(f"{label} has no meta description")
    elif len(description) > MAX_DESCRIPTION:
        fail(f"{label} description is {len(description)} chars (>{MAX_DESCRIPTION})")
    else:
        ok(f"description ({len(description)} chars)")

    # --- exactly one h1 ----------------------------------------------------
    h1_count = len(re.findall(r"<h1[\s>]", html))
    if h1_count != 1:
        fail(f"{label} has {h1_count} <h1> elements, expected exactly 1")
    else:
        ok("single <h1>")

    # --- canonical ---------------------------------------------------------
    if 'rel="canonical"' not in html:
        fail(f"{label} has no canonical link")
    else:
        ok("canonical")

    # --- structured data ---------------------------------------------------
    nodes = extract_jsonld(html)
    all_types: set[str] = set()
    for node in nodes:
        all_types |= types_of(node)

    if slug in NEEDS_CLINIC_SCHEMA:
        if "MedicalClinic" not in all_types:
            fail(f"{label} is missing MedicalClinic structured data (found: {sorted(all_types) or 'none'})")
        else:
            clinic = next(n for n in nodes if "MedicalClinic" in types_of(n))
            if clinic.get("@id") != "https://wisehealth.pl/#clinic":
                fail(f"{label} clinic @id is {clinic.get('@id')!r}, expected the shared '#clinic' node")
            else:
                ok("MedicalClinic schema (shared @id)")
            # Phone and geo are checked independently so one defect can never
            # hide the other.
            if clinic.get("telephone") != EXPECTED_PHONE:
                fail(f"{label} clinic telephone is {clinic.get('telephone')!r}, expected {EXPECTED_PHONE}")
            else:
                ok("clinic telephone")
            geo = clinic.get("geo") or {}
            try:
                drift = distance_m(EXPECTED_GEO, (float(geo["latitude"]), float(geo["longitude"])))
            except (KeyError, TypeError, ValueError):
                fail(f"{label} clinic has no usable geo")
            else:
                if drift > MAX_GEO_DRIFT_M:
                    fail(f"{label} clinic geo is {drift:.0f} m from the pinned location (>{MAX_GEO_DRIFT_M} m)")
                else:
                    ok(f"geo within {drift:.0f} m of pin")

    # Physician is a licensed-doctor claim: only "lek." holders may carry it.
    for node in nodes:
        if "Physician" in types_of(node) and "lek." not in str(node.get("name", "")):
            fail(f"{label} types {node.get('name')!r} as Physician — not a physician (use Person)")
        for emp in node.get("employee", []) if isinstance(node.get("employee"), list) else []:
            if "Physician" in types_of(emp) and "lek." not in str(emp.get("name", "")):
                fail(f"{label} clinic employee {emp.get('name')!r} typed Physician — not a physician")

    if slug in NEEDS_PHONE_LINK:
        if f'href="tel:{EXPECTED_PHONE}"' not in html:
            fail(f"{label} has no tel:{EXPECTED_PHONE} link")
        else:
            ok("phone link")

    if slug in NEEDS_FAQ_SCHEMA:
        if "FAQPage" not in all_types:
            fail(f"{label} is missing FAQPage structured data")
        else:
            faq = next(n for n in nodes if "FAQPage" in types_of(n))
            questions = faq.get("mainEntity", [])
            if not questions:
                fail(f"{label} FAQPage has no questions")
            else:
                bad = [
                    q.get("name")
                    for q in questions
                    if not q.get("acceptedAnswer", {}).get("text")
                ]
                if bad:
                    fail(f"{label} FAQ entries missing answer text: {bad}")
                else:
                    ok(f"FAQPage schema ({len(questions)} questions)")

    # --- Open Graph --------------------------------------------------------
    og_image = meta(html, "og:image") or ""
    if not meta(html, "og:title"):
        fail(f"{label} has no og:title")
    elif not og_image or "docusaurus-social-card" in og_image:
        fail(f"{label} og:image is {og_image or 'missing'!r} — template card, not WiseHealth")
    else:
        ok("open graph (branded og:image)")

    # --- rendered copy -----------------------------------------------------
    # A page can build cleanly and return 200 while shipping an empty shell;
    # only the rendered text proves otherwise.
    text = visible_text(html)
    words = len(text.split())

    if slug in NEEDS_BOOKING_CTA:
        if "Umów wizytę" not in text:
            fail(f"{label} renders no booking CTA — a dead end for the patient")
        else:
            ok("booking CTA")

    if slug in NEEDS_CRISIS_INFO:
        if "112" not in text:
            fail(f"{label} is medical content with no emergency number (112)")
        else:
            ok("crisis info")

    if slug in NEEDS_CLINIC_SCHEMA and slug not in ("", "kontakt"):
        if words < MIN_LANDING_WORDS:
            fail(f"{label} renders only {words} words (<{MIN_LANDING_WORDS}) — too thin to rank")
        else:
            ok(f"substantive copy ({words} words)")

    print()

# --- whole-build sweeps -------------------------------------------------------
print("whole build")
html_files = sorted(BUILD.rglob("*.html"))
text_files = html_files + [p for p in (BUILD / "llms.txt",) if p.is_file()]
hits = [
    (s, str(p.relative_to(BUILD)))
    for p in text_files
    for s in FORBIDDEN_STRINGS
    if s in p.read_text(encoding="utf-8", errors="replace")
]
if hits:
    for s, where in hits[:20]:
        fail(f"forbidden string {s!r} in {where}")
else:
    ok(f"no forbidden strings in {len(text_files)} files")

# Every iframe must be allowed by the CSP frame-src, or it renders as a
# blocked empty box in production (this is how the /kontakt map died).
netlify = (REPO / "netlify.toml").read_text(encoding="utf-8")
csp = re.search(r'Content-Security-Policy\s*=\s*"([^"]+)"', netlify)
frame_src = []
if csp:
    m = re.search(r"frame-src([^;]*)", csp.group(1))
    frame_src = m.group(1).split() if m else []
blocked = set()
for p in html_files:
    for src in re.findall(r'<iframe[^>]+src="(https?://[^"/]+)', p.read_text(encoding="utf-8")):
        if not any(src == allowed.rstrip("/") for allowed in frame_src):
            blocked.add((src, str(p.relative_to(BUILD))))
if blocked:
    for src, where in sorted(blocked):
        fail(f"iframe {src} in {where} is not allowed by CSP frame-src {frame_src}")
else:
    ok("all iframes allowed by CSP")

# Unknown URLs must 404. A `/* -> /index.html 200` rewrite turns every dead
# link into a soft-404 (homepage served with 200).
if re.search(r'from\s*=\s*"/\*"[^\[]*status\s*=\s*200', netlify, re.DOTALL):
    fail("netlify.toml rewrites /* to 200 — unknown URLs become soft-404s")
elif not (BUILD / "404.html").is_file():
    fail("build/404.html missing — Netlify would serve its generic 404")
else:
    ok("real 404s (no catch-all rewrite, 404.html present)")
print()

# --- sitemap / robots ------------------------------------------------------
print("sitemap.xml")
sitemap = BUILD / "sitemap.xml"
if not sitemap.is_file():
    fail("sitemap.xml was not generated")
else:
    locs = re.findall(r"<loc>([^<]+)</loc>", sitemap.read_text(encoding="utf-8"))
    noise = [u for u in locs if "/blog/tags/" in u or "/blog/authors" in u or u.endswith("/404")]
    if noise:
        fail(f"sitemap contains thin listing pages: {noise}")
    else:
        ok(f"{len(locs)} URLs, no thin listing pages")

    for slug in ("psychiatra-krakow", "psycholog-krakow", "psychiatra-online", "leczenie-depresji-krakow"):
        if not any(u.rstrip("/").endswith(slug) for u in locs):
            fail(f"sitemap is missing /{slug}")
    if all(any(u.rstrip("/").endswith(s) for u in locs) for s in
           ("psychiatra-krakow", "psycholog-krakow", "psychiatra-online", "leczenie-depresji-krakow")):
        ok("all landing pages present in sitemap")

print("\nrobots.txt")
robots = BUILD / "robots.txt"
if not robots.is_file():
    fail("robots.txt was not generated")
else:
    body = robots.read_text(encoding="utf-8")
    if "Sitemap: https://wisehealth.pl/sitemap.xml" not in body:
        fail("robots.txt does not declare the sitemap")
    else:
        ok("declares sitemap")

# --- summary ---------------------------------------------------------------
print("\n" + "=" * 60)
print(f"passed: {len(passes)}   failed: {len(failures)}")
if failures:
    print("\nFAILURES:")
    for f in failures:
        print(f"  - {f}")
    sys.exit(1)
print("All SEO checks passed.")
sys.exit(0)
