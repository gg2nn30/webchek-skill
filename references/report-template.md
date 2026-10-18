# Website-Audit: [Domain]

## Umfang und Prüfgrundlage

- Prüfdatum und Zeitzone: [Datum]
- Ziel: [Anfragen / Buchungen / Verkäufe / anderes]
- Website-Typ, Zielmarkt und Sprachen: [Angaben; Annahmen markieren]
- Geprüfte URLs und Seitentypen: [Liste oder Anlage]
- Werkzeuge und Methode: [tatsächlich eingesetzte Werkzeuge]
- Datenzugriffe und Zeiträume: [Search Console / Analytics / Logs / Felddaten]
- Grenzen: [Stichprobe, fehlende Zugriffe, ungetestete Transaktionen]

## Wichtigste Maßnahmen

Die drei bis fünf wichtigsten Befunde mit Geschäftsauswirkung und nächster Aktion.
Keine Aussage wie „SEO vollständig geprüft“, wenn nur eine Stichprobe vorliegt.

| Rang | Befund | Auswirkung | Nächste Aktion | Priorität | Aufwand |
| --- | --- | --- | --- | --- | --- |
| [1] | [beobachtetes Problem] | [betroffene Nutzer/Ziele] | [konkrete Maßnahme] | [P0/P1/P2] | [klein/mittel/groß; Schätzung] |

## Vollständiges Prüfregister

Für jede Checklisten-ID eine Zeile anlegen, einschließlich nicht anwendbarer und
nicht geprüfter Checks. Teilweise geprüfte Kriterien nicht pauschal als bestanden
melden: nach URL/Unterprüfung aufteilen oder die verbleibende Prüfung offen lassen.

| ID | URL / Bereich | Status | Methode und Beleg | Einschränkung / nächste Aktion |
| --- | --- | --- | --- | --- |
| [T02] | [URL] | [bestanden / fehlgeschlagen / nicht anwendbar / nicht geprüft] | [Status, Header, HTML-Ausschnitt oder Bericht mit Datum] | [Begründung oder Aktion] |

## Maßnahmenregister

| Befund-ID / Check-ID | URL | Problem und Beleg | Maßnahme | Priorität | Verantwortlich | Bearbeitungsstatus | Nachprüfung |
| --- | --- | --- | --- | --- | --- | --- | --- |
| [B01 / T02] | [URL] | [konkreter Befund] | [Änderungsvorschlag] | [P0] | [offen, wenn nicht zugewiesen] | [offen / in Arbeit / umgesetzt / verifiziert] | [Datum, Methode, Ergebnis] |

„Umgesetzt“ ist nicht gleich „verifiziert“. Empfehlungen und Hypothesen eindeutig
kennzeichnen; keine Verantwortlichen oder Fälligkeiten erfinden.

## Messwerte und Erfolgskontrolle

| Kennzahl | Ausgangswert | Datenquelle / Zeitraum / Segment | Ziel oder Beobachtung | Nachprüfung |
| --- | --- | --- | --- | --- |
| [organische qualifizierte Anfragen] | [Wert oder nicht verfügbar] | [Quelle] | [begründetes Ziel, keine Garantie] | [Rhythmus] |
| [LCP / INP / CLS] | [Felddaten oder nicht verfügbar] | [Zeitraum, URL/Origin, Mobil/Desktop] | [jeweiliger Grenzwert] | [Methode] |

Labor- und Felddaten getrennt halten. Rankingänderungen nicht allein einer Maßnahme
zuschreiben; Saison, Änderungen der Nachfrage und Messkonfiguration berücksichtigen.

## Wiederkehrende Kontrollen

| Rhythmus | Kontrolle | Zuständigkeit | Aktivierungsstatus |
| --- | --- | --- | --- |
| Laufend | Erreichbarkeit, Serverfehler, wichtige Conversion-Ausfälle | [offen] | [empfohlen / tatsächlich eingerichtet] |
| Wöchentlich | Indexierung und auffällige Geschäftsergebnisse | [offen] | [Status] |
| Monatlich | Crawl, Landingpages, interne Links, wichtige Inhalte | [offen] | [Status] |
| Vierteljährlich | Suchintention, Wettbewerb, Inhalte, Conversion | [offen] | [Status] |
| Nach Release/Umzug | URLs, Redirects, Rendering, Tracking, Kernfunktionen | [offen] | [Status] |

