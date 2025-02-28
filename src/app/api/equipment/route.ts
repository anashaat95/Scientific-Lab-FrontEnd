import ApiClientBackEnd from "@/clients/ApiClientBackEnd";
import { NextResponse } from "next/server";
import { generateErrorResponse } from "../helpers";

//AddEquipment
export async function POST(req: Request) {
  const data = await req.formData();
  console.log(data);
  try {
    const response = await ApiClientBackEnd.post(`equipment`, data, { headers: { "Content-Type": "multipart/form-data" } });
    return NextResponse.json(response.data);
  } catch (error: any) {
    return generateErrorResponse(error);
  }
}
