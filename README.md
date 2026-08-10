# SPK — Unternehmenswebsite

Überarbeitete GitHub-Pages-Website für **spk-social-media-coach**. Aus dem
bisherigen App-Landingpage-Projekt wurde die offizielle Unternehmens- und
Creator-Website von SPK / Sarah Philine Koch, vorbereitet für die Meta
Business Verification. Design und Farbwelt sind seit dem Marken-Update an
das offizielle SPK-Logo angepasst (Schwarz/Rosé/Gold).

Kein Build-Schritt, kein Backend, keine Abhängigkeiten außer Google Fonts
(CDN). Reines HTML/CSS/JS, GitHub-Pages-kompatibel.

---

## 1. Struktur

```
/
├── index.html            Startseite
├── ueber-uns.html         Über uns
├── kooperationen.html     Kooperationen (für Unternehmen)
├── kontakt.html           Kontakt (mailto-Formular, kein Backend)
├── impressum.html         Impressum (§ 5 DDG)
├── datenschutz.html       Datenschutzerklärung (DSGVO)
├── privacy.html           Privacy Policy der App "SPK Social Media Coach" (unverändert übernommen, neu geskinnt)
├── terms.html             Terms of Service der App "SPK Social Media Coach" (unverändert übernommen, neu geskinnt)
├── css/style.css          Gesamtes Design-System (Tokens, Layout, Komponenten)
├── js/site-config.js      Zentrale Unternehmensdaten (einzige Datei zum Pflegen)
├── js/main.js             Mobile-Navigation, Kontaktformular (mailto), Config-Injection, Footer-Jahr
├── assets/spk-logo.jpg        Original-Logo (1024×1024, Master-Datei)
├── assets/spk-logo-nav.jpg    Logo, klein (120×120) — für Nav/Footer
├── assets/favicon-16.png, favicon-32.png, apple-touch-icon.png
├── assets/og-image.jpg    Open-Graph-/Social-Preview-Bild (1200×630, mit echtem Logo generiert)
├── assets/photos/         Echte Fotos von Sarah Philine Koch & My Milou (siehe Abschnitt 2)
├── robots.txt
├── sitemap.xml
├── audit.py               Automatisiertes Prüfskript (siehe AUDIT.md)
└── .nojekyll              verhindert Jekyll-Verarbeitung auf GitHub Pages
```

`privacy.html` und `terms.html` sind die bestehenden, für die TikTok-App
rechtlich erforderlichen Seiten. Sie wurden **inhaltlich unverändert**
übernommen (nur optisch an das neue Design angepasst), da sie eine andere
Funktion erfüllen als das neue Impressum/Datenschutz der Unternehmensseite.

---

## 2. Design

- **Farben** (aus dem offiziellen SPK-Logo abgeleitet): Hintergrund
  `#0D0C12` (Schwarz), Text `#F5F1EA` (Warmweiß), Rosé `#F2B4C0`, Gold
  `#E3B876`.
- **Typografie:** Fraunces (Display), Inter (Fließtext), IBM Plex Mono
  (Eyebrows/Labels) — via Google Fonts CDN eingebunden.
- **Signatur-Element:** ein dünner, geschwungener Bogen mit
  Rosé→Gold-Verlauf (SVG), direkt aus den beiden Schwüngen im SPK-Logo
  abgeleitet — als Divider und Kartenakzent verwendet.
- **Logo:** Das offizielle SPK-Logo wird an allen relevanten Stellen
  eingesetzt — Nav, Footer, Favicon (16/32/180px), Open-Graph-Bild.
- **Fotografie:** Seit dem finalen Feinschliff (Sprint 11.7) verwendet die
  Website ausschließlich echte Fotos von Sarah Philine Koch und My Milou
  statt Logo-Platzhaltern — im Hero-Bereich, in den Über-uns-/Warum-SPK-
  Porträtflächen sowie als "Früher/Heute"-Bildpaar (Springreiten →
  Para-Dressur). Alle Fotos liegen komprimiert in `assets/photos/` (je nach
  Einsatzort 640–900 px breit, progressive JPEGs).

---

## 3. Veröffentlichung auf GitHub Pages (vereinfacht, Sprint 11.13)

### 3a. Analyse — Workflow prüfen und vereinfachen

Dieses Projekt ist eine **reine statische Website** (HTML/CSS/JS,
kein Build-Schritt, kein `npm install`, keine Kompilierung). Für ein
Projekt dieser Art ist ein eigener GitHub-Actions-Workflow in der Regel
**nicht notwendig** — er ist die häufigste Ursache für die genannten
Timeout-Probleme (z. B. wartende Actions-Runner, unnötige Build-Schritte
oder ein fehlerhaft konfigurierter Workflow, der bei jedem Push neu
anläuft). Ich habe keinen direkten Zugriff auf das GitHub-Repository und
kann einen dort eventuell vorhandenen Workflow daher nicht selbst öffnen
oder löschen — bitte einmalig folgende 2-Minuten-Prüfung durchführen:

