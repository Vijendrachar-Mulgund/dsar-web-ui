import axios from "axios";

export const axiosInstance = axios.create({
  baseURL: `${import.meta.env.VITE_DSAR_BASE_URL}/${import.meta.env.VITE_DSAR_API_VERSION}/api`,
  headers: {
    Accept: "application/json",
    "Content-Type": "application/json",
  },
  withCredentials: true,
});
