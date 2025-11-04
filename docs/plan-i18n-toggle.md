# Plan pentru toggle RO/EN cu react-i18next

## Verificare fonturi

- Fonturile Google configurate (Jost, Kodchasan, Playwrite HU &#537;i Pacifico) includ glife pentru caractere rom&#226;ne&#537;ti (`&#259;`, `&#226;`, `&#238;`, `&#537;`, `&#539;`). Testeaz&#259; &#238;nc&#259; o dat&#259; &#238;n build-ul final pentru a observa eventuale fallback-uri.
- Dac&#259; apar lipsuri, define&#537;te o stiv&#259; de fallback &#238;n `styles.css` (de exemplu `font-family: "Jost", "Segoe UI", "Helvetica Neue", Arial, sans-serif;`) &#537;i asigur&#259;-te c&#259; varianta bold/italic este disponibil&#259;.
- Recomandare: adaug&#259; `font-display: swap` pentru resursele Google Fonts printr-un query param (`&display=swap`) ca s&#259; evi&#539;i penaliz&#259;rile CLS.

## Integrare react-i18next

1. Instaleaz&#259; dependen&#539;ele: `npm install react-i18next i18next i18next-browser-languagedetector`.
2. Creeaz&#259; `src/lib/i18n.js` cu ini&#539;ializarea i18next (limba implicit&#259; `ro`, fallback `en`, detector pentru `localStorage` &#537;i `navigator.language`).
3. Mut&#259; toate textele &#238;n fi&#537;iere JSON (`src/locales/ro/translation.json` &#537;i `src/locales/en/translation.json`). P&#259;streaz&#259; meta-informa&#539;iile SEO &#238;ntr-o structur&#259; separat&#259; (ex. `meta.home.title`, `meta.home.description`).
4. &#206;n `main.jsx`, import&#259; ini&#539;ializarea &#537;i &#238;nf&#259;&#539;oar&#259; aplica&#539;ia &#238;n `I18nextProvider` &#537;i `Suspense` (dac&#259; folose&#537;ti lazy loading pentru traduceri).
5. Adaug&#259; un `LanguageToggle` (buton sau meniu) &#238;n `Nav`, care apeleaz&#259; `i18n.changeLanguage("ro" | "en")` &#537;i stocheaz&#259; preferin&#539;a &#238;n `localStorage`.
6. Expune limba curent&#259; c&#259;tre head tags (folosind `react-helmet-async` sau Vite `useHead`) pentru a seta dinamic `title`, `meta description`, `og:*`, `link rel="alternate"` (ro/en) &#537;i eventual `html lang`.

## Testare recomandat&#259;

- Rulare `npm run build` &#537;i vizualizare &#238;n `npm run preview` pentru a verifica afi&#537;area diacriticelor.
- Lighthouse (Desktop + Mobile) pentru scoruri SEO; verific&#259; sec&#539;iunea "Best Practices" pentru datele Open Graph/Twitter.
- Dup&#259; introducerea limbii engleze, verific&#259; cu instrumentul Rich Results &#537;i cu un validator `hreflang`.

