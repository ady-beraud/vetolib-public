import { createAsyncThunk } from "@reduxjs/toolkit";
import { isLoggedIn, login, register, logout } from "../../apis/auth";

export const checkLoginStatus = createAsyncThunk(
  "auth/checkLogin",
  async (data, thunkAPI) => {
    try {
      const response = await isLoggedIn(data);

      return {
        isAuthenticated: response.loggedIn,
        user: response?.user?.id ? response.user : response,
      };
    } catch (err) {
      throw err;
    }
  }
);

export const loginUser = createAsyncThunk(
  "auth/loginUser",
  async (credentials, thunkAPI) => {
    try {
      const response = await login(credentials);

      return {
        user: response?.user?.id ? response.user : response,
        isAuthenticated: true,
      };
    } catch (err) {
      throw err;
    }
  }
);

export const registerUser = createAsyncThunk(
  "auth/registerUser",
  async (data, thunkAPI) => {
    try {
      const response = await register(data);
      return {
        user: response,
        isAuthenticated: true,
      };
    } catch (err) {
      return thunkAPI.rejectWithValue({
        error: err?.error || "Failed to register",
      });
    }
  }
);

export const logoutUser = createAsyncThunk(
  "auth/logout",
  async (param, thunkAPI) => {
    try {
      await logout();
      return {
        isAuthenticated: false,
        user: null,
      };
    } catch (err) {
      throw err;
    }
  }
);
