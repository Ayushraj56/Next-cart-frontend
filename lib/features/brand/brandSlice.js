import { createSlice } from "@reduxjs/toolkit";

const brandSlice = createSlice({
  name: "brand",
  initialState: {
    list: [],
  },
  reducers: {
    setBrands: (state, action) => {
      state.list = action.payload;
    },
  },
});

export const { setBrands } = brandSlice.actions;

export default brandSlice.reducer;