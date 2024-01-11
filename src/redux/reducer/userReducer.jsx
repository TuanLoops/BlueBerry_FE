import { createSlice } from "@reduxjs/toolkit";
import {getCurrentUser, login, logOut} from "../service/userService.jsx";

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
    builder.addCase(logOut.fulfilled,(state,{payload})=>{
      localStorage.removeItem("AccessToken");
      state.currentUser =null;
    })
  },
});
export default userReducer.reducer;
