import API from "./axios";

export const getBrands = () => API.get("/brand");