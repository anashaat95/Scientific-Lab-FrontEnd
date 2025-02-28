import ApiClientFrontEnd from "@/clients/ApiClientFrontEnd";
import { IHaveIdEntity } from "@/interfaces";
import { USERS_BACKEND_ENDPOINT } from "./usersConsts";
import { IAddUserFormInput, IUpdateUserFormInput } from "./usersInterfaces";

export const addUserService = async (data: IAddUserFormInput) => {
  const formData = new FormData();

  Object.entries(data).forEach(([key, value]) => {
    if (value !== null) formData.append(`Data.${key}`, value);
  });

  const response = await ApiClientFrontEnd.post(USERS_BACKEND_ENDPOINT, formData, { headers: { "Content-Type": "multipart/form-data" } });
  return response.data;
};

export const updateUserService = async ({ id, data }: { id: string; data: IUpdateUserFormInput }) => {
  if (!id) throw new Error("You must provide Id");
  const formData = new FormData();

  Object.entries(data).forEach(([key, value]) => {
    if (value !== null) formData.append(`Data.${key}`, value);
  });

  const response = await ApiClientFrontEnd.put(`${USERS_BACKEND_ENDPOINT}/${id}`, formData, { headers: { "Content-Type": "multipart/form-data" } });
  return response.data;
};

export const deleteUserService = async ({ id }: IHaveIdEntity) => {
  if (!id) throw new Error("You must provide Id");
  const response = await ApiClientFrontEnd.delete(`${USERS_BACKEND_ENDPOINT}/${id}`);
  return response.data;
};
