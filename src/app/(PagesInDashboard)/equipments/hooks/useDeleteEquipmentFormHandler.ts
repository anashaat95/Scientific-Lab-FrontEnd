import useFormHandler from "@/hooks/useFormHandler";
import { IHaveIdEntity } from "@/interfaces";
import { DefaultValues } from "react-hook-form";
import * as yup from "yup";
import { useEquipment } from "./useEquipment";

const validationSchema = yup.object().shape({
  id: yup.string().required("Id is required"),
});

const useDeleteEquipmentFormHandler = (defaultValues: DefaultValues<IHaveIdEntity>) => {
  const { deleteEquipment } = useEquipment();
  const { controlAndErrors, submit, errorMessage, isValid, reset } = useFormHandler({
    defaultValues,
    onSubmit: async (data: IHaveIdEntity) => {
      await deleteEquipment.mutateAsync(data);
    },
    validationSchema,
  });

  return {
    controlAndErrors,
    submit,
    errorMessage,
    isPending: deleteEquipment.isPending,
    isSuccess: deleteEquipment.isSuccess,
    isValid,
    reset,
  };
};

export default useDeleteEquipmentFormHandler;
