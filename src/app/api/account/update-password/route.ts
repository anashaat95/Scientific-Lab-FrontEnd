import ApiClientBackEnd from "@/clients/ApiClientBackEnd";
import { NextResponse } from "next/server";
import { generateErrorResponse } from "../../helpers";

//Update username
export async function PUT(req: Request) {
  const data = await req.json();
  console.log(data);
  try {
    const response = await ApiClientBackEnd.put(`auth/update-password`, data);
    return NextResponse.json(response.data);
  } catch (error: any) {
    return generateErrorResponse(error);
  }
}
