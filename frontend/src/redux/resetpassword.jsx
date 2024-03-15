import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

export const resetpassword = createAsyncThunk(
  "reset/password",
  async (values) => {
    try {
      const response = await axios.post(
        "http://127.0.0.1:8000/api/reset/",
        values,
        {
          headers: {
            "Content-Type": "application/json",
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

const resetpasswordslice = createSlice({
  name: "reset",
  initialState: {
    loading: false,
    data: [],
  },
  extraReducers: (builders) => {
    builders
      .addCase(resetpassword.pending, (state) => {
        state.loading = true;
      })
      .addCase(resetpassword.fulfilled, (state, action) => {
        (state.loading = false), (state.data = action.payload);
      })
      .addCase(resetpassword.rejected, (state) => {
        (state.loading = false), (state.data = []);
      });
  },
});

export default resetpasswordslice.reducer;