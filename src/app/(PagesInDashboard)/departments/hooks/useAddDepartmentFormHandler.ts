"use client";
import { ADDRESS_MAX, ADDRESS_MIN, NAME_MAX, NAME_MIN } from "@/consts";
import useFormHandler from "@/hooks/useFormHandler";
import { DefaultValues } from "react-hook-form";
import * as yup from "yup";
import { IAddDepartmentFormInput } from "../departmentsInterfaces";
import { useDepartment } from "./useDepartment";

const validationSchema = yup.object().shape({
  name: yup
    .string()
    .min(NAME_MIN, `Name must be at least ${NAME_MIN} characters`)
    .max(NAME_MAX, `Name must be at most ${NAME_MAX} characters`)
    .required("Name is required"),

  location: yup
    .string()
    .min(ADDRESS_MIN, `Street must be at least ${ADDRESS_MIN} characters`)
    .max(ADDRESS_MAX, `Street must be at most ${ADDRESS_MAX} characters`)
    .required("Street is required"),

  company_id: yup.string().required("Country ID is required"),
});

const useAddDepartmentFormHandler = (defaultValues: DefaultValues<IAddDepartmentFormInput>) => {
  const { addDepartment } = useDepartment();
  const { controlAndErrors, submit, errorMessage, isValid, router, reset } = useFormHandler({
    defaultValues,
    onSubmit: async (data: IAddDepartmentFormInput) => {
      return await addDepartment.mutateAsync(data);
    },
    validationSchema,
  });

  return {
    controlAndErrors,
    submit,
    errorMessage,
    isPending: addDepartment.isPending,
    isSuccess: addDepartment.isSuccess,
    isValid,
    router,
    reset,
  };
};

export default useAddDepartmentFormHandler;
