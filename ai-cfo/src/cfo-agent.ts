// The AI CFO copilot.
//
// Wraps Claude with the read-only ledger tools and a CFO system prompt. The
// tool runner drives the agentic loop: Claude decides which reports to pull,
// reads them, and answers like a finance director — grounding every claim in
// the live ledger rather than guessing.

import Anthropic from "@anthropic-ai/sdk";
import { ledgerTools } from "./ledger-tools.js";

const client = new Anthropic(); // reads ANTHROPIC_API_KEY from the environment

const SYSTEM = `You are the CFO copilot for a small business. You have read-only
access to the company's live double-entry ledger through tools (P&L, balance
sheet, cash flow, AR/AP aging).

How you work:
- Ground every number in a tool result from this session. Never invent figures.
  If a report doesn't cover what's asked, say so and pull what you can.
- Answer like a finance director: lead with the number and the takeaway, then
  the supporting detail. Flag risks (overdue receivables, thin runway, margin
  slippage) proactively.
- For forecasting, budgeting, and investment questions, reason from the actuals
  you pull — state your assumptions explicitly and keep them conservative.
- Today's date is available in the user's question or assume the latest complete
  month if unspecified. Ask for a date range only when it genuinely changes the
  answer.`;

export async function askCfo(question: string): Promise<string> {
  const finalMessage = await client.beta.messages.toolRunner({
    model: "claude-opus-4-8",
    max_tokens: 16000,
    thinking: { type: "adaptive" },
    system: SYSTEM,
    tools: ledgerTools,
    messages: [{ role: "user", content: question }],
  });

  return finalMessage.content
    .filter((b) => b.type === "text")
    .map((b) => (b as { text: string }).text)
    .join("\n");
}
