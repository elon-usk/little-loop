import React from "react";
import { Link } from "react-router-dom";
import { getAllPosts } from "../utils/getPosts";

const pastelGradients = [
  "linear-gradient(135deg, rgba(255, 226, 252, 0.85), rgba(225, 246, 255, 0.85))",
  "linear-gradient(135deg, rgba(253, 250, 224, 0.9), rgba(229, 240, 255, 0.85))",
  "linear-gradient(135deg, rgba(231, 241, 255, 0.9), rgba(255, 236, 246, 0.85))",
];

const getExcerpt = (post) =>
  post.excerpt ||
  post.summary ||
  post.description ||
  "Descoperă povestea completă pe blog.";

const formatDate = (value) => {
  try {
    return new Date(value).toLocaleDateString("ro-RO", {
      day: "2-digit",
      month: "long",
    });
  } catch {
    return value;
  }
};

export default function BlogPreviewSection() {
  const posts = React.useMemo(
    () =>
      getAllPosts()
        .sort((a, b) => new Date(b.date) - new Date(a.date))
        .slice(0, 3),
    []
  );

  if (!posts.length) return null;

  return (
    <section
      className="section shop-section"
      aria-labelledby="blog-preview-title"
    >
      <div className="container">
        <div className="shop-intro">
          <span className="shop-tag">Blog</span>
          <h2 id="blog-preview-title">LittleLoop Blog</h2>
          <p>
            Trei povești recente, selectate pentru a inspira momente liniștite
            împreună.
          </p>
        </div>

        {/* MOBILE: horizontal scroll | DESKTOP: grid */}
        <div
          className="shop-grid flex gap-4 overflow-x-auto pb-4 md:grid md:overflow-visible"
          role="list"
        >
          {posts.map((post, index) => (
            <article
              key={post.slug}
              role="listitem"
              className="
                shop-card
                w-[200px] basis-[200px] flex-shrink-0
                sm:w-[220px] sm:basis-[220px]
                md:w-auto md:basis-auto
              "
            >
              <div
                className="shop-card-media"
                aria-hidden="true"
                style={{
                  background:
                    pastelGradients[index % pastelGradients.length],
                }}
              />

              <div className="shop-card-body">
                <p
                  className="shop-card-copy"
                  style={{
                    textTransform: "uppercase",
                    letterSpacing: "0.08em",
                    fontSize: "0.75rem",
                    color: "rgba(0,0,0,0.5)",
                  }}
                >
                  {formatDate(post.date)}
                </p>

                <h3 className="shop-card-title">{post.title}</h3>

                <p className="shop-card-copy">{getExcerpt(post)}</p>

                <div className="shop-card-meta">
                  <Link
                    to={`/blog/${post.slug}`}
                    className="shop-card-button"
                    onClick={() =>
                      window.scrollTo({ top: 0, left: 0, behavior: "auto" })
                    }
                  >
                    Citește
                  </Link>
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
