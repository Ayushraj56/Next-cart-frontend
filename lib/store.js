import { configureStore } from "@reduxjs/toolkit";

import cartReducer from "./features/cart/cartSlice";
import productReducer from "./features/product/productSlice";
import addressReducer from "./features/address/addressSlice";
import ratingReducer from "./features/rating/ratingSlice";
import categoryReducer from './features/category/categorySlice'
import brandReducer from './features/brand/brandSlice'

export const makeStore = () => {
  return configureStore({
    reducer: {
       cart: cartReducer,
    product: productReducer,
    category: categoryReducer,
    brand: brandReducer,
    address: addressReducer,
    rating: ratingReducer,
    },
  });
};