import { IEntity } from "@/interfaces";
import dayjs from "dayjs";

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
  start_time: dayjs.Dayjs;
  end_time: dayjs.Dayjs;
  start_date: dayjs.Dayjs;
  end_date: dayjs.Dayjs;
  is_on_overnight: string;
  notes: string;
  status: string | number;
  user_id: string;
  equipment_id: string;
}

export interface IAddBookingDataForServer {
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
  start_time: dayjs.Dayjs;
  end_time: dayjs.Dayjs;
  start_date: dayjs.Dayjs;
  end_date: dayjs.Dayjs;
  is_on_overnight: string;
  notes: string;
  status: string | number;
  user_id: string;
  equipment_id: string;
}

export interface IUpdateBookingFormInputFromServer {
  id: string;
  start_time: string;
  end_time: string;
  start_date: string;
  end_date: string;
  is_on_overnight: string;
  notes: string;
  status: string | number;
  user_id: string;
  equipment_id: string;
}

export interface IUpdateBookingDataForServer {
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
