import {createAsyncThunk} from "@reduxjs/toolkit";
import {UrlUser} from "../../context/connect.jsx";
import {toast} from "react-toastify";
import {useNavigate} from "react-router-dom";

export const login = createAsyncThunk(
    "user/login",
    async (user) =>{
        let res = await UrlUser().post("login",user);
        return res.data;
    }
)

export const register = (data) => {
    toast.success("Vui lòng kiểm khoản email và kích hoạt để bắt đầu sử dụng")
    return UrlUser().post("register",data);
}