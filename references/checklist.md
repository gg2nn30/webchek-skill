# SEO- und Website-Audit: vollständige Prüfliste

P0 = blockierende Fehler; P1 = wichtige Verbesserungen; P2 = Ausbau.
Die Priorität ist ein Ausgangspunkt: beispielsweise kann ein versehentliches
Canonical aller Produktseiten auf die Startseite ein P0-Problem sein.
Jede Zeile bekommt im Bericht einen Status und bei Bedarf mehrere konkrete Befunde.

## Ziele, Zugang und Messung

| ID | Prio | Prüfung und Methode | Erfolgskriterium |
| --- | --- | --- | --- |
| Z01 | P0 | Ziele und wichtige Seitentypen anhand Auftrag und Website zuordnen. | Jede wichtige Seitenart hat ein Geschäftsziel und eine messbare Nutzeraktion. |
| Z02 | P0 | Search-Console-Eigentum, Daten und Sitemap-Verarbeitung bei vorhandenem Zugriff prüfen; Bing Webmaster Tools ergänzend berücksichtigen. | Zugriffe und Datenfluss sind bestätigt; ohne Zugriff bleibt die interne Prüfung offen. |
| Z03 | P0 | Analytics-Konfiguration und Ereignisse mit autorisierten Testereignissen prüfen. | Relevante Aktionen werden korrekt und ohne unbeabsichtigte Doppelzählungen erfasst. |
| Z04 | P0 | Einwilligungszustände und tatsächliche Tracking-Anfragen prüfen, abhängig von Zielmarkt und anwendbarer Rechtslage. | Tracking respektiert erforderliche Einwilligungen; keine personenbezogenen Daten in Analyse-URLs oder Events. Keine Rechtskonformität allein aus einem Banner ableiten. |

## Technik und Indexierung

| ID | Prio | Prüfung und Methode | Erfolgskriterium |
| --- | --- | --- | --- |
| T01 | P0 | DNS, HTTPS, Zertifikat, HTTP-Status und Mixed Content an wichtigen URLs prüfen. | Seiten sind sicher erreichbar; keine blockierenden Zertifikats- oder Serverfehler. Zuverlässigkeit über Zeit nur mit Monitoringdaten bewerten. |
| T02 | P0 | robots.txt, Meta-Robots, X-Robots-Tag, Status und Canonical gemeinsam prüfen. | Gewünschte Landingpages sind crawlbar und indexierbar; Ausschlüsse sind beabsichtigt. Tatsächliche Indexierung nur mit geeigneten Nachweisen bestätigen. |
| T03 | P0 | Quelltext und gerendertes HTML vergleichen; Hauptinhalt, Links und Navigation prüfen. | Relevante Inhalte und normale verfolgbaren Links sind für Suchmaschinen zugänglich. |
| T04 | P1 | Begrenzten Crawl mit Sitemap und verfügbaren URL-/Analytics-Listen vergleichen. | Wichtige Seiten sind intern erreichbar; keine unbeabsichtigten verwaisten Seiten. Ein Crawl allein findet nicht alle verwaisten URLs. |
| T05 | P1 | Interne Linkziele, 404/410, Soft-404, Weiterleitungsketten und Schleifen prüfen. | Interne Links führen direkt zum passenden Ziel; entfernte Inhalte liefern sinnvolle Statuscodes. Nicht jede 404 pauschal auf die Startseite umleiten. |
| T06 | P1 | HTTP/HTTPS, www/ohne www, Slash-Varianten, Parameter, Filter und Canonicals prüfen. | Bevorzugte URLs und Canonical-Signale sind konsistent; keine unkontrollierten Crawl-Fallen. |
| T07 | P1 | XML-Sitemap(s), Status, enthaltene URLs und gegebenenfalls lastmod prüfen. | Sitemaps enthalten geeignete kanonische, indexierbare URLs; keine Fehlerseiten oder Weiterleitungen; lastmod ist sachlich korrekt. |
| T08 | P1 | Paginierung, Filter und interne Suche nach Website-Typ prüfen. | Relevante Detailseiten bleiben auffindbar; unnötige Varianten verdrängen keine wichtigen URLs beim Crawling. |
| T09 | P2 | SEO-relevante Unterschiede vor/nach Release oder Migration prüfen. | Wichtige URLs, Weiterleitungen, Indexierungsregeln, Inhalte und Messungen funktionieren weiter. |

## Suchintention, Inhalte und On-Page

