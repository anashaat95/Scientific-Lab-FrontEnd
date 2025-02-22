"use client";
import CustomForm from "@/components/forms/CustomForm";
import { SubmitButton } from "@/elements/CustomButtons";
import React from "react";
import CustomMessage from "../../../components/CustomMessage";
import { CustomFormBox } from "../../../components/forms/CustomFormBox";
import useResendEmailFormHandler from "../authHooks/useResendEmailFormHandler";

const AuthResendEmailForm = ({ title, children }: { title?: string; children?: React.ReactNode }) => {
  const { controlAndErrors, submit, errorMessage, isPending, isSuccess, router, isValid, reset } = useResendEmailFormHandler();
  const isEmailConfirmed = errorMessage !== null && errorMessage?.includes("confirmed");

  let messageTitle = <></>;
  let messageComponent = <SubmitButton onClick={() => router.push("/login")}>Login</SubmitButton>;

  if (isSuccess) {
    messageTitle = <>Confirmation link has been sent successfully to your email</>;
  } else if (isEmailConfirmed) {
    messageTitle = <>Your email is already confirmed!</>;
  }

  if (isSuccess || isEmailConfirmed) return <CustomMessage title={messageTitle}>{messageComponent}</CustomMessage>;

  return (
    <>
      <CustomForm
        isValid={isValid}
        isSuccess={isSuccess}
        reset={reset}
        title={title}
        isPending={isPending}
        submitButtonText="Send Email"
        submitFn={submit}
        errorMessage={errorMessage}
      >
        <CustomFormBox name="email" label="Enter your email to receive a new confirmation link" type="email" {...controlAndErrors} />
      </CustomForm>
      {children}
    </>
  );
};

export default AuthResendEmailForm;
