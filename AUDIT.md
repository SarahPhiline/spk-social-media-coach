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
  Repository-Einstellung unter **Settings → Pages** auf
  "Deploy from a branch" steht. Dieses Projekt selbst liefert bewusst
  **keine** `.github/workflows/*.yml`-Datei aus — es gibt nichts zu
  bauen, ein Actions-Workflow wäre unnötige Komplexität und die
  wahrscheinlichste Ursache für die in Sprint 11.13 gemeldeten
  wiederkehrenden Timeout-Probleme. Konkrete Diagnose- und
  Umstellungsschritte für das bestehende Repository: siehe README,
  Abschnitt 3a.
- Empfohlene manuelle Prüfung direkt nach dem ersten Push dieses
  Sprints: alle 8 Seiten einmal live aufrufen, Kontaktformular einmal
  testweise absenden (öffnet das lokale Mailprogramm), auf einem echten
  Smartphone die mobile Darstellung gegenprüfen (siehe Einschränkung
  in Abschnitt 7).

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
Sprint-Vorgabe auf externe Informationen bzw. sind bewusst optional:

- Echter Meta-Verifizierungscode (wird erst nach Start der Verifizierung
  durch Meta bereitgestellt).
- Telefonnummer, optional (`js/site-config.js`).
- Media-Kit-PDF für die Kooperationen-Seite.
- Vertrauensbereich auf `kooperationen.html` (Partnerlogos, Presse,
  Kennzahlen, Kundenstimmen) — bewusst als klar erkennbare Platzhalter
  vorbereitet, siehe Abschnitt 11.

Name, Anschrift, geschäftliche E-Mail, Instagram- und Facebook-Link sowie
die Kleinunternehmerregelung im Impressum sind seit dem Marken-Update
bereits mit echten Daten befüllt (siehe Abschnitt 9). TikTok- und
YouTube-Kanal wurden mit Sprint 11.7 aus der finalen Version entfernt, da
nie befüllt (siehe Abschnitt 11).

## 9. Marken-Update — zusätzlich gefundener und behobener Bug

Bei der Design-Anpassung an das offizielle SPK-Logo wurde ein
CSS-Spezifitätsfehler entdeckt, der bereits seit Sprint 11.0 im Code war,
optisch aber erst mit den kräftigeren Rosé/Gold-Verlaufsfarben auffiel:
Die Regel `@media (min-width: 860px) { .nav-cta { display: inline-flex; } }`
traf ungewollt auch auf den mobil-only-Button (`.nav-cta.mobile` in der
Menüklappe), sodass am Desktop zwei "Kooperation anfragen"-Buttons
gleichzeitig sichtbar waren — einer regulär rechts in der Navigation,
einer verkürzt direkt neben den Menülinks. Behoben durch Verschärfung des
Selektors auf `.nav-cta:not(.mobile)`. Per Screenshot bei 1440 px und
600 px Breite verifiziert.

Außerdem wurden die Logo-Bilddateien größenoptimiert: Statt des
1024×1024-Originals (135 KB) laden Nav und Footer jetzt eine 120×120-Variante
(4,8 KB). Das Original bleibt als Master-Datei im Projekt erhalten, wird
aber von keiner Seite mehr direkt geladen.

## 10. Sprint 11.6 — Inhaltliche Qualitätskontrolle

Zusätzlich zur technischen Prüfung (Abschnitte 1–7) wurde für den
Marken-/Story-Relaunch eine inhaltliche Kontrolle durchgeführt:

| Prüfung | Status |
|---|---|
| Einheitlicher Markenname ("SPK – Social Media" / "Sarah Philine Koch") | ✅ |
| Kein verbliebener Platzhaltertext außerhalb der markierten `cfg-placeholder`-Felder | ✅ (per Skript geprüft) |
| Sportliche Meilensteine korrekt übernommen (Wertnote 8,0, 6. Platz Gesamtwertung, 4. Platz Grade III, Ziel Aachen/DM) | ✅ |
| Passende Branchen vollständig (7/7: Reitsportmarken, Pferdefutter, Reitbekleidung, Stalltechnik, Pferdegesundheit, Lifestyle, Outdoor) | ✅ |
| Medizinische Details respektvoll zusammengefasst, nicht sensationsorientiert | ✅ (Fließtext statt Auflistung, kein Kausalitätsanspruch bei Impfung) |
| Mobile Darstellung (Story-Abschnitte, Meilenstein-Karten, Branchen-Chips) | ✅ (600 px getestet) |

