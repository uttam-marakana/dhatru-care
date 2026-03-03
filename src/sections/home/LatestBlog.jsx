import { Link } from "react-router-dom";
import { lazy } from "react";

const Container = lazy(() => import("../../components/layout/Container"));
const Card = lazy(() => import("../../components/common/Card"));

export default function LatestBlog({ posts = [], loading }) {
  if (loading) return <div className="text-center py-20">Loading blogs...</div>;

  if (!posts.length)
    return <div className="text-center py-20">No blog posts.</div>;

  return (
    <section className="py-12 md:py-16 lg:py-20">
      {!loading && posts.length === 0 && (
        <p className="col-span-full text-center">Blog articles coming soon.</p>
      )}
      <Container>
        <div className="text-center mb-10 md:mb-14">
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold">
            Latest from Our Blog
          </h2>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {posts.slice(0, 3).map((post) => (
            <Link key={post.id} to={`/blog/${post.slug}`}>
              <Card hover className="overflow-hidden h-full">
                <div className="aspect-video bg-gray-200 dark:bg-gray-800" />
                <div className="p-5">
                  <h3 className="text-lg font-bold mb-2">{post.title}</h3>
                  <p className="text-gray-600 dark:text-gray-400 line-clamp-3">
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
