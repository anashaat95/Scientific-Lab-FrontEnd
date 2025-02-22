"use client";

import { ITitleAndChildrenProps, IUserIdAndTokenInput } from "@/app/(Authentication)/authInterfaces";
import CustomMessage from "@/components/CustomMessage";
import CustomForm from "@/components/forms/CustomForm";
import { SubmitButton } from "@/elements/CustomButtons";
import { CustomFormBox } from "../../../components/forms/CustomFormBox";
import useResetPasswordFromTokenForm from "../authHooks/useResetPasswordFromTokenForm";

interface IPasswordResetFormProps extends ITitleAndChildrenProps, IUserIdAndTokenInput {}

const AuthPasswordResetFromTokenForm = ({ title, user_id, token, children }: IPasswordResetFormProps) => {
  const { controlAndErrors, submit, errorMessage, isPending, isSuccess, router, reset, isValid } = useResetPasswordFromTokenForm({
    user_id,
    token,
  });

  let messageTitle = <></>;
  let messageComponent = <></>;

  if (isSuccess) {
    messageTitle = <>Password reset successfully</>;
  }

  if (isSuccess) {
    messageTitle = <>Password reset successfully</>;
    messageComponent = <SubmitButton onClick={() => router.replace("/login")}>Login Now!</SubmitButton>;
    return (
      <CustomMessage title={messageTitle} type="info">
        {messageComponent}
      </CustomMessage>
    );
  }

  return (
    <>
      <CustomForm
        reset={reset}
        isSuccess={isSuccess}
        isValid={isValid}
        title={title}
        isPending={isPending}
        submitButtonText="Update Password"
        submitFn={submit}
        errorMessage={errorMessage}
      >
        <CustomFormBox name="new_password" label="New Password" type="password" {...controlAndErrors} />
        <CustomFormBox name="confirm_new_password" label="Confirm New Password" type="password" {...controlAndErrors} />
      </CustomForm>
      {children}
    </>
  );
};

export default AuthPasswordResetFromTokenForm;
