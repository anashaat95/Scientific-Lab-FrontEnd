"use client";
import { DESCRIPTION_MAX, DESCRIPTION_MIN } from "@/consts";
import useFormHandler from "@/hooks/useFormHandler";
import { DefaultValues } from "react-hook-form";
import * as yup from "yup";
import { IAddMaintenanceLogFormInput } from "../MaintenanceLogsInterfaces";
import { useMaintenanceLog } from "./useMaintenanceLog";

const validationSchema = yup.object().shape({
  description: yup
    .string()
    .min(DESCRIPTION_MIN, `Description must be at least ${DESCRIPTION_MIN} characters`)
    .max(DESCRIPTION_MAX, `Description must be at most ${DESCRIPTION_MAX} characters`)
    .required("Description is required"),

  status: yup.number().required("Status is required"),

  equipment_id: yup.string().required("Equipement is required"),

  technician_id: yup.string().required("Technician is required"),
});

const useAddMaintenanceLogFormHandler = (defaultValues: DefaultValues<IAddMaintenanceLogFormInput>) => {
  const { addMaintenanceLog } = useMaintenanceLog();
  const { controlAndErrors, submit, errorMessage, isValid, router, reset } = useFormHandler({
    defaultValues,
    onSubmit: async (data: IAddMaintenanceLogFormInput) => {
      return await addMaintenanceLog.mutateAsync(data);
    },
    validationSchema,
  });

  return {
    controlAndErrors,
    submit,
    errorMessage,
    isPending: addMaintenanceLog.isPending,
    isSuccess: addMaintenanceLog.isSuccess,
    isValid,
    router,
    reset,
  };
};

export default useAddMaintenanceLogFormHandler;