## Zusatzmodule und Verifikation

Gewählte Module (V/F/SEC/E/GEO/IA/SD/CRO), ausgelassene Module mit Begründung und deren
Check-IDs im vollständigen Prüfregister dokumentieren. Gleiche Befunde verknüpfen,
statt sie mehrfach zu zählen.

| Prüfung | Arbeitsverzeichnis / Ziel / Commit | Befehl oder Methode | Ergebnis / Exitcode | Aktueller Beleg |
| --- | --- | --- | --- | --- |
| [Build / Typen / Lint / Tests / Security / Diff] | [Umfang] | [tatsächlich ausgeführt] | [Ergebnis oder nicht geprüft] | [Berichtspfad / redigierter Befund] |

Für E2E: Browser/Version, Viewport, Lauf-ID, Start und Dauer angeben. Testfälle und
Versuche getrennt zählen; bestanden, fehlgeschlagen, instabil, übersprungen,
erwartet fehlgeschlagen und nicht ausgeführt getrennt ausweisen. Gemockte
Integrationen, nicht abgesendete Formulare und fehlende Testkonten ausdrücklich nennen.

| Maßnahme | Ausgangsbeleg | Erfolgskriterium | Nachprüfung | Restproblem |
| --- | --- | --- | --- | --- |
| [Befund-ID] | [vorher] | [beobachtbarer Sollzustand] | [nachher, Datum, gleiche Bedingungen] | [offen oder keines beobachtet] |

Sicherheitsbefunde benötigen Voraussetzungen, Auswirkung und redigierte Evidenz.
Freigabeempfehlung auf tatsächlich geprüfte Kriterien begrenzen; keine automatische
Veröffentlichung, keine erfundenen Testzahlen und keine ungeprüften Artefakt-Uploads.

## Suchplattformen (bei vorhandenem Auftrag)

Suchplattform-Zugänge bei Bedarf separat erfassen:

| Provider / Lauf | Property oder Ziel-URLs | Zugriff bestätigt? | Zeitraum / Messprofil | Bericht / Stufen-Exitcodes | Grenzen |
| --- | --- | --- | --- | --- | --- |
| [Search Console / Bing] | [exakte Property] | [ja/nein; Variablenpräsenz reicht nicht] | [tatsächlich verfügbarer Zeitraum / Version] | [aktueller Pfad] | [Quota, fehlende Rechte] |

## GEO-Messprotokoll (bei gewähltem Modul)

Messziel, Fragen-Set-Version, Plattform/Interface, Modell soweit bekannt,
Suchmodus, Sprache, Region soweit einstellbar, Sitzungskontext und Zeitraum nennen.
Exakten Wortlaut je Fragen-ID dokumentieren; Marken-/Nichtmarkenfragen trennen.

| Fragen-ID / Version / Wortlaut | Lauf-ID / Wiederholung / Datum | Plattform / Bedingungen | Erhebungsstatus | Antwortbeleg / Quellen | Erwähnung | Eigene Quelle zitiert | Empfehlung |
| --- | --- | --- | --- | --- | --- | --- | --- |
| [Frage] | [Lauf] | [Konfiguration] | [erfolgreich / keine KI-Ausspielung / verweigert / technischer Fehler / nicht ausgeführt] | [redigierter Beleg] | [ja/nein/nicht auswertbar] | [ja/nein/nicht auswertbar] | [ja/nein/nicht auswertbar] |

Geplante, ausgeführte, technisch erfolgreiche und auswertbare Läufe getrennt zählen.
Raten mit Rohzahlen je Segment und Nenner auswertbarer KI-Antworten angeben;
bei null Antworten „nicht berechenbar“. KI-Ausspielungsanteil separat berichten.
Nicht nur erfolgreiche Sichtbarkeit auswählen; Ausfälle und Unsicherheit offenlegen.

