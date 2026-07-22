# MVP Fin DB — Finance OS

A one-stop finance centre for the business: **auto quote → invoice → payment tracking → receipts & acknowledgments → audit-ready management accounts → CFO-level forecasting, budgeting & investment planning.**

Built on a proven open-source accounting backbone ([Bigcapital](https://github.com/bigcapitalhq/bigcapital)) with a custom AI layer on top (Claude API). We don't reinvent double-entry bookkeeping — we self-host a battle-tested engine and build our differentiation (the AI CFO) where it matters.

## The three layers

```
┌───────────────────────────────────────────────────────────────┐
│  Layer 3 — AI CFO brain  (ai-cfo/ — Claude API)                │
│  chat→quote · receipt OCR · cash forecast · budget-vs-actual   │
│  CFO Q&A · investment scenario planning                        │
├───────────────────────────────────────────────────────────────┤
│  Layer 2 — Double-entry ledger  (Bigcapital, self-hosted)      │
│  every quote/invoice/payment/receipt auto-posts a journal      │
│  entry → P&L · balance sheet · cash flow · AR/AP aging          │
│  · trial balance — management accounts fall out for free       │
├───────────────────────────────────────────────────────────────┤
│  Layer 1 — Quote-to-Cash pipeline  (Bigcapital)                │
│  estimate → invoice → payment link → tracking → receipt        │
│  mirrored on the vendor side (bills in, payments out)          │
└───────────────────────────────────────────────────────────────┘
```

The secret that makes everything "recorded properly" and audit-ready: **the workflow IS the bookkeeping.** You never do accounting separately — issuing an invoice, receiving a payment, and sending a receipt each post a journal entry automatically. From that one ledger, every management report and audit trail is a drill-down away.

## Roadmap

| Phase | Deliverable | Where |
|-------|-------------|-------|
| **1 — Quote-to-Cash** | Self-host Bigcapital; configure quotes, invoices, payment tracking, receipts, vendor bills | `docker-compose.yml` |
| **2 — Management accounts** | Chart of accounts, tax config, report packs (P&L / BS / cash flow / AR-AP aging) audit-ready | Bigcapital admin |
| **3 — AI CFO layer** | Chat-to-quote, receipt OCR → entries, cash forecast, budget-vs-actual alerts, CFO Q&A, investment scenarios | `ai-cfo/` |

## Quick start

### 1. Run the accounting backbone

```bash
cp .env.example .env      # fill in the secrets
docker compose up -d      # starts Bigcapital + MariaDB + MongoDB + Redis
```

Open http://localhost:3000 and complete the onboarding wizard (org name, base currency, fiscal year).

### 2. Run the AI CFO layer

```bash
cd ai-cfo
npm install
npm run dev               # asks the CFO agent questions against your live ledger
```

Set `ANTHROPIC_API_KEY` and `BIGCAPITAL_API_TOKEN` in `.env` first.

## Why this stack

- **Proven & tested** — Bigcapital ships full quote→invoice→payment→receipt→vendor flows plus a real double-entry ledger and standard reports, out of the box.
- **AI-era differentiation** — the CFO copilot is the part that's genuinely ours; it reads the live ledger and answers the questions a finance director actually asks.
- **Clean, delightful UI** — front-end work follows the `impeccable` design system (gstack).

## License note

Bigcapital is **AGPL-3.0** — fine for self-hosting our own business. If we ever resell this as a hosted SaaS, we must open-source our modifications. The `ai-cfo/` layer is ours to license as we choose.

## Layout

```
docker-compose.yml     # self-host Bigcapital (Phase 1–2)
.env.example           # all secrets in one place
ai-cfo/                # Phase 3 — the Claude-powered CFO brain
  src/
    cfo-agent.ts       # Claude tool-runner agent over the ledger
    ledger-tools.ts    # typed tools that read the Bigcapital API
    index.ts           # CLI entry — ask the CFO a question
```
