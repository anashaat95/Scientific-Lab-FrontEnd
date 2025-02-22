import { IEntity } from "@/interfaces";

export interface IUser extends IEntity {
  userName: string;
  first_name: string;
  last_name: string;
  email: string;
  email_confirmed: string;
  phone_number?: string | null;
  two_factor_enabled?: string | null;
  image_url?: string | null;
  company_url: string;
  company_name: string;
  department_url: string;
  department_name: string;
  lab_url?: string | null;
  lab_name?: string | null;
  google_scholar_url?: string | null;
  academia_url?: string | null;
  scopus_url?: string | null;
  researcher_gate_url?: string | null;
  expertise_area?: string | null;
  roles?: string | null;
}

export interface IAddUserFormInput {
  userName: string;
  first_name: string;
  last_name: string;
  email: string;
  password: string;
  confirm_password: string;
  phone_number?: string | null;
  image_url?: string | null;
  company_id: string;
  department_id: string;
  lab_id?: string;
  google_scholar_url?: string | null;
  academia_url?: string | null;
  scopus_url?: string | null;
  researcher_gate_url?: string | null;
  expertise_area?: string | null;
}

export interface IEditUserFormInput {
  id: string;
  userName: string;
  first_name: string;
  last_name: string;
  email: string;
  phone_number?: string | null;
  image_url?: string | null;
  company_id: string;
  department_id: string;
  lab_id?: string;
  google_scholar_url?: string | null;
  academia_url?: string | null;
  scopus_url?: string | null;
  researcher_gate_url?: string | null;
  expertise_area?: string | null;
}

export interface IDeleteUserFormInput {
  id: string;
  username: string;
}
