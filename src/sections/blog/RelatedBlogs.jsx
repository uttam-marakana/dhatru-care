import { useEffect, useState, lazy } from "react";
import { Link } from "react-router-dom";
import { getRelatedBlogs } from "../../api/blogsApi";

const Container = lazy(() => import("../../components/layout/Container"));
const Card = lazy(() => import("../../components/common/Card"));

export default function RelatedBlogs({
  category,
  tags = [],
  title = "Related Articles",
}) {
  const [blogs, setBlogs] = useState([]);

  useEffect(() => {
    let mounted = true;

    const fetchBlogs = async () => {
      const data = await getRelatedBlogs({
        category,
        tags,
        limit: 3,
      });

      if (mounted) setBlogs(data);
    };

    fetchBlogs();

    return () => (mounted = false);
  }, [category, tags]);

  if (!blogs.length) return null;

  return (
    <section className="py-12 md:py-16 bg-(--surface)">
      {" "}
      <Container>
        <h2 className="text-2xl md:text-3xl font-bold text-center mb-10 text-(--text)">
          {title}
        </h2>

        <div
          className="
    grid
    grid-cols-1
    sm:grid-cols-2
    lg:grid-cols-3
    gap-6
    "
        >
          {blogs.map((post) => (
            <Link key={post.id} to={`/blog/${post.slug}`}>
              <Card
                hover
                className="
            h-full overflow-hidden
            bg-(--card)
            border border-(--border)
            transition-all duration-300
            hover:border-[var(--color-primary)]/40
            hover:shadow-[0_0_40px_var(--glow-soft)]
            "
              >
                <div className="aspect-video bg-(--surface)" />

                <div className="p-5">
                  <h3
                    className="
              font-semibold
              text-lg
              mb-2
              line-clamp-2
              text-(--text)
              "
                  >
                    {post.title}
                  </h3>

                  <p
                    className="
              text-sm
              text-[var(--text-secondary)]
              line-clamp-3
              "
                  >
                    {post.excerpt}
                  </p>
                </div>
              </Card>
            </Link>
          ))}
        </div>
      </Container>
    </section>
  );
}
