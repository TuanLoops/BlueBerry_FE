import { createAsyncThunk } from "@reduxjs/toolkit";
import { UrlNotification } from "../../context/connect";

export const getNotifications = createAsyncThunk("GET_NOTIFICATION", async () => {
  try {
    const res = await UrlNotification().get(``);
    return res.data;
  } catch (e) {
    console.log(e.response.data.message);
  }
});

export const updateNotification = async ({ id, notification }) => {
  try {
    const res = await UrlNotification().put(`${id}`, notification);
    return res.data;
  }catch (e){
    console.log(e.response.data.message)
  }
}

export const updateAllNotification = async (notification) => {
  try {
    const res = await UrlNotification().put("all", notification);
    console.log("adasd")
    console.log(res.data)
    return res.data
  }catch (e){
    console.log(e.response.data.message);
  }
}
