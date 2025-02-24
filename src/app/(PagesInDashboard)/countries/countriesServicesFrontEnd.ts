import ApiClientFrontEnd from "@/clients/ApiClientFrontEnd";
import { IHaveIdEntity } from "@/interfaces";
import { COUNTRIES_BACKEND_ENDPOINT } from "./countriesConsts";
import { IAddCountryFormInput, IUpdateCountryFormInput } from "./countriesInterfaces";

export const addCountryService = async (data: IAddCountryFormInput) => {
  const response = await ApiClientFrontEnd.post(COUNTRIES_BACKEND_ENDPOINT, data);
  return response.data;
};

export const updateCountryService = async ({ id, data }: { id: string; data: IUpdateCountryFormInput }) => {
  if (!id) throw new Error("You must provide Id");
  const response = await ApiClientFrontEnd.put(`${COUNTRIES_BACKEND_ENDPOINT}/${id}`, data);
  return response.data;
};

export const deleteCountryService = async ({ id }: IHaveIdEntity) => {
  if (!id) throw new Error("You must provide Id");
  const response = await ApiClientFrontEnd.delete(`${COUNTRIES_BACKEND_ENDPOINT}/${id}`);
  return response.data;
};
