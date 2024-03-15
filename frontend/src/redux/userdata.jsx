import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

export const getuserdata = createAsyncThunk("getuserdata", async (token) => {
  const response = await axios.get("http://127.0.0.1:8000/api/home/", {
    headers: {
      "Content-Type": "application/json",
      Authorization: `token ${token}`,
    },
  });
  return response.data;
});

const userdataslice = createSlice({
  name: "userdata",
  initialState: {
    loading: true,
    data: [],
    message: [],
  },
  extraReducers: (builders) => {
    builders
      .addCase(getuserdata.pending, (state) => {
        state.loading = true;
      })
      .addCase(getuserdata.fulfilled, (state, action) => {
        (state.loading = false), (state.data = action.payload);
      })
      .addCase(getuserdata.rejected, (state, action) => {
        (state.loading = false),
          (state.data = []),
          (state.message = action.error.message);
      });
  },
});

export default userdataslice.reducer;