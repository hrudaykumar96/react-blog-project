import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

export const loginuser = createAsyncThunk("login/user", async (values) => {
  try {
    const response = await axios.post(
      "http://127.0.0.1:8000/api/auth/",
      values,
      {
        headers: {
          "Content-Type": "application/json",
        },
        withCredentials: true,
      }
    );
    return response.data;
  } catch (error) {
    document.write("<h3>Please try again later</h3>");
    document.close();
  }
});

const loginuserslice = createSlice({
  name: "login",
  initialState: {
    loading: false,
    message: [],
    data: [],
  },
  extraReducers: (builders) => {
    builders.addCase(loginuser.pending, (state) => {
      state.loading = true;
    });
    builders.addCase(loginuser.fulfilled, (state, action) => {
      (state.loading = false), (state.data = action.payload);
    });
    builders.addCase(loginuser.rejected, (state, action) => {
      (state.loading = false),
        (state.data = []),
        (state.message = action.error.message);
    });
  },
});

export default loginuserslice.reducer;