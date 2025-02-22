"use client";
import { AddOrEditFormModal } from "@/components/forms/AddOrEditFormModal";
import { CustomFormBox } from "@/components/forms/CustomFormBox";
import { IItemInSelect } from "@/interfaces";
import { Grid } from "@mui/material";
import { IEquipment } from "../../equipments/equipmentsInterfaces";
import { BOOKINGS_FRONTEND_ENDPOINT } from "../bookingsConsts";
import { IEditBookingFormInput } from "../bookingsInterfaces";
import useEditBookingFormHandler from "../hooks/useEditBookingFormHandler";

interface IEditBookingFormProps {
  researchers: IItemInSelect[];
  equipments: IItemInSelect[];
  statuses: IItemInSelect[];
  yesOrNo: IItemInSelect[];
  booking: IEditBookingFormInput;
  bookedEquipment: IEquipment;
}

//
export default function EditBookingForm({ researchers, bookedEquipment, equipments, yesOrNo, statuses, booking }: IEditBookingFormProps) {
  const { controlAndErrors, submit, errorMessage, isPending, isSuccess, isValid, router, reset } = useEditBookingFormHandler(booking);
  return (
    <AddOrEditFormModal
      isValid={isValid}
      reset={reset}
      title={`Edit Booking`}
      errorMessage={errorMessage}
      isPending={isPending}
      isSuccess={isSuccess}
      submitButtonText="Edit"
      submitFn={submit}
      backUrl={BOOKINGS_FRONTEND_ENDPOINT}
    >
      <Grid container display="flex" justifyContent="center" spacing={2}>
        <Grid item xs={12} sm={12} lg={12}>
          <CustomFormBox name="equipment_id" label="Equipment" items={equipments} disabled {...controlAndErrors} />
          {/* <CustomFormBox name="user_id" label="Researcher" items={researchers} {...controlAndErrors} /> */}
        </Grid>
        <Grid item xs={12} sm={6} lg={6}>
          <CustomFormBox name="start_date_time" label="Start" type="datetime-local" {...controlAndErrors} />
          <CustomFormBox
            name="is_on_overnight"
            label="OverNight"
            items={yesOrNo}
            {...controlAndErrors}
            disabled={bookedEquipment.can_be_left_overnight === "False"}
          />
        </Grid>
        <Grid item xs={12} sm={6} lg={6}>
          <CustomFormBox name="end_date_time" label="End" type="datetime-local" {...controlAndErrors} />
          <CustomFormBox name="status" label="Status" items={statuses} {...controlAndErrors} />
        </Grid>
        <Grid item xs={12} sm={12} lg={12}>
          <CustomFormBox name="notes" label="notes" multiline={true} {...controlAndErrors} />
        </Grid>
      </Grid>
    </AddOrEditFormModal>
  );
}
