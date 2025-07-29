// src/app/blogs/page/[page]/page.tsx

import Link from "next/link";
import { blogApi, BlogPostSummary } from "@/lib/apiClient";
import { Badge } from "@/components/ui/badge";
import { Calendar } from "lucide-react";
import dynamic from "next/dynamic";

export const metadata = {
  title: "News Room – Winnow Management Solutions",
  description:
    "Latest News and insights on AML compliance and risk management",
};

const PAGE_SIZE = 12;

export default async function BlogsPage({
  params,
}: {
  params: { page: string };
}) {
  const pageIndex = Math.max(1, Number(params.page) || 1);

  let posts: BlogPostSummary[] = [];
  let totalCount = 0;
  let error: string | null = null;

  try {
    const response = await blogApi.getBlogPosts(pageIndex, PAGE_SIZE);
    posts = response.posts;
    totalCount = response.totalCount;
  } catch (e) {
    console.error("Failed to fetch posts:", e);
    error = "Failed to load posts. Please try again later.";
  }

  const totalPages = Math.ceil(totalCount / PAGE_SIZE);
  const BlogHeader = dynamic(() => import("../../[id]/client-components").then(mod => mod.BlogHeader), {
    ssr: false,
  });
  return (
    <div className="min-h-fit bg-gray-50 dark:bg-gray-900">
      {/* Hero Section */}
      <BlogHeader />
      <section className="max-w-6xl mx-auto py-12 px-4">
        {error && (
          <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-8">
            {error}
          </div>
        )}

        {!error && posts.length === 0 && (
          <div className="text-center py-12">
            <p className="text-xl text-gray-600 dark:text-gray-400">
              No articles available at the moment.
            </p>
          </div>
        )}

        {posts.length > 0 && (
          <>
            <div className="mb-8">
              <p className="text-gray-600 dark:text-gray-400">
                Showing {posts.length} of {totalCount} posts
              </p>
            </div>

            <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
              {posts.map((post) => (
                <Link
                  key={post.blogPostId}
                  href={`/news/${post.blogPostId}`}
                  className="group block"
                  aria-label={`View post titled ${post.title}`}
                >
                  <article className=" relative flex flex-col h-full rounded-lg border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 shadow-md hover:shadow-xl transition-shadow duration-300 p-6 cursor-pointer">
                    {/* Accent bar on the left */}
                    <div className="absolute -left-px top-0 h-full w-1 rounded-l-lg bg-winnowred opacity-90" />

                    <header className="mb-4">
                      <h3 className="text-2xl font-semibold leading-snug text-gray-900 dark:text-gray-100 group-hover:text-winnowred transition-colors duration-300 line-clamp-2">
                        {post.title}
                      </h3>
                    </header>

                    {post.summary && post.summary !== "None" && (
                      <p className="text-gray-600 dark:text-gray-400 italic mb-6 line-clamp-3 text-sm leading-relaxed">
                        {post.summary}
                      </p>
                    )}

                    <div className="mt-auto flex justify-between items-center text-sm text-gray-500 dark:text-gray-400 mb-4">
                      <time
                        dateTime={post.createdDate}
                        className="flex items-center gap-1"
                      >
                        <Calendar className="w-4 h-4" />
                        {new Date(post.createdDate).toLocaleDateString(
                          "en-US",
                          {
                            year: "numeric",
                            month: "long",
                            day: "numeric",
                          }
                        )}
                      </time>
                    </div>

                    {/* Tags aligned at bottom */}
                    {post.tags && (
                      <div className="flex flex-wrap gap-2 mt-auto pt-2 border-t border-gray-100 dark:border-gray-700">
                        {post.tags
                          .split(",")
                          .slice(0, 3)
                          .map((tag, index) => (
                            <Badge
                              key={index}
                              variant="secondary"
                              className="rounded-full px-3 py-1 text-xs font-medium hover:bg-winnowred/20 hover:text-winnowred transition"
                            >
                              {tag.trim()}
                            </Badge>
                          ))}

                        {post.tags.split(",").length > 3 && (
                          <Badge
                            variant="secondary"
                            className="rounded-full px-3 py-1 text-xs font-medium hover:bg-winnowred/20 hover:text-winnowred transition"
                          >
                            +{post.tags.split(",").length - 3} more
                          </Badge>
                        )}
                      </div>
                    )}
                  </article>
                </Link>
              ))}
            </div>

            {/* Pagination Controls */}
            <nav
              aria-label="Pagination"
              className="flex justify-center mt-12 gap-2 flex-wrap"
            >
              <Link
                href={`/blogs/page/${pageIndex - 1}`}
                aria-disabled={pageIndex === 1}
                tabIndex={pageIndex === 1 ? -1 : 0}
                className={`px-4 py-2 rounded border ${
                  pageIndex === 1
                    ? "bg-gray-200 text-gray-400 dark:bg-gray-700 dark:text-gray-400 pointer-events-none"
                    : "bg-white hover:bg-gray-100 dark:bg-gray-800 dark:hover:bg-gray-700 text-gray-600 dark:text-gray-300"
                }`}
              >
                Previous
              </Link>

              {[...Array(totalPages)].map((_, i) => {
                const page = i + 1;
                const isActive = page === pageIndex;
                return (
                  <Link
                    key={page}
                    href={`/blogs/page/${page}`}
                    aria-current={isActive ? "page" : undefined}
                    className={`mx-1 px-4 py-2 rounded ${
                      isActive
                        ? "bg-winnowred text-white font-bold dark:bg-winnowred dark:text-white"
                        : "bg-white hover:bg-gray-100 dark:bg-gray-800 dark:hover:bg-gray-700 text-gray-600 dark:text-gray-300"
                    }`}
                  >
                    {page}
                  </Link>
                );
              })}

              <Link
                href={`/blogs/page/${pageIndex + 1}`}
                aria-disabled={pageIndex >= totalPages}
                tabIndex={pageIndex >= totalPages ? -1 : 0}
                className={`px-4 py-2 rounded border ${
                  pageIndex >= totalPages
                    ? "bg-gray-200 text-gray-400 dark:bg-gray-700 dark:text-gray-400 pointer-events-none"
                    : "bg-white hover:bg-gray-100 dark:bg-gray-800 dark:hover:bg-gray-700 text-gray-600 dark:text-gray-300"
                }`}
              >
                Next
              </Link>
            </nav>
          </>
        )}
      </section>
    </div>
  );
}
