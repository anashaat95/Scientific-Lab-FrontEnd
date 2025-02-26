import { ICustomFormControllerProps } from "@/interfaces";
import { Box, FormHelperText, TextField } from "@mui/material";
import React from "react";
import { Controller } from "react-hook-form";

export const CustomTextFieldController: React.FC<ICustomFormControllerProps> = ({
  name,
  type = "text",
  control,
  errors,
  rules,
  inputProps,
  multiline = false,
  rows = 3,
  disabled,
  autoComplete,
}) => {
  return (
    <Controller
      name={name}
      control={control}
      rules={rules}
      render={({ field }) => (
        <>
          <TextField
            {...field}
            id={name}
            variant="outlined"
            fullWidth
            type={type}
            error={!!errors?.[name]}
            inputProps={inputProps}
            multiline={multiline}
            rows={multiline ? rows : undefined}
            disabled={disabled}
            autoComplete={autoComplete}
          />

          <Box height="10px">{errors?.[name] && <FormHelperText error>{errors?.[name]?.message?.toString() || undefined}</FormHelperText>}</Box>
        </>
      )}
    />
  );
};
