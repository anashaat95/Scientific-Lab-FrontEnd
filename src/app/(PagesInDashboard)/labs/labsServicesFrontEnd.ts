import ApiClientFrontEnd from "@/clients/ApiClientFrontEnd";
import { IHaveIdEntity } from "@/interfaces";
import { LABS_BACKEND_ENDPOINT } from "./labsConsts";
import { IAddLabFormInput, IEditLabFormInput } from "./labsInterfaces";

export const addLabService = async (data: IAddLabFormInput) => {
  const response = await ApiClientFrontEnd.post(LABS_BACKEND_ENDPOINT, data);
  return response.data;
};

export const editLabService = async ({ id, data }: { id: string; data: IEditLabFormInput }) => {
  if (!id) throw new Error("You must provide Id");
  const response = await ApiClientFrontEnd.put(`${LABS_BACKEND_ENDPOINT}/${id}`, data);
  return response.data;
};

export const deleteLabService = async ({ id }: IHaveIdEntity) => {
  if (!id) throw new Error("You must provide Id");
  const response = await ApiClientFrontEnd.delete(`${LABS_BACKEND_ENDPOINT}/${id}`);
  return response.data;
};
