import { IEntity } from "@/interfaces";

export interface ILab extends IEntity {
  name: string;
  capacity: string;
  opening_time: string;
  closing_time: string;
  supervisor_name: string;
  supervisor_url: string;
  department_name: string;
  department_url: string;
}

export interface IAddLabFormInput {
  name: string;
  capacity: string;
  opening_time: string;
  closing_time: string;
  supervisor_id: string;
  department_id: string;
}

export interface IEditLabFormInput {
  id: string;
  name: string;
  capacity: string;
  opening_time: string;
  closing_time: string;
  supervisor_id: string;
  department_id: string;
}

export interface IDeleteLabFormInput {
  id: string;
}
