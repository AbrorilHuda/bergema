import axios from "axios";
import { API_KEY } from "@env";

export const axiosInstance = axios.create({
  baseURL: "https://api.pitucode.com",
  headers: {
    "Content-Type": "application/json",
    "x-api-key": API_KEY,
  },
});

// axiosInstance.interceptors.request.use((config) => {
//   if (!config.params) {
//     config.params = {};
//   }
//   config.params.apikey = API_KEY;

//   return config;
// });
