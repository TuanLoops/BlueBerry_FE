import { createSlice } from "@reduxjs/toolkit";
import { getChatRooms } from "../service/chatService";
import { compareDesc } from "date-fns";

const initialState = {
  chatRooms: [],
  popups: [],
};

const chatReducer = createSlice({
  name: "chat",
  initialState,
  reducers: {
    openPopup: (state, { payload }) => {
      if (!state.popups.find((item) => item === payload)) {
        state.popups.unshift(payload);
        state.popups = state.popups.slice(0, 2);
      }
    },
    closePopup: (state, { payload }) => {
      state.popups = state.popups.filter((popup) => popup !== payload);
    },
    closeAllPopups: (state) => {
      state.popups = [];
    },
  },
  extraReducers: (builder) => {
    builder.addCase(getChatRooms.fulfilled, (state, { payload }) => {
      state.chatRooms = payload.sort((a, b) =>
        compareDesc(a.lastActivity, b.lastActivity)
      );
      for (let room of state.chatRooms) {
        room.messages.sort((a, b) => compareDesc(a.timeStamp, b.timeStamp));
      }
    });
  },
});

export const { openPopup, closePopup, closeAllPopups } = chatReducer.actions;
export default chatReducer.reducer;
