import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const ROOT = path.resolve(__dirname, "..");
const SITE_URL = "https://littleloop.ro";
const CONTENT_DIR = path.join(ROOT, "src", "content");
const OUTPUT_FILE = path.join(ROOT, "public", "sitemap.xml");

const staticRoutes = [
  "/",
  "/misiune",
  "/activitati",
  "/resurse",
  "/comunitate",
  "/contact",
  "/blog",
];

const ensureDateIsoString = (value) => {
  if (!value) return new Date().toISOString();
  const parsed = new Date(value);
  if (Number.isNaN(parsed.getTime())) {
    return new Date().toISOString();
  }
  return parsed.toISOString();
};

const readFrontmatterFromMdx = (filePath) => {
  const raw = fs.readFileSync(filePath, "utf8");
  const match = raw.match(/export const frontmatter\s*=\s*({[\s\S]*?});/);
  if (!match) return {};
  try {
    // eslint-disable-next-line no-new-func
    const frontmatter = new Function(`return (${match[1]});`)();
    return frontmatter || {};
  } catch {
    return {};
  }
};

const collectBlogUrls = () => {
  if (!fs.existsSync(CONTENT_DIR)) return [];
  const files = fs.readdirSync(CONTENT_DIR).filter((file) => file.endsWith(".mdx"));

  return files.map((filename) => {
    const filePath = path.join(CONTENT_DIR, filename);
    const frontmatter = readFrontmatterFromMdx(filePath);
    const slug = frontmatter.slug || filename.replace(/\.mdx$/, "");
    const lastmod = ensureDateIsoString(frontmatter.updated || frontmatter.date);
    return {
      loc: `${SITE_URL}/blog/${slug}`,
      lastmod,
    };
  });
};

const buildStaticUrls = (buildDate) =>
  staticRoutes.map((route) => ({
    loc: route === "/" ? `${SITE_URL}/` : `${SITE_URL}${route}`,
    lastmod: buildDate,
  }));

const buildSitemap = (urls) => {
  const urlEntries = urls
    .map(
      ({ loc, lastmod }) => `  <url>
    <loc>${loc}</loc>
    <lastmod>${lastmod}</lastmod>
  </url>`
    )
    .join("\n");

  return `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urlEntries}
</urlset>
`;
};

const main = () => {
  const buildDate = new Date().toISOString();
  const urls = [...buildStaticUrls(buildDate), ...collectBlogUrls()];
  const xml = buildSitemap(urls);
  fs.mkdirSync(path.dirname(OUTPUT_FILE), { recursive: true });
  fs.writeFileSync(OUTPUT_FILE, xml, "utf8");
  console.log(`Generated sitemap with ${urls.length} URLs.`);
};

main();
