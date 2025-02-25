"use client";
import ApiClientFrontEnd from "@/clients/ApiClientFrontEnd";
import { IUpdateMyEmailForm, IUpdateMyPasswordForm, IUpdateMyPersonalDataForm, IUpdateMyUsernameForm } from "./accountInterfaces";

export const updatePersonalDataService = async (data: IUpdateMyPersonalDataForm) => {
  const response = await ApiClientFrontEnd.put(`account/update-profile`, data);
  return response.data;
};

export const updateEmailService = async (data: IUpdateMyEmailForm) => {
  const response = await ApiClientFrontEnd.put(`account/update-email`, data);
  return response.data;
};

export const updateUsernameService = async (data: IUpdateMyUsernameForm) => {
  console.log(data);
  const response = await ApiClientFrontEnd.put(`account/update-username`, data);
  return response.data;
};

export const updatePasswordService = async (data: IUpdateMyPasswordForm) => {
  const response = await ApiClientFrontEnd.put(`account/update-password`, data);
  return response.data;
};
