import { ICustomFormBoxProps } from "@/interfaces";
import { Box, FormControl } from "@mui/material";
import React from "react";
import { CustomFormLabel } from "./CustomFormLabel";
import { CustomSelectController } from "./CustomSelectController";
import { CustomTextFieldController } from "./CustomTextFieldController";

export const CustomFormBox: React.FC<ICustomFormBoxProps> = ({
  name,
  label = "",
  type = "text",
  items,
  control,
  errors,
  rules,
  inputProps,
  multiline = false,
  rows = 3,
  disabled,
}) => {
  return (
    <Box display="flex" flexDirection="column" gap="0.3rem" mb={2} width={"100%"}>
      <FormControl fullWidth disabled={disabled}>
        <CustomFormLabel name={name} label={label} />
        {items ? (
          <CustomSelectController name={name} items={items} control={control} errors={errors} rules={rules} />
        ) : (
          <CustomTextFieldController
            name={name}
            type={type}
            control={control}
            errors={errors}
            rules={rules}
            inputProps={inputProps}
            multiline={multiline}
            rows={rows}
            disabled={disabled}
          />
        )}
      </FormControl>
    </Box>
  );
};
