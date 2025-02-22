import ApiClientBackEnd from "@/clients/ApiClientBackEnd";
import { CITIES_BACKEND_ENDPOINT } from "./citiesConsts";

export const getAllCitiesService = async () => {
  const response = await ApiClientBackEnd.get(CITIES_BACKEND_ENDPOINT);
  return response.data;
};

export const getAllCitiesOptionsService = async () => {
  const response = await ApiClientBackEnd.get(CITIES_BACKEND_ENDPOINT + "/options");
  return response.data;
};

export const getCityByIdService = async (id: string) => {
  const response = await ApiClientBackEnd.get(`${CITIES_BACKEND_ENDPOINT}/${id}`);
  return response.data;
};
