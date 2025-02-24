import { DESCRIPTION_MAX, DESCRIPTION_MIN } from "@/consts";
import useFormHandler from "@/hooks/useFormHandler";
import { DefaultValues } from "react-hook-form";
import * as yup from "yup";
import { IUpdateMaintenanceLogFormInput } from "../MaintenanceLogsInterfaces";
import { useMaintenanceLog } from "./useMaintenanceLog";

const validationSchema = yup.object().shape({
  id: yup.string().required("Id is required"),
  description: yup
    .string()
    .min(DESCRIPTION_MIN, `Description must be at least ${DESCRIPTION_MIN} characters`)
    .max(DESCRIPTION_MAX, `Description must be at most ${DESCRIPTION_MAX} characters`)
    .required("Description is required"),

  status: yup.number().required("Status is required"),

  equipment_id: yup.string().required("Equipement is required"),

  technician_id: yup.string().required("Technician is required"),
});

const useUpdateMaintenanceLogFormHandler = (defaultValues: DefaultValues<IUpdateMaintenanceLogFormInput>) => {
  const { updateMaintenanceLog } = useMaintenanceLog();
  const { controlAndErrors, submit, errorMessage, isValid, router, reset } = useFormHandler({
    defaultValues,
    onSubmit: async (data: IUpdateMaintenanceLogFormInput) => {
      await updateMaintenanceLog.mutateAsync(data);
    },
    validationSchema,
  });
  return {
    controlAndErrors,
    submit,
    errorMessage,
    isPending: updateMaintenanceLog.isPending,
    isSuccess: updateMaintenanceLog.isSuccess,
    isValid,
    router,
    reset,
  };
};

export default useUpdateMaintenanceLogFormHandler;
