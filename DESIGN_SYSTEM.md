# Designsystem: Bestand und Zielvorgaben

## Geltungsbereich

Die Dokumentationsbasis `832f771` enthält keine Produktoberfläche und kein
CSS-Framework oder Komponentenpaket. Aus dem Code lässt sich deshalb noch
kein fertiges Marken-Designsystem ableiten. Die einzigen eigenen visuellen
Werte stehen in der HTML-Test-Fixture in [tests/audit.test.mjs](tests/audit.test.mjs).
Von Lighthouse generierte Berichte sind Oberflächen eines Drittwerkzeugs,
nicht das Design von webchek-skill.

## Tatsächlich im Code vorhandene Werte

| Eigenschaft | Wert | Quelle/Selektor | Bedeutung |
| --- | --- | --- | --- |
| Schrift | `18px sans-serif` | Fixture: `body` | System-Sans-Serif, nicht Inter |
| Textfarbe | `#111` | Fixture: `body` | Dunkler Text |
| Hintergrund | `#fff` | Fixture: `body` | Weiß |
| Linkfarbe | `#004499` | Fixture: `a` | Dunkelblau |
| Außenabstand | `24px` | Fixture: `body` | Seitenrand der Testseite |
| Formularschrift | `inherit` | Fixture: `button,input` | Schrift wird geerbt |
| Eingabebreite | `max-width:90%` | Fixture: `input` | Begrenzung der Testeingabe |
| Rundungen | Nicht definiert | Keine eigene CSS-Regel | Browserdarstellung, kein Radius-Token |

Es gibt keine definierten Markenfarben, Abstandsleiter, Schatten, Breakpoints,
Schriftgewichte oder Zeilenhöhen. Die obigen Werte sind **Testdaten**, keine
freigegebenen Produkttokens. Neue Werte dürfen nicht als aus dem Bestand
übernommen bezeichnet werden.

## Schrift: Inter als gewünschte Richtung

Inter ist eine Zielvorgabe des Produktauftrags, aber bisher weder importiert
noch als Font-Datei vorhanden. Vor einer UI-Implementierung müssen Bezugsquelle,
Lizenzhinweise, Selbsthosting, benötigte Gewichte und Fallback-Schriften
festgelegt werden. Font-Loading und Layoutverschiebungen sind zu prüfen.
Dieses Dokument fügt weder einen externen Font-Request noch eine Abhängigkeit hinzu.

## Komponentenbestand

Die Testseite verwendet semantisches HTML: Überschrift, Links, Bilder,
Formular, E-Mail-Eingabe und Button. Das sind keine wiederverwendbaren
Produktkomponenten. Die absichtlich fehlerhafte Testseite enthält unter anderem
ein Bild ohne Alternativtext und einen Button ohne zugänglichen Namen;
diese Fehler sind Testfälle und keine Gestaltungsvorlagen.

Navigation, Karten, Tarifdarstellung, Dialoge, Tabellen, Benachrichtigungen
und ein Dashboard sind nicht implementiert. Für jede neue Komponente sind
Zweck, Zustände, Tastaturbedienung und responsive Darstellung zu definieren.

## Regeln für eine spätere Oberfläche

Die folgenden Regeln sind Anforderungen, keine Aussage über vorhandenen Code:

- Markenfarben und Tokens erst nach Freigabe zentral definieren; keine fremde Markenpalette übernehmen.
- Inter mit geeigneten System-Fallbacks einsetzen, sobald die Font-Entscheidung getroffen ist.
- Abstände und Rundungen als konsistente Tokens festlegen; Werte nicht frei aus Test-Fixtures ableiten.
- Semantische Elemente, verständliche Labels und sichtbaren Tastaturfokus verwenden.
- Normalen Text mit mindestens 4,5:1 Kontrast gestalten; große Schrift mit mindestens 3:1.
- Fehler und Status nicht allein über Farbe vermitteln; Lade-, Leer-, Fehler- und Erfolgszustände vorsehen.
- Kleine Displays, Textvergrößerung, Tastaturbedienung und reduzierte Bewegung berücksichtigen.
- Automatische axe-Checks durch manuelle Prüfungen ergänzen; Lighthouse-Scores nicht als Konformitätsnachweis ausgeben.
- Komponenten und Tokens nach Umsetzung mit ihrer tatsächlichen Quelldatei dokumentieren.

Die mobilen und Desktop-Viewports der Prüfwerkzeuge sind Messkonfiguration,
keine nachgewiesenen CSS-Breakpoints der zukünftigen Oberfläche.
