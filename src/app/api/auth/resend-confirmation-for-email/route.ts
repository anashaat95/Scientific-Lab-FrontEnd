import ApiClientBackEnd from "@/clients/ApiClientBackEnd";
import { NextResponse } from "next/server";
import { generateErrorResponse } from "../../helpers";

//resend-confirmation-for-email
export async function POST(req: Request) {
  const { email } = await req.json();

  try {
    const response = await ApiClientBackEnd.post(`auth/resend-confirmation-for-email`, { email });
    return NextResponse.json(response.data);
  } catch (error: any) {
    return generateErrorResponse(error);
  }
}
