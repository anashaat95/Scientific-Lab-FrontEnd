import ApiClientBackEnd from "@/clients/ApiClientBackEnd";
import { DEPARTMENTS_BACKEND_ENDPOINT } from "./departmentsConsts";

export const getAllDepartmentsService = async () => {
  const response = await ApiClientBackEnd.get(DEPARTMENTS_BACKEND_ENDPOINT);
  return response.data;
};

export const getAllDepartmentsOptionsService = async () => {
  const response = await ApiClientBackEnd.get(DEPARTMENTS_BACKEND_ENDPOINT + "/options");
  return response.data;
};

export const getDepartmentByIdService = async (id: string) => {
  const response = await ApiClientBackEnd.get(`${DEPARTMENTS_BACKEND_ENDPOINT}/${id}`);
  return response.data;
};
