# SPK — Unternehmenswebsite (Sprint 11.0)

Überarbeitete GitHub-Pages-Website für **spk-social-media-coach**. Aus dem
bisherigen App-Landingpage-Projekt wurde die offizielle Unternehmens- und
Creator-Website von SPK / Sarah Philine, vorbereitet für die Meta Business
Verification.

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
├── impressum.html         Impressum (§ 5 TMG) — enthält Platzhalter
├── datenschutz.html       Datenschutzerklärung (DSGVO) — enthält Platzhalter
├── privacy.html           Privacy Policy der App "SPK Social Media Coach" (unverändert übernommen, neu geskinnt)
├── terms.html             Terms of Service der App "SPK Social Media Coach" (unverändert übernommen, neu geskinnt)
├── css/style.css          Gesamtes Design-System (Tokens, Layout, Komponenten)
├── js/main.js             Mobile-Navigation, Kontaktformular (mailto), Footer-Jahr
├── assets/favicon.svg     Favicon (SPK-Monogramm)
├── assets/og-image.jpg    Open-Graph-/Social-Preview-Bild (1200×630, generiert)
├── robots.txt
├── sitemap.xml
└── .nojekyll              verhindert Jekyll-Verarbeitung auf GitHub Pages
```

`privacy.html` und `terms.html` sind die bestehenden, für die TikTok-App
rechtlich erforderlichen Seiten. Sie wurden **inhaltlich unverändert**
übernommen (nur optisch an das neue Design angepasst), da sie eine andere
Funktion erfüllen als das neue Impressum/Datenschutz der Unternehmensseite.

---

## 2. Design

- **Farben:** Ink `#161A16`, Paper `#F1ECE1`, Hunter-Grün `#33473A`,
  Brass `#A6813D`, Oxblood `#6B2E2A`.
- **Typografie:** Fraunces (Display), Inter (Fließtext), IBM Plex Mono
  (Eyebrows/Labels) — via Google Fonts CDN eingebunden.
- **Signatur-Element:** der "Sattel-Stich" (gestrichelte Doppellinie),
  angelehnt an handgenähtes Leder/Sattelzeug — durchgängig als Divider,
  Card-Rahmen und Detail verwendet, statt eines wörtlichen Pferde-Motivs.
- Bewusst **keine** Fake-Fotos/Bildplatzhalter: Das "Porträt" auf der
  Startseite/Über-uns-Seite ist ein gestaltetes, klar als Textur erkennbares
  Feld mit Beschriftung — kein kaputt wirkendes Bild. Echte Fotos können
  jederzeit eingesetzt werden (siehe Abschnitt 4).

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

## 6. Offene Angaben — bitte von Laurenz ergänzen

Diese Website enthält **bewusst sichtbar markierte** Platzhalter (keine
versteckten Lorem-Ipsum-Texte), da die echten Unternehmensdaten noch nicht
vorliegen. Vor Veröffentlichung/Meta-Verification bitte ausfüllen:

### Zentral in `js/site-config.js` (seit Sprint 11.1 — ein Ort für alles)
- [ ] Vollständiger Name bzw. Firmenname (`legalName`)
- [ ] Vertretungsberechtigte Person (`responsiblePerson`)
- [ ] Ladungsfähige Anschrift (`addressStreet`, `addressCity`, `addressCountry`)
- [ ] Geschäftliche E-Mail-Adresse (`email`)
- [ ] Telefonnummer, optional (`phone`)
- [ ] Instagram-Link (`instagramUrl`)
- [ ] Facebook-Link (`facebookUrl`)
- [ ] TikTok-Link, optional (`tiktokUrl`)
- [ ] YouTube-Link, optional (`youtubeUrl`)

Diese Felder wirken automatisch auf `impressum.html`, `datenschutz.html`,
`kontakt.html` und den Footer aller Seiten — siehe Abschnitt 4. Es muss
**nicht** mehr in mehreren Dateien gesucht/ersetzt werden.

### Weiterhin direkt im Impressum zu pflegen (Sonderfälle, nicht zentralisiert)
- [ ] Umsatzsteuer-ID, falls vorhanden — sonst Hinweis auf § 19 UStG prüfen
- [ ] Handelsregister-Eintrag, falls vorhanden

Beide Seiten (`impressum.html`, `datenschutz.html`) haben oben je einen
farblich hervorgehobenen "Noch zu ergänzen"-Hinweis für diese Sonderfälle.

### Meta Business Verification
- [ ] Verifizierungscode von Meta eintragen in `index.html`, im `<head>`
      (Kurzanleitung: Abschnitt 5):
      ```html
      <meta name="facebook-domain-verification" content="HIER_CODE_EINFÜGEN">
      ```

### App-Seiten (`privacy.html`, `terms.html`)
- [ ] `YOUR-EMAIL@example.com` durch echte Kontakt-E-Mail ersetzen (zweimal,
      je einmal pro Datei) — dieser Platzhalter stammt bereits aus der
      ursprünglichen Version dieser Seiten.

### Kooperationen (`kooperationen.html`)
- [ ] Media-Kit (PDF) erstellen und als `assets/media-kit.pdf` ablegen,
      danach Download-Button im "Noch zu ergänzen"-Kasten ergänzen.

### Optional / spätere Optimierung
- [ ] Google Fonts self-hosten, um die in `datenschutz.html` beschriebene
      externe Verbindung zu vermeiden (aktuell dokumentiert, nicht blockierend).
- [ ] Echtes Foto von Sarah Philine anstelle der gestalteten Textur-Fläche
      in `index.html` (`.bio-portrait`) und `ueber-uns.html` einsetzen; dazu
      das `<div class="bio-portrait">`-Markup durch ein `<img>` ersetzen.
- [ ] `assets/og-image.jpg` bei Bedarf durch eine Variante mit echtem Foto
      ersetzen (aktuell ein programmatisch erzeugtes, markenkonformes
      Grafik-Bild, 1200×630 px).

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
