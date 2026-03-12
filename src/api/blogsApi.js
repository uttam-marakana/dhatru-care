import {
  fetchBlogs,
  fetchBlogBySlug,
  insertBlog,
  modifyBlog,
  removeBlog,
} from "../services/blogService";

export const getBlogPosts = (filters) => fetchBlogs(filters);

export const getBlogBySlug = (slug) => fetchBlogBySlug(slug);

export const createBlogPost = (data) => insertBlog(data);

export const updateBlogPost = (id, data) => modifyBlog(id, data);

export const deleteBlogPost = (id) => removeBlog(id);
