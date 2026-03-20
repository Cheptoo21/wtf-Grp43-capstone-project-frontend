const API_BASE = `${import.meta.env.VITE_API_URL}/api/transactions`;
import { getToken } from "@/lib/authService";
import { fetchWithAuth } from "@/lib/api";


export async function extractWithLLM(transcript) {
  if (!transcript) throw new Error("Transcript is required");
  const response = await fetchWithAuth(`${import.meta.env.VITE_API_URL}/api/ai/extract`, {
    method: "POST",
    body: JSON.stringify({ transcript }),
  });
  if (!response.ok) return;

  const data = await response.json();

  if (!data.success) throw new Error(data.message ?? "AI extraction failed");

  const parsed = data.data;

  if (!parsed.transactionType || !parsed.item || parsed.amount == null) {
    throw new Error(
      `AI returned incomplete fields: ${JSON.stringify(parsed)}`
    );
  }

  return { ...parsed, rawText: transcript };
}

export async function saveTransaction(transactionObj) {
  if (
    !transactionObj ||
    !transactionObj.transactionType ||
    !transactionObj.item ||
    transactionObj.amount == null
  ) {
    throw new Error(
      "Cannot save: transactionType, item, and amount are required"
    );
  }

  const res = await fetch(API_BASE, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${getToken()}`,
    },
    body: JSON.stringify(transactionObj),
  });

  const data = await res.json();

  if (!res.ok || !data.success)
    throw new Error(data.message ?? "Failed to save transaction");

  return data.transaction;
}
export async function processAndSave(transcript) {
  const transaction = await extractWithLLM(transcript);
  const saved = await saveTransaction(transaction);
  return saved;
}