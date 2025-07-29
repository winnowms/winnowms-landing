import axios from "axios";

const BASE_URL = "https://winnowms-backend.azurewebsites.net/api";

// Create axios instance
const apiClient = axios.create({
  baseURL: BASE_URL,
  timeout: 10000,
  headers: {
    "Content-Type": "application/json",
  },
});

// Types for blog data
export type BlogPostSummary = {
  blogPostId: number;
  title: string;
  summary?: string;
  createdDate: string;
  status: number; // Draft=0, Active=1, Archived=2
  tags?: string;
};

export type BlogPostDetail = {
  blogPostId: number;
  title: string;
  body: string;
  createdDate: string;
  lastUpdated?: string;
  status: number;
  tags?: string;
  files: { filename: string; fileBinary: string }[];
  summary?: string;
  createdBy: string;
};

export type BlogListResponse = {
  totalCount: number;
  page: number;
  pageSize: number;
  posts: BlogPostSummary[];
};

// API functions
export const blogApi = {
  // Get all blog posts (only active ones for public viewing)
  async getBlogPosts(
    page: number = 1,
    pageSize: number = 20
  ): Promise<BlogListResponse> {
    const response = await apiClient.get(`/BlogPost/tenant-posts`, {
      params: {
        page,
        pageSize,
        status: 1, // Only active posts
      },
    });
    console.log(response.data);
    return response.data;
  },

  // Get single blog post by ID
  async getBlogPost(id: number): Promise<BlogPostDetail> {
    const response = await apiClient.get(`/BlogPost/${id}`);
    return response.data;
  },
};
