"use client";
import EmailIcon from "@mui/icons-material/Email";
import ErrorIcon from "@mui/icons-material/Error";
import LightbulbIcon from "@mui/icons-material/Lightbulb";
import { Stack } from "@mui/material";
// components
import { NormalButton } from "@/elements/CustomButtons";
import { HeadingText } from "@/elements/HeadingText";
import { SignalWifiOff } from "@mui/icons-material";
import DoNotDisturbOffIcon from "@mui/icons-material/DoNotDisturbOff";
import { useRouter } from "next/navigation";
import React from "react";
interface ICustomMessageProps {
  title?: React.ReactNode;
  type?: "info" | "email" | "error" | "network" | "access_denied";
  children: React.ReactNode;
}

const CustomMessage = ({ title, type = "email", children }: ICustomMessageProps) => {
  const router = useRouter();

  let icon = <EmailIcon color="primary" sx={{ fontSize: 60 }} />;
  switch (type) {
    case "info":
      icon = <LightbulbIcon color="primary" sx={{ fontSize: 60 }} />;
      break;
    case "error":
      title = "Error...!";
      icon = <ErrorIcon color="error" sx={{ fontSize: 60 }} />;
      break;
    case "network":
      title = "Network Error...!";
      icon = <SignalWifiOff color="error" sx={{ fontSize: 60 }} />;
      break;
    case "email":
      icon = <EmailIcon color="primary" sx={{ fontSize: 60 }} />;
      break;

    case "access_denied":
      icon = <DoNotDisturbOffIcon color="error" sx={{ fontSize: 60 }} />;
      break;
    default:
      icon = <EmailIcon color="primary" sx={{ fontSize: 60 }} />;
      break;
  }

  return (
    <Stack display="flex" direction="column" justifyContent="center" alignItems="center" gap={4}>
      <Stack display="flex" direction="column" justifyContent="center" alignItems="center" gap={2}>
        {icon}
        <HeadingText varient="h4">{title}</HeadingText>
      </Stack>
      {children}
      {(type === "network" || type === "error") && <NormalButton onClick={() => router.refresh()}>Refresh</NormalButton>}
      {type === "access_denied" && (
        <NormalButton
          onClick={() => {
            router.back();
            router.refresh();
          }}
        >
          Go Back
        </NormalButton>
      )}
    </Stack>
  );
};
export default CustomMessage;
