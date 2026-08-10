import re, os, json, glob
from xml.dom import minidom

ROOT = os.path.dirname(os.path.abspath(__file__))
os.chdir(ROOT)

report = {"pages": {}, "issues": [], "notices": []}

html_files = sorted(glob.glob("*.html"))

REQUIRED_META = ["title", "description", "canonical", "og:title", "og:description",
                  "og:image", "favicon", "viewport"]

for path in html_files:
    content = open(path, encoding="utf-8").read()
    page = {}

    # Title
    m = re.search(r"<title>(.*?)</title>", content, re.S)
    page["title"] = m.group(1).strip() if m else None
    if not page["title"]:
        report["issues"].append(f"{path}: <title> fehlt")
    elif len(page["title"]) > 60:
        report["notices"].append(f"{path}: <title> länger als 60 Zeichen ({len(page['title'])})")

    # Meta description
    m = re.search(r'<meta name="description" content="(.*?)"', content)
    page["description"] = m.group(1) if m else None
    if not page["description"]:
        report["issues"].append(f"{path}: meta description fehlt")
    elif len(page["description"]) > 160:
        report["notices"].append(f"{path}: meta description länger als 160 Zeichen ({len(page['description'])})")

    # Canonical
    m = re.search(r'<link rel="canonical" href="(.*?)"', content)
    page["canonical"] = m.group(1) if m else None
    if not page["canonical"]:
        report["issues"].append(f"{path}: canonical-Link fehlt")

    # OG tags
    for tag in ["og:title", "og:description", "og:image", "og:url", "og:type"]:
        pattern = rf'<meta property="{tag}" content="(.*?)"'
        m = re.search(pattern, content)
        page[tag] = m.group(1) if m else None
        if not m:
            report["issues"].append(f"{path}: {tag} fehlt")

    # Favicon
    page["favicon"] = 'rel="icon"' in content
    if not page["favicon"]:
        report["issues"].append(f"{path}: Favicon-Link fehlt")

    # Viewport
    page["viewport"] = 'name="viewport"' in content
    if not page["viewport"]:
        report["issues"].append(f"{path}: viewport-Meta-Tag fehlt")

    # lang attribute
    m = re.search(r'<html lang="(.*?)"', content)
    page["lang"] = m.group(1) if m else None

    # facebook-domain-verification (only expected on index.html)
    page["fb_verification_tag"] = 'name="facebook-domain-verification"' in content

    # Preconnect + config script (perf/centralization checks)
    page["preconnect"] = content.count('rel="preconnect"')
    page["site_config_included"] = 'js/site-config.js' in content
    page["main_js_included"] = 'js/main.js' in content

    # Internal href/src integrity
    refs = re.findall(r'(?<![\w-])(?:href|src)="([^"]+)"', content)
    broken = []
    for r in refs:
        if r.startswith(("http", "mailto:", "#", "tel:")) or r == "":
            continue
        target = os.path.normpath(r)
        if not os.path.exists(target):
            broken.append(r)
    page["broken_internal_links"] = broken
    for b in broken:
        report["issues"].append(f"{path}: kaputter interner Link -> {b}")

    report["pages"][path] = page

# robots.txt check
robots = open("robots.txt", encoding="utf-8").read() if os.path.exists("robots.txt") else None
report["robots_txt_present"] = robots is not None
if robots:
    report["robots_txt_has_sitemap"] = "Sitemap:" in robots
    if "Sitemap:" not in robots:
        report["issues"].append("robots.txt: kein Sitemap-Eintrag")
else:
    report["issues"].append("robots.txt fehlt")

# sitemap.xml check
if os.path.exists("sitemap.xml"):
    try:
        dom = minidom.parse("sitemap.xml")
        locs = [n.firstChild.nodeValue for n in dom.getElementsByTagName("loc")]
        report["sitemap_urls"] = locs
        report["sitemap_wellformed"] = True
        for loc in locs:
            path_part = loc.replace("https://sarahphiline.de/", "")
            if path_part == "":
                path_part = "index.html"
            if not os.path.exists(path_part):
                report["issues"].append(f"sitemap.xml: URL zeigt auf nicht existierende Datei -> {loc}")
    except Exception as e:
        report["sitemap_wellformed"] = False
        report["issues"].append(f"sitemap.xml: nicht wohlgeformt ({e})")
else:
    report["issues"].append("sitemap.xml fehlt")

# .nojekyll check
report["nojekyll_present"] = os.path.exists(".nojekyll")
if not report["nojekyll_present"]:
    report["issues"].append(".nojekyll fehlt (kann zu Jekyll-Verarbeitungsfehlern auf GitHub Pages führen)")

# File sizes (perf sanity check)
sizes = {}
for f in glob.glob("**/*", recursive=True):
    if os.path.isfile(f) and not f.startswith("_"):
        sizes[f] = os.path.getsize(f)
report["file_sizes_bytes"] = sizes
total = sum(sizes.values())
report["total_site_bytes"] = total

print(json.dumps(report, indent=2, ensure_ascii=False))
