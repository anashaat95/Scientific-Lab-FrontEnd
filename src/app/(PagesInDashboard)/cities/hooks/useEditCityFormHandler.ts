import { NAME_MAX, NAME_MIN } from "@/consts";
import useFormHandler from "@/hooks/useFormHandler";
import { DefaultValues } from "react-hook-form";
import * as yup from "yup";
import { IEditCityFormInput } from "../citiesInterfaces";
import { useCity } from "./useCity";

const validationSchema = yup.object().shape({
  id: yup.string().required("Id is required"),

  name: yup
    .string()
    .min(NAME_MIN, `Name must be at least ${NAME_MIN} characters`)
    .max(NAME_MAX, `Name must be at most ${NAME_MAX} characters`)
    .required("Name is required"),
});

const useEditCityFormHandler = (defaultValues: DefaultValues<IEditCityFormInput>) => {
  const { editCity } = useCity();
  const { controlAndErrors, submit, errorMessage, isValid, router, reset } = useFormHandler({
    defaultValues,
    onSubmit: async (data: IEditCityFormInput) => {
      await editCity.mutateAsync(data);
    },
    validationSchema,
  });
  return {
    controlAndErrors,
    submit,
    errorMessage,
    isPending: editCity.isPending,
    isSuccess: editCity.isSuccess,
    isValid,
    router,
    reset,
  };
};

export default useEditCityFormHandler;