| ID | Prio | Prüfung und Methode | Erfolgskriterium |
| --- | --- | --- | --- |
| I01 | P1 | Suchintention aus Nutzerfragen und relevanten Suchergebnissen ableiten. | Jede Zielseite erfüllt eine klare Informations-, Vergleichs-, Navigations- oder Kaufabsicht. |
| I02 | P1 | Hauptthemen, verwandte Begriffe, Long-Tail- und natürliche Fragen Ziel-URLs zuordnen. | Themen sind sinnvoll verteilt; mögliche Kannibalisierung wird anhand tatsächlicher Überschneidungen untersucht. |
| I03 | P1 | Relevante Wettbewerber, Suchergebnisse und Inhaltslücken vergleichen. | Themen werden nach Zielgruppenrelevanz, Geschäftswert und realistischer Chance priorisiert. |
| I04 | P1 | Titles und Meta Descriptions wichtiger Seiten auf Eindeutigkeit und Aussage prüfen. | Angaben beschreiben die Seite korrekt und unterstützen die Klickentscheidung; kein Keyword-Stuffing. |
| I05 | P1 | Hauptüberschrift, Hierarchie, Einleitung und Lesbarkeit prüfen. | Thema, Antwort und nächster Schritt sind schnell verständlich. |
| I06 | P1 | Inhalt gegen Nutzerfragen, Originalität, Belege und fachliche Richtigkeit prüfen. | Konkrete Antworten, eigene Erfahrungen, Beispiele oder Daten bieten erkennbaren Nutzen. |
| I07 | P1 | Anbieterinformationen, Kontakt, Autoren, Quellen und relevante Qualifikationen prüfen. | Verantwortlichkeit und wichtige Aussagen sind nachvollziehbar, besonders bei sensiblen Themen. |
| I08 | P1 | Veraltete, dünne oder doppelte Inhalte mit Nutzwert und vorhandenen Leistungsdaten bewerten. | Aktualisieren, zusammenführen oder entfernen wird pro URL begründet; nicht allein wegen geringer Wortzahl oder wenig Traffic löschen. |
| I09 | P1 | Navigation, Breadcrumbs, kontextuelle Links und Ankertexte prüfen. | Wichtige Inhalte sind logisch verknüpft; Linktexte beschreiben das Ziel natürlich. |
| I10 | P1 | URLs auf Verständlichkeit und unnötige Komplexität prüfen. | Neue URLs sind verständlich; Änderungen bestehender URLs sind durch Nutzen und Migrationsplan begründet. |
| I11 | P1 | Bilder, Bildkontext, passende Dateiformate, Kompression und Alt-Texte prüfen. | Bilder sind nützlich und angemessen dimensioniert; informative Bilder haben passende Alt-Texte, dekorative leere. |
| I12 | P2 | Ratgeber, Vergleiche, Anleitungen, relevante FAQs und hilfreiche Videos prüfen. | Formate beantworten echte Fragen entlang der Nutzerentscheidung; keine massenhaft generierten Seiten ohne Mehrwert. |

## Nutzung, Performance und Conversion

| ID | Prio | Prüfung und Methode | Erfolgskriterium |
| --- | --- | --- | --- |
| U01 | P0 | Kontakt-, Buchungs- oder Kaufpfad auf Desktop und Mobil durchgehen; Abschluss nur autorisiert testen. | Getestete Schritte funktionieren; nicht abgesendete oder nicht getestete Schritte sind ausdrücklich offen. |
| U02 | P1 | Mobile Menüs, Text, Touch-Ziele, Formulare, Viewport und Einblendungen prüfen. | Kernaufgaben funktionieren ohne horizontales Scrollen oder störende Überlagerungen. |
| U03 | P1 | Core Web Vitals anhand verfügbarer Felddaten prüfen. | LCP ≤ 2,5 s, INP ≤ 200 ms und CLS ≤ 0,1 am 75. Perzentil; Zeitraum und Datenebene sind dokumentiert. |
| U04 | P1 | Ladeprobleme mit Labortests und Netzwerkprofil untersuchen: Bilder, Fonts, Skripte, Caching, Serverantwort. | Konkrete Engpässe sind belegt; Optimierungen werden mit vergleichbaren Messbedingungen überprüft. |
| U05 | P1 | Tastatur, Fokus, Labels, Fehlermeldungen, Kontrast, Alternativtexte und bei Bedarf Screenreader prüfen. | Zentrale Aufgaben sind zugänglich; automatisierte Checks werden durch manuelle ergänzt. Kein pauschaler WCAG-Nachweis aus einem Scan. |
| U06 | P1 | Nutzenversprechen, CTA, Vertrauen, Kostenklarheit und Formularhürden prüfen. | Nutzer verstehen Angebot und nächsten Schritt; Hypothesen werden mit Nutzertests oder geeigneten Conversion-Daten bewertet. |
| U07 | P1 | Passende strukturierte Daten mit Validatoren und sichtbaren Inhalten abgleichen. | Unterstützte Typen sind korrekt, relevante Pflichtfelder vorhanden; keine irreführenden Angaben. Rich-Result-Eignung separat prüfen. |

## Shop, lokale und internationale Angebote

Nicht passende Module als „nicht anwendbar“ kennzeichnen, mit kurzer Begründung.

