"use client";
import ApiClientFrontEnd from "@/clients/ApiClientFrontEnd";
import { IEmailInput, ILoginFormInput, IResetPasswordFromTokenInput, ISignupFormInput } from "./authInterfaces";

export const loginService = async (data: ILoginFormInput) => {
  const response = await ApiClientFrontEnd.post(`auth/login`, data);
  return response.data;
};

export const logoutService = async () => {
  const response = await ApiClientFrontEnd.get(`auth/logout`);
  return response.data;
};

export const forgetPasswordService = async (data: IEmailInput) => {
  const response = await ApiClientFrontEnd.post(`auth/forget-password`, data);
  return response.data;
};

export const resetPasswordService = async (data: IResetPasswordFromTokenInput) => {
  const response = await ApiClientFrontEnd.post(`auth/reset-password`, data);
  return response.data;
};

export const resendConfirmationEmailService = async (data: IEmailInput) => {
  const response = await ApiClientFrontEnd.post(`auth/resend-confirmation-for-email`, data);
  return response.data;
};

export const signupService = async (data: ISignupFormInput) => {
  const response = await ApiClientFrontEnd.post("auth/signup", data);
  return response.data;
};

export const getMeClientService = async () => {
  const response = await ApiClientFrontEnd.get("account/me");
  return response.data;
};
