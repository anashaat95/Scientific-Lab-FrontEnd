import useFormHandler from "@/hooks/useFormHandler";
import { DefaultValues } from "react-hook-form";
import * as yup from "yup";
import { IUpdateMyEmailForm } from "../accountInterfaces";
import { useAccount } from "./useAccount";

const validationSchema = yup.object().shape({ new_email: yup.string().email("Invalid email address").required("Email is required") });

const useUpdateMyEmailFormHandler = (defaultValues: DefaultValues<IUpdateMyEmailForm>) => {
  const { updateMyEmail } = useAccount();
  const { controlAndErrors, submit, errorMessage, isValid, reset } = useFormHandler({
    defaultValues,
    onSubmit: async (data) => await updateMyEmail.mutateAsync(data),
    validationSchema,
  });

  return {
    controlAndErrors,
    submit,
    errorMessage,
    isPending: updateMyEmail.isPending,
    isSuccess: updateMyEmail.isSuccess,
    isValid,
    reset,
  };
};

export default useUpdateMyEmailFormHandler;
