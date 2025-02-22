import ApiClientBackEnd from "@/clients/ApiClientBackEnd";
import { LABS_BACKEND_ENDPOINT } from "./labsConsts";

export const getAllLabsService = async () => {
  const response = await ApiClientBackEnd.get(LABS_BACKEND_ENDPOINT);
  return response.data;
};

export const getAllLabsOptionsService = async () => {
  const response = await ApiClientBackEnd.get(LABS_BACKEND_ENDPOINT + "/options");
  return response.data;
};

export const getLabByIdService = async (id: string) => {
  const response = await ApiClientBackEnd.get(`${LABS_BACKEND_ENDPOINT}/${id}`);
  return response.data;
};
