"use client";
import { useMutation } from "@tanstack/react-query";
import dayjs from "dayjs";
import { toast } from "react-toastify";
import { IAddBookingDataForServer, IAddBookingFormInput, IUpdateBookingDataForServer, IUpdateBookingFormInput } from "../bookingsInterfaces";
import { addBookingService, deleteBookingService, updateBookingService } from "../bookingsServicesFrontEnd";

export const useBooking = () => {
  const addBooking = useMutation({
    mutationFn: async (data: IAddBookingFormInput) => {
      const start_date = dayjs(data.start_date).format("YYYY-MM-DD");
      const end_date = dayjs(data.end_date).format("YYYY-MM-DD");
      const start_time = dayjs(data.start_time).format("HH:mm");
      const end_time = dayjs(data.end_time).format("HH:mm");
      const start_datetime = dayjs(`${start_date} ${start_time}`, "YYYY-MM-DD HH:mm").add(2, "hour").toString();
      const end_datetime = dayjs(`${end_date} ${end_time}`, "YYYY-MM-DD HH:mm").add(2, "hour").toString();

      const modifiedData: IAddBookingDataForServer = {
        start_date_time: new Date(start_datetime).toISOString(),
        end_date_time: new Date(end_datetime).toISOString(),
        is_on_overnight: JSON.parse(data.is_on_overnight),
        notes: data.notes,
        status: data.status,
        user_id: data.user_id,
        equipment_id: data.equipment_id,
      };

      await addBookingService(modifiedData);
    },
    onSuccess: () => {
      toast.success("Booking added successfully");
    },
  });

  const updateBooking = useMutation({
    mutationFn: (data: IUpdateBookingFormInput) => {
      const start_date = dayjs(data.start_date).format("YYYY-MM-DD");
      const end_date = dayjs(data.end_date).format("YYYY-MM-DD");
      const start_time = dayjs(data.start_time).format("HH:mm");
      const end_time = dayjs(data.end_time).format("HH:mm");
      const start_datetime = dayjs(`${start_date} ${start_time}`, "YYYY-MM-DD HH:mm").add(2, "hour").toString();
      const end_datetime = dayjs(`${end_date} ${end_time}`, "YYYY-MM-DD HH:mm").add(2, "hour").toString();

      const modifiedData: IUpdateBookingDataForServer = {
        id: data.id,
        start_date_time: new Date(start_datetime).toISOString(),
        end_date_time: new Date(end_datetime).toISOString(),
        is_on_overnight: JSON.parse(data.is_on_overnight),
        notes: data.notes,
        status: data.status,
        user_id: data.user_id,
        equipment_id: data.equipment_id,
      };

      return updateBookingService({ id: data.id, data: modifiedData });
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
