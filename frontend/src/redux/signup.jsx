import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

export const signupuser = createAsyncThunk("signup/user", async (values) => {
  try {
    const response = await axios.post(
      "http://127.0.0.1:8000/api/users/",
      values,
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    return response;
  } catch (error) {
    document.write("<h3>Please try again later</h3>");
    document.close();
  }
});

const signupuserslice = createSlice({
  name: "signup",
  initialState: {
    loading: false,
    data: [],
    message: [],
  },
  extraReducers: (builders) => {
    builders
      .addCase(signupuser.pending, (state) => {
        state.loading = true;
      })
      .addCase(signupuser.fulfilled, (state, action) => {
        (state.loading = false), (state.data = action.payload.data);
      })
      .addCase(signupuser.rejected, (state, action) => {
        (state.loading = false),
          (state.data = []),
          (state.message = action.error.message);
      });
  },
});

export default signupuserslice.reducer;