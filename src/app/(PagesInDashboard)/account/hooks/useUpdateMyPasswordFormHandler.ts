import useFormHandler from "@/hooks/useFormHandler";
import { DefaultValues } from "react-hook-form";
import * as yup from "yup";
import { IUpdateMyPasswordForm } from "../accountInterfaces";
import { useAccount } from "./useAccount";

const validationSchema = yup.object().shape({
  old_password: yup.string().required("Old Password is required"),
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
    .oneOf([yup.ref("new_password")], "New Passwords do not match")
    .required("Confirm New password is required"),
});

const useUpdateMyPasswordFormHandler = (defaultValues: DefaultValues<IUpdateMyPasswordForm>) => {
  const { updateMyPassword } = useAccount();
  const { controlAndErrors, submit, errorMessage, isValid, reset } = useFormHandler({
    defaultValues,
    onSubmit: async (data) => await updateMyPassword.mutateAsync(data),
    validationSchema,
  });

  return {
    controlAndErrors,
    submit,
    errorMessage,
    isPending: updateMyPassword.isPending,
    isSuccess: updateMyPassword.isSuccess,
    isValid,
    reset,
  };
};

export default useUpdateMyPasswordFormHandler;
