import ApiClientFrontEnd from "@/clients/ApiClientFrontEnd";
import { IHaveIdEntity } from "@/interfaces";
import { BOOKINGS_BACKEND_ENDPOINT } from "./bookingsConsts";
import { IAddBookingFormInput, IEditBookingFormInput } from "./bookingsInterfaces";

export const addBookingService = async (data: IAddBookingFormInput) => {
  const response = await ApiClientFrontEnd.post(BOOKINGS_BACKEND_ENDPOINT, data);
  return response.data;
};

export const editBookingService = async ({ id, data }: { id: string; data: IEditBookingFormInput }) => {
  if (!id) throw new Error("You must provide Id");
  const response = await ApiClientFrontEnd.put(`${BOOKINGS_BACKEND_ENDPOINT}/${id}`, data);
  return response.data;
};

export const deleteBookingService = async ({ id }: IHaveIdEntity) => {
  if (!id) throw new Error("You must provide Id");

  const response = await ApiClientFrontEnd.delete(`${BOOKINGS_BACKEND_ENDPOINT}/${id}`);
  return response.data;
};
