import ApiClientFrontEnd from "@/clients/ApiClientFrontEnd";
import { IHaveIdEntity } from "@/interfaces";
import { COMPANIES_BACKEND_ENDPOINT } from "./companiesConsts";
import { IAddCompanyFormInput, IEditCompanyFormInput } from "./companiesInterfaces";

const ENDPOINT = "company";

export const addCompanyService = async (data: IAddCompanyFormInput) => {
  const response = await ApiClientFrontEnd.post(COMPANIES_BACKEND_ENDPOINT, data);
  return response.data;
};

export const editCompanyService = async ({ id, data }: { id: string; data: IEditCompanyFormInput }) => {
  if (!id) throw new Error("You must provide Id");
  const response = await ApiClientFrontEnd.put(`${COMPANIES_BACKEND_ENDPOINT}/${id}`, data);
  return response.data;
};

export const deleteCompanyService = async ({ id }: IHaveIdEntity) => {
  if (!id) throw new Error("You must provide Id");
  const response = await ApiClientFrontEnd.delete(`${COMPANIES_BACKEND_ENDPOINT}/${id}`);
  return response.data;
};
