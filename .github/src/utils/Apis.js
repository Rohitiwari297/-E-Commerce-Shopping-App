import toast from "react-hot-toast";
import axiosInstance from "../api/axiosInstance";
import axios from "axios";

export const getCategories = async ({ setCategoryDetails }) => {

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
export const getSubCategories = async (catId) => {
    try {
        const response = await axiosInstance.get(
            `/api/categories/sub?category=${catId}`
        );
        return response.data?.data?.[0]?.subCategories;
    } catch (error) {
        console.log(error);
        return [];
    }
};


/**
 * get Banners api
 */

export const getBanners = async (setBannersData) => {
    try {
        const res = await axios.get(`https://ecommerce.suryapolypack.com/api/banners`);
        console.log('banner_respinse:', res.data?.data)
        setBannersData(res.data?.data);
    } catch (error) {
        console.log(error);
        return null;
    }
}

/**
 * Save Address
 */

export const saveAddress = async (data) => {
    try {
        const res = await axiosInstance.post(`/api/users/address`, data);
        toast.success(res.data.message)
        console.log(res.data)

    } catch (error) {
        console.log(error);
        return null;
    }
}

export const getAddress = async (setAllAddress) => {
    try {
        const res = await axiosInstance.get(`/api/users/address`);
        toast.success(res.data.message)
        setAllAddress(res.data.data)

    } catch (error) {
        console.log(error);
        return null;
    }
}


export const placeOrder = async (address, paymentMethod) => {
    try {
        const res = await axiosInstance.post(`/api/orders/place`, {
            paymentMethod: paymentMethod,
            shippingAddress: address
        });
        toast.success(res.data.message)
        console.log(res.data)
        return

    } catch (error) {
        console.log(error);
        toast.error(error.response.data.message)
        return null;
    }
}


export const getOrderHistory = async () => {
    try {
        const res = await axiosInstance.get(`/api/orders`)
        console.log("getOrder", res.data)
        toast.success(res.data.message)
        return res.data;
    } catch (error) {
        toast.error(error.message)
    }
}




