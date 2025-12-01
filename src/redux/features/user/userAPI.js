
import axiosInstance from "../../../api/axiosInstance.js";

export const updateProfileDetails = async ({ id, updateProfile }) => {
  try {
    const response = await axiosInstance.patch(`/api/users/${id}`, updateProfile);

    alert(response.data.message);
    console.log("response from updated axios:", response);

    // Update React state after saving
    console.log(response.data.data);

  } catch (error) {
    console.log(error);
    alert(error.response?.data?.message || "Something went wrong");
  }
};


// export const getUserDetailsAPI = async (id) => {
//   const response = await axiosInstance.get(`/api/users/${id}`);
//   return response.data.data;
// };
