import useFormHandler from "@/hooks/useFormHandler";
import { DefaultValues } from "react-hook-form";
import * as yup from "yup";
import { IEmailInput } from "../authInterfaces";
import { useAuth } from "./useAuth";

const validationSchema = yup.object().shape({
  email: yup.string().email("Invalid email address").required("Email is required"),
});

const defaultValues: DefaultValues<IEmailInput> = { email: "" };

const useResendEmailFormHandler = () => {
  const { resendConfirmEmail } = useAuth();
  const { controlAndErrors, submit, errorMessage, router, isValid, reset } = useFormHandler({
    defaultValues,
    onSubmit: async (data) => {
      await resendConfirmEmail.mutateAsync(data);
    },
    validationSchema,
  });

  return {
    controlAndErrors,
    submit,
    errorMessage,
    isPending: resendConfirmEmail.isPending,
    isSuccess: resendConfirmEmail.isSuccess,
    router,
    isValid,
    reset,
  };
};

export default useResendEmailFormHandler;
