"use client";
import { NAME_MAX, NAME_MIN } from "@/consts";
import useFormHandler from "@/hooks/useFormHandler";
import { DefaultValues } from "react-hook-form";
import * as yup from "yup";
import { IAddCityFormInput } from "../citiesInterfaces";
import { useCity } from "./useCity";

const validationSchema = yup.object().shape({
  name: yup
    .string()
    .min(NAME_MIN, `Name must be at least ${NAME_MIN} characters`)
    .max(NAME_MAX, `Name must be at most ${NAME_MAX} characters`)
    .required("Name is required"),
});

const useAddCityFormHandler = (defaultValues: DefaultValues<IAddCityFormInput>) => {
  const { addCity } = useCity();
  const { controlAndErrors, submit, errorMessage, isValid, router, reset } = useFormHandler({
    defaultValues,
    onSubmit: async (data: IAddCityFormInput) => {
      return await addCity.mutateAsync(data);
    },
    validationSchema,
  });

  return {
    controlAndErrors,
    submit,
    errorMessage,
    isPending: addCity.isPending,
    isSuccess: addCity.isSuccess,
    isValid,
    router,
    reset,
  };
};

export default useAddCityFormHandler;
