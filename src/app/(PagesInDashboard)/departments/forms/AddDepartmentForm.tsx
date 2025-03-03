"use client";
import { AddOrUpdateFormModal } from "@/components/forms/AddOrUpdateFormModal";
import { CustomFormBox } from "@/components/forms/CustomFormBox";
import { IItemInSelect } from "@/interfaces";
import { Grid } from "@mui/material";
import { DefaultValues } from "react-hook-form";
import { DEPARTMENTS_FRONTEND_ENDPOINT } from "../departmentsConsts";
import { IAddDepartmentFormInput } from "../departmentsInterfaces";
import useAddDepartmentFormHandler from "../hooks/useAddDepartmentFormHandler";

interface IAddDepartmentForm {
  companies: IItemInSelect[];
}

const defaultValues: DefaultValues<IAddDepartmentFormInput> = {
  name: "",
  location: "",
  company_id: "",
};

export default function AddDepartmentForm({ companies }: IAddDepartmentForm) {
  const { controlAndErrors, submit, errorMessage, isPending, isSuccess, isValid, reset } = useAddDepartmentFormHandler(defaultValues);

  return (
    <>
      <AddOrUpdateFormModal
        reset={reset}
        isValid={isValid}
        title="Add Department"
        errorMessage={errorMessage}
        isPending={isPending}
        isSuccess={isSuccess}
        submitButtonText="Add"
        submitFn={submit}
        backUrl={DEPARTMENTS_FRONTEND_ENDPOINT}
      >
        <Grid container display="flex" justifyContent="center" spacing={2}>
          <Grid item xs={12} sm={12} lg={12}>
            <CustomFormBox name="name" label="Name" disabled={isPending} {...controlAndErrors} />
          </Grid>
          <Grid item xs={12} sm={12} lg={12}>
            <CustomFormBox name="location" label="Location" disabled={isPending} {...controlAndErrors} />
          </Grid>
          <Grid item xs={12} sm={12} lg={12}>
            <CustomFormBox name="company_id" label="Company" items={companies} disabled={isPending} {...controlAndErrors} />
          </Grid>
        </Grid>
      </AddOrUpdateFormModal>
    </>
  );
}
