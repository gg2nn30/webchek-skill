# Search Console und Bing Webmaster Tools

Diese lesenden Adapter ergänzen den öffentlichen Crawl um tatsächlich verfügbare
Such- und Crawlingdaten. Ein vorbereiteter Adapter ist kein bestätigter Kontozugang.
Verwende vorhandene autorisierte Connectoren, wenn verfügbar. Prüfe sonst nur
Namen/Präsenz vorhandener Variablen und dann die jeweilige lesende API-Operation.
Fehlende Zugänge und Properties im Bericht offen lassen.

## Vorhandenen Zugang prüfen

```bash
npm run webmaster -- --check-access
```

Dieser Befehl meldet nur, ob die Variablen gesetzt sind. Er bestätigt weder
Authentifizierung noch Zugriffsrechte. Die eigentliche Zugriffsprüfung ist:

```bash
npm run webmaster -- --provider google
npm run webmaster -- --provider bing
```

Ohne `--site` werden ausschließlich erreichbare Properties aufgelistet und im
privaten lokalen Bericht gespeichert. Die exakte Property aus dieser Liste
verwenden, nicht aus Domainnamen oder einem GitHub-Zugang ableiten.

## Google Search Console

Voraussetzung: vorhandener gültiger OAuth-Access-Token in `GSC_ACCESS_TOKEN` mit
Scope `https://www.googleapis.com/auth/webmasters.readonly` und Zugriff auf die
Property. Der Adapter verwaltet keinen OAuth-Login oder Refresh-Token.
Abgelaufene Tokens über den vorhandenen sicheren Authentifizierungsweg erneuern.
GitHub-Authentifizierung gewährt keinen Google-Zugang.

```bash
npm run webmaster -- --provider google --site sc-domain:example.com --start 2026-09-01 --end 2026-09-30
```

URL-Prefix-Properties wie `https://example.com/` werden ebenfalls unterstützt.
Der Bericht enthält Search-Analytics-Zeilen nach Datum und Seite für Suche `web`,
mit finalen Daten. Pagination erfolgt in 25.000er-Seiten bis maximal 100.000 Zeilen;
ein erreichtes Limit wird als `capped` markiert. Auch darunter ist dies keine
vollständige Liste aller Suchvorgänge. Datenverzögerung, Property-Typ, Zeitraum
und Search-Console-Berichtszeitzone berücksichtigen.

Clicks/Impressions sinnvoll summieren, CTR aus summierten Klicks/Impressionen
berechnen; CTR nicht ungewichtet mitteln. Positionswerte nicht blind über
unterschiedliche Segmente mitteln. Nicht beobachtete URLs sind nicht automatisch
nicht indexiert. URL Inspection, Sitemaps und manuelle Maßnahmen werden von
diesem Adapter nicht abgerufen; bei Bedarf über vorhandene UI/Connectoren prüfen.
Aus Search-Analytics-Gesamtzahlen keine separate KI-Zitierungsrate ableiten.

## Bing Webmaster Tools

Voraussetzung: vorhandener `BING_WEBMASTER_API_KEY` für die passenden Sites.

```bash
npm run webmaster -- --provider bing --site https://example.com/
```

Der Adapter liest `GetQueryStats` und `GetCrawlStats`. Zeitraum und Granularität
bestimmt die Bing-API; Datumswerte im Ergebnis auswerten, nicht einen gewünschten
Zeitraum behaupten. Benutzerdefinierte `--start`/`--end` werden bewusst abgelehnt.
Die API kann Datumswerte im Microsoft-JSON-Format `/Date(...)/` zurückgeben.
Google- und Bing-Metriken nicht ohne Prüfung der Definitionen zusammenzählen.

Der Bing-Schlüssel wird nach API-Vorgabe im HTTPS-Query übermittelt, aber nicht
in Terminalausgaben oder Berichte geschrieben. Netzwerk-/Proxy-Logging muss
Query-Schlüssel ebenfalls schützen. Eine Proxy-Secret-Platzhalterbindung ist
nicht automatisch ein für diesen API-Weg geeigneter Schlüssel.

## Ergebnisse und Grenzen

Jeder erfolgreiche Aufruf erzeugt `artifacts/webmaster-*/report.json` mit Provider,
Zeitpunkt, Property, angefordertem Zeitraum soweit vorhanden und Originaldaten.
Dateiberechtigung ist `0600`; keine automatischen Uploads. Suchbegriffe, interne
URLs und Geschäftsdaten vor Weitergabe prüfen. Fehlerantworten werden redigiert.

Exitcode 0 bedeutet erfolgreich abgefragt, nicht „SEO fehlerfrei“. Exitcode 2
kennzeichnet fehlenden Zugang, ungültige Parameter, Netzwerk-/API-Fehler.
401/403 zuerst nach Token-Ablauf, Scope, Property-Rechten und Netzwerkregeln
untersuchen; nicht reflexartig neue Secrets anfordern.

Fehlende Werte ausschließlich über sichere Umgebungseinstellungen oder vorhandene
Authentifizierung bereitstellen, niemals im Chat, in Kommandoargumenten oder Git.
Benötigte HTTPS-Ziele: `www.googleapis.com`, `ssl.bing.com`; Freigabe entsprechend
den Umgebungsvorgaben, keine unbekannte Allowlist überschreiben.

Die lokalen Tests verwenden künstliche Antworten für Pagination, Property-Encoding,
Bing-Datenstruktur und Fehlerredaktion. Sie ersetzen keinen Live-Test mit Kontozugang.
Offizielle Referenzen für spätere Live-Prüfung:
[Search Console API](https://developers.google.com/webmaster-tools/),
[Bing Webmaster API](https://learn.microsoft.com/en-us/bingwebmaster/).

Zuordnung: Z02, A05, T02 und GEO08. Im Bericht Property-Zugriff, Datenzeitraum,
Methode und offene Prüfungen separat ausweisen.
