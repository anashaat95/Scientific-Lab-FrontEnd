import { NAME_MAX, NAME_MIN } from "@/consts";
import useFormHandler from "@/hooks/useFormHandler";
import { DefaultValues } from "react-hook-form";
import * as yup from "yup";
import { ISignupFormInput } from "../authInterfaces";
import { useAuth } from "./useAuth";

const validationSchema = yup.object().shape({
  userName: yup
    .string()
    .min(NAME_MIN, `Username must be at least ${NAME_MIN} characters`)
    .max(NAME_MAX, `Username must be at most ${NAME_MAX} characters`)
    .required("Username is required"),

  first_name: yup
    .string()
    .min(NAME_MIN, `First name must be at least ${NAME_MIN} characters`)
    .max(NAME_MAX, `First name must be at most ${NAME_MAX} characters`)
    .required("First name is required"),

  last_name: yup
    .string()
    .min(NAME_MIN, `Last name must be at least ${NAME_MIN} characters`)
    .max(NAME_MAX, `Last name must be at most ${NAME_MAX} characters`)
    .required("Last name is required"),

  email: yup.string().email("Invalid email format").required("Email is required"),

  company_id: yup.string().required("Company ID is required"),

  department_id: yup.string().required("Department ID is required"),

  password: yup
    .string()
    .min(8, "Password must be at least 8 characters")
    .matches(/[A-Z]/, "Password must contain at least one uppercase letter")
    .matches(/[a-z]/, "Password must contain at least one lowercase letter")
    .matches(/[0-9]/, "Password must contain at least one number")
    .matches(/[\W_]/, "Password must contain at least one special character")
    .required("Password is required"),

  confirm_password: yup
    .string()
    .oneOf([yup.ref("password")], "Passwords do not match")
    .required("Confirm password is required"),
});

const defaultValues: DefaultValues<ISignupFormInput> = {
  userName: "",
  first_name: "",
  last_name: "",
  email: "",
  password: "",
  confirm_password: "",
  company_id: "",
  department_id: "",
  lab_id: "",
};

const useRegisterFormHandler = () => {
  const { signup } = useAuth();
  const { controlAndErrors, submit, errorMessage, isValid, reset } = useFormHandler({
    defaultValues,
    onSubmit: async (data) => await signup.mutateAsync(data),
    validationSchema,
  });

  return {
    controlAndErrors,
    submit,
    errorMessage,
    isPending: signup.isPending,
    isSuccess: signup.isSuccess,
    isValid,
    reset,
  };
};

export default useRegisterFormHandler;
