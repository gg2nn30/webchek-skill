# Lighthouse CI für technische Regressionen

Die gepinnte `@lhci/cli`-Version wird mit `npm ci --ignore-scripts` installiert.
Der CI-Runner verwendet die zu LHCI gehörige Lighthouse-Version, die von unserem
Standalone-Audit abweichen kann. Version und `configSettings` im Report sind die
Vergleichsgrundlage; Messwerte unterschiedlicher Versionen nicht gleichsetzen.

## Einen expliziten Zielumfang messen

```bash
WEBCHEK_CI_URLS='["https://example.com/","https://example.com/angebot"]' npm run ci:audit
```

Bei Systembrowser zusätzlich `WEBCHEK_BROWSER=/usr/bin/chromium` setzen.
Ohne Browserpfad verwendet LHCI seine Browser-Erkennung. Für isolierte Container
gilt dieselbe ausdrückliche `WEBCHEK_NO_SANDBOX=1`-Ausnahme wie bei den anderen
Prüfwerkzeugen. In der hier geprüften Umgebung war diese Ausnahme nicht nötig.

Keine URL bedeutet einen Konfigurationsfehler; es wird keine Website geraten.
Für eine Anwendung vorher den passenden Build-/Startschritt des Zielprojekts
ausführen und eine repräsentative URL-Liste angeben. Nur öffentlich geeignete,
autorisierte Seiten ohne Zugangsdaten oder Secrets in der URL verwenden.

## Qualitätsgrenzen

`lighthouserc.cjs` definiert drei mobile Läufe pro URL. Die Medianwerte werden
gegen nachvollziehbare Ausgangsgrenzen geprüft:

| Kategorie | Mindestscore |
| --- | --- |
| Performance | 80 |
| Barrierefreiheit | 90 |
| SEO-Grundlagen | 90 |
| Best Practices | 90 |

Dies sind technische Startbudgets, keine allgemeingültigen Qualitätsziele.
Im Website-Projekt nach repräsentativer Baseline fachlich festlegen. Bei Fehlern
erst Ursache und Messbedingungen prüfen; Grenzen nicht zum Grünmachen absenken.
Einzelne schwere Accessibility-Probleme können trotz hoher Kategorie-Scores
vorliegen; die zusätzlichen axe- und manuellen Checks bleiben erforderlich.

Diese Gates erkennen Unterschreitungen der Grenzen. Ein Rückgang von 98 auf 92
kann bestehen: Es gibt hier keinen automatischen prozentualen Vergleich zum
vorigen Commit und keinen eingerichteten LHCI-Server. Historische Reports
ermöglichen manuelle Vergleiche; ein dauerhafter Baseline-Dienst wäre ein eigener Schritt.
Laborscores bestätigen weder Feld-Core-Web-Vitals noch Rankings oder Conversion.

## Abläufe und Artefakte

`npm run ci:audit` führt `collect`, `assert` und einen ausschließlich lokalen
Filesystem-Export aus. Jeder Lauf hat einen isolierten Ordner unter
`artifacts/lhci/run-*`; `.lighthouseci/` enthält Rohdaten und Assertionsergebnisse,
`reports/` die exportierten HTML-/JSON-Dateien. Auch bei fehlgeschlagenen Gates
werden Berichte exportiert. Keine temporäre öffentliche LHCI-Ablage verwenden.

`summary.json` erfasst die Exitcodes der Stufen. Gesamtcode 0: Gates bestanden;
1: Assertion-Schritt fehlgeschlagen, Details prüfen; 2: Konfigurations-, Erfassungs-
oder Exportproblem. Ein `running`-Bericht ist unvollständig.

## GitHub Actions und lokale Validierung

`.github/workflows/quality.yml` installiert die gepinnten Abhängigkeiten und nutzt
System-Chrome des festgelegten Ubuntu-24.04-Runners, führt unsere Tests aus und
prüft eine lokale CI-Fixture. Playwright und Lighthouse verwenden denselben
expliziten Browserpfad. Es wird kein zusätzlicher Playwright-Chromium heruntergeladen.
Ein vorgeschalteter Browser-Starttest prüft mit aktiver Sandbox, ob eine lokale
Seite gerendert werden kann, und protokolliert Browserpfad und Version.
Ubuntu kann heruntergeladene Browser durch AppArmor-/User-Namespace-Regeln
einschränken; System-Chrome nutzt die Betriebssystemintegration. Dies ist eine
Kompatibilitätsmaßnahme, kein nachträglicher Beweis für die Ursache eines alten
CI-Fehlers. Die Sandbox und Qualitätsgrenzen bleiben unverändert aktiv.
Wenn der Starttest fehlschlägt, werden abhängige Browserprüfungen nicht gestartet.
Die genaue Browser-Version stammt weiterhin vom Runner und steht im Protokoll;
das Pinning des OS-Labels pinnt nicht das vollständige Runner-Image.
Diese Prüfung bestätigt die Werkzeuganbindung, nicht eine Kundenwebsite.
Der Workflow wird erst nach Push auf GitHub ausgeführt; lokale Tests beweisen
keinen erfolgreichen GitHub-Actions-Lauf.

```bash
WEBCHEK_BROWSER=/usr/bin/chromium npm run ci:smoke
```

Den Browser-Starttest separat ausführen:

```bash
WEBCHEK_BROWSER=/usr/bin/chromium node scripts/browser-preflight.mjs
```

Bei einem fehlerhaften Browserpfad endet dieser Test mit Code 2; ein erfolgreicher
Lauf mit Code 0. Er ruft keine externe Website auf und deaktiviert die Sandbox nicht.

Mit `npm run ci:smoke -- --broken` wird absichtlich eine fehlerhafte Fixture
geprüft. Erwartet wird Exitcode 1 und ein erhaltener Ergebnisordner. Dies dient
der Validierung, dass die Gates tatsächlich Fehler erkennen.

GitHub Actions speichert ausschließlich Fixture-Berichte und zugehörige
Test-/Browser-/Lighthouse-Protokolle sieben Tage als
Workflow-Artefakte. Zugriff richtet sich nach Repository-/Actions-Sichtbarkeit;
das ist keine private Ablage für vertrauliche Website-Daten. Webmaster-Daten
und Secrets gehören nicht in diese Uploads. Ein echter Website-Workflow benötigt
deren Build-/Startschritte und passende Ziele anstelle der Fixture.
Die Protokolle liegen in `artifacts/ci/`, Lighthouse-CI-Berichte in
`artifacts/lhci/`. Shell-`pipefail` erhält Fehlercodes trotz Protokollkopie mit
`tee`. Auch bei fehlgeschlagenen Tests werden vorhandene Diagnosen hochgeladen.

## Kostenpflichtige GEO-Dienste

Peec AI, Otterly und andere kostenpflichtige Dienste werden nicht angebunden oder
beschafft. Ein späterer Vergleich setzt Website-Anzahl, Fragenanzahl, Plattformen,
Märkte/Sprachen, Messrhythmus, Export-/API-Bedarf und Budget voraus. Preise und
Funktionsumfang dann aktuell beim Anbieter prüfen. Aktuell ist kein Tarifvergleich
oder Probeabo eingerichtet.
