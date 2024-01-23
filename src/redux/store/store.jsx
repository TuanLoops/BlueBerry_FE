import { configureStore } from "@reduxjs/toolkit";
import useReducer from "../reducer/userReducer.jsx";
import statusReducer from "../reducer/statusReducer.jsx";
import friendReducer from "../reducer/friendReducer.jsx";
import notificationReducer from "../reducer/notificationReducer.jsx";

export const store = configureStore({
  reducer: {
    user: useReducer,
    status: statusReducer,
    friend: friendReducer,
    notification: notificationReducer,
  },
});
