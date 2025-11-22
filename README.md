# LittleLoop

Aplica&#539;ie Vite + React pentru comunitatea LittleLoop.

## Scripturi

- `npm run dev` &ndash; porne&#537;te serverul de dezvoltare
- `npm run build` &ndash; genereaz&#259; build-ul de produc&#539;ie
- `npm run preview` &ndash; porne&#537;te serverul de previzualizare pentru build

## Configurare OpenAI

Asistentul LittleLoop AI din consola din hero folosește API-ul OpenAI. Creează un fișier `.env` în rădăcina proiectului (sau `.env.local`) și adaugă:

```
VITE_OPENAI_API_KEY=sk-your-key
```

Repornirea serverului de dezvoltare este necesară după ce adaugi cheia. În lipsa ei, formularul va afișa un mesaj de eroare.