1. Im Repository nachsehen, ob der Ordner `.github/workflows/` existiert
   und eine `.yml`-Datei enthält (z. B. `pages.yml`, `deploy.yml`).
2. Unter **Settings → Pages → Build and deployment → Source** prüfen,
   welche Quelle aktuell eingestellt ist:
   - **"Deploy from a branch"** → kein eigener Workflow aktiv, GitHub
     Pages baut direkt aus dem gewählten Branch/Ordner. Das ist für
     dieses Projekt die richtige, einfachste Einstellung.
   - **"GitHub Actions"** → es läuft ein Workflow (entweder ein von
     GitHub vorgeschlagener Standard-Workflow oder eine eigene
     `.yml`-Datei aus Schritt 1). Das ist für ein reines Static-HTML-
     Projekt unnötige Komplexität und die wahrscheinlichste Ursache für
     wiederkehrende Timeouts.

**Empfehlung, falls "GitHub Actions" aktiv ist:**
1. Unter **Settings → Pages → Build and deployment → Source** auf
   **"Deploy from a branch"** umstellen.
2. Branch **`main`** und Ordner **`/ (root)`** auswählen (passend zur
   Struktur dieses Projekts — `index.html` liegt im Root, kein
   `/docs`-Unterordner nötig).
3. Speichern. GitHub Pages baut ab sofort direkt aus dem Branch, ganz
   ohne Actions-Runner — dadurch entfällt die Timeout-Quelle vollständig.
4. Falls in Schritt 1 eine `.yml`-Datei in `.github/workflows/` gefunden
   wurde: diese Datei kann jetzt gefahrlos gelöscht werden (per Commit
   entfernen), da sie durch die direkte Branch-Bereitstellung ersetzt
   wird. Dadurch verschwindet auch der "Deployments"-Reiter mit den
   bisherigen (evtl. fehlgeschlagenen) Action-Läufen.
5. `.nojekyll` bleibt unverändert im Root bestehen — es verhindert, dass
   GitHub Pages die Dateien fälschlich durch den Jekyll-Prozessor jagt,
   unabhängig davon, welche der beiden Deployment-Methoden aktiv ist.

Diese Umstellung entfernt Komplexität, ohne Funktionen zu verlieren:
Alle Seiten, Assets und die zentrale Konfiguration funktionieren mit
"Deploy from a branch" identisch — GitHub Pages liefert einfach die
vorhandenen Dateien aus, ohne Zwischenschritt.

### 3b. Veröffentlichungsablauf (künftig, maximal 5 Schritte)

1. **Dateien ersetzen** — neue/geänderte Dateien aus diesem Projekt ins
   Repository kopieren (bestehende Dateien überschreiben).
2. **Commit** — Änderungen committen.
3. **Push** — auf `main` pushen.
4. **GitHub Pages veröffentlicht automatisch** — kein manueller Trigger
   nötig; bei "Deploy from a branch" i. d. R. innerhalb von 1–2 Minuten
   live, ganz ohne Actions-Warteschlange.
5. **Website prüfen** — `https://sarahphiline.de/`
   aufrufen und die geänderten Seiten kurz gegenchecken.

**Optional:** Eigene Domain unter **Settings → Pages → Custom domain**
eintragen. Die Website ist dafür vorbereitet (keine hartkodierten
GitHub-Pages-Pfade außer in `sitemap.xml`, `robots.txt` und den
`og:url`/`canonical`-Tags — diese bei Domain-Wechsel manuell anpassen).

---

## 4. Zentrale Unternehmensdaten (Sprint 11.1)

Alle wiederkehrenden Unternehmensdaten werden ab sofort **an einer
einzigen Stelle** gepflegt:

```
js/site-config.js
```

Diese Datei öffnen und die Felder ausfüllen:

```js
legalName: "...",          // Firmenname für das Impressum
responsiblePerson: "...",  // vertretungsberechtigte Person
addressStreet: "...",
addressCity: "...",
addressCountry: "...",
email: "...",              // ohne "mailto:" — nur als Formular-Versandziel verwendet
instagramUrl: "https://instagram.com/...",
facebookUrl: "https://facebook.com/...",
tiktokUrl: "https://www.tiktok.com/@...",

// Social-Media-Kennzahlen (Kooperationen-Seite), optional:
instagramFollowers: "...", instagramEngagement: "...",
facebookFollowers: "...",  facebookEngagement: "...",
tiktokFollowers: "...",    tiktokEngagement: "...",
```

