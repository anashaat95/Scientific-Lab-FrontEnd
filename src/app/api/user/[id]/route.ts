import ApiClientBackEnd from "@/clients/ApiClientBackEnd";
import { NextResponse } from "next/server";
import { generateErrorResponse } from "../../helpers";

//UpdateUser
export async function PUT(req: Request, { params }: { params: { id: string } }) {
  const { id } = params;

  const data = await req.json();

  try {
    const response = await ApiClientBackEnd.put(`user/${id}`, data);
    return NextResponse.json(response.data);
  } catch (error: any) {
    return generateErrorResponse(error);
  }
}

//UpdateUser
export async function DELETE(req: Request, { params }: { params: { id: string } }) {
  const { id } = params;

  try {
    const response = await ApiClientBackEnd.delete(`user/${id}`);
    return NextResponse.json(response.data);
  } catch (error: any) {
    return generateErrorResponse(error);
  }
}
