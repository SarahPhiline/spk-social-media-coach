"""Kontrastpruefung fuer die Schaltflaeche im aufgeklappten Mobilmenue.

WARUM ES DIESEN TEST GIBT (03.09.2026)
Michael hat sarahphiline.de auf dem iPhone geoeffnet. Im aufgeklappten
Menue war "Kooperation anfragen" kaum lesbar: heller Text auf hellem
Rosa-Goldverlauf. Dieselbe Schaltflaeche weiter unten auf der Seite war
gut lesbar. Ursache war kein Tippfehler, sondern die Rangfolge im
Stilblatt: `.nav-links a` ist genauso spezifisch wie `.btn-primary`
und steht spaeter, also gewinnt die Menuefarbe.

Am Rechner faellt so etwas nie auf, weil das Menue dort nicht aufklappt.
Deshalb rechnet dieser Test die Rangfolge nach, statt sich auf einen
Blick auf die Seite zu verlassen.

WAS DER TEST TUT
Er liest css/style.css, sucht alle Regeln, die auf ein
`<a class="btn btn-primary">` innerhalb von `.nav-links` bei 390 Pixel
Fensterbreite zutreffen, sortiert sie nach Spezifitaet und Quelltext-
reihenfolge und nimmt die gewinnende Textfarbe. Diese Farbe wird gegen
beide Enden des Hintergrundverlaufs gerechnet.

BELEG, DASS DIE NACHRECHNUNG STIMMT
Am 03.09.2026 im Browser bei 390 Pixel gemessen, Menue aufgeklappt:
getComputedStyle des Knopfes lieferte rgb(182, 175, 168), also #b6afa8 -
genau den Wert, den dieser Test aus dem Stilblatt herleitet. Faellt die
Herleitung je auseinander, schlaegt test_hergeleitete_farbe_ist_nicht_
mehr_der_alte_wert an.

Ausfuehren:  py -3 -m pytest pruefungen -q
"""

import re
from pathlib import Path

STYLE = Path(__file__).resolve().parent.parent / "css" / "style.css"

# WCAG 2.1, Erfolgskriterium 1.4.3: normaler Text braucht 4,5 zu 1.
MINDESTKONTRAST = 4.5

# Am 03.09.2026 im Browser gemessener Ist-Wert VOR der Korrektur.
# Dient als Beleg, dass die Herleitung unten den Browser trifft.
BROWSERWERT_VOR_KORREKTUR = "#b6afa8"


# --------------------------------------------------------------------
# Stilblatt einlesen
# --------------------------------------------------------------------

def _entferne_kommentare(text):
    return re.sub(r"/\*.*?\*/", "", text, flags=re.S)


def lies_regeln(css):
    """Liefert [(selektor, deklarationen, reihenfolge, medienbedingung)].

    Bewusst ein kleiner Parser fuer genau dieses Stilblatt: keine
    verschachtelten @media, keine @supports, keine CSS-Nesting-Syntax.
    Taucht so etwas hier je auf, muss dieser Parser mitwachsen.
    """
    css = _entferne_kommentare(css)
    regeln = []
    zaehler = 0

    def bloecke(text, medien):
        nonlocal zaehler
        pos = 0
        while True:
            auf = text.find("{", pos)
            if auf == -1:
                return
            kopf = text[pos:auf].strip()
            tiefe = 1
            j = auf + 1
            while j < len(text) and tiefe:
                if text[j] == "{":
                    tiefe += 1
                elif text[j] == "}":
                    tiefe -= 1
                j += 1
            koerper = text[auf + 1:j - 1]
            if kopf.startswith("@media"):
                bloecke(koerper, kopf[len("@media"):].strip())
            elif kopf.startswith("@"):
                pass  # @font-face, @keyframes - fuer Farben ohne Belang
            else:
                for sel in kopf.split(","):
                    sel = sel.strip()
                    if sel:
                        regeln.append((sel, koerper, zaehler, medien))
                        zaehler += 1
            pos = j

    bloecke(css, None)
    return regeln


def lies_variablen(regeln):
    werte = {}
    for sel, koerper, _, _ in regeln:
        if sel != ":root":
            continue
        for name, wert in re.findall(r"(--[\w-]+)\s*:\s*([^;]+);", koerper):
            werte[name] = wert.strip()
    return werte


def loese_variable(wert, variablen, tiefe=0):
    if tiefe > 10:
        return wert
    treffer = re.search(r"var\((--[\w-]+)\)", wert)
    if not treffer:
        return wert
    ersetzt = wert.replace(treffer.group(0), variablen.get(treffer.group(1), ""))
    return loese_variable(ersetzt, variablen, tiefe + 1)


