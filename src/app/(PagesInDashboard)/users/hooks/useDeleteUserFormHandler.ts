import useFormHandler from "@/hooks/useFormHandler";
import { IHaveIdEntity } from "@/interfaces";
import { DefaultValues } from "react-hook-form";
import * as yup from "yup";
import { useUser } from "./useUser";

const validationSchema = yup.object().shape({
  id: yup.string().required("Id is required"),
});

const useDeleteUserFormHandler = (defaultValues: DefaultValues<IHaveIdEntity>) => {
  const { deleteUser } = useUser();
  const { controlAndErrors, submit, errorMessage, isValid, reset } = useFormHandler({
    defaultValues,
    onSubmit: async (data: IHaveIdEntity) => {
      await deleteUser.mutateAsync(data);
    },
    validationSchema,
  });

  return {
    controlAndErrors,
    submit,
    errorMessage,
    isPending: deleteUser.isPending,
    isSuccess: deleteUser.isSuccess,
    isValid,
    reset,
  };
};

export default useDeleteUserFormHandler;
