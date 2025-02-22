"use client";
import { AddOrEditFormModal } from "@/components/forms/AddOrEditFormModal";
import { CustomFormBox } from "@/components/forms/CustomFormBox";
import { Grid } from "@mui/material";

import { COUNTRIES_FRONTEND_ENDPOINT } from "../countriesConsts";
import { IEditCountryFormInput } from "../countriesInterfaces";
import useEditCountryFormHandler from "../hooks/useEditCountryFormHandler";

export default function EditCountryForm({ country }: { country: IEditCountryFormInput }) {
  const { controlAndErrors, submit, errorMessage, isPending, isSuccess, isValid, router, reset } = useEditCountryFormHandler(country);

  return (
    <AddOrEditFormModal
      isValid={isValid}
      reset={reset}
      title={`Edit Country "${country.name}"`}
      errorMessage={errorMessage}
      isPending={isPending}
      isSuccess={isSuccess}
      submitButtonText="Edit"
      submitFn={submit}
      backUrl={COUNTRIES_FRONTEND_ENDPOINT}
    >
      <Grid container display="flex" justifyContent="center" spacing={2}>
        <Grid item xs={12} sm={12} lg={12}>
          <CustomFormBox name="name" label="New Name" {...controlAndErrors} />
        </Grid>
      </Grid>
    </AddOrEditFormModal>
  );
}
