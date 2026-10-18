# Architektur

## Systemgrenze und Dateien

Basis: `main` bei `832f771`. webchek-skill besteht aus Markdown-Anleitungen und
zwei lokalen Node.js-CLIs. Es gibt keinen produktiven HTTP-Server, keine
Datenbank, keine Benutzerverwaltung und kein Frontend-Build-System.

| Datei/Bereich | Verantwortung |
| --- | --- |
| [SKILL.md](SKILL.md) | Einstieg, Arbeitsablauf und Auswahl der Audit-Module |
| [references/checklist.md](references/checklist.md) | Zusammengeführte Prüfkriterien |
| [references/report-template.md](references/report-template.md) | Struktur für bewertete Ergebnisse |
| `references/` | Fachmodule, Werkzeuge, Suchplattformen und Quellen |
| [scripts/audit.mjs](scripts/audit.mjs) | CLI-Validierung, Browser-/axe-/Lighthouse-Prüfungen, Artefakte und Exitcodes |
| [scripts/webmaster.mjs](scripts/webmaster.mjs) | Lesende Google-/Bing-Abfragen und lokaler Export |
| [tests/audit.test.mjs](tests/audit.test.mjs) | Lokaler HTTP-Testserver, echte Browser-/Lighthouse-/axe-Tests und Fehlerfälle |
| [tests/webmaster.test.mjs](tests/webmaster.test.mjs) | Adaptertests mit simulierten API-Antworten; kein Nachweis echter Kontoberechtigung |
| [package.json](package.json), [package-lock.json](package-lock.json) | Node-Anforderung, Befehle und reproduzierbare Abhängigkeiten |
| [LICENSE](LICENSE), [THIRD_PARTY_NOTICES.md](THIRD_PARTY_NOTICES.md) | Projektlizenz und Herkunftshinweise |

## Ablauf eines Website-Checks

```text
CLI-Argumente → Validierung → eigener Laufordner + summary.json
                              ├─ Playwright → Zielwebsite → Browserbefunde/Screenshot
                              │                           └─ axe → Accessibility-Befunde
                              └─ separater Chrome → Lighthouse → JSON-/HTML-Bericht
                           → abschließende Zusammenfassung + Exitcode
```

`all` führt die Prüfungen nacheinander aus. Playwright verwendet einen neuen
Browserkontext, blockiert Service Worker und wartet auf Seitenladung und Body.
Die Standardzeitlimits betragen 15 Sekunden für Aktionen und 45 Sekunden für
Navigation. Erfasst werden unter anderem Titel, Sprache, H1, Metadaten, Links,
JSON-LD, Textmenge und horizontaler Überlauf. Parsebares JSON-LD ist noch kein
fachlich korrektes Schema.

Browser-Gates betreffen fehlende/fehlerhafte HTTP-Antworten, leeren Titel oder
Seiteninhalt, nicht abgefangene Seitenfehler und Überlauf. axe prüft mit den
Tags WCAG 2 A/AA, 2.1 A/AA und 2.2 AA; schwerwiegende und kritische Befunde
lassen das Gate scheitern. Andere Befunde bleiben im Bericht relevant.
Lighthouse erfasst Performance, Accessibility, Best Practices und SEO.
Ohne `--min-performance` ist kein Performance-Mindestscore vorgeschrieben.

Exitcodes: `0` = ausgewählte Gates bestanden, `1` = Befunde, `2` = Konfigurations-
oder Werkzeugfehler. Ein noch als laufend markierter Bericht ist kein Erfolg.
Ein erfolgreicher Check bedeutet weder vollständige Sicherheit noch eine
vollständig zugängliche oder suchmaschinenoptimierte Website.

## Suchplattform-Abfragen

```text
webmaster-CLI → Umgebungszugang → feste Google-/Bing-API → lokaler report.json
```

Google nutzt ein Bearer-Token an `www.googleapis.com`: ohne Property eine
Siteliste, mit Property Search-Analytics-Daten für den angegebenen Zeitraum.
Die lesende Datenabfrage nutzt HTTP POST. Seiten werden in Blöcken von 25.000
Zeilen bis maximal 100.000 abgefragt; die Ausgabe kennzeichnet die Obergrenze.
Das ist kein vollständiges Suchanfragen- oder Serverlog.

Bing nutzt `ssl.bing.com` für `GetUserSites`, `GetQueryStats` und `GetCrawlStats`.
Der API-Key wird gemäß Adapter in der HTTPS-Query übermittelt; Proxy-/Netzwerklogs
müssen daher besonders geschützt werden. Bing-Zeiträume werden vom Anbieter
bestimmt, eigene Datumsparameter sind hier nicht unterstützt.
HTTP-Weiterleitungen sind für beide Adapter verboten, Requests haben 30 Sekunden
Timeout. Fehlermeldungen geben keine rohen API-Antworten oder Tokens aus.
Es gibt keinen automatischen Login oder Token-Refresh.

