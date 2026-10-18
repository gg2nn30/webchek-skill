# Ausführbare Website-Prüfungen

## Installation

Im Checkout mit Node.js >= 22.19 arbeiten:

```bash
npm ci --ignore-scripts
npx --no-install playwright install chromium
```

Das Lockfile fixiert die Abhängigkeiten. Der zweite Befehl lädt den zur gepinnten
Playwright-Version passenden Browser; gegebenenfalls fehlen Systembibliotheken,
die entsprechend der Playwright-Dokumentation installiert werden müssen.
Alternativ einen vorhandenen Chromium mit `--browser /absoluter/pfad` verwenden.
Browser und Paketversionen bei Vergleichen festhalten. Kein MCP erforderlich.

## Befehle

```bash
npm run audit -- --url https://example.com
npm run audit:browser -- --url https://example.com --device desktop
npm run audit:axe -- --url https://example.com
npm run audit:lighthouse -- --url https://example.com --min-performance 80
```

Standard ist eine mobile Emulation; `--device desktop` wählt Desktop.
Die Lighthouse-Messung nutzt ihr eigenes emuliertes Profil und ist nicht identisch
mit dem Playwright-Viewport. Die tatsächlichen Lighthouse-Einstellungen stehen
im Lighthouse-JSON. Für Vergleiche dasselbe Werkzeug/Profil verwenden.

Optionen: `--out DIRECTORY` (Standard `artifacts`), `--browser PATH`, `--help`.
Browser-Sandbox bleibt eingeschaltet. Nur falls ein vertrauenswürdiger isolierter
Container keine Browser-Sandbox unterstützt, `--no-sandbox` ausdrücklich setzen;
die Entscheidung wird im Bericht gespeichert. Niemals TLS-Prüfung abschalten.

Die Kommandos navigieren nur zur angegebenen Seite, füllen keine Formulare aus
und folgen Links nicht automatisch. Seiten können beim Laden trotzdem Analytics
oder andere Anfragen auslösen. Nur geeignete, autorisierte URLs ohne Secrets
verwenden. Es gibt keinen automatischen Website-Crawl oder vollständigen Kaufpfad.

## Berichte und Gates

Jeder Aufruf erzeugt einen neuen Ordner `artifacts/run-*`:

| Datei | Inhalt |
| --- | --- |
| summary.json | Zeitpunkt, Ziel, Profil, Paketversionen, Ergebnisse, Fehler und Exitcode |
| browser.json | Browser-Version, HTTP-Status, Titel, H1, Links, Metadaten, JSON-LD-Parseprüfung, JS-Fehler |
| page.png | Screenshot der geprüften Seite |
| axe.json | Violations, bestandene Regeln und manuell zu prüfende incomplete-Ergebnisse |
| lighthouse.json / lighthouse.html | Lighthouse-Messwerte, Einstellungen und Detailbefunde |

Einzelmodi erzeugen nur die betroffenen Berichte. `axe` benötigt den Browser und
führt deshalb auch dessen Smoke-Check aus. Ein abgebrochener Lauf kann ein
`running`-Summary hinterlassen; das ist kein fertiges Ergebnis.

- **Exit 0:** Gewählte Gates bestanden. Lighthouse-Scores sind ohne expliziten
  Mindestwert nur informativ. Das bedeutet nicht „Website fehlerfrei“.
- **Exit 1:** Befunde: HTTP >= 400, fehlender Titel/Body-Text, JS-Laufzeitfehler,
  horizontaler Überlauf, serious/critical axe-Verstöße oder unterschrittene
  explizite Performance-Schwelle.
- **Exit 2:** Konfigurations- oder Werkzeugfehler; Prüfungen nicht vollständig.

Moderate/minor axe-Verstöße und `incomplete` bleiben im Bericht sichtbar und
brauchen eine Bewertung. Die ausgewählten WCAG-A/AA-Regeln sind keine vollständige
Konformitätsprüfung. Lighthouse zeigt Laborwerte, keine Feld-INP-Werte oder
vollständige SEO-/GEO-Sichtbarkeit. JSON-LD-Parsing bestätigt keine Schema.org-
Gültigkeit oder Rich-Result-Eignung. Dynamische spätere Zustände separat testen.

Berichte können URLs, DOM-Auszüge, Bildschirmdaten und öffentliche Seiteninhalte
enthalten. Nicht mit Secrets in URLs arbeiten; Artefakte vor Weitergabe prüfen.
`artifacts/` ist Git-ignoriert; keine automatischen Uploads oder Veröffentlichung.

## Reproduzierbare Validierung der Anbindung

```bash
npm test
```

Bei vorhandenem Systembrowser:

```bash
WEBCHEK_BROWSER=/usr/bin/chromium npm test
```

Nur für den oben beschriebenen Container-Ausnahmefall kann zusätzlich
`WEBCHEK_NO_SANDBOX=1` gesetzt werden. Die Tests starten eine lokale HTTP-Fixture,
prüfen einen vollständigen Werkzeuglauf, absichtliche axe-Defekte, HTTP-Fehler,
Browserstart-Fehler und einen Navigations-/Formularvalidierungspfad ohne Versand.
Testberichte bleiben in einem eindeutig benannten temporären Ordner; dessen Pfad
steht im Testoutput. Ergebnisse dieser Fixture sind kein Audit einer Kundenwebsite.

Für echte E2E-Szenarien die [E2E-Anleitung](e2e-tests.md) nutzen und passende
Nutzerergebnisse im Zielprojekt prüfen. CLI-Befehle und aktuelle Reportpfade in
die [Berichtsvorlage](report-template.md) übernehmen.
