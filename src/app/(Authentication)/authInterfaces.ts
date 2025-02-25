import { IFormInput } from "@/interfaces";
import React from "react";

export interface ITitleAndChildrenProps {
  title?: string;
  children: React.ReactNode;
}

export interface IAuthPageLayout extends ITitleAndChildrenProps {
  description: string;
  gridSizes?: {
    xs?: number;
    sm?: number;
    md?: number;
    lg?: number;
    xl?: number;
  };
}

export interface IUserIdAndTokenInput extends IFormInput {
  user_id?: string | null;
  token?: string | null;
}

export interface IUserIdTokenNewEmailInput extends IFormInput {
  user_id?: string | null;
  token?: string | null;
  new_email?: string | null;
}

export interface IEmailInput extends IFormInput {
  email?: string | null;
}

export interface ILoginFormInput extends IFormInput {
  email?: string | null;
  password?: string | null;
  rememberMe?: boolean;
}

export interface ISignupFormInput extends IFormInput {
  userName?: string | null;
  first_name?: string | null;
  last_name?: string | null;
  email?: string | null;
  phone_number?: string | null;
  image_url?: string | null;
  company_id?: string | null;
  department_id?: string | null;
  lab_id?: string | null;
  password?: string | null;
  confirm_password?: string | null;
}

export interface IResetPasswordFromTokenInput extends IFormInput {
  user_id?: string | null;
  token?: string | null;
  new_password?: string | null;
  confirm_new_password?: string | null;
}
