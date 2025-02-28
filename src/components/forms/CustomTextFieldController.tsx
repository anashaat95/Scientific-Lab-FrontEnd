import { ICustomFormControllerProps } from "@/interfaces";
import { Box, FormHelperText, TextField } from "@mui/material";
import React from "react";
import { Controller, ControllerRenderProps, FieldValues } from "react-hook-form";

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
        <CustomTextrField
          field={field}
          name={name}
          type={type}
          errors={errors}
          inputProps={inputProps}
          multiline={multiline}
          rows={rows}
          disabled={disabled}
          autoComplete={autoComplete}
        />
      )}
    />
  );
};

const CustomTextrField = ({
  field,
  name,
  type = "text",
  errors,
  inputProps,
  multiline = false,
  rows = 3,
  disabled,
  autoComplete,
}: { field: ControllerRenderProps<FieldValues, string> } & ICustomFormControllerProps) => {
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files ? e.target.files[0] : null;
    if (file) {
      field.onChange(file);
    }
  };

  return (
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
        onChange={type === "file" ? handleFileChange : field.onChange}
      />

      <Box height="10px">{errors?.[name] && <FormHelperText error>{errors?.[name]?.message?.toString() || undefined}</FormHelperText>}</Box>
    </>
  );
};
