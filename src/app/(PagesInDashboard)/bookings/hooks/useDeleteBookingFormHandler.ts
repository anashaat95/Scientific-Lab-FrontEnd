import useFormHandler from "@/hooks/useFormHandler";
import { IHaveIdEntity } from "@/interfaces";
import { DefaultValues } from "react-hook-form";
import * as yup from "yup";
import { useBooking } from "./useBooking";

const validationSchema = yup.object().shape({
  id: yup.string().required("Id is required"),
});

const useDeleteBookingFormHandler = (defaultValues: DefaultValues<IHaveIdEntity>) => {
  const { deleteBooking } = useBooking();
  const { controlAndErrors, submit, errorMessage, isValid, reset } = useFormHandler({
    defaultValues,
    onSubmit: async (data: IHaveIdEntity) => {
      await deleteBooking.mutateAsync(data);
    },
    validationSchema,
  });

  return {
    controlAndErrors,
    submit,
    errorMessage,
    isPending: deleteBooking.isPending,
    isSuccess: deleteBooking.isSuccess,
    isValid,
    reset,
  };
};

export default useDeleteBookingFormHandler;
