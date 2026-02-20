import { configureStore } from "@reduxjs/toolkit";
import CartSlice from '../features/CardSlice'
import CartSlicer from '../features/CartSlicer'
import productsReducer from '../features/productSlice'
import forthCardSlicce from '../features/forthCardSlicer'
import AdditionSlice from '../features/addition'

import authReducer from "../features/auth/authSlice";
import userReducer from "../features/user/userSlice";
import catReducer from "../features/category/categotySlice"
import prodReducer from "../features/product/productSlice"
// import cartReducer
import cartReducer from "../features/cart/cartSlice"


const store = configureStore({
    reducer:{
        auth: authReducer,
        user: userReducer,
        cateData: catReducer,
        prodData: prodReducer,
        addToCartData: cartReducer,

        allCards: CartSlice,
        dataToCart: CartSlicer  ,
        products: productsReducer,
        forthCard: forthCardSlicce,
        additionSlice: AdditionSlice
        
    }
})

export default store;