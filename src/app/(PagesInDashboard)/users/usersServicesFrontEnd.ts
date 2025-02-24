import { ISignupFormInput } from "@/app/(Authentication)/authInterfaces";
import ApiClientFrontEnd from "@/clients/ApiClientFrontEnd";
import { IHaveIdEntity } from "@/interfaces";
import { USERS_BACKEND_ENDPOINT } from "./usersConsts";
import { IAddUserFormInput } from "./usersInterfaces";

const ENDPOINT = "user";

export const addUserService = async (data: IAddUserFormInput) => {
  const response = await ApiClientFrontEnd.post(USERS_BACKEND_ENDPOINT, data);
  return response.data;
};

export const updateUserService = async ({ id, data }: { id: string; data: ISignupFormInput }) => {
  if (!id) throw new Error("You must provide Id");
  const response = await ApiClientFrontEnd.put(`${USERS_BACKEND_ENDPOINT}/${id}`, data);
  return response.data;
};

export const deleteUserService = async ({ id }: IHaveIdEntity) => {
  if (!id) throw new Error("You must provide Id");
  const response = await ApiClientFrontEnd.delete(`${USERS_BACKEND_ENDPOINT}/${id}`);
  return response.data;
};
