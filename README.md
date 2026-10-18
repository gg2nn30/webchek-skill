# webchek-skill

Wiederverwendbarer Skill für SEO-, GEO- und Website-Audits: technische Auffindbarkeit,
Inhalte, mobile Nutzung, Barrierefreiheit, Conversion und laufende Kontrolle.

## Verwendung

Der Einstiegspunkt ist [SKILL.md](SKILL.md). Die vollständigen Prüfkriterien stehen
in der [Audit-Checkliste](references/checklist.md); für Ergebnisse gibt es eine
[Berichtsvorlage](references/report-template.md).

Acht Codex-taugliche Zusatzmodule vertiefen das Audit:

- [Verification Loop](references/verification-loop.md): Ausgangszustand, Prüfungen und Nachweis nach Änderungen.
- [Frontend Patterns](references/frontend-patterns.md): Rendering, Performance, Formulare und Barrierefreiheit.
- [Security Review](references/security-review.md): Zugriffe, Eingaben, Sessions, Abhängigkeiten und Datenlecks.
- [E2E-Tests](references/e2e-tests.md): kritische Nutzerpfade, stabile Tests und aussagekräftige Reports.
- [GEO-Messung](references/geo-measurement.md): versionierte Testfragen, Erwähnungen, Zitate, Empfehlungen und Faktenprüfung.
- [Seitenarchitektur](references/site-architecture.md): URL-Inventar, Navigation, interne Links und Migrationsplanung.
- [Strukturierte Daten](references/structured-data.md): Markup-Erfassung, Inhaltsabgleich, Validatoren und Feature-Unterstützung.
- [Conversion](references/conversion.md): Nutzen, Vertrauen, Formulare, Funnel-Messung und kontrollierte Experimente.

Insgesamt stehen 102 Prüfpunkte zur Verfügung: 46 Basischecks, 30 technische
Zusatzchecks und 26 Marketing-Zusatzchecks. Module werden
nach Auftrag ausgewählt; fehlender Zugriff wird als Prüfgrenze dokumentiert.
[Quellen und Anpassungen](references/sources.md) halten die Herkunft fest.
Für die Adaptionen aus marketingskills sind die
[MIT-Lizenzhinweise](THIRD_PARTY_NOTICES.md) beigefügt.
Die Module enthalten Anleitungen; die [Werkzeuganbindung](references/tools.md)
führt zusätzlich Lighthouse-, Playwright- und axe-core-Prüfungen aus.
Claude-spezifische Konfiguration wird nicht benötigt.

In einem Agenten, der lokale Skills unterstützt, das Repository als Skill-Paket
einbinden oder dessen `SKILL.md` ausdrücklich zum Lesen angeben. Das Speichern im
Repository allein aktiviert den Skill noch nicht automatisch in jedem Produkt.

Beispielauftrag:

> Verwende webchek für https://example.com. Ziel: mehr qualifizierte Anfragen.
> Zielmarkt: Österreich, Sprache: Deutsch. Prüfe die Website und erstelle eine
> priorisierte Maßnahmenliste mit Belegen. Nimm noch keine Änderungen vor.

Für GEO zusätzlich beispielsweise:

> Ergänze eine GEO-Ausgangsmessung mit einem versionierten Set relevanter Fragen.
> Trenne Erwähnungen, eigene Quellenzitate, Empfehlungen und sachliche Fehler.
> Nutze vorhandene Zugänge und weise nicht durchführbare Messungen als offen aus.

Für einen öffentlichen Basischeck genügt eine URL. Search Console, Analytics,
Serverlogs und interne Conversion-Daten ergänzen das Audit, wenn entsprechender
Zugriff vorhanden ist. Fehlender Zugriff wird als Prüfgrenze ausgewiesen.

## Ausführbare Prüfungen

Die Markdown-Anleitungen funktionieren ohne Installation. Für die Prüfwerkzeuge
Node.js >= 22.19 und Chromium verwenden:

```bash
npm ci --ignore-scripts
npx --no-install playwright install chromium
npm run audit -- --url https://example.com
```

Ein vorhandener Chromium kann mit `--browser /absoluter/pfad` gewählt werden.
Einzelprüfungen: `npm run audit:browser`, `npm run audit:axe`,
`npm run audit:lighthouse`, jeweils mit `-- --url URL`.
Berichte liegen je Lauf separat unter `artifacts/run-*`. Exitcodes:
0 = gewählte Gates bestanden, 1 = Befunde, 2 = Werkzeug-/Konfigurationsfehler.
Mit `npm test` lässt sich die Integration an einer lokalen Testwebsite prüfen.
Details, Grenzen und Browser-Voraussetzungen: [Werkzeuge](references/tools.md).

Rankings, Rich Results und Erwähnungen in KI-Antworten werden nicht garantiert.
