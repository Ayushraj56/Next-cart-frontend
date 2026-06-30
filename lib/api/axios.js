import axios from "axios";
import { baseAPI } from "@/lib/constants";

const API = axios.create({
  baseURL: `${baseAPI}/api`,
});

export default API;