## Daten und Artefakte

- Website-Checks: standardmäßig `artifacts/run-*`, mit `summary.json`, je nach Modus `browser.json`, `page.png`, `axe.json` und Lighthouse-Berichten.
- Suchplattformen: `artifacts/webmaster-*/report.json`; beim Schreiben Dateimodus `0600`.
- Tests: temporäre lokale Verzeichnisse; Testdaten sind keine echten Kundendaten.
- `artifacts/`, `node_modules/`, `.cache/` und Logs sind Git-ignoriert.

Berichte können URLs, Inhalte, Screenshots und vertrauliche Suchleistungsdaten
enthalten. Es gibt keine vollständige automatische Anonymisierung, zentrale
Datenbank, automatische Löschfrist oder Mandantenzugriffskontrolle. Der Betreiber
schützt und löscht lokale Ausgaben; Git-Ignore ist kein Zugriffsschutz.

## Sicherheit und Grenzen

Die Website-CLI akzeptiert nur HTTP(S) und lehnt Zugangsdaten in Ziel-URLs ab.
Chromium-Sandboxing ist standardmäßig aktiviert. `--no-sandbox` ist eine
ausdrückliche Ausnahme für geeignete isolierte Umgebungen, kein normaler Fix.
TLS-Prüfung darf nicht abgeschaltet werden.

**Kein gehärteter öffentlicher Scan-Dienst:** Private IPs und localhost sind
nicht gesperrt; DNS-Auflösung, Redirect-Ziele und Unterressourcen werden nicht
auf interne Netze oder Cloud-Metadatenziele eingeschränkt. Website-JavaScript
wird ausgeführt und kann weitere Requests auslösen. Zeitlimits ersetzen keine
vollständigen CPU-, Speicher-, Download- oder Netzwerkgrenzen. Auch ein bloßer
Seitenaufruf kann Seiteneffekte haben. Nur freigegebene Ziele prüfen, ohne
vertrauliche Browser-Sessions oder unnötige Zugänge im Prozess.

Vor Hosting sind unter anderem SSRF-Schutz einschließlich Redirects und
DNS-Rebinding, isolierte Worker, eingeschränkter Egress, Quoten, Authentisierung,
Mandantentrennung und geschützte Berichtsablage nötig. Der frei wählbare
`--out`-Pfad ist vertrauenswürdige lokale Konfiguration, keine sichere
Dateisystemgrenze für fremde Nutzer. Webmaster-Zugänge werden nicht als
Seiten-Login an die geprüfte Website weitergegeben.

## Einstellungen und Betrieb

| Einstellung | Geltung / Standard |
| --- | --- |
| Node.js | Mindestens `22.19.0`, gemäß `package.json` |
| Chromium | Playwright-Installation oder `--browser /absoluter/pfad` |
| Audit-Modus | `all`, `browser`, `axe`, `lighthouse` |
| `--url` | Erforderliche HTTP(S)-Zieladresse beim Audit |
| `--out` | Beide CLIs; Standard `artifacts` |
| `--device` | Audit: `mobile` (Standard) oder `desktop`; Browser-Viewports 390×844 bzw. 1440×900 |
| `--min-performance` | Optional 0–100, nur für `all`/`lighthouse` |
| `--no-sandbox` | Audit: explizite Ausnahme, standardmäßig aus |
| `GSC_ACCESS_TOKEN` | Webmaster: Google-Zugang aus Umgebung |
| `BING_WEBMASTER_API_KEY` | Webmaster: Bing-Zugang aus Umgebung |
| `--check-access` | Nur Variablen-Präsenz prüfen, kein erfolgreicher API-Login |
| `--provider`, `--site` | Webmaster: `google`/`bing`, optional genaue Property |
| `--start`, `--end` | Für Google mit Property erforderlich, Format `YYYY-MM-DD` |
| `WEBCHEK_BROWSER` | Nur Tests: alternativer Chromium-Pfad |
| `WEBCHEK_NO_SANDBOX=1` | Nur Tests: ausdrückliche Sandbox-Ausnahme |

Installation und Bedienung stehen in [README.md](README.md). `npm test` führt
die Tests aus; für vorhandenen System-Chromium beispielsweise
`WEBCHEK_BROWSER=/usr/bin/chromium npm test`. Die Tests benötigen lokale Sockets
und einen ausführbaren Browser, aber keine Google-/Bing-Credentials. Es muss
kein dauerhafter Anwendungsserver gestartet werden. Lighthouse CI ist ein
separates Vorhaben und nicht Teil dieser dokumentierten Basis.