| ID | Prio | Prüfung und Methode | Erfolgskriterium |
| --- | --- | --- | --- |
| S01 | P1 | Kategorie- und Produktseiten auf Suchintention, eigene Beschreibungen, Bilder und interne Links prüfen. | Produkte sind auffindbar und unterscheidbar; Kategorien unterstützen Auswahl und Kaufentscheidung. |
| S02 | P1 | Varianten, Bestand, ausverkaufte Produkte, Preise, Versand, Rückgabe und Checkout-Informationen prüfen. | Angaben sind konsistent und verständlich; Varianten und dauerhaft entfernte Produkte werden sinnvoll behandelt. |
| S03 | P1 | Product-/Offer-/Bewertungsdaten und gegebenenfalls Merchant-Center-Feeds abgleichen. | Sichtbare Angaben, Markup und Feeds stimmen überein; Bewertungen sind echt und korrekt zugeordnet. |
| L01 | P1 | Unternehmensprofil, Name, Adresse, Telefon, Kategorien und Öffnungszeiten prüfen. | Daten sind korrekt und konsistent; Änderungen am Profil nur nach Auftrag. |
| L02 | P1 | Standortseiten, lokale Verweise, Bewertungen und Antworten prüfen. | Seiten bieten echte lokale Informationen; keine austauschbaren Doorway-Seiten oder fingierten Bewertungen. |
| L03 | P2 | Passendes LocalBusiness-Markup und Kartenintegration beurteilen. | Markup entspricht dem Unternehmen; Karten werden nur bei Nutzwert und passend zur Datenschutzkonfiguration eingesetzt. |
| G01 | P1 | Sprach-/Regionsversionen, wechselseitige hreflang-Verweise und Canonicals prüfen. | Versionen liefern passende Inhalte, sind erreichbar und korrekt miteinander verbunden; x-default bei sinnvoller Verwendung. |
| G02 | P1 | Sprachwechsel, Übersetzungen, Währungen und automatische Weiterleitungen prüfen. | Nutzer und Suchmaschinen erreichen die passende Version; keine unbeabsichtigte Sperre durch IP-/Sprachumleitungen. |

## Autorität, KI-Suche und Kontrolle

| ID | Prio | Prüfung und Methode | Erfolgskriterium |
| --- | --- | --- | --- |
| A01 | P2 | Relevante Backlinks, verlorene Verweise und verlinkte Fehlerseiten mit verfügbaren Daten prüfen. | Priorität liegt auf echten Empfehlungen und sinnvoller Wiederherstellung; keine manipulativen Linkkäufe. |
| A02 | P2 | Marken-Erwähnungen, Fachbeiträge und sinnvolle Content-Verbreitung prüfen. | Maßnahmen erreichen relevante Zielgruppen; Social-Media-Signale werden nicht als direkter Rankingnachweis behandelt. |
| A03 | P2 | Klare, eigenständig verständliche Antworten, Quellen, Originaldaten und Crawler-Regeln prüfen. | Inhalte sind zitierfähig; Zugriff für einzelne Such-/KI-Crawler wird nach Betreiberziel differenziert beurteilt. Keine pauschale Freigabe aller Bots. |
| A04 | P2 | Bei autorisiert verfügbaren Daten KI-Verweise und organische Landingpage-Leistung auswerten. | Messgrenzen sind ausgewiesen; einzelne KI-Antworten oder Referrer erlauben keine vollständige Sichtbarkeitsaussage. |
| A05 | P1 | Klicks, Impressionen, CTR, organische Besuche und Conversions in passenden Zeiträumen vergleichen. | Geschäftsergebnisse stehen im Mittelpunkt; Brand/Non-Brand, Geräte, Märkte, Saison und Messänderungen werden berücksichtigt. |
| A06 | P2 | Maßnahmenregister, Zuständigkeit und Nachprüfrhythmus festlegen. | Jeder Befund hat eine nächste Aktion; abgeschlossene Maßnahmen erhalten einen erneuten Nachweis. |

## Bevorzugte Quellen für aktuelle Regeln

- Google Search Essentials: https://developers.google.com/search/docs/essentials
- Crawling und Indexierung: https://developers.google.com/search/docs/crawling-indexing
- Strukturierte Daten: https://developers.google.com/search/docs/appearance/structured-data/intro-structured-data
- KI-Funktionen und Websites: https://developers.google.com/search/docs/appearance/ai-features
- Core Web Vitals: https://web.dev/articles/vitals
- Barrierefreiheit/WCAG: https://www.w3.org/WAI/standards-guidelines/wcag/
- Bing Webmaster Guidelines: https://www.bing.com/webmasters/help/webmaster-guidelines-30fba23a

Diese Links sind Referenzen, kein Beleg dafür, dass sie für ein konkretes Audit
abgerufen wurden. Im Bericht nur tatsächlich verwendete Quellen mit Datum nennen.
