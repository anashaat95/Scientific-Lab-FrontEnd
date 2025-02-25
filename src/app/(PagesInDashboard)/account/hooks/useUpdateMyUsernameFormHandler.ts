import { NAME_MAX, NAME_MIN } from "@/consts";
import useFormHandler from "@/hooks/useFormHandler";
import { DefaultValues } from "react-hook-form";
import * as yup from "yup";
import { IUpdateMyUsernameForm } from "../accountInterfaces";
import { useAccount } from "./useAccount";

const validationSchema = yup.object().shape({
  username: yup
    .string()
    .min(NAME_MIN, `Username must be at least ${NAME_MIN} characters`)
    .max(NAME_MAX, `Username must be at most ${NAME_MAX} characters`)
    .required("Username is required"),
});

const useUpdateMyUsernameFormHandler = (defaultValues: DefaultValues<IUpdateMyUsernameForm>) => {
  const { updateMyUsername } = useAccount();
  const { controlAndErrors, submit, errorMessage, isValid, reset } = useFormHandler({
    defaultValues,
    onSubmit: async (data) => await updateMyUsername.mutateAsync(data),
    validationSchema,
  });

  return {
    controlAndErrors,
    submit,
    errorMessage,
    isPending: updateMyUsername.isPending,
    isSuccess: updateMyUsername.isSuccess,
    isValid,
    reset,
  };
};

export default useUpdateMyUsernameFormHandler;
