import { createSlice } from "@reduxjs/toolkit";
import {
  getCurrentUser,
  getInfoUser,
  login,
  logOut,
  updateProfile
} from "../service/userService.jsx";

let token;

try {
  token = JSON.parse(localStorage.getItem("AccessToken"));
} catch (error) {
  localStorage.removeItem("AccessToken");
}

const initialState = {
  accessToken: token,
  currentUser: null,
  infoUser: null,
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
      state.accessToken = null;
      localStorage.removeItem("AccessToken");
      state.currentUser = null;
    });
    builder.addCase(getInfoUser.fulfilled,(state,action)=>{
      state.infoUser = action.payload;
    })
    builder.addCase(updateProfile.fulfilled,(state,{payload})=>{
      state.infoUser = payload;
    })
  },
});

export default userReducer.reducer;
export const { removeFalseToken } = userReducer.actions;
