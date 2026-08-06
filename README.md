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
├── impressum.html         Impressum (§ 5 TMG)
├── datenschutz.html       Datenschutzerklärung (DSGVO)
├── privacy.html           Privacy Policy der App "SPK Social Media Coach" (unverändert übernommen, neu geskinnt)
├── terms.html             Terms of Service der App "SPK Social Media Coach" (unverändert übernommen, neu geskinnt)
├── css/style.css          Gesamtes Design-System (Tokens, Layout, Komponenten)
├── js/site-config.js      Zentrale Unternehmensdaten (einzige Datei zum Pflegen)
├── js/main.js             Mobile-Navigation, Kontaktformular (mailto), Config-Injection, Footer-Jahr
├── assets/spk-logo.jpg        Original-Logo (1024×1024, Master-Datei)
├── assets/spk-logo-nav.jpg    Logo, klein (120×120) — für Nav/Footer
├── assets/spk-logo-portrait.jpg  Logo, mittel (240×240) — für Porträt-Flächen
├── assets/favicon-16.png, favicon-32.png, apple-touch-icon.png
├── assets/og-image.jpg    Open-Graph-/Social-Preview-Bild (1200×630, mit echtem Logo generiert)
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
  eingesetzt — Nav, Footer, Favicon (16/32/180px), Open-Graph-Bild sowie
  als Bildmarke in den Porträt-Flächen auf Start- und Über-uns-Seite
  (bewusst kein Fake-Foto-Platzhalter, sondern die echte Marke).

---

## 3. Veröffentlichung auf GitHub Pages

1. Inhalt dieses Ordners in das bestehende Repository
   `spk-social-media-coach` einspielen (bestehende Dateien ersetzen).
2. Unter **Settings → Pages** sicherstellen, dass als Quelle weiterhin der
   Branch/Ordner verwendet wird, der bisher schon für GitHub Pages aktiv war.
3. `.nojekyll` muss im Root bleiben, damit GitHub Pages die Dateien direkt
   ausliefert.
4. Nach dem Push ca. 1–2 Minuten warten, dann `https://sarahphiline.github.io/spk-social-media-coach/`
   prüfen.
5. Optional: eigene Domain unter **Settings → Pages → Custom domain**
   eintragen. Die Website ist dafür vorbereitet (keine hartkodierten
   GitHub-Pages-Pfade außer in `sitemap.xml`, `robots.txt` und den
   `og:url`/`canonical`-Tags — diese bei Domain-Wechsel anpassen).

---

## 4. Zentrale Unternehmensdaten (Sprint 11.1)

Alle wiederkehrenden Unternehmensdaten werden ab sofort **an einer
einzigen Stelle** gepflegt:

```
js/site-config.js
```

Diese Datei öffnen und die sieben Felder ausfüllen:

```js
legalName: "...",          // Firmenname für das Impressum
responsiblePerson: "...",  // vertretungsberechtigte Person
addressStreet: "...",
addressCity: "...",
addressCountry: "...",
email: "...",              // ohne "mailto:"
instagramUrl: "https://instagram.com/...",
facebookUrl: "https://facebook.com/...",
tiktokUrl: "https://www.tiktok.com/@...",   // optional
youtubeUrl: "...",                          // optional
```

Nach dem Speichern und Pushen erscheinen die Werte automatisch auf:
Kontaktseite, Impressum, Datenschutzerklärung und im Footer jeder
Seite (E-Mail). Felder, die noch offen sind (leer oder in
`[eckigen Klammern]`), zeigen weiterhin klar erkennbar den bisherigen
Platzhalter — kursiv, in Rotbraun abgesetzt — auch ganz ohne
JavaScript. Es kann also gefahrlos einzeln nachgetragen werden, ohne
dass zwischendurch etwas kaputt oder leer aussieht.

**Nicht** über diese Datei gesteuert: der Meta-Verification-Tag (siehe
Abschnitt 5) sowie alle domain-abhängigen SEO-Tags (siehe Abschnitt 6),
da Crawler diese ohne JavaScript lesen müssen.

Technischer Hintergrund, Datenfluss und Grenzen dieses Mechanismus:
siehe `AUDIT.md`, Abschnitt 4.

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
   `https://sarahphiline.github.io/spk-social-media-coach/` öffentlich
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
- [ ] TikTok-Link, optional (`tiktokUrl`)
- [ ] YouTube-Link, optional (`youtubeUrl`)
- [ ] Meta-Verifizierungscode (siehe Abschnitt 5 — wird erst nach Start
      der Verifizierung durch Meta bereitgestellt)
- [ ] Media-Kit (PDF) für die Kooperationen-Seite:
      als `assets/media-kit.pdf` ablegen, danach Download-Button im
      "Noch zu ergänzen"-Kasten auf `kooperationen.html` ergänzen

### Optional / spätere Optimierung
- [ ] Google Fonts self-hosten, um die in `datenschutz.html` beschriebene
      externe Verbindung zu vermeiden (aktuell dokumentiert, nicht blockierend).
- [ ] Echtes Foto von Sarah Philine anstelle der Logo-Fläche in
      `index.html` (`.bio-portrait`) und `ueber-uns.html` einsetzen; dazu
      das `<img class="portrait-mark">`-Element durch ein Fotomotiv
      ersetzen.
- [ ] `assets/og-image.jpg` bei Bedarf durch eine Variante mit echtem Foto
      ergänzen (aktuell nutzt es bereits das echte Logo, 1200×630 px).

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
