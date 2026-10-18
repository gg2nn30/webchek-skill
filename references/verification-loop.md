# Verification Loop für Codex

Eigenständig formulierter Ablauf; Herkunft und Abweichungen siehe
[Quellen](sources.md). Für jedes Audit und jede beauftragte Änderung anwenden.

## Ausgangszustand → Prüfung → Maßnahme → Nachprüfung

1. Umfang, Datum, Ziel-URLs, Umgebung und verfügbare Daten festhalten. Bei Codezugriff
   zuerst Projektanweisungen, Git-Status, Manifeste, Lockfiles und CI lesen.
   Vorhandene Nutzeränderungen bewahren. Referenzstand und eigene Änderungen
   unterscheiden; nicht pauschal den letzten Commit als eigenen Diff behandeln.
2. Pro Ziel ein beobachtbares Erfolgskriterium definieren, z. B. „Formular zeigt
   nach Testversand Bestätigung und genau einen gespeicherten Testdatensatz“.
3. Ausgangsfehler reproduzieren. Bei Performancevergleich Geräteprofil, Browser,
   Netzbedingungen, Cachezustand und Datenstand dokumentieren. Bei starkem Rauschen
   mehrere vergleichbare Messungen durchführen und die Streuung nennen.
4. Audit: Befunde und Maßnahmen dokumentieren. Implementierungsauftrag: kleine,
   zusammenhängende Änderungen ausführen und direkt betroffene Checks wiederholen.
5. Vor Abschluss relevante Projektprüfungen ausführen: Build, Typprüfung, Lint,
   passende Unit-/Integrationstests, E2E-Kernpfade und gezielte Sicherheitschecks.
   Vorhandene Projektbefehle und gepinnte Werkzeuge nutzen; keine beliebigen
   Pakete über `npx` nachladen und keine fremden Frameworks voraussetzen.
6. Fehler als Umgebungsproblem, bestehender Defekt oder neue Regression einordnen.
   Abhängige Prüfungen bei fehlender Voraussetzung offen lassen; unabhängige
   Prüfungen weiterführen. Nach einer Korrektur betroffene Checks erneut ausführen.
7. Eigenen Diff und aktuelle Artefakte prüfen. Abschluss anhand nachgewiesener
   Kriterien formulieren; ein grüner Build allein bestätigt keine Nutzerfunktion.

## Verlässliche Ausführung

- Arbeitsverzeichnis, Befehl, Zielumgebung, Exitcode und Berichtspfad aufzeichnen.
- Befehle bevorzugt ohne Pipeline ausführen. Bei notwendigem Logging unter Bash
  `set -o pipefail` verwenden und den Status des Prüfprozesses erhalten.
  `head`/`tail` dürfen einen fehlgeschlagenen Prozess nicht als Erfolg verdecken.
- Bestanden, fehlgeschlagen, übersprungen, erwartet fehlgeschlagen, instabil und
  nicht ausgeführt getrennt berichten. Null ausgeführte Tests validieren nichts.
- Nur Artefakte des aktuellen Laufs und gewählten Ziels als Beleg verwenden.
- Coverage nur nach Projektanforderung bewerten; kein pauschales 80%-Ziel einführen.
- Sicherheitswarnungen fachlich einordnen. Ein Scanner ohne Befund beweist keine
  vollständige Sicherheit. Treffer niemals mit geheimen Werten protokollieren.
- Nach bestandenem relevanten Prüfprogramm aufhören. Zusätzliche Wiederholungen
  brauchen einen Grund, etwa Flakiness, neue Änderungen oder Messunsicherheit.

| ID | Prio | Check | Nachweis |
| --- | --- | --- | --- |
| V01 | P1 | Ausgangszustand und Erfolgskriterien dokumentiert | URL-/Commit-Bezug, Zeitpunkt, reproduzierbare Beobachtung |
| V02 | P1 | Relevante Projektprüfungen tatsächlich abgeschlossen | Befehle, Exitcodes, Testzahlen; fehlende Voraussetzungen separat |
| V03 | P1 | Änderung gegen Ausgangsfehler und angrenzende Kernpfade geprüft | Vergleichbare Vorher-/Nachher-Belege |
| V04 | P1 | Diff, Prüfgrenzen und Restprobleme überprüft | Nur belegte Kriterien gelten als verifiziert |

Eine Freigabeempfehlung nennt offene Risiken. Veröffentlichung, Deployment oder
PR-Merge folgen dem Nutzerauftrag; ein Prüfbericht löst sie nicht selbst aus.
