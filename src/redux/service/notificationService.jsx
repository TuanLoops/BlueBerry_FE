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
