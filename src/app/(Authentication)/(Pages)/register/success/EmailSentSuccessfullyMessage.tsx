"use client";

// components
import CustomLoader from "@/components/CustomLoader";
import CustomMessage from "@/components/CustomMessage";
import { SubmitButton } from "@/elements/CustomButtons";
import { HeadingText } from "@/elements/HeadingText";
import { IFetcherData } from "@/interfaces";
import { Stack } from "@mui/material";
import { useRouter } from "next/navigation";
import React from "react";

const EmailSentSuccessfully = ({ isError, isSuccess, email }: IFetcherData & { email: string }) => {
  const router = useRouter();

  let messageTitle = <React.Fragment>Confirm Your Email...</React.Fragment>;
  let messageComponent = <CustomLoader />;

  if (isSuccess) {
    messageTitle = (
      <HeadingText>
        A confirmation email has been successfully to your email <strong>{email}</strong>. Please, go to your email and click{" "}
        <strong>Confirm button</strong> to validate this email
      </HeadingText>
    );
    messageComponent = <SubmitButton onClick={() => router.replace("/login")}>Login Now!</SubmitButton>;
  } else if (isError) {
    messageTitle = <>Email Confirmation Failed</>;
    messageComponent = (
      <>
        <HeadingText>The confirmation link may have expired or is invalid.</HeadingText>
        <SubmitButton onClick={() => router.push("/resend-email")}>Resend Confirmation Email</SubmitButton>
      </>
    );
  }

  return (
    <Stack display="flex" direction="column" justifyContent="center" alignItems="center" gap={4}>
      <CustomMessage title={messageTitle}>{messageComponent}</CustomMessage>
    </Stack>
  );
};
export default EmailSentSuccessfully;
