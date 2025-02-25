"use client";
import { HeadingText } from "@/elements/HeadingText";

// components
import { CustomAlert } from "@/components/Alert";
import CustomLoader from "@/components/CustomLoader";
import CustomMessage from "@/components/CustomMessage";
import { SubmitButton } from "@/elements/CustomButtons";
import { IFetcherData } from "@/interfaces";
import { Stack } from "@mui/material";
import { useRouter } from "next/navigation";
import React from "react";

const ConfirmUpdatedEmailMessage = ({ errorMessage, isError, isSuccess }: IFetcherData) => {
  const router = useRouter();

  let messageTitle = <React.Fragment>Confirming Your Email...</React.Fragment>;
  let messageComponent = <CustomLoader />;

  if (isSuccess) {
    messageTitle = <>Your email has been confirmed</>;
    messageComponent = <SubmitButton onClick={() => router.replace("/login")}>Login Now!</SubmitButton>;
  } else if (isError) {
    messageTitle = <>Email Confirmation Failed</>;
    messageComponent = (
      <>
        <HeadingText>
          <CustomAlert type="error" sx={{ fontSize: "16px", lineHeight: "1.3", fontWeight: "500" }}>
            The confirmation link may have expired or is invalid. Login again and update your email from your account
          </CustomAlert>
        </HeadingText>

        <SubmitButton onClick={() => router.push("/login")}>Login</SubmitButton>
      </>
    );
  }

  return (
    <Stack display="flex" direction="column" justifyContent="center" alignItems="center" gap={4}>
      <CustomMessage title={messageTitle}>{messageComponent}</CustomMessage>
    </Stack>
  );
};
export default ConfirmUpdatedEmailMessage;
