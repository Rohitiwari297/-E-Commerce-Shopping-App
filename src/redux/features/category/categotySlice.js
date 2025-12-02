import { createSlice } from "@reduxjs/toolkit";
import { useSelector } from "react-redux";


// initial State
const  initialState = {
    catData : []
}

const categorySlice = createSlice({
    name: 'category',
    initialState,
    reducers: {
        getCat: (state, action) => {
            state.catData = action.payload
            //console.log( 'category from slicer', action.payload)

        }
        
    }
})


export const {getCat} =  categorySlice.actions;
export default categorySlice.reducer;