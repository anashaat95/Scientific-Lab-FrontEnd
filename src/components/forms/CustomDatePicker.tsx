import { CustomFormLabel } from "@/components/forms/CustomFormLabel";
import { Box, FormControl, FormHelperText } from "@mui/material";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import dayjs from "dayjs";
import { Controller } from "react-hook-form";

export const CustomDatePicker = ({
  name,
  label,
  disabled = false,
  control,
  rules,
  errors,
  minDate,
  maxDate,
  format = "DD MMM YYYY",
  shouldDisableDate,
}: {
  name: string;
  label: string;
  disabled?: boolean;
  control: any;
  rules?: object;
  errors: any;
  minDate?: dayjs.Dayjs;
  maxDate?: dayjs.Dayjs;
  format?: string;
  shouldDisableDate: (date: dayjs.Dayjs) => boolean;
}) => {
  return (
    <FormControl fullWidth disabled={disabled}>
      <CustomFormLabel name={name} label={label} />
      <Controller
        name={name}
        control={control}
        rules={rules}
        render={({ field }) => {
          return (
            <>
              <LocalizationProvider dateAdapter={AdapterDayjs}>
                <DatePicker {...field} shouldDisableDate={shouldDisableDate} minDate={minDate} maxDate={maxDate} format={format} />
              </LocalizationProvider>

              <Box height="10px">{errors?.[name] && <FormHelperText error>{errors?.[name]?.message?.toString() || undefined}</FormHelperText>}</Box>
            </>
          );
        }}
      />
    </FormControl>
  );
};
