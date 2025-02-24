"use client";
import { AddOrUpdateFormModal } from "@/components/forms/AddOrUpdateFormModal";
import { CustomFormBox } from "@/components/forms/CustomFormBox";
import { IItemInSelect } from "@/interfaces";
import { Grid } from "@mui/material";
import { DEPARTMENTS_FRONTEND_ENDPOINT } from "../departmentsConsts";
import { IUpdateDepartmentFormInput } from "../departmentsInterfaces";
import useUpdateDepartmentFormHandler from "../hooks/useUpdateDepartmentFormHandler";

interface IUpdateDepartmentFormProps {
  companies: IItemInSelect[];
  department: IUpdateDepartmentFormInput;
}

export default function UpdateDepartmentForm({ companies, department }: IUpdateDepartmentFormProps) {
  const { controlAndErrors, submit, errorMessage, isPending, isSuccess, isValid, router, reset } = useUpdateDepartmentFormHandler(department);

  return (
    <AddOrUpdateFormModal
      reset={reset}
      isValid={isValid}
      title={`Update Department "${department.name}"`}
      errorMessage={errorMessage}
      isPending={isPending}
      isSuccess={isSuccess}
      submitButtonText="Update"
      submitFn={submit}
      backUrl={DEPARTMENTS_FRONTEND_ENDPOINT}
    >
      <Grid container display="flex" justifyContent="center" spacing={2}>
        <Grid item xs={12} sm={12} lg={12}>
          <CustomFormBox name="name" label="Name" disabled={isPending} {...controlAndErrors} />
          <CustomFormBox name="location" label="Location" disabled={isPending} {...controlAndErrors} />
          <CustomFormBox name="company_id" label="Company" items={companies} disabled={isPending} {...controlAndErrors} />
        </Grid>
      </Grid>
    </AddOrUpdateFormModal>
  );
}