# --------------------------------------------------------------------
# Selektoren auf ein konkretes Element anwenden
# --------------------------------------------------------------------

# Das gepruefte Element und seine Vorfahren, von aussen nach innen.
# Entspricht dem Markup in index.html:
#   <ul class="nav-links"><li class="nav-cta mobile">
#     <a class="btn btn-primary" href="kontakt.html">Kooperation anfragen</a>
KETTE_KNOPF = [
    {"tag": "html", "klassen": set()},
    {"tag": "body", "klassen": set()},
    {"tag": "header", "klassen": {"site-header"}},
    {"tag": "nav", "klassen": {"nav"}},
    {"tag": "ul", "klassen": {"nav-links", "is-open"}},
    {"tag": "li", "klassen": {"nav-cta", "mobile"}},
    {"tag": "a", "klassen": {"btn", "btn-primary"}},
]

# Derselbe Ort, aber ein gewoehnlicher Menueeintrag wie "Ueber uns".
KETTE_EINTRAG = KETTE_KNOPF[:-2] + [
    {"tag": "li", "klassen": set()},
    {"tag": "a", "klassen": set()},
]

# Zustaende, die im Ruhezustand NICHT gelten. Der Fehler war im
# Ruhezustand sichtbar, nicht beim Antippen.
NICHT_AKTIVE_ZUSTAENDE = (":hover", ":focus", ":active", ":focus-visible",
                          ":visited", "::before", "::after")


def _passt_abschnitt(teil, knoten):
    """Passt ein Selektorabschnitt wie `a.btn-primary` auf einen Knoten?"""
    if any(z in teil for z in NICHT_AKTIVE_ZUSTAENDE):
        return False
    if "[" in teil:
        return False  # z. B. [aria-current="page"] - trifft diesen Knopf nicht
    if ":not(" in teil:
        innen = re.search(r":not\(([^)]*)\)", teil).group(1)
        teil = teil.replace(":not(" + innen + ")", "")
        if _passt_abschnitt(innen, knoten):
            return False
    teil = re.sub(r":[\w-]+(\([^)]*\))?", "", teil)
    klassen = set(re.findall(r"\.([\w-]+)", teil))
    tag = re.match(r"^([\w-]+)", teil)
    if tag and tag.group(1) != knoten["tag"]:
        return False
    return klassen <= knoten["klassen"]


def passt(selektor, kette):
    """Nur Nachfahrenkombinator - andere Kombinatoren kommen hier nicht vor."""
    if any(k in selektor for k in (">", "+", "~")):
        return False
    teile = selektor.split()
    if not _passt_abschnitt(teile[-1], kette[-1]):
        return False
    idx = len(kette) - 2
    for teil in reversed(teile[:-1]):
        while idx >= 0 and not _passt_abschnitt(teil, kette[idx]):
            idx -= 1
        if idx < 0:
            return False
        idx -= 1
    return True


def spezifitaet(selektor):
    ids = len(re.findall(r"#[\w-]+", selektor))
    klassen = len(re.findall(r"\.[\w-]+", selektor))
    klassen += len(re.findall(r"\[[^\]]+\]", selektor))
    klassen += len(re.findall(r"(?<!:):(?!:)[\w-]+", selektor))
    tags = len(re.findall(r"(?:^|[\s>+~])([a-z][\w-]*)", selektor))
    return (ids, klassen, tags)


def medienbedingung_gilt(bedingung, breite):
    if bedingung is None:
        return True
    for m in re.finditer(r"(min|max)-width:\s*(\d+)px", bedingung):
        art, px = m.group(1), int(m.group(2))
        if art == "min" and breite < px:
            return False
        if art == "max" and breite > px:
            return False
    return True


def gewinnende_textfarbe(kette, breite=390):
    """Liefert (farbe, alle_treffer) - der letzte Treffer ist der Sieger."""
    regeln = lies_regeln(STYLE.read_text(encoding="utf-8"))
    variablen = lies_variablen(regeln)
    treffer = []
    for sel, koerper, reihenfolge, medien in regeln:
        if not medienbedingung_gilt(medien, breite):
            continue
        if not passt(sel, kette):
            continue
        for wert in re.findall(r"(?<![\w-])color\s*:\s*([^;}]+)", koerper):
            treffer.append((spezifitaet(sel), reihenfolge, sel, wert.strip()))
    if not treffer:
        return None, []
    treffer.sort(key=lambda t: (t[0], t[1]))
    return loese_variable(treffer[-1][3], variablen).strip(), treffer


