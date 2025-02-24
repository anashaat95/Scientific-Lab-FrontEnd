import { DESCRIPTION_MAX, NAME_MAX } from "@/consts";
import useFormHandler from "@/hooks/useFormHandler";
import { DefaultValues } from "react-hook-form";
import * as yup from "yup";
import { IUpdateBookingFormInput } from "../bookingsInterfaces";
import { useBooking } from "./useBooking";

const validationSchema = yup.object().shape({
  id: yup.string().required("Id is required"),
  start_date_time: yup.string().required("Start datetime is required."),
  end_date_time: yup.string().required("End datetime is required."),
  is_on_overnight: yup.boolean().required("Overnight is required"),
  notes: yup.string().max(NAME_MAX, `Notes must be at most ${DESCRIPTION_MAX} characters`).notRequired(),
  status: yup.number().required("Status is required"),
  user_id: yup.string().required("Researcher is required").required("Researcher is required"),
  equipment_id: yup.string().required("Equipment is required").required("Equipment is required"),
});

const useUpdateBookingFormHandler = (defaultValues: DefaultValues<IUpdateBookingFormInput>) => {
  const { updateBooking } = useBooking();
  const { controlAndErrors, submit, errorMessage, isValid, router, reset } = useFormHandler({
    defaultValues,
    onSubmit: async (data: IUpdateBookingFormInput) => {
      await updateBooking.mutateAsync(data);
    },
    validationSchema,
  });
  return {
    controlAndErrors,
    submit,
    errorMessage,
    isPending: updateBooking.isPending,
    isSuccess: updateBooking.isSuccess,
    isValid,
    router,
    reset,
  };
};

export default useUpdateBookingFormHandler;
