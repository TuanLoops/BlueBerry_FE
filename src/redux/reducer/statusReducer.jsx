import {createSlice} from "@reduxjs/toolkit";
import {addStatus, showStatus} from "../service/statusService.jsx";

const initialState = {
    list:[],
    filterList: []
}
const statusReducer = createSlice({
    name:"status",
    initialState,
    extraReducers:builder => {
        builder.addCase(showStatus.fulfilled,(state,action)=>{
            state.list = action.payload;
        })
        builder.addCase(addStatus.fulfilled, (state, action) => {
            state.list.push(action.payload);
            state.filterList = state.list;
        })
    }
})
export default statusReducer.reducer;