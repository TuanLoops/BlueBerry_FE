import {createSlice} from "@reduxjs/toolkit";
import {login} from "../service/userService.jsx";

const initialState = {
    currentUser : JSON.parse(localStorage.getItem("AccessToken")),
}

const userReducer = createSlice({
    name:"user",
    initialState,
    extraReducers:builder => {
        builder.addCase(login.fulfilled,(state,{payload}) => {
            localStorage.setItem("AccessToken", JSON.stringify(payload.token))
        })
    }
})
export default userReducer.reducer;