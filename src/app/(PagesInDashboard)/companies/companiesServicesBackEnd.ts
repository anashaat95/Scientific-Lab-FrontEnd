import ApiClientBackEnd from "@/clients/ApiClientBackEnd";
import { COMPANIES_BACKEND_ENDPOINT } from "./companiesConsts";

export const getAllCompaniesService = async () => {
  const response = await ApiClientBackEnd.get(COMPANIES_BACKEND_ENDPOINT);
  return response.data;
};

export const getAllCompaniesOptionsService = async () => {
  const response = await ApiClientBackEnd.get(COMPANIES_BACKEND_ENDPOINT + "/options");
  return response.data;
};

export const getCompanyByIdService = async (id: string) => {
  const response = await ApiClientBackEnd.get(`${COMPANIES_BACKEND_ENDPOINT}/${id}`);
  return response.data;
};
