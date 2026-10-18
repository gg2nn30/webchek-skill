# GEO-Messung: Sichtbarkeit und richtige Antworten

Für Aufträge zu GEO, AEO, KI-Suche und Markenpräsenz lesen. Deutschsprachige
Adaption ausgewählter Konzepte aus marketingskills, fachlich eingegrenzt und
erweitert; siehe [Quellen](sources.md) und [Lizenzhinweise](../THIRD_PARTY_NOTICES.md).

## Messauftrag und Fragen-Set

1. Eine konkrete Frage festlegen: etwa „Wird unser Angebot bei passenden lokalen
   Anfragen empfohlen?“ oder „Werden unsere Preise korrekt wiedergegeben?“
2. Vorhandene Kundenfragen, Suchanfragen und öffentlich geeignete Supportthemen
   nutzen. Mit etwa 10–20 relevanten Fragen starten, sofern Umfang und Budget
   passen. Themen abdecken: Problemlösung, Anbieterwahl, Vergleich, Preis,
   Verfügbarkeit, Vertrauen und technische Eignung. Markenfragen getrennt von
   markenneutralen Fragen auswerten, damit explizite Namensnennung nicht als
   unabhängige Entdeckung gewertet wird.
3. Wortlaut und Fragen-Set versionieren. Stabile Trendfragen von neuen Testfragen
   trennen. Bei Änderungen nur gemeinsame unveränderte Fragen vergleichen oder
   eine neue Ausgangsmessung beginnen. Keine Nachfragezahlen erfinden.
4. Je Plattform das tatsächliche Produkt bzw. Interface dokumentieren, nicht nur
   den Modellnamen. API-Antworten und Antworten im Verbraucherprodukt sind nicht
   automatisch gleichwertig. Suchmodus, Modell soweit bekannt, Datum/Zeitzone,
   Sprache, Region soweit einstellbar und Sitzungskontext festhalten.
5. Nur vorhandene autorisierte Zugänge verwenden. Neue Kosten oder Konten nicht
   allein für ein Audit erzeugen. Ohne Zugang Fragen und Protokoll vorbereiten,
   Messung als „nicht geprüft“ ausweisen; Antworten nie selbst simulieren.

## Erhebung

Für ein kleines Set mehrere Läufe je Frage/Plattform vorsehen, beispielsweise
drei, sofern Budget und Auftrag dies tragen. Das ist eine praktische Stichprobe,
kein statistischer Genauigkeitsnachweis. Frische Sitzungen mit vergleichbarem
Kontext nutzen. Mehrstufige Gespräche als eigenen Testtyp mit vollständigem
Verlauf führen, nicht mit Einzelanfragen vermischen.

Pro Lauf festhalten: Fragen-ID/-Version, exakter Prompt, Wiederholung, Plattform,
Messbedingungen, redigierter Antwortbeleg, Quellen-URLs und Status. Zwischen
erfolgreicher Erhebung, verweigerter Antwort, technischer Störung und nicht
ausgeführtem Lauf unterscheiden. Ein Suchergebnis ohne KI-Antwort ist eine
beobachtete fehlende KI-Ausspielung, kein technischer Ausfall.

Antworten anhand getrennter Kriterien bewerten:

- **Erwähnung:** Der Markenname oder ein eindeutig zugeordnetes Produkt kommt vor.
- **Eigene Quelle zitiert:** Eine dem Anbieter zugeordnete URL ist als Quelle verlinkt.
- **Empfehlung:** Die Antwort schlägt den Anbieter für die konkrete Aufgabe vor.
  Eine bloße Nennung oder kritische Gegenüberstellung zählt nicht automatisch.
- **Faktentreue:** Entscheidungsrelevante Angaben sind mit aktuellen Belegen
  vereinbar. Eigene Wunschformulierungen sind keine Faktenbelege.

Nicht sichtbaren Abruf oder Trainingseinfluss nicht aus einer Antwort ableiten.
Eine vorhandene Zitation beweist nicht, dass sie jede Aussage der Antwort trägt.

## Kennzahlen mit Nennern

Zuerst geplante, ausgeführte, technisch erfolgreiche Läufe und tatsächlich
beobachtete KI-Antworten berichten. Ausfälle und verweigerte Antworten separat
aufführen; nicht als „Marke nicht genannt“ verstecken.

Für inhaltliche Raten ist der Nenner die Anzahl auswertbarer KI-Antworten im
gleichen Segment, nicht die Zahl der geplanten Tests:

