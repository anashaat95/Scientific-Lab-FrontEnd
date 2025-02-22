import ApiClientBackEnd from "@/clients/ApiClientBackEnd";
import { IUserIdAndTokenInput } from "./authInterfaces";

export const confirmEmailService = async ({ user_id, token }: IUserIdAndTokenInput) => {
  const response = await ApiClientBackEnd.get(`auth/confirm-email?user_id=${user_id}&token=${token}`);
  return response.data;
};

export const getMeService = async () => {
  const response = await ApiClientBackEnd.get("me");
  return response.data;
};
