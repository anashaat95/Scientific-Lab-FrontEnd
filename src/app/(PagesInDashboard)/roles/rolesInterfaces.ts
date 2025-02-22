import { IEntity } from "@/interfaces";

export interface IRole extends IEntity {
  name: string;
}

export enum enUserRoles {
  Admin = 0,
  LabSupervisor = 1,
  Researcher = 2,
  Technician = 3,
  User = 4,
}
