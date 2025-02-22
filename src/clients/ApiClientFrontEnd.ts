"use client";
import axios from "axios";

const ApiClientFrontEnd = axios.create({
  baseURL: "/api",
  headers: { "Content-Type": "application/json" },
  timeout: Number(process.env.NEXT_PUBLIC_API_CALL_TIMEOUT) || 10000,
});

// ApiClientFrontEnd.interceptors.request.use(async (request) => {
//   const accessToken = localStorage.getItem("accessToken");

//   // If the access token is expired, try refreshing it
//   if (accessToken && isTokenExpired(accessToken)) {
//     try {
//       const newAccessToken = updateAccessTokenBasedOnRefreshToken();
//       request.headers.Authorization = `Bearer ${newAccessToken}`;
//     } catch (error) {
//       return Promise.reject(error); // Prevent sending the request
//     }
//   } else if (accessToken) {
//     request.headers.Authorization = `Bearer ${accessToken}`;
//   }

//   return request;
// });

// ApiClientFrontEnd.interceptors.response.use(
//   (response) => response,
//   async (error) => {
//     const originalRequest = error.config;

//     if (error.response?.status === 401 && !originalRequest._retry) {
//       originalRequest._retry = true; // Avoid infinite loops
//       const newAccessToken = updateAccessTokenBasedOnRefreshToken();
//       originalRequest.headers.Authorization = `Bearer ${newAccessToken}`;
//     }

//     return Promise.reject(error);
//   }
// );

// Add a response interceptor
ApiClientFrontEnd.interceptors.response.use(
  (response) => response,
  (error) => Promise.reject(error)
);

export default ApiClientFrontEnd;
