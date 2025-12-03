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

/**
 * get Banners api
 */

export const getBanners = async (setBannersData) => {
    try {
        const res = await axiosInstance.get("/api/banners");
        setBannersData(res.data.data);
    } catch (error) {
        console.log(error);
        return null;
    }
}
