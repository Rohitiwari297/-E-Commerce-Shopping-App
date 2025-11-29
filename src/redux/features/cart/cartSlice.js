import { createSlice } from "@reduxjs/toolkit";

const cartSlice = createSlice({
  name: "cart",
  initialState: {
    items: [], // {id, name, price, qty, image}
    totalItems: 0,
    totalPrice: 0,
  },

  reducers: {
    addToCart: (state, action) => {
      const item = action.payload;
      const existing = state.items.find((p) => p.id === item.id);

      if (existing) {
        existing.qty += 1;
      } else {
        state.items.push({ ...item, qty: 1 });
      }

      state.totalItems += 1;
      state.totalPrice += item.price;
    },

    removeFromCart: (state, action) => {
      const id = action.payload;
      const existing = state.items.find((p) => p.id === id);

      if (!existing) return;

      state.totalItems -= existing.qty;
      state.totalPrice -= existing.price * existing.qty;

      state.items = state.items.filter((p) => p.id !== id);
    },

    increaseQty: (state, action) => {
      const id = action.payload;
      const item = state.items.find((p) => p.id === id);

      if (item) {
        item.qty += 1;
        state.totalItems += 1;
        state.totalPrice += item.price;
      }
    },

    decreaseQty: (state, action) => {
      const id = action.payload;
      const item = state.items.find((p) => p.id === id);

      if (item && item.qty > 1) {
        item.qty -= 1;
        state.totalItems -= 1;
        state.totalPrice -= item.price;
      } else {
        // removes item if qty becomes 0
        state.items = state.items.filter((p) => p.id !== id);
        state.totalItems -= 1;
        state.totalPrice -= item.price;
      }
    },

    clearCart: (state) => {
      state.items = [];
      state.totalItems = 0;
      state.totalPrice = 0;
    }
  }
});

export const {
  addToCart,
  removeFromCart,
  increaseQty,
  decreaseQty,
  clearCart,
} = cartSlice.actions;

export default cartSlice.reducer;
