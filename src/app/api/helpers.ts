import ApiClientBackEnd from "@/clients/ApiClientBackEnd";
import { IFetcherData } from "@/interfaces";
import { fetcherFn } from "@/services/sharedServices";
import { AxiosResponse } from "axios";
import { NextRequest, NextResponse } from "next/server";
import { getMeService } from "../(Authentication)/authServicesServer";
import { timeMinusNowInSeconds } from "../helpers";
import { ILoginResponse } from "./interfaces";

interface ISetCookieProps {
  res: NextResponse<any>;
  key: string;
  value: string;
  maxAge?: number;
}

interface IDeleteCookieProps {
  res: NextResponse<any>;
  key: string;
}

export const setCookiesInResponse = ({ res, key, value, maxAge = 0 }: ISetCookieProps) => {
  res.cookies.set(key, value, {
    httpOnly: true,
    secure: true,
    sameSite: "none",
    path: "/",
    maxAge: maxAge, // seconds
  });
};

export const deleteCookiesInResponse = ({ res, key }: IDeleteCookieProps) => {
  setCookiesInResponse({ res, key, value: "" });
};

export const getAuthHeaders = (req: NextRequest) => {
  const accessToken = req.cookies.get("accessToken")?.value;
  return accessToken ? { Authorization: `Bearer ${accessToken}` } : {};
};

export const createNextLoginResponse = async (response: AxiosResponse<any, any>, rememberMe: Boolean) => {
  if (response.data?.message?.includes("confirmed")) throw response.data;
  const { accessToken, refreshToken }: ILoginResponse = response.data?.data;

  const accessTokenExpiryInSec = timeMinusNowInSeconds(accessToken.expiresIn);
  const refreshTokenExpiryInSec = timeMinusNowInSeconds(refreshToken.expiresIn);

  ApiClientBackEnd.defaults.headers.common["Authorization"] = `Bearer ${accessToken.token}`;

  const data: IFetcherData = await fetcherFn(getMeService);
  const res = new NextResponse(JSON.stringify({ message: "Login successful", isAuthenticated: true, currentUser: data?.data?.data }), {
    status: 200,
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${accessToken.token}`,
    },
  });

  setCookiesInResponse({ res, key: "accessToken", value: accessToken.token, maxAge: accessTokenExpiryInSec });
  setCookiesInResponse({ res, key: "refreshToken", value: refreshToken.token, maxAge: refreshTokenExpiryInSec });

  return res;
};

export const generateErrorResponse = async (error: any) => {
  let errorMessage = "";
  if (error.code === "ECONNREFUSED") {
    errorMessage = "Network error: the backend server is not responding. Please contact the administrator";
    error.status = 500;
  } else if (await error.response?.data?.title) {
    errorMessage = (await error.response?.data?.title) + " | " + JSON.stringify(await error.response?.data?.errors);
  } else if (await error.response?.data?.message) {
    errorMessage = (await error.response?.data?.message) + "\n" + (await error.response?.data?.details);
  } else {
    errorMessage = await error.response?.data?.error;
  }

  return new NextResponse(JSON.stringify({ error: errorMessage }), { status: error.status });
};
