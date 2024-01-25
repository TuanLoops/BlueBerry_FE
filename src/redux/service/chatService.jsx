import { createAsyncThunk } from "@reduxjs/toolkit";
import { UrlChat } from "../../context/connect";

export const getChatRooms = createAsyncThunk("GET_CHAT_ROOMS", async () => {
  try {
    const res = await UrlChat().get(`/rooms`);
    return res.data;
  } catch (e) {
    console.log(e);
  }
});
