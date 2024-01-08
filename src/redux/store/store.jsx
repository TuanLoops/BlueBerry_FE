import {configureStore} from "@reduxjs/toolkit";
import {useReducer} from "react";

export const store = configureStore({
    reducer: {
        users: useReducer,
    }
})