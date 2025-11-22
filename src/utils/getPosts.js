export function getAllPosts() {
  const modules = import.meta.glob("../content/*.mdx", { eager: true });

  return Object.entries(modules).map(([path, mod]) => {
    const frontmatter =
      mod.frontmatter || mod.metadata || mod.attributes || {};
    const fallbackSlug = path.split("/").pop().replace(/\.mdx$/, "");

    return {
      slug: frontmatter.slug || fallbackSlug,
      date: frontmatter.date || new Date().toISOString(),
      ...frontmatter,
      component: mod.default,
    };
  });
}
