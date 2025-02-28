"use client";
import { AddOrUpdateFormModal } from "@/components/forms/AddOrUpdateFormModal";
import { CustomDatePicker } from "@/components/forms/CustomDatePicker";
import { CustomFormBox } from "@/components/forms/CustomFormBox";
import { CustomTimePicker } from "@/components/forms/CustomTimePicker";
import { IItemInSelect } from "@/interfaces";
import { RootState } from "@/store/store";
import { Grid } from "@mui/material";
import { TimeView } from "@mui/x-date-pickers/models";
import dayjs from "dayjs";
import isBetween from "dayjs/plugin/isBetween";
import isSameOrAfter from "dayjs/plugin/isSameOrAfter";
import { useEffect } from "react";
import { DefaultValues } from "react-hook-form";
import { useSelector } from "react-redux";
import { IEquipment } from "../../equipments/equipmentsInterfaces";
import { ILab } from "../../labs/labsInterfaces";
import { IUser } from "../../users/usersInterfaces";
import { BOOKINGS_FRONTEND_ENDPOINT } from "../bookingsConsts";
import { IAddBookingFormInput } from "../bookingsInterfaces";
import ListBookingsOfEquipment from "../components/ListBookingsOfEquipment";
import useAddBookingFormHandler from "../hooks/useAddBookingFormHandler";

dayjs.extend(isSameOrAfter);
dayjs.extend(isBetween);

interface IAddBookingForm {
  equipments: IItemInSelect[];
  researchers: IItemInSelect[];
  statuses: IItemInSelect[];
  yesOrNo: IItemInSelect[];
  equipmentsFullData: IEquipment[];
  lab: ILab;
}

const defaultValues: DefaultValues<IAddBookingFormInput> = {
  start_time: dayjs().hour(7).minute(0),
  end_time: dayjs().hour(8).minute(0),
  start_date: dayjs(),
  end_date: dayjs(),
  is_on_overnight: "false",
  notes: "",
  status: 1,
  user_id: "",
  equipment_id: "",
};

export default function AddBookingForm({ lab, equipments, equipmentsFullData, researchers, yesOrNo, statuses }: IAddBookingForm) {
  const today = dayjs();
  const { currentUser }: { currentUser: IUser } = useSelector((state: RootState) => state.auth);

  const { controlAndErrors, submit, errorMessage, isPending, isSuccess, isValid, reset, watch, setValue, setError } = useAddBookingFormHandler({
    ...defaultValues,
    user_id: currentUser?.id,
    start_date: today,
    end_date: today,
  });

  const equipment_id = watch("equipment_id");
  const start_date = watch("start_date");
  const start_time = watch("start_time");
  const is_on_overnight = JSON.parse(watch("is_on_overnight"));

  useEffect(() => {
    if (start_time) {
      const new_end_time = start_time.add(59, "minute");
      setValue("end_time", new_end_time);
    }
  }, [start_time, setValue]);

  useEffect(() => {
    if (start_date) {
      const new_end_date = start_date;
      setValue("end_date", new_end_date);
    }
  }, [start_date, setValue]);

  const selectedEquipment: IEquipment | undefined = equipmentsFullData.find((eq) => eq.id === equipment_id) ?? equipmentsFullData[0];
  const labOpeningTime = dayjs("07:00", "HH:mm");
  const labClosingTime = dayjs(lab.closing_time, "HH:mm").add(-1, "minute");

  const shouldDisableTime = (value: dayjs.Dayjs, view: TimeView) => {
    const selectedHour = value.hour();
    return selectedHour < labOpeningTime.hour() || selectedHour > labClosingTime.hour();
  };

  const daysUntilFriday = 5 - today.day();
  const nextWeekFriday = today.add(daysUntilFriday > 0 ? daysUntilFriday : daysUntilFriday + 7, "day");

  const minDate = today; // Saturday = 6
  const maxDate = nextWeekFriday.add(6, "day");

  const shouldDisableDate = (date: dayjs.Dayjs): boolean => {
    return date.day() === 5;
  };

  useEffect(() => {
    setValue("is_on_overnight", JSON.stringify(selectedEquipment.can_be_left_overnight === "True"));
  }, [selectedEquipment.can_be_left_overnight, setValue]);

  return (
    <>
      <AddOrUpdateFormModal
        reset={reset}
        isValid={isValid}
        title="Add Booking"
        errorMessage={errorMessage}
        isPending={isPending}
        isSuccess={isSuccess}
        submitButtonText="Add"
        submitFn={submit}
        backUrl={BOOKINGS_FRONTEND_ENDPOINT}
      >
        <Grid container display="flex" justifyContent="center" spacing={2}>
          <Grid item xs={12} sm={12} lg={12}>
            <CustomFormBox name="equipment_id" label="Equipment" items={equipments} disabled={isPending} {...controlAndErrors} />
            {/* <CustomFormBox name="user_id" label="Researcher" items={researchers}      disabled={isPending}  {...controlAndErrors} /> */}
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
          <ListBookingsOfEquipment selectedEquipment={selectedEquipment} date={start_date} />

          <Grid item xs={12} sm={6} lg={6}>
            <CustomTimePicker
              shouldDisableTime={shouldDisableTime}
              fallBackValue={"07:00 AM"}
              name="start_time"
              label="Start Time"
              {...controlAndErrors}
            />
          </Grid>
          <Grid item xs={12} sm={6} lg={6}>
            <CustomTimePicker
              shouldDisableTime={shouldDisableTime}
              fallBackValue={"08:00 AM"}
              name="end_time"
              label="End Time"
              {...controlAndErrors}
            />
          </Grid>
          <Grid item xs={12} sm={6} lg={6}>
            <CustomFormBox
              name="is_on_overnight"
              label="OverNight"
              items={yesOrNo}
              disabled={selectedEquipment?.can_be_left_overnight === "False" || isPending}
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
    </>
  );
}
