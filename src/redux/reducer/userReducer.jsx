import {createSlice} from "@reduxjs/toolkit";

const initialState = {
    list: []
}

const userReducer = createSlice({
    name:"user",
    initialState,
    extraReducers:builder => {
        builder.addCase()
    }
})
export default userReducer.reducer;