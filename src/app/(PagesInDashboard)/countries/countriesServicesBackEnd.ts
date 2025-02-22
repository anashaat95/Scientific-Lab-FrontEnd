import ApiClientBackEnd from "@/clients/ApiClientBackEnd";
import { COUNTRIES_BACKEND_ENDPOINT } from "./countriesConsts";

export const getAllCountriesService = async () => {
  const response = await ApiClientBackEnd.get(COUNTRIES_BACKEND_ENDPOINT);
  return response.data;
};

export const getAllCountriesOptionsService = async () => {
  const response = await ApiClientBackEnd.get(COUNTRIES_BACKEND_ENDPOINT + "/options");
  return response.data;
};

export const getCountryByIdService = async (id: string) => {
  const response = await ApiClientBackEnd.get(`${COUNTRIES_BACKEND_ENDPOINT}/${id}`);
  return response.data;
};
