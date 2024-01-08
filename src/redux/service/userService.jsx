import {createAsyncThunk} from "@reduxjs/toolkit";
import {UrlUser} from "../../context/connect.jsx";
import {toast} from "react-toastify";

export const login = createAsyncThunk(
    "users/login",
    async (user) =>{
        let res = await UrlUser().post("login",user)
        console.log(res.data)
        return res.data;
    }
)

export const register = (data) => {
    toast.success("Registered successfully")
    return UrlUser().post("register",data);
}