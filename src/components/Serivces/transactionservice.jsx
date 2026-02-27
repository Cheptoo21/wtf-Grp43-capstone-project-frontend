const API_BASE = `${import.meta.env.VITE_API_URL}/api/transactions`;

export function getToken() {
  return localStorage.getItem("token") ?? "";
}

console.log(getToken());

export async function extractWithLLM(transcript) {
  console.log("Extracting with LLM, transcript:", transcript);
  if (!transcript) throw new Error("Transcript is required");

  const response = await fetch(`${import.meta.env.VITE_API_URL}/api/ai/extract`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${getToken()}`,
    },
    body: JSON.stringify({ transcript }),
  });

  if (!response.ok) {
    const errText = await response.text();
    throw new Error(`AI extraction failed: ${errText}`);
  }

  const data = await response.json();
  console.log(data);

  if (!data.success) throw new Error(data.message ?? "AI extraction failed");

  const parsed = data.data;

  // Validate required fields before sending to backend
  if (!parsed.transactionType || !parsed.item || parsed.amount == null) {
    throw new Error(
      `AI returned incomplete fields: ${JSON.stringify(parsed)}`
    );
  }

  // Always include rawText
  return { ...parsed, rawText: transcript };
}

/**
 * Save a transaction object to backend.
 * Expects object with: transactionType, item, amount, currency, rawText
 */
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

/**
 * Convenience function: extract + save in one call
 */
export async function processAndSave(transcript) {
  const transaction = await extractWithLLM(transcript);
  const saved = await saveTransaction(transaction);
  return saved;
}