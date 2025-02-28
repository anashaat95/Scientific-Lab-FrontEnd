import ApiClientBackEnd from "@/clients/ApiClientBackEnd";
import { NextResponse } from "next/server";
import { generateErrorResponse } from "../../helpers";

//Update username
export async function PUT(req: Request) {
  const data = await req.formData();
  try {
    const response = await ApiClientBackEnd.put(`auth/update-profile`, data, {
      headers: { "Content-Type": "multipart/form-data" },
    });
    return NextResponse.json(response.data);
  } catch (error: any) {
    return generateErrorResponse(error);
  }
}
