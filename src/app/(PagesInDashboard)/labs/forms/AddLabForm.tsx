"use client";
import { AddOrUpdateFormModal } from "@/components/forms/AddOrUpdateFormModal";
import { CustomFormBox } from "@/components/forms/CustomFormBox";
import { IItemInSelect } from "@/interfaces";
import { Grid } from "@mui/material";
import { DefaultValues } from "react-hook-form";
import useAddLabFormHandler from "../hooks/useAddLabFormHandler";
import { LABS_FRONTEND_ENDPOINT } from "../labsConsts";
import { IAddLabFormInput } from "../labsInterfaces";

interface IAddLabForm {
  departments: IItemInSelect[];
  users: IItemInSelect[];
}

const defaultValues: DefaultValues<IAddLabFormInput> = {
  name: "",
  capacity: "3",
  opening_time: "09:00",
  closing_time: "16:00",
  supervisor_id: "",
  department_id: "",
};

export default function AddLabForm({ departments, users }: IAddLabForm) {
  const { controlAndErrors, submit, errorMessage, isPending, isSuccess, isValid, reset } = useAddLabFormHandler(defaultValues);

  return (
    <>
      <AddOrUpdateFormModal
        reset={reset}
        isValid={isValid}
        title="Add Lab"
        errorMessage={errorMessage}
        isPending={isPending}
        isSuccess={isSuccess}
        submitButtonText="Add"
        submitFn={submit}
        backUrl={LABS_FRONTEND_ENDPOINT}
      >
        <Grid container display="flex" justifyContent="center" spacing={2}>
          <Grid item xs={12} sm={6} lg={6}>
            <CustomFormBox name="name" label="Name" disabled={isPending} {...controlAndErrors} />
          </Grid>
          <Grid item xs={12} sm={6} lg={6}>
            <CustomFormBox
              name="capacity"
              label="Capacity"
              type="number"
              rules={{ min: 1 }}
              inputProps={{ min: 1 }}
              disabled={isPending}
              {...controlAndErrors}
            />
          </Grid>
          <Grid item xs={12} sm={6} lg={6}>
            <CustomFormBox name="opening_time" label="Opening Time" type="time" disabled={isPending} {...controlAndErrors} />
          </Grid>
          <Grid item xs={12} sm={6} lg={6}>
            <CustomFormBox name="closing_time" label="Closing Time" type="time" disabled={isPending} {...controlAndErrors} />
          </Grid>
          <Grid item xs={12} sm={6} lg={6}>
            <CustomFormBox name="supervisor_id" label="Supervisor" items={users} disabled={isPending} {...controlAndErrors} />
          </Grid>
          <Grid item xs={12} sm={6} lg={6}>
            <CustomFormBox name="department_id" label="Department" items={departments} disabled={isPending} {...controlAndErrors} />
          </Grid>
        </Grid>
      </AddOrUpdateFormModal>
    </>
  );
}
