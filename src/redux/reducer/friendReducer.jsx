import { createSlice } from "@reduxjs/toolkit";
import { compareDesc } from "date-fns";
import {
  acceptFriendRequest,
  cancelFriendRequest,
  declineFriendRequest,
  getCurrentUserFriendList,
  getIncomingFriendRequests,
  getSentFriendRequests,
  sendFriendRequest,
} from "../service/friendService";

const initialState = {
  friendList: [],
  incomingFriendRequests: [],
  sentFriendRequests: [],
};

const friendReducer = createSlice({
  name: "friend",
  initialState,
  extraReducers: (builder) => {
    builder.addCase(
      getCurrentUserFriendList.fulfilled,
      (state, { payload }) => {
        state.friendList = payload;
        state.friendList.sort((a, b) =>
          compareDesc(a.lastOnline, b.lastOnline)
        );
      }
    );
    builder.addCase(
      getIncomingFriendRequests.fulfilled,
      (state, { payload }) => {
        state.incomingFriendRequests = payload;
      }
    );
    builder.addCase(getSentFriendRequests.fulfilled, (state, { payload }) => {
      state.sentFriendRequests = payload;
    });
    builder.addCase(sendFriendRequest.fulfilled, (state, { payload }) => {
      state.sentFriendRequests.push(payload);
    });
    builder.addCase(acceptFriendRequest.fulfilled, (state, { payload }) => {
      const index = state.incomingFriendRequests.findIndex(
        (item) => item.id === payload.id
      );
      state.incomingFriendRequests.splice(index, 1);
      state.friendList.push(payload.sender);
      state.friendList.sort((a, b) => compareDesc(a.lastOnline, b.lastOnline));
    });
    builder.addCase(declineFriendRequest.fulfilled, (state, { payload }) => {
      const index = state.incomingFriendRequests.findIndex(
        (item) => item.id === payload.id
      );
      state.incomingFriendRequests.splice(index, 1);
    });
    builder.addCase(cancelFriendRequest.fulfilled, (state, { payload }) => {
      const index = state.incomingFriendRequests.findIndex(
        (item) => item.id === payload.id
      );
      state.incomingFriendRequests.splice(index, 1);
    });
  },
});

export default friendReducer.reducer;
