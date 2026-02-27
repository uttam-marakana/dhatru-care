import Container from "../../components/layout/Container";
import Card from "../../components/common/Card";
import Button from "../../components/common/Button";

const posts = [
  {
    title: "How to Prevent Heart Disease in Your 40s",
    date: "Feb 15, 2025",
    excerpt: "Simple lifestyle changes that make a big difference...",
  },
  {
    title: "Understanding Diabetes: Early Signs & Management",
    date: "Feb 10, 2025",
    excerpt: "Expert tips from our endocrinology team...",
  },
  {
    title: "Knee Replacement – What to Expect Before & After",
    date: "Feb 5, 2025",
    excerpt: "Patient journey and recovery guide...",
  },
];

export default function LatestBlog({ fullBlogPage = false }) {
  return (
    <section className="py-16 md:py-24 bg-gray-50 dark:bg-gray-950/50">
      <Container>
        <div className="flex flex-col md:flex-row justify-between items-center mb-12 md:mb-16 gap-6">
          <div>
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 dark:text-white">
              Latest Health Insights
            </h2>
            <p className="text-lg md:text-xl text-gray-600 dark:text-gray-400 mt-3">
              Expert articles, tips and updates from our medical team
            </p>
          </div>
          {!fullBlogPage && (
            <Button variant="outline" size="lg">
              View All Posts →
            </Button>
          )}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8">
          {posts.map((post, index) => (
            <Card key={index} hover className="overflow-hidden">
              <div className="aspect-video bg-gray-200 dark:bg-gray-800 mb-5" />
              <div className="p-6">
                <time className="text-sm text-gray-500 dark:text-gray-400 block mb-2">
                  {post.date}
                </time>
                <h3 className="text-xl font-bold mb-3 group-hover:text-primary transition-colors">
                  {post.title}
                </h3>
                <p className="text-gray-600 dark:text-gray-400 mb-5 line-clamp-3">
                  {post.excerpt}
                </p>
                <Button variant="ghost" size="sm">
                  Read More →
                </Button>
              </div>
            </Card>
          ))}
        </div>
      </Container>
    </section>
  );
}
