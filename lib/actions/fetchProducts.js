import {
  setProduct,
  setPagination,
  setLoading,
  setError,
} from "@/lib/features/product/productSlice";
import { baseAPI } from "@/lib/constants";

export const fetchProducts =
  (
    page = 1,
    limit = 20,
    categoryId = "",
    brandId = "",
    sortBy = "",
    search = ""  
  ) =>
    async (dispatch) => {
      dispatch(setLoading(true));

      try {
        // ✅ Only add params that have actual values
        const params = new URLSearchParams();
        params.append("page", page);
        params.append("limit", limit);
        if (categoryId) params.append("categoryId", categoryId);
        if (brandId) params.append("brandId", brandId);
        if (sortBy) params.append("sortBy", sortBy);
        if (search) params.append("search", search);

        const response = await fetch(
          `${baseAPI}/api/product?${params.toString()}`
        );

        const data = await response.json();

        dispatch(setProduct(data.products));
        dispatch(setPagination(data.pagination));
      } catch (error) {
        console.log(error);
        dispatch(setError(error.message));
      } finally {
        dispatch(setLoading(false));
      }
    };