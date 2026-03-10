import { Link } from "react-router-dom";
import { lazy } from "react";

import Container from "../../components/layout/Container";
import Button from "../../components/common/Button";

export default function LatestBlog({ posts = [], loading }) {
  if (loading)
    return (
      <div className="text-center py-24 bg-[var(--bg)] text-[var(--text-secondary)]">
        Loading blogs...
      </div>
    );

  if (!posts.length)
    return (
      <div className="text-center py-24 bg-[var(--bg)] text-[var(--text-secondary)]">
        Blog articles coming soon.
      </div>
    );

  return (
    <section className="relative py-20 md:py-24 bg-[var(--bg)] text-[var(--text)]">
      {/* Glow */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[650px] h-[650px] bg-[var(--glow-bg)] blur-[140px] rounded-full"></div>

      <Container>
        {/* Header */}
        <div className="text-center mb-16 relative z-10">
          <h2 className="text-4xl md:text-5xl font-bold text-[var(--color-primary)]">
            Latest from Our Medical Blog
          </h2>

          <p className="mt-5 text-[var(--text-secondary)] max-w-2xl mx-auto">
            Insights, prevention tips, and expert advice to keep you informed.
          </p>
        </div>

        {/* Blog Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 relative z-10">
          {posts.slice(0, 3).map((post) => (
            <Link
              key={post.id}
              to={`/blog/${post.slug}`}
              className="
              group relative
              bg-[var(--card)]
              border border-[var(--border)]
              rounded-2xl
              overflow-hidden
              transition-all duration-500
              hover:-translate-y-2
              hover:border-[var(--color-primary)]/40
              hover:shadow-[0_0_40px_var(--glow-soft)]
              flex flex-col"
            >
              {/* Image */}
              <div className="aspect-video overflow-hidden">
                <img
                  src={post.image || "/blog-placeholder.png"}
                  alt={post.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition duration-700"
                />
              </div>

              {/* Content */}
              <div className="p-6 flex flex-col flex-1">
                <p className="text-sm text-[var(--text-secondary)] mb-2">
                  {post.date}
                </p>

                <h3 className="text-xl font-semibold mb-3 group-hover:text-[var(--color-primary)] transition">
                  {post.title}
                </h3>

                <p className="text-[var(--text-secondary)] text-sm leading-relaxed line-clamp-3 flex-1">
                  {post.excerpt}
                </p>

                <span className="mt-6 text-[var(--color-primary)] font-medium">
                  Read More →
                </span>
              </div>
            </Link>
          ))}
        </div>

        {/* CTA */}
        <div className="text-center mt-14 relative z-10">
          <Link to="/blog">
            <Button variant="ghost" size="lg">
              View All Articles →
            </Button>
          </Link>
        </div>
      </Container>
    </section>
  );
}
