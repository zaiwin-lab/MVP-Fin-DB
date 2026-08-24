# ZK Finance OS — Ledger-Grounded CFO Copilot

> **Maturity:** Architecture and integration prototype · implemented read-only AI agent, unverified end-to-end deployment

ZK Finance OS explores a finance operating model that combines an open-source accounting backbone with a read-only AI copilot. Its differentiating layer is a Claude-based command-line agent that selects financial reports, reads ledger results and answers management questions without writing back to the books.

## Business problem

Small organisations often separate quotations, invoices, collections, accounting reports and management decisions across different tools and manual processes. This weakens visibility and makes it harder for leaders to understand profitability, liquidity, receivables and upcoming obligations. ZK Finance OS tests an architecture in which operational accounting remains inside a structured ledger while AI helps leaders interpret authorised reports.

## Intended users

- Business owners and executive leadership
- Finance managers and internal finance teams
- Accountants validating management-report workflows
- Technical teams evaluating ledger-to-AI integration
- Portfolio reviewers assessing responsible financial-agent architecture

## Demonstrated capabilities

- Docker Compose definition for a self-hosted Bigcapital environment
- Accounting-service dependencies covering MariaDB, MongoDB and Redis
- TypeScript Claude agent using the Anthropic SDK tool runner
- Five typed, read-only ledger tools:
  - profit and loss
  - balance sheet
  - cash flow
  - receivables ageing
  - payables ageing
- Date-bound tool parameters validated with Zod
- Agent instructions requiring tool-grounded numbers and explicit assumptions
- Command-line question interface
- Error handling for missing API credentials

## Strategic value

The architecture demonstrates a responsible pattern for financial AI: retain transaction entry and ledger mutation inside established accounting workflows, and expose only narrowly scoped read tools to the model. This limits autonomous action while allowing management to explore financial questions in natural language.

## What is actually implemented

The repository includes working TypeScript source for a Claude tool-running agent and read-only HTTP wrappers for five Bigcapital report endpoints. It also includes a Docker Compose environment intended to host the accounting backbone.

The repository does **not** contain evidence that the full stack has been successfully deployed against a configured organisation, that every assumed API endpoint matches the selected Bigcapital release, or that the generated answers have been reconciled by an accountant. Forecasting, OCR, chat-to-quote, budgeting alerts and investment-scenario workflows remain roadmap concepts unless implemented elsewhere.

The current Docker Compose file uses `latest` tags for the Bigcapital server and web application. Those are not reproducibly pinned releases and should be replaced with reviewed version tags before controlled deployment.

## Technology

- TypeScript and Node.js
- Anthropic SDK tool runner
- Zod schemas for tool inputs
- Bigcapital API integration
- Docker Compose
- MariaDB, MongoDB and Redis
- Environment-based secrets and service configuration

## Delivery role

**Ts. Zaiwin Kassim** leads product strategy, finance-workflow framing, solution architecture and supervised AI-assisted delivery with the **KOBIS AI Prodigy Team**. This portfolio evidence demonstrates an integration approach and implemented agent layer; it does not claim audited accounts, financial performance, regulatory approval or production adoption.

## Responsible-use boundaries

- The copilot is a management-support tool, not an accountant, auditor, tax adviser, investment adviser or authorised approver.
- Every material figure and conclusion must be reconciled to the source ledger and reviewed by qualified finance personnel.
- Read-only tools reduce mutation risk but do not prevent prompt injection, excessive data exposure, incorrect endpoint mappings or misleading interpretation.
- Ledger access tokens and AI API keys must remain in a protected secrets system and must never be committed or exposed to client-side code.
- Financial data requires least-privilege access, encryption, retention controls, backups, recovery testing and auditable user activity.
- Forecasts and scenarios must show assumptions, ranges and uncertainty; they must not be presented as guarantees.
- Any operational accounting configuration requires accountant review, jurisdiction-specific tax treatment and controlled change management.
- Bigcapital’s AGPL-3.0 obligations and all third-party licences require legal review before redistribution or hosted commercial use.

## Current limitations

- No browser or production user interface for the AI copilot
- No evidence of a completed live ledger connection or accountant-validated answer set
- No automated tests, evaluation dataset, hallucination benchmark or regression suite
- No user authentication or authorisation layer around the command-line agent
- No structured redaction of sensitive data before model submission
- No OCR, write tools, payment execution or automated journal posting in the custom AI layer
- Bigcapital container versions are not pinned
- API compatibility and failure behaviour require integration testing

## Run locally

```bash
cp .env.example .env
docker compose up -d

cd ai-cfo
npm install
npm run dev -- "Summarise last month's profitability and liquidity risks."
```

Use only non-production test data until credentials, access controls, API compatibility and professional review have been completed.

## Portfolio evidence

ZK Finance OS demonstrates AI tool design, read-only agent boundaries, financial-domain orchestration, containerised integration planning and honest separation between implemented capability and roadmap ambition.