def verlaufsenden():
    regeln = lies_regeln(STYLE.read_text(encoding="utf-8"))
    variablen = lies_variablen(regeln)
    verlauf = loese_variable(variablen["--gradient-accent"], variablen)
    return re.findall(r"#[0-9a-fA-F]{6}", verlauf)


def menuehintergrund():
    regeln = lies_regeln(STYLE.read_text(encoding="utf-8"))
    variablen = lies_variablen(regeln)
    return loese_variable(variablen["--bg-raised"], variablen).strip()


# --------------------------------------------------------------------
# Kontrast nach WCAG 2.1
# --------------------------------------------------------------------

def _kanal(c):
    c = c / 255
    return c / 12.92 if c <= 0.04045 else ((c + 0.055) / 1.055) ** 2.4


def helligkeit(hexfarbe):
    h = hexfarbe.lstrip("#")
    r, g, b = (int(h[i:i + 2], 16) for i in (0, 2, 4))
    return 0.2126 * _kanal(r) + 0.7152 * _kanal(g) + 0.0722 * _kanal(b)


def kontrast(vorne, hinten):
    a, b = helligkeit(vorne), helligkeit(hinten)
    hell, dunkel = max(a, b), min(a, b)
    return round((hell + 0.05) / (dunkel + 0.05), 2)


# --------------------------------------------------------------------
# Tests
# --------------------------------------------------------------------

def test_schaltflaeche_im_menue_ist_lesbar():
    farbe, treffer = gewinnende_textfarbe(KETTE_KNOPF)
    assert farbe, "keine color-Regel fuer den Knopf im Menue gefunden"
    enden = verlaufsenden()
    werte = [(ende, kontrast(farbe, ende)) for ende in enden]
    schlechtester = min(v for _, v in werte)
    sieger = treffer[-1]
    assert schlechtester >= MINDESTKONTRAST, (
        "Schaltflaeche 'Kooperation anfragen' im aufgeklappten Menue bei 390 px: "
        "Textfarbe " + farbe + " ergibt "
        + " und ".join(ende + " = " + str(wert) + " zu 1" for ende, wert in werte)
        + ". Gefordert sind " + str(MINDESTKONTRAST) + " zu 1. Die Farbe kommt aus "
        "der Regel '" + sieger[2] + "' (Spezifitaet " + str(sieger[0]) + ", "
        "Quelltextstelle " + str(sieger[1]) + ") und nicht aus '.btn-primary'."
    )


def test_hergeleitete_farbe_ist_nicht_mehr_der_alte_wert():
    """Schutz gegen eine stillschweigend falsche Nachrechnung.

    Vor der Korrektur lieferte der Browser #b6afa8. Ergibt die Herleitung
    weiterhin genau diesen Wert, ist entweder die Korrektur nicht
    angekommen oder die Herleitung rechnet am Stilblatt vorbei.
    """
    farbe, _ = gewinnende_textfarbe(KETTE_KNOPF)
    assert farbe is not None
    assert farbe.lower() != BROWSERWERT_VOR_KORREKTUR, (
        "Der Knopf im Menue traegt weiterhin " + BROWSERWERT_VOR_KORREKTUR
        + " - den am 03.09.2026 im Browser gemessenen Wert vor der Korrektur."
    )


def test_menueeintraege_bleiben_unveraendert():
    """Start, Ueber uns, Kooperationen, Kontakt sind lesbar und bleiben es."""
    farbe, _ = gewinnende_textfarbe(KETTE_EINTRAG)
    hintergrund = menuehintergrund()
    wert = kontrast(farbe, hintergrund)
    assert farbe.lower() == "#b6afa8", (
        "Menuetext ist jetzt " + str(farbe) + " statt #b6afa8"
    )
    assert wert >= MINDESTKONTRAST, (
        "Menuetext " + farbe + " auf " + hintergrund + " = " + str(wert) + " zu 1"
    )


def test_der_knopf_ausserhalb_des_menues_bleibt_unveraendert():
    """Das Vorbild. Er war richtig und darf sich nicht mitverschieben."""
    kette = [
        {"tag": "html", "klassen": set()},
        {"tag": "body", "klassen": set()},
        {"tag": "section", "klassen": {"hero"}},
        {"tag": "a", "klassen": {"btn", "btn-primary"}},
    ]
    farbe, _ = gewinnende_textfarbe(kette)
    enden = verlaufsenden()
    assert farbe.lower() == "#17120d", (
        "Knopf ausserhalb des Menues ist jetzt " + str(farbe) + " statt #17120d"
    )
    for ende in enden:
        assert kontrast(farbe, ende) >= MINDESTKONTRAST
