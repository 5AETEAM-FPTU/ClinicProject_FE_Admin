'use client';
import { blogEndpoints } from "@/settings/endpoints";
import { formServiceBaseApi } from "./formServiceBase";
// Define types for category-related operations
export interface Category {
    id?: string; // For updates or deletes, ID may be optional
    name: string;
    status: 0 | 1 | 2; // 0: Deleted, 1: Inactive, 2: Active
    parent_id?: string | null;
    description?: string | null;
    position: number;
    meta_title?: string | null;
    meta_description?: string | null;
    meta_keyword?: string | null;
}

// Define types for post-related operations
export interface Post {
    id?: string;
    title: string;
    content: string;
    slug: string;
    category: string; // Category ID or slug
    status: 0 | 1 | 2; // 0: Deleted, 1: Inactive, 2: Active
    meta_title?: string | null;
    meta_description?: string | null;
    meta_keyword?: string | null;
}


export const blogApis = formServiceBaseApi.injectEndpoints({
    endpoints: (build) => ({
        // Fetch all categories
        getAllCategories: build.query<any, void>({
            query: () => ({
                url: blogEndpoints.GET_ALL_CATEGORY,
                method: 'GET',
            }),
        }),

        getAllActiveCategories: build.query<any, void>({
            query: () => ({
                url: blogEndpoints.GET_ALL_ACTIVE_CATEGORY,
                method: 'GET',
            }),
        }),

        // Create a new category
        createCategory: build.mutation<any, Category>({
            query: (categoryData) => ({
                url: blogEndpoints.CREATE_CATEGORY,
                method: 'POST',
                body: categoryData,
            }),
        }),

        // Update an existing category
        updateCategory: build.mutation<any, Category>({
            query: (categoryData) => ({
                url: blogEndpoints.UPDATE_CATEGORY,
                method: 'PATCH',
                body: categoryData,
            }),
        }),

        // Delete a category by ID
        deleteCategory: build.mutation<any, string>({
            query: (id) => ({
                url: blogEndpoints.DELETE_CATEGORY.replace('{:id}', id),
                method: 'DELETE',
            }),
        }),

        // Fetch all posts
        getAllPosts: build.query<any, { page: number, limit: number, search: string }>({
            query: (query) => ({
                url: blogEndpoints.GET_ALL_POST + `?page=${query.page}&limit=${query.limit}&search=${query.search}`,
                method: 'GET',
            }),
        }),

        getAllActivePosts: build.query<any, { page: number, limit: number, search: string }>({
            query: (query) => ({
                url: blogEndpoints.GET_ALL_ACTIVE_POST + `?page=${query.page}&limit=${query.limit}&search=${query.search}`,
                method: 'GET',
            })
        }),

        // Create a new post
        createPost: build.mutation<any, Post>({
            query: (postData) => ({
                url: blogEndpoints.CREATE_POST,
                method: 'POST',
                body: postData,
            }),
        }),

        // Update an existing post
        updatePost: build.mutation<any, Post>({
            query: (postData) => ({
                url: blogEndpoints.UPDATE_POST,
                method: 'PATCH',
                body: postData,
            }),
        }),

        // Delete a post by ID
        deletePost: build.mutation<any, string>({
            query: (id) => ({
                url: blogEndpoints.DELETE_POST.replace('{:id}', id),
                method: 'DELETE',
            }),
        }),

        // Get a post by slug
        getPostBySlug: build.query<any, string>({
            query: (slug) => ({
                url: blogEndpoints.GET_POST_BY_SLUG.replace('{:slug}', slug),
                method: 'GET',
            }),
        }),

        getPostById: build.query<any, string>({
            query: (id) => ({
                url: blogEndpoints.GET_POST_BY_ID.replace('{:id}', id),
                method: 'GET',
            }),
        }),
    }),
});

// Export hooks for usage in functional components
export const {
    useGetAllCategoriesQuery,
    useGetAllActiveCategoriesQuery,
    useCreateCategoryMutation,
    useUpdateCategoryMutation,
    useDeleteCategoryMutation,
    useGetAllPostsQuery,
    useCreatePostMutation,
    useUpdatePostMutation,
    useDeletePostMutation,
    useGetPostBySlugQuery,
    useGetPostByIdQuery,
} = blogApis;