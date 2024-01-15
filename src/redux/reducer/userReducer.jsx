import { createSlice } from "@reduxjs/toolkit";
import { getCurrentUser, login, logOut } from "../service/userService.jsx";

let token;

try {
  token = JSON.parse(localStorage.getItem("AccessToken"));
} catch (error) {
  localStorage.removeItem("AccessToken");
}

const initialState = {
  accessToken: token,
  currentUser: null,
};

const userReducer = createSlice({
  name: "user",
  initialState,
  reducers: {
    removeFalseToken: (state) => {
      state.accessToken = null;
      localStorage.removeItem("AccessToken");
    },
  },
  extraReducers: (builder) => {
    builder.addCase(login.fulfilled, (state, { payload }) => {
      localStorage.setItem("AccessToken", JSON.stringify(payload.token));
      state.accessToken = payload.token;
    });
    builder.addCase(getCurrentUser.fulfilled, (state, { payload }) => {
        state.currentUser = payload;
    });
    builder.addCase(getCurrentUser.rejected, (state) => {
      state.accessToken = null;
      localStorage.removeItem("AccessToken");
    });
    builder.addCase(logOut.fulfilled, (state) => {
      localStorage.removeItem("AccessToken");
      state.currentUser = null;
    });
  },
});

export default userReducer.reducer;
export const { removeFalseToken } = userReducer.actions;
