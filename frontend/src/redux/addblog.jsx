import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

export const addblog = createAsyncThunk(
  "add/blog",
  async ({ values, token }) => {
    try {
      const response = await axios.post(
        "http://127.0.0.1:8000/api/blogs/",
        values,
        {
          headers: {
            "Content-Type": "multipart/form-data",
            Authorization: `token ${token}`,
          },
        }
      );
      return response.data;
    } catch (error) {
      document.write("<h3>Please try again later</h3>");
      document.close();
    }
  }
);

const addblogslice = createSlice({
  name: "addblogdata",
  initialState: {
    loading: false,
    data: [],
    message: null,
  },
  extraReducers: (builders) => {
    builders
      .addCase(addblog.pending, (state) => {
        state.loading = true;
      })
      .addCase(addblog.fulfilled, (state, action) => {
        (state.loading = false), state.data.push(action.payload);
      })
      .addCase(addblog.rejected, (state, action) => {
        (state.loading = false),
          (state.data = []),
          (state.message = action.error.message);
      });
  },
});

export default addblogslice.reducer;