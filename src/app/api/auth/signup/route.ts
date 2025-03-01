import ApiClientBackEnd from "@/clients/ApiClientBackEnd";
import { NextResponse } from "next/server";
import { generateErrorResponse } from "../../helpers";

//Login
export async function POST(req: Request) {
  const data = await req.formData();
  data;
  try {
    const response = await ApiClientBackEnd.post(`auth/signup`, data, { headers: { "Content-Type": "multipart/form-data" } });
    response.data.email = data.get("email");
    return NextResponse.json(response.data);
  } catch (error: any) {
    return generateErrorResponse(error);
  }
}
