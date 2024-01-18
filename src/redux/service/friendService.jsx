import { createAsyncThunk } from "@reduxjs/toolkit";
import { UrlFriend } from "../../context/connect.jsx";

export const getCurrentUserFriendList = createAsyncThunk(
  "GET_CURR_USER_FRIEND_LIST",
  async () => {
    try {
      let res = await UrlFriend().get(`/list`);
      return res.data;
    } catch (e) {
      console.log(e);
      return [];
    }
  }
);

export const getIncomingFriendRequests = createAsyncThunk(
  "GET_INCOMING_FRIEND_REQUEST",
  async () => {
    try {
      let res = await UrlFriend().get(`/incoming-request`);
      return res.data;
    } catch (e) {
      console.log(e);
      return [];
    }
  }
);

export const getSentFriendRequests = createAsyncThunk(
  "GET_SENT_FRIEND_REQUEST",
  async () => {
    try {
      let res = await UrlFriend().get(`/sent-request`);
      return res.data;
    } catch (e) {
      console.log(e);
      return [];
    }
  }
);

export const getFriendList = createAsyncThunk(
  "GET_FRIEND_LIST",
  async (userId) => {
    try {
      let res = await UrlFriend().get(`/list/${userId}`);
      return res.data;
    } catch (e) {
      console.log(e);
      return [];
    }
  }
);

export const sendFriendRequest = createAsyncThunk(
  "SEND_FRIEND_REQUEST",
  async (receiverId) => {
    try {
      let res = await UrlFriend().post(`/friend-request/send`, receiverId);
      return res.data;
    } catch (e) {
      console.log(e.response.data.message);
    }
  }
);

export const acceptFriendRequest = createAsyncThunk(
  "ACCEPT_FRIEND_REQUEST",
  async (requestId) => {
    try {
      let res = await UrlFriend().put(`/friend-request/respond`, {
        requestId,
        status: "ACCEPTED",
      });
      return res.data;
    } catch (e) {
      console.log(e.response.data.message);
    }
  }
);

export const declineFriendRequest = createAsyncThunk(
  "DECLINE_FRIEND_REQUEST",
  async (requestId) => {
    try {
      let res = await UrlFriend().put(`/friend-request/respond`, {
        requestId,
        status: "DECLINED",
      });
      return res.data;
    } catch (e) {
      console.log(e.response.data.message);
    }
  }
);

export const cancelFriendRequest = createAsyncThunk(
  "CANCEL_FRIEND_REQUEST",
  async (requestId) => {
    try {
      let res = await UrlFriend().put(`/friend-request/respond`, {
        requestId,
        status: "CANCELED",
      });
      return res.data;
    } catch (e) {
      console.log(e.response.data.message);
    }
  }
);