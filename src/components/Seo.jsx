import { Helmet } from "react-helmet-async";

export const SEO_SITE_URL = "https://littleloop.ro";
export const SEO_SITE_NAME = "LittleLoop";
const DEFAULT_DESCRIPTION =
  "LittleLoop este hub-ul din București pentru activități creative, resurse curate și comunitate pentru părinți și copii.";
const DEFAULT_TITLE = `${SEO_SITE_NAME} – Idei creative pentru părinți și copii`;
const DEFAULT_LOCALE = "ro_RO";
const DEFAULT_HREFLANGS = [
  { hrefLang: "ro-ro", ogLocale: "ro_RO" },
  { hrefLang: "x-default" },
];
export const SEO_DEFAULT_IMAGE = new URL(
  "../assets/herowall11.png",
  import.meta.url
).href;

const ensureLeadingSlash = (path = "/") =>
  path.startsWith("/") ? path : `/${path}`;

const buildCanonicalUrl = (path) => {
  if (!path) return SEO_SITE_URL;
  if (path.startsWith("http")) return path;
  return `${SEO_SITE_URL}${ensureLeadingSlash(path)}`;
};

const normalizeJsonLd = (jsonLd) => {
  if (!jsonLd) return [];
  return Array.isArray(jsonLd) ? jsonLd.filter(Boolean) : [jsonLd];
};

const normalizeHrefLangs = (alternates = [], fallbackHref) => {
  const source = alternates.length ? alternates : DEFAULT_HREFLANGS;
  return source.map((entry) => ({
    hrefLang: entry.hrefLang,
    href: entry.href || fallbackHref,
    ogLocale: entry.ogLocale,
  }));
};

export default function Seo({
  title,
  description,
  path = "/",
  image,
  type = "website",
  locale = DEFAULT_LOCALE,
  canonical,
  publishedTime,
  modifiedTime,
  noIndex = false,
  jsonLd,
  hrefLangs = [],
  children,
}) {
  const pageTitle = title ? `${title} | ${SEO_SITE_NAME}` : DEFAULT_TITLE;
  const metaDescription = description || DEFAULT_DESCRIPTION;
  const canonicalUrl = canonical || buildCanonicalUrl(path);
  const ogImage = image || SEO_DEFAULT_IMAGE;
  const htmlLang = locale?.split("_")[0] || "ro";
  const jsonLdEntries = normalizeJsonLd(jsonLd);
  const alternateLinks = normalizeHrefLangs(hrefLangs, canonicalUrl);
  const uniqueOgAlternates = Array.from(
    new Set(alternateLinks.map((entry) => entry.ogLocale).filter(Boolean))
  );

  return (
    <Helmet
      prioritizeSeoTags
      htmlAttributes={{
        lang: htmlLang,
      }}
    >
      <title>{pageTitle}</title>
      <meta name="description" content={metaDescription} />
      <meta property="og:title" content={pageTitle} />
      <meta property="og:description" content={metaDescription} />
      <meta property="og:site_name" content={SEO_SITE_NAME} />
      <meta property="og:url" content={canonicalUrl} />
      <meta property="og:type" content={type} />
      <meta property="og:image" content={ogImage} />
      <meta property="og:locale" content={locale || DEFAULT_LOCALE} />
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={pageTitle} />
      <meta name="twitter:description" content={metaDescription} />
      <meta name="twitter:image" content={ogImage} />
      <link rel="canonical" href={canonicalUrl} />
      {alternateLinks.map(({ hrefLang, href }) => (
        <link
          key={`hreflang-${hrefLang}`}
          rel="alternate"
          hrefLang={hrefLang}
          href={href}
        />
      ))}
      {uniqueOgAlternates.map((altLocale) => (
        <meta
          key={`og-locale-${altLocale}`}
          property="og:locale:alternate"
          content={altLocale}
        />
      ))}
      {publishedTime && (
        <meta property="article:published_time" content={publishedTime} />
      )}
      {modifiedTime && (
        <meta property="article:modified_time" content={modifiedTime} />
      )}
      {noIndex && <meta name="robots" content="noindex,nofollow" />}
      {jsonLdEntries.map((schema, index) => (
        <script
          key={`jsonld-${index}`}
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
        />
      ))}
      {children}
    </Helmet>
  );
}
