import { ICustomSelectControllerProps } from "@/interfaces";
import { Box, FormHelperText, MenuItem, Select } from "@mui/material";
import React, { useEffect } from "react";
import { Controller, ControllerRenderProps, FieldValues } from "react-hook-form";

export const CustomSelectController: React.FC<ICustomSelectControllerProps> = ({ name, items, control, errors, rules }) => {
  return (
    <Controller
      name={name}
      control={control}
      rules={rules}
      render={({ field }) => <CustomSelectField field={field} name={name} items={items} errors={errors} control={control} />}
    />
  );
};

const CustomSelectField = ({ field, name, items, errors }: { field: ControllerRenderProps<FieldValues, string> } & ICustomSelectControllerProps) => {
  useEffect(() => {
    if (!field.value && items.length > 0) {
      const id = setTimeout(() => field.onChange(items[0].value), 0);
      return () => clearTimeout(id);
    }
  }, [items, field]);
  return (
    <>
      <Select {...field} labelId={`${name}-label`} id={name} label={name} value={field.value ?? ""}>
        {items.map((item) => {
          return (
            <MenuItem key={String(item.value) ?? ""} value={String(item.value) ?? ""}>
              {item.label}
            </MenuItem>
          );
        })}
      </Select>

      <Box height="10px">{errors[name] && <FormHelperText error>{errors[name]?.message?.toString() || undefined}</FormHelperText>}</Box>
    </>
  );
};
