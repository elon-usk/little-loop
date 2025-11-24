import dotenv from "dotenv";
import { existsSync } from "node:fs";
import express from "express";
import cors from "cors";

dotenv.config({
  path:
    process.env.DOTENV_CONFIG_PATH ||
    (existsSync(".env.server") ? ".env.server" : undefined),
});

const PORT = process.env.PORT || 8787;
const OPENAI_API_URL = "https://api.openai.com/v1/chat/completions";
const DEFAULT_MODEL = "gpt-4o-mini";
const SYSTEM_PROMPT = `Ești LittleLoop AI, un asistent empatic pentru părinți și copii interesați de activități creative în București și acasă. Răspunde mereu în limba română, cu un ton cald și practic, oferind idei scurte și concrete. Nu oferi sfaturi medicale sau diagnostice și recomandă întotdeauna consultul unui medic atunci când primești întrebări de sănătate. Dacă nu știi un răspuns, spune asta politicos și îndrumă spre resurse utile.`;

const app = express();

app.use(
  cors({
    origin: process.env.ALLOWED_ORIGIN || "*",
    methods: ["POST", "OPTIONS"],
  })
);
app.use(express.json());

const ensureArrayOfMessages = (history = []) => {
  if (!Array.isArray(history)) return [];
  const sanitized = history
    .filter(
      (item) =>
        item &&
        typeof item === "object" &&
        typeof item.role === "string" &&
        typeof item.content === "string"
    )
    .map(({ role, content }) => ({ role, content }));
  return sanitized.slice(-6);
};

const callOpenAI = async ({ input, history }) => {
  const apiKey = process.env.OPENAI_API_KEY;
  if (!apiKey) {
    throw new Error("OPENAI_API_KEY nu este configurată pe server.");
  }

  const payload = {
    model: process.env.OPENAI_MODEL || DEFAULT_MODEL,
    temperature: 0.6,
    messages: [
      { role: "system", content: SYSTEM_PROMPT },
      ...history,
      { role: "user", content: input },
    ],
  };

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
    const error = new Error(reason);
    error.status = response.status;
    throw error;
  }

  const data = await response.json();
  const message = data?.choices?.[0]?.message?.content?.trim();

  if (!message) {
    throw new Error("OpenAI nu a trimis niciun răspuns.");
  }

  return message;
};

app.post("/api/chat", async (req, res) => {
  const { input, history } = req.body || {};
  if (!input || typeof input !== "string") {
    return res
      .status(400)
      .json({ error: "Cererea trebuie să conțină câmpul 'input'." });
  }

  try {
    const messages = ensureArrayOfMessages(history);
    const reply = await callOpenAI({ input, history: messages });
    res.json({ message: reply });
  } catch (error) {
    const status = error.status && Number.isInteger(error.status) ? error.status : 500;
    console.error(
      "[/api/chat] OpenAI request failed:",
      error?.message || error,
      error?.stack || ""
    );
    res.status(status).json({
      error:
        status === 500
          ? "Cererea către OpenAI a eșuat. Verifică jurnalul serverului."
          : error.message,
    });
  }
});

app.get("/api/health", (req, res) => {
  res.json({ ok: true });
});

app.listen(PORT, () => {
  console.log(`LittleLoop API server ascultă pe portul ${PORT}`);
});