Redaktionelle Entscheidung: Die vom Auftraggeber gelieferte Rohfassung
formulierte einen direkten ursächlichen Zusammenhang zwischen einer
Impfung und der anschließenden Erkrankung ("Im November 2022 änderte
sich Sarahs Leben nach einer Impfung von Grund auf."). Für die
veröffentlichte Fassung wurde das sprachlich zu einem *zeitlichen*
Zusammenhang abgeschwächt ("die im zeitlichen Zusammenhang mit einer
Impfung auftrat"), um Sarahs persönliche Erfahrung wahrheitsgemäß
wiederzugeben, ohne einen medizinisch nicht verifizierten
Kausalzusammenhang als Tatsache zu behaupten. Inhaltlich bleibt die
Geschichte dieselbe; nur die Formulierung ist präziser.

## 11. Sprint 11.7 — Finale Premium-Version

| Prüfung | Status |
|---|---|
| Hero-Bereich mit echtem Foto, Bild/Text harmonieren | ✅ (Screenshot Desktop + Mobile geprüft) |
| Markenname "SPK – Social Media" konsistent | ✅ |
| Sarah Philine Koch &amp; My Milou als Gesicht der Marke sichtbar (Hero, Bio, Story-Paar) | ✅ |
| Keine erfundenen Inhalte in den Vertrauens-Platzhaltern (Partner/Presse/Stimmen) | ✅ (bewusst leere, klar markierte Slots statt fiktiver Logos/Zitate) |
| Entwickler-Hinweise von öffentlichen Seiten entfernt | ✅ (Impressum, Datenschutz) |
| Leere/unbefüllte Felder entfernt (TikTok, YouTube) | ✅ |
| Buttons einheitlich (nur `btn-primary`/`btn-secondary`, keine Ad-hoc-Styles) | ✅ (per Skript geprüft) |
| Keine Inline-Styles mehr im HTML | ✅ (letzte verbliebene Stelle durch CSS-Klasse ersetzt) |
| Mobile Darstellung der neuen Foto-Layouts (Hero, Bio, Story-Paar) | ✅ (600 px getestet) |
| Fotogrößen für Web vertretbar optimiert | ✅ (106–192 KB je Bild, progressive JPEGs) |

**Bewusste Entscheidung zu den "Vertrauen schaffen"-Bereichen:** Der
Sprint verlangt vorbereitete Platzhalter für Partnerlogos, Presse,
Kennzahlen und Kundenstimmen. Diese wurden absichtlich **nicht** mit
plausibel wirkenden, aber erfundenen Logos, Presseartikeln oder Zitaten
gefüllt — das wäre gegenüber echten Sponsoren und Kooperationspartnern
irreführend gewesen. Stattdessen zeigen gestrichelt umrandete Slots mit
Beschriftungen wie "Logo folgt" oder "Platz für ein Zitat" transparent,
dass diese Bereiche vorbereitet, aber noch nicht befüllt sind.

## 12. Verzeichnis der verwendeten Fotos

| Datei | Verwendung | Ursprüngliches Bild (Upload) |
|---|---|---|
| `assets/photos/hero-sarah-milou.jpg` | Hero, Startseite | DSC_0876.JPG |
| `assets/photos/bio-dressage-laugh.jpg` | "Warum SPK", Startseite | 802bb388-…JPG |
| `assets/photos/bio-grooming.jpg` | "Sarah &amp; My Milou", Über uns | IMG_7752.jpeg |
| `assets/photos/story-jumping.jpg` | Story-Paar "Früher", Über uns | IMG_4577.JPG |
| `assets/photos/story-dressage.jpg` | Story-Paar "Heute", Über uns | IMG_2705.jpg |

## 13. Sprint 11.10 — UX-Feinschliff & Vorbereitung SPK Creator OS

| Prüfung | Status |
|---|---|
| Doppeltes "SPK" in Header/Footer | ✅ bereits behoben (Feinschliff-Runde), gegengeprüft |
| Kontaktseite: keine sichtbaren Instagram-/Facebook-URLs | ✅ bereits behoben, gegengeprüft |
| Drei Social-Buttons (Instagram, Facebook, TikTok), einheitlicher Stil | ✅ |
| E-Mail-Adresse nicht mehr im Footer | ✅ bereits behoben, gegengeprüft |
| Social-Media-Kennzahlen sauber nach Plattform getrennt | ✅ |
| Kennzahlen über zentrale Konfiguration steuerbar (Vorbereitung SPK Creator OS) | ✅ neu in diesem Sprint |
| Keine Änderung am bestehenden Designstil | ✅ (nur Datenbindung ergänzt, keine visuelle/strukturelle Änderung) |

**Ergebnis:** Die Punkte 1–4 des Sprints waren zum Zeitpunkt der Prüfung
bereits aus der vorherigen Feinschliff-Runde umgesetzt (siehe
Abschnitt „Feinschliff-Runde" im README-Changelog). Neu in diesem
Sprint ist ausschließlich Punkt 5: die sechs Social-Media-Kennzahlen
(Follower/Engagement je Plattform) sind jetzt über `data-cfg`-Attribute
an `js/site-config.js` gebunden, genau wie alle anderen zentral
gepflegten Felder der Website. Getestet durch temporäres Befüllen mit
Beispielwerten (Screenshot verifiziert: alle sechs Werte erscheinen
korrekt in den passenden Karten) und anschließendes Zurücksetzen auf den
leeren Auslieferungszustand.

## 14. Sprint 11.13 — Deployment-Prozess vereinfacht

**Wichtige Einschränkung:** Ich habe keinen direkten Zugriff auf das
GitHub-Repository der Website und konnte daher keinen dort ggf.
vorhandenen GitHub-Actions-Workflow selbst öffnen, ausführen oder
löschen. Die folgende Analyse basiert auf dem Projektinhalt, den ich
kontrolliere (dieses ZIP), und auf allgemeinem Wissen über typische
Ursachen von GitHub-Pages-Timeouts. Eine konkrete Diagnose des
tatsächlichen Repository-Zustands erfordert die manuelle 2-Minuten-
Prüfung aus README, Abschnitt 3a.

| Prüfung | Status |
|---|---|
| Eigener Workflow in diesem Projekt erforderlich? | ❌ Nein — reine statische Website, kein Build-Schritt |
| `.github/workflows/*.yml` in diesem Projekt vorhanden? | ❌ Nein, war nie Teil der Auslieferung |
| Diagnose-Checkliste für das bestehende Repository dokumentiert? | ✅ README, Abschnitt 3a |
| Künftiger Veröffentlichungsablauf in ≤ 5 Schritten dokumentiert? | ✅ README, Abschnitt 3b (genau 5 Schritte) |
| `.nojekyll` weiterhin vorhanden (unabhängig von der Deployment-Methode) | ✅ |

**Begründung der Empfehlung ("Deploy from a branch" statt Actions):**
Ein GitHub-Actions-Workflow lohnt sich, wenn vor der Veröffentlichung
etwas gebaut, kompiliert oder getestet werden muss. Dieses Projekt hat
keinen dieser Schritte — `index.html`, `css/style.css` und `js/*.js`
werden unverändert ausgeliefert. Ein Actions-Workflow fügt in diesem
Fall nur zusätzliche Fehlerquellen hinzu (Runner-Warteschlangen,
Node-/Dependency-Installationen, die bei einer reinen HTML/CSS/JS-Seite
gar nicht nötig sind, und damit die wahrscheinlichste Ursache für die im
Sprint genannten wiederkehrenden Timeouts). "Deploy from a branch"
umgeht diese Kette vollständig: GitHub Pages liest die Dateien direkt
aus dem Branch und veröffentlicht sie, ohne Zwischenschritt.
