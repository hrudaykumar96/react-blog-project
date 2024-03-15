import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
export const deleteblogdata = createAsyncThunk(
  "delete/blog",
  async ({ id, token }) => {
    try {
      const response = await axios.delete(
        `http://127.0.0.1:8000/api/blogs/${id}/`,
        {
          headers: {
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

const deleteblogslice = createSlice({
  name: "deleteblog",
  initialState: {
    loading: false,
    message: [],
  },
  extraReducers: (builders) => {
    builders
      .addCase(deleteblogdata.pending, (state) => {
        state.loading = true;
      })
      .addCase(deleteblogdata.fulfilled, (state, action) => {
        (state.loading = false), (state.message = action.payload);
      })
      .addCase(deleteblogdata.rejected, (state, action) => {
        (state.loading = false), (state.message = action.error.message);
      });
  },
});

export default deleteblogslice.reducer;