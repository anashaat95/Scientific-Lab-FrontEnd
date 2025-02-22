import { IEntity } from "@/interfaces";

export interface IEquipment extends IEntity {
  name: string;
  total_quantity: string;
  reserved_quantity: string;
  type: string;
  status: string;
  purchase_date: string;
  serial_number: string;
  specifications: string;
  description: string;
  can_be_left_overnight: string;
  image_url: string;

  company_url: string;
  company_name: string;
}

export interface IAddEquipmentFormInput {
  name: string;
  total_quantity: string;
  type: string | number;
  status: string | number;
  purchase_date: string;
  serial_number: string;
  specifications: string;
  description: string;
  CanBeLeftOverNight: Boolean;
  company_id: string;
  image_url?: string | null;
}

export interface IEditEquipmentFormInput {
  id: string;
  name: string;
  total_quantity: string;
  type: string | number;
  status: string | number;
  purchase_date: string;
  serial_number: string;
  specifications: string;
  description: string;
  CanBeLeftOverNight: Boolean;
  company_id: string;
  image_url?: string | null;
}

export interface IDeleteEquipmentFormInput {
  id: string;
}

export enum eEquipmentType {
  HardnessTester = 0,
  Centrigue = 1,
  Stirrer = 2,
  Heater = 3,
  Dryer = 4,
  Viscometer = 5,
  Balance = 6,
  DissolutionTester = 7,
  SolubilityTester = 8,
  Zetasizer = 9,
  UvVisSpectrometer = 10,
  WaterBath = 11,
  Homogenizer = 12,
  pHMeter = 13,
  Oven = 14,
  Accessory = 15,
}

export enum eEquipmentStatus {
  Available = 0,
  FullyBooked = 1,
  NotWorking = 2,
  Decommissioned = 3,
  InMaintenance = 4,
}

export const stringToEquipmentStatus = (status: string): eEquipmentStatus => {
  switch (status.toLowerCase()) {
    case "available":
      return eEquipmentStatus.Available;
    case "fullybooked":
    case "fully booked":
      return eEquipmentStatus.FullyBooked;
    case "notworking":
    case "not working":
      return eEquipmentStatus.NotWorking;
    case "decommissioned":
      return eEquipmentStatus.Decommissioned;
    case "inmaintenance":
    case "in maintenance":
      return eEquipmentStatus.InMaintenance;
    default:
      throw new Error(`Unknown equipment status: ${status}`);
  }
};
