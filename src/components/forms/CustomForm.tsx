"use client";
import { SubmitButton } from "@/elements/CustomButtons";
import { HeadingText } from "@/elements/HeadingText";
import { Box, Stack } from "@mui/material";
import React, { FormEvent, useEffect } from "react";
import { UseFormReset } from "react-hook-form";
import { CustomAlert } from "../Alert";
import CustomLoader from "../CustomLoader";

export interface ICustomForm {
  title?: string | null;
  errorMessage?: string | null;
  isPending: Boolean;
  isSuccess: Boolean;
  isValid: Boolean;
  submitButtonText: string;
  submitFn: (event: FormEvent<HTMLFormElement>) => void;
  children: React.ReactNode;
  reset: UseFormReset<any>;
}

const CustomForm = ({ title, errorMessage, isPending, submitButtonText, isSuccess, isValid, submitFn, children, reset }: ICustomForm) => {
  useEffect(() => {
    if (isSuccess) setTimeout(() => reset(), 1000);
  }, [isSuccess, reset]);

  return (
    <>
      {title && <HeadingText varient="h2">{title}</HeadingText>}
      <form onSubmit={submitFn}>
        <Stack marginY={2}>
          {errorMessage && <CustomAlert type="error">{errorMessage}</CustomAlert>}
          {children}
        </Stack>
        <Box display="flex" justifyContent="center" alignItems="center">
          <SubmitButton disabled={(!isValid || isPending) as boolean}>{isPending ? <CustomLoader color="primary" /> : submitButtonText}</SubmitButton>
        </Box>
      </form>
    </>
  );
};

export default CustomForm;
