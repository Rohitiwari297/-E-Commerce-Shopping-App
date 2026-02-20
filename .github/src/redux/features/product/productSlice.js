import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axiosInstance from "../../../api/axiosInstance";




export const getProductDetsils = createAsyncThunk(
    "product/Details",
    // async function
    async (id, thunkAPI) => {
        try {
            if (id) {
                const response = await axiosInstance.get(`/api/products?category=${id}&limit=20`)
                return response.data.data;  // backend se jo data aa raha hai
            } else {
                const response = await axiosInstance.get(`/api/products?limit=24`)
                return response.data.data;  // backend se jo data aa raha hai
            }
        } catch (error) {
            return thunkAPI.rejectWithValue(error.response.data)
        }
    }

)

// export const getSub


/**  
 * WRITE SLICER FUNCTION 
 * */
//Initial State
const initialState = {
    prodDetails: null,
    loading: false,
    error: null
}

// create slicer
const productSlicer = createSlice({
    name: "prodList",
    initialState,
    reducers: {
        getList: (state, action) => {
            state.prodList = action.payload;
            console.log('product List from store', action.payload)
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(getProductDetsils.pending, (state) => {
                state.loading = true
            })
            .addCase(getProductDetsils.fulfilled, (state, action) => {
                state.loading = false
                state.prodDetails = action.payload
            })
            .addCase(getProductDetsils.rejected, (state, action) => {
                state.loading = false
                state.prodDetails = action.payload
            })
    }
})

export const { getList } = productSlicer.actions;
export default productSlicer.reducer
