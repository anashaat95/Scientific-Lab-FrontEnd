"use client";
import ApiClientFrontEnd from "@/clients/ApiClientFrontEnd";
import { IUpdateMyEmailForm, IUpdateMyPersonalDataForm } from "./accountInterfaces";

export const updatePersonalDataService = async (data: IUpdateMyPersonalDataForm) => {
  const response = await ApiClientFrontEnd.post(`account/update-profile`, data);
  return response.data;
};

export const updateEmailService = async (data: IUpdateMyEmailForm) => {
  const response = await ApiClientFrontEnd.post(`account/update-email`, data);
  return response.data;
};
