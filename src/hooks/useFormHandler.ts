"use client";
import { IFormInput, UseFormHandlerProps } from "@/interfaces";
import { yupResolver } from "@hookform/resolvers/yup";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";

const useFormHandler = <TFormData extends IFormInput>({ defaultValues, onSubmit, validationSchema }: UseFormHandlerProps<TFormData>) => {
  const {
    control,
    handleSubmit,
    reset,
    watch,
    formState: { errors: formErrors, isValid },
  } = useForm<TFormData>({ defaultValues, resolver: yupResolver(validationSchema) as any, mode: "all" });
  const router = useRouter();
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const handleFormSubmit: SubmitHandler<TFormData> = async (data) => {
    try {
      await onSubmit(data);
      return true;
    } catch (error: any) {
      console.log(error);
      setErrorMessage(
        (await error?.response?.data?.message) ||
          (await error?.response?.data?.error) ||
          error?.message ||
          error?.error ||
          "Error! Please contact the administrator"
      );
      return false;
    }
  };

  return {
    controlAndErrors: { control, errors: formErrors },
    submit: handleSubmit(handleFormSubmit),
    errorMessage: errorMessage,
    router,
    isValid,
    reset,
    watch,
  };
};

export default useFormHandler;
