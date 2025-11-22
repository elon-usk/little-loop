import { getAllPosts } from "../utils/getPosts";
import { useParams } from "react-router-dom";
import CustomCTA from "./CustomCTA.jsx";

export default function BlogPost() {
  const { slug } = useParams();
  const posts = getAllPosts();

  const post = posts.find((p) => p.slug === slug);

  if (!post) return <p>404 – Article not found.</p>;

  const PostComponent = post.component;
  return (
    <article className="prose mx-auto py-10">
      <h1>{post.title}</h1>
      <p className="text-gray-600">
        {new Date(post.date).toLocaleDateString("ro-RO")}
      </p>

      {post.tags && (
        <p className="text-blue-600">{post.tags.join(" • ")}</p>
      )}

      <PostComponent />

      <CustomCTA />
    </article>
  );
}
