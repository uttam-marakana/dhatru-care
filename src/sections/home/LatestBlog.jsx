import { Link } from "react-router-dom";
import { lazy } from "react";

const Container = lazy(() => import("../../components/layout/Container"));
const Button = lazy(() => import("../../components/common/Button"));

export default function LatestBlog({ posts = [], loading }) {
  if (loading)
    return (
      <div className="text-center py-24 text-gray-400 bg-gray-950">
        Loading blogs...
      </div>
    );

  if (!posts.length)
    return (
      <div className="text-center py-24 text-gray-400 bg-gray-950">
        Blog articles coming soon.
      </div>
    );

  return (
    <section className="relative py-20 md:py-24 bg-gradient-to-b from-gray-950 via-gray-900 to-gray-950 text-white overflow-hidden">
      {/* Blue Glow Aura (same as other sections) */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[650px] h-[650px] bg-blue-600/20 blur-[140px] rounded-full"></div>

      <Container>
        {/* Header */}
        <div className="text-center mb-16 relative z-10">
          <h2 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-blue-400 to-blue-300 bg-clip-text text-transparent">
            Latest from Our Medical Blog
          </h2>

          <p className="mt-5 text-gray-400 max-w-2xl mx-auto">
            Insights, prevention tips, and expert advice to keep you informed.
          </p>
        </div>

        {/* Blog Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 relative z-10">
          {posts.slice(0, 3).map((post) => (
            <Link
              key={post.id}
              to={`/blog/${post.slug}`}
              className="group relative bg-white/5 backdrop-blur-md border border-white/10 rounded-2xl overflow-hidden transition-all duration-500 hover:-translate-y-2 hover:border-blue-400/40 hover:shadow-[0_0_40px_rgba(59,130,246,0.25)] flex flex-col"
            >
              {/* Top Accent Line */}
              <div className="absolute top-0 left-0 w-full h-[2px] bg-gradient-to-r from-transparent via-blue-400/60 to-transparent opacity-0 group-hover:opacity-100 transition duration-500"></div>

              {/* Image */}
              <div className="relative aspect-video overflow-hidden">
                <img
                  src={post.image || "/blog-placeholder.jpg"}
                  alt={post.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition duration-700"
                />

                {post.category && (
                  <span className="absolute top-4 left-4 bg-blue-600 text-white text-xs px-3 py-1 rounded-full shadow-lg shadow-blue-500/30">
                    {post.category}
                  </span>
                )}
              </div>

              {/* Content */}
              <div className="p-6 flex flex-col flex-1">
                <p className="text-sm text-gray-500 mb-2">{post.date}</p>

                <h3 className="text-xl font-semibold mb-3 group-hover:text-blue-400 transition-colors">
                  {post.title}
                </h3>

                <p className="text-gray-400 text-sm leading-relaxed line-clamp-3 flex-1">
                  {post.excerpt}
                </p>

                <span className="mt-6 text-blue-400 font-medium">
                  Read More →
                </span>
              </div>
            </Link>
          ))}
        </div>

        {/* CTA */}
        <div className="text-center mt-14 relative z-10">
          <Link to="/blog">
            <Button
              variant="ghost"
              size="lg"
              className="text-blue-400 hover:text-white"
            >
              View All Articles →
            </Button>
          </Link>
        </div>
      </Container>
    </section>
  );
}
