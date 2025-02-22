"use client";
import CustomForm from "@/components/forms/CustomForm";
import { SubmitButton } from "@/elements/CustomButtons";
import React from "react";
import CustomMessage from "../../../components/CustomMessage";
import { CustomFormBox } from "../../../components/forms/CustomFormBox";
import useForgetPasswordHandler from "../authHooks/useForgetPasswordHandler";

const AuthForgetPasswordForm = ({ title, children }: { title?: string; children?: React.ReactNode }) => {
  const { controlAndErrors, submit, errorMessage, isPending, isSuccess, router, isValid, reset } = useForgetPasswordHandler();

  let messageTitle = <></>;
  let messageComponent = <></>;

  if (isSuccess) {
    messageTitle = <>Link has been sent successfully to your email</>;
    messageComponent = <SubmitButton onClick={() => router.replace("/login")}>Login Now!</SubmitButton>;
    return <CustomMessage title={messageTitle}>{messageComponent}</CustomMessage>;
  }

  return (
    <>
      <CustomForm
        reset={reset}
        isSuccess={isSuccess}
        title={title}
        isPending={isPending}
        submitButtonText="Send"
        submitFn={submit}
        errorMessage={errorMessage}
        isValid={isValid}
      >
        <CustomFormBox name="email" label="Enter your email to send password reset link" type="email" {...controlAndErrors} />
      </CustomForm>
      {children}
    </>
  );
};

export default AuthForgetPasswordForm;
