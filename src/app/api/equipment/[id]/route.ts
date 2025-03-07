import ApiClientBackEnd from "@/clients/ApiClientBackEnd";
import { NextResponse } from "next/server";
import { generateErrorResponse } from "../../helpers";

//Update Equipment
export async function PUT(req: Request, { params }: { params: { id: string } }) {
  const { id } = params;

  const data = await req.formData();

  try {
    const response = await ApiClientBackEnd.put(`equipment/${id}`, data, { headers: { "Content-Type": "multipart/form-data" } });
    return NextResponse.json(JSON.stringify({}));
  } catch (error: any) {
    return generateErrorResponse(error);
  }
}

//Delete Equipment
export async function DELETE(req: Request, { params }: { params: { id: string } }) {
  const { id } = params;
  try {
    const response = await ApiClientBackEnd.delete(`equipment/${id}`);
    return NextResponse.json(response.data);
  } catch (error: any) {
    return generateErrorResponse(error);
  }
}
