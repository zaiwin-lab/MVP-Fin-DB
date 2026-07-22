// Typed tools the CFO agent uses to read the live Bigcapital ledger.
//
// Each tool is a thin, read-only wrapper over a Bigcapital API endpoint. The
// agent decides which to call; the tool runner executes them and feeds the
// results back to Claude. Keeping these read-only means the copilot can answer
// and forecast, but the ledger is only ever mutated through Bigcapital's own
// validated flows — the audit trail stays clean.

import { betaZodTool } from "@anthropic-ai/sdk/helpers/beta/zod";
import { z } from "zod";

const BASE = process.env.BIGCAPITAL_API_URL ?? "http://localhost:3000/api";
const TOKEN = process.env.BIGCAPITAL_API_TOKEN ?? "";

async function bc(path: string, params: Record<string, string> = {}) {
  const url = new URL(BASE + path);
  for (const [k, v] of Object.entries(params)) url.searchParams.set(k, v);
  const res = await fetch(url, {
    headers: { "x-access-token": TOKEN, "Content-Type": "application/json" },
  });
  if (!res.ok) {
    return `Error ${res.status} calling ${path}: ${await res.text()}`;
  }
  return JSON.stringify(await res.json());
}

export const profitAndLoss = betaZodTool({
  name: "profit_and_loss",
  description:
    "Income statement (P&L) for a date range: revenue, expenses, net profit. Use for 'how did we do', margin, and profitability questions.",
  inputSchema: z.object({
    from_date: z.string().describe("Start date, YYYY-MM-DD"),
    to_date: z.string().describe("End date, YYYY-MM-DD"),
  }),
  run: ({ from_date, to_date }) =>
    bc("/financial-statements/profit-loss-sheet", { from_date, to_date }),
});

export const balanceSheet = betaZodTool({
  name: "balance_sheet",
  description:
    "Balance sheet as of a date: assets, liabilities, equity. Use for solvency, working capital, and 'what do we own/owe' questions.",
  inputSchema: z.object({
    as_date: z.string().describe("Report date, YYYY-MM-DD"),
  }),
  run: ({ as_date }) =>
    bc("/financial-statements/balance-sheet", { to_date: as_date }),
});

export const cashFlow = betaZodTool({
  name: "cash_flow",
  description:
    "Cash flow statement for a date range: operating, investing, financing. Use for liquidity and runway questions.",
  inputSchema: z.object({
    from_date: z.string().describe("Start date, YYYY-MM-DD"),
    to_date: z.string().describe("End date, YYYY-MM-DD"),
  }),
  run: ({ from_date, to_date }) =>
    bc("/financial-statements/cash-flow", { from_date, to_date }),
});

export const receivableAging = betaZodTool({
  name: "receivable_aging",
  description:
    "Accounts-receivable aging summary — who owes us, and how overdue. Use for collections, DSO, and cash-in forecasting.",
  inputSchema: z.object({
    as_date: z.string().describe("Report date, YYYY-MM-DD"),
  }),
  run: ({ as_date }) =>
    bc("/financial-statements/receivable-aging-summary", { as_date }),
});

export const payableAging = betaZodTool({
  name: "payable_aging",
  description:
    "Accounts-payable aging summary — who we owe, and when it's due. Use for cash-out forecasting and vendor prioritisation.",
  inputSchema: z.object({
    as_date: z.string().describe("Report date, YYYY-MM-DD"),
  }),
  run: ({ as_date }) =>
    bc("/financial-statements/payable-aging-summary", { as_date }),
});

export const ledgerTools = [
  profitAndLoss,
  balanceSheet,
  cashFlow,
  receivableAging,
  payableAging,
];
