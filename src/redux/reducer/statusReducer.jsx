import { createSlice } from "@reduxjs/toolkit";
import {
    addStatus,
    changePrivacy,
    deleteStatus,
    editStatus,
    getStatusByUser, likeStatus,
    searchStatus,
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
            state.list.unshift(payload);
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
        builder.addCase(searchStatus.fulfilled, (state, { payload }) => {
            state.filterList = payload;
        })
        builder.addCase(changePrivacy.fulfilled, (state, { payload }) => {
            state.list = state.list.map(status => {
                if (status.id === payload.id) {
                    status.privacyLevel = payload.privacyLevel
                }
                return status
            })
        })
        builder.addCase(getStatusByUser.fulfilled, (state, { payload }) => {
            state.list = payload;
        })
        builder.addCase(likeStatus.fulfilled, (state, { payload }) => {
            state.list = state.list.map(status => {
                if (status.id === payload.id) {
                    if (payload.like === 1) {
                        status.countLikes += 1;
                        status.liked = true;
                    } else {
                        status.countLikes -= 1;
                        status.liked = false;
                    }
                }
                return status
            })
        })
    },
});
export default statusReducer.reducer;
