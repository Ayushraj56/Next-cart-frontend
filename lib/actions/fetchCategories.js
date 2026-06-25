import { getCategories } from "@/lib/api/categoryApi";
import { setCategories } from "@/lib/features/category/categorySlice";

export const fetchCategories = () => async (dispatch) => {
  try {
    const res = await getCategories();

    dispatch(setCategories(res.data));
  } catch (error) {
    console.log(error);
  }
};