# Technischer Audit — Sprint 11.1

Stand: automatisiert geprüft im Rahmen von Sprint 11.1 (Meta Business
Verification Finalisierung). Geprüft wurden alle 8 HTML-Seiten des
Projekts sowie `robots.txt`, `sitemap.xml` und `.nojekyll`.

## 1. Ergebnis auf einen Blick

| Prüfung                                   | Status |
|--------------------------------------------|--------|
| Alle Seiten erreichbar (lokal, HTTP 200)    | ✅ |
| Interne Links (href/src) ohne 404           | ✅ |
| Pflichtseiten vorhanden (6/6)               | ✅ |
| Meta-Verification-Tag korrekt im `<head>`   | ✅ |
| SEO-Titel vorhanden, ≤ 60 Zeichen           | ✅ |
| Meta-Description vorhanden, ≤ 160 Zeichen   | ✅ |
| Canonical-Link auf jeder Seite              | ✅ |
| Open-Graph-Tags auf jeder Seite             | ✅ |
| Favicon auf jeder Seite eingebunden         | ✅ |
| robots.txt vorhanden & verweist auf Sitemap | ✅ |
| sitemap.xml wohlgeformt & Ziele existieren  | ✅ |
| .nojekyll vorhanden                         | ✅ |
| Zentrale Konfiguration (7 Felder) verdrahtet| ✅ |

Automatisiert geprüft mit einem eigenen Audit-Skript (`audit.py`, im
Zuge dieses Sprints erstellt), das jede Seite auf Titel, Meta-Description,
Canonical, Open-Graph-Tags, Favicon, Viewport-Tag sowie kaputte interne
Links untersucht und `robots.txt`/`sitemap.xml` gegen die tatsächlich
vorhandenen Dateien validiert. Ergebnis beim letzten Lauf: **0 Fehler,
0 Hinweise.**

## 2. Im Zuge dieses Sprints gefundene und behobene Probleme

1. **Fehlende Open-Graph-Tags auf 4 Seiten.** `impressum.html`,
   `datenschutz.html`, `privacy.html` und `terms.html` hatten aus Sprint
   11.0 zwar Titel/Description/Canonical, aber keine `og:*`- oder
   `twitter:*`-Tags. Behoben: alle vier Seiten haben jetzt einen
   vollständigen Open-Graph-Block (og:type, og:site_name, og:title,
   og:description, og:image, og:url, og:locale, twitter:card).
2. **SEO-Titel der Startseite zu lang.** 62 Zeichen, Google kürzt ab
   ca. 60 Zeichen. Gekürzt auf "SPK — Social Media Coaching &
   Kooperationen" (44 Zeichen).
3. **Kein zentraler Pflegeort für Unternehmensdaten.** Vor diesem Sprint
   waren E-Mail, Social-Links und Anschrift auf 3 Seiten separat als
   Text hinterlegt — jede Änderung hätte mehrfach gepflegt werden müssen.
   Behoben durch `js/site-config.js` (siehe Abschnitt 4).
4. **Facebook fehlte als Kontaktkanal.** Für die Meta Business
   Verification wird i. d. R. auch ein verknüpftes Facebook-Profil
   erwartet. Auf der Kontaktseite als Kontakt-Item und Social-Pill
   ergänzt, inkl. Feld in der zentralen Konfiguration.

## 3. Meta Business Verification

Der Platzhalter befindet sich unverändert an derselben, korrekten
Stelle:

**Datei:** `index.html`
**Zeile:** im `<head>`, direkt vor dem Favicon-Link

```html
<meta name="facebook-domain-verification" content="HIER_CODE_EINFÜGEN">
```

- Meta prüft die Domain-Verifizierung serverseitig ohne JavaScript
  auszuführen — der Tag **muss** deshalb statisches HTML bleiben (er
  wird bewusst *nicht* über `site-config.js` eingesetzt).
- Ein Tag auf der Startseite genügt; die Verifizierung ist domainweit,
  nicht seitenweit.
- Sobald der Code aus dem Meta Business Manager vorliegt, reicht ein
  einzeiliger Austausch von `HIER_CODE_EINFÜGEN` — danach committen und
  pushen, GitHub Pages veröffentlicht automatisch (siehe Abschnitt 5).
- Kurzanleitung zur Beschaffung des Codes: siehe README.md, Abschnitt
  "Domain-Verifizierung bei Meta".

## 4. Zentrale Unternehmensdaten

Neu in diesem Sprint: `js/site-config.js` ist die einzige Datei, in der
folgende sieben Angaben gepflegt werden:

- Unternehmens-/Firmenname (`legalName`)
- Verantwortliche Person (`responsiblePerson`)
- Anschrift (`addressStreet`, `addressCity`, `addressCountry`)
- Geschäftliche E-Mail (`email`)
- Instagram-Link (`instagramUrl`)
- Facebook-Link (`facebookUrl`)
- Domain (`domain`, informativ — siehe Hinweis unten)

Eingesetzt wird der Wert automatisch auf:

| Feld | Wird angezeigt in |
|------|--------------------|
| `legalName`, `responsiblePerson`, `addressStreet`, `addressCity`, `addressCountry` | `impressum.html`, `datenschutz.html` |
| `email` | `kontakt.html`, `impressum.html`, `datenschutz.html`, Footer aller Seiten, Kontaktformular (`mailto`-Ziel) |
| `instagramUrl`, `facebookUrl`, `tiktokUrl`, `youtubeUrl` | `kontakt.html` (Kontaktliste + Social-Pills) |

