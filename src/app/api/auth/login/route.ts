import ApiClientBackEnd from "@/clients/ApiClientBackEnd";
import { createNextLoginResponse, generateErrorResponse } from "../../helpers";

//Login
export async function POST(req: Request) {
  let rememberMe = false;
  const data = await req.json();
  const { email, password } = data;
  if (data?.rememberMe) rememberMe = true;

  try {
    const response = await ApiClientBackEnd.post("auth/login", { email, password, rememberMe });

    return await createNextLoginResponse(response, rememberMe);
  } catch (error: any) {
    return generateErrorResponse(error);
  }
}
