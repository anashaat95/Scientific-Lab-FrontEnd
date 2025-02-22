import ApiClientBackEnd from "@/clients/ApiClientBackEnd";
import { ROLES_BACKEND_ENDPOINT } from "./rolesConsts";

export const getAllRolesService = async () => {
  const response = await ApiClientBackEnd.get(ROLES_BACKEND_ENDPOINT);
  return response.data;
};
