"use client";
import { AddOrUpdateFormModal } from "@/components/forms/AddOrUpdateFormModal";
import { CustomFormBox } from "@/components/forms/CustomFormBox";
import { IItemInSelect } from "@/interfaces";
import { Grid } from "@mui/material";
import { IEquipment } from "../../equipments/equipmentsInterfaces";
import { BOOKINGS_FRONTEND_ENDPOINT } from "../bookingsConsts";
import { IUpdateBookingFormInput } from "../bookingsInterfaces";
import useUpdateBookingFormHandler from "../hooks/useUpdateBookingFormHandler";

interface IUpdateBookingFormProps {
  researchers: IItemInSelect[];
  equipments: IItemInSelect[];
  statuses: IItemInSelect[];
  yesOrNo: IItemInSelect[];
  booking: IUpdateBookingFormInput;
  bookedEquipment: IEquipment;
}

//
export default function UpdateBookingForm({ researchers, bookedEquipment, equipments, yesOrNo, statuses, booking }: IUpdateBookingFormProps) {
  const { controlAndErrors, submit, errorMessage, isPending, isSuccess, isValid, router, reset } = useUpdateBookingFormHandler(booking);
  return (
    <AddOrUpdateFormModal
      isValid={isValid}
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
          {/* <CustomFormBox name="user_id" label="Researcher" items={researchers}      disabled={isPending}  {...controlAndErrors} /> */}
        </Grid>
        <Grid item xs={12} sm={6} lg={6}>
          <CustomFormBox name="start_date_time" label="Start" type="datetime-local" disabled={isPending} {...controlAndErrors} />
          <CustomFormBox
            name="is_on_overnight"
            label="OverNight"
            items={yesOrNo}
            {...controlAndErrors}
            disabled={bookedEquipment.can_be_left_overnight === "False" || isPending}
          />
        </Grid>
        <Grid item xs={12} sm={6} lg={6}>
          <CustomFormBox name="end_date_time" label="End" type="datetime-local" disabled={isPending} {...controlAndErrors} />
          <CustomFormBox name="status" label="Status" items={statuses} disabled={isPending} {...controlAndErrors} />
        </Grid>
        <Grid item xs={12} sm={12} lg={12}>
          <CustomFormBox name="notes" label="notes" multiline={true} disabled={isPending} {...controlAndErrors} />
        </Grid>
      </Grid>
    </AddOrUpdateFormModal>
  );
}
