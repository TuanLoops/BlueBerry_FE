import {createAsyncThunk} from "@reduxjs/toolkit";
import {UrlStatus} from "../../context/connect.jsx";

export const showStatus  = createAsyncThunk(
    "GET_ALL_STATUS",
    async () => {
        const res = await UrlStatus().get("");
        return res.data;
    }
)

export const addStatus = createAsyncThunk(
    "ADD_STATUS",
    async (status) => {
        const res = await UrlStatus().post("",status);
        return res.data;
    }
)