import { notFound } from "next/navigation";
import { blogApi, BlogPostDetail } from "@/lib/apiClient";
import {
  Calendar,
  Download,
  FileText,
  Image as ImageIcon,
  User,
} from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import {
  ShareButton,
  BackToBlogButton,
  ViewMoreButton,
} from "./client-components";

interface BlogDetailPageProps {
  params: {
    id: string;
  };
}

// Generate metadata for SEO
export async function generateMetadata({ params }: BlogDetailPageProps) {
  try {
    const post = await blogApi.getBlogPost(parseInt(params.id));
    return {
      title: `${post.title} - Winnow Management Solutions`,
      description: post.summary || post.title.substring(0, 160),
      openGraph: {
        title: post.title,
        description: post.summary || post.title,
        type: "article",
        publishedTime: post.createdDate,
        modifiedTime: post.lastUpdated || post.createdDate,
        tags: post.tags?.split(",").map((tag) => tag.trim()),
      },
      twitter: {
        card: "summary_large_image",
        title: post.title,
        description: post.summary || post.title,
      },
    };
  } catch {
    return {
      title: "Blog Post Not Found - Winnow Management Solutions",
    };
  }
}

// Helper function to determine if a file is an image
const isImageFile = (filename: string): boolean => {
  const imageExtensions = [".jpg", ".jpeg", ".png", ".gif", ".webp", ".svg"];
  return imageExtensions.some((ext) => filename.toLowerCase().endsWith(ext));
};

// Helper function to get file icon
const getFileIcon = (filename: string) => {
  if (isImageFile(filename)) {
    return <ImageIcon className="w-5 h-5" />;
  }
  return <FileText className="w-5 h-5" />;
};

// Function to process HTML content and handle line breaks
const processHtmlContent = (htmlContent: string): string => {
  // Convert \n to <br> tags for proper line break rendering
  let processedContent = htmlContent.replace(/\n/g, "<br>");

  // Ensure proper paragraph spacing
  processedContent = processedContent.replace(/(<br>\s*){2,}/g, "</p><p>");

  // Wrap content in paragraph if it doesn't start with a block element
  if (!processedContent.trim().startsWith("<")) {
    processedContent = `<p>${processedContent}</p>`;
  }

  return processedContent;
};

