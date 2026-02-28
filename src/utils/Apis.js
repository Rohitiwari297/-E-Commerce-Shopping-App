import toast from "react-hot-toast";
import axiosInstance from "../api/axiosInstance";
import axios from "axios";


const API_URL = import.meta.env.VITE_OTP_API_URL;

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


export const placeOrder = async (address, paymentMethod, customerMobile, customerName, selectedDate, selectedTimeSlot) => {
    // SPLIT TIME SLOT IN START TIME AND END TIME
    const [startTime, endTime] = selectedTimeSlot.split(" - ")
    console.log("startTime", startTime)
    console.log("endTime", endTime)
    try {
        const res = await axiosInstance.post(`/api/orders/place`, {
            paymentMethod: paymentMethod === 'Wallet' ? 'wallet' : paymentMethod,
            shippingAddress: address,
            customerName: customerName,
            customerMobile: customerMobile,
            scheduledSlot: {
                data: selectedDate,
                label: selectedTimeSlot,
                startTime,
                endTime
            }
        });
        toast.success(res.data.message);
        console.log(res.data);
        return true;
    } catch (error) {
        console.log('Order Error:', error);
        const errorMessage = error.response?.data?.message || error.message || 'Failed to place order';
        toast.error(errorMessage);
        return false;
    }
};


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

/**
 * Get Products with search query
 */
export const getProduct = async (searchQuery) => {
    try {
        const response = await axiosInstance.get(`/api/products?search=${encodeURIComponent(searchQuery)}`);
        // The API returns { data: { products: [...], totalPages: ... } }
        return response.data?.data?.products || response.data?.products || [];
    } catch (error) {
        console.log("Search error:", error);
        toast.error("Error fetching products");
        return [];
    }
}


/**
 * DELETE ADDRESS BY ID
 */
export const deleteAddress = async (id) => {
    try {
        const res = await axiosInstance.delete(`/api/users/address/${id}`)
        console.log("address", res.data)
        toast.success(res.data.message)
        getAddress();
        return;
    } catch (error) {
        toast.error(error.message)
    }
}


/**
 * GET USER WALLET
 */

export const fetchWalletAmount = async () => {
    try {
        const res = await axiosInstance.get(`/api/users/wallet`);
        // console.log("wallet amount", res.data.data.walletAmount);
        return res.data.data.walletAmount;
    } catch (error) {
        toast.error(`Error while fetching the wallet amount, Error: ${error}`);
        return null;
    }
};


/**
 * GET USER WALLET
 */

export const fetchWalletTransaction = async (page = 1, limit = 5) => {
    try {
        const res = await axiosInstance.get(`/api/users/wallet/transactions?page=${page}&limit=${limit}`);
        console.log("wallet transactions", res.data.data.transactions);
        const transaction = res.data.data.transactions;
        const finalTransaction = transaction.map((item) => {
            // console.log("itemmmmmmmm", item);
            return {
                ...item,
                createdAt: new Date(item.createdAt).toLocaleString(),
            };
        });
        return finalTransaction;
    } catch (error) {
        toast.error(`Error while fetching the wallet transactions, Error: ${error}`);
        return null;
    }
};


/***
 * ADD MONEY IN WALLET
 */

export const addMoneyInWallet = async (amount) => {
    try {
        const res = await axiosInstance.post(`/api/users/wallet/topup`, { amount: amount })
        // console.log("add money in wallet", res)
        toast.success(res.data.message)
        return res.data;
    } catch (error) {
        toast.error(`Error while adding money in wallet, Error: ${error}`);
        return null;
    }
}


/**
 * GET ALL COUPONS
 */
export const getCoupon = async () => {
    try {
        const res = await axiosInstance.get(`/api/coupons`);
        console.log("couuuupon", res.data.data)
        return res.data.data
    } catch (error) {
        toast.error(`Error while fetching the coupon data, Error: ${error}`)
    }
}


/**
 * GET ALL COUPONS
 */
export const ApplyCoupon = async (code) => {
    try {
        const res = await axiosInstance.post(`/api/coupons/apply`, { code });
        console.log(res.data)
        return res.data
    } catch (error) {
        toast.error(`Error while fetching the coupon data, Error: ${error}`)
    }
}


/**
 * INTEGRATE OPT API
 */
export const SendOtp = async (formData) => {
    console.log('data:', formData);

    const res = await axios.post(
        API_URL,
        formData,
        {
            headers: {
                "Content-Type": "multipart/form-data",
            },
        }
    );

    return res;
};