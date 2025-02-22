import { Theme } from "@emotion/react";
import { Alert, SxProps } from "@mui/material";
import React from "react";

interface ICustomAlert {
  type?: "error" | "info";
  children: React.ReactNode;
  sx?: SxProps<Theme>;
}

export const CustomAlert = ({ type, children, sx }: ICustomAlert) => {
  return (
    <Alert severity={type} sx={{ mb: 2, display: "flex", alignItems: "center", ...sx }}>
      {children}
    </Alert>
  );
};
