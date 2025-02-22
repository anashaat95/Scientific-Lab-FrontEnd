import ApiClientBackEnd from "@/clients/ApiClientBackEnd";
import { NextResponse } from "next/server";
import { deleteCookiesInResponse } from "../../helpers";

//Logout
export async function GET(req: Request) {
  let res = NextResponse.json({ message: "Logged out successfully", isAuthenticated: false });
  ApiClientBackEnd.defaults.headers.common["Authorization"] = "";
  deleteCookiesInResponse({ res, key: "accessToken" });
  deleteCookiesInResponse({ res, key: "refreshToken" });
  return res;
}
