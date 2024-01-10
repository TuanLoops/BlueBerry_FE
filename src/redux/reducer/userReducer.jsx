import {createSlice} from "@reduxjs/toolkit";
import {login} from "../service/userService.jsx";

const fakeUser = {
  id: 1,
  name: "John Doe",
  profilePic:
    "https://images.pexels.com/photos/3228727/pexels-photo-3228727.jpeg?auto=compress&cs=tinysrgb&w=1600",
};

const initialState = {
  currentUser: JSON.parse(localStorage.getItem("user") || fakeUser),
};

const userReducer = createSlice({
    name:"user",
    initialState,
    extraReducers:builder => {
        builder.addCase(login.fulfilled,(state,{payload}) => {
            localStorage.setItem("user", JSON.stringify(payload))
            state.currentUser = payload;
        })
    }
})
export default userReducer.reducer;