# Security Review für Website-Audits

Öffentliche Audits beginnen mit lesenden Prüfungen von Seiten und normalen
Antworten. Code- und Konfigurationsprüfungen nur mit vorhandenem Zugriff.
Aktive Tests mit zustandsändernden Anfragen in der beauftragten Testumgebung
ausführen; fremde Konten, Daten und Dienste bleiben außerhalb des Umfangs.

| ID | Prio | Prüfung | Erfolgskriterium / Prüfgrenze |
| --- | --- | --- | --- |
| SEC01 | P0 | Geheimnisse in Quellcode, ausgelieferten Bundles und Logs | Keine verwendbaren Secrets im Client; sichere serverseitige Verwaltung. Treffer redigieren, echte Schlüssel nicht ausprobieren; bestätigte Leaks zur Sperrung/Rotation melden. |
| SEC02 | P1 | Eingaben und Datenbankzugriff | Serverseitige Typ-, Längen- und Werteprüfung; parametrisierte Queries. Clientvalidierung und ORM-Nutzung allein beweisen keinen Schutz. |
| SEC03 | P0 | Authentifizierung und Berechtigungen | Serverseitige Objekt-, Rollen- und Mandantenprüfung; Identität aus verifizierter Sitzung. Mit eigenen Testkonten prüfen, dass Konto A nicht Daten von Testkonto B erhält. |
| SEC04 | P1 | Sitzung, Cookies und CSRF | Secure/HttpOnly für passende Sitzungscookies, zum Ablauf passendes SameSite, Ablauf/Logout; CSRF-Schutz abhängig von Authentifizierung und Request-Verhalten. |
| SEC05 | P1 | XSS, HTML und CSP | Kontextgerechtes Escaping; erlaubtes Rich HTML mit gepflegter Sanitization; wirksame CSP passend zur App. Keine pauschale Freigabe von unsafe-inline/unsafe-eval als sichere Standardlösung. |
| SEC06 | P1 | HTTPS, Sicherheitsheader und CORS | Passende HSTS-, MIME- und Frame-Regeln; kontrollierte Origins bei Credential-Requests. CORS ist kein Ersatz für Authentifizierung. |
| SEC07 | P1 | Uploads, Weiterleitungen und serverseitige URL-Abrufe | Upload-Inhalt serverseitig prüfen, Größen begrenzen, sichere Ablage; Redirect-Ziele begrenzen; SSRF-Schutz bei externen Fetches einschließlich Redirects und interner Ziele. |
| SEC08 | P1 | Missbrauchsschutz und Fehlermeldungen | Angemessene Limits für Login und teure Aktionen, keine internen Details oder personenbezogenen Daten in öffentlichen Fehlern/Logs. Keine Lasttests auf Produktion als Standard-Audit. |
| SEC09 | P1 | Abhängigkeiten und Konfiguration | Lockfile-basierte Analyse mit vorhandenem Scanner; betroffene Version, Advisory, Erreichbarkeit und Fix dokumentieren. Kein automatisches audit fix oder pauschales Major-Update. |
| SEC10 | P0 | Zahlungen und sensible Zustandswechsel, falls vorhanden | Serverseitig überprüfte Preise/Berechtigungen, gültige Webhook-Signaturen und Schutz gegen Replay/Doppelverarbeitung; nur Testanbieter/Testdaten für Transaktionsprüfungen. |

## Einordnung statt pauschaler Regeln

- Priorität je Befund anhand Auswirkung und Evidenz vergeben. Ein fehlender Header
  ist nicht automatisch eine ausnutzbare P0-Lücke; eine vermutete Schwachstelle
  nicht als bestätigten Vorfall bezeichnen.
- Cookie-Strategie zur Anwendung passend wählen: pauschales `SameSite=Strict`
  kann legitime Login- oder Zahlungsabläufe stören. Token-Speicherung ist eine
  Architekturentscheidung; konkrete Angriffsfläche statt absoluter Regeln bewerten.
- Dateiendung und vom Browser gemeldeter MIME-Typ reichen für Upload-Prüfung nicht.
  Öffentliche Konfigurationsschlüssel von tatsächlich geheimen Schlüsseln unterscheiden.
- Für Sicherheitsheader, CSP und Cookies nur notwendige Metadaten dokumentieren;
  Cookie-, Token- oder Authorization-Werte nie in Artefakten veröffentlichen.
- Statische Checks und Dependency-Scans haben Grenzen. Ohne Quellcode oder
  Testkonten bleibt die interne Prüfung offen, auch wenn die öffentliche Seite funktioniert.

## Ergebnis und Nachprüfung

Pro Fund: betroffene Route/Datei, Voraussetzung, redigierter Beleg, mögliche
Auswirkung, konkrete Abhilfe und Nachprüfung. Nach Fix sowohl verbotenen Zugriff
als auch erlaubten Nutzerpfad testen. Externe Meldungen und Änderungen an Secrets
oder Produktionskonten nur im entsprechenden Auftrag durchführen.

Weiterführende Quellen bei Bedarf aktuell prüfen:
[OWASP Cheat Sheets](https://cheatsheetseries.owasp.org/) und
[OWASP ASVS](https://owasp.org/www-project-application-security-verification-standard/).
