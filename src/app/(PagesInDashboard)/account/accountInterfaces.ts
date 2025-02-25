import { IFormInput } from "@/interfaces";

export interface IUpdateMyPersonalDataForm extends IFormInput {
  userName?: string | null;
  first_name?: string | null;
  last_name?: string | null;
  phone_number?: string | null;
  image_url?: string | null;
  google_scholar_url?: string | null;
  academia_url?: string | null;
  scopus_url?: string | null;
  researcher_gate_url?: string | null;
  expertise_area?: string | null;
}

export interface IUpdateMyEmailForm extends IFormInput {
  new_email?: string | null;
}

export interface IUpdateMyUsernameForm extends IFormInput {
  username?: string | null;
}

export interface IUpdateMyPasswordForm extends IFormInput {
  old_password?: string | null;
  new_password?: string | null;
  confirm_new_password?: string | null;
}
