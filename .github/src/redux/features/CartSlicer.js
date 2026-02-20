import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    cart: []
}

const addSlice = createSlice({
    name: "addtoCart",
    initialState,
    reducers: {
        addDataToCard: (state, action)=>{

             //here we have to update the state
            console.log("this is from final card",action)
            state.cart = [...state.cart,action.payload]

        }
    }
})


export const {addDataToCard} = addSlice.actions;
export default addSlice.reducer;