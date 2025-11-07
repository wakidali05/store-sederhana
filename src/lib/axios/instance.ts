import axios from "axios";

const headers = {
  "Content-Type": "application/json",
  Accept: "application/json",
  "Cache-Control": "no-cache",
  Expires: 0,
};

const instance = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL,
  headers: headers,
  timeout: 60 * 1000,
});
instance.interceptors.response.use(
  (config) => config,
  (error) => Promise.reject(error)
);
instance.interceptors.request.use(
  (response) => response,
  (error) => Promise.reject(error)
);

export default instance;
