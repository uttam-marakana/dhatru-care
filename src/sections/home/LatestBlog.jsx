import { Link } from "react-router-dom";
import { lazy } from "react";

const Container = lazy(() => import("../../components/layout/Container"));
const Card = lazy(() => import("../../components/common/Card"));

export default function LatestBlog({ posts = [], loading }) {
  if (loading) return <div className="text-center py-20">Loading blogs...</div>;

  return (
    <section className="py-16">
      <Container>
        <div className="grid md:grid-cols-3 gap-6">
          {posts.map((post) => (
            <Link key={post.id} to={`/blog/${post.slug}`}>
              <Card hover className="overflow-hidden">
                <div className="aspect-video bg-gray-200 dark:bg-gray-800" />

                <div className="p-6">
                  <h3 className="text-xl font-bold mb-3">{post.title}</h3>
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
