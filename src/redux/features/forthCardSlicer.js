import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  allproducts: [], // cart items array
};

const forthCardSlice = createSlice({
  name: "forthCard",
  initialState,
  reducers: {
    addToForthCard: (state, action) => {
        console.log("Adding to forthCard:", action);
      const item = action.payload;
      const existingItem = state.allproducts.find((i) => i.id === item.id);
      if (existingItem) {
        existingItem.quantity += 1;
      } else {
        state.allproducts.push({ ...item, quantity: 1 });
      }
    },
    increment: (state, action) => {
        console.log("Incrementing item:", action);
        const item = state.allproducts.find((i) => i.id === action.payload);
        if (item) {
          item.quantity += 1;
        }
    },
    decrement: (state, action) => {
      const item = state.allproducts.find((i) => i.id === action.payload);
      if (item) {
        if (item.quantity > 1) {
          item.quantity -= 1;
        } else {
          // remove item when quantity reaches 0
          return state.filter((i) => i.id !== action.payload);
        }
      }
    },
  },
});

export const { addToForthCard, increment, decrement } = forthCardSlice.actions;
export default forthCardSlice.reducer;
