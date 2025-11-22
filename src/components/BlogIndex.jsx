import { getAllPosts } from "../utils/getPosts";
import { Link } from "react-router-dom";

export default function BlogIndex() {
  const posts = getAllPosts()
    .sort((a, b) => new Date(b.date) - new Date(a.date)); // newest first

  return (
    <div className="max-w-3xl mx-auto py-10">
      <h1>LittleLoop Blog</h1>

      <div>
        {posts.map((post) => (
          <article key={post.slug}>
            <h2 className="text-2xl font-bold">
              <Link to={`/blog/${post.slug}`}>{post.title}</Link>
            </h2>

            <p className="text-gray-600 text-sm">
              {new Date(post.date).toLocaleDateString("ro-RO")}
            </p>

            {post.tags && <p>{post.tags.join(" • ")}</p>}
          </article>
        ))}
      </div>
    </div>
  );
}
