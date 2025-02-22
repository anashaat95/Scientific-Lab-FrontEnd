import ApiClientBackEnd from "@/clients/ApiClientBackEnd";
import { MAINTENANCE_LOGS_BACKEND_ENDPOINT } from "./MaintenanceLogsConsts";

export const getAllMaintenanceLogsService = async () => {
  const response = await ApiClientBackEnd.get(MAINTENANCE_LOGS_BACKEND_ENDPOINT);
  return response.data;
};

export const getMaintenanceLogByIdService = async (id: string) => {
  const response = await ApiClientBackEnd.get(`${MAINTENANCE_LOGS_BACKEND_ENDPOINT}/${id}`);
  return response.data;
};
