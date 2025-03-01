import ApiClientFrontEnd from "@/clients/ApiClientFrontEnd";
import { IHaveIdEntity } from "@/interfaces";
import { EQUIPMENTS_BACKEND_ENDPOINT } from "./equipmentsConsts";
import { IAddEquipmentFormInput, IUpdateEquipmentFormInput } from "./equipmentsInterfaces";

export const addEquipmentService = async (data: IAddEquipmentFormInput) => {
  const formData = new FormData();
  Object.entries(data).forEach(([key, value]) => {
    if (value !== null) formData.append(`Data.${key}`, value);
  });

  const response = await ApiClientFrontEnd.post(EQUIPMENTS_BACKEND_ENDPOINT, formData, { headers: { "Content-Type": "multipart/form-data" } });

  return response.data;
};

export const updateEquipmentService = async ({ id, data }: { id: string; data: IUpdateEquipmentFormInput }) => {
  if (!id) throw new Error("You must provide Id");
  const formData = new FormData();
  Object.entries(data).forEach(([key, value]) => {
    if (value !== null) formData.append(`Data.${key}`, value);
  });

  const response = await ApiClientFrontEnd.put(`${EQUIPMENTS_BACKEND_ENDPOINT}/${id}`, formData, {
    headers: { "Content-Type": "multipart/form-data" },
  });
  return response.data;
};

export const deleteEquipmentService = async ({ id }: IHaveIdEntity) => {
  if (!id) throw new Error("You must provide Id");

  const response = await ApiClientFrontEnd.delete(`${EQUIPMENTS_BACKEND_ENDPOINT}/${id}`);
  return response.data;
};
