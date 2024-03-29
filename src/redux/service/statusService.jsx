import { createAsyncThunk } from "@reduxjs/toolkit";
import { UrlStatus } from "../../context/connect.jsx";

export const showStatus = createAsyncThunk("GET_ALL_STATUS", async () => {
  const res = await UrlStatus().get("");
  return res.data;
});

export const addStatus = createAsyncThunk("ADD_STATUS", async (status) => {
  const res = await UrlStatus().post("", status);
  return res.data;
});

export const deleteStatus = createAsyncThunk("DELETE_STATUS", async (id) => {
  try {
    const res = await UrlStatus().delete(`/${id}`);
    return res.data;
  } catch (e) {
    console.log(e.response.data.message);
  }
});

export const editStatus = createAsyncThunk(
  "EDIT_STATUS",
  async ({ id, status }) => {
    try {
      const res = await UrlStatus().put(`/${id}`, status);
      return res.data;
    } catch (e) {
      console.log(e);
    }
  }
);

export const searchStatus = createAsyncThunk(
  "SEARCH",
  async (keyword, { rejectWithValue }) => {
    try {
      const res = await UrlStatus().get(`/search?query=${keyword}`);
      return res.data;
    } catch (e) {
      return rejectWithValue(e);
    }
  }
);

export const changePrivacy = createAsyncThunk(
  "CHANGE_PRIVACY",
  async (status) => {
    console.log(status);
    await UrlStatus().put(status.id + `/change-privacy`, status);
    return status;
  }
);

export const getStatusByUser = createAsyncThunk(
  "GET_STATUS_BY_USER",
  async (userId) => {
    const res = await UrlStatus().get(`/users/${userId}`);
    return res.data ? res.data : [];
  }
);

export const likeStatus = createAsyncThunk("LIKE_STATUS", async (statusId) => {
  const res = await UrlStatus().post(`${statusId}/like`);
  return {
    id: statusId,
    like: res.data,
  };
});

export const getStatusById = createAsyncThunk(
  "GET_STATUS_BY_ID",
  async (postId) => {
    const res = await UrlStatus().get(`${postId}`);
    return res.data;
  }
);

export const findStatusByUserAndBody = createAsyncThunk(
  "FIND_STATUS_BY_USER_AND_BODY",
  async (query) => {
    const res = await UrlStatus().get(`/users/${query.id}/search?query=${query.body}`);
    return res.data ? res.data : [];
  }
);
