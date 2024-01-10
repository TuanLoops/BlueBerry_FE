import {createAsyncThunk} from "@reduxjs/toolkit";
import {UrlStatus} from "../../context/connect.jsx";

export const showStatus  = createAsyncThunk(
    "status/getAllStatus",
    async () => {
        const res = await UrlStatus().get("");
        return res.data;
    }
)

export const addStatus = createAsyncThunk(
    "status/addStatus",
    async (status) => {
        const res = await UrlStatus().post("",status);
        return res.data;
    }
)