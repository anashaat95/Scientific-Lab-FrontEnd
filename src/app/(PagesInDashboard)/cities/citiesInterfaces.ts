import { IEntity } from "@/interfaces";

export interface ICity extends IEntity {
  name: string;
}

export interface IAddCityFormInput {
  name: string;
}

export interface IEditCityFormInput {
  id: string;
  name: string;
}

export interface IDeleteCityFormInput {
  id: string;
  name: string;
}
