import ApiClientBackEnd from "@/clients/ApiClientBackEnd";
import { EQUIPMENTS_BACKEND_ENDPOINT } from "./equipmentsConsts";

export const getAllEquipmentsService = async () => {
  const response = await ApiClientBackEnd.get(EQUIPMENTS_BACKEND_ENDPOINT);
  return response.data;
};

export const getAllEquipmentsOptionsService = async () => {
  const response = await ApiClientBackEnd.get(EQUIPMENTS_BACKEND_ENDPOINT + "/options");
  return response.data;
};

export const getEquipmentByIdService = async (id: string) => {
  const response = await ApiClientBackEnd.get(`${EQUIPMENTS_BACKEND_ENDPOINT}/${id}`);
  return response.data;
};
