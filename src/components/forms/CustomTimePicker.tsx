"use client";
import { isValidDayjs } from "@/app/helpers";
import { CustomFormLabel } from "@/components/forms/CustomFormLabel";
import { Box, FormControl, FormHelperText } from "@mui/material";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { TimeView } from "@mui/x-date-pickers/models";
import { TimePicker } from "@mui/x-date-pickers/TimePicker";
import dayjs from "dayjs";
import { Controller } from "react-hook-form";

export const CustomTimePicker = ({
  name,
  label,
  fallBackValue,
  disabled = false,
  control,
  rules,
  errors,
  shouldDisableTime,
  setValue,
}: {
  name: string;
  label: string;
  disabled?: boolean;
  control: any;
  rules?: object;
  errors: any;
  fallBackValue?: string;
  setValue?: any;
  shouldDisableTime: ((value: any, view: TimeView) => boolean) | undefined;
}) => {
  return (
    <FormControl fullWidth disabled={disabled}>
      <CustomFormLabel name={name} label={label} />
      <Controller
        name={name}
        control={control}
        rules={rules}
        render={({ field }) => {
          field.value = dayjs(field.value, "HH:mm A");
          const fieldValue = isValidDayjs(field.value)
            ? field.value
            : setValue
            ? setValue(field.name, dayjs(fallBackValue, "HH:mm A"))
            : dayjs(fallBackValue, "HH:mm A");

          return (
            <>
              <LocalizationProvider dateAdapter={AdapterDayjs}>
                <TimePicker {...field} shouldDisableTime={shouldDisableTime} views={["hours", "minutes"]} value={fieldValue} />
              </LocalizationProvider>

              <Box height="10px">{errors[name] && <FormHelperText error>{errors[name]?.message?.toString() || undefined}</FormHelperText>}</Box>
            </>
          );
        }}
      />
    </FormControl>
  );
};
