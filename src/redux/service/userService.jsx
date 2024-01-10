import {createAsyncThunk} from "@reduxjs/toolkit";
import {UrlUser} from "../../context/connect.jsx";
import {toast} from "react-toastify";

export const login = createAsyncThunk(
    "user/login",
    async (user) =>{
        let res = await UrlUser().post("login",user);
        return res.data;
    }
)

export const register = (data) => {
    return UrlUser().post("register", data);
}