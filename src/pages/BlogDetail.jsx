import { useParams, Link } from "react-router-dom";
import { FaArrowLeft, FaCalendarAlt, FaUser } from "react-icons/fa";
import { useState, useEffect, lazy } from "react";
import { getBlogBySlug } from "../api/blogsApi";

const Container = lazy(() => import("../components/layout/Container"));
const AppointmentCTA = lazy(() => import("../sections/shared/AppointmentCTA"));
const Breadcrumb = lazy(() => import("../components/common/Breadcrumb"));

export default function BlogDetail() {
  const { slug } = useParams();

  const [post, setPost] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let mounted = true;

    const fetchPost = async () => {
      const data = await getBlogBySlug(slug);
      if (mounted) {
        setPost(data);
        setLoading(false);
      }
    };

    fetchPost();

    return () => (mounted = false);
  }, [slug]);

  if (loading)
    return (
      <div
        className="
        min-h-screen flex items-center justify-center
        bg-[var(--bg)]
        text-[var(--text-secondary)]
        "
      >
        Loading...
      </div>
    );

  if (!post)
    return (
      <div
        className="
        min-h-screen flex items-center justify-center
        bg-[var(--bg)]
        text-[var(--text-secondary)]
        "
      >
        Post not found
      </div>
    );

  return (
    <article
      className="
      min-h-screen
      bg-[var(--bg)]
      "
    >
      <Breadcrumb
        items={[
          { label: "Home", path: "/" },
          { label: "Blog", path: "/blog" },
          { label: post.title },
        ]}
      />

      <div className="bg-black h-64 md:h-96">
        <img
          src={post.image || "https://via.placeholder.com/1200x600"}
          alt={post.title}
          className="w-full h-full object-cover opacity-80"
        />
      </div>

      <Container className="py-12 md:py-20 max-w-4xl mx-auto">
        <Link
          to="/blog"
          className="
          inline-flex items-center gap-2
          text-[var(--color-primary)]
          mb-8
          "
        >
          <FaArrowLeft /> Back to Blog
        </Link>

        <h1
          className="
          text-4xl font-bold
          text-[var(--text)]
          mb-6
          "
        >
          {post.title}
        </h1>

        <div
          className="
          flex gap-6 mb-10
          text-[var(--text-secondary)]
          "
        >
          <span className="flex items-center gap-2">
            <FaCalendarAlt /> {post.date}
          </span>

          <span className="flex items-center gap-2">
            <FaUser /> {post.author}
          </span>
        </div>

        <div className="prose dark:prose-invert max-w-none">{post.content}</div>
      </Container>

      <AppointmentCTA variant="large" className="my-16" />
    </article>
  );
}
