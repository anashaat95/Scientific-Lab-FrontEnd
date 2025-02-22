import ApiClientBackEnd from "@/clients/ApiClientBackEnd";
import { NextResponse } from "next/server";
import { generateErrorResponse } from "../helpers";

//AddMaintenanceLog
export async function POST(req: Request) {
  const data = await req.json();
  try {
    const response = await ApiClientBackEnd.post(`MaintenanceLog`, data);
    return NextResponse.json(response.data);
  } catch (error: any) {
    return generateErrorResponse(error);
  }
}
