import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { getUserDetails } from "./userAPI";

// Thunk → fetch user details
export const fetchUserDetails = createAsyncThunk(
  "user/fetchUserDetails",
  async (id, thunkAPI) => {
    try {
      const res = await getUserDetails(id);
      return res.data; // API response format → { data: {...} }
    } catch (err) {
      return thunkAPI.rejectWithValue(err.response?.data || "Error fetching user");
    }
  }
);

const userSlice = createSlice({
  name: "user",
  initialState: {
    user: null,
    loading: false,
    error: null,
  },

  reducers: {
    clearUser(state) {
      state.user = null;
      state.error = null;
    },
  },

  extraReducers: (builder) => {
    builder
      .addCase(fetchUserDetails.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchUserDetails.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload; // actual user
      })
      .addCase(fetchUserDetails.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const { clearUser } = userSlice.actions;
export default userSlice.reducer;
