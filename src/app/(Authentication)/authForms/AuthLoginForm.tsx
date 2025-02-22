"use client";

import { ILoginFormInput, ITitleAndChildrenProps } from "@/app/(Authentication)/authInterfaces";
import CustomForm from "@/components/forms/CustomForm";
import { TextButton } from "@/elements/CustomButtons";
import { Checkbox, FormControlLabel, FormGroup, Stack } from "@mui/material";
import { Controller, DefaultValues } from "react-hook-form";
import CustomMessage from "../../../components/CustomMessage";
import { CustomFormBox } from "../../../components/forms/CustomFormBox";
import useLoginFormHandler from "../authHooks/useLoginFormHandler";

const defaultValues: DefaultValues<ILoginFormInput> = {
  email: process.env.NEXT_PUBLIC_DEFAULT_USER,
  password: process.env.NEXT_PUBLIC_DEFAULT_PASSWORD,
  rememberMe: true,
};

const AuthLoginForm = ({ title, children }: ITitleAndChildrenProps) => {
  const { controlAndErrors, submit, errorMessage, isPending, router, isValid, reset, isSuccess } = useLoginFormHandler(defaultValues);

  const isEmailNotConfirmed = errorMessage !== null && errorMessage?.includes("not verified");

  if (isEmailNotConfirmed) return <CustomMessage title="Check Your Email">{errorMessage}</CustomMessage>;

  return (
    <>
      <CustomForm
        reset={reset}
        isSuccess={isSuccess}
        title={title}
        isPending={isPending}
        isValid={isValid}
        submitButtonText="Login"
        submitFn={submit}
        errorMessage={errorMessage}
      >
        <CustomFormBox name="email" label="Email" type="email" {...controlAndErrors} />
        <CustomFormBox name="password" label="Password" type="password" {...controlAndErrors} />

        <Stack justifyContent="space-between" direction="row" alignItems="center" my={2}>
          <FormGroup>
            <Controller
              name="rememberMe"
              control={controlAndErrors.control}
              render={({ field }) => <FormControlLabel control={<Checkbox {...field} checked={field.value} />} label="Remember this Device" />}
            />
          </FormGroup>
          <TextButton onClick={() => router.push("/forget-password")}>Forgot Password ?</TextButton>
        </Stack>
      </CustomForm>
      {children}
    </>
  );
};

export default AuthLoginForm;
