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
    <section className="py-12 md:py-16">
      <Container>
        <h2 className="text-3xl font-bold text-center mb-10">{title}</h2>

        <div className="grid md:grid-cols-3 gap-6">
          {blogs.map((post) => (
            <Link key={post.id} to={`/blog/${post.slug}`}>
              <Card hover className="h-full overflow-hidden">
                <div className="aspect-video bg-gray-200 dark:bg-gray-800" />

                <div className="p-5">
                  <h3 className="font-bold text-lg mb-2 line-clamp-2">
                    {post.title}
                  </h3>

                  <p className="text-sm text-gray-600 dark:text-gray-400 line-clamp-3">
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
