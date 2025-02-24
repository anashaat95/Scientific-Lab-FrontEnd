import ApiClientBackEnd from "@/clients/ApiClientBackEnd";
import { NextResponse } from "next/server";
import { generateErrorResponse } from "../../helpers";

//Addcity
export async function PUT() {
  try {
    const response = await ApiClientBackEnd.get(`auth/update-email`);
    return NextResponse.json(response.data);
  } catch (error: any) {
    return generateErrorResponse(error);
  }
}
