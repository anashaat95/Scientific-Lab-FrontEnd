import useFormHandler from "@/hooks/useFormHandler";
import { DefaultValues } from "react-hook-form";
import * as yup from "yup";
import { ILoginFormInput } from "../authInterfaces";
import { useAuth } from "./useAuth";

const validationSchema = yup.object().shape({
  email: yup.string().email("Invalid email address").required("Email is required"),
  password: yup.string().min(6, "Password must be at least 6 characters").required("Password is required"),
});

const useLoginFormHandler = (defaultValues: DefaultValues<ILoginFormInput>) => {
  const { login } = useAuth();
  const { controlAndErrors, submit, errorMessage, router, isValid, reset } = useFormHandler({
    defaultValues,
    onSubmit: async (data: ILoginFormInput) => {
      await login.mutateAsync(data);
    },
    validationSchema,
  });

  return {
    controlAndErrors,
    submit,
    errorMessage,
    isPending: login.isPending && !(login.isSuccess || login.isError),
    isError: login.isError,
    isSuccess: login.isSuccess,
    router,
    isValid,
    reset,
  };
};

export default useLoginFormHandler;
