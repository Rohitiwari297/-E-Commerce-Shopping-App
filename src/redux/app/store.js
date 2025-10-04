import { configureStore } from "@reduxjs/toolkit";
import CartSlice from '../features/CardSlice'
import CartSlicer from '../features/CartSlicer'
import productsReducer from '../features/productSlice'
import forthCardSlicce from '../features/forthCardSlicer'
import AdditionSlice from '../features/addition'


const store = configureStore({
    reducer:{
        allCards: CartSlice,
        dataToCart: CartSlicer  ,
        products: productsReducer,
        forthCard: forthCardSlicce,
        additionSlice: AdditionSlice
        
    }
})

export default store;