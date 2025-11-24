# LittleLoop Website

Site-ul LittleLoop este o aplicație Vite + React dedicată părinților din România. Mai jos găsești structura, componentele și pașii de configurare.

## Structură

```
src/
 ├─ entries/       # Puncte de intrare pentru fiecare HTML static
 ├─ pages/         # Componente React pentru pagini (Home, Story etc.)
 ├─ components/    # Nav, Footer, InteractiveMap, Blog, CTA
 ├─ content/       # Articole MDX cu frontmatter
 ├─ data/          # Stiluri/JSON pentru MapLibre (PMTiles/MapTiler)
 ├─ lib/           # aiClient (OpenAI), router utilitare
 └─ styles.css     # Stil global
public/
 └─ tiles/         # Arhiva PMTiles dacă folosești hartă offline
```

## Fluxul aplicației

- HTML-urile statice (`index.html`, `poveste.html` etc.) încarcă scripturi din `src/entries/*.jsx`, care redau `<Nav />`, pagina corespunzătoare și `<Footer />`.
- `src/pages/Home.jsx` include hero-ul cu consola AI, harta MapLibre și secțiunea shop.
- Pagini precum `Story`, `Mission`, `Resources`, `Community`, `Contact` sunt componente independente din `src/pages/`.
- Blog-ul folosește MDX: fișierele din `src/content/*.mdx` exportă `frontmatter`; `src/utils/getPosts.js` le importă și construiește lista. `BlogIndex.jsx` afișează articolele, iar `BlogPost.jsx` redă conținutul și inserează `CustomCTA`.
- Hartă: `src/components/InteractiveMap.jsx` creează instanța MapLibre (folosind un stil local JSON sau MapTiler) și adaugă markerul București.
- Asistent AI: `Home.jsx` păstrează starea conversației, iar `src/lib/aiClient.js` apelează endpoint-ul `/api/chat` (funcție serverless sau server Node) care trimite cererea către OpenAI.

### Arhitectura AI

1. Componentele frontend (React) trimit cereri POST către `/api/chat` cu `{ input, history }`.
2. În dezvoltare, poți folosi serverul Express (`scripts/server.js`) sau `vercel dev` care rulează funcția din `api/chat.js`.
3. Backend-ul normalizează istoricul, inserează `SYSTEM_PROMPT` și apelează **OpenAI Chat Completions** folosind `OPENAI_API_KEY`.
4. Răspunsul text este returnat către browser. Cheia OpenAI rămâne doar pe backend.

## Scripturi

- `npm run dev` – server de dezvoltare Vite (frontend)
- `npm run server` – pornește API-ul Node/Express (rulează pe portul `PORT` sau 8787)
- `npm run build` – build de producție (`dist/`)
- `npm run preview` – testează build-ul local

## Configurare variabile de mediu

Frontend și backend folosesc fișiere/env-uri separate (ne-versionate):

```
# .env.local (frontend)
VITE_MAPTILER_KEY=...
VITE_API_BASE_URL=/api          # implicit; setează un URL extern dacă API-ul e pe alt domeniu

# .env.server sau variabile pentru API
OPENAI_API_KEY=sk-...
PORT=8787                       # opțional
ALLOWED_ORIGIN=https://littleloop.ro   # opțional, pentru CORS
OPENAI_MODEL=gpt-4o-mini        # opțional
```

Repornirea fiecărui server este necesară după ce modifici fișierele `.env*`.

## Componente importante

- `Nav.jsx` – meniu sticky + linkuri
- `Footer.jsx` – informații de contact
- `InteractiveMap.jsx` – instanță MapLibre + marker
- `BlogIndex.jsx` / `BlogPost.jsx` – listă și redare articole MDX
- `CustomCTA.jsx` – bloc CTA folosit în articole
- `aiClient.js` – helper care comunică cu backend-ul `/api/chat`
- `api/chat.js` – funcție serverless (Vercel) ce proxiază cererile către OpenAI
- `scripts/server.js` – server Node/Express folosit pentru dezvoltare locală
- `Home.jsx` – hero AI, map, shop, logica chatului și parallax-ul

## Conținut

- **Pagini**: adaugă componente noi în `src/pages` și conectează-le în `src/entries` sau `App.jsx`.
- **Blog**: creează fișiere `.mdx` cu `frontmatter` în `src/content`. Vite le importă automat.
- **Hartă**: actualizează `src/data/bucharest4map.json` sau folosește alt stil MapTiler.
- **AI**: promptul și modelul sunt definite în backend (`api/chat.js` sau `scripts/server.js` pentru dev); frontend-ul nu mai conține cheia OpenAI.

## Cum rulezi local

1. Instalează dependențele: `npm install`.
2. Creează `.env.local` și `.env.server` conform secțiunii *Configurare variabile de mediu*.
3. Într-un terminal rulează `npm run server` (backend). În alt terminal rulează `npm run dev` (frontend).
4. Accesează http://localhost:5173. Chat-ul va accesa `/api/chat`, proxy către http://localhost:8787.

## Cum rulezi în producție

1. Build: `npm run build` (crează `dist/`).
2. Deploy frontend (`dist/`) pe hosting static (Vercel, Netlify, etc.). Setează `VITE_API_BASE_URL` dacă API-ul este pe alt domeniu.
3. Deploy backend (`api/chat.js` ca funcție Vercel sau `scripts/server.js` pe un serviciu Node), cu `OPENAI_API_KEY` configurat. Asigură-te că expune `/api/chat`.
4. Configurează frontend-ul să apeleze backend-ul (prin `VITE_API_BASE_URL` sau printr-un reverse proxy/passthrough oferit de platforma ta).

## Deploy

1. Rulează `npm run build`.
2. Deploy pentru frontend (ex. Vercel/Netlify) și deploy pentru API (funcția `api/chat.js` pe Vercel sau serverul Node pe Fly.io/Render).
3. Configurează `OPENAI_API_KEY` pentru backend și `VITE_API_BASE_URL` (dacă API-ul este pe alt domeniu) pentru frontend.
4. Servește folderul `dist/` (Vercel/Netlify identifică automat comanda și output-ul).

## Note

- `.env*` este ignorat – păstrează cheile doar local/în hosting.
- Dacă folosești PMTiles locale, verifică dimensiunea și caching-ul.
- Backend-ul `/api/chat` menține cheia OpenAI pe server și evită expunerea în bundle.
