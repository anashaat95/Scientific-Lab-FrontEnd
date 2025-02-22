import useFormHandler from "@/hooks/useFormHandler";
import { IHaveIdEntity } from "@/interfaces";
import { DefaultValues } from "react-hook-form";
import * as yup from "yup";
import { useMaintenanceLog } from "./useMaintenanceLog";

const validationSchema = yup.object().shape({
  id: yup.string().required("Id is required"),
});

const useDeleteMaintenanceLogFormHandler = (defaultValues: DefaultValues<IHaveIdEntity>) => {
  const { deleteMaintenanceLog } = useMaintenanceLog();
  const { controlAndErrors, submit, errorMessage, reset, isValid } = useFormHandler({
    defaultValues,
    onSubmit: async (data: IHaveIdEntity) => {
      await deleteMaintenanceLog.mutateAsync(data);
    },
    validationSchema,
  });

  return {
    controlAndErrors,
    submit,
    errorMessage,
    isPending: deleteMaintenanceLog.isPending,
    isSuccess: deleteMaintenanceLog.isSuccess,
    reset,
    isValid,
  };
};

export default useDeleteMaintenanceLogFormHandler;
