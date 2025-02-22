import ApiClientFrontEnd from "@/clients/ApiClientFrontEnd";
import { IHaveIdEntity } from "@/interfaces";
import { EQUIPMENTS_BACKEND_ENDPOINT } from "./equipmentsConsts";
import { IAddEquipmentFormInput, IEditEquipmentFormInput } from "./equipmentsInterfaces";

export const addEquipmentService = async (data: IAddEquipmentFormInput) => {
  const response = await ApiClientFrontEnd.post(EQUIPMENTS_BACKEND_ENDPOINT, data);
  return response.data;
};

export const editEquipmentService = async ({ id, data }: { id: string; data: IEditEquipmentFormInput }) => {
  if (!id) throw new Error("You must provide Id");
  const response = await ApiClientFrontEnd.put(`${EQUIPMENTS_BACKEND_ENDPOINT}/${id}`, data);
  return response.data;
};

export const deleteEquipmentService = async ({ id }: IHaveIdEntity) => {
  if (!id) throw new Error("You must provide Id");

  const response = await ApiClientFrontEnd.delete(`${EQUIPMENTS_BACKEND_ENDPOINT}/${id}`);
  return response.data;
};
