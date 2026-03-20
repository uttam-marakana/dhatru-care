import {
  fetchBlogs,
  fetchBlogBySlug,
  insertBlog,
  modifyBlog,
  removeBlog,
} from "../services/blogService";

/* --- FETCH Blogs ----------- */

export const getBlogPosts = (filters) => fetchBlogs(filters);

/* --- FETCH BY SLUG ----------- */

export const getBlogBySlug = (slug) => fetchBlogBySlug(slug);

/* --- CREATE ----------- */

export const createBlogPost = (data) => insertBlog(data);

/* --- UPDATE ----------- */

export const updateBlogPost = (id, data) => modifyBlog(id, data);

/* --- DELETE ----------- */

export const deleteBlogPost = (id) => removeBlog(id);

