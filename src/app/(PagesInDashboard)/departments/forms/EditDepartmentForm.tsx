"use client";
import { AddOrEditFormModal } from "@/components/forms/AddOrEditFormModal";
import { CustomFormBox } from "@/components/forms/CustomFormBox";
import { IItemInSelect } from "@/interfaces";
import { Grid } from "@mui/material";
import { DEPARTMENTS_FRONTEND_ENDPOINT } from "../departmentsConsts";
import { IEditDepartmentFormInput } from "../departmentsInterfaces";
import useEditDepartmentFormHandler from "../hooks/useEditDepartmentFormHandler";

interface IEditDepartmentFormProps {
  companies: IItemInSelect[];
  department: IEditDepartmentFormInput;
}

export default function EditDepartmentForm({ companies, department }: IEditDepartmentFormProps) {
  const { controlAndErrors, submit, errorMessage, isPending, isSuccess, isValid, router, reset } = useEditDepartmentFormHandler(department);

  return (
    <AddOrEditFormModal
      reset={reset}
      isValid={isValid}
      title={`Edit Department "${department.name}"`}
      errorMessage={errorMessage}
      isPending={isPending}
      isSuccess={isSuccess}
      submitButtonText="Edit"
      submitFn={submit}
      backUrl={DEPARTMENTS_FRONTEND_ENDPOINT}
    >
      <Grid container display="flex" justifyContent="center" spacing={2}>
        <Grid item xs={12} sm={12} lg={12}>
          <CustomFormBox name="name" label="Name" {...controlAndErrors} />
          <CustomFormBox name="location" label="Location" {...controlAndErrors} />
          <CustomFormBox name="company_id" label="Company" items={companies} {...controlAndErrors} />
        </Grid>
      </Grid>
    </AddOrEditFormModal>
  );
}
