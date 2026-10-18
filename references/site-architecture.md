# Seitenarchitektur und interne Verlinkung

Für Struktur-, Navigations- und Verlinkungsprüfungen; auch bei Migrationen.
Adaptiert aus marketingskills; [Quellen](sources.md), [Lizenz](../THIRD_PARTY_NOTICES.md).

## Bestand und Zielstruktur

1. Website-Typ, wichtigste Nutzeraufgaben und geschäftlich wichtige Seiten
   bestimmen. Vorhandenen Crawl mit Sitemap, CMS-Export oder Analytics-URLs
   ergänzen, soweit zugänglich. Ein einzelner Crawl entdeckt nicht alle verwaisten
   Seiten. Quelle und Umfang der Inventarliste dokumentieren.
2. Pro URL Zweck/Suchintention, Seitentyp, übergeordnete Seite, interne Eingänge,
   gemessene Klicktiefe ab gewähltem Startpunkt und Conversion-Ziel festhalten.
   URL-Pfadtiefe ist nicht gleich Klicktiefe. Varianten und Canonicals mitführen.
3. Beobachtete Ist-Struktur von vorgeschlagener Soll-Struktur trennen. Einen Baum
   oder ein kleines Mermaid-Diagramm nur verwenden, wenn es Beziehungen klärt.
4. Header, Footer, Bereichsnavigation, Breadcrumbs und kontextuelle Links gemeinsam
   prüfen. Verständliche Bezeichnungen und sichtbare Orientierung nutzen;
   wichtige Aufgaben auch mobil und mit Tastatur durchgehen.
5. Themen bei Bedarf über Übersichtsseiten und passende Detailseiten verbinden.
   Konkrete Quelle-Ziel-Linkvorschläge mit Nutzen und natürlichem Ankertext liefern.
   Inhaltliche Überlappung untersuchen, bevor Seiten zusammengeführt werden.

## Entscheidungsregeln

- Keine starre Drei-Klick-Regel, fixe Menüanzahl oder Linkdichte pro Wortzahl.
  Kritische Seiten dürfen nicht unnötig verborgen sein; tatsächliche Auffindbarkeit
  anhand Nutzeraufgaben, internen Links und Website-Größe bewerten.
- Breadcrumbs zeigen eine sinnvolle inhaltliche Hierarchie; sie müssen nicht
  mechanisch den URL-Pfad kopieren. Nicht jede Seite benötigt Breadcrumbs.
- IDs, Datumsbestandteile oder tiefe URL-Pfade sind allein kein Fehler. Bestehende
  funktionierende URLs nicht nur aus kosmetischen Gründen ändern.
- Interne Suche und Filter ergänzen Navigation. Sie ersetzen crawlbare Links
  zu relevanten Zielseiten nicht. Pagination und Facetten mit T06/T08 prüfen.
- Bei Umstrukturierung für jede betroffene alte URL eine Entscheidung festhalten:
  beibehalten, passendes neues Ziel mit permanenter Weiterleitung oder begründet
  entfernen (404/410). Kein pauschales Redirect aller entfernten Seiten zur Startseite.
- Migration nur im entsprechenden Implementierungsauftrag ausführen. Interne
  Links, Canonicals, hreflang, Sitemap und Tracking zusammen aktualisieren;
  vor/nach Änderung mit der Verification Loop prüfen und Rückfallplan festhalten.

| ID | Prio | Prüfung | Nachweis |
| --- | --- | --- | --- |
| IA01 | P1 | URL-Inventar und Abdeckung | Seitentypen, Inventarquellen, wichtige Seiten und Grenzen dokumentiert |
| IA02 | P1 | Hierarchie passt zu Nutzeraufgaben | Ist-/Soll-URL-Map mit Zweck, Elternseite und Conversion-Ziel |
| IA03 | P1 | Navigation und Orientierung funktionieren | Relevante Wege mobil/Desktop/Tastatur tatsächlich durchgegangen |
| IA04 | P1 | Interne Verlinkung und verwaiste Seiten | Nachvollziehbare Eingänge, Stichprobengrenzen, konkrete Linkvorschläge |
| IA05 | P1 | Themen und Varianten sinnvoll getrennt | Überschneidungen begründet; keine unnötigen Konkurrenz- oder Filterseiten |
| IA06 | P1 | URL-Änderungen kontrolliert, falls geplant | Alte/neue URL, Aktion, Metadaten-Updates und Nachprüfplan |

Bezug zu T04–T08, I02, I09 und I10. Bestehende technische Befunde verknüpfen,
nicht doppelt zählen. URL-Map und Migrationsfelder: [Berichtsvorlage](report-template.md).
