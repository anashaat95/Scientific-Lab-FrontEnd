import { IEntity } from "@/interfaces";

export interface ICompany extends IEntity {
  name: string;
  street: string;
  zipCode: string;
  website: string;
  city_url: string;
  city_name: string;
  country_name: string;
  country_url: string;
}

export interface IAddCompanyFormInput {
  name: string;
  street: string;
  zipCode: string;
  website: string;
  city_id: string;
  country_id: string;
}

export interface IUpdateCompanyFormInput {
  id: string;
  name: string;
  street: string;
  zipCode: string;
  website: string;
  city_id: string;
  country_id: string;
}

export interface IDeleteCompanyFormInput {
  id: string;
}
