import ApiClientFrontEnd from "@/clients/ApiClientFrontEnd";
import { IHaveIdEntity } from "@/interfaces";
import { DEPARTMENTS_BACKEND_ENDPOINT } from "./departmentsConsts";
import { IAddDepartmentFormInput, IUpdateDepartmentFormInput } from "./departmentsInterfaces";

export const addDepartmentService = async (data: IAddDepartmentFormInput) => {
  const response = await ApiClientFrontEnd.post(DEPARTMENTS_BACKEND_ENDPOINT, data);
  return response.data;
};

export const updateDepartmentService = async ({ id, data }: { id: string; data: IUpdateDepartmentFormInput }) => {
  if (!id) throw new Error("You must provide Id");
  const response = await ApiClientFrontEnd.put(`${DEPARTMENTS_BACKEND_ENDPOINT}/${id}`, data);
  return response.data;
};

export const deleteDepartmentService = async ({ id }: IHaveIdEntity) => {
  if (!id) throw new Error("You must provide Id");
  const response = await ApiClientFrontEnd.delete(`${DEPARTMENTS_BACKEND_ENDPOINT}/${id}`);
  return response.data;
};
