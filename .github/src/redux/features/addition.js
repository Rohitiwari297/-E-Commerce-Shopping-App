import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  addition: [], // cart items array
};

const AdditionSlice = createSlice({
  name: "additionSlice",
  initialState,
  reducers: {
    addToAddition: (state, action) => {
      state.addition.push(action.payload); // add item
    },
    removeFromAddition: (state, action) => {
      // remove only one occurrence by id
      const index = state.addition.findIndex(item => item.id === action.payload.id);
      if (index !== -1) state.addition.splice(index, 1);
    },
  },
});

export const { addToAddition, removeFromAddition } = AdditionSlice.actions;
export default AdditionSlice.reducer;
