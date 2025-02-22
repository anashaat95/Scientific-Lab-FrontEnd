"use client";
import { DeleteFormModal } from "@/components/forms/DeleteFormModal";
import { BOOKINGS_FRONTEND_ENDPOINT } from "../bookingsConsts";
import useDeleteBookingFormHandler from "../hooks/useDeleteBookingFormHandler";

export default function DeleteBookingForm({ id }: { id: string }) {
  const { submit, errorMessage, isPending, isSuccess } = useDeleteBookingFormHandler({ id });
  return (
    <DeleteFormModal
      backUrl={BOOKINGS_FRONTEND_ENDPOINT}
      itemName={`Booking`}
      errorMessage={errorMessage}
      isPending={isPending}
      isSuccess={isSuccess}
      submitFn={submit}
    />
  );
}
