const API_BASE = "http://localhost:3000/api/transactions";

export function getToken() {
  return localStorage.getItem("token") ?? "";
}

export async function extractWithLLM(transcript) {
  const response = await fetch("https://api.anthropic.com/v1/messages", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "x-api-key": import.meta.env.VITE_CLAUDE_API_KEY,
      "anthropic-version": "2023-06-01",
    },
    body: JSON.stringify({
      model: "claude-sonnet-4-6-20250514",
      max_tokens: 128,
      system: `You are a transaction parser for a small-business bookkeeping app.
Extract fields from the transcript and respond ONLY with raw JSON — no markdown, no explanation.

JSON shape:
{
  "transactionType": "sale" | "expense",
  "item": string,
  "amount": number,
  "currency": "NGN"
}

- transactionType: "sale" if user sold something, "expense" if they bought/paid.
- item: title-cased product or service name.
- amount: positive number, no symbols.
- currency: always "NGN" unless user says otherwise.
- If a required field is missing, return { "error": "<reason>" }.`,
      messages: [{ role: "user", content: transcript }],
    }),
  });

  if (!response.ok) throw new Error(`Claude API error ${response.status}`);

  const data = await response.json();
  const raw = data.content?.find((b) => b.type === "text")?.text ?? "";

  let parsed;
  try {
    parsed = JSON.parse(raw.replace(/```json|```/g, "").trim());
  } catch {
    throw new Error("Could not parse AI response");
  }

  if (parsed.error) throw new Error(parsed.error);
  if (!parsed.transactionType || !parsed.item || parsed.amount == null)
    throw new Error("AI returned incomplete fields");

  return { ...parsed, rawText: transcript };
}

export async function saveTransaction(payload) {
  const res = await fetch(API_BASE, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${getToken()}`,
    },
    body: JSON.stringify(payload),
  });

  const data = await res.json();
  if (!res.ok || !data.success) throw new Error(data.message ?? "Failed to save");
  return data.transaction;
}