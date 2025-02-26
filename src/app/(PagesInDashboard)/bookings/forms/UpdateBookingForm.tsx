"use client";
import { convertdbTimeToDayjsTime } from "@/app/helpers";
import { AddOrUpdateFormModal } from "@/components/forms/AddOrUpdateFormModal";
import { CustomDatePicker } from "@/components/forms/CustomDatePicker";
import { CustomFormBox } from "@/components/forms/CustomFormBox";
import { CustomTimePicker } from "@/components/forms/CustomTimePicker";
import { IItemInSelect } from "@/interfaces";
import { Grid } from "@mui/material";
import { TimeView } from "@mui/x-date-pickers/models";
import dayjs from "dayjs";
import { useEffect } from "react";
import { IEquipment } from "../../equipments/equipmentsInterfaces";
import { ILab } from "../../labs/labsInterfaces";
import { BOOKINGS_FRONTEND_ENDPOINT } from "../bookingsConsts";
import { IUpdateBookingFormInputFromServer } from "../bookingsInterfaces";
import ListBookingsOfEquipment from "../components/ListBookingsOfEquipment";
import useUpdateBookingFormHandler from "../hooks/useUpdateBookingFormHandler";

interface IUpdateBookingFormProps {
  equipments: IItemInSelect[];
  statuses: IItemInSelect[];
  yesOrNo: IItemInSelect[];
  bookedEquipment: IEquipment;
  lab: ILab;
  booking: IUpdateBookingFormInputFromServer;
}

//
export default function UpdateBookingForm({ lab, bookedEquipment, equipments, yesOrNo, statuses, booking }: IUpdateBookingFormProps) {
  const { controlAndErrors, submit, errorMessage, isPending, isSuccess, isValid, reset, setValue, watch } = useUpdateBookingFormHandler({
    id: booking.id,
    start_time: dayjs(booking.start_time, "HH:mm A"),
    end_time: dayjs(booking.start_time, "HH:mm A"),
    start_date: dayjs(booking.start_date, "DD MMMM YYYY"),
    end_date: dayjs(booking.start_date, "DD MMMM YYYY"),
    is_on_overnight: booking.is_on_overnight ? "true" : "false",
    notes: booking.notes,
    status: booking.status as number,
    user_id: booking.user_id,
    equipment_id: booking.equipment_id,
  });

  const today = dayjs();
  const start_date = watch("start_date");
  const start_time = watch("start_time");
  const is_on_overnight = JSON.parse(watch("is_on_overnight"));

  useEffect(() => {
    if (start_time) {
      const new_end_time = start_time.add(1, "hour");
      setValue("end_time", new_end_time);
    }
  }, [start_time, setValue]);

  useEffect(() => {
    if (start_date) {
      const new_end_date = start_date;
      setValue("end_date", new_end_date);
    }
  }, [start_date, setValue]);

  const labOpeningTime = convertdbTimeToDayjsTime(lab.opening_time);
  const labClosingTime = convertdbTimeToDayjsTime(lab.closing_time);

  const shouldDisableTime = (value: dayjs.Dayjs, view: TimeView) => {
    const hour = value.hour();
    const minute = value.minute();

    if (view === "hours") {
      return hour < dayjs("07:00 AM", "HH:mm A").hour() || hour > labClosingTime.hour();
    }

    if (view === "minutes") {
      if (hour === dayjs("07:00 AM", "HH:mm A").hour() && minute < dayjs("07:00 AM", "HH:mm A").minute()) return true;
      if (hour === labClosingTime.hour() && minute > labClosingTime.minute()) return true;
    }

    return false;
  };

  const daysUntilFriday = 5 - today.day();
  const nextWeekFriday = today.add(daysUntilFriday > 0 ? daysUntilFriday : daysUntilFriday + 7, "day");

  const minDate = today; // Saturday = 6
  const maxDate = nextWeekFriday.add(6, "day");

  const shouldDisableDate = (date: dayjs.Dayjs): boolean => {
    return date.day() === 5;
  };

  return (
    <AddOrUpdateFormModal
      isValid={isValid || Object.keys(controlAndErrors.errors).length === 0}
      reset={reset}
      title={`Update Booking`}
      errorMessage={errorMessage}
      isPending={isPending}
      isSuccess={isSuccess}
      submitButtonText="Update"
      submitFn={submit}
      backUrl={BOOKINGS_FRONTEND_ENDPOINT}
    >
      <Grid container display="flex" justifyContent="center" spacing={2}>
        <Grid item xs={12} sm={12} lg={12}>
          <CustomFormBox name="equipment_id" label="Equipment" items={equipments} disabled {...controlAndErrors} />
        </Grid>
        <Grid item xs={12} sm={is_on_overnight ? 6 : 12} lg={is_on_overnight ? 6 : 12}>
          <CustomDatePicker
            name="start_date"
            label={`${is_on_overnight ? "Start " : " "}Date`}
            shouldDisableDate={shouldDisableDate}
            minDate={minDate}
            maxDate={maxDate}
            {...controlAndErrors}
          />
        </Grid>
        {is_on_overnight && (
          <Grid item xs={12} sm={6} lg={6}>
            <CustomDatePicker
              name="end_date"
              label="End Date"
              shouldDisableDate={shouldDisableDate}
              minDate={minDate}
              maxDate={maxDate}
              {...controlAndErrors}
            />
          </Grid>
        )}
        <ListBookingsOfEquipment selectedEquipment={bookedEquipment} date={dayjs(start_date)} />

        <Grid item xs={12} sm={6} lg={6}>
          <CustomTimePicker
            shouldDisableTime={shouldDisableTime}
            name="start_time"
            label="Start Time"
            fallBackValue={booking.start_time}
            setValue={setValue}
            {...controlAndErrors}
          />
        </Grid>
        <Grid item xs={12} sm={6} lg={6}>
          <CustomTimePicker
            shouldDisableTime={shouldDisableTime}
            name="end_time"
            label="End Time"
            fallBackValue={booking.end_time}
            setValue={setValue}
            {...controlAndErrors}
          />
        </Grid>
        <Grid item xs={12} sm={6} lg={6}>
          <CustomFormBox
            name="is_on_overnight"
            label="OverNight"
            items={yesOrNo}
            disabled={bookedEquipment?.can_be_left_overnight === "False" || isPending}
            {...controlAndErrors}
          />
        </Grid>
        <Grid item xs={12} sm={6} lg={6}>
          <CustomFormBox name="status" label="Status" items={statuses} disabled={isPending} {...controlAndErrors} />
        </Grid>
        <Grid item xs={12} sm={12} lg={12}>
          <CustomFormBox name="notes" label="notes" multiline={true} disabled={isPending} {...controlAndErrors} />
        </Grid>
      </Grid>
    </AddOrUpdateFormModal>
  );
}
