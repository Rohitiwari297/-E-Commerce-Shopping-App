import { configureStore } from "@reduxjs/toolkit";
import CartSlice from '../features/CardSlice'


const store = configureStore({
    reducer:{
        allCards: CartSlice,
        
    }
})

export default store;