- Erwähnungsrate = Antworten mit Erwähnung / auswertbare Antworten.
- Zitierungsrate = Antworten mit mindestens einer eigenen Quellen-URL / auswertbare Antworten.
- Empfehlungsrate = Antworten mit passender Empfehlung / auswertbare Antworten.

Jede Antwort je Kennzahl höchstens einmal zählen, auch bei mehreren Links.
Immer Rohzahlen nennen, etwa „2/3, kleine Stichprobe“. Bei Nenner null „nicht
berechenbar“ berichten. Anteil der Suchläufe mit KI-Ausspielung separat ausweisen.
Plattformen, Märkte, Sprachen und Marken-/Nichtmarkenfragen nicht blind mitteln;
Aggregation und Gewichtung vorab festlegen. Keine Veränderungen kausal allein
unseren Maßnahmen zuschreiben: Modelle, Quellen und Suchprodukte ändern sich.

## Aussagen prüfen und Maßnahmen ableiten

Für wichtige Behauptungen Wortlaut, Faktenthema, Antwortbeleg und aktuelle
Gegen-/Bestätigungsquelle erfassen. Als bestätigt, widersprochen oder ungeklärt
kennzeichnen; fehlender Kontext und subjektive Wertungen zusätzlich notieren.
Wiederholte falsche Preis-/Kompatibilitätsangaben höher priorisieren als Tonfragen.

Zitierte Quellen und eigene Produkt-, Preis-, Standort- oder Hilfeseiten vergleichen.
Einen vermuteten Ursprung ausdrücklich als Vermutung kennzeichnen. Korrekturen
an eigenen Seiten, Feeds und Markup konsistent planen. Anfragen an externe
Herausgeber nur bei Auftrag versenden; berechtigte Kritik nicht entfernen lassen.
Nach beauftragter Korrektur dieselben Fragen nach einem dokumentierten
Beobachtungszeitraum erneut testen. Antwortänderungen sind nicht garantiert.

Crawler für Suche, nutzerinitiierte Abrufe und Training anhand aktueller offizieller
Dokumentation getrennt beurteilen. robots.txt und WAF/CDN-Regeln prüfen;
ein gespoofter User-Agent beweist keinen echten Bot-Zugriff. Keine pauschale
Freigabe aller KI-Bots. `llms.txt`, separate Markdown-Dateien und neue Protokolle
sind optionale Experimente bei belegtem Verbrauchernutzen, keine GEO-Pflicht.

KI-Referrals und qualifizierte Conversions nur mit zugänglichen Analytics-Daten
berichten. Fehlender Referrer ist kein Beweis für fehlenden KI-Einfluss; direkte
Besuche oder Brand-Suchen nicht automatisch KI zuordnen. Keine festen
Antwortwortzahlen, künstlichen Aktualisierungsdaten oder versprochenen Prozentgewinne.

| ID | Prio | Prüfung | Nachweis |
| --- | --- | --- | --- |
| GEO01 | P1 | Ziel und versioniertes Fragen-Set | Reale Suchabsichten, getrennte Markenfragen, definierter Vergleichsumfang |
| GEO02 | P1 | Vergleichbare Messbedingungen | Plattform/Interface, Modus, Datum, Sprache, Region und Sitzungskontext |
| GEO03 | P1 | Erhebung und Ausfälle nachvollziehbar | Tatsächliche Antworten und Quellen je Lauf; fehlender Zugang bleibt offen |
| GEO04 | P1 | Kennzahlen korrekt berechnet | Getrennte Raten mit Rohzahlen, Nennern und kleinen Stichproben als Grenze |
| GEO05 | P1 | Entscheidungsrelevante Aussagen geprüft | Aktuelle Faktenbelege, unbekannte Ursachen und Unsicherheiten markiert |
| GEO06 | P1 | Quellen und Inhalt konsistent | Korrekturplan für eigene Seiten/Feeds; externe Quelle nicht mit eigener verwechseln |
| GEO07 | P1 | Crawler-Regeln zweckbezogen geprüft | Offizielle Dokumentation und beobachteter Zugriff getrennt festgehalten |
| GEO08 | P2 | Wiederholungsmessung und Geschäftswirkung geplant | Vergleichbares Set, Rhythmus, Attributionseinschränkungen; Aktivierung separat |

Bezug zu Basischecks A03–A05 und I06–I08. Fehlende Erwähnungen sind Beobachtungen,
nicht automatisch ein technischer Defekt; keine willkürliche Mindestquote als
Bestanden-Kriterium einführen. Protokollfelder stehen in der [Berichtsvorlage](report-template.md).
