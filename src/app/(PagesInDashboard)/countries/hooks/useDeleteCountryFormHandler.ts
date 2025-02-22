import useFormHandler from "@/hooks/useFormHandler";
import { IHaveIdEntity } from "@/interfaces";
import { DefaultValues } from "react-hook-form";
import * as yup from "yup";
import { useCountry } from "./useCountry";

const validationSchema = yup.object().shape({
  id: yup.string().required("Id is required"),
});

const useDeleteCountryFormHandler = (defaultValues: DefaultValues<IHaveIdEntity>) => {
  const { deleteCountry } = useCountry();
  const { controlAndErrors, submit, errorMessage, reset } = useFormHandler({
    defaultValues,
    onSubmit: async (data: IHaveIdEntity) => {
      await deleteCountry.mutateAsync(data);
    },
    validationSchema,
  });

  return {
    controlAndErrors,
    submit,
    errorMessage,
    isPending: deleteCountry.isPending,
    isSuccess: deleteCountry.isSuccess,
    reset,
  };
};

export default useDeleteCountryFormHandler;
