import {configureStore} from "@reduxjs/toolkit";
import useReducer from "../reducer/userReducer.jsx";
import statusReducer from "../reducer/statusReducer.jsx";


export const store = configureStore({
    reducer: {
        user: useReducer,
        status: statusReducer,
    }
})