export default async function BlogDetailPage({ params }: BlogDetailPageProps) {
  let post: BlogPostDetail | null = null;

  try {
    post = await blogApi.getBlogPost(parseInt(params.id));
  } catch (error) {
    console.error("Failed to fetch blog post:", error);
    notFound();
  }

  if (!post) {
    notFound();
  }

  const imageFiles =
    post.files?.filter((file) => isImageFile(file.filename)) || [];
  const otherFiles =
    post.files?.filter((file) => !isImageFile(file.filename)) || [];

  // Process the HTML content
  const processedContent = processHtmlContent(post.body);

  return (
    <div className="min-h-fit bg-gray-50 dark:bg-gray-900">
      {/* Navigation */}
      <div className="bg-white dark:bg-gray-800 border-b shadow-sm">
        <div className="max-w-7xl mx-auto px-4 py-4">
          <BackToBlogButton />
        </div>
      </div>

      {/* Article */}
      <article className="max-w-5xl mx-auto py-12 px-4">
        {/* Header */}
        <header className="mb-12">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 dark:text-white mb-6 leading-tight">
            {post.title}
          </h1>

          {/* Meta Information */}
          <div className="flex flex-wrap items-center gap-6 text-gray-600 dark:text-gray-400 mb-8 pb-6 border-b border-gray-200 dark:border-gray-700">
            <div className="flex items-center gap-2">
              <Calendar className="w-5 h-5" />
              <time dateTime={post.createdDate} className="font-medium">
                {new Date(post.createdDate).toLocaleDateString("en-US", {
                  year: "numeric",
                  month: "long",
                  day: "numeric",
                })}
              </time>
            </div>

            {post.lastUpdated && (
              <div className="flex items-center gap-2 text-sm">
                <span className="text-gray-500">•</span>
                <span>
                  Updated:{" "}
                  {new Date(post.lastUpdated).toLocaleDateString("en-US", {
                    year: "numeric",
                    month: "short",
                    day: "numeric",
                  })}
                </span>
              </div>
            )}

            {post.createdBy && (
              <div className="flex items-center gap-2">
                <User className="w-4 h-4" />
                <span className="text-sm">By Admin</span>
              </div>
            )}
          </div>

          {/* Tags */}
          {post.tags && (
            <div className="flex flex-wrap gap-2 mb-8">
              {post.tags.split(",").map((tag, index) => (
                <Badge
                  key={index}
                  variant="secondary"
                  className="bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200 hover:bg-blue-200 dark:hover:bg-blue-800 transition-colors"
                >
                  {tag.trim()}
                </Badge>
              ))}
            </div>
          )}

          {/* Summary */}
          {post.summary && post.summary !== "None" && (
            <div className="bg-gradient-to-r from-blue-50 to-indigo-50 dark:from-blue-900/20 dark:to-indigo-900/20 border-l-4 border-blue-500 p-6 mb-8 rounded-r-lg">
              <p className="text-lg text-gray-700 dark:text-gray-300 italic leading-relaxed">
                {post.summary}
              </p>
            </div>
          )}
        </header>

        {/* Image Gallery - Display images at the top if they exist */}
        {imageFiles.length > 0 && (
          <section className="mb-12">
            <div className="grid gap-6">
              {imageFiles.map((file, index) => (
                <div key={index} className="relative group">
                  <div className="relative aspect-video w-full overflow-hidden rounded-lg bg-gray-100 dark:bg-gray-800">
                    <Image
                      src={file.fileBinary}
                      alt={file.filename}
                      fill
                      className="object-cover transition-transform duration-300 group-hover:scale-105"
                      sizes="(max-width: 768px) 100vw, (max-width: 1200px) 80vw, 60vw"
                      priority={index === 0}
                    />
                    <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-20 transition-all duration-300" />
                  </div>

                  <a
                    href={file.fileBinary}
                    download={file.filename}
                    className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                  >
                    <Button size="sm" variant="secondary" className="gap-1">
                      <Download className="w-3 h-3" />
                      Download
                    </Button>
                  </a>
                </div>
              ))}
            </div>
          </section>
        )}

        {/* Enhanced Content with better HTML rendering */}
        <div className="mb-12">
          <div
            className="prose prose-lg dark:prose-invert max-w-none
              /* Base typography */
              prose-headings:text-gray-900 dark:prose-headings:text-white
              prose-headings:font-bold prose-headings:tracking-tight
              prose-headings:mt-8 prose-headings:mb-4
              
              /* Heading sizes */
              prose-h1:text-4xl prose-h1:mt-0 prose-h1:mb-6
              prose-h2:text-3xl prose-h2:mt-12 prose-h2:mb-6 
              prose-h2:border-b prose-h2:border-gray-200 dark:prose-h2:border-gray-700 prose-h2:pb-2
              prose-h3:text-2xl prose-h3:mt-8 prose-h3:mb-4
              prose-h4:text-xl prose-h4:mt-6 prose-h4:mb-3
              prose-h5:text-lg prose-h5:mt-6 prose-h5:mb-3
              prose-h6:text-base prose-h6:mt-6 prose-h6:mb-3
              
              /* Paragraph and text */
              prose-p:text-gray-700 dark:prose-p:text-gray-300 
              prose-p:leading-relaxed prose-p:mb-6
              prose-p:text-base prose-p:font-normal
              
              /* Text formatting */
              prose-strong:text-gray-900 dark:prose-strong:text-white prose-strong:font-semibold
              prose-em:text-gray-800 dark:prose-em:text-gray-200 prose-em:italic
              
              /* Links */
              prose-a:text-blue-600 dark:prose-a:text-blue-400 
              prose-a:no-underline hover:prose-a:underline 
              prose-a:font-medium prose-a:transition-colors
              
              /* Blockquotes */
              prose-blockquote:border-l-4 prose-blockquote:border-gray-300 dark:prose-blockquote:border-gray-600
              prose-blockquote:bg-gray-50 dark:prose-blockquote:bg-gray-800 
              prose-blockquote:py-4 prose-blockquote:px-6 prose-blockquote:rounded-r-lg
              prose-blockquote:italic prose-blockquote:text-gray-700 dark:prose-blockquote:text-gray-300
              
              /* Lists */
              prose-ul:my-6 prose-ol:my-6
              prose-li:text-gray-700 dark:prose-li:text-gray-300 prose-li:mb-2
              prose-li:leading-relaxed
              
              /* Code */
              prose-code:bg-gray-100 dark:prose-code:bg-gray-800 
              prose-code:px-2 prose-code:py-1 prose-code:rounded 
              prose-code:text-sm prose-code:font-mono
              prose-code:before:content-none prose-code:after:content-none
              
              /* Code blocks */
              prose-pre:bg-gray-900 dark:prose-pre:bg-gray-800 
              prose-pre:overflow-x-auto prose-pre:rounded-lg
              prose-pre:p-4 prose-pre:text-sm
              
              /* Images in content */
              prose-img:rounded-lg prose-img:shadow-lg 
              prose-img:w-full prose-img:h-auto
              prose-img:my-8
              
              /* Horizontal rules */
              prose-hr:my-12 prose-hr:border-gray-300 dark:prose-hr:border-gray-600
              
              /* Tables */
              prose-table:w-full prose-table:border-collapse prose-table:my-8
              prose-th:bg-gray-50 dark:prose-th:bg-gray-800 
              prose-th:p-3 prose-th:border prose-th:border-gray-300 dark:prose-th:border-gray-600
              prose-th:text-left prose-th:font-semibold
              prose-td:p-3 prose-td:border prose-td:border-gray-300 dark:prose-td:border-gray-600
              
              /* Custom line break styling */
              [&_br]:block [&_br]:my-2"
            dangerouslySetInnerHTML={{ __html: processedContent }}
          />
        </div>

        {/* File Attachments - Display non-image files */}
        {otherFiles.length > 0 && (
          <section className="mt-12 p-6 bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 shadow-sm">
            <h3 className="text-xl font-semibold mb-4 text-gray-900 dark:text-white flex items-center gap-2">
              <FileText className="w-5 h-5" />
              File Attachments
            </h3>
            <div className="space-y-3">
              {otherFiles.map((file, index) => (
                <div
                  key={index}
                  className="flex items-center justify-between p-3 bg-gray-50 dark:bg-gray-700 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-600 transition-colors group"
                >
                  <div className="flex items-center gap-3">
                    {getFileIcon(file.filename)}
                    <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
                      {file.filename}
                    </span>
                  </div>
                  <a
                    href={file.fileBinary}
                    target="_blank"
                    rel="noopener noreferrer"
                    download={file.filename}
                    className="opacity-70 group-hover:opacity-100 transition-opacity"
                  >
                    <Button size="sm" variant="outline" className="gap-2">
                      <Download className="w-4 h-4" />
                      Download
                    </Button>
                  </a>
                </div>
              ))}
            </div>
          </section>
        )}

        {/* Share Section */}
        <section className="mt-16 pt-8 border-t border-gray-200 dark:border-gray-700">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div className="flex items-center gap-4">
              <span className="text-sm font-medium text-gray-600 dark:text-gray-400">
                Share this article:
              </span>
              <div className="flex gap-2">
                <ShareButton
                  title={post.title}
                  summary={
                    post.summary && post.summary !== "None"
                      ? post.summary
                      : undefined
                  }
                />
              </div>
            </div>
            <ViewMoreButton />
          </div>
        </section>
      </article>
    </div>
  );
}
