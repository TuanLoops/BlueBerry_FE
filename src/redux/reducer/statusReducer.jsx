import { createSlice } from "@reduxjs/toolkit";
import {
  addStatus,
  deleteStatus,
  editStatus,
  showStatus,
} from "../service/statusService.jsx";

const initialState = {
  list: [],
  filterList: [],
};

const statusReducer = createSlice({
  name: "status",
  initialState,
  extraReducers: (builder) => {
    builder.addCase(showStatus.fulfilled, (state, { payload }) => {
      state.list = payload;
    });
    builder.addCase(addStatus.fulfilled, (state, { payload }) => {
      state.list.push(payload);
      state.filterList = state.list;
    });
    builder.addCase(deleteStatus.fulfilled, (state, { payload }) => {
      const removedStatusIndex = state.list.findIndex(
        (status) => status.id === payload
      );
      if (removedStatusIndex !== -1) {
        state.list.splice(removedStatusIndex, 1);
      }
    });
    builder.addCase(editStatus.fulfilled, (state, { payload }) => {
      const removedStatusIndex = state.list.findIndex(
        (status) => status.id === payload.id
      );
      if (removedStatusIndex !== -1) {
        state.list.splice(removedStatusIndex, 1, payload);
      }
    });
  },
});
export default statusReducer.reducer;
