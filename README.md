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
- Asistent AI: `Home.jsx` păstrează starea conversației, iar `src/lib/aiClient.js` apelează OpenAI Chat Completions (model implicit `gpt-4o-mini`).

## Scripturi

- `npm run dev` – server de dezvoltare Vite
- `npm run build` – build de producție (`dist/`)
- `npm run preview` – testează build-ul local

## Configurare variabile de mediu

Creează `.env.local` (ignorată din Git) și adaugă:

```
VITE_OPENAI_API_KEY=sk-...
VITE_MAPTILER_KEY=...
```

Repornirea serverului este necesară după ce modifici `.env.local`.

## Componente importante

- `Nav.jsx` – meniu sticky + linkuri
- `Footer.jsx` – informații de contact
- `InteractiveMap.jsx` – instanță MapLibre + marker
- `BlogIndex.jsx` / `BlogPost.jsx` – listă și redare articole MDX
- `CustomCTA.jsx` – bloc CTA folosit în articole
- `aiClient.js` – helper pentru OpenAI (fetch + sistem prompt)
- `Home.jsx` – hero AI, map, shop, logica chatului și parallax-ul

## Conținut

- **Pagini**: adaugă componente noi în `src/pages` și conectează-le în `src/entries` sau `App.jsx`.
- **Blog**: creează fișiere `.mdx` cu `frontmatter` în `src/content`. Vite le importă automat.
- **Hartă**: actualizează `src/data/bucharest4map.json` sau folosește alt stil MapTiler.
- **AI**: modifică promptul/modelul în `aiClient.js`. Pentru a nu expune cheia, mută apelul într-un endpoint serverless.

## Deploy

1. Rulează `npm run build`.
2. Configurează `VITE_OPENAI_API_KEY` (și `VITE_MAPTILER_KEY` dacă e cazul) în platforma de hosting.
3. Servește folderul `dist/` (Vercel/Netlify identifică automat comanda și output-ul).

## Note

- `.env*` este ignorat – păstrează cheile doar local/în hosting.
- Dacă folosești PMTiles locale, verifică dimensiunea și caching-ul.
- Fără proxy serverless, cheia OpenAI din bundle poate fi expusă utilizatorilor.
