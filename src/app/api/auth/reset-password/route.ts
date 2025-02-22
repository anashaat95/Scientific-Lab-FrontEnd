import ApiClientBackEnd from "@/clients/ApiClientBackEnd";
import { NextResponse } from "next/server";
import { generateErrorResponse } from "../../helpers";

//Logout
export async function POST(req: Request) {
  const { user_id, token, new_password } = await req.json();

  try {
    const response = await ApiClientBackEnd.post(`auth/reset-password`, { user_id, token, new_password });
    return NextResponse.json(response.data);
  } catch (error: any) {
    return generateErrorResponse(error);
  }
}
