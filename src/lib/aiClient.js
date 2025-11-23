const OPENAI_API_URL = "https://api.openai.com/v1/chat/completions";
const DEFAULT_MODEL = "gpt-4o-mini";

const SYSTEM_PROMPT = `Ești LittleLoop AI, un asistent empatic pentru părinți și copii interesați de activități creative în București și acasă. Răspunde mereu în limba română, cu un ton cald și practic, oferind idei scurte și concrete. Nu oferi sfaturi medicale sau diagnostice și recomandă întotdeauna consultul unui medic atunci când primești întrebări de sănătate. Dacă nu știi un răspuns, spune asta politicos și îndrumă spre resurse utile.`;

export async function askLittleLoopAI({ input, history = [] }) {
  const apiKey = import.meta.env.VITE_OPENAI_API_KEY;
  console.log("API KEY SEEN", import.meta.env.VITE_OPENAI_API_KEY?.slice(0, 12)); 
  if (!apiKey) {
    throw new Error("Lipsește cheia OpenAI. Configurează VITE_OPENAI_API_KEY.");
  }

  const trimmedHistory = history
    .slice(-6)
    .map(({ role, content }) => ({ role, content }));

  const response = await fetch(OPENAI_API_URL, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${apiKey}`,
    },
    body: JSON.stringify({
      model: DEFAULT_MODEL,
      temperature: 0.6,
      messages: [
        { role: "system", content: SYSTEM_PROMPT },
        ...trimmedHistory,
        { role: "user", content: input },
      ],
    }),
  });

  if (!response.ok) {
    const errorPayload = await response.json().catch(() => ({}));
    const reason = errorPayload?.error?.message ?? response.statusText;
    throw new Error(`Cererea către OpenAI a eșuat: ${reason}`);
  }

  const data = await response.json();
  const message = data?.choices?.[0]?.message?.content?.trim();

  if (!message) {
    throw new Error("OpenAI nu a trimis niciun răspuns.");
  }

  return message;
}
