import { configureStore } from "@reduxjs/toolkit";
import CartSlice from '../features/CardSlice'
import CartSlicer from '../features/CartSlicer'
import productsReducer from '../features/productSlice'
import forthCardSlicce from '../features/forthCardSlicer'


const store = configureStore({
    reducer:{
        allCards: CartSlice,
        dataToCart: CartSlicer  ,
        products: productsReducer,
        forthCard: forthCardSlicce,
        
    }
})

export default store;