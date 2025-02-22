import ApiClientBackEnd from "@/clients/ApiClientBackEnd";
import { NextRequest, NextResponse } from "next/server";
import { createNextLoginResponse, generateErrorResponse, getAuthHeaders } from "../../helpers";

//Refresh
export async function POST(req: NextRequest) {
  try {
    const refreshToken = req.cookies.get("refreshToken")?.value;

    if (!refreshToken) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    const response = await ApiClientBackEnd.post(
      `auth/refresh-token/${refreshToken}`,
      {},
      {
        headers: getAuthHeaders(req),
        withCredentials: true,
      }
    );
    return createNextLoginResponse(response, false);
  } catch (error: any) {
    return generateErrorResponse(error);
  }
}