Nach dem Speichern und Pushen erscheinen die Werte automatisch auf:
Kontaktseite (als Buttons, siehe Abschnitt 4a), Impressum,
Datenschutzerklärung und Kooperationen-Seite (Kennzahlen-Karten). Die
E-Mail-Adresse erscheint dabei **nirgends als sichtbarer Text** — sie
wird ausschließlich unsichtbar als Versandziel des Kontaktformulars
verwendet. Felder, die noch offen sind (leer oder in
`[eckigen Klammern]`), zeigen weiterhin klar erkennbar den bisherigen
Platzhalter — kursiv, in Rotbraun abgesetzt, bzw. bei den Kennzahlen ein
schlichtes "—" — auch ganz ohne JavaScript. Es kann also gefahrlos
einzeln nachgetragen werden, ohne dass zwischendurch etwas kaputt oder
leer aussieht.

### 4a. Kontaktseite: nur Buttons, keine sichtbaren URLs

Die Kontaktseite zeigt Instagram, Facebook und TikTok ausschließlich als
Buttons (`.social-btn`) — die eigentliche Profil-URL wird nirgends als
Text angezeigt, nur als `href`-Ziel des Buttons verwendet. Ein weiterer
Kanal (z. B. YouTube) lässt sich jederzeit ergänzen: in `kontakt.html`
einen weiteren `.social-btn`-Block nach demselben Muster einfügen und in
`js/site-config.js` das passende `...Url`-Feld anlegen.

### 4b. Social-Media-Kennzahlen: vorbereitet für SPK Creator OS

Die drei Kennzahlen-Karten auf der Kooperationen-Seite (Instagram,
Facebook, TikTok — je Follower und Engagement-Rate) sind bewusst so
gebaut, dass sie sich **ohne HTML-Änderung** befüllen lassen: Es reicht,
die sechs `...Followers`/`...Engagement`-Felder in `js/site-config.js`
einzutragen. Das gilt sowohl für die manuelle Pflege heute als auch für
eine spätere automatische Befüllung aus SPK Creator OS — sobald dort
eine Exportmöglichkeit (Datei oder API) besteht, muss nur noch ein
kleines Skript diese sechs Felder in `js/site-config.js` schreiben (oder
die Datei durch einen äquivalenten API-Abruf ersetzen); die
Kooperationen-Seite selbst braucht dafür keine Anpassung.

**Nicht** über diese Datei gesteuert: der Meta-Verification-Tag (siehe
Abschnitt 5) sowie alle domain-abhängigen SEO-Tags (siehe Abschnitt 6),
da Crawler diese ohne JavaScript lesen müssen.

Technischer Hintergrund, Datenfluss und Grenzen dieses Mechanismus:
siehe `AUDIT.md`, Abschnitt 4.

### 4c. Kontaktformular scharf schalten (WICHTIG vor dem Livegang)

Im Auslieferungszustand öffnet das Kontaktformular das lokale
E-Mail-Programm des Besuchers (`mailto:`). **Das funktioniert bei vielen
Besuchern nicht** — wer Webmail im Browser nutzt (GMX, Web.de, Gmail,
Outlook Web), sieht beim Absenden schlicht keine Reaktion. Für eine
Geschäftsseite, auf der Werbepartner anfragen sollen, ist das ein echter
Verlust: Die Anfrage kommt nie an, und niemand merkt es.

Lösung: einen kostenlosen Formular-Dienst eintragen. Kein Backend, kein
Server, ca. 5 Minuten Aufwand.

1. Bei einem Formular-Dienst anmelden. Gängige Anbieter mit kostenlosem
   Kontingent sind z. B. **Web3Forms**, **Formspree** oder **Formspark**.
   Für eine deutsche Geschäftsseite lohnt ein Blick darauf, wo der
   Anbieter Daten verarbeitet und ob er einen
   Auftragsverarbeitungsvertrag (AVV) anbietet — das ist DSGVO-relevant.
2. Dort die Empfänger-Adresse hinterlegen (die Adresse, an die die
   Anfragen gehen sollen).
3. Den vom Anbieter erzeugten Endpunkt bzw. Zugangsschlüssel in
   `js/site-config.js` eintragen:
   ```js
   contactFormEndpoint: "https://…",   // vom Anbieter
   contactFormAccessKey: "",           // nur falls der Anbieter das verlangt
   formProviderName: "…",              // Name für die Datenschutzerklärung
   ```
   - Steckt der Schlüssel bereits **in der URL** (Formspree, Formspark),
     bleibt `contactFormAccessKey` leer.
   - Verlangt der Anbieter den Schlüssel **im Formularinhalt**
     (Web3Forms), gehört er in `contactFormAccessKey`.
4. `formProviderName` **nicht vergessen** — dieser Name erscheint
   automatisch in der Datenschutzerklärung (Abschnitt 5). Bleibt das Feld
   leer, steht dort nur „unseren Formular-Dienstleister", was rechtlich
   zu unbestimmt ist.
5. Committen, pushen, auf der Live-Seite eine Testnachricht senden.

