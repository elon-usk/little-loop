const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || "/api";

export async function askLittleLoopAI({ input, history = [] }) {
  const trimmedHistory = history
    .slice(-6)
    .map(({ role, content }) => ({ role, content }));

  const response = await fetch(`${API_BASE_URL}/chat`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      input,
      history: trimmedHistory,
    }),
  });

  if (!response.ok) {
    const errorPayload = await response.json().catch(() => ({}));
    const reason = errorPayload?.error ?? response.statusText;
    throw new Error(`Cererea către server a eșuat: ${reason}`);
  }

  const data = await response.json();
  const message = data?.message?.trim();

  if (!message) {
    throw new Error("Serverul nu a trimis niciun răspuns.");
  }

  return message;
}
