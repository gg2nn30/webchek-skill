# Strukturierte Daten: Inhalt, Syntax und Suchfunktionen

Für Schema-/JSON-LD-Prüfungen. Adaptiert aus marketingskills;
[Quellen](sources.md), [Lizenz](../THIRD_PARTY_NOTICES.md).

## Prüfablauf

1. Seitentyp und Ziel festlegen: beispielsweise Organisationsidentität,
   Produktinformationen, Artikel oder Breadcrumbs. Zwischen semantischer
   Beschreibung nach Schema.org und einer bestimmten Suchdarstellung unterscheiden.
2. Roh-HTML und, wenn möglich, gerendertes DOM untersuchen. JSON-LD,
   Microdata und RDFa berücksichtigen. Reine Markdown-/Text-Extraktion kann
   Script-Tags entfernen: „nicht gefunden“ ist dann kein Beweis für fehlendes Markup.
3. Herkunft erfassen: Template, CMS-Plugin, Tag-Manager oder App-Komponente.
   Mehrere Blöcke sind nicht automatisch falsch; widersprüchliche Preise,
   Entitäten und doppelte Generatoren dagegen untersuchen.
4. Typen, stabile absolute `@id`-Referenzen und Entitätsbeziehungen prüfen.
   Mehrere Typen bei Bedarf sauber verbinden; keine unpassenden Typen erzwingen.
   Markup-Werte mit sichtbaren und aktuellen Angaben abgleichen, einschließlich
   Bewertungen, Verfügbarkeit, Währung, Datum und Anbieteridentität.
5. Drei Prüfungen getrennt dokumentieren: gültige JSON-/Markup-Syntax,
   Schema.org-Vokabular und aktuelle Voraussetzungen der gewünschten
   Suchmaschinen-Funktion. Pflichtfelder nicht aus einer pauschalen Typentabelle
   ableiten; sie hängen von Funktion und aktuellen Anbieterregeln ab.
6. Nach Änderungen relevante Seitentypen und Varianten erneut rendern/validieren.
   Suchdarstellungen und verfügbare Search-Console-Berichte später gesondert
   beobachten. Ein bestandener Validator garantiert keine Anzeige.

## Typwahl nach Inhalt

| Inhalt | Mögliche Typen | Besonderheit |
| --- | --- | --- |
| Anbieter / Standort | Organization, LocalBusiness | Tatsächliche Identität, Adresse und bestätigte Profile |
| Website-Identität | WebSite | Nicht mit einer Garantie für Suchbox oder andere Funktionen verwechseln |
| Redaktioneller Artikel | Article, BlogPosting | Nachvollziehbare Autoren, echte Veröffentlichungs-/Änderungsdaten |
| Produkt / Angebot | Product, Offer | Preis, Währung und Verfügbarkeit aus derselben Quelle wie sichtbare Angaben |
| Navigation | BreadcrumbList | Sinnvolle sichtbare Hierarchie; korrekte Reihenfolge und URLs |
| Anwendung / Veranstaltung | SoftwareApplication, Event | Nur bei passendem Inhalt; aktuelle Funktionsanforderungen separat prüfen |
| Fragen / Anleitung | FAQPage, HowTo | Vokabular-Gültigkeit ist kein Beleg für aktuelle Google-Unterstützung |

Für neue Implementierung ist JSON-LD häufig zweckmäßig; korrektes bestehendes
Microdata/RDFa nicht allein wegen des Formats ersetzen. Bei dynamischen Werten
sicher serialisieren und Einbettung in HTML korrekt absichern; keine String-
Verkettung ungeprüfter Eingaben. Ausführbare Beispiele müssen valides JSON ohne
Kommentare, Platzhalter-Behauptungen oder erfundene Bewertungen enthalten.

## Quellen und Unsicherheit

Bei tatsächlichem Audit die aktuelle
[Google-Galerie](https://developers.google.com/search/docs/appearance/structured-data/search-gallery)
und jeweilige Feature-Dokumentation prüfen. Der
[Rich Results Test](https://search.google.com/test/rich-results) prüft unterstützte
Google-Funktionen, der [Schema.org Validator](https://validator.schema.org/)
das Vokabular. Keines der Werkzeuge bestätigt automatisch die sachliche Richtigkeit.

Für FAQ, HowTo, SearchAction oder andere veränderliche Features keine alte
Unterstützung voraussetzen. Bei fehlendem Zugriff Datum und Aktualitätsgrenze
nennen und Eignung offen lassen. Gültiges Markup ohne passende Google-Funktion
kann anderen dokumentierten Zwecken dienen; das ist kein technischer Fehler.

| ID | Prio | Prüfung | Nachweis |
| --- | --- | --- | --- |
| SD01 | P1 | Markup vollständig genug erfasst | URL, Quelle/Rendering-Methode, Format und Generator; Extraktionsgrenzen |
| SD02 | P1 | Entitäten und Werte passen zum Inhalt | Typwahl, IDs und sichtbare Angaben konsistent; keine erfundenen Daten |
| SD03 | P1 | Syntax und Vokabular validiert | Tatsächliche Ergebnisse beider Prüfungen oder fehlende Prüfmöglichkeit |
| SD04 | P1 | Gewünschte Suchfunktion aktuell unterstützt | Feature-Dokumentation mit Abrufdatum und Teilnahmebedingungen |
| SD05 | P1 | Implementierung und Varianten konsistent | Generator-Zuständigkeit, sichere Serialisierung, Beispielseiten je Template |
| SD06 | P2 | Nachprüfung und Suchbeobachtung getrennt | Erneute Validierung; tatsächliche Anzeige nur bei eigenem Beleg bestätigt |

Vertieft U07, S03, L03. Ergebnisse nach Prüfebene in der
[Berichtsvorlage](report-template.md) getrennt führen.
