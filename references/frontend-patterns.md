# Frontend Patterns für Website-Qualität

Bei Frontend-, Performance- oder UX-Prüfungen lesen. Ohne Codezugriff nur extern
beobachtbares Verhalten bewerten; Architekturannahmen als solche kennzeichnen.
Die Kriterien gelten frameworkunabhängig, React-/Next.js-Hinweise nur bei Nutzung.

| ID | Prio | Prüfung | Erfolgskriterium und Umsetzungshinweis |
| --- | --- | --- | --- |
| F01 | P1 | Semantik und Komponenten | Native Links für Navigation, Buttons für Aktionen, zugeordnete Labels; wiederverwendbare Komponenten erhalten ihre zugängliche Semantik. |
| F02 | P1 | Datenabruf und Zustände | Lade-, Leer-, Fehler- und Erfolgszustände sind sichtbar und sinnvoll; HTTP-Fehler werden erkannt, veraltete Antworten überschreiben keine neuere Suche. |
| F03 | P1 | Formulare | Verständliche Validierung, erreichbare Fehler, passende Autocomplete-Felder, Schutz vor unbeabsichtigtem Doppelversand; Servervalidierung bleibt erforderlich. |
| F04 | P1 | Rendering und Navigation | SEO-relevanter Inhalt und echte Links sind verfügbar; Direktaufruf und Reload von Unterseiten funktionieren, keine blockierenden Hydration-Fehler. |
| F05 | P1 | JavaScript und Interaktion | Schwere optionale Komponenten bedarfsgerecht laden, unnötige Client-Arbeit und lange Tasks reduzieren; Wirkung messen. |
| F06 | P1 | Bilder, Fonts und Layout | Größen/Seitenverhältnisse reservieren; passende responsive Bilder; LCP-Bild nicht versehentlich lazy-loaden; Font-Laden erzeugt keine unnötigen Verschiebungen. |
| F07 | P1 | Tastatur, Dialoge und Bewegung | Fokus beim Öffnen und Schließen sinnvoll führen, modale Dialoge halten Fokus und machen Hintergrund inaktiv; zugängliche Namen und Reduced-Motion-Präferenz beachten. |
| F08 | P1 | Listen, Suche und Filter | Debouncing, stabile Identität und passende Pagination; Virtualisierung darf relevante Inhalte, Tastaturzugang und crawlbare Detail-Links nicht unzugänglich machen. |

## Änderungen sinnvoll auswählen

- Erst Engpass oder Nutzerproblem nachweisen, dann optimieren. Memoization,
  globale State-Verwaltung und zusätzliche Bibliotheken sind keine Standardpflicht.
- Bestehende Framework-Funktionen für Routing, Datenabruf und Fehlerbehandlung
  nutzen. Bei React Effect-Abhängigkeiten stabil halten und Anfragen abbrechen
  oder veraltete Antworten ignorieren; keine ungewollten Abrufschleifen einführen.
- Props und gemeinsamen Zustand nicht mutieren; beispielsweise vor dem Sortieren
  eine Kopie erstellen. Lokalen Zustand lokal halten, Serverdaten passend cachen.
- Fehlergrenzen ergänzen, aber asynchrone und Event-Fehler zusätzlich behandeln.
  Keine internen Stacktraces oder Secrets in der Benutzeroberfläche ausgeben.
- Reusable Komponenten durch Komposition vereinfachen. Ein selbst gebautes Tab-
  oder Combobox-Widget benötigt das vollständige Tastatur- und ARIA-Verhalten;
  ein einzelnes `role`-Attribut reicht nicht.
- Nach Änderungen Hauptpfad, Fehlerzustand, Mobilansicht und Tastatur prüfen.
  Labormessung und echte Core-Web-Vitals-Daten getrennt ausweisen.

Bezug zu Basischecks: U02–U06, T03, I09 und I11. Einen einzelnen Defekt mit mehreren
Check-Referenzen dokumentieren, nicht mehrfach als separate Geschäftsauswirkung zählen.
