import {createSlice} from "@reduxjs/toolkit";
import {addStatus, deleteStatus, searchStatus, showStatus} from "../service/statusService.jsx";

const initialState = {
    list: [],
    filterList: []
}
const statusReducer = createSlice({
    name: "status",
    initialState,
    extraReducers: builder => {
        builder.addCase(showStatus.fulfilled, (state, action) => {
            state.list = action.payload;
        })
        builder.addCase(addStatus.fulfilled, (state, action) => {
            state.list.push(action.payload);
            state.filterList = state.list;
        })
        builder.addCase(deleteStatus.fulfilled, (state, {payload}) => {
            const removedStatusIndex = state.list.findIndex(status => status.id === payload);
            if (removedStatusIndex !== -1) {
                state.list.splice(removedStatusIndex, 1)
            }
        })
        builder.addCase(searchStatus.fulfilled, (state, {payload}) => {
            state.filterList = payload;
        })
    }
})
export default statusReducer.reducer;