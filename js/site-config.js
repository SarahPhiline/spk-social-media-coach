/**
 * SPK — zentrale Unternehmensdaten
 * ---------------------------------------------------------------
 * EINZIGE Datei, die vor Veröffentlichung / Meta Business Verification
 * ausgefüllt werden muss. Alle Werte hier werden automatisch in
 * Impressum, Datenschutzerklärung, Kontaktseite und Footer eingesetzt
 * (siehe js/main.js, Funktion applySiteConfig()).
 *
 * Wichtig:
 * - Werte OHNE eckige Klammern werden 1:1 auf der Website angezeigt.
 * - Felder, die noch offen sind, bitte NICHT löschen, sondern mit
 *   echten Daten überschreiben. Solange ein Wert wie im Original noch
 *   in eckigen Klammern steht (z. B. "[Straße bitte ergänzen]"), bleibt
 *   er auf der Website automatisch als sichtbarer Platzhalter erhalten.
 * - Diese Datei wird clientseitig eingebunden. Für rechtlich zwingende
 *   Angaben (Impressum/Datenschutz) bleibt zusätzlich der ursprüngliche
 *   Platzhaltertext im HTML als Fallback erhalten, falls JavaScript im
 *   Browser des Besuchers deaktiviert ist.
 * - Domain-abhängige SEO-Tags (canonical, og:url, sitemap.xml, robots.txt)
 *   werden HIER NICHT gepflegt, da Suchmaschinen- und Social-Media-Crawler
 *   diese meist ohne JavaScript lesen. Bei Domain-Wechsel siehe README.md,
 *   Abschnitt "Domain wechseln".
 * ---------------------------------------------------------------
 */
window.SPK_CONFIG = {
  // Marketingname (Logo/Nav) — bleibt bewusst "SPK", i. d. R. nicht ändern.
  brandName: "SPK",

  // Vollständiger Name / offizieller Firmenname für das Impressum.
  // Hinweis: Für Einzelunternehmer:innen ohne Handelsregistereintrag
  // verlangt § 5 TMG den bürgerlichen Namen; der Markenname "SPK – Social
  // Media" wurde deshalb ergänzend in Klammern aufgeführt. Falls es einen
  // eigenständigen Handelsregistereintrag unter diesem Namen gibt, hier
  // entsprechend anpassen.
  legalName: "Sarah Philine Koch (SPK – Social Media)",

  // Vertretungsberechtigte Person (bei Einzelunternehmen meist identisch
  // mit legalName).
  responsiblePerson: "Sarah Philine Koch",

  // Anschrift
  addressStreet: "Flurstr. 2",
  addressCity: "83620 Feldkirchen-Westerham",
  addressCountry: "Deutschland",

  // Kontakt
  email: "sarah.philine.koch@icloud.com",
  phone: "", // optional, z. B. "+49 30 123456"

  // Social-Media-Profile (vollständige URLs). Weitere Kanäle (z. B. TikTok,
  // YouTube) können bei Bedarf als weiteres Feld ergänzt werden — dazu in
  // kontakt.html einen zusätzlichen .contact-item- und .social-pill-Block
  // nach demselben Muster wie Instagram/Facebook hinzufügen und hier das
  // passende Feld (z. B. tiktokUrl: "https://www.tiktok.com/@...") anlegen.
  instagramUrl: "https://instagram.com/_sarah.philine_",
  facebookUrl: "https://facebook.com/sarahphiline.koch.7",

  // Aktuelle Domain (rein informativ, wird in der README referenziert;
  // steuert keine Tags automatisch — siehe Hinweis oben).
  domain: "https://sarahphiline.github.io/spk-social-media-coach/",
};

/**
 * Kleine Hilfsfunktion: liefert einen Wert nur, wenn er "echt" ist
 * (nicht leer und nicht mehr in eckigen Klammern als Platzhalter markiert).
 */
window.SPK_CONFIG.isFilled = function (value) {
  return typeof value === "string" && value.trim() !== "" && !value.trim().startsWith("[");
};
