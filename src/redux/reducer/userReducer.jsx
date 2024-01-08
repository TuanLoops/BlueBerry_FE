import {createSlice} from "@reduxjs/toolkit";
import {login} from "../service/userService.jsx";

const initialState = {
    currentUser : JSON.parse(localStorage.getItem("user")),
}

const userReducer = createSlice({
    name:"users",
    initialState,
    extraReducers:builder => {
        builder.addCase(login.fulfilled,(state,{payload}) => {
            localStorage.setItem("users", JSON.stringify(payload))
            state.currentUser = payload;
        })
    }
})
export default userReducer.reducer;