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
  legalName: "[Vollständiger Name / Firmenname bitte ergänzen]",

  // Vertretungsberechtigte Person (bei Einzelunternehmen meist identisch
  // mit legalName).
  responsiblePerson: "[Name der vertretungsberechtigten Person bitte ergänzen]",

  // Anschrift
  addressStreet: "[Straße und Hausnummer bitte ergänzen]",
  addressCity: "[Postleitzahl und Ort bitte ergänzen]",
  addressCountry: "[Land bitte ergänzen]",

  // Kontakt
  email: "", // z. B. "kontakt@spk-pferdesport.de" — leer = Platzhalter bleibt sichtbar
  phone: "", // optional, z. B. "+49 30 123456"

  // Social-Media-Profile (vollständige URLs)
  instagramUrl: "", // z. B. "https://instagram.com/_sarah.philine_"
  facebookUrl: "",  // z. B. "https://facebook.com/spk.pferdesport"
  tiktokUrl: "",    // z. B. "https://www.tiktok.com/@_sarah.philine_"
  youtubeUrl: "",   // optional

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
