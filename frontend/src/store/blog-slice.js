import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { url } from "@/lib/config";
import axios from "axios";

const initialState = {
  isLoading: false,
  blogLists: [],
  blog: null,
  totalBlogs: 0,
};

// all blogs action
export const getAllBlogsAction = createAsyncThunk(
  "/blogs",
  async (page, { rejectWithValue }) => {
    try {
      const response = await axios.get(`${url}/api/v1/blog?page=${page}`);
      return response.data;
    } catch (error) {
      console.log("Error getting blogs", error);
      return rejectWithValue({
        message: error.response?.data?.message || "Getting blogs failed",
      });
    }
  }
);

// create blog action
export const createBlogAction = createAsyncThunk(
  "/create-blog",
  async (blogBody, { rejectWithValue }) => {
    const token = sessionStorage.getItem("token");

    try {
      const response = await axios.post(`${url}/api/v1/blog/create`, blogBody, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Cache-Control": "no-store,no-cache,must-revalidate,proxy-revalidate",
          "Content-Type": "multipart/form-data",
        },
      });
      return response.data;
    } catch (error) {
      console.log("Error creating blog", error);
      return rejectWithValue({
        message: error.response?.data?.message || "Blog Creation failed",
      });
    }
  }
);

// blog by id action
export const getBlogByIdAction = createAsyncThunk(
  "/blog/id",
  async (id, { rejectWithValue }) => {
    try {
      const response = await axios.get(`${url}/api/v1/blog/${id}`);
      return response.data;
    } catch (error) {
      console.log("Error getting blog by id", error);
      return rejectWithValue({
        message: error.response?.data?.message || "Blog failed",
      });
    }
  }
);

// update blog action
export const updateBlogAction = createAsyncThunk(
  "/update-blog",
  async ({ blogId, blogBody }, { rejectWithValue }) => {
    const token = sessionStorage.getItem("token");

    try {
      const response = await axios.put(
        `${url}/api/v1/blog/update/${blogId}`,
        blogBody,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Cache-Control":
              "no-store,no-cache,must-revalidate,proxy-revalidate",
            "Content-Type": "multipart/form-data",
          },
        }
      );
      return response.data;
    } catch (error) {
      console.log("Error updating blog", error);
      return rejectWithValue({
        message: error.response?.data?.message || "Blog Updating failed",
      });
    }
  }
);

// delete a blog action
export const deleteBlogAction = createAsyncThunk(
  "/blog/id/delete",
  async (id, { rejectWithValue }) => {
    const token = sessionStorage.getItem("token");
    try {
      const response = await axios.delete(`${url}/api/v1/blog/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Cache-Control": "no-store,no-cache,must-revalidate,proxy-revalidate",
        },
      });
      return response.data;
    } catch (error) {
      console.log("Error deleting blog by id", error);
      return rejectWithValue({
        message: error.response?.data?.message || "Blog deleting failed",
      });
    }
  }
);

const blogSlice = createSlice({
  name: "blog",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    // all blogs
    builder
      .addCase(getAllBlogsAction.pending, (state, action) => {
        state.isLoading = true;
      })
      .addCase(getAllBlogsAction.fulfilled, (state, action) => {
        state.isLoading = false;
        state.totalBlogs = action.payload.totalBlogs;
        state.blogLists = action.payload.blogs;
      })
      .addCase(getAllBlogsAction.rejected, (state, action) => {
        state.isLoading = false;
        state.blogLists = [];
        state.totalBlogs = 0;
      });

    // create blog
    builder
      .addCase(createBlogAction.pending, (state, action) => {
        state.isLoading = true;
      })
      .addCase(createBlogAction.fulfilled, (state, action) => {
        state.isLoading = false;
        //   state.blogLists = action.payload.blogs;
      })
      .addCase(createBlogAction.rejected, (state, action) => {
        state.isLoading = false;
        //   state.blogLists = [];
      });

    // update blog
    builder
      .addCase(updateBlogAction.pending, (state, action) => {
        state.isLoading = true;
      })
      .addCase(updateBlogAction.fulfilled, (state, action) => {
        state.isLoading = false;
        //   state.blogLists = action.payload.blogs;
        state.blog = action.payload.blog;
      })
      .addCase(updateBlogAction.rejected, (state, action) => {
        state.isLoading = false;
        //   state.blogLists = [];
      });

    // blog by id
    builder
      .addCase(getBlogByIdAction.pending, (state, action) => {
        state.isLoading = true;
      })
      .addCase(getBlogByIdAction.fulfilled, (state, action) => {
        state.isLoading = false;
        state.blog = action.payload.blog;
      })
      .addCase(getBlogByIdAction.rejected, (state, action) => {
        state.isLoading = false;
        state.blog = null;
      });

    // delete blog
    builder
      .addCase(deleteBlogAction.pending, (state, action) => {
        state.isLoading = true;
      })
      .addCase(deleteBlogAction.fulfilled, (state, action) => {
        state.isLoading = false;
      })
      .addCase(deleteBlogAction.rejected, (state, action) => {
        state.isLoading = false;
      });
  },
});

export default blogSlice.reducer;
