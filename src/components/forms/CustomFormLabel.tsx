import { ICustomFormLabelProps } from "@/interfaces";
import { Typography } from "@mui/material";
import React from "react";

export const CustomFormLabel: React.FC<ICustomFormLabelProps> = ({ name, label }) => {
  return (
    <Typography variant="subtitle1" fontWeight={600} component="label" htmlFor={name}>
      {label}
    </Typography>
  );
};
