import useFormHandler from "@/hooks/useFormHandler";
import { DefaultValues } from "react-hook-form";
import * as yup from "yup";
import { IUpdateMyPasswordForm } from "../accountInterfaces";
import { useAccount } from "./useAccount";

const validationSchema = yup.object().shape({
  old_password: yup.string().min(6, "Old Password must be at least 6 characters").required("Old Password is required"),
  new_password: yup.string().min(6, "New Password must be at least 6 characters").required("New Password is required"),

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
