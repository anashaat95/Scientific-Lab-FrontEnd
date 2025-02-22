import ApiClientBackEnd from "@/clients/ApiClientBackEnd";
import { NextResponse } from "next/server";
import { generateErrorResponse } from "../helpers";

//AddEquipment
export async function POST(req: Request) {
  const data = await req.json();
  try {
    const response = await ApiClientBackEnd.post(`equipment`, data);
    return NextResponse.json(response.data);
  } catch (error: any) {
    return generateErrorResponse(error);
  }
}
