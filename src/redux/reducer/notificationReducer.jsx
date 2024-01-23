import { createSlice } from "@reduxjs/toolkit";
import { getNotifications } from './../service/notificationService';

const initialState = {
  notifications: [],
};

const notificationReducer = createSlice({
  name: "notifications",
  initialState,
  extraReducers: (builder) => {
    builder.addCase(getNotifications.fulfilled, (state, { payload }) => {
      state.notifications = payload;
    });
  },
});

export default notificationReducer.reducer;
