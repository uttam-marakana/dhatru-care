// src/pages/BlogDetail.jsx
import { useParams } from "react-router-dom";
import Container from "../components/layout/Container";
import Button from "../components/common/Button";
import { FaArrowLeft, FaCalendarAlt, FaUser } from "react-icons/fa";
import { Link } from "react-router-dom";
import { useState, useEffect } from "react";

// Demo data – in real app fetch by id/slug
const demoPost = {
  id: "1",
  title: "How to Prevent Heart Disease in Your 40s",
  date: "February 15, 2025",
  author: "Dr. Rajesh Patel",
  readTime: "8 min",
  content: "Detailed blog post content here...",
  imagePlaceholder: "https://via.placeholder.com/1200x600?text=Heart+Health",
};

export default function BlogDetail() {
  const { id } = useParams();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setIsLoading(false), 800);
    return () => clearTimeout(timer);
  }, [id]);

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-50 dark:bg-gray-950 animate-pulse">
        <div className="bg-gray-200 dark:bg-gray-800 h-64 md:h-96" />
        <Container className="py-12 md:py-20">
          <div className="max-w-4xl mx-auto space-y-8">
            <div className="h-12 w-3/4 bg-gray-300 dark:bg-gray-700 rounded" />
            <div className="flex gap-6">
              <div className="h-6 w-32 bg-gray-300 dark:bg-gray-700 rounded" />
              <div className="h-6 w-40 bg-gray-300 dark:bg-gray-700 rounded" />
            </div>
            <div className="space-y-4">
              <div className="h-6 w-full bg-gray-300 dark:bg-gray-700 rounded" />
              <div className="h-6 w-full bg-gray-300 dark:bg-gray-700 rounded" />
              <div className="h-6 w-5/6 bg-gray-300 dark:bg-gray-700 rounded" />
            </div>
          </div>
        </Container>
      </div>
    );
  }

  return (
    <article className="min-h-screen bg-gray-50 dark:bg-gray-950">
      <div className="bg-gray-900 h-64 md:h-96 relative">
        <img
          src={demoPost.imagePlaceholder}
          alt={demoPost.title}
          className="w-full h-full object-cover opacity-80"
        />
      </div>

      <Container className="py-12 md:py-20 max-w-4xl mx-auto">
        <Link
          to="/blog"
          className="inline-flex items-center gap-2 text-primary hover:underline mb-8"
        >
          <FaArrowLeft /> Back to Blog
        </Link>

        <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-6 text-gray-900 dark:text-white">
          {demoPost.title}
        </h1>

        <div className="flex flex-wrap items-center gap-6 text-gray-600 dark:text-gray-400 mb-10">
          <div className="flex items-center gap-2">
            <FaCalendarAlt />
            <time>{demoPost.date}</time>
          </div>
          <div className="flex items-center gap-2">
            <FaUser />
            <span>{demoPost.author}</span>
          </div>
          <span>{demoPost.readTime} read</span>
        </div>

        <div className="prose dark:prose-invert prose-lg max-w-none">
          <p>{demoPost.content}</p>
          {/* Add full rich content here */}
        </div>
      </Container>

      <AppointmentCTA variant="large" className="my-12 md:my-16 lg:my-20" />
    </article>
  );
}
