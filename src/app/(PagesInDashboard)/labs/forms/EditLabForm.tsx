"use client";
import { AddOrEditFormModal } from "@/components/forms/AddOrEditFormModal";
import { CustomFormBox } from "@/components/forms/CustomFormBox";
import { IItemInSelect } from "@/interfaces";
import { Grid } from "@mui/material";
import useEditLabFormHandler from "../hooks/useEditLabFormHandler";
import { LABS_FRONTEND_ENDPOINT } from "../labsConsts";
import { IEditLabFormInput } from "../labsInterfaces";

interface IEditLabFormProps {
  departments: IItemInSelect[];
  users: IItemInSelect[];
  lab: IEditLabFormInput;
}

export default function EditLabForm({ departments, users, lab }: IEditLabFormProps) {
  const { controlAndErrors, submit, errorMessage, isPending, isSuccess, isValid, router, reset } = useEditLabFormHandler(lab);

  return (
    <AddOrEditFormModal
      reset={reset}
      isValid={isValid}
      title={`Edit Lab "${lab.name}"`}
      errorMessage={errorMessage}
      isPending={isPending}
      isSuccess={isSuccess}
      submitButtonText="Edit"
      submitFn={submit}
      backUrl={LABS_FRONTEND_ENDPOINT}
    >
      <Grid container display="flex" justifyContent="center" spacing={2}>
        <Grid item xs={12} sm={6} lg={6}>
          <CustomFormBox name="name" label="Name" {...controlAndErrors} />
          <CustomFormBox name="capacity" label="Capacity" type="number" rules={{ min: 1 }} inputProps={{ min: 1 }} {...controlAndErrors} />
        </Grid>
        <Grid item xs={12} sm={6} lg={6}>
          <CustomFormBox name="opening_time" label="Opening Time" type="time" {...controlAndErrors} />
          <CustomFormBox name="closing_time" label="Closing Time" type="time" {...controlAndErrors} />
        </Grid>
        <Grid item xs={12} sm={12} lg={12}>
          <CustomFormBox name="supervisor_id" label="Supervisor" items={users} {...controlAndErrors} />
          <CustomFormBox name="department_id" label="Department" items={departments} {...controlAndErrors} />
        </Grid>
      </Grid>
    </AddOrEditFormModal>
  );
}
