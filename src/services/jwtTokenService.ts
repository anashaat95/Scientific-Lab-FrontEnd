import { enUserRoles } from "@/app/(PagesInDashboard)/roles/rolesInterfaces";
import ApiClientBackEnd from "@/clients/ApiClientBackEnd";
import { JWT_SECRET } from "@/consts";
import jwt from "jsonwebtoken";
import { cookies } from "next/headers";

interface IJwtTokenPayload {
  email: string;
  nameid: string;
  sub: string;
  exp: number; // Expiry time (Unix timestamp)
  iss: number; // Issuer
  aud: number; // Audience
  "http://schemas.microsoft.com/ws/2008/06/identity/claims/role": string[];
}

const isTokenExpired = (token: string): boolean => {
  try {
    const decoded = jwt.decode(token) as unknown as IJwtTokenPayload;
    if (!decoded?.exp) return true;
    return Math.floor(Date.now() / 1000) >= decoded.exp;
  } catch {
    return true;
  }
};

export const GetJwtTokenPayload = async (): Promise<IJwtTokenPayload | null> => {
  let accessToken = cookies().get("accessToken")?.value;

  if (!accessToken) return null;

  if (isTokenExpired(accessToken)) {
    try {
      await ApiClientBackEnd.post("refresh");
      accessToken = cookies().get("accessToken")?.value;
    } catch (error: any) {
      console.log("Failure during refreshing access token", error.message);
      return null;
    }
  }

  try {
    const payload = jwt.verify(accessToken as string, JWT_SECRET as string);

    if (typeof payload === "string") {
      console.log("Invalid token format, expected an object.");
      return null;
    }

    const decoded = payload as unknown as IJwtTokenPayload;
    return decoded;
  } catch (error) {
    console.error("Invalid Token:", error);
    return null;
  }
};

export const isAuthorized = async (roles: string[]): Promise<Boolean> => {
  const token: IJwtTokenPayload | null = await GetJwtTokenPayload();
  if (!token) return false;
  const currentUserRoles = token["http://schemas.microsoft.com/ws/2008/06/identity/claims/role"];

  if (roles.some((role) => currentUserRoles.includes(enUserRoles[Number(role)]))) return true;

  return false;
};
