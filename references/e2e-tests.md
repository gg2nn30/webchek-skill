# E2E-Tests für Website-Nutzerpfade

Nutze vorhandene Browserwerkzeuge oder die Testinfrastruktur des Zielprojekts.
Playwright eignet sich, ist aber keine Voraussetzung für ein manuelles Audit.
Dieses Modul ist eine Arbeitsanleitung, keine bereits ausgeführte Testsuite.

## Testplan

| ID | Prio | Nutzerpfad | Aussagekräftige Prüfung |
| --- | --- | --- | --- |
| E01 | P1 | Einstieg → Navigation → Detailseite | Erwartetes Ziel und relevanter Inhalt; Direktaufruf, Reload und Zurück-Navigation funktionieren. |
| E02 | P1 | Suche und Filter, falls vorhanden | Bekannter Treffer, definierter Leerzustand, Filterwechsel und Zurücksetzen mit kontrollierten Testdaten. |
| E03 | P0 | Kontakt oder Buchung | Pflichtfeldfehler und Korrektur; in autorisierter Testumgebung Bestätigung plus tatsächlicher Eingang, kein Doppelversand. |
| E04 | P0 | Produkt → Warenkorb → Checkout, falls vorhanden | Richtige Variante, Anzahl und Preis; Testzahlung und bestätigte Testbestellung nur mit passender Freigabe/Testanbieter. |
| E05 | P0 | Anmeldung und geschützter Bereich, falls vorhanden | Erlaubter Testnutzer kann zugreifen; abgemeldeter oder unberechtigter Testnutzer nicht; Logout wirkt. |
| E06 | P1 | Mobile und zugängliche Kernpfade | Mindestens Desktop und schmale Mobilansicht, Tastatur/Fokus, relevante Dialoge; Browserauswahl nach Zielgruppe. |
| E07 | P1 | Fehler und Wiederaufnahme | In Testumgebung kontrollierter Netzwerk-/Serverfehler, verständliche Meldung und funktionierender erneuter Versuch. |
| E08 | P1 | Messung und Consent | Soweit prüfbar: passender Einwilligungszustand, korrektes Conversion-Ereignis, keine Doppelzählung; personenbezogene Werte aus Berichten entfernen. |

## Zuverlässige Automatisierung

1. Projektbefehle, installierte Runner-Version und Browser prüfen. Bestehende
   Konfiguration verwenden. BASE_URL und aufgelösten Zielhost vor dem Lauf
   kontrollieren; für schreibende Tests explizite Testziel-Liste verwenden.
   `NODE_ENV !== 'production'` allein schützt nicht vor dem falschen Ziel.
2. Isolierte Testkonten/-daten und nachvollziehbare Fixtures verwenden. Parallelität
   auf vorhandene Ressourcen und Datenisolation abstimmen. Nur selbst angelegte
   Testdaten gezielt bereinigen; keine gemeinsam genutzten Daten pauschal löschen.
3. Nutzerergebnis prüfen, nicht nur erfolgreichen Klick oder Status 200.
   Rollen-/Label-Locators bevorzugen, stabile Test-IDs bei Bedarf ergänzen.
   Page Objects nutzen, wenn sie wiederkehrende Abläufe tatsächlich vereinfachen.
4. Auf sichtbaren Zustand und konkrete Antworten warten. Bei Netzwerkprüfungen
   den Response-Waiter vor der auslösenden Aktion registrieren. Keine starren
   Sleeps oder pauschales `networkidle` bei dauerhaft aktiven Verbindungen.
5. Mocks zur gezielten Fehlerprüfung nutzen; gemockte Zahlung oder API nicht als
   bestätigte reale Integration ausgeben. WebKit-/Mobil-Emulation nicht mit einem
   tatsächlichen Safari-/Smartphone-Test gleichsetzen.
6. Fehlerscreenshots, Runner-Traces und bei Bedarf Videos im aktuellen Laufordner
   erfassen. Netzwerk-/Trace-Dateien können Tokens und Formulardaten enthalten:
   vor Weitergabe prüfen, Zugriff und Aufbewahrung begrenzen; nicht automatisch
   öffentlich hochladen. Auth-State-Dateien nicht committen.
7. Retry-Erfolg als instabil ausweisen. Ursache anhand Trace, Timing und Fixtures
   untersuchen; keine Assertion entfernen, Snapshots blind aktualisieren oder
   Tests ausschalten, um einen grünen Bericht zu erzielen. Fehlende Anmeldung
   ist bei einem erforderlichen Auth-Test eine fehlende Voraussetzung, kein Erfolg.

## Ergebnis und CI

Pro Lauf Browser/Version, Viewport, Umgebung, Commit, Beginn, Dauer, Befehl und
Exitcode nennen. Testfälle und Versuche unterscheiden; bestanden, fehlgeschlagen,
instabil, übersprungen und nicht ausgeführt separat berichten.

Bei beauftragter CI-Einbindung vorhandene Runtime-Pins, Lockfiles und Projektregeln
verwenden. Reports auch bei Fehlern sichern, ohne den Runner-Fehler zu verdecken.
Kritische ungetestete oder instabile Pfade verhindern eine uneingeschränkte
Freigabeempfehlung. Ein Reviewbericht allein veröffentlicht keine CI-Artefakte.

Aktuelle API-Details bei Bedarf in der
[Playwright-Dokumentation](https://playwright.dev/docs/intro) nachschlagen.
