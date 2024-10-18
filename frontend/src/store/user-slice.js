import { url } from "@/lib/config";
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
  isAuthenticated: false,
  isLoading: true,
  user: null,
  token: null,
};

// Authorizing user action
export const checkAuthentication = createAsyncThunk(
  "/profile",
  async (token, { rejectWithValue }) => {
    try {
      const response = await axios.get(`${url}/api/v1/user/profile`, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Cache-Control": "no-store,no-cache,must-revalidate,proxy-revalidate",
        },
      });
      return response.data;
    } catch (error) {
      return rejectWithValue({
        message: error.response?.data?.message || "Not authorized",
      });
    }
  }
);

// Register user action
export const registerUserAction = createAsyncThunk(
  "/register",
  async (formData, { rejectWithValue }) => {
    try {
      const response = await axios.post(
        `${url}/api/v1/user/register`,
        formData
      );
      return response.data;
    } catch (error) {
      return rejectWithValue({
        message: error.response?.data?.message || "Registration failed",
      });
    }
  }
);

// Login user action
export const loginUserAction = createAsyncThunk(
  "/login",
  async (formData, { rejectWithValue }) => {
    try {
      const response = await axios.post(`${url}/api/v1/user/login`, formData);
      return response.data;
    } catch (error) {
      return rejectWithValue({
        message: error.response?.data?.message || "Login failed",
      });
    }
  }
);

// Logout user action
export const logoutAction = createAsyncThunk("/logout", async () => {
  try {
    const response = await axios.get(`${url}/api/v1/user/logout`);
    return response.data;
  } catch (error) {
    console.log("Logout failed", error);
  }
});

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    // Login user builder
    builder
      .addCase(loginUserAction.pending, (state, action) => {
        state.isLoading = true;
      })
      .addCase(loginUserAction.fulfilled, (state, action) => {
        // console.log(action.payload);

        state.isLoading = false;
        state.user = action.payload.user;
        state.token = action.payload.token;
        sessionStorage.setItem("token", action.payload.token);
        state.isAuthenticated = true;
      })
      .addCase(loginUserAction.rejected, (state, action) => {
        state.isLoading = false;
        state.user = null;
        state.token = null;
        state.isAuthenticated = false;
      });

    // Register user builder
    builder
      .addCase(registerUserAction.pending, (state, action) => {
        state.isLoading = true;
      })
      .addCase(registerUserAction.fulfilled, (state, action) => {
        state.isLoading = false;
        state.user = null;
        state.isAuthenticated = false;
      })
      .addCase(registerUserAction.rejected, (state, action) => {
        state.isLoading = false;
        state.user = null;
        state.isAuthenticated = false;
      });

    // authorizing user
    builder
      .addCase(checkAuthentication.pending, (state, action) => {
        state.isLoading = true;
      })
      .addCase(checkAuthentication.fulfilled, (state, action) => {
        state.isLoading = false;
        state.user = action.payload.success ? action.payload.user : false;
        state.isAuthenticated = action.payload.success ? true : false;
      })
      .addCase(checkAuthentication.rejected, (state, action) => {
        state.isLoading = false;
        state.user = null;
        state.isAuthenticated = false;
      });

    builder
      .addCase(logoutAction.pending, (state, action) => {
        state.isLoading = true;
      })
      .addCase(logoutAction.fulfilled, (state, action) => {
        state.isLoading = false;
        sessionStorage.clear();
        state.user = null;
        state.isAuthenticated = false;
      })
      .addCase(logoutAction.rejected, (state, action) => {
        state.isLoading = false;
        state.user = null;
        state.isAuthenticated = false;
      });
  },
});

// Action creators are generated for each case reducer function
// export const { increment, decrement, incrementByAmount } = userSlice.actions

export default userSlice.reducer;
