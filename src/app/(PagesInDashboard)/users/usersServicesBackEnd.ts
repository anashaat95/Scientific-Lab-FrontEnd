import ApiClientBackEnd from "@/clients/ApiClientBackEnd";
import {
  LABS_SUPERVISOR_BACKEND_ENDPOINT,
  RESEARCHER_BACKEND_ENDPOINT as RESEARCHERS_BACKEND_ENDPOINT,
  TECHNICIANS_BACKEND_ENDPOINT,
  USERS_BACKEND_ENDPOINT,
} from "./usersConsts";

export const getAllUsersService = async () => {
  const response = await ApiClientBackEnd.get(USERS_BACKEND_ENDPOINT);
  return response.data;
};

export const getAllUsersOptionsService = async () => {
  const response = await ApiClientBackEnd.get(USERS_BACKEND_ENDPOINT + "/options");
  return response.data;
};

export const getAllTechniciansService = async () => {
  const response = await ApiClientBackEnd.get(TECHNICIANS_BACKEND_ENDPOINT);
  return response.data;
};

export const getAllTechniciansOptionsService = async () => {
  const response = await ApiClientBackEnd.get(TECHNICIANS_BACKEND_ENDPOINT + "/options");
  return response.data;
};

export const getAllLabSupervisorsService = async () => {
  const response = await ApiClientBackEnd.get(LABS_SUPERVISOR_BACKEND_ENDPOINT);
  return response.data;
};

export const getAllLabSupervisorsOptionsService = async () => {
  const response = await ApiClientBackEnd.get(LABS_SUPERVISOR_BACKEND_ENDPOINT + "/options");
  return response.data;
};

export const getAllResearchersService = async () => {
  const response = await ApiClientBackEnd.get(RESEARCHERS_BACKEND_ENDPOINT);
  return response.data;
};

export const getAllResearchersOptionsService = async () => {
  const response = await ApiClientBackEnd.get(RESEARCHERS_BACKEND_ENDPOINT + "/options");
  return response.data;
};

export const getUserByIdService = async (id: string) => {
  const response = await ApiClientBackEnd.get(`${USERS_BACKEND_ENDPOINT}/${id}`);
  return response.data;
};

export const getUserByFieldService = async (field: string) => {
  const response = await ApiClientBackEnd.get(`${USERS_BACKEND_ENDPOINT}/field/${field}`);
  return response.data;
};

export const userExistsByEmailService = async (email: string) => {
  const response = await ApiClientBackEnd.get(`${USERS_BACKEND_ENDPOINT}/exist?Email=${email}`);
  return response.data;
};
