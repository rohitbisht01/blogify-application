import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { url } from "@/lib/config";
import axios from "axios";

const initialState = {
  isLoading: false,
  blogLists: [],
  blog: null,
};

// all blogs action
export const getAllBlogsAction = createAsyncThunk("/blogs", async () => {
  try {
    const response = await axios.get(`${url}/api/v1/blog`);
    return response.data;
  } catch (error) {
    console.log("Error getting blogs", error);
  }
});

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
        state.blogLists = action.payload.blogs;
      })
      .addCase(getAllBlogsAction.rejected, (state, action) => {
        state.isLoading = false;
        state.blogLists = [];
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
  },
});

export default blogSlice.reducer;
