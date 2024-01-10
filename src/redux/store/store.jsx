import {configureStore} from "@reduxjs/toolkit";
import useReducer from "../reducer/userReducer.jsx";


export const store = configureStore({
    reducer: {
        user: useReducer,
    }
})