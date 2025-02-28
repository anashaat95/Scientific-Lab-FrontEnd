"use client";
import { disableFridays, enableTimeSelectionDuringLabOpening, getMinAndMaxDateForBookings } from "@/app/helpers";
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

  const labOpeningTime = dayjs("07:00", "HH:mm");
  const labClosingTime = dayjs(lab.closing_time, "HH:mm").add(-1, "minute");

  const shouldDisableTime = (value: dayjs.Dayjs, view: TimeView) => enableTimeSelectionDuringLabOpening(value, view, labOpeningTime, labClosingTime);

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
            shouldDisableDate={disableFridays}
            {...getMinAndMaxDateForBookings()}
            {...controlAndErrors}
          />
        </Grid>
        {is_on_overnight && (
          <Grid item xs={12} sm={6} lg={6}>
            <CustomDatePicker
              name="end_date"
              label="End Date"
              shouldDisableDate={disableFridays}
              {...getMinAndMaxDateForBookings()}
              {...controlAndErrors}
            />
          </Grid>
        )}
        <ListBookingsOfEquipment selectedEquipment={bookedEquipment} date={dayjs(start_date)} />

        <Grid item xs={12} sm={6} lg={6}>
          <CustomTimePicker
            name="start_time"
            label="Start Time"
            fallBackValue={booking.start_time}
            setValue={setValue}
            shouldDisableTime={shouldDisableTime}
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
