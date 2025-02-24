import ApiClientBackEnd from "@/clients/ApiClientBackEnd";
import { NextResponse } from "next/server";
import { generateErrorResponse } from "../../helpers";

//Addcity
export async function GET() {
  try {
    const response = await ApiClientBackEnd.get(`me`);
    return NextResponse.json(response.data);
  } catch (error: any) {
    return generateErrorResponse(error);
  }
}
