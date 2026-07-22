// CLI entry — ask the CFO copilot a question against the live ledger.
//
//   npm run dev -- "How are we doing this quarter and what's our runway?"
//
// With no argument it runs a sample question so you can smoke-test the wiring.

import { askCfo } from "./cfo-agent.js";

const question =
  process.argv.slice(2).join(" ").trim() ||
  "Give me a CFO summary of last month: profitability, cash position, and anything I should worry about.";

console.log(`\n\x1b[2m? ${question}\x1b[0m\n`);

try {
  const answer = await askCfo(question);
  console.log(answer);
} catch (err) {
  if (err instanceof Error && /ANTHROPIC_API_KEY/.test(err.message)) {
    console.error("Set ANTHROPIC_API_KEY in your environment (see ../.env.example).");
  } else {
    console.error("CFO agent failed:", err);
  }
  process.exit(1);
}
