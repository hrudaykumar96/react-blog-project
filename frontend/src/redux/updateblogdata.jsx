import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

export const updatedata = createAsyncThunk(
  "update/data",
  async ({ upid, values, token }) => {
    try {
      const response = await axios.put(
        `http://127.0.0.1:8000/api/blogs/${upid}/`,
        values,
        {
          headers: {
            "Content-Type": "multipart/form-data",
            Authorization: `token ${token}`,
          },
        }
      );
      return response;
    } catch (error) {
      document.write("<h3>Please try again later</h3>");
      document.close();
    }
  }
);

const updatablogslice = createSlice({
  name: "updatedata",
  initialState: {
    loading: false,
    data: null,
    error: null,
  },
  extraReducers: (builder) => {
    builder
      .addCase(updatedata.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(updatedata.fulfilled, (state, action) => {
        state.loading = false;
        state.data = action.payload;
      })
      .addCase(updatedata.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      });
  },
});

export default updatablogslice.reducer;