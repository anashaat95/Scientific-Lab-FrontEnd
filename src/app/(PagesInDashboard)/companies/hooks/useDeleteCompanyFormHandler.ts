import useFormHandler from "@/hooks/useFormHandler";
import { IHaveIdEntity } from "@/interfaces";
import { DefaultValues } from "react-hook-form";
import * as yup from "yup";
import { useCompany } from "./useCompany";

const validationSchema = yup.object().shape({
  id: yup.string().required("Id is required"),
});

const useDeleteCompanyFormHandler = (defaultValues: DefaultValues<IHaveIdEntity>) => {
  const { deleteCompany } = useCompany();
  const { controlAndErrors, submit, errorMessage, reset, isValid } = useFormHandler({
    defaultValues,
    onSubmit: async (data: IHaveIdEntity) => {
      await deleteCompany.mutateAsync(data);
    },
    validationSchema,
  });

  return {
    controlAndErrors,
    submit,
    errorMessage,
    isPending: deleteCompany.isPending,
    isSuccess: deleteCompany.isSuccess,
    reset,
    isValid,
  };
};

export default useDeleteCompanyFormHandler;
