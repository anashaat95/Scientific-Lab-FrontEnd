import useFormHandler from "@/hooks/useFormHandler";
import { DefaultValues } from "react-hook-form";
import * as yup from "yup";
import { IResetPasswordFromTokenInput, IUserIdAndTokenInput } from "../authInterfaces";
import { useAuth } from "./useAuth";

const validationSchema = yup.object().shape({
  new_password: yup
    .string()
    .min(8, "Password must be at least 8 characters")
    .matches(/[A-Z]/, "Password must contain at least one uppercase letter")
    .matches(/[a-z]/, "Password must contain at least one lowercase letter")
    .matches(/[0-9]/, "Password must contain at least one number")
    .matches(/[\W_]/, "Password must contain at least one special character")
    .required("Password is required"),
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
