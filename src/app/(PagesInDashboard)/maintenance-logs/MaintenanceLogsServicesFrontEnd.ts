import ApiClientFrontEnd from "@/clients/ApiClientFrontEnd";
import { IHaveIdEntity } from "@/interfaces";
import { MAINTENANCE_LOGS_BACKEND_ENDPOINT } from "./MaintenanceLogsConsts";
import { IAddMaintenanceLogFormInput, IUpdateMaintenanceLogFormInput } from "./MaintenanceLogsInterfaces";

export const addMaintenanceLogService = async (data: IAddMaintenanceLogFormInput) => {
  const response = await ApiClientFrontEnd.post(MAINTENANCE_LOGS_BACKEND_ENDPOINT, data);
  return response.data;
};

export const updateMaintenanceLogService = async ({ id, data }: { id: string; data: IUpdateMaintenanceLogFormInput }) => {
  if (!id) throw new Error("You must provide Id");
  const response = await ApiClientFrontEnd.put(`${MAINTENANCE_LOGS_BACKEND_ENDPOINT}/${id}`, data);
  return response.data;
};

export const deleteMaintenanceLogService = async ({ id }: IHaveIdEntity) => {
  if (!id) throw new Error("You must provide Id");
  const response = await ApiClientFrontEnd.delete(`${MAINTENANCE_LOGS_BACKEND_ENDPOINT}/${id}`);
  return response.data;
};
