import axios from "axios";
import https from "https";
import { cookies } from "next/headers";

const ApiClientBackEnd = axios.create({
  baseURL: process.env.API_BASE_URL,
  withCredentials: true,
  timeout: Number(process.env.API_CALL_TIMEOUT) || 10000,
  httpsAgent: new https.Agent({
    rejectUnauthorized: process.env.NODE_ENV !== "development",
  }),
});

ApiClientBackEnd.interceptors.request.use((config) => {
  const accessToken = cookies().get("accessToken")?.value; // Get token from cookies

  if (accessToken) {
    config.headers["Authorization"] = `Bearer ${accessToken}`; // Attach token dynamically
  }

  return config;
});

ApiClientBackEnd.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.code === "ECONNREFUSED") error.message = "Network error: the backend server is not responding. Please contact the administrator";
    return Promise.reject(error);
  }
);

export default ApiClientBackEnd;
