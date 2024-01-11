import {createSlice} from "@reduxjs/toolkit";
import {addStatus, showStatus} from "../service/statusService.jsx";

const initialState = {
    list:[]
}
const statusReducer = createSlice({
    name:"status",
    initialState,
    extraReducers:builder => {
        builder.addCase(showStatus.fulfilled,(state,action)=>{
            state.list = action.payload;
        })
        builder.addCase(addStatus.fulfilled)
    }
})
export default statusReducer.reducer;