import useFormHandler from "@/hooks/useFormHandler";
import { IHaveIdEntity } from "@/interfaces";
import { DefaultValues } from "react-hook-form";
import * as yup from "yup";
import { useDepartment } from "./useDepartment";

const validationSchema = yup.object().shape({
  id: yup.string().required("Id is required"),
});

const useDeleteDepartmentFormHandler = (defaultValues: DefaultValues<IHaveIdEntity>) => {
  const { deleteDepartment } = useDepartment();
  const { controlAndErrors, submit, errorMessage, reset, isValid } = useFormHandler({
    defaultValues,
    onSubmit: async (data: IHaveIdEntity) => {
      await deleteDepartment.mutateAsync(data);
    },
    validationSchema,
  });

  return {
    controlAndErrors,
    submit,
    errorMessage,
    isPending: deleteDepartment.isPending,
    isSuccess: deleteDepartment.isSuccess,
    reset,
    isValid,
  };
};

export default useDeleteDepartmentFormHandler;
