import ApiClientBackEnd from "@/clients/ApiClientBackEnd";
import { BOOKINGS_BACKEND_ENDPOINT } from "./bookingsConsts";

export const getAllBookingsService = async () => {
  const response = await ApiClientBackEnd.get(BOOKINGS_BACKEND_ENDPOINT);
  return response.data;
};

export const getBookingByIdService = async (id: string) => {
  const response = await ApiClientBackEnd.get(`${BOOKINGS_BACKEND_ENDPOINT}/${id}`);
  return response.data;
};
