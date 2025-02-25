"use client";
import { useMutation } from "@tanstack/react-query";
import { toast } from "react-toastify";
import { IAddBookingFormInput, IUpdateBookingFormInput } from "../bookingsInterfaces";
import { addBookingService, deleteBookingService, updateBookingService } from "../bookingsServicesFrontEnd";

export const useBooking = () => {
  const addBooking = useMutation({
    mutationFn: async (data: IAddBookingFormInput) => {
      await addBookingService(data);
    },
    onSuccess: () => {
      toast.success("Booking added successfully");
    },
  });

  const updateBooking = useMutation({
    mutationFn: (data: IUpdateBookingFormInput) => {
      return updateBookingService({ id: data.id, data });
    },
    onSuccess: () => {
      toast.success("Booking updated successfully");
    },
  });

  const deleteBooking = useMutation({
    mutationFn: deleteBookingService,
    onSuccess: () => {
      toast.success("Booking deleted successfully");
    },
  });

  return { addBooking, updateBooking, deleteBooking };
};
