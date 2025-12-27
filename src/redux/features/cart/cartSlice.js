
/** 
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

// use createAsyncThunk function 
export const addToCartAPI = createAsyncThunk(
  "cart/addToCart",
  async (prod_id, {rejectWithValue}) => {
    try {
      const res = axios
                    .post(`${import.meta.env.VITE_BASE_URL}api/cart/add`, {prod_id})
                    .then((res) => {
                      console.log(res.data)
                      return res.data
                    })
      
    } catch (error) {
      return rejectWithValue(error.message)
    }
  }
)

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
      console.log('state:', state)
      console.log('action.payload:', item)

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

*/


import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

/* ================= ADD TO CART ================= */
export const addToCartAPI = createAsyncThunk(
  "cart/add",
  async ({ productId, quantity }, { rejectWithValue }) => {
    try {

      const token = localStorage.getItem("token")
      const res = await axios.post(
        `${import.meta.env.VITE_BASE_URL}api/cart/add`,
        {
          productId,
          quantity
        },
        {
          headers: {
            Authorization: `Bearer ${token}`
          }
        }
      );
      return res.data;
    } catch (error) {
      return rejectWithValue(error.response?.data || error.message);
    }
  }
);

/* ================= REMOVE FROM CART QUANTITY ================= */
export const updateCartQuantityAPI = createAsyncThunk(
  "cart/update",
  async ({ productId, quantity }, { rejectWithValue }) => {
    console.log('productId:', productId, "quantity:", quantity)
    try {
      const token = localStorage.getItem("token")
      const res = await axios.patch(
        `${import.meta.env.VITE_BASE_URL}api/cart/update`,
        {
          productId,
          quantity: String(quantity)
        },
        {
          headers: {
            Authorization: `Bearer ${token}`
          }
        }
      );
      return res.data;
    } catch (error) {
      return rejectWithValue(error.response?.data || error.message);
    }
  },

);

/* ================= FETCH CART (on refresh) ================= */
export const fetchCartAPI = createAsyncThunk(
  "cart/fetch",
  async (_, { rejectWithValue }) => {
    try {
      const token = localStorage.getItem("token")
      const res = await axios.get(
        `${import.meta.env.VITE_BASE_URL}api/cart`,
        {
          headers: {
            Authorization: `Bearer ${token}`
          }
        }
      );
      return res.data;
    } catch (error) {
      return rejectWithValue(error.response?.data || error.message);
    }
  }
);

/* ================= CLEAR CART ================= */
export const clearCartAPI = createAsyncThunk(
  "cart/clear",
  async (_, { rejectWithValue }) => {
    try {
      const res = await axios.post(
        `${import.meta.env.VITE_BASE_URL}api/cart/clear`
      );
      return res.data;
    } catch (error) {
      return rejectWithValue(error.response?.data || error.message);
    }
  }
);

/* ================= SLICE ================= */
const cartSlice = createSlice({
  name: "cart",
  initialState: {
    items: [],
    totalItems: 0,
    totalPrice: 0,
    loading: false,
    error: null,
  },

  reducers: {},

  extraReducers: (builder) => {
    builder

      /* ADD */
      .addCase(addToCartAPI.pending, (state) => {
        state.loading = true;
      })
      .addCase(addToCartAPI.fulfilled, (state, action) => {
        state.loading = false;
        // Merge logic: Preserve populated productId if available
        const newItems = action.payload.data.items;
        state.items = newItems.map((newItem) => {
          const newItemId = newItem.productId._id || newItem.productId;
          const existingItem = state.items.find((old) => {
            const oldId = old.productId._id || old.productId;
            return oldId === newItemId;
          });

          if (existingItem && typeof existingItem.productId === 'object') {
            return { ...newItem, productId: existingItem.productId };
          }
          return newItem;
        });

        console.log("CART ITEMS MERGED 👉", state.items);
        state.totalItems = action.payload.data.totalItems;
        state.totalPrice = action.payload.data.totalPrice;
      })
      .addCase(addToCartAPI.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      /* UPDATE */
      .addCase(updateCartQuantityAPI.fulfilled, (state, action) => {
        // Merge logic: Preserve populated productId if available
        const newItems = action.payload.data.items;
        state.items = newItems.map((newItem) => {
          const newItemId = newItem.productId._id || newItem.productId;
          const existingItem = state.items.find((old) => {
            const oldId = old.productId._id || old.productId;
            return oldId === newItemId;
          });

          if (existingItem && typeof existingItem.productId === 'object') {
            return { ...newItem, productId: existingItem.productId };
          }
          return newItem;
        });

        console.log("CART ITEMS MERGED 👉", state.items);
        state.totalItems = action.payload.data.totalItems;
        state.totalPrice = action.payload.data.totalPrice;
      })

      /* FETCH */
      .addCase(fetchCartAPI.fulfilled, (state, action) => {
        const cart = action.payload.data;
        //console.log("CART API RESPONSE 👉", action.payload.data.items);
        state.totalItems = cart.totalItems;
        state.totalPrice = cart.totalPrice;
        state.items = action.payload.data.items
      })

      /* CLEAR */
      .addCase(clearCartAPI.fulfilled, (state) => {
        state.items = [];
        state.totalItems = 0;
        state.totalPrice = 0;
      });
  },
});

export default cartSlice.reducer;
