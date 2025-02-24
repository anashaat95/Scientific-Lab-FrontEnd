import { IEntity } from "@/interfaces";

export interface IDepartment extends IEntity {
  name: string;
  location: string;
  company_name: string;
  company_url: string;
}

export interface IAddDepartmentFormInput {
  name: string;
  location: string;
  company_id: string;
}

export interface IUpdateDepartmentFormInput {
  id: string;
  name: string;
  location: string;
  company_id: string;
}

export interface IDeleteDepartmentFormInput {
  id: string;
}