**Funktionsweise:** Jedes Feld wird per `data-cfg="feldname"` (Text) bzw.
`data-cfg-href="feldname"` (Link-Ziel) im HTML markiert. Ein kleines
Skript in `js/main.js` (`applySiteConfig()`) setzt beim Laden der Seite
automatisch die echten Werte ein — aber **nur**, wenn ein Feld nicht
leer und nicht mehr mit `[...]` als Platzhalter markiert ist. Ist ein
Feld noch offen, bleibt der bisherige, klar erkennbare Klammer-Platzhalter
(kursiv, in Oxblood-Rot) stehen. Das funktioniert auch ganz ohne
JavaScript, da der Platzhaltertext direkt im HTML steht.

**Wichtige Ausnahme:** `domain` sowie alle domain-abhängigen SEO-Tags
(`canonical`, `og:url`, `sitemap.xml`, `robots.txt`) werden **nicht**
automatisch befüllt, weil Suchmaschinen- und Social-Media-Crawler diese
i. d. R. ohne JavaScript lesen. Bei einem Domain-Wechsel (z. B. eigene
Domain statt GitHub Pages) müssen diese Stellen manuell angepasst
werden — Anleitung dazu in der README.

## 5. GitHub-Pages-Deployment

- `.nojekyll` liegt im Projekt-Root und verhindert, dass GitHub Pages
  die Dateien fälschlich durch den Jekyll-Prozessor schickt (relevant,
  da Dateinamen wie `_debug` o. Ä. sonst ignoriert werden könnten und
  Unterstriche/spezielle Ordnernamen anders behandelt würden).
- Reine statische Dateien (HTML/CSS/JS/SVG/JPG) — kein Build-Schritt
  nötig. GitHub Pages veröffentlicht nach jedem Push in den
  konfigurierten Branch automatisch neu; laut GitHub üblicherweise
  innerhalb von ein bis zwei Minuten.
- Es wird kein GitHub-Actions-Workflow benötigt, solange die
  Repository-Einstellung unter **Settings → Pages** weiterhin auf
  "Deploy from a branch" steht (wie bereits für das bisherige
  App-Landingpage-Setup verwendet).
- Empfohlene manuelle Prüfung direkt nach dem ersten Push dieses
  Sprints: alle 8 Seiten einmal live aufrufen, Kontaktformular einmal
  testweise absenden (öffnet das lokale Mailprogramm), auf einem echten
  Smartphone die mobile Darstellung gegenprüfen (siehe Einschränkung
  in Abschnitt 6).

## 6. Performance

- Gesamtgröße des Projekts (HTML+CSS+JS+Assets, ohne externe
  Google-Fonts-Requests): **~175 KB**, davon ~83 KB allein das
  generierte Open-Graph-Bild. Für eine Marketing-/Impressum-Website
  sehr leichtgewichtig; GitHub Pages liefert zusätzlich automatisch
  gzip-komprimiert aus.
- `rel="preconnect"` für `fonts.googleapis.com` und `fonts.gstatic.com`
  auf allen Seiten ergänzt, um die Google-Fonts-Ladezeit zu verkürzen
  (spart typischerweise 1 DNS+TLS-Handshake, bevor die Schrift geladen
  wird).
- Google Fonts wird bereits mit `&display=swap` geladen — Text erscheint
  sofort in einer Systemschrift und wird nicht durch unsichtbaren Text
  blockiert (kein "Flash of Invisible Text").
- CSS und JS liegen jeweils in einer einzigen Datei (kein Aufsplitten
  nötig bei dieser Projektgröße); JavaScript wird nicht-blockierend am
  Ende von `<body>` eingebunden.
- Keine großen, unkomprimierten Bilder im sichtbaren Seitenbereich
  (aktuell keine echten Fotos eingebunden, siehe Sprint-11.0-README,
  Abschnitt 4 "Offene Angaben").

## 7. Bekannte Einschränkung dieses Audits

Wie schon in Sprint 11.0 dokumentiert, erzwingt die in dieser Umgebung
verfügbare Headless-Chrome-Instanz einen Mindest-Viewport von ca. 500 px,
weshalb ein echtes 375-px-Smartphone-Layout hier nicht pixelgenau
gerendert werden konnte. Bei 600 px Breite (kleines Tablet/großes Phone)
funktionieren Navigation, Umbrüche und Formular einwandfrei; das CSS
verwendet ausschließlich responsive Standardtechnik (Media-Queries,
`clamp()`, Flexbox-Wrap) ohne feste Breiten. Eine kurze Prüfung auf
einem echten Smartphone nach dem Deployment wird weiterhin empfohlen.

## 8. Verbleibende, bewusst offene Punkte

Diese Punkte sind **kein technischer Fehler**, sondern warten laut
Sprint-Vorgabe auf externe Informationen:

- Echter Meta-Verifizierungscode (wird erst nach Start der Verifizierung
  durch Meta bereitgestellt).
- Echte Unternehmensdaten in `js/site-config.js` (Name, Anschrift,
  E-Mail, Social-Links) — bis dahin klar als Platzhalter erkennbar,
  wie in den Sprint-Annahmen vorgesehen.
- USt-ID / Handelsregistereintrag im Impressum (Sonderfall, siehe dort).
- Media-Kit-PDF für die Kooperationen-Seite.
