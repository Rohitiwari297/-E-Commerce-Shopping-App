import { configureStore } from "@reduxjs/toolkit";
import CartSlice from '../features/CardSlice'
import CartSlicer from '../features/CartSlicer'
import productsReducer from '../features/productSlice'
import forthCardSlicce from '../features/forthCardSlicer'
import AdditionSlice from '../features/addition'
import authReducer from "../features/auth/authSlice";
import userReducer from "../features/user/userSlice";


const store = configureStore({
    reducer:{
        auth: authReducer,
        user: userReducer,
        allCards: CartSlice,
        dataToCart: CartSlicer  ,
        products: productsReducer,
        forthCard: forthCardSlicce,
        additionSlice: AdditionSlice
        
    }
})

export default store;