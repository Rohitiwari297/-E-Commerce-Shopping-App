import axiosInstance from "../../../api/axiosInstance.js";

// GET USER DETAILS
export const getUserDetails = async (id) => {
  const res = await axiosInstance.get("/api/users", { id });
  return res.data;
};