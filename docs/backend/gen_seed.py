#!/usr/bin/env python3
"""Generate docs/backend/002_seed.sql from the site's bundled JSON content.

Re-runnable: every statement is an upsert keyed on the natural key, so the
seed mirrors the site exactly on day one and can be re-applied safely.
"""
import json
import pathlib
import re

ROOT = pathlib.Path("/home/fola/ADJ-WEB")
OUT = ROOT / "docs/backend/002_seed.sql"


def lit(v):
    if v is None:
        return "NULL"
    if isinstance(v, bool):
        return "TRUE" if v else "FALSE"
    if isinstance(v, (int, float)):
        return str(v)
    if isinstance(v, list):
        return "ARRAY[" + ",".join(lit(x) for x in v) + "]" if v else "'{}'"
    return "'" + str(v).replace("'", "''") + "'"


def js(v):
    """JSONB literal — lists AND dicts serialize to JSON text."""
    return "'" + json.dumps(v).replace("'", "''") + "'"


def main():
    L = []
    s = {
        "phone_display": "+234 706 169 9019",
        "phone_href": "tel:+2347061699019",
        "whatsapp": "https://wa.me/2347061699019",
        "email": "adjeduquest@gmail.com",
        "hours": "Mon – Sat · 8:00am – 6:00pm",
        "address_line1": "Off Igbe Road, Banana Estate / Laara",
        "address_line2": "Igbe-Laara, Ikorodu, Lagos State, Nigeria",
        "tagline": "Ikorodu's home for exam success",
        "partner_name": "Greater Heights Tutorial Center",
        "partner_area": "Satellite Phase, Igbe-Laara, Ikorodu",
    }
    for k, v in s.items():
        L.append(f"insert into site_settings(key,value) values({lit(k)}, {lit(v)}) on conflict(key) do update set value=excluded.value;")
    d = json.loads((ROOT / "src/lib/stitch-data.json").read_text())
    for i, t in enumerate(d["tracks"]):
        L.append(f"insert into tracks(slug,badge,tone,side,title,description,bullets,foot_label,cta_label,sort) values({lit(t['slug'])},{lit(t['badge'])},{lit(t['tone'])},{lit(t['side'])},{lit(t['title'])},{lit(t['desc'])},{lit(t['bullets'])},{lit(t['foot'])},{lit(t['cta'])},{i}) on conflict(slug) do update set badge=excluded.badge,tone=excluded.tone,side=excluded.side,title=excluded.title,description=excluded.description,bullets=excluded.bullets,foot_label=excluded.foot_label,cta_label=excluded.cta_label,sort=excluded.sort;")
    for i, p in enumerate(d["pillars"]):
        L.append(f"insert into pillars(icon,title,copy,tag,tag_icon,tone,sort) values({lit(p['icon'])},{lit(p['title'])},{lit(p['copy'])},{lit(p['tag'])},{lit(p['tagIcon'])},{lit(p['tone'])},{i});")
    for i, m in enumerate(d["metrics"]):
        L.append(f"insert into metrics(value,label,accent,sort) values({lit(m['value'])},{lit(m['label'])},{lit(m['accent'])},{i});")
    for i, c in enumerate(d["catchments"]):
        L.append(f"insert into catchments(name,sort) values({lit(c)},{i});")
    for i, x in enumerate(d["directions"]):
        L.append(f"insert into directions(heading,copy,sort) values({lit(x['from'])},{lit(x['copy'])},{i});")
    pg = json.loads((ROOT / "src/lib/stitch-pages.json").read_text())
    for i, w in enumerate(pg["results"]["wall"]):
        L.append(f"insert into wall_entries(name,badge,tone,area,perf,place,reg,photo_url,sort) values({lit(w['name'])},{lit(w['badge'])},{lit(w['tone'])},{lit(w['area'])},{lit(w['perf'])},{lit(w['place'])},{lit(w['reg'])},'',{i});")
    for i, t in enumerate(pg["results"]["testis"]):
        L.append(f"insert into testimonials(scope,quote,initials,name,detail,area,sort) values('parents',{lit(t['quote'])},{lit(t['initials'])},{lit(t['name'])},{lit(t['detail'])},{lit(t['area'])},{i});")
    for i, t in enumerate(d["results"]):
        L.append(f"insert into testimonials(scope,quote,initials,name,detail,area,sort) values('home',{lit('“' + t['quote'] + '”')},{lit(t['initials'])},{lit(t['name'])},{lit(t['detail'])},'',{i});")
    pp = json.loads((ROOT / "src/lib/stitch-programs.json").read_text())
    stats = {
        "jamb": {"numbers": ["342 / 400", "Made Median", "87%"], "labels": ["2024 Top Score", "Average Improvement", "Pass Rate Benchmarking"]},
        "waec": {"numbers": ["9 A1s", "Made Median", "4.2 hrs"], "labels": ["Made Median", "Average Improvement", "Weekly Lab Hours"]},
        "jupeb": {"numbers": ["14 Pts", "Made Median", "78%"], "labels": ["Made Median", "Average Improvement", "Pass Rate Benchmarking"]},
        "international": {"numbers": ["Band 8.0+", "Target Median", "1400+"], "labels": ["Target Band", "Average Improvement", "Target SAT"]},
        "admissions": {"numbers": ["100%", "CAPS Cleared", "5 Stage"], "labels": ["Clearance Rate", "Average Improvement", "Lifecycle Stages"]},
        "cbt": {"numbers": ["180 Qs", "Made Median", "120 min"], "labels": ["Per Mock Marathon", "Average Improvement", "Timed Conditions"]},
    }
    for slug, p in pp.items():
        st = stats.get(slug, {"numbers": [], "labels": []})
        L.append(f"insert into program_pages(slug,h1,lead,stats,sections) values({lit(slug)},{lit(p['h1'])},{lit(p['lead'])},{js(st)},{js(p['sections'])}) on conflict(slug) do update set h1=excluded.h1,lead=excluded.lead,stats=excluded.stats,sections=excluded.sections;")
    for slug, p in pg.items():
        if slug == "results":
            continue
        L.append(f"insert into page_sections(page,h1,lead,sections) values({lit(slug)},{lit(p['h1'])},{lit(p['lead'])},{js(p['sections'])}) on conflict(page) do update set h1=excluded.h1,lead=excluded.lead,sections=excluded.sections;")
    site = (ROOT / "src/lib/site.ts").read_text()
    for grp, var in [("home", "faqs"), ("programmes", "programsIndexFaqs"), ("results", "resultsFaqs"), ("contact", "contactFaqs")]:
        m = re.search(re.escape(var) + r"[^[]*\[(.*?)\n\];", site, re.S)
        pairs = re.findall(r'q:\s*"((?:[^"\\]|\\.)*)"\s*,\s*a:\s*"((?:[^"\\]|\\.)*)"', m.group(1), re.S)
        for i, (q, a) in enumerate(pairs):
            q = q.encode().decode("unicode_escape")
            a = a.encode().decode("unicode_escape")
            L.append(f"insert into faqs(grp,q,a,sort) values({lit(grp)},{lit(q)},{lit(a)},{i});")
    OUT.write_text("\n".join(L) + "\n")
    print(f"seed: {len(L)} statements")


main()
