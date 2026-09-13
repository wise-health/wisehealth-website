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
]

# Pages that must carry the clinic entity, so Google builds ONE business node.
NEEDS_CLINIC_SCHEMA = [
    "",
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
        r'<script[^>]*type="application/ld\+json"[^>]*>(.*?)</script>', html, re.S
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
    title_match = re.search(r"<title[^>]*>(.*?)</title>", html, re.S)
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
            elif "telephone" in clinic and not clinic["telephone"]:
                fail(f"{label} emits an empty telephone — omit the field instead")
            else:
                ok("MedicalClinic schema (shared @id)")

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
    if not meta(html, "og:title"):
        fail(f"{label} has no og:title")
    else:
        ok("open graph")

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
