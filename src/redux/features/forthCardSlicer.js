import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    items: [],
}
const forthCardSlicce = createSlice({
    name: "forthCard",
    initialState,
    reducers: {
        addToForthCard: (state, action) => {

            console.log("this is from fourth card", action)

            state.items = [...state.items, action.payload]
            
        }
    }
})

export const { addToForthCard } = forthCardSlicce.actions
export default forthCardSlicce.reducer