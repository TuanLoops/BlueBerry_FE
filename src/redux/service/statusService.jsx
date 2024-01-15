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

export const deleteStatus = createAsyncThunk(
    "DELETE_STATUS",
    async (id) => {
       try {
           const res = await UrlStatus().delete(`${id}`);
           return res.data;
       }catch (e){
           console.log(e.response.data.message)
       }
    }
)

export const searchStatus = createAsyncThunk(
    "SEARCH",
    async (keyword,{rejectWithValue}) => {
        try {
            const res = await UrlStatus().get(`/search?query=${keyword}`);
            return res.data;
        }catch (e){
            return rejectWithValue(e);
        }
    }
)

export const changePrivacy= createAsyncThunk(
    "CHANGE_PRIVACY",
    async (status)=>{
        console.log(status)
        let res = await UrlStatus().put(status.id+`change-privacy`, status);
        return status;
    }
)