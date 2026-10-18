# Quellen und Anpassungen

## Everything Claude Code

Die technischen Zusatzmodule sind eigenständig formulierte Arbeitsanleitungen, angeregt durch
Everything Claude Code, das in seiner README affaan-m als ursprüngliche Quelle nennt.
Geprüfter WorldFlowAI-Stand: `432485ba6b92c14fb357276a98957f348bcff9ee`.

- [Verification Loop](https://github.com/WorldFlowAI/everything-claude-code/blob/432485ba6b92c14fb357276a98957f348bcff9ee/skills/verification-loop/SKILL.md)
- [Frontend Patterns](https://github.com/WorldFlowAI/everything-claude-code/blob/432485ba6b92c14fb357276a98957f348bcff9ee/skills/frontend-patterns/SKILL.md)
- [Security Review](https://github.com/WorldFlowAI/everything-claude-code/blob/432485ba6b92c14fb357276a98957f348bcff9ee/skills/security-review/SKILL.md)
- [E2E Runner](https://github.com/WorldFlowAI/everything-claude-code/blob/432485ba6b92c14fb357276a98957f348bcff9ee/agents/e2e-runner.md)
- [E2E Command](https://github.com/WorldFlowAI/everything-claude-code/blob/432485ba6b92c14fb357276a98957f348bcff9ee/commands/e2e.md)

Die Quell-README nennt MIT, aber im geprüften Git-Baum fehlt die dort verlinkte
LICENSE-Datei. Hier werden keine Quelldateien, Codebeispiele oder Lizenztexte
dieses Repositorys kopiert; die vorhandene Projektlizenz bleibt unverändert.
Vor einer späteren direkten Übernahme Lizenztext und erforderliche Hinweise klären.

Anpassungen gegenüber den Vorlagen:

- Codex-Arbeitsanweisungen statt Claude-Plugin, Hooks oder festgelegter Modelle.
- Projektabhängige Prüfungen statt generischer npm-Befehle und fixer Coverage-Vorgaben.
- Erhaltene Exitcodes, belegte Ergebnisse und getrennte Retry-/Skip-Auswertung.
- Frontend-Empfehlungen mit SEO, Barrierefreiheit und korrekter Zustandsbehandlung.
- Architekturabhängige Sicherheitsregeln statt pauschaler Cookie-/CSP-Vorgaben.
- Website-Nutzerpfade statt projektspezifischer Trading-/Wallet-Beispiele.
- Explizite Testziele, kontrollierte Testdaten und Schutz sensibler Artefakte.

## Marketingskills

Geprüfter Commit: `365b412152b9542499ca1439426f7fc3cc92bb65`.
Die folgenden Quellen wurden am 18. Oktober 2026 lokal aus dem Repository gelesen.
Die MIT-Lizenz mit Copyright von Corey Haines ist im Quellrepository vorhanden
und in [THIRD_PARTY_NOTICES.md](../THIRD_PARTY_NOTICES.md) beigefügt.

| Lokales Modul | Adaptierte Hauptquelle |
| --- | --- |
| GEO-Messung | [ai-seo/SKILL.md](https://github.com/coreyhaines31/marketingskills/blob/365b412152b9542499ca1439426f7fc3cc92bb65/skills/ai-seo/SKILL.md) |
| Seitenarchitektur | [site-architecture/SKILL.md](https://github.com/coreyhaines31/marketingskills/blob/365b412152b9542499ca1439426f7fc3cc92bb65/skills/site-architecture/SKILL.md) |
| Strukturierte Daten | [schema/SKILL.md](https://github.com/coreyhaines31/marketingskills/blob/365b412152b9542499ca1439426f7fc3cc92bb65/skills/schema/SKILL.md) |
| Conversion | [cro/SKILL.md](https://github.com/coreyhaines31/marketingskills/blob/365b412152b9542499ca1439426f7fc3cc92bb65/skills/cro/SKILL.md) und [Formulare](https://github.com/coreyhaines31/marketingskills/blob/365b412152b9542499ca1439426f7fc3cc92bb65/skills/cro/references/form.md) |

Ergänzend geprüft: [Prompt-Portfolio](https://github.com/coreyhaines31/marketingskills/blob/365b412152b9542499ca1439426f7fc3cc92bb65/skills/ai-seo/references/prompt-portfolio.md)
und [Antwortkorrektheit](https://github.com/coreyhaines31/marketingskills/blob/365b412152b9542499ca1439426f7fc3cc92bb65/skills/ai-seo/references/answer-accuracy.md).
Diese Referenzen nennen Profound als konzeptionelle Vorquelle; ihre Studienwerte
und spezifischen Framework-Tabellen sind nicht Bestandteil unserer Adaption.

Fachliche Anpassungen:

- Versionierte GEO-Fragen mit getrennten Erwähnungs-, Zitierungs- und Empfehlungsraten,
  expliziten Nennern, Ausfällen und fehlenden Zugängen; keine simulierten Antworten.
- Keine festen Wortlängen, Linkquoten, Drei-Klick-Grenzen oder Prozentversprechen.
- Kein behaupteter allgemeiner Rankingeffekt von `llms.txt` oder experimentellen Protokollen.
- Nutzerorientierte Hierarchie ohne Pflicht, Breadcrumbs exakt an URL-Pfade anzugleichen.
- Markup-Syntax, Schema.org-Vokabular und aktuelle Suchfeature-Eignung separat prüfen.
  Zeitabhängige Aussagen der Quelle zu eingestellten Features nicht ungeprüft übernehmen.
- Conversion-Hypothesen mit Qualitäts-/Schutzkennzahlen statt garantierter Steigerungen;
  Datenschutz und konsistente Zähleinheiten bei Funnel-Messung berücksichtigen.

Die in den Modulen verlinkten externen Anbieter-Dokumentationen sind Referenzen
für spätere Audits; ihr aktueller Inhalt wurde bei dieser Integration nicht live validiert.
