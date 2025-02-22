import useFormHandler from "@/hooks/useFormHandler";
import { DefaultValues } from "react-hook-form";
import * as yup from "yup";
import { IEmailInput } from "../authInterfaces";
import { useAuth } from "./useAuth";

const validationSchema = yup.object().shape({
  email: yup.string().email("Invalid email address").required("Email is required"),
});

const defaultValues: DefaultValues<IEmailInput> = { email: "" };

const useForgetPasswordHandler = () => {
  const { forgetPassword } = useAuth();
  const { controlAndErrors, submit, errorMessage, router, isValid, reset } = useFormHandler({
    defaultValues,
    onSubmit: async (data) => {
      await forgetPassword.mutateAsync(data);
    },
    validationSchema,
  });

  return {
    controlAndErrors,
    submit,
    errorMessage,
    isPending: forgetPassword.isPending,
    isSuccess: forgetPassword.isSuccess,
    router,
    isValid,
    reset,
  };
};

export default useForgetPasswordHandler;
