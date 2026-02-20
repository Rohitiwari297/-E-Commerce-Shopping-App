import { createSlice } from "@reduxjs/toolkit";

const savedAddresses = JSON.parse(localStorage.getItem("addresses")) || [];
const savedSelected = JSON.parse(localStorage.getItem("selectedAddress")) || null;

const addressSlice = createSlice({
  name: "address",
  initialState: {
    addressList: savedAddresses,
    selectedAddress: savedSelected,
  },

  reducers: {
    addAddress: (state, action) => {
      const newAddress = { id: Date.now(), ...action.payload };
      state.addressList.push(newAddress);

      localStorage.setItem("addresses", JSON.stringify(state.addressList));
    },

    deleteAddress: (state, action) => {
      state.addressList = state.addressList.filter(
        (addr) => addr.id !== action.payload
      );

      localStorage.setItem("addresses", JSON.stringify(state.addressList));
    },

    updateAddress: (state, action) => {
      const { id, ...rest } = action.payload;
      const index = state.addressList.findIndex((a) => a.id === id);

      if (index !== -1) {
        state.addressList[index] = { ...state.addressList[index], ...rest };
      }

      localStorage.setItem("addresses", JSON.stringify(state.addressList));
    },

    selectAddress: (state, action) => {
      state.selectedAddress = action.payload;
      localStorage.setItem("selectedAddress", JSON.stringify(state.selectedAddress));
    },
  },
});

export const {
  addAddress,
  deleteAddress,
  updateAddress,
  selectAddress,
} = addressSlice.actions;
export default addressSlice.reducer;
