import { createSlice } from "@reduxjs/toolkit";
import { addStatus, showStatus } from "../service/statusService.jsx";

const initialState = {
  list: [],
  filteredList: [],
};
const statusReducer = createSlice({
  name: "status",
  initialState,
  extraReducers: (builder) => {
    builder.addCase(showStatus.fulfilled, (state, action) => {
      state.list = action.payload;
      state.filteredList = action.payload;
    });
    builder.addCase(addStatus.fulfilled, (state, action) => {
      state.list.push(action.payload);
      state.filteredList = state.list;
    });
  },
});


export default statusReducer.reducer;
