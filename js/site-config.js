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
 *   Angaben (Impressum/Datenschutz) steht im HTML zusätzlich derselbe
 *   Wert fest verdrahtet, falls JavaScript im Browser des Besuchers
 *   nicht läuft.
 *
 * ACHTUNG — DOPPELT GEPFLEGTE WERTE (Entscheidung vom 03.09.2026):
 *   legalName, addressStreet, addressCity, addressCountry,
 *   responsiblePerson und email stehen NICHT nur hier, sondern ein
 *   zweites Mal fest im HTML von impressum.html und datenschutz.html.
 *   Wer einen dieser sechs Werte ändert, muss beide Stellen ändern.
 *
 *   Das verstößt bewusst gegen die Regel "keine Parallel-Lösungen" und
 *   wurde von Michael am 03.09.2026 ausdrücklich in Kauf genommen.
 *   Grund: Eine Anbieterkennzeichnung nach § 5 DDG muss ständig
 *   verfügbar sein. Hing sie allein an diesem Skript, sah ein Besucher
 *   ohne JavaScript — Textbrowser, Vorschaudienst, blockiertes Skript,
 *   Ladefehler — statt Name und Anschrift den Text
 *   "[Vollständiger Name / Firmenname bitte ergänzen]".
 *   Eine Doppelung, die auffällt, ist besser als eine Pflichtangabe,
 *   die verschwindet.
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
  // verlangt § 5 DDG den bürgerlichen Namen.
  // Stand 03.09.2026: Der Wortlaut folgt dem Gewerbeschein vom 01.09.2026
  // (Einzelunternehmen im Nebenerwerb, nach telefonischer Korrektur am
  // 03.09.2026). Vorher stand hier "Sarah Philine Koch (SPK – Social
  // Media)" — ein Marketingname, der so nicht angemeldet ist. Das
  // Impressum muss zur Anmeldung passen.
  legalName: "Sarah Philine Koch – Social Media Creator",

  // Vertretungsberechtigte Person (bei Einzelunternehmen meist identisch
  // mit legalName).
  responsiblePerson: "Sarah Philine Koch",

  // Anschrift
  // Stand 03.09.2026: ausgeschrieben wie im Gewerbeschein vom 01.09.2026.
  // Vorher stand hier die Abkürzung "Flurstr. 2".
  addressStreet: "Flurstraße 2",
  addressCity: "83620 Feldkirchen-Westerham",
  addressCountry: "Deutschland",

  // Kontakt
  // Stand 03.09.2026: eigenes Geschäftspostfach, eingerichtet und geprüft.
  // Vorher stand hier die private Adresse sarah.philine.koch@icloud.com.
  // Diese Adresse steht ein zweites Mal fest im HTML von impressum.html,
  // datenschutz.html, privacy.html und terms.html — siehe Kopfkommentar.
  email: "kontakt@sarahphiline.de",
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
