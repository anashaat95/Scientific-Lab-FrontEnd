import ApiClientFrontEnd from "@/clients/ApiClientFrontEnd";
import { jwtDecode } from "jwt-decode";

export function addTokens(data: any) {
  const { accessToken, refreshToken } = data;
  localStorage.setItem("accessToken", accessToken?.token);
  localStorage.setItem("refreshToken", refreshToken?.token);
  localStorage.setItem("accessTokenExpiry", new Date(accessToken?.expiresIn).toString());
  localStorage.setItem("refreshTokenExpiry", new Date(refreshToken?.expiresIn).toString());
}

export function clearTokens() {
  localStorage.removeItem("accessToken");
  localStorage.removeItem("refreshToken");
  localStorage.removeItem("accessTokenExpiry");
  localStorage.removeItem("refreshTokenExpiry");
}

export const isTokenExpired = (token: string) => {
  try {
    const decoded: any = jwtDecode(token);
    const currentTime = Date.now() / 1000; // Current time in seconds
    return decoded.exp < currentTime; // Check if the token is expired
  } catch (error) {
    return true; // If decoding fails, assume the token is expired
  }
};

export const updateAccessTokenBasedOnRefreshToken = async () => {
  const refreshToken = localStorage.getItem("refreshToken");

  if (!refreshToken) {
    return;
    //throw new Error("No refresh token found");
  }

  try {
    const { data } = await ApiClientFrontEnd.post(`auth/refresh/${refreshToken}`);
    const accessToken = data?.data?.accessToken?.token;
    addTokens(data?.data);

    return accessToken;
  } catch (error) {
    //console.error("Failed to refresh token:", error);
    clearTokens();
    throw error;
  }
};
