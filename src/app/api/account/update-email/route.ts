import ApiClientBackEnd from "@/clients/ApiClientBackEnd";
import { NextResponse } from "next/server";
import { generateErrorResponse } from "../../helpers";

// Update Email
export async function PUT(req: Request) {
  const data = await req.json();
  try {
    const response = await ApiClientBackEnd.put(`auth/update-email`, data);
    return NextResponse.json(response.data);
  } catch (error: any) {
    return generateErrorResponse(error);
  }
}
