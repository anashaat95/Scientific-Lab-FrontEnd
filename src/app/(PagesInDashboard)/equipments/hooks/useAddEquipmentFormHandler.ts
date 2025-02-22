"use client";
import { NAME_MAX, NAME_MIN } from "@/consts";
import useFormHandler from "@/hooks/useFormHandler";
import { DefaultValues } from "react-hook-form";
import * as yup from "yup";
import { IAddEquipmentFormInput } from "../equipmentsInterfaces";
import { useEquipment } from "./useEquipment";

const validationSchema = yup.object().shape({
  name: yup
    .string()
    .min(NAME_MIN, `Name must be at least ${NAME_MIN} characters`)
    .max(NAME_MAX, `Name must be at most ${NAME_MAX} characters`)
    .required("Name is required"),

  total_quantity: yup.number().typeError("Must be a number").min(1, "Value must be at least 1").required("Total quantity is required"),

  type: yup.number().required("Type is required"),
  status: yup.number().required("Status is required"),

  serial_number: yup.string().required("Serial number is required"),
  specifications: yup.string().required("Specifications is required"),
  description: yup.string().required("Description is required"),
  CanBeLeftOverNight: yup.boolean().required("Overnight is required"),

  purchase_date: yup.string().required("Purchase date is required."),

  company_id: yup.string().required("Department ID is required").required("Department is required"),
});

const useAddEquipmentFormHandler = (defaultValues: DefaultValues<IAddEquipmentFormInput>) => {
  const { addEquipment } = useEquipment();
  const { controlAndErrors, submit, errorMessage, isValid, router, reset } = useFormHandler({
    defaultValues,
    onSubmit: async (data: IAddEquipmentFormInput) => {
      return await addEquipment.mutateAsync(data);
    },
    validationSchema,
  });

  return {
    controlAndErrors,
    submit,
    errorMessage,
    isPending: addEquipment.isPending,
    isSuccess: addEquipment.isSuccess,
    isValid,
    router,
    reset,
  };
};

export default useAddEquipmentFormHandler;
