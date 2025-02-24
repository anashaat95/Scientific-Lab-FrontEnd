"use client";
import { AddOrUpdateFormModal } from "@/components/forms/AddOrUpdateFormModal";
import { CustomFormBox } from "@/components/forms/CustomFormBox";
import { IItemInSelect } from "@/interfaces";
import { RootState } from "@/store/store";
import { Grid } from "@mui/material";
import { DefaultValues } from "react-hook-form";
import { useSelector } from "react-redux";
import { IEquipment } from "../../equipments/equipmentsInterfaces";
import { IUser } from "../../users/usersInterfaces";
import { BOOKINGS_FRONTEND_ENDPOINT } from "../bookingsConsts";
import { IAddBookingFormInput } from "../bookingsInterfaces";
import useAddBookingFormHandler from "../hooks/useAddBookingFormHandler";

interface IAddBookingForm {
  equipments: IItemInSelect[];
  researchers: IItemInSelect[];
  statuses: IItemInSelect[];
  yesOrNo: IItemInSelect[];
  equipmentsFullData: IEquipment[];
}

const today = new Date().toISOString().split("T")[0];
const now = new Date();
const oneHourAfterNow = new Date(now.getTime() + 60 * 60 * 1000);

const defaultValues: DefaultValues<IAddBookingFormInput> = {
  start_date_time: now.toISOString().slice(0, 16),
  end_date_time: oneHourAfterNow.toISOString().slice(0, 16),
  is_on_overnight: false,
  notes: "",
  status: 1,
  user_id: "",
  equipment_id: "",
};

export default function AddBookingForm({ equipments, equipmentsFullData, researchers, yesOrNo, statuses }: IAddBookingForm) {
  const { currentUser }: { currentUser: IUser } = useSelector((state: RootState) => state.auth);

  const { controlAndErrors, submit, errorMessage, isPending, isSuccess, isValid, reset, watch } = useAddBookingFormHandler({
    ...defaultValues,
    user_id: currentUser?.id,
  });
  const equipment_id = watch("equipment_id");

  const selectedEquipment: IEquipment | undefined = equipmentsFullData.find((eq) => eq.id === equipment_id) ?? equipmentsFullData[0];

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
          <Grid item xs={12} sm={6} lg={6}>
            <CustomFormBox
              name="start_date_time"
              label="Start"
              type="datetime-local"
              disabled={isPending}
              {...controlAndErrors}
              // inputProps={{
              //   min: `${today}T09:00`,
              //   max: `${today}T10:00`,
              // }}
            />
            <CustomFormBox
              name="is_on_overnight"
              label="OverNight"
              items={yesOrNo}
              disabled={selectedEquipment?.can_be_left_overnight === "False" || isPending}
              {...controlAndErrors}
            />
          </Grid>
          <Grid item xs={12} sm={6} lg={6}>
            <CustomFormBox
              name="end_date_time"
              label="End"
              type="datetime-local"
              disabled={isPending}
              {...controlAndErrors}
              // inputProps={{
              //   min: `${today}T09:00`,
              //   max: `${today}T10:00`,
              // }}
            />
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
