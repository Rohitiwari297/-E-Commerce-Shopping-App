import axiosInstance from "../api/axiosInstance";

export const getCategories = async ({setCategoryDetails}) => {
    try {
        const response = await axiosInstance.get("/api/categories");
        return setCategoryDetails(response.data.data);
        
    } catch (error) {
        console.log(error);
        return null;
    }

}

// export const updateProfileDetails = async ({ id, updateProfile }) => {
//   try {
//     const response = await axiosInstance.patch(`/api/users/${id}`, updateProfile);

//     alert(response.data.message);
//     console.log("response from updated axios:", response);

//     // Update React state after saving
//     console.log(response.data.data);

//   } catch (error) {
//     console.log(error);
//     alert(error.response?.data?.message || "Something went wrong");
//   }
// };

// //get userDetails by id
// export const getUserDetails = async ({id, }) => {
//     try {
//         const response = await axiosInstance.patch(`/api/users/${id}`);

//         alert(response.data.message);
//         console.log("response from updated axios:", response);

//         // Update React state after saving
        

//     } catch (error) {
//         console.log(error);
//         alert(error.response?.data?.message || "Something went wrong");
//     }
// }
