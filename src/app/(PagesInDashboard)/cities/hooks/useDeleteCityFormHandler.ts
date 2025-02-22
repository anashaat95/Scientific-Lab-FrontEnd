import useFormHandler from "@/hooks/useFormHandler";
import { IHaveIdEntity } from "@/interfaces";
import { DefaultValues } from "react-hook-form";
import * as yup from "yup";
import { useCity } from "./useCity";

const validationSchema = yup.object().shape({
  id: yup.string().required("Id is required"),
});

const useDeleteCityFormHandler = (defaultValues: DefaultValues<IHaveIdEntity>) => {
  const { deleteCity } = useCity();
  const { controlAndErrors, submit, errorMessage, reset, isValid } = useFormHandler({
    defaultValues,
    onSubmit: async (data: IHaveIdEntity) => {
      await deleteCity.mutateAsync(data);
    },
    validationSchema,
  });

  return {
    controlAndErrors,
    submit,
    errorMessage,
    isPending: deleteCity.isPending,
    isSuccess: deleteCity.isSuccess,
    isValid,
    reset,
  };
};

export default useDeleteCityFormHandler;
