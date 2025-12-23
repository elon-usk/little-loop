import { useMemo } from "react";
import { useParams } from "react-router-dom";
import { getAllPosts } from "../utils/getPosts";
import Seo, {
  SEO_DEFAULT_IMAGE,
  SEO_SITE_NAME,
  SEO_SITE_URL,
} from "./Seo.jsx";
import CustomCTA from "./CustomCTA.jsx";
import MDXWrapper from "../mdx-provider.jsx";

const buildPostDescription = (post) => {
  if (!post) {
    return "Articolul căutat nu a fost găsit pe blogul LittleLoop.";
  }

  return (
    post.description ||
    post.excerpt ||
    `Citește „${post.title}”, o nouă poveste din comunitatea LittleLoop.`
  );
};

const buildCanonicalUrl = (slug = "") => `${SEO_SITE_URL}/blog/${slug}`;

const buildStructuredData = ({
  post,
  description,
  image,
  canonicalUrl,
  locale = "ro_RO",
}) => {
  const published = post.date;
  const updated = post.updated || post.date;
  const inLanguage = locale.replace("_", "-");

  const articleSchema = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: post.title,
    description,
    datePublished: published,
    dateModified: updated,
    mainEntityOfPage: canonicalUrl,
    image,
    inLanguage,
    author: {
      "@type": "Organization",
      name: SEO_SITE_NAME,
    },
    publisher: {
      "@type": "Organization",
      name: SEO_SITE_NAME,
      logo: {
        "@type": "ImageObject",
        url: image,
      },
    },
  };

  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      {
        "@type": "ListItem",
        position: 1,
        name: "Acasă",
        item: SEO_SITE_URL,
      },
      {
        "@type": "ListItem",
        position: 2,
        name: "Blog",
        item: `${SEO_SITE_URL}/blog`,
      },
      {
        "@type": "ListItem",
        position: 3,
        name: post.title,
        item: canonicalUrl,
      },
    ],
  };

  return [articleSchema, breadcrumbSchema];
};

export default function BlogPost() {
  const { slug = "" } = useParams();
  const posts = useMemo(() => getAllPosts(), []);

  const post = posts.find((p) => p.slug === slug);
  const requestedCanonical = buildCanonicalUrl(slug);

  if (!post) {
    return (
      <>
        <Seo
          title="Articol indisponibil"
          description="Articolul căutat nu există sau a fost mutat. Descoperă alte resurse pe blogul LittleLoop."
          path={`/blog/${slug}`}
          canonical={requestedCanonical}
          noIndex
        />
        <p className="prose mx-auto py-10">404 – Articolul nu a fost găsit.</p>
      </>
    );
  }

  const PostComponent = post.component;
  const path = `/blog/${post.slug}`;
  const canonicalUrl = buildCanonicalUrl(post.slug);
  const metaDescription = buildPostDescription(post);
  const heroImage = post.image || SEO_DEFAULT_IMAGE;
  const jsonLd = buildStructuredData({
    post,
    description: metaDescription,
    image: heroImage,
    canonicalUrl,
    locale: post.locale || "ro_RO",
  });
  const modifiedTime = post.updated || post.date;

  return (
    <>
      <Seo
        title={post.title}
        description={metaDescription}
        path={path}
        canonical={canonicalUrl}
        type="article"
        publishedTime={post.date}
        modifiedTime={modifiedTime}
        image={heroImage}
        jsonLd={jsonLd}
      />
      <article className="prose mx-auto py-10">
        <h1>{post.title}</h1>
        <p className="post-meta text-gray-600">
          {new Date(post.date).toLocaleDateString("ro-RO")}
        </p>

        {post.tags && (
          <p className="post-tags text-blue-600">{post.tags.join(" • ")}</p>
        )}

        <MDXWrapper>
          <PostComponent />
        </MDXWrapper>

        <CustomCTA />
      </article>
    </>
  );
}
