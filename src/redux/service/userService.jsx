import { createAsyncThunk } from "@reduxjs/toolkit";
import { UrlAppUser, UrlUser } from "../../context/connect.jsx";
import { toast } from "react-toastify";

export const login = createAsyncThunk(
  "LOGIN",
  async (user, { rejectWithValue }) => {
    try {
      let res = await UrlUser().post("login", user);
      return res.data;
    } catch (err) {
      return rejectWithValue(err);
    }
  }
);

export const getCurrentUser = createAsyncThunk(
  "GET_CURRENT_USER",
  async (_, { rejectWithValue }) => {
    try {
      let res = await UrlAppUser().get("current-user");
      return res.data;
    } catch (err) {
      localStorage.removeItem("AccessToken");
      return rejectWithValue(err);
    }
  }
);

export const register = (data) => {
  return UrlUser().post("register", data);
};
