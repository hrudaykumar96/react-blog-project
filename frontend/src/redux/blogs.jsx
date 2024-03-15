import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

export const blogsdata = createAsyncThunk("blogs/data", async (token) => {
  try {
    const response = await axios.get("http://127.0.0.1:8000/api/blogs/", {
      headers: {
        "Content-Type": "multipart/form-data",
        Authorization: `token ${token}`,
      },
    });
    return response.data;
  } catch (error) {
    document.write("<h3>Please try again later</h3>");
    document.close();
  }
});

const blogdataslice = createSlice({
  name: "blogs",
  initialState: {
    loading: false,
    data: [],
    message: [],
  },
  extraReducers: (builders) => {
    builders
      .addCase(blogsdata.pending, (state) => {
        state.loading = true;
      })
      .addCase(blogsdata.fulfilled, (state, action) => {
        (state.loading = false), (state.data = action.payload);
      })
      .addCase(blogsdata.rejected, (state, action) => {
        (state.loading = false),
          (state.data = []),
          (state.message = action.error.message);
      });
  },
});

export default blogdataslice.reducer;