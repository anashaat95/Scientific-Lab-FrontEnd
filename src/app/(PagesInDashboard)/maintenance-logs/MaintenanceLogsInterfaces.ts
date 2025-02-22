import { IEntity } from "@/interfaces";

export enum eMaintenanceLogStatus {
  InMaintenance = 0,
  Fixed = 1,
}

export interface IMaintenanceLog extends IEntity {
  description: string;
  status: string;
  equipment_url: string;
  equipment_name: string;
  technician_url: string;
  technician_name: string;
}

export interface IAddMaintenanceLogFormInput {
  description: string;
  status: string | number;
  equipment_id: string;
  technician_id: string;
}

export interface IEditMaintenanceLogFormInput {
  id: string;
  description: string;
  status: string | number;
  equipment_id: string;
  technician_id: string;
}

export interface IDeleteMaintenanceLogFormInput {
  id: string;
}
