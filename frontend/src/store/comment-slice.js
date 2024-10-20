import { url } from "@/lib/config";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
  isLoading: false,
  comments: [],
};

// get all comments for a blog action
export const getBlogCommentAction = createAsyncThunk(
  "/blog-comment",
  async (blogId, { rejectWithValue }) => {
    try {
      const response = await axios.get(`${url}/api/v1/comment/${blogId}`);
      return response.data;
    } catch (error) {
      console.log("Error getting comment");
      rejectWithValue({
        message: error.response?.data?.message || "comment failed",
      });
    }
  }
);

// create a comments
export const createCommentAction = createAsyncThunk(
  "/comment-create",
  async ({ blogId, body }, { rejectWithValue }) => {
    const token = sessionStorage.getItem("token");
    try {
      const response = await axios.post(
        `${url}/api/v1/comment/${blogId}`,
        body,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Cache-Control":
              "no-store,no-cache,must-revalidate,proxy-revalidate",
            "Content-Type": "application/json", // or "application/x-www-form-urlencoded" if needed
          },
        }
      );
      return response.data;
    } catch (error) {
      console.log("Error creating comment");
      return rejectWithValue({
        message: error.response?.data?.message || "Creating comment failed",
      });
    }
  }
);

// delete comment
export const deleteCommentAction = createAsyncThunk(
  "/delete-comment",
  async (commentId, { rejectWithValue }) => {
    const token = sessionStorage.getItem("token");
    try {
      const response = await axios.delete(
        `${url}/api/v1/comment/${commentId}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Cache-Control":
              "no-store,no-cache,must-revalidate,proxy-revalidate",
            "Content-Type": "application/json",
          },
        }
      );
      return response.data;
    } catch (error) {
      console.log("Error deleting comment");
      return rejectWithValue({
        message: error.response?.data?.message || "Deleting comment failed",
      });
    }
  }
);

// update comment
export const updateCommentAction = createAsyncThunk(
  "/edit-comment",

  async ({ commentId, body }, { rejectWithValue }) => {
    const token = sessionStorage.getItem("token");
    try {
      const response = await axios.put(
        `${url}/api/v1/comment/${commentId}`,
        body,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Cache-Control":
              "no-store,no-cache,must-revalidate,proxy-revalidate",
            "Content-Type": "application/json",
          },
        }
      );
      return response.data;
    } catch (error) {
      console.log("Error updating comment");
      return rejectWithValue({
        message: error.response?.data?.message || "Updating comment failed",
      });
    }
  }
);

const commentSlice = createSlice({
  name: "comment",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    // get all comments
    builder
      .addCase(getBlogCommentAction.pending, (state, action) => {
        state.isLoading = true;
      })
      .addCase(getBlogCommentAction.fulfilled, (state, action) => {
        state.isLoading = false;
        state.comments = action.payload.comments || [];
      })
      .addCase(getBlogCommentAction.rejected, (state, action) => {
        state.isLoading = true;
        state.comments = [];
      });

    // create a comment
    builder
      .addCase(createCommentAction.pending, (state, action) => {
        state.isLoading = true;
      })
      .addCase(createCommentAction.fulfilled, (state, action) => {
        state.isLoading = false;
      })
      .addCase(createCommentAction.rejected, (state, action) => {
        state.isLoading = true;
      });

    // deleting a comment
    builder
      .addCase(deleteCommentAction.pending, (state, action) => {
        state.isLoading = true;
      })
      .addCase(deleteCommentAction.fulfilled, (state, action) => {
        state.isLoading = false;
      })
      .addCase(deleteCommentAction.rejected, (state, action) => {
        state.isLoading = false;
      });

    // update a comment
    builder
      .addCase(updateCommentAction.pending, (state, action) => {
        state.isLoading = true;
      })
      .addCase(updateCommentAction.fulfilled, (state, action) => {
        state.isLoading = false;
      })
      .addCase(updateCommentAction.rejected, (state, action) => {
        state.isLoading = false;
      });
  },
});

export default commentSlice.reducer;
