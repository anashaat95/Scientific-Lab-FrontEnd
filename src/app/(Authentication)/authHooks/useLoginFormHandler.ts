import useFormHandler from "@/hooks/useFormHandler";
import { DefaultValues } from "react-hook-form";
import * as yup from "yup";
import { ILoginFormInput } from "../authInterfaces";
import { useAuth } from "./useAuth";

const validationSchema = yup.object().shape({
  email: yup.string().email("Invalid email address").required("Email is required"),
  password: yup
    .string()
    .min(8, "Password must be at least 8 characters")
    .matches(/[A-Z]/, "Password must contain at least one uppercase letter")
    .matches(/[a-z]/, "Password must contain at least one lowercase letter")
    .matches(/[0-9]/, "Password must contain at least one number")
    .matches(/[\W_]/, "Password must contain at least one special character")
    .required("Password is required"),
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
