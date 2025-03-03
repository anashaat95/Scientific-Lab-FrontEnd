"use client";
import { AddOrUpdateFormModal } from "@/components/forms/AddOrUpdateFormModal";
import { CustomFormBox } from "@/components/forms/CustomFormBox";
import { IItemInSelect } from "@/interfaces";
import { Grid } from "@mui/material";
import useUpdateLabFormHandler from "../hooks/useUpdateLabFormHandler";
import { LABS_FRONTEND_ENDPOINT } from "../labsConsts";
import { IUpdateLabFormInput } from "../labsInterfaces";

interface IUpdateLabFormProps {
  departments: IItemInSelect[];
  users: IItemInSelect[];
  lab: IUpdateLabFormInput;
}

export default function UpdateLabForm({ departments, users, lab }: IUpdateLabFormProps) {
  const { controlAndErrors, submit, errorMessage, isPending, isSuccess, isValid, router, reset } = useUpdateLabFormHandler(lab);

  return (
    <AddOrUpdateFormModal
      reset={reset}
      isValid={isValid}
      title={`Update Lab "${lab.name}"`}
      errorMessage={errorMessage}
      isPending={isPending}
      isSuccess={isSuccess}
      submitButtonText="Update"
      submitFn={submit}
      backUrl={LABS_FRONTEND_ENDPOINT}
    >
      <Grid container display="flex" justifyContent="center" spacing={2}>
        <Grid item xs={12} sm={6} lg={6}>
          <CustomFormBox name="name" label="Name" disabled={isPending} {...controlAndErrors} />
        </Grid>
        <Grid item xs={12} sm={6} lg={6}>
          {" "}
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
        <Grid item xs={12} sm={6} lg={6}></Grid>
      </Grid>
    </AddOrUpdateFormModal>
  );
}
