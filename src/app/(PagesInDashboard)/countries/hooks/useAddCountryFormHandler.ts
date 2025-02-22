"use client";
import { NAME_MAX, NAME_MIN } from "@/consts";
import useFormHandler from "@/hooks/useFormHandler";
import { DefaultValues } from "react-hook-form";
import * as yup from "yup";
import { IAddCountryFormInput } from "../countriesInterfaces";
import { useCountry } from "./useCountry";

const validationSchema = yup.object().shape({
  name: yup
    .string()
    .min(NAME_MIN, `Name must be at least ${NAME_MIN} characters`)
    .max(NAME_MAX, `Name must be at most ${NAME_MAX} characters`)
    .required("Name is required"),
});

const useAddCountryFormHandler = (defaultValues: DefaultValues<IAddCountryFormInput>) => {
  const { addCountry } = useCountry();
  const { controlAndErrors, submit, errorMessage, isValid, router, reset } = useFormHandler({
    defaultValues,
    onSubmit: async (data: IAddCountryFormInput) => {
      return await addCountry.mutateAsync(data);
    },
    validationSchema,
  });

  return {
    controlAndErrors,
    submit,
    errorMessage,
    isPending: addCountry.isPending,
    isSuccess: addCountry.isSuccess,
    isValid,
    router,
    reset,
  };
};

export default useAddCountryFormHandler;
