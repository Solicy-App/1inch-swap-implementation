import axios, { AxiosError } from "axios";

const axios1Inch = axios.create({
  baseURL: "",
  headers: {
    Authorization: `Bearer oYtJS37LUR9zy6jylTaeVKlpGZrRffE9`,
    accept: "application/json",
    "Access-Control-Allow-Origin": "*",
  },
});

axios1Inch.interceptors.response.use(
  (response) => response,
  async (error: AxiosError) => {
    if (error.response && error.response.status === 429) {
      // If status code is 429, wait for 1 second and retry the request
      if (!error.config) return;

      await new Promise((resolve) => setTimeout(resolve, 1000)); // 1000 ms = 1 second
      return axios1Inch.request(error.config); // Retry the request
    }
    return Promise.reject(error);
  }
);

export default axios1Inch;
