import { IEntity } from "@/interfaces";

export interface IBooking extends IEntity {
  start_date_time: string;
  end_date_time: string;
  is_on_overnight: string;
  notes: string;
  status: string;
  user_url: string;
  user_name: string;
  equipment_url: string;
  equipment_name: string;
}

export interface IAddBookingFormInput {
  start_date_time: string;
  end_date_time: string;
  is_on_overnight: Boolean;
  notes: string;
  status: string | number;
  user_id: string;
  equipment_id: string;
}

export interface IUpdateBookingFormInput {
  id: string;
  start_date_time: string;
  end_date_time: string;
  is_on_overnight: Boolean;
  notes: string;
  status: string | number;
  user_id: string;
  equipment_id: string;
}

export interface IDeleteBookingFormInput {
  id: string;
}

export enum eBookingStatus {
  Pending = 0,
  Confirmed = 1,
  Completed = 2,
  Cancelled = 3,
}

export function convertBookingStatus(status: string): eBookingStatus {
  switch (status.toLowerCase()) {
    case "pending":
      return eBookingStatus.Pending;
    case "confirmed":
      return eBookingStatus.Confirmed;
    case "completed":
      return eBookingStatus.Completed;
    case "cancelled":
      return eBookingStatus.Cancelled;
    default:
      return eBookingStatus.Confirmed;
  }
}
