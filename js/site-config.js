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
  // verlangt § 5 DDG den bürgerlichen Namen; der Markenname "SPK – Social
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

  // Endpunkt für das Kontaktformular.
  // LEER  = das Formular öffnet das lokale E-Mail-Programm des Besuchers
  //         (funktioniert NICHT bei Leuten, die Webmail im Browser nutzen —
  //         für eine Geschäftsseite daher nicht empfohlen).
  // GEFÜLLT = die Nachricht wird wirklich abgeschickt, der Besucher bleibt
  //         auf der Seite und bekommt eine Bestätigung.
  // Einrichtung in ~5 Minuten, kein Backend nötig — siehe README,
  // Abschnitt 4c. Beispiel: "https://api.web3forms.com/submit"
  contactFormEndpoint: "https://api.web3forms.com/submit",

  // Nur nötig, wenn der gewählte Anbieter einen Zugangsschlüssel im
  // Formular-Inhalt erwartet (z. B. Web3Forms). Bei Anbietern, bei denen
  // der Schlüssel bereits in der Endpunkt-URL steckt (z. B. Formspree,
  // Formspark), bleibt das Feld leer.
  // Hinweis: Dieser Schlüssel ist im Quelltext der Website sichtbar. Das
  // ist bei diesen Diensten so vorgesehen und unkritisch — er erlaubt nur
  // das Absenden von Formularen, keinen Zugriff auf empfangene Nachrichten.
  contactFormAccessKey: "06db12d6-41c0-4699-bd87-870a4afa3718",

  // Name des Formular-Dienstleisters — erscheint automatisch in der
  // Datenschutzerklärung (Abschnitt 5). MUSS ausgefüllt werden, sobald ein
  // contactFormEndpoint gesetzt ist, sonst ist die Datenschutzerklärung
  // unvollständig. Beispiel: "Web3Forms (Sandbox Studios LLC)"
  formProviderName: "Web3Forms (Sandbox Studios LLC)",

  // Social-Media-Profile (vollständige URLs). Weitere Kanäle (z. B.
  // YouTube) können bei Bedarf als weiteres Feld ergänzt werden — dazu in
  // kontakt.html einen zusätzlichen .social-pill-Block nach demselben
  // Muster wie Instagram/Facebook/TikTok hinzufügen und hier das
  // passende Feld (z. B. youtubeUrl: "https://youtube.com/@...") anlegen.
  instagramUrl: "https://instagram.com/_sarah.philine_",
  facebookUrl: "https://facebook.com/sarahphiline.koch.7",
  tiktokUrl: "https://www.tiktok.com/@_sarah.philine_",

  // Aktuelle Domain (rein informativ, wird in der README referenziert;
  // steuert keine Tags automatisch — siehe Hinweis oben).
  domain: "https://sarahphiline.de/",

  // Social-Media-Kennzahlen für die Kooperationen-Seite ("Vertrauen &
  // Nachweise" → Social-Media-Kennzahlen). Leer lassen = die Seite zeigt
  // automatisch "—" statt einer erfundenen Zahl.
  // Vorbereitet für SPK Creator OS: Sobald SPK Creator OS Kennzahlen
  // liefern kann, reicht es, diese sechs Werte hier einzutragen (manuell
  // oder später automatisiert per Skript/API) — die Kooperationen-Seite
  // übernimmt sie automatisch, ohne dass am HTML etwas geändert werden
  // muss. Format: einfache Strings wie "12.400" oder "3,8 %".
  instagramFollowers: "",
  instagramEngagement: "",
  facebookFollowers: "",
  facebookEngagement: "",
  tiktokFollowers: "",
  tiktokEngagement: "",
};

/**
 * Kleine Hilfsfunktion: liefert einen Wert nur, wenn er "echt" ist
 * (nicht leer und nicht mehr in eckigen Klammern als Platzhalter markiert).
 */
window.SPK_CONFIG.isFilled = function (value) {
  return typeof value === "string" && value.trim() !== "" && !value.trim().startsWith("[");
};
