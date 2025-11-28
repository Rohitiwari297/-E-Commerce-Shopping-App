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
