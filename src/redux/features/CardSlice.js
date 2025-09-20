import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    carts: []  //initialState
}

const CartSlice = createSlice({
    name: "cartSlice",
    initialState,
    reducers:{
        addToCard: (state, action)=>{

            //here we have to update the state
            // console.log(action)
            state.carts = [...state.carts, action.payload]
        }
    }
})

//export actions with const
export const { addToCard} = CartSlice.actions;

//export reducer
export default CartSlice.reducer
   
