import { createSlice } from "@reduxjs/toolkit";
import { getCurrentUser, login } from "../service/userService.jsx";

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
  extraReducers: (builder) => {
    builder.addCase(login.fulfilled, (state, { payload }) => {
      localStorage.setItem("AccessToken", JSON.stringify(payload.token));
      state.accessToken = payload.token;
    });
    builder.addCase(getCurrentUser.fulfilled, (state, { payload }) => {
      state.currentUser = payload;
    });
  },
});
export default userReducer.reducer;