**Was dabei automatisch passiert:** Sobald `contactFormEndpoint` gefüllt
ist, schaltet die Website selbstständig um — die Nachricht wird wirklich
abgeschickt, der Besucher bleibt auf der Seite und bekommt eine
Bestätigung; und die Datenschutzerklärung zeigt automatisch den
passenden Absatz (Dienstleister statt `mailto:`). Bleibt das Feld leer,
bleibt alles beim bisherigen `mailto:`-Verhalten. Beide Zustände sind in
sich stimmig, es kann also nichts „halb umgestellt" sein.

**Spam-Schutz** ist bereits eingebaut (unsichtbares Honeypot-Feld) und
in der Datenschutzerklärung beschrieben — dafür ist nichts zu tun.

---

## 5. Domain-Verifizierung bei Meta

Kurzanleitung, um die Website für Meta Business (Instagram/Facebook
Business Verification) zu bestätigen:

1. Im [Meta Business Manager](https://business.facebook.com/) unter
   **Unternehmenseinstellungen → Markensicherheit → Domains** die Domain
   `sarahphiline.github.io` (oder die spätere eigene Domain) hinzufügen.
2. Meta bietet mehrere Verifizierungsmethoden an — für dieses Projekt
   die Methode **"HTML-Tag"** wählen (nicht HTML-Datei-Upload und nicht
   DNS-TXT-Eintrag, da GitHub Pages keinen eigenen DNS-Zugriff für
   Unterverzeichnis-Domains erlaubt).
3. Meta zeigt einen Code im Format `content="XXXXXXXXXXXXXXXX"` an.
   Nur diesen Code kopieren.
4. In `index.html` den Platzhalter ersetzen:
   ```html
   <meta name="facebook-domain-verification" content="HIER_CODE_EINFÜGEN">
   ```
   → `HIER_CODE_EINFÜGEN` durch den kopierten Code ersetzen.
5. Änderung committen und pushen. GitHub Pages veröffentlicht automatisch
   (ca. 1–2 Minuten, siehe Abschnitt 3).
6. Im Meta Business Manager auf **"Verifizieren"** klicken. Meta liest
   die Startseite serverseitig aus — ein Tag auf `index.html` reicht,
   da die Verifizierung domainweit gilt.
7. Bei Fehlern: prüfen, ob die Seite unter
   `https://sarahphiline.de/` öffentlich
   ohne Login erreichbar ist und der Tag im gerenderten Seitenquelltext
   (Browser → "Seitenquelltext anzeigen") tatsächlich sichtbar ist.

---

## 6. Offene Angaben

Die meisten Pflichtangaben sind bereits in `js/site-config.js` mit echten
Daten hinterlegt (Stand: Marken-Update mit dem offiziellen SPK-Logo).
Diese Website enthält für alles, was noch offen ist, weiterhin
**bewusst sichtbar markierte** Platzhalter (keine versteckten
Lorem-Ipsum-Texte).

### Bereits ausgefüllt in `js/site-config.js`
- [x] Firmenname (`legalName`): "Sarah Philine Koch (SPK – Social Media)" —
      **bitte einmal gegenprüfen**, ob diese Kombination aus bürgerlichem
      Namen und Markenbezeichnung so gewünscht ist (Begründung siehe
      Kommentar direkt in der Datei).
- [x] Verantwortliche Person (`responsiblePerson`): Sarah Philine Koch
- [x] Anschrift: Flurstr. 2, 83620 Feldkirchen-Westerham, Deutschland
- [x] Geschäftliche E-Mail (`email`): sarah.philine.koch@icloud.com —
      wirkt jetzt auch auf `privacy.html`/`terms.html` (App-Rechtstexte)
- [x] Instagram-Link (aus `@_sarah.philine_` erzeugt)
- [x] Facebook-Link (aus `@sarahphiline.koch.7` erzeugt)
- [x] Umsatzsteuer/Impressum: Kleinunternehmerregelung § 19 UStG korrekt
      hinterlegt, kein Handelsregistereintrag

### Noch offen
- [ ] Telefonnummer, optional (`phone`) — Zeile bleibt automatisch
      ausgeblendet, bis ein Wert eingetragen wird
- [ ] Meta-Verifizierungscode (siehe Abschnitt 5 — wird erst nach Start
      der Verifizierung durch Meta bereitgestellt)
- [ ] Media-Kit (PDF) für die Kooperationen-Seite:
      als `assets/media-kit.pdf` ablegen, danach Download-Button im
      "Noch zu ergänzen"-Kasten auf `kooperationen.html` ergänzen
- [ ] Vertrauensbereich auf `kooperationen.html` ("Vertrauen &amp;
      Nachweise"): Partnerlogos, Presseerwähnungen, Social-Media-Kennzahlen
      und Kundenstimmen sind als klar erkennbare, gestrichelt umrandete
      Platzhalter-Slots vorbereitet. Bewusst **nicht** mit erfundenen
      Logos/Zitaten befüllt — bitte mit echten Inhalten ersetzen, sobald
      verfügbar (siehe `kooperationen.html`, Abschnitt "Vertrauen &amp;
      Nachweise").

TikTok wurde inzwischen mit echtem Link ergänzt (siehe Changelog,
Feinschliff-Runde). YouTube ist weiterhin nicht angebunden — lässt sich
bei Bedarf jederzeit ergänzen, Anleitung dazu als Kommentar direkt in
`js/site-config.js`.

### Optional / spätere Optimierung
- [ ] Fotos in `assets/photos/` bei Bedarf durch neuere/andere Motive
      ersetzen (gleiche Dateinamen verwenden, dann ist kein HTML-Änderung
      nötig) oder zusätzlich als WebP für nochmals kleinere Dateigrößen
      bereitstellen.
- [ ] Google Fonts self-hosten, um die in `datenschutz.html` beschriebene
      externe Verbindung zu vermeiden (aktuell dokumentiert, nicht blockierend).

---

## 7. Technische Abschlussprüfung (durchgeführt)

Der vollständige Audit von Sprint 11.1 steht in **`AUDIT.md`** (Ergebnis:
0 Fehler, 0 Hinweise). Kurzfassung:

- Alle 8 HTML-Seiten wurden lokal per Headless-Browser gerendert und
  gegen Desktop- (1440 px) und Mobile-Breite (600 px) geprüft.
- Ein eigenes Prüfskript (`audit.py`, im Projekt enthalten) kontrolliert
  automatisiert: Titel, Meta-Description, Canonical, Open-Graph-Tags,
  Favicon, Viewport-Tag, kaputte interne Links, `robots.txt`/`sitemap.xml`.
  Ausführen mit:
  ```bash
  python3 audit.py
  ```
- Sprint 11.0: Eine scroll-getriggerte Reveal-Animation konnte Abschnitte
  dauerhaft unsichtbar lassen — behoben durch reine CSS-Animation beim
  Laden (`@keyframes fadeUp`), berücksichtigt `prefers-reduced-motion`.
- Sprint 11.1: 4 Seiten ohne Open-Graph-Tags sowie ein zu langer
  SEO-Titel gefunden und behoben (Details in `AUDIT.md`, Abschnitt 2).
- **Bekannte Einschränkung der Testumgebung:** Die verfügbare Headless-
  Chrome-Instanz erzwingt in diesem Sandbox-Setup eine Mindest-Viewport-
  Breite von ca. 500 px, echte Schmal-Displays (z. B. iPhone SE, 375 px)
  konnten dadurch nicht pixelgenau gerendert werden. Das CSS verwendet
  ausschließlich Standard-Responsive-Technik ohne feste Breiten, sodass
  echte mobile Browser korrekt reagieren sollten — eine kurze manuelle
  Prüfung auf einem echten Smartphone nach dem Deployment wird dennoch
  empfohlen.
- Kein Dashboard, kein Login, keine SPK-Creator-OS-Funktionen enthalten —
  wie im Sprint gefordert.

---

## 8. Changelog gegenüber der bisherigen Seite

### Sprint 11.0
- Neu: `ueber-uns.html`, `kooperationen.html`, `kontakt.html`,
  `impressum.html`, `datenschutz.html`, `robots.txt`, `sitemap.xml`,
  `.nojekyll`, `assets/og-image.jpg`, `assets/favicon.svg`,
  vollständiges `css/style.css`-Designsystem, `js/main.js`.
- Ersetzt: `index.html` (bisherige App-Landingpage → Unternehmensstartseite).
- Beibehalten (inhaltlich unverändert, nur neu geskinnt):
  `privacy.html`, `terms.html`.

### Sprint 11.1
- Neu: `js/site-config.js` (zentrale Unternehmensdaten), `AUDIT.md`
  (technischer Audit), `audit.py` (automatisiertes Prüfskript).
- Geändert: `js/main.js` (Funktion `applySiteConfig()` ergänzt),
  `kontakt.html` (Facebook-Kontaktkanal + echte Social-Links statt
  reiner Text-Platzhalter), `impressum.html` / `datenschutz.html`
  (Felder an zentrale Config angebunden), Footer aller 8 Seiten
  (Kontakt-E-Mail-Zeile ergänzt), alle 8 Seiten (`rel="preconnect"`,
  `theme-color`, `js/site-config.js` eingebunden).
- Behoben: fehlende Open-Graph-Tags auf 4 Seiten, zu langer SEO-Titel
  auf der Startseite (Details: `AUDIT.md`, Abschnitt 2).
- Keine Datenbankänderungen, keine neuen Umgebungsvariablen, kein
  Build-Schritt (weiterhin reine statische Website ohne Backend).

### Marken-Update (Logo + echte Unternehmensdaten)
- Design komplett auf das offizielle SPK-Logo abgestimmt: neue
  Farbwelt (Schwarz/Rosé/Gold statt Hunter-Grün/Parchment/Brass),
  Signatur-Element von "Sattelstich" auf einen aus dem Logo
  abgeleiteten Bogen umgestellt.
- Logo eingebunden: `assets/spk-logo.jpg` (Master), plus optimierte
  Varianten `spk-logo-nav.jpg` (120×120, Nav/Footer) und
  `spk-logo-portrait.jpg` (240×240, Porträt-Flächen) sowie Favicon-Set
  (16/32/180px) — alle aus der Original-Datei erzeugt, um unnötig große
  Bilder auf jeder Seite zu vermeiden.
- `assets/og-image.jpg` mit dem echten Logo neu generiert.
- `js/site-config.js` mit echten Daten befüllt: Name, Anschrift, E-Mail,
  Instagram- und Facebook-Link; `privacy.html`/`terms.html` nutzen jetzt
  ebenfalls die zentrale E-Mail statt des ursprünglichen
  `YOUR-EMAIL@example.com`-Platzhalters.
- Impressum: Kleinunternehmerregelung § 19 UStG korrekt hinterlegt
  (kein Umsatzsteuer-ID-Platzhalter mehr, kein Handelsregistereintrag).
- **Bug gefunden und behoben:** Der "Kooperation anfragen"-Button in der
  Navigation erschien am Desktop doppelt (ein CSS-Spezifitätsfehler, der
  bereits seit Sprint 11.0 im Code war, aber erst bei der Design-Abnahme
  auffiel). `.nav-cta.mobile` wird jetzt korrekt nur unterhalb von
  860px angezeigt.

### Sprint 11.6 — Markenauftritt &amp; persönliche Story
- `ueber-uns.html` komplett neu strukturiert mit sieben Abschnitten:
  Wer ist Sarah Philine Koch, Sarah &amp; My Milou, Vom Springreiten zur
  Para-Dressur, Sportliche Meilensteine, Die Entstehung von SPK – Social
  Media, Warum Authentizität wichtiger ist als Reichweite, Vision und Ziele.
- Persönliche/medizinische Details wurden redaktionell überarbeitet und
  respektvoll zusammengefasst statt als Auflistung dargestellt; ein
  möglicher Kausalzusammenhang zwischen Impfung und Erkrankung wird als
  zeitlicher Zusammenhang beschrieben, nicht als medizinisch gesicherte
  Tatsache behauptet.
- `kooperationen.html`: neuer Abschnitt "Passende Branchen" mit den sieben
  vom Sprint vorgegebenen Zielbranchen (Reitsportmarken, Pferdefutter,
  Reitbekleidung, Stalltechnik, Pferdegesundheit, Lifestyle, Outdoor);
  Intro-Text stärker auf Unternehmen/Sponsoren ausgerichtet.
- Neue CSS-Komponenten: `.pull-quote` (Zitate), `.branch-row`/`.branch-chip`
  (Branchen-Tags), `.story-section`/`.story-copy` (Fließtext-Abschnitte).
- Markenname vereinheitlicht: "SPK – Social Media" wird an prominenten
  Stellen (Startseite, Kooperationen, Impressum-Konfiguration) konsistent
  ausgeschrieben verwendet; "Sarah Philine" wurde sitework durchgängig zu
  "Sarah Philine Koch" ergänzt (Footer, Portrait-Tags, Fließtext).
- `js/site-config.js`: `legalName` von "SPK Sozial Media" (Tippfehler aus
  Sprint 11.1) auf "SPK – Social Media" korrigiert.

### Sprint 11.7 — Finale Premium-Version
- **Echte Fotos ersetzen alle Logo-Platzhalter:** Hero-Bereich der
  Startseite zeigt jetzt ein Foto von Sarah Philine Koch &amp; My Milou;
  die "Warum SPK"-Sektion (Startseite) und die "Sarah &amp; My Milou"-Sektion
  (Über uns) verwenden ebenfalls echte Fotos statt der bisherigen
  Logo-Textur-Fläche. Neu: ein "Früher/Heute"-Bildpaar (Springreiten →
  Para-Dressur) in der Sprintreiten-Sektion auf `ueber-uns.html`.
- Neue Sektion "Kurz vorgestellt" direkt auf der Startseite (Kurzfassung
  der Geschichte, Link zur vollständigen Version auf `ueber-uns.html`).
- Neue kompakte Sektion "Sportliche Erfolge" auf der Startseite (Kurzform
  der bereits auf `ueber-uns.html` vorhandenen Meilensteine).
- `kooperationen.html`: neue Sektion "Vertrauen &amp; Nachweise" mit
  vorbereiteten (klar als Platzhalter erkennbaren) Slots für
  Partnerlogos, Presseerwähnungen, Social-Media-Kennzahlen und
  Kundenstimmen — bewusst ohne erfundene Inhalte befüllt.
- **Bereinigung für die Veröffentlichung:** Entwickler-Hinweise
  ("Datenquelle"-Kästen auf Impressum/Datenschutz, Google-Fonts-
  Optimierungshinweis) entfernt, da nicht für Website-Besucher gedacht.
  Leere Kontaktkanäle (TikTok, YouTube) aus `kontakt.html` und
  `js/site-config.js` entfernt, da nie befüllt.
- Totes CSS entfernt: `.bio-portrait`-Platzhalterstile und `.field-card`
  (Steckbrief-Karte im Hero) — beide vollständig durch echte Fotos
  ersetzt. Eine verbliebene Inline-Style-Anweisung durch eine
  CSS-Klasse (`.section-head--tight`) ersetzt.
- Fotos für Web optimiert: progressive JPEGs, 640–900 px Breite je nach
  Einsatzort, 106–192 KB pro Bild (ursprüngliche Kameradateien:
  0,9–5,5 MB).

### Feinschliff-Runde (Kundenfeedback nach Sprint 11.7)
- Doppeltes "SPK" in Nav und Footer behoben: Logo-Bildmarke enthält die
  Buchstaben "SPK" bereits selbst, das zusätzliche Textlabel daneben
  wurde entfernt (betraf alle 8 Seiten, Header und Footer).
- Kontaktseite überarbeitet: Statt Kontakt-Items mit sichtbaren
  Rohlinks (E-Mail-Adresse, volle URLs) gibt es jetzt ausschließlich
  große, eindeutige Buttons zu Instagram, Facebook und TikTok — die
  Ziel-URL wird nicht mehr als Text angezeigt. Die geschäftliche
  E-Mail-Adresse wird nicht mehr sichtbar dargestellt (weder auf der
  Kontaktseite noch im Footer), da sie weiterhin unsichtbar als
  Versandziel des Kontaktformulars dient.
- TikTok-Link ergänzt (`https://www.tiktok.com/@_sarah.philine_`) und
  als dritter Button auf der Kontaktseite eingebunden.
- `kooperationen.html`: "Social-Media-Kennzahlen" nach Plattform
  aufgeteilt — Instagram, Facebook und TikTok haben jetzt je eigene
  Follower- und Engagement-Rate-Platzhalter statt einer generischen
  Sammel-Kennzahl.
- Totes CSS entfernt (`.contact-list`, `.contact-item`, `.social-row`,
  `.social-pill`, `.footer-contact`), neue Komponenten `.social-btn` und
  `.platform-stats` ergänzt.

### Sprint 11.10 — UX-Feinschliff &amp; Vorbereitung SPK Creator OS
- Punkte 1–4 aus dem Sprint (doppeltes "SPK", Kontakt-Buttons, E-Mail
  aus Footer, Kennzahlen nach Plattform) waren durch die vorherige
  Feinschliff-Runde bereits umgesetzt — im Rahmen dieses Sprints erneut
  gegengeprüft (Audit-Skript + Screenshots), keine weiteren Funde.
- Neu: Die sechs Social-Media-Kennzahlen (Follower/Engagement je
  Instagram, Facebook, TikTok) sind jetzt über `js/site-config.js`
  gesteuert (`data-cfg`-Bindung wie beim Rest der Seite) statt fest im
  HTML zu stehen. Damit lassen sie sich ohne Code-Änderung befüllen —
  manuell heute, automatisiert aus SPK Creator OS sobald verfügbar
  (siehe README, Abschnitt 4b). End-to-End mit Testwerten geprüft und
  wieder auf den leeren Auslieferungszustand zurückgesetzt.

### Sprint 11.13 — Deployment-Prozess vereinfacht
- Abschnitt 3 ("Veröffentlichung auf GitHub Pages") komplett überarbeitet:
  neue Diagnose-Checkliste (Abschnitt 3a), um einen ggf. vorhandenen
  GitHub-Actions-Workflow im Repository selbst zu finden und auf
  "Deploy from a branch" umzustellen, sowie der künftige
  Veröffentlichungsablauf in genau fünf Schritten (Abschnitt 3b).
- Dieses Projekt liefert weiterhin bewusst **keine** eigene
  `.github/workflows/*.yml`-Datei aus — für eine reine statische Website
  ohne Build-Schritt ist "Deploy from a branch" die einfachste und
  zuverlässigste Methode und vermeidet Actions-bedingte Timeouts von
  vornherein.
- Hinweis zur Grenze dieser Analyse: Ohne direkten Repository-Zugriff
  konnte kein dort ggf. vorhandener Workflow eingesehen oder entfernt
  werden — die Diagnose-Schritte in Abschnitt 3a sind dafür ausgelegt,
  das in unter zwei Minuten selbst zu erledigen.

### Bilder-Update &amp; Terminologie: Para-Reitsport statt Para-Dressur
- Drei neue Fotos aus einer 16-teiligen Lieferung eingebunden:
  `assets/photos/milou-foal-2020.jpg` (My Milou als Fohlen, 2020 — neu
  in der "Sarah & My Milou"-Sektion, gestapelt über dem bestehenden
  Weide-Foto), `assets/photos/story-jumping.jpg` (aktuelles
  Springsport-Comeback, ersetzt das bisherige Foto) und
  `assets/photos/award-ceremony.jpg` (Siegerehrung, neu unterhalb der
  Sportliche-Meilensteine-Karten).
- **Korrigiert:** Das bisherige Sprung-Foto war fälschlich als "Früher"
  beschriftet, obwohl es ein aktuelles Foto von Sarahs Comeback im
  Springsport ist. Beide Bilder im Story-Paar zeigen jetzt korrekt zwei
  parallele, aktuelle Disziplinen ("Springsport · das aktuelle Comeback"
  / "Para-Dressur · Grade III") statt einer irreführenden
  Vorher-Nachher-Erzählung.
- Sprachliche Anpassung site-weit: "Para-Dressurreiterin im Grade III"
  wurde zu "Para-Reitsport-Athletin — aktiv in der Para-Dressur (Grade
  III) und mit wachsendem Comeback im Springsport" erweitert (Startseite
  Hero-Bildunterschrift, Kurzvorstellung, Sportliche-Erfolge-Intro;
  Über-uns Meta-Tags, Lead-Text, Sektionstitel "Springreiten,
  Para-Dressur & das Comeback"). Konkrete Wettkampfergebnisse (z. B.
  "4. Platz Grade III") bleiben unverändert disziplinspezifisch, da es
  sich um Fakten und nicht um Markenidentität handelt. Der Begriff
  "Para-Reitsport" wurde gegen die offizielle Terminologie des
  Bayerischen Reit- und Fahrverbands geprüft (führt Dressur, Springen,
  Voltigieren und Para-Reitsport als eigene Sparte).
- Neue CSS-Komponenten `.bio-photo-stack` (zwei gestapelte Fotos) und
  `.story-photo` (einzelnes, breites Foto mit Bildunterschrift) ergänzt.
- Recherche nach Presseberichten über Sarah Philine Koch durchgeführt:
  keine redaktionelle Berichterstattung gefunden, nur ein
  Ergebnis-/Datenbankprofil (rimondo.com) und offizielle
  Turnier-Ausschreibungen. Bewusst **nicht** als "Presseartikel" auf der
  Kooperationen-Seite eingetragen, um keine Datenbank-Einträge als
  redaktionelle Presse auszugeben — die Platzhalter bleiben dort
  unverändert bestehen.
- Im Zuge der Durchsicht zusätzlich gefunden und behoben: `og:title` und
  `twitter:title` der Startseite trugen noch die längere, vor der
  SEO-Kürzung in Sprint 11.1 verwendete Version des Titels
  ("... im Pferdesport") und wichen dadurch vom `<title>`-Tag ab — jetzt
  wieder konsistent.

### Bildzuschnitt-Korrektur
- Zwei Fotos (Weide-Foto in der "Sarah & My Milou"-Sektion, Siegerehrung
  bei den Sportlichen Meilensteinen) waren im falschen Seitenverhältnis
  gespeichert und wurden dadurch vom Browser automatisch nachgeschnitten
  — Sarah fiel dabei teilweise aus dem Bild. Beide Fotos wurden aus den
  Originaldateien neu zugeschnitten, exakt passend zum jeweiligen
  CSS-Format. Details und Ursachenanalyse: `AUDIT.md`, Abschnitt 16.

### Homepage-Fertigstellung (Formular & Platzhalter-Abbau)
- `kooperationen.html`: Bereiche ohne echten Inhalt entfernt —
  Partnerlogos, Presse & Erwähnungen, Kundenstimmen. Der
  Media-Kit-Bereich ist jetzt eine normale Sektion mit Anfrage-Button
  statt eines „Noch zu ergänzen"-Kastens.
- Social-Media-Kennzahlen erscheinen automatisch erst, wenn in
  `js/site-config.js` mindestens ein Wert eingetragen ist — bis dahin ist
  der Block unsichtbar statt eine Reihe „—" zu zeigen. Die Zahlen können
  manuell aus SPK Creator OS übernommen werden, eine API-Anbindung ist
  dafür nicht nötig.
- Kontaktformular grundlegend überarbeitet: versendet Nachrichten jetzt
  wirklich, sobald ein Formular-Endpunkt konfiguriert ist (Anleitung:
  Abschnitt 4c). Inklusive Feldvalidierung, verständlichen Erfolgs- und
  Fehlermeldungen sowie unsichtbarem Spam-Schutz.
- Datenschutzerklärung (Abschnitt 5) beschreibt jetzt automatisch den
  tatsächlich aktiven Formular-Modus und nennt den Dienstleister, sobald
  einer konfiguriert ist.
- Textkorrektur auf der Kontaktseite: Der Einleitungssatz versprach noch
  Kontakt „per E-Mail", obwohl die E-Mail-Adresse dort bewusst nicht mehr
  angezeigt wird.
- Totes CSS entfernt (`.logo-slot`, `.testimonial-*`).
