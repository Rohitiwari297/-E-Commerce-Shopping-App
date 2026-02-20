import axiosInstance from "../../../api/axiosInstance.js";

// SEND OTP
export const sendOtpAPI = async (mobile) => {
  const res = await axiosInstance.post("/api/auth/send-otp", { mobile });
  return res.data;
};

// VERIFY OTP → Login
export const verifyOtpAPI = async ({ mobile, otp }) => {
  const res = await axiosInstance.post("/api/auth/verify-otp", {
    mobile,
    otp,
  });
  return res.data;
};
