import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { sendOtpAPI, verifyOtpAPI } from "./authAPI";
import { saveToken, removeToken, getToken } from "../../../utils/tokenHelper";
import { jwtDecode } from 'jwt-decode';

// Refresh ke baad token read
const token = getToken();
let savedUser = null;

// Agar token hai to usme se user decode karo
if (token) {
  try {
    savedUser = jwtDecode(token);
  } catch (error) {
    console.log("Invalid token");
  }
}

export const sendOtp = createAsyncThunk("auth/sendOtp", async (mobile) => {
  return await sendOtpAPI(mobile);
});

export const login = createAsyncThunk("auth/login", async ({ mobile, otp }) => {
  const result = await verifyOtpAPI({ mobile, otp });

  // Save token so it's available globally
  if (result?.data?.token) {
    saveToken(result.data.token);
  }

  return result;
});

const authSlice = createSlice({
  name: "auth",

  initialState: {
    user: savedUser,   // refresh ke baad user yahi se load hoga
    loading: false,
    error: null,
  },

  reducers: {
    logout: (state) => {
      state.user = null;
      removeToken();
    },
  },

  extraReducers: (builder) => {
    builder.addCase(sendOtp.fulfilled, () => {
      console.log("OTP Sent Successfully");
    });

    builder
      .addCase(login.pending, (state) => {
        state.loading = true;
      })
      .addCase(login.fulfilled, (state, action) => {
        state.loading = false;

        // Store me user save
        state.user = action.payload.data.user;

        // Token localStorage me save
        saveToken(action.payload.data.token);
      })
      .addCase(login.rejected, (state) => {
        state.loading = false;
      });
  },
});

export const { logout } = authSlice.actions;
export default authSlice.reducer;
