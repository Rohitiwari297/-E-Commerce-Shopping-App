import { configureStore } from "@reduxjs/toolkit";
import CartSlice from '../features/CardSlice'
import CartSlicer from '../features/CartSlicer'


const store = configureStore({
    reducer:{
        allCards: CartSlice,
        dataToCart: CartSlicer  ,
        
    }
})

export default store;