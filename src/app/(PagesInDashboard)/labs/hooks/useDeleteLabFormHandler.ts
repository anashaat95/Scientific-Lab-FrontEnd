import useFormHandler from "@/hooks/useFormHandler";
import { IHaveIdEntity } from "@/interfaces";
import { DefaultValues } from "react-hook-form";
import * as yup from "yup";
import { useLab } from "./useLab";

const validationSchema = yup.object().shape({
  id: yup.string().required("Id is required"),
});

const useDeleteLabFormHandler = (defaultValues: DefaultValues<IHaveIdEntity>) => {
  const { deleteLab } = useLab();
  const { controlAndErrors, submit, errorMessage, isValid, reset } = useFormHandler({
    defaultValues,
    onSubmit: async (data: IHaveIdEntity) => {
      await deleteLab.mutateAsync(data);
    },
    validationSchema,
  });

  return {
    controlAndErrors,
    submit,
    errorMessage,
    isPending: deleteLab.isPending,
    isSuccess: deleteLab.isSuccess,
    isValid,
    reset,
  };
};

export default useDeleteLabFormHandler;
