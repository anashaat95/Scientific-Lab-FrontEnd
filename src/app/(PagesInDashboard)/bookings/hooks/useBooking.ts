"use client";
import { useMutation } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { IAddBookingFormInput, IUpdateBookingFormInput } from "../bookingsInterfaces";
import { addBookingService, deleteBookingService, updateBookingService } from "../bookingsServicesFrontEnd";

export const useBooking = () => {
  const router = useRouter();

  const addBooking = useMutation({
    mutationFn: async (data: IAddBookingFormInput) => {
      await addBookingService(data);
    },
  });

  const updateBooking = useMutation({
    mutationFn: (data: IUpdateBookingFormInput) => {
      return updateBookingService({ id: data.id, data });
    },
  });

  const deleteBooking = useMutation({
    mutationFn: deleteBookingService,
  });

  return { addBooking, updateBooking, deleteBooking };
};
