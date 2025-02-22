import { IEntity } from "@/interfaces";

export interface ICountry extends IEntity {
  name: string;
}

export interface IAddCountryFormInput {
  name: string;
}

export interface IEditCountryFormInput {
  id: string;
  name: string;
}

export interface IDeleteCountryFormInput {
  id: string;
  name: string;
}