| Antwort-/Fragen-ID | Entscheidungsrelevante Aussage | Aktueller Faktenbeleg | Ergebnis | Maßnahme / vermuteter Ursprung |
| --- | --- | --- | --- | --- |
| [ID] | [redigierter Wortlaut] | [Quelle, Datum] | [bestätigt / widersprochen / ungeklärt; Kontext/Wertung] | [konkrete Seite; Vermutungen markieren] |

## Seitenarchitektur (bei gewähltem Modul)

Inventarquellen und Grenzen nennen. Ist-Struktur und Soll-Vorschläge unterscheiden.
Ein Strukturdiagramm ergänzen, wenn Beziehungen dadurch verständlicher werden.

| URL / Seitentyp | Zweck / Suchintention | Elternseite / Navigationsort | Interne Eingänge / Klicktiefe ab Startpunkt | Conversion-Ziel | Aktion |
| --- | --- | --- | --- | --- | --- |
| [URL] | [Aufgabe] | [Ist-Zuordnung] | [Messwert oder nicht geprüft] | [Ziel] | [behalten / verbessern / Änderungsvorschlag] |

| Linkquelle | Linkziel | Vorgeschlagener Ankertext | Nutzwert / Befund-ID |
| --- | --- | --- | --- |
| [URL] | [URL] | [natürlicher Text] | [Begründung] |

Bei geplanter Migration zusätzlich alte URL, neue URL oder Entfernung, Statuscode,
interne Link-/Canonical-/hreflang-/Sitemap-Änderungen und Nachprüfplan erfassen.

## Strukturierte Daten (bei gewähltem Modul)

| URL / Template | Markup-Format / Typ / Generator | Erfassung: HTML oder DOM | Inhalt / Syntax / Vokabular | Gewünschte Suchfunktion / aktuelle Quelle | Feature-Prüfung / Nachprüfung |
| --- | --- | --- | --- | --- | --- |
| [URL] | [Format, Typ, Ursprung] | [Methode und Grenze] | [getrennte Ergebnisse] | [Feature, Dokumentation, Abrufdatum] | [Ergebnis oder offen] |

Validator-Erfolg, sachliche Richtigkeit, Teilnahmebedingungen und tatsächlich
beobachtete Suchdarstellung sind unterschiedliche Nachweise. Fehlende aktuelle
Dokumentation als Grenze nennen; keine Anzeige garantieren.

## Conversion und Experimente (bei gewähltem Modul)

| Seite / Zielgruppe / Kanal | Ziel / Primärmetrik | Zeitraum / Datenquelle | Zähler / Nenner / Einheit | Qualitäts- und Schutzkennzahlen |
| --- | --- | --- | --- | --- |
| [Umfang] | [qualifizierte Anfrage o. Ä.] | [vorhandene Daten oder offen] | [konsistente Definition] | [Leadqualität, Stornos, Performance o. Ä.] |

| Befund-ID | Beobachtung / Beleg | Änderungshypothese | Erwarteter Mechanismus | Prüfdesign / Abbruchregeln | Ergebnis / Unsicherheit |
| --- | --- | --- | --- | --- | --- |
| [ID] | [keine erfundenen Raten] | [konkrete Variante] | [Hypothese] | [A/B oder qualitative Prüfung; Stichprobe/Laufzeit] | [offen bis geprüft] |

Funktionsfehler, Empfehlungen und Experimente trennen. Messplan allein bedeutet
weder aktiviertes Tracking noch laufenden A/B-Test. Reine Vorher-/Nachher-Unterschiede
nicht als sicheren kausalen Effekt ausgeben.

## Verwendete Quellen und offene Punkte


- [Tatsächlich verwendete Quelle mit URL und Abrufdatum]
- [Fehlender Zugriff, dessen Nutzen und unabhängige nächste Schritte]
- [Erforderliche Entscheidung, wenn sie den nächsten Schritt verhindert]

Abschluss: tatsächlich geprüfte Fähigkeiten, verbleibende Probleme und konkrete
nächste Schritte nennen. Keine vollständige Sicherheit, Rechtskonformität,
Barrierefreiheit oder Rankingverbesserung ohne entsprechende Belege versprechen.
