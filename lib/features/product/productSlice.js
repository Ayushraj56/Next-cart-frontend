import { createSlice } from "@reduxjs/toolkit";

const productSlice = createSlice({
  name: "product",

  initialState: {
    list: [],
    pagination: null,
    loading: false,
    error: null,
  },

  reducers: {
    setProduct: (state, action) => {
      state.list = action.payload;
      state.loading = false;
      state.error = null;
    },

    setPagination: (state, action) => {
      state.pagination = action.payload;
    },

    clearProduct: (state) => {
      state.list = [];
      state.pagination = null;
    },

    setLoading: (state, action) => {
      state.loading = action.payload;
    },

    setError: (state, action) => {
      state.error = action.payload;
      state.loading = false;
    },
  },
});

export const {
  setProduct,
  setPagination,
  clearProduct,
  setLoading,
  setError,
} = productSlice.actions;

export default productSlice.reducer;