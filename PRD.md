# Produktbeschreibung: webchek-skill

Stand: Dokumentationsbasis `main`, Commit `832f771`. Dieses Dokument trennt
vorhandene Funktionen von Zielvorstellungen. Es beschreibt keine bereits
verfügbare SaaS-Plattform.

## Zweck und Zielgruppe

webchek-skill ist ein wiederverwendbarer, deutschsprachiger Audit-Skill mit
lokalen Prüfwerkzeugen für SEO, GEO und Website-Qualität. Er verbindet
Checklisten und fachliche Bewertung mit reproduzierbaren technischen Befunden.
Ziel ist eine priorisierte Maßnahmenliste: Was sollte verbessert werden,
warum, mit welchem Nachweis und wie wird die Verbesserung kontrolliert?

Gedacht für Website-Verantwortliche, Marketing-Teams, Agenturen und Entwickler,
die eigene oder ausdrücklich zur Prüfung freigegebene Websites verbessern.
Die Texte können ohne Installation genutzt werden; ausführbare Prüfungen
setzen Kenntnisse im Umgang mit Node.js und einer Kommandozeile voraus.

## Funktionsumfang

| Bereich | Vorhanden | Grenze |
| --- | --- | --- |
| Audit-Skill | 102 Prüfpunkte, acht Vertiefungsmodule und Berichtsvorlage | Nicht alle Punkte sind automatisiert |
| Browser-Prüfung | Playwright, Seitenmetadaten, Überschriften, Links, JSON-LD-Erfassung, Screenshot, Laufzeitfehler und horizontaler Überlauf | Einzelne Zielseite, kein vollständiger Website-Crawler |
| Barrierefreiheit | axe-core mit WCAG-Tags, maschinenlesbare Befunde | Keine vollständige WCAG-Konformitätsprüfung; manuelle Prüfung bleibt nötig |
| Technik | Lighthouse für Performance, Accessibility, Best Practices und SEO | Labormessung, keine eigenen Felddaten oder Ranking-Prognose |
| GEO | Anleitung für versionierte Fragen, Erwähnungen, Zitate, Empfehlungen und Faktenprüfung | Kein automatisierter KI-Plattform-Monitor und keine kostenpflichtige Integration |
| Architektur, Schema, Conversion | Anleitungen zur Bestandsaufnahme und Bewertung | JSON-LD-Parsing ersetzt keine fachliche Schema-Validierung; kein Experimentierdienst |
| Suchplattformen | Lesende Adapter für Google Search Console und Bing Webmaster Tools | Zugang und Berechtigungen erforderlich; kein OAuth-Login oder Token-Refresh |
| Qualitätssicherung | Lokale Browser-, E2E-, Negativ- und Adaptertests | Lighthouse CI ist in dieser Dokumentationsbasis nicht integriert |

Die genaue Bedienung steht in [README.md](README.md),
[Werkzeuge](references/tools.md) und [Suchplattformen](references/search-platforms.md).

## Typischer Ablauf und Erfolgskriterien

1. URL, Freigabe, Zielmarkt, Sprache, Geschäftsziel und verfügbare Zugänge klären.
2. Ausgangsmessung erstellen; Lauf, Zeitpunkt, Gerät und Prüfgrenzen festhalten.
3. Automatische Befunde durch passende manuelle Module ergänzen.
4. Maßnahmen nach Wirkung, Risiko und Aufwand priorisieren; Befunde belegen.
5. Änderungen nur bei gesondertem Auftrag umsetzen und anschließend nachprüfen.

Ein verwendbarer Bericht trennt bestanden, fehlgeschlagen, nicht geprüft und
nicht anwendbar. Technische Änderungen müssen vergleichbare Vorher-/Nachher-
Nachweise haben. Geschäftlicher Erfolg wird anhand vereinbarter Kennzahlen
wie qualifizierten Anfragen, organischen Klicks oder Conversions bewertet;
ohne Datenzugang ist dieser Erfolg nicht bestätigt. Rankings, Rich Results
und KI-Erwähnungen sind nicht garantiert.

## Tarife und Kosten

Im Code existieren keine Tarife, Preise, Abonnements, Kontingente oder
Abrechnungsfunktionen. Die Repository-Lizenz ist MIT; das ist kein Angebot
für kostenlosen Hosting-, Beratungs- oder Plattformbetrieb.

Offen sind Geschäftsmodell, Tarifnamen, Preise, Währung, Steuerdarstellung,
Nutzungslimits und mögliche Zusatzleistungen. Externe Dienste können eigene
Kosten verursachen. Peec AI und Otterly werden erst nach Klärung von Umfang
und Budget verglichen; ihre aktuellen Preise und Funktionen sind hier nicht
verifiziert. Es werden keine fiktiven Tarifkarten als bestehendes Angebot geführt.

## Bewusste Nicht-Ziele dieses Stands

- Kein gehostetes Dashboard, Mandantensystem, Benutzerkonto oder Zahlungsdienst.
- Kein unbeaufsichtigter öffentlicher URL-Scanner, flächendeckender Crawler oder Penetrationstest.
- Keine automatischen Änderungen an geprüften Websites, Formularsendungen oder Käufe.
- Kein Ersatz für manuelle Accessibility-, Datenschutz- oder Sicherheitsprüfungen.
- Kein automatischer Kauf von Backlinks, keine Ranking- oder GEO-Garantien.
- Keine Vermischung von webchek-skill mit fremden Produktmarken; Quellen bleiben gekennzeichnet.

## Offene Entscheidungen

| Entscheidung | Vor einer Umsetzung zu klären |
| --- | --- |
| Plattform oder lokales Werkzeug? | Nutzerrollen, Hosting, Betrieb und Verantwortlichkeiten |
| Visuelle Identität | Markenfarben, Inter-Einbindung, Tokens und Komponenten; siehe [Designsystem](DESIGN_SYSTEM.md) |
| Sicherheit bei Hosting | Mandantentrennung, SSRF-Schutz, Netzwerkisolation, Limits und Zugriffsschutz |
| Datenhaltung | Aufbewahrung, Löschung, Datenschutz, Export und Zugriff auf Berichte |
| Suchplattform-Zugänge | Berechtigte Properties, sichere Token-Verwaltung und Aktualisierung |
| Regressionen | Separater Lighthouse-CI-PR, stabile Testziele und sinnvoll kalibrierte Schwellen |
| GEO und Conversion | Messfragen, Zielmärkte, Messrhythmus, Datenzugänge und Budget |
| Tarife | Leistungsumfang und Betriebskosten vor Preisfestlegung |

Diese Punkte sind keine Zusage für die nächste Version. Erweiterungen erhalten
eigene Aufträge, Abnahmekriterien und Pull Requests.
