import fetch from "node-fetch";

const OPENAI_API_URL = "https://api.openai.com/v1/chat/completions";
const DEFAULT_MODEL = "gpt-4o-mini";
const SYSTEM_PROMPT = `Ești LittleLoop AI, un asistent empatic pentru părinți și copii interesați de activități creative în București și acasă. Răspunde mereu în limba română, cu un ton cald și practic, oferind idei scurte și concrete. Nu oferi sfaturi medicale sau diagnostice și recomandă întotdeauna consultul unui medic atunci când primești întrebări de sănătate. Dacă nu știi un răspuns, spune asta politicos și îndrumă spre resurse utile.`;

const ensureArrayOfMessages = (history = []) => {
  if (!Array.isArray(history)) return [];
  return history
    .filter(
      (item) =>
        item &&
        typeof item === "object" &&
        typeof item.role === "string" &&
        typeof item.content === "string"
    )
    .map(({ role, content }) => ({ role, content }))
    .slice(-6);
};

const respondWithError = (res, status, message) =>
  res.status(status).json({ error: message });

export default async function handler(req, res) {
  if (req.method !== "POST") {
    res.setHeader("Allow", ["POST"]);
    return respondWithError(res, 405, "Method Not Allowed");
  }

  const apiKey = process.env.OPENAI_API_KEY;
  if (!apiKey) {
    return respondWithError(
      res,
      500,
      "OPENAI_API_KEY nu este configurată pe server."
    );
  }

  const { input, history } = req.body || {};
  if (!input || typeof input !== "string") {
    return respondWithError(
      res,
      400,
      "Cererea trebuie să conțină câmpul 'input'."
    );
  }

  const messages = ensureArrayOfMessages(history);
  const payload = {
    model: process.env.OPENAI_MODEL || DEFAULT_MODEL,
    temperature: 0.6,
    messages: [
      { role: "system", content: SYSTEM_PROMPT },
      ...messages,
      { role: "user", content: input },
    ],
  };

  try {
    const response = await fetch(OPENAI_API_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${apiKey}`,
      },
      body: JSON.stringify(payload),
    });

    if (!response.ok) {
      const errorPayload = await response.json().catch(() => ({}));
      const reason = errorPayload?.error?.message ?? response.statusText;
      return respondWithError(res, response.status, reason);
    }

    const data = await response.json();
    const message = data?.choices?.[0]?.message?.content?.trim();

    if (!message) {
      return respondWithError(
        res,
        502,
        "OpenAI nu a trimis niciun răspuns."
      );
    }

    return res.status(200).json({ message });
  } catch (error) {
    console.error("[api/chat] OpenAI request failed:", error);
    return respondWithError(
      res,
      500,
      "Cererea către OpenAI a eșuat. Verifică jurnalul serverului."
    );
  }
}
