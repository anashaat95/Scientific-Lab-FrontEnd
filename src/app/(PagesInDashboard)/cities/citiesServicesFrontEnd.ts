import ApiClientFrontEnd from "@/clients/ApiClientFrontEnd";
import { IHaveIdEntity } from "@/interfaces";
import { IAddCityFormInput, IEditCityFormInput } from "./citiesInterfaces";

const ENDPOINT = "city";

export const addCityService = async (data: IAddCityFormInput) => {
  const response = await ApiClientFrontEnd.post(ENDPOINT, data);
  return response.data;
};

export const editCityService = async ({ id, data }: { id: string; data: IEditCityFormInput }) => {
  if (!id) throw new Error("You must provide Id");
  const response = await ApiClientFrontEnd.put(`${ENDPOINT}/${id}`, data);
  return response.data;
};

export const deleteCityService = async ({ id }: IHaveIdEntity) => {
  if (!id) throw new Error("You must provide Id");
  const response = await ApiClientFrontEnd.delete(`${ENDPOINT}/${id}`);
  return response.data;
};
