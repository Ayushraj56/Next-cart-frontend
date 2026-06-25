import { getBrands } from "@/lib/api/brandApi";
import { setBrands } from "@/lib/features/brand/brandSlice";

export const fetchBrands = () => async (dispatch) => {
  try {
    const res = await getBrands();

    dispatch(setBrands(res.data));
  } catch (error) {
    console.log(error);
  }
};