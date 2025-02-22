import ApiClientBackEnd from "@/clients/ApiClientBackEnd";
import { NextResponse } from "next/server";
import { generateErrorResponse } from "../../helpers";

//Updatecountry
export async function PUT(req: Request, { params }: { params: { id: string } }) {
  const { id } = params;

  const data = await req.json();

  try {
    const response = await ApiClientBackEnd.put(`country/${id}`, data);
    return NextResponse.json(response.data);
  } catch (error: any) {
    return generateErrorResponse(error);
  }
}

//Updatecountry
export async function DELETE(req: Request, { params }: { params: { id: string } }) {
  const { id } = params;

  try {
    const response = await ApiClientBackEnd.delete(`country/${id}`);
    return NextResponse.json(response.data);
  } catch (error: any) {
    return generateErrorResponse(error);
  }
}
