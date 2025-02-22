"use client";
import { useMutation } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { IAddBookingFormInput, IEditBookingFormInput } from "../bookingsInterfaces";
import { addBookingService, deleteBookingService, editBookingService } from "../bookingsServicesFrontEnd";

export const useBooking = () => {
  const router = useRouter();

  const addBooking = useMutation({
    mutationFn: async (data: IAddBookingFormInput) => {
      await addBookingService(data);
    },
  });

  const editBooking = useMutation({
    mutationFn: (data: IEditBookingFormInput) => {
      return editBookingService({ id: data.id, data });
    },
  });

  const deleteBooking = useMutation({
    mutationFn: deleteBookingService,
  });

  return { addBooking, editBooking, deleteBooking };
};
