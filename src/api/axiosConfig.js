import axios from "axios";

const baseURL = "";

const axiosInstance = axios.create({
  baseURL: baseURL,
});

export default axiosInstance;
