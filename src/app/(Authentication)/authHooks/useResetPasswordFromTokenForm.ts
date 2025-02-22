import useFormHandler from "@/hooks/useFormHandler";
import { DefaultValues } from "react-hook-form";
import * as yup from "yup";
import { IResetPasswordFromTokenInput, IUserIdAndTokenInput } from "../authInterfaces";
import { useAuth } from "./useAuth";

const validationSchema = yup.object().shape({
  new_password: yup.string().min(6, "Password must be at least 6 characters").required("Password is required"),
  confirm_new_password: yup
    .string()
    .oneOf([yup.ref("new_password")], "Passwords do not match")
    .required("Confirm new password is required"),
});

const defaultValues: DefaultValues<IResetPasswordFromTokenInput> = {
  user_id: "",
  token: "",
  new_password: "",
  confirm_new_password: "",
};

const useResetPasswordFromTokenForm = ({ user_id, token }: IUserIdAndTokenInput) => {
  const { resetPassword } = useAuth();

  const { controlAndErrors, submit, errorMessage, router, isValid, reset } = useFormHandler({
    defaultValues,
    onSubmit: async (data: any) => {
      await resetPassword.mutateAsync({ user_id, token, new_password: data.new_password });
    },
    validationSchema,
  });

  return {
    controlAndErrors,
    submit,
    errorMessage,
    isPending: resetPassword.isPending && !(resetPassword.isSuccess || resetPassword.isError),
    isError: resetPassword.isError,
    isSuccess: resetPassword.isSuccess,
    router,
    isValid,
    reset,
  };
};

export default useResetPasswordFromTokenForm;
