import { createAsyncThunk } from "@reduxjs/toolkit";
import { UrlAppUser, UrlUser } from "../../context/connect.jsx";

export const login = createAsyncThunk(
    "LOGIN",
    async (user, { rejectWithValue }) => {
        try {
            let res = await UrlUser().post("login", user);
            return res.data;
        } catch (err) {
            return rejectWithValue(err);
        }
    }
);

export const getCurrentUser = createAsyncThunk(
    "GET_CURRENT_USER",
    async (_, { rejectWithValue }) => {
        try {
            let res = await UrlAppUser().get("current-user");
            return res.data;
        } catch (err) {
            localStorage.removeItem("AccessToken");
            return rejectWithValue(err);
        }
    }
);

export const getInfoCurrentUser = createAsyncThunk(
    "GET_INFO_CURRENT_USER",
    async (id) => {
        try {
            const res = await UrlAppUser().get(`${id}`);
            return res.data;
        }catch (e){
            console.log(e)
        }
    }
)

export const changeAvatar = async (imageLink) => {
    try {
        const response = await UrlAppUser().patch("change-avatar", { imageLink });
        return response.data;
    } catch (error) {
        console.log(error)
    }
}

export const changePhoto = async (imageLink) => {
    try {
        console.log(UrlAppUser())
        const response = await UrlAppUser().patch("change-banner", { imageLink });
        return response.data;
    } catch (error) {
        console.log(error)
    }
}

export const updateProfile = createAsyncThunk(
    "UPDATE_PROFILE",
    async (userInfo,{rejectWithValue}) => {
        try {
            const  res = await UrlAppUser().put(`${userInfo.id}`,{
                dob: userInfo.dob,
                phoneNumber: userInfo.phoneNumber,
                firstName: userInfo.firstName,
                lastName: userInfo.lastName,
                hobbies: userInfo.hobbies,
                address: userInfo.address,
            });
            return res.data;
        }catch (e){
            return rejectWithValue(e.response.data)
        }
    }
)



export const register = (data) => {
    return UrlUser().post("register", data);
};

export const logOut = createAsyncThunk(
    "LogOut",
    async () => {
        try {
            await UrlUser().post("/logout")
        } catch (e) {
            console.log(e)
        }
    }
)
export const changePassword = async (passwordRequest) => {
    return await UrlUser().put("change-password", passwordRequest);
}
